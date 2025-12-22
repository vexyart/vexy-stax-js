// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/scene/AmbienceManager.js

import * as THREE from 'three';
import { FLOOR_Y } from '../core/constants.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('AmbienceManager');

/**
 * AmbienceManager - Manages ambience mode material and mesh updates for image stack
 *
 * Responsibilities:
 * - Convert meshes between flat (MeshBasicMaterial) and lit (MeshStandardMaterial) rendering
 * - Rebuild geometry and materials when ambience mode toggles
 * - Apply emissive intensity to prevent color washout in lit mode
 * - Handle shadow casting configuration for depth perception
 * - Dispose old resources during material rebuilding to prevent memory leaks
 *
 * @example
 * const ambienceManager = new AmbienceManager(scene, imageStack, params);
 *
 * // Toggle to ambience mode (lit materials with shadows)
 * ambienceManager.updateMaterials(true);
 * ambienceManager.applyEmissiveIntensity(0.15);
 *
 * // Toggle back to flat mode (unlit materials)
 * ambienceManager.updateMaterials(false);
 *
 * @class
 */
export class AmbienceManager {
    /**
     * Create an AmbienceManager instance
     * @param {THREE.Scene} scene - Three.js scene
     * @param {Array} imageStack - Reference to image stack array
     * @param {Object} params - Application parameters (zSpacing, materialThickness, materialRoughness, materialMetalness)
     * @param {Object} [options] - Optional configuration
     * @param {() => number} [options.getEffectiveZSpacing] - Callback to get effective z-spacing (handles null/auto)
     */
    constructor(scene, imageStack, params, options = {}) {
        if (!scene) {
            throw new Error('[AmbienceManager] Cannot initialize: scene is required. Fix: pass a THREE.Scene instance as the first argument.');
        }
        if (!Array.isArray(imageStack)) {
            throw new Error('[AmbienceManager] Cannot initialize: imageStack array is required. Fix: pass an array (can be empty) as the second argument.');
        }
        if (!params) {
            throw new Error('[AmbienceManager] Cannot initialize: params object is required. Fix: pass a params object with zSpacing, materialThickness, materialRoughness, and materialMetalness properties.');
        }

        this.scene = scene;
        this.imageStack = imageStack;
        this.params = params;
        this.getEffectiveZSpacing = options.getEffectiveZSpacing ?? (() => this.params.zSpacing ?? 100);
    }

    /**
     * Update all images in stack for ambience mode
     * Rebuilds meshes with appropriate materials and shadow settings
     *
     * When enabled:
     * - Uses MeshStandardMaterial for PBR lighting response
     * - Enables cast/receive shadows for depth perception
     * - Sets envMapIntensity to 0.0 to prevent overbright colors
     *
     * When disabled:
     * - Uses MeshBasicMaterial for flat, unlit appearance
     * - Disables shadows
     *
     * @param {boolean} enabled - Whether ambience is enabled
     *
     * @example
     * // Enable ambience mode
     * ambienceManager.updateMaterials(true);
     *
     * @example
     * // Disable ambience mode (return to flat rendering)
     * ambienceManager.updateMaterials(false);
     */
    updateMaterials(enabled) {
        this.imageStack.forEach((imageData, index) => {
            const texture = imageData.mesh.material.map;
            const width = imageData.width;
            const height = imageData.height;

            // Remove old mesh
            this.scene.remove(imageData.mesh);
            imageData.mesh.geometry.dispose();
            imageData.mesh.material.dispose();

            // Create new geometry
            let geometry;
            if (this.params.materialThickness > 1) {
                geometry = new THREE.BoxGeometry(width, height, this.params.materialThickness);
            } else {
                geometry = new THREE.PlaneGeometry(width, height);
            }

            // Create material based on ambience mode
            let material;
            if (enabled) {
                // Use MeshStandardMaterial for PBR lighting response
                material = new THREE.MeshStandardMaterial({
                    map: texture,
                    side: THREE.DoubleSide,
                    transparent: true,
                    roughness: this.params.materialRoughness,
                    metalness: this.params.materialMetalness
                });
                // Very low envMapIntensity to avoid over-brightening
                material.envMapIntensity = 0.0;
                material.needsUpdate = true;
            } else {
                // Use MeshBasicMaterial for flat, unlit appearance
                material = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide,
                    transparent: true
                });
            }

            // Create new mesh
            const mesh = new THREE.Mesh(geometry, material);

            // Get effective z-spacing (handles null/auto)
            const effectiveZSpacing = this.getEffectiveZSpacing();

            if (enabled) {
                // Enable shadows for depth perception
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                // Position slides on floor: Y = floor level + half height so bottom edge sits on floor
                mesh.rotation.y = 0;
                mesh.position.y = FLOOR_Y + (height / 2);
                mesh.position.z = index * effectiveZSpacing;
            } else {
                // Centered positioning for flat mode
                mesh.position.z = index * effectiveZSpacing;
                mesh.position.y = 0;
            }

            // Update image data reference
            imageData.mesh = mesh;
            this.scene.add(mesh);
        });

        log.info(`Materials updated for ambience mode: ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Apply emissive intensity to all image meshes
     * Used when ambience is enabled to prevent color washout on dark backgrounds
     *
     * Only affects materials with emissiveIntensity property (MeshStandardMaterial).
     * Skips materials without this property (e.g., MeshBasicMaterial in flat mode).
     *
     * @param {number} intensity - Emissive intensity value (0-1, typically 0.05-0.25)
     *
     * @example
     * // Apply subtle emissive glow for dark background
     * const emissiveIntensity = lightingManager.getEmissiveIntensity();
     * ambienceManager.applyEmissiveIntensity(emissiveIntensity); // ~0.15-0.25
     *
     * @example
     * // Minimal emissive for bright background
     * ambienceManager.applyEmissiveIntensity(0.05);
     */
    applyEmissiveIntensity(intensity) {
        this.imageStack.forEach((imageData) => {
            const material = imageData.mesh?.material;
            if (material && 'emissiveIntensity' in material) {
                material.emissiveIntensity = intensity;
                material.needsUpdate = true;
            }
        });
        log.info(`Applied emissive intensity: ${intensity}`);
    }

    /**
     * Dispose of resources
     *
     * Note: AmbienceManager does not hold persistent resources.
     * Individual meshes/geometries/materials are disposed during updateMaterials() calls.
     * This method exists for interface consistency with other managers.
     *
     * Safe to call multiple times.
     *
     * @example
     * // Cleanup when shutting down
     * ambienceManager.dispose();
     */
    dispose() {
        // No persistent resources to clean up in this manager
        // Individual meshes are disposed during material updates
    }
}
