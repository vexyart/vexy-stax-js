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
     * Create floor plane at Y=0
     */
    create() {
        if (!this.scene) {
            throw new Error('[FloorManager] Cannot create floor: scene is required.');
        }

        if (this.floor) {
            console.warn('[FloorManager] Floor already exists, skipping creation');
            return;
        }

        const floorColor = this.#getFloorColor();
        const r = this.#normalizeColorComponent(floorColor.r);
        const g = this.#normalizeColorComponent(floorColor.g);
        const b = this.#normalizeColorComponent(floorColor.b);

        const geometry = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(r, g, b),
            transparent: true,
            opacity: floorColor.a,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        this.floor = new THREE.Mesh(geometry, material);
        this.floor.rotation.x = -Math.PI / 2; // Lay flat
        this.floor.position.y = FLOOR_Y;
        this.floor.name = 'floor';

        this.scene.add(this.floor);
        console.log(`Floor created at y=${FLOOR_Y}`);

        if (this.onAmbienceChange) {
            this.onAmbienceChange(true);
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
     * Update floor color and opacity from params
     */
    updateColor() {
        if (!this.floor) {
            return;
        }

        const floorColor = this.#getFloorColor();

        // Normalize RGB values (handles both 0-255 and 0-1 formats)
        const r = this.#normalizeColorComponent(floorColor.r);
        const g = this.#normalizeColorComponent(floorColor.g);
        const b = this.#normalizeColorComponent(floorColor.b);

        this.floor.material.color.setRGB(r, g, b);
        // Alpha is always 0-1 range
        this.floor.material.opacity = floorColor.a;
        this.floor.material.needsUpdate = true;
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
     * Dispose all floor resources
     */
    dispose() {
        this.remove();
        console.log('[FloorManager] Disposed');
    }
}
