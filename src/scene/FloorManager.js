// src/scene/FloorManager.js
// this_file: src/scene/FloorManager.js

import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import {
    FLOOR_Y,
    FLOOR_SIZE,
    REFLECTION_TEXTURE_BASE,
    REFLECTION_MIN_RESOLUTION,
    REFLECTION_OPACITY,
    REFLECTION_BLUR_RADIUS,
    REFLECTION_FADE_STRENGTH,
    FLOOR_BASE_MATERIAL,
    FLOOR_REFLECTOR_OFFSET,
    SoftReflectorShader
} from '../core/constants.js';

/**
 * Get reflection render target resolution based on viewport and pixel ratio
 * @returns {{width: number, height: number, pixelRatio: number}}
 */
function getReflectionResolution() {
    const pixelRatio = window.devicePixelRatio || 1;
    const width = Math.max(
        REFLECTION_MIN_RESOLUTION,
        Math.round(window.innerWidth * pixelRatio * REFLECTION_TEXTURE_BASE)
    );
    const height = Math.max(
        REFLECTION_MIN_RESOLUTION,
        Math.round(window.innerHeight * pixelRatio * REFLECTION_TEXTURE_BASE)
    );
    return { width, height, pixelRatio };
}

/**
 * Floor color should MATCH background exactly for seamless ambience
 * Depth comes from shadows and reflections, not floor color contrast
 * @param {string} bgColor - Hex color string
 * @returns {THREE.Color}
 */
function getAdaptiveFloorColor(bgColor) {
    return new THREE.Color(bgColor);
}

/**
 * FloorManager - Manages reflective floor with ambience mode
 *
 * Responsibilities:
 * - Create floor plane with reflective shader
 * - Toggle ambience mode on/off
 * - Update floor color to match background
 * - Update reflection resolution on resize
 * - Dispose floor resources
 */
export class FloorManager {
    constructor(scene, params) {
        this.scene = scene;
        this.params = params;

        /** @type {THREE.Group|null} */
        this.floorGroup = null;

        /** @type {THREE.Mesh|null} */
        this.floorBase = null;

        /** @type {Reflector|null} */
        this.floorReflector = null;

        // Callback for when floor is created/removed (used to update image materials)
        /** @type {Function|null} */
        this.onAmbienceChange = null;
    }

    /**
     * Create reflective floor
     */
    create() {
        // Defensive checks
        if (!this.scene) {
            throw new Error('[FloorManager] Cannot create floor: scene is required');
        }
        if (!this.params || !this.params.bgColor) {
            throw new Error('[FloorManager] Cannot create floor: params with bgColor is required');
        }

        if (this.floorGroup) {
            console.warn('[FloorManager] Floor already exists, skipping creation');
            return;
        }

        const { width, height, pixelRatio } = getReflectionResolution();

        this.floorGroup = new THREE.Group();
        this.floorGroup.name = 'ambience-floor';

        // Create base floor plane
        const baseGeometry = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
        const floorColor = getAdaptiveFloorColor(this.params.bgColor);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: floorColor,
            roughness: FLOOR_BASE_MATERIAL.roughness,
            metalness: FLOOR_BASE_MATERIAL.metalness,
            envMapIntensity: FLOOR_BASE_MATERIAL.envMapIntensity,
            side: THREE.DoubleSide
        });

        this.floorBase = new THREE.Mesh(baseGeometry, baseMaterial);
        this.floorBase.rotation.x = -Math.PI / 2;
        this.floorBase.position.y = FLOOR_Y;
        this.floorBase.receiveShadow = true;

        // Create reflector plane
        const reflectionGeometry = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
        this.floorReflector = new Reflector(reflectionGeometry, {
            textureWidth: width,
            textureHeight: height,
            shader: SoftReflectorShader,
            multisample: Math.max(2, Math.round(pixelRatio * 2))
        });
        this.floorReflector.rotation.x = -Math.PI / 2;
        this.floorReflector.position.y = FLOOR_Y + FLOOR_REFLECTOR_OFFSET;
        this.floorReflector.material.transparent = true;
        this.floorReflector.material.depthWrite = false;
        this.floorReflector.material.uniforms.color.value.copy(floorColor);
        this.floorReflector.material.uniforms.opacity.value = REFLECTION_OPACITY;
        this.floorReflector.material.uniforms.blurRadius.value = REFLECTION_BLUR_RADIUS / pixelRatio;
        this.floorReflector.material.uniforms.fadeStrength.value = REFLECTION_FADE_STRENGTH;
        this.floorReflector.material.uniforms.floorSize.value = FLOOR_SIZE;

        this.floorGroup.add(this.floorBase);
        this.floorGroup.add(this.floorReflector);
        this.scene.add(this.floorGroup);

        this.updateReflectionSettings();

        console.log(`Floor created at y=${FLOOR_Y} with ambience reflections (texture ${width}x${height})`);

        // Notify that ambience is enabled
        if (this.onAmbienceChange) {
            this.onAmbienceChange(true);
        }
    }

    /**
     * Remove floor from scene
     */
    remove() {
        if (!this.floorGroup) {
            return;
        }

        this.scene.remove(this.floorGroup);

        if (this.floorReflector) {
            this.floorReflector.dispose();
            this.floorReflector = null;
        }

        if (this.floorBase) {
            this.floorBase.geometry.dispose();
            this.floorBase.material.dispose();
            this.floorBase = null;
        }

        this.floorGroup = null;

        console.log('Floor removed');

        // Notify that ambience is disabled
        if (this.onAmbienceChange) {
            this.onAmbienceChange(false);
        }
    }

    /**
     * Update floor color to match background
     * @param {string} bgColor - Hex color string
     */
    updateColor(bgColor) {
        if (!this.floorBase || !this.floorReflector) {
            return;
        }

        const floorColor = getAdaptiveFloorColor(bgColor);
        this.floorBase.material.color.copy(floorColor);
        this.floorReflector.material.uniforms.color.value.copy(floorColor);
    }

    /**
     * Update reflection resolution (called on window resize)
     */
    updateReflectionSettings() {
        if (!this.floorReflector) {
            return;
        }

        const { width, height, pixelRatio } = getReflectionResolution();
        const target = this.floorReflector.getRenderTarget();

        if (target.width !== width || target.height !== height) {
            target.setSize(width, height);
        }

        this.floorReflector.material.uniforms.blurRadius.value = REFLECTION_BLUR_RADIUS / pixelRatio;
        this.floorReflector.material.uniforms.floorSize.value = FLOOR_SIZE;
    }

    /**
     * Check if floor is currently active
     * @returns {boolean}
     */
    isActive() {
        return this.floorGroup !== null;
    }

    /**
     * Dispose all floor resources
     */
    dispose() {
        this.remove();
        console.log('[FloorManager] Disposed');
    }
}
