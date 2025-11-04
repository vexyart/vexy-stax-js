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
