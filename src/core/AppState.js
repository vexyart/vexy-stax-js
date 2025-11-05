// this_file: src/core/AppState.js
/**
 * Lightweight mutable state container with a predictable API.
 *
 * Manages application state with built-in reset functionality. Tracks
 * initial values to enable state rollback. Provides specialized methods
 * for common state operations (merge, push, filter).
 *
 * @class AppState
 * @example
 * // Create with initial state
 * const state = new AppState({
 *   count: 0,
 *   user: { name: 'Alice' },
 *   items: ['a', 'b']
 * });
 *
 * @example
 * // Basic get/set
 * state.set('count', 5);
 * state.get('count'); // => 5
 *
 * @example
 * // Merge objects
 * state.mergeInto('user', { age: 30 });
 * state.get('user'); // => { name: 'Alice', age: 30 }
 *
 * @example
 * // Array operations
 * state.pushTo('items', 'c');
 * state.removeFrom('items', item => item === 'b');
 * state.get('items'); // => ['a', 'c']
 *
 * @example
 * // Reset state
 * state.reset('count'); // Reset single key
 * state.reset();        // Reset all keys
 */
export class AppState {
    /**
     * Create a new AppState instance.
     *
     * @param {Object} [initialState={}] - Initial state values
     */
    constructor(initialState = {}) {
        this._initial = new Map();
        this._state = new Map();

        Object.entries(initialState).forEach(([key, value]) => {
            const cloned = cloneValue(value);
            this._initial.set(key, cloned);
            this._state.set(key, cloneValue(value));
        });
    }

    /**
     * Returns the current value for the given key.
     * @param {string} key
     */
    get(key) {
        return this._state.get(key);
    }

    /**
     * Sets the value for the given key.
     * @param {string} key
     * @param {*} value
     * @returns {*} The stored value (identity).
     */
    set(key, value) {
        if (!key) {
            throw new Error('AppState.set requires a key');
        }
        this._state.set(key, value);
        return value;
    }

    /**
     * Merges a partial object into an existing object value.
     * @param {string} key
     * @param {Record<string, *>} patch
     * @returns {object} The merged object reference.
     */
    mergeInto(key, patch) {
        if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
            throw new TypeError('AppState.mergeInto expects a plain object patch');
        }

        const current = this._state.get(key) ?? {};
        if (typeof current !== 'object' || Array.isArray(current)) {
            throw new TypeError(`AppState.mergeInto target "${key}" is not an object`);
        }

        const next = { ...current, ...patch };
        this._state.set(key, next);
        return next;
    }

    /**
     * Pushes a value into an array stored at key, creating the array if missing.
     * @param {string} key
     * @param {*} value
     * @returns {Array} The updated array reference.
     */
    pushTo(key, value) {
        const current = this._state.get(key);
        if (current === undefined) {
            const created = [value];
            this._state.set(key, created);
            return created;
        }

        if (!Array.isArray(current)) {
            throw new TypeError(`AppState.pushTo target "${key}" is not an array`);
        }

        current.push(value);
        return current;
    }

    /**
     * Removes array elements that satisfy predicate.
     * @param {string} key
     * @param {(value: *) => boolean} predicate
     * @returns {Array|undefined} The filtered array or undefined if key absent.
     */
    removeFrom(key, predicate) {
        const current = this._state.get(key);
        if (current === undefined) {
            return undefined;
        }

        if (!Array.isArray(current)) {
            throw new TypeError(`AppState.removeFrom target "${key}" is not an array`);
        }

        const filtered = current.filter((item) => !predicate(item));
        this._state.set(key, filtered);
        return filtered;
    }

    /**
     * Resets either the whole state or a specific key back to the initial snapshot.
     * @param {string} [key]
     */
    reset(key) {
        if (typeof key === 'string') {
            if (this._initial.has(key)) {
                this._state.set(key, cloneValue(this._initial.get(key)));
            } else {
                this._state.delete(key);
            }
            return;
        }

        this._state = new Map();
        for (const [initialKey, value] of this._initial.entries()) {
            this._state.set(initialKey, cloneValue(value));
        }
    }

    /**
     * Returns a shallow snapshot of the current state for debugging/testing.
     */
    snapshot() {
        const obj = {};
        for (const [key, value] of this._state.entries()) {
            obj[key] = cloneValue(value);
        }
        return obj;
    }
}

function cloneValue(value) {
    if (Array.isArray(value)) {
        return value.map((item) => cloneValue(item));
    }
    if (value && typeof value === 'object' && value.constructor === Object) {
        const cloned = {};
        Object.entries(value).forEach(([k, v]) => {
            cloned[k] = cloneValue(v);
        });
        return cloned;
    }
    return value;
}

export const appState = new AppState();
