// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/ui/ToolbarController.js

import { createLogger } from '../utils/logger.js';

const log = createLogger('ToolbarController');

/**
 * ToolbarController - Manages toolbar button interactions
 *
 * Extracts toolbar button setup from main.js:
 * - setupToolbarButtons(): Undo/Redo/Reset Camera/Help buttons
 * - setupAutoSave(): Periodic settings save
 *
 * @example
 * const controller = new ToolbarController({
 *     onUndo: () => historyManager.undo(),
 *     onRedo: () => historyManager.redo(),
 *     onResetCamera: () => viewpointController.setViewpointFitToFrame(),
 *     onToggleHelp: () => keyboardShortcuts.toggleHelp(),
 *     showToast: (msg, type) => toastService.show(msg, type)
 * });
 *
 * controller.setup();
 */
export class ToolbarController {
    /**
     * @param {Object} options
     * @param {Function} options.onUndo - Callback for undo button
     * @param {Function} options.onRedo - Callback for redo button
     * @param {Function} [options.onResetCamera] - Callback for reset camera button
     * @param {Function} [options.onToggleHelp] - Callback for help button
     * @param {Function} [options.showToast] - Toast notification function
     * @param {Function} [options.addTrackedEventListener] - Event listener tracker
     */
    constructor(options) {
        if (typeof options.onUndo !== 'function') {
            throw new Error('[ToolbarController] onUndo callback is required. Fix: Pass a function to handle undo.');
        }
        if (typeof options.onRedo !== 'function') {
            throw new Error('[ToolbarController] onRedo callback is required. Fix: Pass a function to handle redo.');
        }

        this.onUndo = options.onUndo;
        this.onRedo = options.onRedo;
        this.onResetCamera = options.onResetCamera || null;
        this.onToggleHelp = options.onToggleHelp || null;
        this.showToast = options.showToast || (() => {});
        this.addTrackedEventListener = options.addTrackedEventListener || ((el, evt, fn) => el.addEventListener(evt, fn));

        /** @private */
        this.initialized = false;
    }

    /**
     * Setup toolbar button click handlers
     */
    setup() {
        if (this.initialized) {
            log.info('Already initialized');
            return;
        }

        // Guard for test environment (no DOM)
        if (typeof document === 'undefined') {
            this.initialized = true;
            log.info('Toolbar setup skipped (no DOM)');
            return;
        }

        const btnUndo = document.getElementById('btn-undo');
        const btnRedo = document.getElementById('btn-redo');
        const btnResetCamera = document.getElementById('btn-reset-camera');
        const btnHelp = document.getElementById('btn-help');

        if (btnUndo) {
            this.addTrackedEventListener(btnUndo, 'click', () => {
                this.onUndo();
            });
        }

        if (btnRedo) {
            this.addTrackedEventListener(btnRedo, 'click', () => {
                this.onRedo();
            });
        }

        if (btnResetCamera && this.onResetCamera) {
            this.addTrackedEventListener(btnResetCamera, 'click', () => {
                this.onResetCamera();
                this.showToast('Camera reset to fit', 'info');
            });
        }

        if (btnHelp && this.onToggleHelp) {
            this.addTrackedEventListener(btnHelp, 'click', () => {
                this.onToggleHelp();
            });
        }

        this.initialized = true;
        log.info('Toolbar buttons initialized');
    }

    /**
     * Check if toolbar is initialized
     * @returns {boolean}
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Dispose resources
     */
    dispose() {
        this.initialized = false;
        log.info('Disposed');
    }
}
