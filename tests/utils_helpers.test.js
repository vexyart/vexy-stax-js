// tests/utils_helpers.test.js
// this_file: tests/utils_helpers.test.js

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    calculateLuminance,
    isValidHexColor,
    clamp,
    lerp,
    isValidNumber,
    formatFileSize,
    generateId,
    deepClone,
    isValidImageFile
} from '../src/utils/helpers.js';

test('calculateLuminance returns 0 for black', () => {
    const result = calculateLuminance('#000000');
    assert.strictEqual(result, 0, 'Black should have luminance 0');
});

test('calculateLuminance returns 1 for white', () => {
    const result = calculateLuminance('#ffffff');
    assert.strictEqual(result, 1, 'White should have luminance 1');
});

test('calculateLuminance returns value between 0 and 1 for gray', () => {
    const result = calculateLuminance('#808080');
    assert.ok(result > 0 && result < 1, 'Gray should have luminance between 0 and 1');
});

test('calculateLuminance throws TypeError for invalid hex color', () => {
    assert.throws(() => calculateLuminance('red'), TypeError, 'Should throw TypeError for color name');
    assert.throws(() => calculateLuminance(''), TypeError, 'Should throw TypeError for empty string');
    assert.throws(() => calculateLuminance(null), TypeError, 'Should throw TypeError for null');
});

test('isValidHexColor accepts valid hex colors', () => {
    assert.strictEqual(isValidHexColor('#000000'), true, 'Should accept 6-digit hex');
    assert.strictEqual(isValidHexColor('#fff'), true, 'Should accept 3-digit hex');
    assert.strictEqual(isValidHexColor('#FF00FF'), true, 'Should accept uppercase hex');
    assert.strictEqual(isValidHexColor('#abc'), true, 'Should accept lowercase 3-digit hex');
});

test('isValidHexColor rejects invalid colors', () => {
    assert.strictEqual(isValidHexColor(''), false, 'Should reject empty string');
    assert.strictEqual(isValidHexColor(null), false, 'Should reject null');
    assert.strictEqual(isValidHexColor('red'), false, 'Should reject color names');
    assert.strictEqual(isValidHexColor('#gg0000'), false, 'Should reject invalid characters');
    assert.strictEqual(isValidHexColor('000000'), false, 'Should reject missing #');
});

test('clamp keeps value within range', () => {
    assert.strictEqual(clamp(5, 0, 10), 5, 'Should return value when in range');
    assert.strictEqual(clamp(-5, 0, 10), 0, 'Should return min when below range');
    assert.strictEqual(clamp(15, 0, 10), 10, 'Should return max when above range');
    assert.strictEqual(clamp(0, 0, 10), 0, 'Should return value when at min');
    assert.strictEqual(clamp(10, 0, 10), 10, 'Should return value when at max');
});

test('clamp validates input types', () => {
    assert.throws(() => clamp('5', 0, 10), TypeError, 'Should throw TypeError for string value');
    assert.throws(() => clamp(5, '0', 10), TypeError, 'Should throw TypeError for string min');
    assert.throws(() => clamp(5, 0, '10'), TypeError, 'Should throw TypeError for string max');
    assert.throws(() => clamp(NaN, 0, 10), TypeError, 'Should throw TypeError for NaN');
    assert.throws(() => clamp(5, 10, 0), RangeError, 'Should throw RangeError when min > max');
});

test('lerp interpolates correctly', () => {
    assert.strictEqual(lerp(0, 10, 0), 0, 'Should return start at t=0');
    assert.strictEqual(lerp(0, 10, 1), 10, 'Should return end at t=1');
    assert.strictEqual(lerp(0, 10, 0.5), 5, 'Should return midpoint at t=0.5');
    assert.strictEqual(lerp(10, 20, 0.25), 12.5, 'Should interpolate correctly');
});

test('lerp clamps t to 0-1 range', () => {
    assert.strictEqual(lerp(0, 10, -1), 0, 'Should clamp negative t to 0');
    assert.strictEqual(lerp(0, 10, 2), 10, 'Should clamp t > 1 to 1');
});

