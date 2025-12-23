// SPDX-License-Identifier: Apache-2.0
// this_file: src/core/SceneComposition.js
/**
 * SceneComposition centralises image stack mutations and mesh lifecycle
 * management. It constructs meshes from textures, coordinates with the Three.js
 * scene, and triggers callbacks so the UI and history systems stay in sync.
 */

import * as THREE from 'three';

import { reorderList } from './ordering.js';
import { storeSharedRef, SHARED_STATE_KEYS } from './sharedState.js';

const MAX_THUMBNAIL_DIMENSION = 400;

/**
 * @typedef {Object} SceneCompositionOptions
 * @property {THREE.Scene} scene
 * @property {Record<string, any>} params
 * @property {Array} imageStack
 * @property {() => void} saveHistory
 * @property {(reason: string) => void} emitStackUpdated
 * @property {() => void} updateImageList
 * @property {(message: string, type?: string, duration?: number) => void} showToast
 * @property {(isAdding: boolean) => boolean} checkMemoryUsage
 * @property {{ info: Function, warn: Function }} logImages
 * @property {{ info: Function }} logMemory
 * @property {(hex: string) => number} [calculateLuminance]
 * @property {(luminance: number) => number} [getAdaptiveEmissiveIntensity]
 * @property {() => number} [getEffectiveZSpacing]
 * @property {(slideCount: number) => void} [onFirstSlide] - Called when first slide is added (SCENE.md §2)
 * @property {(floorY: number, stackDepth: number, zSpacing: number) => void} [onLayoutChanged] - Called when layout changes (SCENE.md §1)
 */

export class SceneComposition {
    /**
     * @param {SceneCompositionOptions} options
     */
    constructor(options) {
        this.scene = options.scene;
        this.params = options.params;
        this.imageStack = options.imageStack;
        this.saveHistory = options.saveHistory;
        this.emitStackUpdated = options.emitStackUpdated;
        this.updateImageList = options.updateImageList;
        this.showToast = options.showToast;
        this.checkMemoryUsage = options.checkMemoryUsage;
        this.logImages = options.logImages ?? { info: () => {}, warn: () => {} };
        this.logMemory = options.logMemory ?? { info: () => {} };
        this.calculateLuminance = options.calculateLuminance ?? (() => 0.5);
        this.getAdaptiveEmissiveIntensity = options.getAdaptiveEmissiveIntensity ?? (() => 0.25);
        // Default to params.zSpacing if no getter provided, but prefer the getter for null handling
        this.getEffectiveZSpacing = options.getEffectiveZSpacing ?? (() => this.params.zSpacing ?? 100);
        // SCENE.md §2: Called when first slide added to empty stack
        this.onFirstSlide = options.onFirstSlide ?? null;
        // SCENE.md §1: Called when vertical layout changes (floor needs repositioning)
        this.onLayoutChanged = options.onLayoutChanged ?? null;
    }

    /**
     * Add a texture-backed image plane to the scene and stack.
     * @param {THREE.Texture} texture
     * @param {string} filename
     * @returns {void}
     */
    addImage(texture, filename) {
        this.saveHistory();

        // SCENE.md §2: Detect if this is the first slide (stack was empty)
        const wasEmpty = this.imageStack.length === 0;

        const { mesh, planeWidth, planeHeight } = this.#createMeshFromTexture(texture);

        this.scene.add(mesh);

        const imageData = {
            mesh,
            texture,
            filename,
            width: planeWidth,
            height: planeHeight,
            originalWidth: texture.image.width,
            originalHeight: texture.image.height,
            id: Date.now() + Math.random(),
            thumbnailSrc: texture.image?.currentSrc || texture.image?.src || ''
        };

        this.imageStack.push(imageData);
        storeSharedRef(SHARED_STATE_KEYS.imageStack, this.imageStack);

        // SCENE.md §1: Recalculate layout to center tallest slide and bottom-align all
        this.#recalculateLayout();

        this.updateImageList();
        this.emitStackUpdated('added');
        this.logImages.info(`Added ${filename} to stack (${this.imageStack.length} images total)`);

        if (typeof this.checkMemoryUsage === 'function') {
            this.checkMemoryUsage(false);
        }

        // SCENE.md §2: Trigger first-slide defaults when first slide added
        if (wasEmpty && typeof this.onFirstSlide === 'function') {
            this.onFirstSlide(this.imageStack.length);
        }
    }

    /**
     * Remove all images and meshes from the scene.
     */
    clearAll() {
        if (this.imageStack.length === 0) {
            return;
        }

        this.saveHistory();

        this.imageStack.forEach((imageData) => {
            this.scene.remove(imageData.mesh);
            imageData.mesh.geometry?.dispose();
            imageData.mesh.material?.dispose();
            if (imageData.mesh.material?.map) {
                imageData.mesh.material.map.dispose();
            }
        });

        this.imageStack.length = 0;
        storeSharedRef(SHARED_STATE_KEYS.imageStack, this.imageStack);

        this.updateImageList();
        this.emitStackUpdated('cleared');
        this.logImages.info('All images cleared');
        this.showToast('🗑️ All images cleared', 'info');

        if (typeof this.checkMemoryUsage === 'function') {
            this.checkMemoryUsage(false);
        }
    }

