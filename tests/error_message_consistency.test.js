// tests/error_message_consistency.test.js
// this_file: tests/error_message_consistency.test.js
/**
 * Test Suite: Error Message Consistency
 *
 * Purpose: Validates that error messages across all modules include
 * function/class names, parameter context, and use consistent error types
 * (TypeError for type violations, RangeError for bounds violations).
 *
 * Modules Tested:
 * - src/utils/helpers.js (all utility functions)
 * - src/core/EventBus.js, AppState.js, sharedState.js, ordering.js
 *
 * Test Count: 9 tests
 * @lastTested 2025-11-05 (Iteration 92)
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateLuminance, clamp, lerp } from '../src/utils/helpers.js';
import { EventBus } from '../src/core/EventBus.js';
import { appState } from '../src/core/AppState.js';
import { storeSharedRef, getSharedRef } from '../src/core/sharedState.js';
import { reorderList } from '../src/core/ordering.js';

/**
 * Error Message Consistency Tests
 *
 * Validates that error messages follow consistent patterns:
 * - Include function/module name context
 * - Describe what went wrong clearly
 * - Include actual values when helpful
 */

// ==================== helpers.js Error Messages ====================

test('calculateLuminance error includes function name', () => {
    try {
        calculateLuminance('invalid');
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('calculateLuminance'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err instanceof TypeError, 'Should throw TypeError');
    }
});

test('clamp error messages include function name and parameter context', () => {
    // Test invalid value type
    try {
        clamp('not-a-number', 0, 10);
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('clamp'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err.message.includes('value'),
            `Error should specify which parameter failed. Got: "${err.message}"`);
    }

    // Test invalid min type
    try {
        clamp(5, 'not-a-number', 10);
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('clamp'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err.message.includes('min'),
            `Error should specify which parameter failed. Got: "${err.message}"`);
    }

    // Test range validation
    try {
        clamp(5, 10, 0); // min > max
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('clamp'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err.message.includes('10') && err.message.includes('0'),
            `Error should include actual min/max values. Got: "${err.message}"`);
        assert.ok(err instanceof RangeError, 'Range violations should throw RangeError');
    }
});

test('lerp error messages include function name and parameter context', () => {
    // Test invalid a parameter
    try {
        lerp('not-a-number', 10, 0.5);
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('lerp'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err.message.includes('a'),
            `Error should specify which parameter failed. Got: "${err.message}"`);
    }

    // Test invalid b parameter
    try {
        lerp(0, 'not-a-number', 0.5);
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('lerp'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err.message.includes('b'),
            `Error should specify which parameter failed. Got: "${err.message}"`);
    }

    // Test invalid t parameter
    try {
        lerp(0, 10, 'not-a-number');
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('lerp'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err.message.includes('t'),
            `Error should specify which parameter failed. Got: "${err.message}"`);
    }
});

// ==================== EventBus.js Error Messages ====================

test('EventBus error messages include class and method name', () => {
    const bus = new EventBus();

    try {
        bus.on('test-event', 'not-a-function');
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('EventBus'),
            `Error should include class name. Got: "${err.message}"`);
        assert.ok(err.message.includes('function'),
            `Error should describe expected type. Got: "${err.message}"`);
        assert.ok(err instanceof TypeError, 'Type violations should throw TypeError');
    }
});

// ==================== AppState.js Error Messages ====================

test('AppState error messages include class and method name', () => {
    appState.reset();

    // Test mergeInto with non-object patch
    try {
        appState.mergeInto('nonexistent', 'not-an-object');
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('AppState'),
            `Error should include class name. Got: "${err.message}"`);
        assert.ok(err.message.includes('mergeInto'),
            `Error should include method name. Got: "${err.message}"`);
    }

    // Test pushTo with non-array target
    appState.set('testObj', { not: 'array' });
    try {
        appState.pushTo('testObj', 'item');
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('AppState'),
            `Error should include class name. Got: "${err.message}"`);
        assert.ok(err.message.includes('pushTo'),
            `Error should include method name. Got: "${err.message}"`);
        assert.ok(err.message.includes('testObj'),
            `Error should include key name. Got: "${err.message}"`);
    }

    // Test removeFrom with non-array target
    try {
        appState.removeFrom('testObj', 'item');
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('AppState'),
            `Error should include class name. Got: "${err.message}"`);
        assert.ok(err.message.includes('removeFrom'),
            `Error should include method name. Got: "${err.message}"`);
        assert.ok(err.message.includes('testObj'),
            `Error should include key name. Got: "${err.message}"`);
    }

    appState.reset();
});

// ==================== sharedState.js Error Messages ====================

test('sharedState error messages are descriptive and include invalid key', () => {
    appState.reset();

    // Test storeSharedRef with invalid key
    try {
        storeSharedRef('invalid-key', {});
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('invalid-key'),
            `Error should include the invalid key. Got: "${err.message}"`);
        assert.ok(err.message.toLowerCase().includes('not registered'),
            `Error should explain the key isn't registered. Got: "${err.message}"`);
    }

    // Test getSharedRef with invalid key
    try {
        getSharedRef('another-invalid-key');
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('another-invalid-key'),
            `Error should include the invalid key. Got: "${err.message}"`);
        assert.ok(err.message.toLowerCase().includes('not registered'),
            `Error should explain the key isn't registered. Got: "${err.message}"`);
    }

    appState.reset();
});

// ==================== ordering.js Error Messages ====================

test('reorderList error messages include function name and constraint details', () => {
    // Test non-array input
    try {
        reorderList('not-an-array', 0, 1);
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('reorderList'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err.message.includes('array'),
            `Error should mention expected type. Got: "${err.message}"`);
    }

    // Test non-integer indices
    try {
        reorderList([1, 2, 3], 0.5, 1);
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('reorderList'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err.message.includes('integer'),
            `Error should mention integer requirement. Got: "${err.message}"`);
    }

    // Test out-of-bounds indices
    try {
        reorderList([1, 2, 3], 0, 10);
        assert.fail('Should have thrown error');
    } catch (err) {
        assert.ok(err.message.includes('reorderList'),
            `Error should include function name. Got: "${err.message}"`);
        assert.ok(err.message.includes('bounds'),
            `Error should mention bounds violation. Got: "${err.message}"`);
        assert.ok(err instanceof RangeError, 'Bounds violations should throw RangeError');
    }
});

// ==================== Error Type Consistency ====================

test('TypeError is used consistently for type violations', () => {
    const typeErrors = [
        () => calculateLuminance(null),
        () => clamp('string', 0, 10),
        () => lerp(0, 10, 'string'),
        () => new EventBus().on('event', 'not-function'),
        () => appState.mergeInto('key', 'not-object')
    ];

    for (const fn of typeErrors) {
        try {
            fn();
            assert.fail('Should have thrown TypeError');
        } catch (err) {
            assert.ok(err instanceof TypeError,
                `Type violations should throw TypeError. Got: ${err.constructor.name}`);
        }
    }
});

test('RangeError is used consistently for range/bounds violations', () => {
    const rangeErrors = [
        () => clamp(5, 10, 0), // min > max
        () => reorderList([1, 2, 3], 0, 10) // out of bounds
    ];

    for (const fn of rangeErrors) {
        try {
            fn();
            assert.fail('Should have thrown RangeError');
        } catch (err) {
            assert.ok(err instanceof RangeError,
                `Range violations should throw RangeError. Got: ${err.constructor.name}`);
        }
    }
});
