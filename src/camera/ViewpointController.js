// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/camera/ViewpointController.js

import * as THREE from 'three';
import { createLogger } from '../utils/logger.js';
import {
    MIN_LAYER_GAP,
    CAMERA_MIN_DISTANCE,
    DEFAULT_CAMERA_FOV
} from '../core/constants.js';

// Padding multiplier for fit-to-frame calculations
const FRONT_VIEW_PADDING = 1.0;

const log = createLogger('ViewpointController');

/**
 * ViewpointController - Manages camera viewpoints and slide positioning
 *
 * Extracts viewpoint-related functions from main.js:
 * - setHeroViewpoint(): Collapse slides for hero shot
 * - restoreSlideZPositions(): Restore spacing after hero
 * - setBeautyViewpoint(): Three-quarter beauty angle
 * - setViewpointFitToFrame(): Fit front slide in frame
 * - centerViewOnContent(): Center camera on content
 *
 * @example
 * const controller = new ViewpointController({
 *     camera, controls, params, imageStack,
 *     getEffectiveZSpacing: () => params.zSpacing || AUTO_SPACING
 * });
 *
 * controller.setHeroViewpoint();
 * // Later...
 * controller.setBeautyViewpoint(); // Restores z-positions automatically
 */
export class ViewpointController {
    /**
     * @param {Object} options
     * @param {THREE.PerspectiveCamera} options.camera
     * @param {Object} options.controls - OrbitControls
     * @param {Object} options.params - Application parameters
     * @param {Array} options.imageStack - Image stack array
     * @param {Function} options.getEffectiveZSpacing - Returns current z-spacing
     * @param {Object} [options.cameraController] - Legacy CameraController for delegation
     * @param {Object} [options.pane] - Tweakpane for refresh
     * @param {Function} [options.onViewpointChanged] - Callback when viewpoint changes
     */
    constructor(options) {
        if (!options.camera) {
            throw new Error('[ViewpointController] camera is required. Fix: Pass a THREE.PerspectiveCamera.');
        }
        if (!options.controls) {
            throw new Error('[ViewpointController] controls is required. Fix: Pass OrbitControls instance.');
        }
        if (!options.params) {
            throw new Error('[ViewpointController] params is required. Fix: Pass the application params object.');
        }
        if (typeof options.getEffectiveZSpacing !== 'function') {
            throw new Error('[ViewpointController] getEffectiveZSpacing function is required.');
        }

        this.camera = options.camera;
        this.controls = options.controls;
        this.params = options.params;
        this.imageStack = options.imageStack || [];
        this.getEffectiveZSpacing = options.getEffectiveZSpacing;

        // Optional
        this.cameraController = options.cameraController || null;
        this.pane = options.pane || null;
        this.onViewpointChanged = options.onViewpointChanged || null;

        /** @private */
        this.savedHeroZSpacing = null;
    }

    /**
     * Set reference (for incremental migration)
     * @param {string} name - Reference name
     * @param {any} value - Reference value
     */
    setRef(name, value) {
        if (name === 'cameraController') this.cameraController = value;
        else if (name === 'pane') this.pane = value;
        else if (name === 'imageStack') this.imageStack = value;
    }

    /**
     * Restore slide Z positions after Hero mode
     * Only restores if we were previously in Hero mode
     */
    restoreSlideZPositions() {
        if (this.savedHeroZSpacing === null) {
            return;
        }

        const effectiveSpacing = this.getEffectiveZSpacing();
        this.imageStack.forEach((imageData, index) => {
            imageData.mesh.position.z = index * effectiveSpacing;
        });

        log.info(`Z-positions restored to spacing ${effectiveSpacing}px`);
        this.savedHeroZSpacing = null;
    }

    /**
     * Check if currently in Hero mode (slides collapsed)
     * @returns {boolean}
     */
    isInHeroMode() {
        return this.savedHeroZSpacing !== null;
    }

    /**
     * Set viewpoint to Hero view - front view with slides collapsed
     * Resets X/Y offsets and sets Z to fit-to-frame value
     */
    setHeroViewpoint() {
        this.params.viewpointPreset = 'hero';

        // Reset X/Y offsets
        if (this.cameraController?.resetOffset) {
            this.cameraController.resetOffset();
        } else {
            this.params.cameraOffsetX = 0;
            this.params.cameraOffsetY = 0;
        }

        // Reset controls target
        this.controls.target.set(0, 0, 0);

        // Save current spacing (only if not already in Hero mode)
        if (this.savedHeroZSpacing === null) {
            this.savedHeroZSpacing = this.getEffectiveZSpacing();
        }

        // Collapse slides with MIN_LAYER_GAP spacing
        // Front slide at z=0, back slides at negative z
        const slideCount = this.imageStack.length;
        this.imageStack.forEach((imageData, index) => {
            const offset = (slideCount - 1 - index) * MIN_LAYER_GAP;
            imageData.mesh.position.z = offset === 0 ? 0 : -offset;
        });

        // Calculate camera distance to fit front slide
        this.#calculateHeroDistance();

        // Set camera to fit (skip restore to keep collapsed, skip preset change to stay 'hero')
        this.setViewpointFitToFrame({ skipRestore: true, skipPresetChange: true });

        this.pane?.refresh?.();
        log.info('Hero view: slides collapsed, X/Y reset, distance fit to frame');

        this.#emitChange('hero');
    }