    /**
     * Delete image at index.
     * @param {number} index
     */
    deleteAt(index) {
        if (index < 0 || index >= this.imageStack.length) {
            return;
        }

        this.saveHistory();

        const [imageData] = this.imageStack.splice(index, 1);
        this.scene.remove(imageData.mesh);

        imageData.mesh.geometry?.dispose();
        imageData.mesh.material?.dispose();
        if (imageData.mesh.material?.map) {
            imageData.mesh.material.map.dispose();
        }

        this.#recalculateLayout();
        storeSharedRef(SHARED_STATE_KEYS.imageStack, this.imageStack);

        this.updateImageList();
        this.emitStackUpdated('removed');
        this.showToast(`🗑️ Deleted ${imageData.filename}`, 'info');
        this.logImages.info(`Deleted image at index ${index}`);

        if (typeof this.checkMemoryUsage === 'function') {
            this.checkMemoryUsage(false);
        }
    }

    /**
     * Reorder stack by moving one index to another.
     * @param {number} fromIndex
     * @param {number} toIndex
     */
    reorder(fromIndex, toIndex) {
        if (
            fromIndex < 0 ||
            toIndex < 0 ||
            fromIndex >= this.imageStack.length ||
            toIndex >= this.imageStack.length ||
            fromIndex === toIndex
        ) {
            return;
        }

        this.saveHistory();
        reorderList(this.imageStack, fromIndex, toIndex);
        this.#recalculateLayout();
        storeSharedRef(SHARED_STATE_KEYS.imageStack, this.imageStack);

        this.updateImageList();
        this.emitStackUpdated('reordered');
        this.logImages.info(`Reordered: moved ${fromIndex} to ${toIndex}`);
    }

