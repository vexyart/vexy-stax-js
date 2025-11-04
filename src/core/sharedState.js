// this_file: src/core/sharedState.js
import { appState } from './AppState.js';

export const SHARED_STATE_KEYS = Object.freeze({
    scene: 'scene',
    renderer: 'renderer',
    camera: 'camera',
    orthoCamera: 'orthoCamera',
    controls: 'controls',
    cameraAnimator: 'cameraAnimator',
    historyStack: 'historyStack',
    historyIndex: 'historyIndex',
    eventListeners: 'eventListeners',
    imageStack: 'imageStack',
    params: 'params'
});

/**
 * Persists a shared runtime reference into the global AppState.
 * Guards against typos so modules do not silently diverge.
 * @template T
 * @param {string} key
 * @param {T} value
 * @returns {T}
 */
export function storeSharedRef(key, value) {
    assertValidKey(key);
    appState.set(key, value);
    return value;
}

/**
 * Retrieves a shared runtime reference from the global AppState.
 * @param {string} key
 * @returns {*}
 */
export function getSharedRef(key) {
    assertValidKey(key);
    return appState.get(key);
}

function assertValidKey(key) {
    if (!Object.values(SHARED_STATE_KEYS).includes(key)) {
        throw new Error(`Shared state key "${key}" is not registered`);
    }
}
