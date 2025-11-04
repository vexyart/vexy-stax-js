// this_file: src/core/ordering.js

/**
 * Reorders an array entry in-place and returns the mutated array.
 * @template T
 * @param {T[]} list
 * @param {number} fromIndex
 * @param {number} toIndex
 * @returns {T[]}
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