    /**
     * Apply material preset to existing meshes.
     * @param {{ roughness: number, metalness: number, thickness: number, borderWidth: number }} preset
     */
    applyMaterialPreset(preset) {
        this.params.materialRoughness = preset.roughness;
        this.params.materialMetalness = preset.metalness;
        this.params.materialThickness = preset.thickness;
        this.params.materialBorderWidth = preset.borderWidth;

        this.imageStack.forEach((imageData) => {
            this.scene.remove(imageData.mesh);
            imageData.mesh.geometry?.dispose();
            imageData.mesh.material?.dispose();

            // Use current display dimensions (width/height) not original pixel dimensions
            // This preserves mesh size when changing materials, even for JSON-imported images
            const { mesh } = this.#createMeshFromTexture(imageData.texture, {
                width: imageData.width,
                height: imageData.height
            });

            const texture = imageData.texture;
            if (this.params.ambience && mesh.material instanceof THREE.MeshStandardMaterial) {
                const bgLuminance = this.calculateLuminance(this.params.bgColor);
                const emissiveIntensity = this.getAdaptiveEmissiveIntensity(bgLuminance);
                mesh.material.emissive = new THREE.Color(0xffffff);
                mesh.material.emissiveMap = texture;
                mesh.material.emissiveIntensity = emissiveIntensity;
                mesh.material.envMapIntensity = 0.55;
                mesh.material.needsUpdate = true;
            }

            imageData.mesh = mesh;
            imageData.width = mesh.geometry.parameters.width ?? imageData.width;
            imageData.height = mesh.geometry.parameters.height ?? imageData.height;
            this.scene.add(mesh);
        });

        // SCENE.md §1: Recalculate layout after mesh recreation
        this.#recalculateLayout();

        this.logImages.info(`Material applied to ${this.imageStack.length} images`);
    }

    /**
     * Access current stack (for read-only inspection).
     * @returns {Array}
     */
    getStack() {
        return this.imageStack;
    }

    /**
     * Force recalculation of vertical layout.
     * SCENE.md §1: Called externally after bulk operations (e.g., JSON import).
     */
    recalculateLayout() {
        this.#recalculateLayout();
    }

    #createMeshFromTexture(texture, overrideDimensions) {
        const sourceWidth = overrideDimensions?.width ?? texture.image.width;
        const sourceHeight = overrideDimensions?.height ?? texture.image.height;

        let planeWidth = sourceWidth;
        let planeHeight = sourceHeight;

        // Only apply MAX_THUMBNAIL_DIMENSION clamping for NEW images (no override)
        // When overrideDimensions provided, preserve exact size (e.g., material change)
        if (!overrideDimensions) {
            if (sourceWidth >= sourceHeight && sourceWidth > MAX_THUMBNAIL_DIMENSION) {
                planeWidth = MAX_THUMBNAIL_DIMENSION;
                planeHeight = (sourceHeight / sourceWidth) * MAX_THUMBNAIL_DIMENSION;
            } else if (sourceHeight > MAX_THUMBNAIL_DIMENSION) {
                planeHeight = MAX_THUMBNAIL_DIMENSION;
                planeWidth = (sourceWidth / sourceHeight) * MAX_THUMBNAIL_DIMENSION;
            }
        }

        const geometry = this.params.materialThickness > 1
            ? new THREE.BoxGeometry(planeWidth, planeHeight, this.params.materialThickness)
            : new THREE.PlaneGeometry(planeWidth, planeHeight);

        const material = this.params.ambience
            ? new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.FrontSide,
                transparent: true,
                roughness: this.params.materialRoughness,
                metalness: this.params.materialMetalness,
                envMapIntensity: 0.15
            })
            : new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.FrontSide,
                transparent: true
            });

        const mesh = new THREE.Mesh(geometry, material);

        if (this.params.ambience) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        }

        if (this.params.materialBorderWidth > 0) {
            const borderWidth = planeWidth + this.params.materialBorderWidth * 2;
            const borderHeight = planeHeight + this.params.materialBorderWidth * 2;
            const borderGeometry = new THREE.PlaneGeometry(borderWidth, borderHeight);
            const borderMaterial = new THREE.MeshStandardMaterial({
                color: this.params.materialBorderColor,
                side: THREE.FrontSide,
                roughness: this.params.materialRoughness,
                metalness: this.params.materialMetalness
            });
            borderMaterial.envMapIntensity = 0.35;

            const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
            borderMesh.position.z = -0.5;

            if (this.params.ambience) {
                borderMesh.castShadow = true;
                borderMesh.receiveShadow = true;
            }

            mesh.add(borderMesh);
        }

        return { mesh, planeWidth, planeHeight };
    }

    /**
     * Get the height of the tallest slide in the stack.
     * @returns {number} Tallest slide height, or 0 if stack is empty
     */
    #getTallestHeight() {
        if (this.imageStack.length === 0) return 0;
        return Math.max(...this.imageStack.map(img => img.height));
    }

    /**
     * Get the current floor Y position.
     * SCENE.md: Floor is 3px below the bottom of the tallest slide.
     * @returns {number} The Y position for the floor
     */
    getFloorY() {
        const tallestHeight = this.#getTallestHeight();
        if (tallestHeight === 0) return 0; // Default when no slides
        // Tallest slide centered at Y=0, bottom at -tallestHeight/2
        // Floor is 3px below that
        return -tallestHeight / 2 - 3;
    }

    /**
     * Recalculate Z and Y positions for all slides and notify floor.
     * SCENE.md:
     * - Tallest slide is vertically centered in scene (center at Y=0)
     * - All slides are bottom-aligned to the tallest slide's bottom
     * - Floor is positioned 3px below the slides
     * - Floor size adapts to stack depth and zSpacing
     */
    #recalculateLayout() {
        if (this.imageStack.length === 0) return;

        const tallestHeight = this.#getTallestHeight();
        // Guard against invalid height (could cause NaN)
        if (!tallestHeight || tallestHeight <= 0) {
            console.warn('[SceneComposition] Invalid tallestHeight:', tallestHeight);
            return;
        }

        // Tallest slide center at Y=0, so bottom at -tallestHeight/2
        const bottomY = -tallestHeight / 2;

        const zSpacing = this.getEffectiveZSpacing();
        const slideCount = this.imageStack.length;
        // PLAN.md §1: Final slide at z=0, others at negative z
        this.imageStack.forEach((imageData, index) => {
            const offset = (slideCount - 1 - index) * zSpacing;
            imageData.mesh.position.z = offset === 0 ? 0 : -offset;
            // Bottom-align: bottom edge at bottomY, center at bottomY + height/2
            const height = imageData.mesh.geometry.parameters.height ?? imageData.height;
            imageData.mesh.position.y = bottomY + (height / 2);
        });

        // Calculate stack depth (Z-span from first to last slide)
        // With new coordinate system: slides span from z=-stackDepth to z=0
        const stackDepth = (slideCount - 1) * zSpacing;

        // SCENE.md: Floor is 3px below the bottom of all slides
        const floorY = bottomY - 3;
        console.log(`[SceneComposition] Layout: tallest=${tallestHeight}, bottomY=${bottomY}, floorY=${floorY}, stackDepth=${stackDepth}, zRange=[${-stackDepth}, 0]`);

        // Notify floor manager to update position and size
        if (typeof this.onLayoutChanged === 'function') {
            this.onLayoutChanged(floorY, stackDepth, zSpacing);
        } else {
            console.warn('[SceneComposition] onLayoutChanged callback not set');
        }
    }
}
