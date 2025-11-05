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
    isValidImageFile,
    getAdaptiveFloorColor,
    debounce
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

// Additional edge case tests for robustness

test('calculateLuminance handles extreme hex values correctly', () => {
    // Pure red
    const red = calculateLuminance('#ff0000');
    assert.ok(red >= 0 && red <= 1, 'Pure red should be in valid range');

    // Pure green
    const green = calculateLuminance('#00ff00');
    assert.ok(green >= 0 && green <= 1, 'Pure green should be in valid range');
    assert.ok(green > red, 'Green should be more luminous than red');

    // Pure blue
    const blue = calculateLuminance('#0000ff');
    assert.ok(blue >= 0 && blue <= 1, 'Pure blue should be in valid range');
    assert.ok(blue < red, 'Blue should be less luminous than red');
});

test('calculateLuminance handles 3-digit hex shorthand', () => {
    const result = calculateLuminance('#fff');
    assert.strictEqual(result, 1, '3-digit white should expand to #ffffff');

    const black = calculateLuminance('#000');
    assert.strictEqual(black, 0, '3-digit black should expand to #000000');
});

test('calculateLuminance is case-insensitive', () => {
    const lower = calculateLuminance('#abc123');
    const upper = calculateLuminance('#ABC123');
    assert.strictEqual(lower, upper, 'Luminance should be case-insensitive');
});

test('clamp handles edge case where min === max', () => {
    assert.strictEqual(clamp(5, 10, 10), 10, 'Should return min/max when they are equal');
    assert.strictEqual(clamp(15, 10, 10), 10, 'Should return min/max when value exceeds');
});

test('clamp handles negative ranges', () => {
    assert.strictEqual(clamp(-5, -10, -1), -5, 'Should work with negative range');
    assert.strictEqual(clamp(-15, -10, -1), -10, 'Should clamp to negative min');
    assert.strictEqual(clamp(5, -10, -1), -1, 'Should clamp to negative max');
});

test('clamp handles fractional values', () => {
    assert.strictEqual(clamp(0.5, 0, 1), 0.5, 'Should handle fractional in range');
    assert.strictEqual(clamp(1.5, 0, 1), 1, 'Should clamp fractional above max');
    assert.strictEqual(clamp(-0.5, 0, 1), 0, 'Should clamp fractional below min');
});

test('lerp handles negative interpolation range', () => {
    assert.strictEqual(lerp(-10, 0, 0.5), -5, 'Should interpolate negative to zero');
    assert.strictEqual(lerp(10, -10, 0.5), 0, 'Should interpolate from positive to negative');
});

test('lerp handles same start and end values', () => {
    assert.strictEqual(lerp(5, 5, 0), 5, 'Should return constant value at t=0');
    assert.strictEqual(lerp(5, 5, 0.5), 5, 'Should return constant value at t=0.5');
    assert.strictEqual(lerp(5, 5, 1), 5, 'Should return constant value at t=1');
});

test('lerp precision at boundary values', () => {
    const result0 = lerp(0, 100, 0);
    assert.strictEqual(result0, 0, 'Should be exactly 0 at t=0');

    const result1 = lerp(0, 100, 1);
    assert.strictEqual(result1, 100, 'Should be exactly 100 at t=1');
});

test('formatFileSize handles zero bytes', () => {
    assert.strictEqual(formatFileSize(0), '0 B', 'Should format zero bytes');
});

test('formatFileSize handles edge unit boundaries', () => {
    assert.strictEqual(formatFileSize(1023), '1023 B', 'Just under KB');
    assert.strictEqual(formatFileSize(1024), '1.0 KB', 'Exactly 1 KB');
    assert.strictEqual(formatFileSize(1024 * 1024 - 1), '1024.0 KB', 'Just under MB');
    assert.strictEqual(formatFileSize(1024 * 1024), '1.0 MB', 'Exactly 1 MB');
});

test('deepClone handles circular reference gracefully', () => {
    const obj = { a: 1 };
    obj.self = obj; // Circular reference

    // deepClone will hit recursion limit and throw RangeError
    assert.throws(() => deepClone(obj),
        RangeError,
        'Should throw RangeError on circular reference');
});

test('deepClone handles undefined and null', () => {
    assert.strictEqual(deepClone(null), null, 'Should clone null');
    assert.strictEqual(deepClone(undefined), undefined, 'Should clone undefined');
});

test('generateId produces consistent length', () => {
    const id1 = generateId();
    const id2 = generateId();
    const id3 = generateId();

    assert.strictEqual(id1.length, id2.length, 'IDs should have consistent length');
    assert.strictEqual(id2.length, id3.length, 'IDs should have consistent length');
});

test('getAdaptiveFloorColor returns THREE.Color for valid hex', () => {
    const color = getAdaptiveFloorColor('#ff0000');
    assert.ok(color, 'Should return color object');
    assert.strictEqual(typeof color.r, 'number', 'Should have r component');
    assert.strictEqual(typeof color.g, 'number', 'Should have g component');
    assert.strictEqual(typeof color.b, 'number', 'Should have b component');
});

test('getAdaptiveFloorColor creates color from hex string', () => {
    const bgColor = '#ff0000';
    const floorColor = getAdaptiveFloorColor(bgColor);

    // THREE.Color should parse the hex correctly
    // Just verify it creates a valid color object
    assert.ok(floorColor.r >= 0 && floorColor.r <= 1, 'Red should be in range 0-1');
    assert.ok(floorColor.g >= 0 && floorColor.g <= 1, 'Green should be in range 0-1');
    assert.ok(floorColor.b >= 0 && floorColor.b <= 1, 'Blue should be in range 0-1');
    // For pure red, r should be high, g and b should be low
    assert.ok(floorColor.r > 0.9, 'Red component should be high for #ff0000');
});

test('debounce delays function execution', (t, done) => {
    let callCount = 0;
    const func = () => { callCount++; };
    const debounced = debounce(func, 50);

    // Call multiple times rapidly
    debounced();
    debounced();
    debounced();

    // Should not have executed yet
    assert.strictEqual(callCount, 0, 'Function should not execute immediately');

    // Wait for debounce delay
    setTimeout(() => {
        assert.strictEqual(callCount, 1, 'Function should execute once after delay');
        done();
    }, 100);
});

test('debounce cancels previous calls', (t, done) => {
    const calls = [];
    const func = (arg) => { calls.push(arg); };
    const debounced = debounce(func, 50);

    // Call with different arguments
    debounced('first');
    setTimeout(() => debounced('second'), 10);
    setTimeout(() => debounced('third'), 20);

    // Only the last call should execute
    setTimeout(() => {
        assert.strictEqual(calls.length, 1, 'Should only execute once');
        assert.strictEqual(calls[0], 'third', 'Should execute with last argument');
        done();
    }, 100);
});

test('debounce preserves function arguments', (t, done) => {
    let receivedArgs = null;
    const func = (...args) => { receivedArgs = args; };
    const debounced = debounce(func, 50);

    debounced(1, 'test', { key: 'value' });

    setTimeout(() => {
        assert.deepStrictEqual(receivedArgs, [1, 'test', { key: 'value' }],
            'Should preserve all arguments');
        done();
    }, 100);
});
