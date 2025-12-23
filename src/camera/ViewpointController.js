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
 * Implements Hero View as a special mode that TEMPORARILY overrides parameters:
 * - Slide spacing collapses to MIN_LAYER_GAP (without changing slider value)
 * - Ambience set to 0 (flat materials, no lighting effects)
 * - Camera positioned to fit front slide exactly
 *
 * When leaving Hero mode, all parameters snap back to user's manually set values.
 *
 * @example
 * const controller = new ViewpointController({
 *     camera, controls, params, imageStack,
 *     getEffectiveZSpacing: () => params.zSpacing || AUTO_SPACING,
 *     onHeroModeEnter: (savedState) => { ... },
 *     onHeroModeExit: (savedState) => { ... }
 * });
 *
 * controller.setHeroViewpoint();  // Enter Hero mode
 * controller.setBeautyViewpoint(); // Exit Hero mode, restores saved state
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
     * @param {Function} [options.onHeroModeEnter] - Callback when entering Hero mode (receives saved state)
     * @param {Function} [options.onHeroModeExit] - Callback when exiting Hero mode (receives saved state to restore)
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
        this.onHeroModeEnter = options.onHeroModeEnter || null;
        this.onHeroModeExit = options.onHeroModeExit || null;

        /**
         * Saved state when entering Hero mode.
         * Contains all parameters that Hero mode temporarily overrides.
         * @private
         * @type {Object|null}
         */
        this.savedHeroState = null;
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
     * Save current state before entering Hero mode.
     * Called internally when entering Hero mode.
     * @private
     * @returns {Object} Saved state object
     */
    #saveHeroState() {
        return {
            zSpacing: this.getEffectiveZSpacing(),
            ambience: this.params.ambience,
            materialPreset: this.params.materialPreset,
            cameraOffsetX: this.params.cameraOffsetX,
            cameraOffsetY: this.params.cameraOffsetY,
            cameraDistance: this.params.cameraDistance,
            cameraPosition: this.camera.position.clone(),
            controlsTarget: this.controls.target.clone()
        };
    }

    /**
     * Restore state after exiting Hero mode.
     * Restores slide positions, ambience, materials, and camera.
     * @private
     */
    #restoreHeroState() {
        if (!this.savedHeroState) return;

        const state = this.savedHeroState;

        // Restore slide z-positions to user's setting
        const effectiveSpacing = this.getEffectiveZSpacing();
        this.imageStack.forEach((imageData, index) => {
            imageData.mesh.position.z = index * effectiveSpacing;
        });

        // Notify that Hero mode is exiting - callback can restore ambience/materials
        if (typeof this.onHeroModeExit === 'function') {
            this.onHeroModeExit(state);
        }

        log.info(`Hero state restored: z-spacing ${effectiveSpacing}px, ambience ${state.ambience}`);
        this.savedHeroState = null;
    }

    /**
     * Check if currently in Hero mode (slides collapsed)
     * @returns {boolean}
     */
    isInHeroMode() {
        return this.savedHeroState !== null;
    }

    /**
     * Get the saved Hero state (for external use)
     * @returns {Object|null}
     */
    getSavedHeroState() {
        return this.savedHeroState;
    }

    /**
     * Set viewpoint to Hero view - front view with slides collapsed.
     *
     * Hero View is a special mode that TEMPORARILY overrides:
     * - Slide spacing → collapsed to MIN_LAYER_GAP (slider value unchanged)
     * - Ambience → 0 (flat materials, no lighting effects)
     * - Camera → positioned to fit front slide exactly
     *
     * When any other viewpoint is selected, state snaps back to user's settings.
     */
    setHeroViewpoint() {
        this.params.viewpointPreset = 'hero';

        // Save current state before entering Hero mode (only if not already in Hero mode)
        if (!this.savedHeroState) {
            this.savedHeroState = this.#saveHeroState();
            log.info('Hero state saved:', this.savedHeroState);

            // Notify that Hero mode is entering - callback can set ambience to 0
            if (typeof this.onHeroModeEnter === 'function') {
                this.onHeroModeEnter(this.savedHeroState);
            }
        }

        // Reset X/Y offsets for Hero view
        if (this.cameraController?.resetOffset) {
            this.cameraController.resetOffset();
        } else {
            this.params.cameraOffsetX = 0;
            this.params.cameraOffsetY = 0;
        }

        // Reset controls target to origin (front slide)
        this.controls.target.set(0, 0, 0);

        // Collapse slides with MIN_LAYER_GAP spacing
        // Front slide (highest index) at z=0, back slides at negative z
        const slideCount = this.imageStack.length;
        this.imageStack.forEach((imageData, index) => {
            const offset = (slideCount - 1 - index) * MIN_LAYER_GAP;
            imageData.mesh.position.z = offset === 0 ? 0 : -offset;
        });

        // Calculate camera distance to fit front slide exactly
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
     * @param {boolean} [options.skipRestore=false] - Skip restoring Hero state
     * @param {boolean} [options.skipPresetChange=false] - Skip changing viewpointPreset (for Hero mode)
     */
    setViewpointFitToFrame(options = {}) {
        // Restore Hero state when switching away from Hero mode
        if (!options.skipRestore) {
            this.#restoreHeroState();
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
     * Set viewpoint to Beauty angle (three-quarter view).
     * Exits Hero mode and restores saved state.
     */
    setBeautyViewpoint() {
        // Exit Hero mode and restore saved state
        this.#restoreHeroState();

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
     * Set custom viewpoint.
     * Exits Hero mode and restores saved state.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    setViewpoint(x, y, z) {
        // Exit Hero mode and restore saved state
        this.#restoreHeroState();

        this.params.viewpointPreset = 'custom';
        this.camera.position.set(x, y, z);
        this.controls.update();

        log.info(`Viewpoint set to (${x}, ${y}, ${z})`);
        this.#emitChange('custom');
    }

    /**
     * Center camera on content.
     * Exits Hero mode and restores saved state.
     */
    centerViewOnContent() {
        // Exit Hero mode and restore saved state
        this.#restoreHeroState();

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

    /**
     * Restore slide Z positions after Hero mode (legacy method, use #restoreHeroState instead)
     * @deprecated Use #restoreHeroState() instead
     */
    restoreSlideZPositions() {
        this.#restoreHeroState();
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
        this.savedHeroState = null;
        this.cameraController = null;
        this.pane = null;
        log.info('Disposed');
    }
}
