// this_file: tests/utils_logger.test.js
/**
 * Test Suite: Utils - Logger
 *
 * Purpose: Tests the logging utility factory function for creating module-
 * specific loggers with consistent prefixes. Validates that log/warn/error
 * methods work correctly and preserve module context.
 *
 * Modules Tested:
 * - src/utils/logger.js (createLogger function)
 *
 * Test Count: 4 tests
 * @lastTested 2025-11-05 (Iteration 92)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { createLogger } from '../src/utils/logger.js';

test('createLogger returns object with log/warn/error methods', () => {
    const log = createLogger('Test');

    assert.ok(typeof log.log === 'function', 'should have log method');
    assert.ok(typeof log.info === 'function', 'should have info method');
    assert.ok(typeof log.warn === 'function', 'should have warn method');
    assert.ok(typeof log.error === 'function', 'should have error method');
});

test('createLogger prepends module name prefix', () => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    const captured = [];

    console.log = (...args) => captured.push({ type: 'log', args });
    console.warn = (...args) => captured.push({ type: 'warn', args });
    console.error = (...args) => captured.push({ type: 'error', args });

    try {
        const log = createLogger('TestModule');

        log.log('test message');
        log.info('info message');
        log.warn('warning message');
        log.error('error message');

        assert.equal(captured.length, 4, 'should capture all 4 calls');

        assert.equal(captured[0].type, 'log');
        assert.equal(captured[0].args[0], '[TestModule]');
        assert.equal(captured[0].args[1], 'test message');

        assert.equal(captured[1].type, 'log'); // info is alias for log
        assert.equal(captured[1].args[0], '[TestModule]');
        assert.equal(captured[1].args[1], 'info message');

        assert.equal(captured[2].type, 'warn');
        assert.equal(captured[2].args[0], '[TestModule]');
        assert.equal(captured[2].args[1], 'warning message');

        assert.equal(captured[3].type, 'error');
        assert.equal(captured[3].args[0], '[TestModule]');
        assert.equal(captured[3].args[1], 'error message');
    } finally {
        console.log = originalLog;
        console.warn = originalWarn;
        console.error = originalError;
    }
});

test('createLogger handles multiple arguments', () => {
    const originalLog = console.log;
    const captured = [];

    console.log = (...args) => captured.push(args);

    try {
        const log = createLogger('Multi');
        log.log('Loading file:', 'image.png', 'size:', 1024);

        assert.equal(captured[0][0], '[Multi]');
        assert.equal(captured[0][1], 'Loading file:');
        assert.equal(captured[0][2], 'image.png');
        assert.equal(captured[0][3], 'size:');
        assert.equal(captured[0][4], 1024);
    } finally {
        console.log = originalLog;
    }
});

test('createLogger works with different module names', () => {
    const originalLog = console.log;
    const captured = [];

    console.log = (...args) => captured.push(args);

    try {
        const log1 = createLogger('Module1');
        const log2 = createLogger('Module2');

        log1.log('message1');
        log2.log('message2');

        assert.equal(captured[0][0], '[Module1]');
        assert.equal(captured[1][0], '[Module2]');
    } finally {
        console.log = originalLog;
    }
});
