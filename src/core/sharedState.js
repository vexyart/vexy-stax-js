// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/core/sharedState.js
/**
 * @fileoverview Shared state registry for runtime singleton references.
 *
 * Provides a type-safe registry pattern for storing and retrieving shared
 * runtime objects (scene, renderer, cameras, etc.) across modules. Prevents
 * typos and ensures all modules use the same canonical key names.
 *
 * @module sharedState
 * @example
 * // Store a singleton reference
 * import { storeSharedRef } from './sharedState.js';
 * const scene = new THREE.Scene();
 * storeSharedRef('scene', scene); // Validated against registry
 *
 * @example
 * // Retrieve a singleton reference
 * import { getSharedRef } from './sharedState.js';
 * const scene = getSharedRef('scene'); // Returns stored scene
 *
 * @example
 * // Invalid keys throw errors
 * storeSharedRef('scen', scene); // ❌ Error: "scen" not registered
 * storeSharedRef('scene', scene); // ✅ Valid key
 */
import { appState } from './AppState.js';

/**
 * Frozen registry of valid shared state keys.
 *
 * Acts as a whitelist to prevent arbitrary key usage. All keys must be
 * pre-registered in this object to be used with storeSharedRef/getSharedRef.
 *
 * @constant {Readonly<Object.<string, string>>}
 * @property {string} scene - Three.js Scene instance
 * @property {string} renderer - Three.js WebGLRenderer instance
 * @property {string} camera - Primary PerspectiveCamera
 * @property {string} orthoCamera - Orthographic/Isometric camera
 * @property {string} controls - OrbitControls instance
 * @property {string} cameraAnimator - GSAP animation controller
 * @property {string} historyStack - Undo/redo state snapshots
 * @property {string} historyIndex - Current position in history
 * @property {string} eventListeners - Tracked event cleanup array
 * @property {string} imageStack - Loaded image mesh array
 * @property {string} params - Tweakpane parameters object
 */
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
 *
 * Validates the key against SHARED_STATE_KEYS to prevent typos. This ensures
 * all modules use the same canonical key names and prevents silent failures
 * from misspelled keys.
 *
 * @template T
 * @param {string} key - Must be a value from SHARED_STATE_KEYS
 * @param {T} value - Runtime object to store (scene, renderer, etc.)
 * @returns {T} The stored value (for chaining)
 * @throws {Error} If key is not registered in SHARED_STATE_KEYS
 * @example
 * // Store Three.js scene
 * const scene = new THREE.Scene();
 * storeSharedRef('scene', scene);
 *
 * @example
 * // Store with chaining
 * const renderer = storeSharedRef('renderer', new THREE.WebGLRenderer({
 *   canvas: document.getElementById('canvas'),
 *   antialias: true
 * }));
 */
export function storeSharedRef(key, value) {
    assertValidKey(key);
    appState.set(key, value);
    return value;
}

/**
 * Retrieves a shared runtime reference from the global AppState.
 *
 * Validates the key against SHARED_STATE_KEYS to prevent typos. Returns
 * undefined if the key exists in the registry but hasn't been stored yet.
 *
 * @param {string} key - Must be a value from SHARED_STATE_KEYS
 * @returns {*} The stored value, or undefined if not yet set
 * @throws {Error} If key is not registered in SHARED_STATE_KEYS
 * @example
 * // Retrieve stored scene
 * const scene = getSharedRef('scene');
 * scene.add(mesh);
 *
 * @example
 * // Check if value exists
 * const animator = getSharedRef('cameraAnimator');
 * if (animator) {
 *   animator.animateToViewpoint('front');
 * }
 */
export function getSharedRef(key) {
    assertValidKey(key);
    return appState.get(key);
}

/**
 * Internal validation helper to ensure key is in the registry.
 *
 * @private
 * @param {string} key - Key to validate
 * @throws {Error} If key is not in SHARED_STATE_KEYS
 */
function assertValidKey(key) {
    if (!Object.values(SHARED_STATE_KEYS).includes(key)) {
        throw new Error(`Shared state key "${key}" is not registered`);
    }
}
