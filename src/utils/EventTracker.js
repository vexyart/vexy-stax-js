// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/utils/EventTracker.js

/**
 * EventTracker - Tracks event listeners for memory-safe cleanup
 *
 * Prevents memory leaks by tracking all addEventListener calls
 * and providing bulk removal on dispose.
 *
 * @example
 * const tracker = new EventTracker();
 *
 * // Track event listeners
 * tracker.add(window, 'resize', handleResize);
 * tracker.add(canvas, 'click', handleClick);
 * tracker.add(document, 'keydown', handleKeydown);
 *
 * // Later, remove all at once
 * tracker.removeAll();
 */
export class EventTracker {
    constructor() {
        /** @type {Array<{target: EventTarget, type: string, listener: EventListener, options?: boolean|AddEventListenerOptions}>} */
        this.listeners = [];
    }

    /**
     * Add and track an event listener
     * @param {EventTarget} target - DOM element or event target
     * @param {string} type - Event type (e.g., 'click', 'resize')
     * @param {EventListener} listener - Event handler function
     * @param {boolean|AddEventListenerOptions} [options] - Event listener options
     */
    add(target, type, listener, options) {
        if (!target || typeof target.addEventListener !== 'function') {
            console.warn('[EventTracker] Invalid target:', target);
            return;
        }

        target.addEventListener(type, listener, options);
        this.listeners.push({ target, type, listener, options });
    }

    /**
     * Remove a specific tracked listener
     * @param {EventTarget} target - DOM element or event target
     * @param {string} type - Event type
     * @param {EventListener} listener - Event handler function
     */
    remove(target, type, listener) {
        const index = this.listeners.findIndex(
            (l) => l.target === target && l.type === type && l.listener === listener
        );

        if (index !== -1) {
            const entry = this.listeners[index];
            entry.target.removeEventListener(entry.type, entry.listener, entry.options);
            this.listeners.splice(index, 1);
        }
    }

    /**
     * Remove all tracked listeners
     * Call this on application shutdown to prevent memory leaks
     */
    removeAll() {
        for (const { target, type, listener, options } of this.listeners) {
            try {
                target.removeEventListener(type, listener, options);
            } catch (error) {
                console.warn(`[EventTracker] Error removing ${type} listener:`, error);
            }
        }
        this.listeners = [];
    }

    /**
     * Get count of tracked listeners
     * @returns {number}
     */
    get count() {
        return this.listeners.length;
    }

    /**
     * Alias for removeAll() - matches dispose pattern of other managers
     */
    dispose() {
        this.removeAll();
    }
}
