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

// Edge case tests for robustness

test('AppState set throws error for null or undefined keys', () => {
    const state = new AppState();

    assert.throws(
        () => state.set(null, 'value'),
        /requires a key/,
        'set must reject null key'
    );

    assert.throws(
        () => state.set(undefined, 'value'),
        /requires a key/,
        'set must reject undefined key'
    );

    assert.throws(
        () => state.set('', 'value'),
        /requires a key/,
        'set must reject empty string key'
    );
});

test('AppState mergeInto rejects array targets', () => {
    const state = new AppState({ items: ['a', 'b'] });

    assert.throws(
        () => state.mergeInto('items', { c: 'value' }),
        /not an object/,
        'mergeInto must reject array targets'
    );
});

test('AppState mergeInto rejects array patches', () => {
    const state = new AppState({ params: { a: 1 } });

    assert.throws(
        () => state.mergeInto('params', ['not', 'object']),
        /plain object/,
        'mergeInto must reject array as patch'
    );
});

test('AppState removeFrom returns undefined for non-existent key', () => {
    const state = new AppState();

    const result = state.removeFrom('missingKey', () => true);

    assert.equal(result, undefined, 'removeFrom should return undefined for missing key');
});

test('AppState removeFrom handles empty arrays', () => {
    const state = new AppState({ items: [] });

    const result = state.removeFrom('items', () => true);

    assert.deepStrictEqual(result, [], 'removeFrom should handle empty arrays');
    assert.deepStrictEqual(state.get('items'), [], 'items should remain empty array');
});

test('AppState reset with specific key removes non-initial keys', () => {
    const state = new AppState({ initialKey: 'value' });

    state.set('runtimeKey', 'added');
    assert.equal(state.get('runtimeKey'), 'added', 'runtime key should be set');

    state.reset('runtimeKey');

    assert.equal(state.get('runtimeKey'), undefined, 'runtime key should be removed after reset');
    assert.equal(state.get('initialKey'), 'value', 'initial key should remain');
});

test('AppState handles nested objects in initialState', () => {
    const state = new AppState({
        config: {
            nested: {
                deep: { value: 42 }
            }
        }
    });

    const config = state.get('config');
    config.nested.deep.value = 100;

    state.reset('config');

    const resetConfig = state.get('config');
    assert.equal(resetConfig.nested.deep.value, 42, 'reset should restore nested object values');
    assert.notEqual(resetConfig, config, 'reset should return new object reference');
});

test('AppState snapshot returns independent clone', () => {
    const state = new AppState({ items: [1, 2, 3] });

    const snap1 = state.snapshot();
    snap1.items.push(4);

    const snap2 = state.snapshot();

    assert.deepStrictEqual(snap2.items, [1, 2, 3], 'snapshot should not be affected by mutations');
});
