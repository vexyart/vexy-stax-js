// this_file: src/core/EventBus.js
/**
 * Minimal event emitter with unsubscribe helpers and once-listeners.
 *
 * Provides a lightweight publish-subscribe pattern for decoupled communication
 * between components. Supports multiple listeners per event, automatic cleanup,
 * and one-time event handlers.
 *
 * @class EventBus
 * @example
 * // Basic pub/sub pattern
 * const bus = new EventBus();
 * bus.on('userLogin', (user) => {
 *   console.log(`Welcome, ${user.name}!`);
 * });
 * bus.emit('userLogin', { name: 'Alice', id: 123 });
 * // => "Welcome, Alice!"
 *
 * @example
 * // Unsubscribe using returned function
 * const unsubscribe = bus.on('dataChanged', (data) => {
 *   console.log('Data:', data);
 * });
 * bus.emit('dataChanged', { count: 5 }); // => "Data: { count: 5 }"
 * unsubscribe(); // Stop listening
 * bus.emit('dataChanged', { count: 10 }); // (no output)
 *
 * @example
 * // One-time listeners
 * bus.once('appReady', () => {
 *   console.log('App initialized!');
 * });
 * bus.emit('appReady'); // => "App initialized!"
 * bus.emit('appReady'); // (no output - handler removed after first call)
 *
 * @example
 * // Multiple listeners
 * bus.on('notification', (msg) => console.log('[UI]', msg));
 * bus.on('notification', (msg) => console.log('[Logger]', msg));
 * bus.emit('notification', 'New message');
 * // => "[UI] New message"
 * // => "[Logger] New message"
 *
 * @example
 * // Manual cleanup
 * const handler = (data) => console.log(data);
 * bus.on('update', handler);
 * bus.off('update', handler); // Remove specific handler
 * bus.clear(); // Remove all listeners across all events
 */
export class EventBus {
    constructor() {
        this._listeners = new Map();
    }

    /**
     * Registers a listener for the given event.
     *
     * Returns an unsubscribe function for convenient cleanup. Multiple listeners
     * can be registered for the same event.
     *
     * @param {string} event - Event name to listen for
     * @param {(payload: *) => void} handler - Callback function to invoke when event is emitted
     * @returns {() => void} Unsubscribe function to remove this listener
     * @throws {TypeError} If handler is not a function
     * @example
     * const unsubscribe = bus.on('bgColorChange', (color) => {
     *   renderer.setClearColor(color);
     * });
     * // Later: unsubscribe();
     */
    on(event, handler) {
        if (typeof handler !== 'function') {
            throw new TypeError('EventBus.on requires a function handler');
        }

        const listeners = this._listeners.get(event) ?? [];
        listeners.push(handler);
        this._listeners.set(event, listeners);

        return () => this.off(event, handler);
    }

    /**
     * Registers a handler that triggers once then removes itself.
     *
     * Useful for initialization callbacks or one-time setup. The handler
     * automatically unsubscribes after the first emission.
     *
     * @param {string} event - Event name to listen for
     * @param {(payload: *) => void} handler - Callback function (called only once)
     * @returns {() => void} Unsubscribe function to cancel before first emit
     * @example
     * bus.once('sceneReady', (scene) => {
     *   console.log('Initial scene:', scene);
     * });
     * bus.emit('sceneReady', { objects: 5 }); // => "Initial scene: { objects: 5 }"
     * bus.emit('sceneReady', { objects: 10 }); // (no output - handler removed)
     */
    once(event, handler) {
        const unsubscribe = this.on(event, (payload) => {
            unsubscribe();
            handler(payload);
        });
        return unsubscribe;
    }

    /**
     * Removes a specific handler from an event.
     *
     * If the handler is the last listener for this event, the event entry
     * is removed from the internal map. Safe to call with non-existent events
     * or handlers.
     *
     * @param {string} event - Event name
     * @param {(payload: *) => void} handler - Handler to remove (must be same reference)
     * @example
     * const handler = (data) => console.log(data);
     * bus.on('update', handler);
     * bus.off('update', handler); // Handler removed
     * bus.emit('update', 123); // (no output)
     */
    off(event, handler) {
        const listeners = this._listeners.get(event);
        if (!listeners) {
            return;
        }

        const index = listeners.indexOf(handler);
        if (index >= 0) {
            listeners.splice(index, 1);
        }

        if (listeners.length === 0) {
            this._listeners.delete(event);
        }
    }

    /**
     * Emits payload to all listeners registered under event.
     *
     * Listeners are invoked in registration order. A snapshot of the listener
     * array is used to guard against mutations during iteration (e.g., if a
     * handler unsubscribes itself).
     *
     * @param {string} event - Event name to emit
     * @param {*} payload - Data to pass to all listeners (optional)
     * @example
     * bus.on('cameraMove', ({ position }) => {
     *   console.log('Camera moved to:', position);
     * });
     * bus.emit('cameraMove', { position: { x: 0, y: 100, z: 500 } });
     * // => "Camera moved to: { x: 0, y: 100, z: 500 }"
     */
    emit(event, payload) {
        const listeners = this._listeners.get(event);
        if (!listeners || listeners.length === 0) {
            return;
        }
        // copy to guard against mutations during iteration
        [...listeners].forEach((listener) => listener(payload));
    }

    /**
     * Clears all listeners across every event.
     *
     * Useful for cleanup during teardown or reset scenarios. After calling
     * clear(), all previously registered listeners are removed.
     *
     * @example
     * bus.on('update', () => console.log('A'));
     * bus.on('render', () => console.log('B'));
     * bus.clear(); // All listeners removed
     * bus.emit('update'); // (no output)
     * bus.emit('render'); // (no output)
     */
    clear() {
        this._listeners.clear();
    }
}

export const eventBus = new EventBus();
