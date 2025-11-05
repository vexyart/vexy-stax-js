// SPDX-License-Identifier: Apache-2.0
// this_file: src/core/SceneComposition.js
/**
 * SceneComposition centralises image stack mutations and mesh lifecycle
 * management. It constructs meshes from textures, coordinates with the Three.js
 * scene, and triggers callbacks so the UI and history systems stay in sync.
 */

import * as THREE from 'three';

import { FLOOR_Y } from './constants.js';
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
    }

    /**
     * Add a texture-backed image plane to the scene and stack.
     * @param {THREE.Texture} texture
     * @param {string} filename
     * @returns {void}
     */
    addImage(texture, filename) {
        this.saveHistory();

        const { mesh, planeWidth, planeHeight } = this.#createMeshFromTexture(texture);
        const index = this.imageStack.length;
        const zPosition = index * this.params.zSpacing;

        if (this.params.ambience) {
            mesh.position.y = FLOOR_Y + (planeHeight / 2);
        }
        mesh.position.z = zPosition;

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

        this.updateImageList();
        this.emitStackUpdated('added');
        this.logImages.info(`Added ${filename} to stack at Z=${zPosition} (${this.imageStack.length} images total)`);

        if (typeof this.checkMemoryUsage === 'function') {
            this.checkMemoryUsage(false);
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

        this.#reflowZPositions();
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

        reorderList(this.imageStack, fromIndex, toIndex);
        this.#reflowZPositions();
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

        this.imageStack.forEach((imageData, index) => {
        this.scene.remove(imageData.mesh);
        imageData.mesh.geometry?.dispose();
        imageData.mesh.material?.dispose();

        const { mesh } = this.#createMeshFromTexture(imageData.texture, {
            width: imageData.originalWidth,
            height: imageData.originalHeight
        });

        mesh.position.z = index * this.params.zSpacing;
        if (this.params.ambience) {
            const planeHeight = mesh.geometry.parameters.height ?? imageData.height;
            mesh.position.y = FLOOR_Y + (planeHeight / 2);
        }

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

        this.logImages.info(`Material applied to ${this.imageStack.length} images`);
    }

    /**
     * Access current stack (for read-only inspection).
     * @returns {Array}
     */
    getStack() {
        return this.imageStack;
    }

    #createMeshFromTexture(texture, overrideDimensions) {
        const sourceWidth = overrideDimensions?.width ?? texture.image.width;
        const sourceHeight = overrideDimensions?.height ?? texture.image.height;

        let planeWidth = sourceWidth;
        let planeHeight = sourceHeight;

        if (sourceWidth >= sourceHeight && sourceWidth > MAX_THUMBNAIL_DIMENSION) {
            planeWidth = MAX_THUMBNAIL_DIMENSION;
            planeHeight = (sourceHeight / sourceWidth) * MAX_THUMBNAIL_DIMENSION;
        } else if (sourceHeight > MAX_THUMBNAIL_DIMENSION) {
            planeHeight = MAX_THUMBNAIL_DIMENSION;
            planeWidth = (sourceWidth / sourceHeight) * MAX_THUMBNAIL_DIMENSION;
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

    #reflowZPositions() {
        this.imageStack.forEach((imageData, index) => {
            imageData.mesh.position.z = index * this.params.zSpacing;
            if (this.params.ambience) {
                const height = imageData.mesh.geometry.parameters.height ?? imageData.height;
                imageData.mesh.position.y = FLOOR_Y + (height / 2);
            }
        });
    }
}
