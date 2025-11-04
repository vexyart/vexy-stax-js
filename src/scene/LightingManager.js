// src/scene/LightingManager.js
// this_file: src/scene/LightingManager.js

import * as THREE from 'three';
import {
    AMBIENT_INTENSITY_RANGE,
    EMISSIVE_INTENSITY_RANGE,
    MAIN_LIGHT_SETTINGS,
    FILL_LIGHT_SETTINGS,
    HEMISPHERE_LIGHT_SETTINGS
} from '../core/constants.js';

/**
 * Calculate relative luminance of a color (0-1 range)
 * Uses formula from WCAG 2.0
 * @param {string} hexColor - Hex color string (e.g. '#ffffff')
 * @returns {number} Luminance value between 0 (black) and 1 (white)
 */
function calculateLuminance(hexColor) {
    // Parse hex color to RGB
    const color = new THREE.Color(hexColor);
    const r = color.r;
    const g = color.g;
    const b = color.b;

    // Apply gamma correction
    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // Calculate luminance
    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Get adaptive ambient light intensity based on background luminance
 * Dark backgrounds need more light, bright backgrounds need less
 * @param {number} luminance - Background luminance (0-1)
 * @returns {number} Ambient light intensity
 */
function getAdaptiveAmbientIntensity(luminance) {
    // Reduced intensity range to prevent overexposure
    // Range: 0.5 (bright bg) to 0.8 (dark bg)
    const { min, max } = AMBIENT_INTENSITY_RANGE;

    // Inverse relationship: darker background = more light
    return max - (luminance * (max - min));
}

/**
 * Get adaptive emissive intensity for materials based on background luminance
 * Helps slides remain visible on dark backgrounds and prevents washout on bright ones
 * @param {number} luminance - Background luminance (0-1)
 * @returns {number} Emissive intensity (0-1)
 */
export function getAdaptiveEmissiveIntensity(luminance) {
    // For dark backgrounds, add subtle emissive glow
    // For bright backgrounds, reduce emissive to near zero
    // Range: 0.05 (bright bg) to 0.25 (dark bg)
    const { min, max } = EMISSIVE_INTENSITY_RANGE;

    // Inverse relationship: darker background = more emissive
    return max - (luminance * (max - min));
}

/**
 * LightingManager - Manages scene lighting (ambient, directional, hemisphere)
 *
 * Responsibilities:
 * - Create and configure scene lights
 * - Calculate adaptive lighting based on background luminance
 * - Update lighting when background changes
 * - Provide emissive intensity for materials
 * - Dispose light resources
 */
export class LightingManager {
    constructor(scene, params) {
        this.scene = scene;
        this.params = params;

        /** @type {THREE.AmbientLight|null} */
        this.ambientLight = null;

        /** @type {THREE.DirectionalLight|null} */
        this.mainLight = null;

        /** @type {THREE.DirectionalLight|null} */
        this.fillLight = null;

        /** @type {THREE.HemisphereLight|null} */
        this.hemisphereLight = null;
    }

    /**
     * Setup all scene lights
     */
    setup() {
        // Defensive checks
        if (!this.scene) {
            throw new Error('[LightingManager] Cannot setup: scene is required');
        }
        if (!this.params || !this.params.bgColor) {
            throw new Error('[LightingManager] Cannot setup: params with bgColor is required');
        }

        // Calculate adaptive ambient light intensity based on background
        const bgLuminance = calculateLuminance(this.params.bgColor);
        const ambientIntensity = getAdaptiveAmbientIntensity(bgLuminance);

        // Ambient light with adaptive intensity
        this.ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
        this.scene.add(this.ambientLight);

        // Main directional light (sun-like) with high-quality shadows
        this.mainLight = new THREE.DirectionalLight(0xffffff, MAIN_LIGHT_SETTINGS.intensity);
        this.mainLight.position.set(
            MAIN_LIGHT_SETTINGS.position.x,
            MAIN_LIGHT_SETTINGS.position.y,
            MAIN_LIGHT_SETTINGS.position.z
        );
        this.mainLight.castShadow = true;

        // Configure high-quality shadow properties for photorealism
        this.mainLight.shadow.mapSize.width = MAIN_LIGHT_SETTINGS.shadow.mapSize;
        this.mainLight.shadow.mapSize.height = MAIN_LIGHT_SETTINGS.shadow.mapSize;
        this.mainLight.shadow.camera.near = MAIN_LIGHT_SETTINGS.shadow.camera.near;
        this.mainLight.shadow.camera.far = MAIN_LIGHT_SETTINGS.shadow.camera.far;
        this.mainLight.shadow.camera.left = MAIN_LIGHT_SETTINGS.shadow.camera.left;
        this.mainLight.shadow.camera.right = MAIN_LIGHT_SETTINGS.shadow.camera.right;
        this.mainLight.shadow.camera.top = MAIN_LIGHT_SETTINGS.shadow.camera.top;
        this.mainLight.shadow.camera.bottom = MAIN_LIGHT_SETTINGS.shadow.camera.bottom;
        this.mainLight.shadow.bias = MAIN_LIGHT_SETTINGS.shadow.bias;
        this.mainLight.shadow.normalBias = MAIN_LIGHT_SETTINGS.shadow.normalBias;
        this.mainLight.shadow.radius = MAIN_LIGHT_SETTINGS.shadow.radius;
        this.mainLight.shadow.blurSamples = MAIN_LIGHT_SETTINGS.shadow.blurSamples;

        this.scene.add(this.mainLight);

        // Fill light from opposite side for softer shadows and ambient feel
        this.fillLight = new THREE.DirectionalLight(0xffffff, FILL_LIGHT_SETTINGS.intensity);
        this.fillLight.position.set(
            FILL_LIGHT_SETTINGS.position.x,
            FILL_LIGHT_SETTINGS.position.y,
            FILL_LIGHT_SETTINGS.position.z
        );
        this.scene.add(this.fillLight);

        // Add hemisphere light for realistic sky/ground ambient lighting
        this.hemisphereLight = new THREE.HemisphereLight(
            HEMISPHERE_LIGHT_SETTINGS.skyColor,
            HEMISPHERE_LIGHT_SETTINGS.groundColor,
            HEMISPHERE_LIGHT_SETTINGS.intensity
        );
        this.scene.add(this.hemisphereLight);

        console.log(`Lighting setup complete (bg luminance: ${bgLuminance.toFixed(2)}, ambient: ${ambientIntensity.toFixed(2)})`);
    }

    /**
     * Update lighting based on current background color
     * Called when background color changes
     */
    update() {
        if (!this.ambientLight) return;

        const bgLuminance = calculateLuminance(this.params.bgColor);
        const newIntensity = getAdaptiveAmbientIntensity(bgLuminance);

        this.ambientLight.intensity = newIntensity;
        console.log(`Lighting updated (bg luminance: ${bgLuminance.toFixed(2)}, ambient: ${newIntensity.toFixed(2)})`);
    }

    /**
     * Get emissive intensity for materials based on current background
     * @returns {number} Emissive intensity (0-1)
     */
    getEmissiveIntensity() {
        const bgLuminance = calculateLuminance(this.params.bgColor);
        return getAdaptiveEmissiveIntensity(bgLuminance);
    }

    /**
     * Dispose all lights
     */
    dispose() {
        if (this.ambientLight) {
            this.scene.remove(this.ambientLight);
            this.ambientLight = null;
        }
        if (this.mainLight) {
            this.scene.remove(this.mainLight);
            this.mainLight = null;
        }
        if (this.fillLight) {
            this.scene.remove(this.fillLight);
            this.fillLight = null;
        }
        if (this.hemisphereLight) {
            this.scene.remove(this.hemisphereLight);
            this.hemisphereLight = null;
        }

        console.log('[LightingManager] Disposed');
    }
}
