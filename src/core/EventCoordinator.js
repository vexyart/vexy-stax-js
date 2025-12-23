// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/core/EventCoordinator.js

import { EVENTS } from './constants.js';

/**
 * EventCoordinator - Centralized event emission for cross-module communication
 *
 * Extracts emit* functions from main.js to reduce file size and centralize
 * event-based communication patterns.
 *
 * @example
 * const coordinator = new EventCoordinator({
 *     eventBus,
 *     getParams: () => params,
 *     getImageStack: () => imageStack,
 *     getCamera: () => camera,
 *     getControls: () => controls,
 *     getCameraMode: () => cameraMode
 * });
 *
 * coordinator.emitBackgroundChanged('user');
 * coordinator.emitStackUpdated('add');
 * coordinator.emitCameraUpdated('viewpoint');
 */
export class EventCoordinator {
    /**
     * @param {Object} options - Configuration options
     * @param {Object} options.eventBus - EventBus instance for emitting events
     * @param {Function} options.getParams - Getter for params object
     * @param {Function} options.getImageStack - Getter for imageStack array
     * @param {Function} options.getCamera - Getter for active camera
     * @param {Function} options.getControls - Getter for OrbitControls
     * @param {Function} options.getCameraMode - Getter for current camera mode
     */
    constructor(options = {}) {
        if (!options.eventBus) {
            throw new Error('[EventCoordinator] eventBus required. Fix: Pass a valid EventBus instance.');
        }
        if (typeof options.getParams !== 'function') {
            throw new Error('[EventCoordinator] getParams must be a function. Fix: Pass () => params.');
        }
        if (typeof options.getImageStack !== 'function') {
            throw new Error('[EventCoordinator] getImageStack must be a function. Fix: Pass () => imageStack.');
        }

        this.eventBus = options.eventBus;
        this.getParams = options.getParams;
        this.getImageStack = options.getImageStack;
        this.getCamera = options.getCamera || (() => null);
        this.getControls = options.getControls || (() => null);
        this.getCameraMode = options.getCameraMode || (() => 'perspective');
    }

    /**
     * Emit background changed event
     * @param {string} reason - Reason for change (e.g., 'user', 'import', 'reset')
     */
    emitBackgroundChanged(reason) {
        const params = this.getParams();
        this.eventBus.emit(EVENTS.backgroundChanged, {
            reason,
            color: params.bgColor,
            ambience: params.ambience
        });
    }

    /**
     * Emit stack updated event
     * @param {string} reason - Reason for change (e.g., 'add', 'delete', 'clear', 'reorder')
     */
    emitStackUpdated(reason) {
        const imageStack = this.getImageStack();
        this.eventBus.emit(EVENTS.stackUpdated, {
            reason,
            count: imageStack.length,
            filenames: imageStack.map((image) => image.filename)
        });
    }

    /**
     * Emit camera updated event
     * @param {string} reason - Reason for change (e.g., 'viewpoint', 'zoom', 'pan', 'orbit')
     */
    emitCameraUpdated(reason) {
        const controls = this.getControls();
        const activeCamera = (controls && controls.object) ? controls.object : this.getCamera();

        if (!activeCamera) {
            return;
        }

        const payload = {
            reason,
            mode: this.getCameraMode(),
            position: {
                x: activeCamera.position.x,
                y: activeCamera.position.y,
                z: activeCamera.position.z
            },
            zoom: activeCamera.zoom
        };

        if (typeof activeCamera.fov === 'number') {
            payload.fov = activeCamera.fov;
        }

        this.eventBus.emit(EVENTS.cameraUpdated, payload);
    }
}
