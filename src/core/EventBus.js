// this_file: src/core/EventBus.js
/**
 * Minimal event emitter with unsubscribe helpers and once-listeners.
 */
export class EventBus {
    constructor() {
        this._listeners = new Map();
    }

    /**
     * Registers a listener for the given event.
     * @param {string} event
     * @param {(payload: *) => void} handler
     * @returns {() => void} Unsubscribe helper.
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
     * @param {string} event
     * @param {(payload: *) => void} handler
     * @returns {() => void} Unsubscribe helper (before first emit).
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
     * @param {string} event
     * @param {(payload: *) => void} handler
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
     * @param {string} event
     * @param {*} payload
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
     */
    clear() {
        this._listeners.clear();
    }
}

export const eventBus = new EventBus();
