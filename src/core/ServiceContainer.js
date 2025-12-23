// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/core/ServiceContainer.js

/**
 * ServiceContainer - Lightweight dependency injection container
 *
 * Manages service lifecycle: registration, retrieval, and disposal.
 * All managers/controllers register here for centralized cleanup.
 *
 * @example
 * const container = new ServiceContainer();
 * container.register('floor', new FloorManager(scene, params));
 * container.register('lighting', new LightingManager(scene));
 *
 * // Later...
 * const floor = container.get('floor');
 *
 * // Cleanup all
 * container.disposeAll();
 */
export class ServiceContainer {
    constructor() {
        /** @type {Map<string, any>} */
        this.services = new Map();
    }

    /**
     * Register a service by name
     * @param {string} name - Service identifier
     * @param {any} service - Service instance (must have dispose() if disposable)
     * @throws {Error} If name already registered
     */
    register(name, service) {
        if (this.services.has(name)) {
            throw new Error(`[ServiceContainer] Service '${name}' already registered. Fix: Use a unique name or call unregister() first.`);
        }
        this.services.set(name, service);
    }

    /**
     * Get a registered service
     * @param {string} name - Service identifier
     * @returns {any} The service instance
     * @throws {Error} If service not found
     */
    get(name) {
        if (!this.services.has(name)) {
            throw new Error(`[ServiceContainer] Service '${name}' not found. Fix: Register the service before retrieving it.`);
        }
        return this.services.get(name);
    }

    /**
     * Check if a service is registered
     * @param {string} name - Service identifier
     * @returns {boolean}
     */
    has(name) {
        return this.services.has(name);
    }

    /**
     * Unregister and optionally dispose a service
     * @param {string} name - Service identifier
     * @param {boolean} [dispose=true] - Whether to call dispose() on the service
     */
    unregister(name, dispose = true) {
        const service = this.services.get(name);
        if (service) {
            if (dispose && typeof service.dispose === 'function') {
                service.dispose();
            }
            this.services.delete(name);
        }
    }

    /**
     * Dispose all registered services and clear the container
     * Services are disposed in reverse registration order (LIFO)
     */
    disposeAll() {
        // Convert to array and reverse for LIFO disposal
        const entries = Array.from(this.services.entries()).reverse();

        for (const [name, service] of entries) {
            if (typeof service.dispose === 'function') {
                try {
                    service.dispose();
                } catch (error) {
                    console.error(`[ServiceContainer] Error disposing '${name}':`, error);
                }
            }
        }

        this.services.clear();
    }

    /**
     * Get all registered service names
     * @returns {string[]}
     */
    getServiceNames() {
        return Array.from(this.services.keys());
    }

    /**
     * Get count of registered services
     * @returns {number}
     */
    get size() {
        return this.services.size;
    }
}
