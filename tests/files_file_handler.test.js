// this_file: tests/files_file_handler.test.js
/**
 * Test Suite: Files - FileHandler
 *
 * Purpose: Validates drag/drop and browse file intake prior to texture loading.
 * Ensures type/size guards fire appropriate toasts, memory gating integrates
 * with the injected guard callback, and valid files reach the downstream loader.
 *
 * Modules Tested:
 * - src/files/FileHandler.js (FileHandler class)
 *
 * Test Count: 4 tests
 * @lastTested 2025-11-05 (Phase 5 Iteration 1)
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { FileHandler } from '../src/files/FileHandler.js';
import {
    FILE_SIZE_WARN_MB,
    FILE_SIZE_REJECT_MB,
    TOAST_DURATION_ERROR,
    TOAST_DURATION_WARNING
} from '../src/core/constants.js';

const BYTES_PER_MB = 1024 * 1024;

function createLoggerRecorder() {
    const calls = [];
    return {
        handler: (...args) => {
            calls.push(args);
        },
        getCalls: () => calls
    };
}

function createTestContext(overrides = {}) {
    const acceptedFiles = [];
    const showToastCalls = [];
    const memoryChecks = [];

    const logInfo = createLoggerRecorder();
    const logWarn = createLoggerRecorder();
    const logError = createLoggerRecorder();

    const logValidationWarn = createLoggerRecorder();
    const logValidationError = createLoggerRecorder();

    const handler = new FileHandler({
        elements: overrides.elements ?? {
            imageInput: null,
            browseButton: null,
            dropOverlay: null,
            slidesPanel: null
        },
        addTrackedEventListener: overrides.addTrackedEventListener ?? (() => {}),
        onFileAccepted: overrides.onFileAccepted ?? ((file) => {
            acceptedFiles.push(file);
        }),
        shouldProceedAfterMemoryCheck: overrides.shouldProceedAfterMemoryCheck ?? (() => {
            memoryChecks.push(true);
            return true;
        }),
        showToast: overrides.showToast ?? ((message, type, duration) => {
            showToastCalls.push({ message, type, duration });
        }),
        loggers: {
            logFile: overrides.logFile ?? {
                info: logInfo.handler,
                warn: logWarn.handler,
                error: logError.handler
            },
            logValidation: overrides.logValidation ?? {
                warn: logValidationWarn.handler,
                error: logValidationError.handler
            }
        }
    });

    return {
        handler,
        acceptedFiles,
        showToastCalls,
        memoryChecks,
        logInfo,
        logWarn,
        logError,
        logValidationWarn,
        logValidationError
    };
}

test('FileHandler_processFiles_when_fileTypeUnsupported_then_rejectsWithToast', () => {
    const ctx = createTestContext();
    const invalidFile = { name: 'design.psd', type: 'image/vnd.photoshop', size: 2 * BYTES_PER_MB };

    ctx.handler.processFiles([invalidFile]);

    assert.equal(ctx.acceptedFiles.length, 0, 'invalid files must not reach downstream loader');
    assert.equal(ctx.showToastCalls.length, 1, 'unsupported type should display a toast');
    assert.equal(ctx.showToastCalls[0].type, 'error', 'unsupported type toast must be error');
    assert.match(
        ctx.showToastCalls[0].message,
        /unsupported file type/i,
        'toast message should mention unsupported file type'
    );
    assert.equal(ctx.logValidationError.getCalls().length, 1, 'error logger must capture rejection');
});

test('FileHandler_processFiles_when_fileSizeAboveRejectThreshold_then_blocksWithError', () => {
    const ctx = createTestContext();
    const oversizedFile = {
        name: 'massive.png',
        type: 'image/png',
        size: (FILE_SIZE_REJECT_MB + 5) * BYTES_PER_MB
    };

    ctx.handler.processFiles([oversizedFile]);

    assert.equal(ctx.acceptedFiles.length, 0, 'oversized file must be rejected');
    assert.equal(ctx.showToastCalls.length, 1, 'oversized file should trigger a toast');
    assert.equal(ctx.showToastCalls[0].type, 'error', 'oversized toast should be error');
    assert.equal(ctx.showToastCalls[0].duration, TOAST_DURATION_ERROR, 'error toast must reuse configured duration');
    assert.equal(ctx.logValidationError.getCalls().length, 1, 'oversized rejection should be logged');
});

test('FileHandler_processFiles_when_fileSizeAboveWarnThreshold_then_warnsAndAccepts', () => {
    const ctx = createTestContext();
    const largeFile = {
        name: 'poster.jpg',
        type: 'image/jpeg',
        size: (FILE_SIZE_WARN_MB + 1) * BYTES_PER_MB
    };

    ctx.handler.processFiles([largeFile]);

    assert.equal(ctx.acceptedFiles.length, 1, 'large files below reject threshold must still load');
    assert.equal(ctx.showToastCalls.length, 1, 'warning toast should appear for large files');
    assert.equal(ctx.showToastCalls[0].type, 'warning', 'warning toast should declare warning type');
    assert.equal(ctx.showToastCalls[0].duration, TOAST_DURATION_WARNING, 'warning toast should reuse configured duration');
    assert.equal(ctx.logValidationWarn.getCalls().length, 1, 'warning log should capture large file');
});

test('FileHandler_processFiles_when_memoryGuardDeclines_then_skipsAndWarns', () => {
    const ctx = createTestContext({
        shouldProceedAfterMemoryCheck: () => {
            ctx.memoryChecks.push(false);
            return false;
        }
    });
    const validLightFile = {
        name: 'art.png',
        type: 'image/png',
        size: 2 * BYTES_PER_MB
    };

    ctx.handler.processFiles([validLightFile]);

    assert.equal(ctx.memoryChecks.length, 1, 'memory guard should be consulted once per file');
    assert.equal(ctx.acceptedFiles.length, 0, 'memory guard decline should prevent processing');
    assert.equal(ctx.showToastCalls.length, 1, 'memory guard decline should surface to the UI');
    assert.equal(ctx.showToastCalls[0].type, 'warning', 'memory guard decline should be a warning toast');
    assert.match(
        ctx.showToastCalls[0].message,
        /memory limit/i,
        'toast should mention memory limit'
    );
});
