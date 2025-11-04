// this_file: tests/core_app_state.test.js
import test from 'node:test';
import assert from 'node:assert/strict';

import { AppState } from '../src/core/AppState.js';

test('AppState get/set round-trip works for primitive values', () => {
    const state = new AppState();
    assert.equal(state.get('scene'), undefined, 'unknown keys start undefined');

    const scene = { name: 'test-scene' };
    state.set('scene', scene);

    assert.equal(state.get('scene'), scene, 'set should store the provided reference');
});

test('AppState mergeInto merges shallow objects', () => {
    const state = new AppState({ params: { a: 1, b: 2 } });

    state.mergeInto('params', { b: 10, c: 3 });

    assert.deepStrictEqual(
        state.get('params'),
        { a: 1, b: 10, c: 3 },
        'params should receive merged values'
    );
});

test('AppState pushTo initialises arrays lazily', () => {
    const state = new AppState();

    state.pushTo('imageStack', { id: 1 });
    state.pushTo('imageStack', { id: 2 });

    assert.deepStrictEqual(
        state.get('imageStack'),
        [{ id: 1 }, { id: 2 }],
        'pushTo should create and append to arrays'
    );
});

test('AppState removeFrom prunes array entries via predicate', () => {
    const state = new AppState({ imageStack: [{ id: 1 }, { id: 2 }] });

    state.removeFrom('imageStack', (item) => item.id === 1);

    assert.deepStrictEqual(
        state.get('imageStack'),
        [{ id: 2 }],
        'removeFrom should filter array values'
    );
});

test('AppState reset restores initial snapshot', () => {
    const initial = {
        params: { a: 1 },
        imageStack: [],
        historyIndex: -1
    };
    const state = new AppState(initial);

    state.set('scene', { id: 'scene' });
    state.mergeInto('params', { b: 2 });
    state.pushTo('imageStack', { id: 99 });
    state.set('historyIndex', 5);

    state.reset();

    assert.equal(state.get('scene'), undefined, 'scene should be cleared');
    assert.deepStrictEqual(state.get('params'), { a: 1 }, 'params should go back to defaults');
    assert.deepStrictEqual(state.get('imageStack'), [], 'imageStack should be emptied');
    assert.equal(state.get('historyIndex'), -1, 'history index should reset');
});

test('AppState mergeInto rejects non-object patches', () => {
    const state = new AppState({ params: { a: 1 } });

    assert.throws(
        () => state.mergeInto('params', null),
        /plain object/,
        'mergeInto must reject non-object patches'
    );
});

test('AppState pushTo rejects non-array targets', () => {
    const state = new AppState({ params: { a: 1 } });

    state.set('params', { a: 2 });

    assert.throws(
        () => state.pushTo('params', 3),
        /not an array/,
        'pushTo must guard against non-array targets'
    );
});
