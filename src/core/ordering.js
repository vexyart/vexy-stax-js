// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/core/ordering.js
/**
 * @fileoverview Array reordering utility for drag-and-drop list management.
 *
 * Provides safe in-place array reordering with comprehensive validation.
 * Used for reordering image thumbnails and Z-stack layer positions.
 *
 * @module ordering
 */

/**
 * Reorders an array entry in-place and returns the mutated array.
 *
 * Moves an item from one index to another, shifting other elements accordingly.
 * Operates in-place on the provided array and returns the same array reference.
 *
 * @template T
 * @param {T[]} list - Array to reorder (mutated in-place)
 * @param {number} fromIndex - Source position (0-based index)
 * @param {number} toIndex - Destination position (0-based index)
 * @returns {T[]} The mutated array (same reference as input)
 * @throws {TypeError} If list is not an array or indices are not integers
 * @throws {RangeError} If indices are out of bounds
 * @example
 * // Move item from index 0 to index 2
 * const layers = ['A', 'B', 'C', 'D'];
 * reorderList(layers, 0, 2);
 * // => ['B', 'C', 'A', 'D']
 *
 * @example
 * // Drag-and-drop thumbnail reordering
 * const thumbnails = [img1, img2, img3, img4];
 * reorderList(thumbnails, 3, 1); // Move last to second position
 * // => [img1, img4, img2, img3]
 *
 * @example
 * // No-op cases
 * reorderList(['A', 'B'], 0, 0); // Same index => ['A', 'B']
 * reorderList(['X'], 0, 0); // Single item => ['X']
 */
export function reorderList(list, fromIndex, toIndex) {
    if (!Array.isArray(list)) {
        throw new TypeError('reorderList expects an array to reorder');
    }
    if (!Number.isInteger(fromIndex) || !Number.isInteger(toIndex)) {
        throw new TypeError('reorderList indices must be integers');
    }
    if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) {
        throw new RangeError('reorderList indices must be within array bounds');
    }
    if (fromIndex === toIndex || list.length <= 1) {
        return list;
    }

    const [item] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, item);
    return list;
}
