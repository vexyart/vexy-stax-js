// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/Application.js

import { ServiceContainer } from './core/ServiceContainer.js';
import { EventTracker } from './utils/EventTracker.js';
import { SceneDirector } from './scene/SceneDirector.js';
import { ViewpointController } from './camera/ViewpointController.js';
import { SlidePanelController } from './ui/SlidePanelController.js';
import { ToolbarController } from './ui/ToolbarController.js';

/**
 * Application - Main orchestrator for Vexy Stax
 *
 * Coordinates initialization and lifecycle of all managers/controllers.
 * This is the entry point that main.js delegates to.
 *
 * Phase 5 Integration:
 * - Managers are created in main.js and registered here
 * - Controllers are created here using registered managers
 * - main.js delegates to controllers instead of inline code
 *
 * @example
 * const app = new Application(canvas);
 * await app.init();
 *
 * // Register managers from main.js
 * app.registerService('sceneManager', sceneManager);
 * app.registerService('params', params);
 *
 * // Wire controllers
 * app.wireControllers();
 *
 * // On shutdown
 * app.dispose();
 */
export class Application {
    /**
     * @param {HTMLCanvasElement} canvas - WebGL canvas element
     */
    constructor(canvas) {
        if (!canvas) {
            throw new Error('[Application] Canvas element required. Fix: Pass a valid HTMLCanvasElement.');
        }

        this.canvas = canvas;
        this.container = new ServiceContainer();
        this.events = new EventTracker();
        this.initialized = false;

        // Controllers (created during wiring)
        this.sceneDirector = null;
        this.viewpointController = null;
        this.slidePanelController = null;
        this.toolbarController = null;
    }

    /**
     * Initialize the application
     * Creates all managers and wires them together
     * @returns {Promise<void>}
     */
    async init() {
        if (this.initialized) {
            console.warn('[Application] Already initialized');
            return;
        }

        console.log('[Application] Initializing...');

        // Register core services
        this.container.register('events', this.events);

        this.initialized = true;
        console.log('[Application] Initialization complete');
    }

    /**
     * Wire controllers using registered managers
     * Call after all managers are registered
     *
     * @param {Object} options - Controller options
     * @param {Object} [options.callbacks] - Callbacks for controllers
     */
    wireControllers(options = {}) {
        const callbacks = options.callbacks || {};

        // Get required services
        const scene = this.container.has('scene') ? this.container.get('scene') : null;
        const params = this.container.has('params') ? this.container.get('params') : null;
        const imageStack = this.container.has('imageStack') ? this.container.get('imageStack') : [];

        // Wire SceneDirector if dependencies exist
        if (scene && params) {
            this.sceneDirector = new SceneDirector({
                scene,
                renderer: this.container.has('renderer') ? this.container.get('renderer') : null,
                params,
                imageStack,
                ambienceManager: this.container.has('ambienceManager') ? this.container.get('ambienceManager') : null,
                lightingManager: this.container.has('lightingManager') ? this.container.get('lightingManager') : null,
                floorManager: this.container.has('floorManager') ? this.container.get('floorManager') : null,
                sceneManager: this.container.has('sceneManager') ? this.container.get('sceneManager') : null,
                sceneComposition: this.container.has('sceneComposition') ? this.container.get('sceneComposition') : null,
                controls: this.container.has('controls') ? this.container.get('controls') : null,
                onBackgroundChanged: callbacks.onBackgroundChanged
            });
            this.container.register('sceneDirector', this.sceneDirector);
            console.log('[Application] SceneDirector wired');
        }

        // Wire ViewpointController if dependencies exist
        const camera = this.container.has('camera') ? this.container.get('camera') : null;
        const controls = this.container.has('controls') ? this.container.get('controls') : null;
        const getEffectiveZSpacing = callbacks.getEffectiveZSpacing;

        if (camera && controls && params && getEffectiveZSpacing) {
            this.viewpointController = new ViewpointController({
                camera,
                controls,
                params,
                imageStack,
                getEffectiveZSpacing,
                cameraController: this.container.has('cameraController') ? this.container.get('cameraController') : null,
                pane: this.container.has('pane') ? this.container.get('pane') : null,
                onViewpointChanged: callbacks.onViewpointChanged,
                onHeroModeEnter: callbacks.onHeroModeEnter,
                onHeroModeExit: callbacks.onHeroModeExit
            });
            this.container.register('viewpointController', this.viewpointController);
            console.log('[Application] ViewpointController wired');
        }

        // Wire SlidePanelController if callbacks exist
        if (callbacks.onDeleteSlide && callbacks.onReorderSlides) {
            this.slidePanelController = new SlidePanelController({
                imageStack,
                onDelete: callbacks.onDeleteSlide,
                onReorder: callbacks.onReorderSlides,
                onUpdateAriaLabel: callbacks.onUpdateAriaLabel,
                showToast: callbacks.showToast
            });
            this.container.register('slidePanelController', this.slidePanelController);
            console.log('[Application] SlidePanelController wired');
        }

        // Wire ToolbarController if callbacks exist
        if (callbacks.onUndo && callbacks.onRedo) {
            this.toolbarController = new ToolbarController({
                onUndo: callbacks.onUndo,
                onRedo: callbacks.onRedo,
                onResetCamera: callbacks.onResetCamera,
                onToggleHelp: callbacks.onToggleHelp,
                showToast: callbacks.showToast,
                addTrackedEventListener: (el, evt, fn) => this.events.add(el, evt, fn)
            });
            this.toolbarController.setup();
            this.container.register('toolbarController', this.toolbarController);
            console.log('[Application] ToolbarController wired');
        }
    }

    /**
     * Get a service by name
     * @param {string} name - Service name
     * @returns {any}
     */
    getService(name) {
        return this.container.get(name);
    }

    /**
     * Check if a service exists
     * @param {string} name - Service name
     * @returns {boolean}
     */
    hasService(name) {
        return this.container.has(name);
    }

    /**
     * Register a service (for incremental migration from main.js)
     * @param {string} name - Service name
     * @param {any} service - Service instance
     */
    registerService(name, service) {
        this.container.register(name, service);
    }

    /**
     * Dispose all resources
     * Call on application shutdown
     */
    dispose() {
        console.log('[Application] Disposing...');

        this.events.removeAll();
        this.container.disposeAll();

        this.sceneDirector = null;
        this.viewpointController = null;
        this.slidePanelController = null;
        this.toolbarController = null;

        this.initialized = false;
        console.log('[Application] Disposed');
    }

    /**
     * Check if application is initialized
     * @returns {boolean}
     */
    get isInitialized() {
        return this.initialized;
    }
}