    /**
     * Set viewpoint to fit frontmost slide within studio frame
     * @param {Object} [options]
     * @param {boolean} [options.skipRestore=false] - Skip restoring z-positions
     * @param {boolean} [options.skipPresetChange=false] - Skip changing viewpointPreset (for Hero mode)
     */
    setViewpointFitToFrame(options = {}) {
        if (!options.skipRestore) {
            this.restoreSlideZPositions();
        }

        if (this.cameraController?.setViewpointFitToFrame) {
            this.cameraController.setViewpointFitToFrame();
            return;
        }

        if (!options.skipPresetChange) {
            this.params.viewpointPreset = 'front';
        }
        this.#calculateFitToFrameDistance();
        this.#applyViewpoint();

        log.info('Viewpoint fit to frame');
        if (!options.skipPresetChange) {
            this.#emitChange('front');
        }
    }

    /**
     * Set viewpoint to Beauty angle (three-quarter view)
     */
    setBeautyViewpoint() {
        this.restoreSlideZPositions();

        if (this.cameraController) {
            this.cameraController.setBeautyViewpoint();
            return;
        }

        this.params.viewpointPreset = 'beauty';
        // Default beauty position (can be refined)
        const pos = { x: -1280, y: -40, z: 1400 };
        this.camera.position.set(pos.x, pos.y, pos.z);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        log.info('Beauty viewpoint set');
        this.#emitChange('beauty');
    }

    /**
     * Set custom viewpoint
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    setViewpoint(x, y, z) {
        this.restoreSlideZPositions();

        this.params.viewpointPreset = 'custom';
        this.camera.position.set(x, y, z);
        this.controls.update();

        log.info(`Viewpoint set to (${x}, ${y}, ${z})`);
        this.#emitChange('custom');
    }

    /**
     * Center camera on content
     */
    centerViewOnContent() {
        this.restoreSlideZPositions();

        if (this.imageStack.length === 0) return;

        // Calculate content bounds
        const box = new THREE.Box3();
        this.imageStack.forEach((imageData) => {
            if (imageData.mesh) {
                box.expandByObject(imageData.mesh);
            }
        });

        if (!box.isEmpty()) {
            const center = box.getCenter(new THREE.Vector3());
            this.controls.target.copy(center);
            this.controls.update();
            log.info(`Centered on content at (${center.x.toFixed(1)}, ${center.y.toFixed(1)}, ${center.z.toFixed(1)})`);
        }

        this.#emitChange('centered');
    }

    /** @private */
    #calculateHeroDistance() {
        if (this.imageStack.length === 0) return;

        const frontSlide = this.imageStack[this.imageStack.length - 1];
        const mesh = frontSlide?.mesh;
        if (!mesh) return;

        const box = new THREE.Box3().setFromObject(mesh);
        if (box.isEmpty()) return;

        const size = box.getSize(new THREE.Vector3());
        const width = size.x || 1;
        const height = size.y || 1;

        const fov = (this.params.cameraFOV ?? DEFAULT_CAMERA_FOV) * (Math.PI / 180);
        const zoom = this.params.cameraZoom ?? 1.0;
        const aspect = this.camera.aspect || (this.params.canvasSize.x / this.params.canvasSize.y);

        const halfVerticalTan = Math.max(Math.tan(fov / 2) / zoom, 1e-6);
        const horizontalFov = 2 * Math.atan(halfVerticalTan * aspect);
        const halfHorizontalTan = Math.max(Math.tan(horizontalFov / 2), 1e-6);

        const distanceForHeight = (height / 2) / halfVerticalTan;
        const distanceForWidth = (width / 2) / halfHorizontalTan;
        const distance = Math.max(
            Math.max(distanceForHeight, distanceForWidth) * FRONT_VIEW_PADDING,
            CAMERA_MIN_DISTANCE
        );

        this.params.cameraDistance = distance;
    }

    /** @private */
    #calculateFitToFrameDistance() {
        // Similar to hero but for general fit
        this.#calculateHeroDistance();
    }

    /** @private */
    #applyViewpoint() {
        const distance = this.params.cameraDistance || 1000;
        this.camera.position.set(0, 0, distance);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    /** @private */
    #emitChange(preset) {
        if (typeof this.onViewpointChanged === 'function') {
            this.onViewpointChanged(preset);
        }
    }

    /**
     * Dispose resources
     */
    dispose() {
        this.savedHeroZSpacing = null;
        this.cameraController = null;
        this.pane = null;
        log.info('Disposed');
    }
}
