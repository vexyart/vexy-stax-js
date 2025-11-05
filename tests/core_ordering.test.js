// this_file: tests/core_ordering.test.js
/**
 * Test Suite: Core - Ordering
 *
 * Purpose: Tests the reorderList utility function for array reordering
 * operations used in drag-and-drop interfaces. Validates move operations
 * and proper error handling for out-of-bounds indices.
 *
 * Modules Tested:
 * - src/core/ordering.js (reorderList function)
 *
 * Test Count: 3 tests
 * @lastTested 2025-11-05 (Iteration 92)
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { reorderList } from '../src/core/ordering.js';

test('reorderList_movesItem_toRequestedIndex', () => {
    const list = ['a', 'b', 'c', 'd'];
    reorderList(list, 1, 3);
    assert.deepStrictEqual(list, ['a', 'c', 'd', 'b'], 'item should move from index 1 to 3');
});

test('reorderList_whenIndicesEqual_leavesListUntouched', () => {
    const list = [1, 2, 3];
    const result = reorderList(list, 2, 2);
    assert.equal(result, list, 'function should return the same array reference');
    assert.deepStrictEqual(list, [1, 2, 3], 'list should remain unchanged');
});

test('reorderList_throws_forOutOfRangeIndices', () => {
    const list = ['x', 'y', 'z'];
    assert.throws(
        () => reorderList(list, -1, 1),
        /bounds/,
        'negative fromIndex should be rejected'
    );
    assert.throws(
        () => reorderList(list, 0, 5),
        /bounds/,
        'toIndex beyond array length should be rejected'
    );
});
