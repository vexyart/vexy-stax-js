// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// src/scene/FloorManager.js
// this_file: src/scene/FloorManager.js

import * as THREE from 'three';
import { FLOOR_SIZE, FLOOR_Y } from '../core/constants.js';

/**
 * FloorManager - Manages simple transparent floor plane
 *
 * Responsibilities:
 * - Create floor plane at Y=0 with semi-transparent color
 * - Update floor color/opacity from params
 * - Toggle floor on/off
 * - Dispose floor resources
 */
export class FloorManager {
    constructor(scene, params) {
        this.scene = scene;
        this.params = params;

        /** @type {THREE.Mesh|null} */
        this.floor = null;

        // Callback for when floor is created/removed
        /** @type {Function|null} */
        this.onAmbienceChange = null;
    }

    /**
     * Get floor color from params or use default
     * @returns {{r: number, g: number, b: number, a: number}}
     */
    #getFloorColor() {
        return this.params?.floorColor ?? { r: 236, g: 236, b: 236, a: 0.05 };
    }

    /**
     * Normalize color component to 0-1 range.
     * Handles both 0-255 (int) and 0-1 (normalized) formats.
     * @param {number} value - Color component value
     * @returns {number} Value in 0-1 range
     */
    #normalizeColorComponent(value) {
        // If value > 1, assume 0-255 range and normalize
        return value > 1 ? value / 255 : value;
    }

    /**
     * Create a 1x1 pixel canvas texture filled with the specified RGBA color.
     * This creates a proper texture that can receive lighting when using MeshStandardMaterial.
     * Returns null in Node.js environment (for unit tests).
     * @returns {THREE.CanvasTexture|null}
     */
    #createColorTexture() {
        // Guard for Node.js environment (unit tests)
        if (typeof document === 'undefined') {
            return null;
        }

        const floorColor = this.#getFloorColor();
        const r = Math.round(this.#normalizeColorComponent(floorColor.r) * 255);
        const g = Math.round(this.#normalizeColorComponent(floorColor.g) * 255);
        const b = Math.round(this.#normalizeColorComponent(floorColor.b) * 255);
        const a = floorColor.a;

        // Create a small canvas to generate the color texture
        const canvas = document.createElement('canvas');
        canvas.width = 4;
        canvas.height = 4;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fillRect(0, 0, 4, 4);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    /**
     * Create floor plane.
     * SCENE.md: Floor is positioned 3px below the tallest slide's bottom.
     * Floor uses the same material type as slides for consistent lighting.
     * @param {number} [initialY] - Optional initial Y position (default: FLOOR_Y constant)
     */
    create(initialY) {
        if (!this.scene) {
            throw new Error('[FloorManager] Cannot create floor: scene is required.');
        }

        if (this.floor) {
            console.warn('[FloorManager] Floor already exists, skipping creation');
            return;
        }

        const geometry = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);

        // Create floor with textured material (can switch between Basic and Standard)
        const texture = this.#createColorTexture();
        const material = this.#createMaterial(texture);

        this.floor = new THREE.Mesh(geometry, material);
        this.floor.rotation.x = -Math.PI / 2; // Lay flat
        // Use provided Y position or default constant
        const yPosition = typeof initialY === 'number' && !isNaN(initialY) ? initialY : FLOOR_Y;
        this.floor.position.y = yPosition;
        this.floor.name = 'floor';
        // Enable shadows when ambience is on
        this.floor.receiveShadow = (this.params?.ambience ?? 0) > 0;

        this.scene.add(this.floor);
        console.log(`[FloorManager] Floor created at y=${yPosition}`);
        // NOTE: Do NOT call onAmbienceChange here - floor creation should not trigger ambience toggle
    }

    /**
     * Create material based on current ambience state.
     * Uses MeshStandardMaterial when ambience is on (to receive lighting),
     * MeshBasicMaterial when off (for flat appearance).
     * @param {THREE.Texture} texture - The floor color texture (can be null in tests)
     * @returns {THREE.Material}
     */
    #createMaterial(texture) {
        const floorColor = this.#getFloorColor();
        const ambience = this.params?.ambience ?? 0;

        if (ambience > 0) {
            // Use StandardMaterial to receive lighting like slides do
            return new THREE.MeshStandardMaterial({
                map: texture,
                transparent: true,
                opacity: floorColor.a,
                side: THREE.DoubleSide,
                depthWrite: false,
                roughness: this.params.materialRoughness ?? 0.5,
                metalness: this.params.materialMetalness ?? 0.0
            });
        } else {
            // Use BasicMaterial for flat appearance
            const r = this.#normalizeColorComponent(floorColor.r);
            const g = this.#normalizeColorComponent(floorColor.g);
            const b = this.#normalizeColorComponent(floorColor.b);
            return new THREE.MeshBasicMaterial({
                color: new THREE.Color(r, g, b),
                transparent: true,
                opacity: floorColor.a,
                side: THREE.DoubleSide,
                depthWrite: false
            });
        }
    }

    /**
     * Remove floor from scene
     */
    remove() {
        if (!this.floor) {
            return;
        }

        this.scene.remove(this.floor);
        this.floor.geometry.dispose();
        this.floor.material.dispose();
        this.floor = null;

        console.log('Floor removed');

        if (this.onAmbienceChange) {
            this.onAmbienceChange(false);
        }
    }

    /**
     * Update floor color and opacity from params.
     * Recreates the floor texture and material to apply new RGBA values.
     */
    updateColor() {
        if (!this.floor) {
            return;
        }

        // Dispose old material
        this.floor.material.dispose();
        if (this.floor.material.map) {
            this.floor.material.map.dispose();
        }

        // Create new material with updated color
        const texture = this.#createColorTexture();
        this.floor.material = this.#createMaterial(texture);
        console.log('Floor color updated');
    }

    /**
     * Update floor material when ambience state changes.
     * Called when toggling between ambience on/off.
     * @param {boolean} ambienceEnabled - Whether ambience is now enabled
     */
    updateMaterial(ambienceEnabled) {
        if (!this.floor) {
            return;
        }

        // Dispose old material
        this.floor.material.dispose();
        if (this.floor.material.map) {
            this.floor.material.map.dispose();
        }

        // Create new material appropriate for ambience state
        const texture = this.#createColorTexture();
        this.floor.material = this.#createMaterial(texture);

        // Update shadow receiving
        this.floor.receiveShadow = ambienceEnabled;
        console.log(`Floor material updated for ambience: ${ambienceEnabled}`);
    }

    /**
     * Update reflection settings (no-op for simplified floor)
     */
    updateReflectionSettings() {
        // No reflections in simplified floor
    }

    /**
     * Check if floor is currently active
     * @returns {boolean}
     */
    isActive() {
        return this.floor !== null;
    }

    /**
     * Set floor Y position (SCENE.md §1: floor is 3px below tallest slide's bottom)
     * @param {number} y - Y position for the floor plane
     */
    setPositionY(y) {
        if (!this.floor) {
            console.warn('[FloorManager] Cannot set position: floor not created');
            return;
        }
        if (typeof y !== 'number' || isNaN(y)) {
            console.warn(`[FloorManager] Invalid Y position: ${y}, keeping current position`);
            return;
        }
        const previousY = this.floor.position.y;
        this.floor.position.y = y;
        console.log(`[FloorManager] Floor position updated: ${previousY} → ${y}`);
    }

    /**
     * Dispose all floor resources
     */
    dispose() {
        this.remove();
        console.log('[FloorManager] Disposed');
    }
}