test('lerp validates input types', () => {
    assert.throws(() => lerp('0', 10, 0.5), TypeError, 'Should throw TypeError for string a');
    assert.throws(() => lerp(0, '10', 0.5), TypeError, 'Should throw TypeError for string b');
    assert.throws(() => lerp(0, 10, 'half'), TypeError, 'Should throw TypeError for string t');
    assert.throws(() => lerp(NaN, 10, 0.5), TypeError, 'Should throw TypeError for NaN');
});

test('isValidNumber accepts finite numbers', () => {
    assert.strictEqual(isValidNumber(0), true, 'Should accept 0');
    assert.strictEqual(isValidNumber(42), true, 'Should accept positive');
    assert.strictEqual(isValidNumber(-42), true, 'Should accept negative');
    assert.strictEqual(isValidNumber(3.14), true, 'Should accept decimals');
});

test('isValidNumber rejects invalid numbers', () => {
    assert.strictEqual(isValidNumber(NaN), false, 'Should reject NaN');
    assert.strictEqual(isValidNumber(Infinity), false, 'Should reject Infinity');
    assert.strictEqual(isValidNumber(-Infinity), false, 'Should reject -Infinity');
    assert.strictEqual(isValidNumber('42'), false, 'Should reject string');
    assert.strictEqual(isValidNumber(null), false, 'Should reject null');
});

test('formatFileSize formats bytes correctly', () => {
    assert.strictEqual(formatFileSize(0), '0 B', 'Should format 0 bytes');
    assert.strictEqual(formatFileSize(500), '500 B', 'Should format bytes');
    assert.strictEqual(formatFileSize(1024), '1.0 KB', 'Should format KB');
    assert.strictEqual(formatFileSize(1536), '1.5 KB', 'Should format fractional KB');
    assert.strictEqual(formatFileSize(1048576), '1.0 MB', 'Should format MB');
    assert.strictEqual(formatFileSize(10485760), '10.0 MB', 'Should format large MB');
});

test('formatFileSize handles invalid input', () => {
    assert.strictEqual(formatFileSize(-100), '0 B', 'Should handle negative');
    assert.strictEqual(formatFileSize(NaN), '0 B', 'Should handle NaN');
    assert.strictEqual(formatFileSize(null), '0 B', 'Should handle null');
});

test('generateId creates unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();

    assert.ok(id1, 'Should generate ID');
    assert.ok(id2, 'Should generate second ID');
    assert.notStrictEqual(id1, id2, 'IDs should be unique');
    assert.strictEqual(typeof id1, 'string', 'ID should be string');
    assert.ok(id1.length > 10, 'ID should be reasonably long');
});

test('deepClone creates independent copy', () => {
    const original = { a: 1, b: { c: 2 }, d: [3, 4] };
    const cloned = deepClone(original);

    assert.deepStrictEqual(cloned, original, 'Cloned should equal original');
    assert.notStrictEqual(cloned, original, 'Cloned should be different reference');
    assert.notStrictEqual(cloned.b, original.b, 'Nested object should be different reference');
    assert.notStrictEqual(cloned.d, original.d, 'Array should be different reference');

    // Modify cloned and verify original unchanged
    cloned.b.c = 99;
    assert.strictEqual(original.b.c, 2, 'Original should not change when clone modified');
});

test('deepClone handles primitives', () => {
    assert.strictEqual(deepClone(42), 42, 'Should handle numbers');
    assert.strictEqual(deepClone('test'), 'test', 'Should handle strings');
    assert.strictEqual(deepClone(null), null, 'Should handle null');
    assert.strictEqual(deepClone(undefined), undefined, 'Should handle undefined');
});

test('isValidImageFile accepts valid image types', () => {
    const validFiles = [
        { type: 'image/png' },
        { type: 'image/jpeg' },
        { type: 'image/jpg' },
        { type: 'image/gif' },
        { type: 'image/webp' },
        { type: 'image/svg+xml' }
    ];

    for (const file of validFiles) {
        assert.strictEqual(isValidImageFile(file), true, `Should accept ${file.type}`);
    }
});

test('isValidImageFile rejects invalid types', () => {
    const invalidFiles = [
        { type: 'text/plain' },
        { type: 'application/pdf' },
        { type: 'video/mp4' },
        {},
        null
    ];

    for (const file of invalidFiles) {
        assert.strictEqual(isValidImageFile(file), false, `Should reject ${file?.type || 'invalid'}`);
    }
});
