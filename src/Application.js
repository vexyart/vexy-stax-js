// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/Application.js

import { ServiceContainer } from './core/ServiceContainer.js';
import { EventTracker } from './utils/EventTracker.js';

/**
 * Application - Main orchestrator for Vexy Stax
 *
 * Coordinates initialization and lifecycle of all managers/controllers.
 * This is the entry point that main.js delegates to.
 *
 * Responsibilities:
 * - Create and wire all managers via ServiceContainer
 * - Handle application lifecycle (init, dispose)
 * - Expose debug API for development
 *
 * @example
 * const app = new Application(canvas);
 * await app.init();
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

        // TODO: Phase 2+ will extract manager creation from main.js
        // For now, this is a shell that main.js can use incrementally

        this.initialized = true;
        console.log('[Application] Initialization complete');
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
