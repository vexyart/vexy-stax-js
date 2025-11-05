// this_file: tests/core_shared_state.test.js
import test from 'node:test';
import assert from 'node:assert/strict';

import { appState } from '../src/core/AppState.js';
import {
    SHARED_STATE_KEYS,
    storeSharedRef,
    getSharedRef
} from '../src/core/sharedState.js';

test('storeSharedRef_whenValidKey_thenPersistsReference', () => {
    appState.reset();
    const fakeScene = { id: 'scene-1' };

    const stored = storeSharedRef(SHARED_STATE_KEYS.scene, fakeScene);

    assert.equal(stored, fakeScene, 'storeSharedRef should return the same reference it received');
    assert.equal(
        appState.get(SHARED_STATE_KEYS.scene),
        fakeScene,
        'AppState should hold the stored reference under the shared key'
    );
});

test('getSharedRef_whenValueSynced_returnsCurrentReference', () => {
    appState.reset();
    const fakeRenderer = { id: 'renderer-1' };
    storeSharedRef(SHARED_STATE_KEYS.renderer, fakeRenderer);

    const retrieved = getSharedRef(SHARED_STATE_KEYS.renderer);

    assert.equal(retrieved, fakeRenderer, 'getSharedRef should retrieve the stored reference');
});

test('storeSharedRef_whenInvalidKey_thenThrowsHelpfulError', () => {
    appState.reset();
    assert.throws(
        () => storeSharedRef('not-a-shared-key', {}),
        /not-a-shared-key/,
        'Unexpected keys must be rejected to avoid silent state divergence'
    );
});

// Edge case tests for robustness

test('getSharedRef throws error for invalid key', () => {
    appState.reset();

    assert.throws(
        () => getSharedRef('typo-key'),
        /not registered/,
        'getSharedRef should reject unregistered keys'
    );
});

test('getSharedRef returns undefined for valid but unset key', () => {
    appState.reset();

    const result = getSharedRef(SHARED_STATE_KEYS.cameraAnimator);

    assert.equal(result, undefined, 'getSharedRef should return undefined for unset keys');
});

test('storeSharedRef allows overwriting existing values', () => {
    appState.reset();
    const scene1 = { id: 'scene-1' };
    const scene2 = { id: 'scene-2' };

    storeSharedRef(SHARED_STATE_KEYS.scene, scene1);
    storeSharedRef(SHARED_STATE_KEYS.scene, scene2);

    const retrieved = getSharedRef(SHARED_STATE_KEYS.scene);

    assert.equal(retrieved, scene2, 'storeSharedRef should allow overwriting values');
    assert.notEqual(retrieved, scene1, 'old value should be replaced');
});

test('SHARED_STATE_KEYS is frozen and cannot be mutated', () => {
    assert.throws(
        () => {
            SHARED_STATE_KEYS.newKey = 'value';
        },
        /Cannot add property/,
        'SHARED_STATE_KEYS should be frozen'
    );

    assert.throws(
        () => {
            delete SHARED_STATE_KEYS.scene;
        },
        /Cannot delete property/,
        'SHARED_STATE_KEYS properties cannot be deleted'
    );
});

test('storeSharedRef handles null and undefined values', () => {
    appState.reset();

    storeSharedRef(SHARED_STATE_KEYS.camera, null);
    assert.equal(getSharedRef(SHARED_STATE_KEYS.camera), null, 'null should be stored');

    storeSharedRef(SHARED_STATE_KEYS.camera, undefined);
    assert.equal(getSharedRef(SHARED_STATE_KEYS.camera), undefined, 'undefined should be stored');
});

test('storeSharedRef rejects typos that are close to valid keys', () => {
    appState.reset();

    // Common typos
    assert.throws(() => storeSharedRef('scen', {}), /not registered/); // missing 'e'
    assert.throws(() => storeSharedRef('render', {}), /not registered/); // missing 'er'
    assert.throws(() => storeSharedRef('Camera', {}), /not registered/); // wrong case
});
