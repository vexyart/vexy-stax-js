// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/scene/SceneDirector.js

import * as THREE from 'three';
import { calculateLuminance } from '../utils/helpers.js';
import { getAdaptiveEmissiveIntensity } from './LightingManager.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('SceneDirector');

/**
 * SceneDirector - High-level scene coordination
 *
 * Coordinates interactions between scene managers:
 * - AmbienceManager: Material switching and emissive intensity
 * - LightingManager: Ambient light intensity
 * - FloorManager: Floor material and positioning
 * - SceneManager: Background color
 * - SceneComposition: Layout recalculation
 *
 * This extracts toggleAmbience() and updateBackground() from main.js.
 *
 * @example
 * const director = new SceneDirector({
 *     scene, renderer, params, imageStack,
 *     ambienceManager, lightingManager, floorManager,
 *     sceneManager, sceneComposition, controls
 * });
 *
 * director.setAmbience(0.5);
 * director.updateBackground();
 */
export class SceneDirector {
    /**
     * @param {Object} options
     * @param {THREE.Scene} options.scene
     * @param {THREE.WebGLRenderer} options.renderer
     * @param {Object} options.params - Application parameters
     * @param {Array} options.imageStack - Image stack array
     * @param {Object} [options.ambienceManager]
     * @param {Object} [options.lightingManager]
     * @param {Object} [options.floorManager]
     * @param {Object} [options.sceneManager]
     * @param {Object} [options.sceneComposition]
     * @param {Object} [options.controls] - OrbitControls
     * @param {Function} [options.onBackgroundChanged] - Callback when background changes
     */
    constructor(options) {
        if (!options.scene) {
            throw new Error('[SceneDirector] scene is required. Fix: Pass a THREE.Scene instance.');
        }
        if (!options.params) {
            throw new Error('[SceneDirector] params is required. Fix: Pass the application params object.');
        }

        this.scene = options.scene;
        this.renderer = options.renderer;
        this.params = options.params;
        this.imageStack = options.imageStack || [];

        // Managers (optional for incremental migration)
        this.ambienceManager = options.ambienceManager || null;
        this.lightingManager = options.lightingManager || null;
        this.floorManager = options.floorManager || null;
        this.sceneManager = options.sceneManager || null;
        this.sceneComposition = options.sceneComposition || null;
        this.controls = options.controls || null;

        // Callbacks
        this.onBackgroundChanged = options.onBackgroundChanged || null;
    }

    /**
     * Set manager reference (for incremental migration)
     * @param {string} name - Manager name
     * @param {Object} manager - Manager instance
     */
    setManager(name, manager) {
        const validNames = ['ambienceManager', 'lightingManager', 'floorManager', 'sceneManager', 'sceneComposition', 'controls'];
        if (!validNames.includes(name)) {
            console.warn(`[SceneDirector] Unknown manager: ${name}`);
            return;
        }
        this[name] = manager;
    }

    /**
     * Toggle ambience mode with intensity
     * SCENE.md: Slides are core, floor is subordinate.
     * @param {number} intensity - Ambience intensity (0 = off, 0.1-1.0 = on with varying intensity)
     */
    setAmbience(intensity) {
        this.params.ambience = intensity;
        const enabled = intensity > 0;

        // Update slide materials FIRST
        if (enabled) {
            if (this.ambienceManager) {
                this.ambienceManager.updateMaterials(true);
                this.ambienceManager.applyEmissiveIntensity(intensity * 0.25);
            }
            if (this.lightingManager) {
                this.lightingManager.setAmbientIntensity(0.3 + intensity * 0.5);
            }
            this.updateBackground();
        } else {
            if (this.ambienceManager) {
                this.ambienceManager.updateMaterials(false);
            }
            this.updateBackground();
        }

        // Update floor material to match slides
        if (this.floorManager) {
            this.floorManager.updateMaterial(enabled);
        }

        // SCENE.md §1: Recalculate layout after material changes
        if (this.sceneComposition) {
            this.sceneComposition.recalculateLayout();
        }

        // Update controls without changing target
        if (this.controls) {
            this.controls.update();
        }

        log.info(`Ambience set to ${intensity} (${enabled ? 'enabled' : 'disabled'})`);
    }

    /**
     * Update background color with alpha transparency and emissive intensity.
     * bgColor is now RGBA: {r, g, b, a} where r,g,b are 0-255 and a is 0-1.
     */
    updateBackground() {
        const bgColor = this.params.bgColor;

        if (this.sceneManager) {
            this.sceneManager.updateBackground(bgColor);
        } else if (this.renderer) {
            // Normalize color components
            const r = bgColor.r > 1 ? bgColor.r / 255 : bgColor.r;
            const g = bgColor.g > 1 ? bgColor.g / 255 : bgColor.g;
            const b = bgColor.b > 1 ? bgColor.b / 255 : bgColor.b;
            const a = bgColor.a ?? 1;

            if (a < 0.01) {
                this.scene.background = null;
                this.renderer.setClearColor(0x000000, 0);
            } else if (a < 1) {
                this.scene.background = null;
                this.renderer.setClearColor(new THREE.Color(r, g, b), a);
            } else {
                this.scene.background = new THREE.Color(r, g, b);
                this.renderer.setClearColor(new THREE.Color(r, g, b), 1);
            }
        }

        this.lightingManager?.update();

        // Update emissive intensity based on background luminance
        if (this.params.ambience) {
            const bgLuminance = calculateLuminance(bgColor);
            const emissiveIntensity = getAdaptiveEmissiveIntensity(bgLuminance);

            this.imageStack.forEach((imageData) => {
                const material = imageData.mesh?.material;
                if (material && 'emissiveIntensity' in material) {
                    material.emissiveIntensity = emissiveIntensity;
                    material.needsUpdate = true;
                }
            });

            log.info(`Emissive updated (luminance: ${bgLuminance.toFixed(2)}, intensity: ${emissiveIntensity.toFixed(2)})`);
        }

        if (typeof this.onBackgroundChanged === 'function') {
            this.onBackgroundChanged('update');
        }
    }

    /**
     * Update floor color from params
     */
    updateFloorColor() {
        if (this.floorManager) {
            this.floorManager.updateColor();
        }
    }

    /**
     * Dispose resources
     */
    dispose() {
        // SceneDirector doesn't own managers, just coordinates them
        this.ambienceManager = null;
        this.lightingManager = null;
        this.floorManager = null;
        this.sceneManager = null;
        this.sceneComposition = null;
        this.controls = null;
        log.info('Disposed');
    }
}
