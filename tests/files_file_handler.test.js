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
 * Test Count: 9 tests
 * @lastTested 2025-11-06 (Phase 5 Iteration 115)
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

function createElementStub() {
    const classes = new Set();
    return {
        classList: {
            add: (value) => classes.add(value),
            remove: (value) => classes.delete(value),
            contains: (value) => classes.has(value)
        },
        getClasses: () => Array.from(classes)
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

test('FileHandler_processFiles_when_mixedValidity_then_logsSummaryWithoutLeadingSpace', () => {
    const ctx = createTestContext();
    const invalidFile = { name: 'vector.svgz', type: 'application/gzip', size: 2 * BYTES_PER_MB };
    const validFile = { name: 'stack.png', type: 'image/png', size: 1 * BYTES_PER_MB };

    ctx.handler.processFiles([invalidFile, validFile]);

    const summaryCalls = ctx.logValidationWarn.getCalls();
    assert.equal(summaryCalls.length, 1, 'summary warning should be logged once');
    const [message] = summaryCalls[0];
    assert.equal(typeof message, 'string', 'summary message should be a string');
    assert.equal(message.startsWith(' '), false, 'summary message must not start with a space');
    assert.equal(message, '1 file(s) rejected, 1 accepted', 'summary should report counts without extra whitespace');
});

test('FileHandler_dragEvents_when_nestedEnterLeave_then_overlayVisibilityTracksDepth', () => {
    const dropOverlay = createElementStub();
    const slidesPanel = createElementStub();
    const ctx = createTestContext({
        elements: {
            imageInput: {},
            browseButton: null,
            dropOverlay,
            slidesPanel
        }
    });

    const dragEvent = {
        dataTransfer: {
            files: [{ name: 'hero.png' }]
        }
    };

    ctx.handler.handleDragEnter(dragEvent);
    ctx.handler.handleDragEnter(dragEvent);

    assert.equal(ctx.handler.dragDepth, 2, 'dragDepth should increment per dragenter with files');
    assert.ok(dropOverlay.classList.contains('visible'), 'overlay should be visible while dragging with files');
    assert.ok(slidesPanel.classList.contains('drag-active'), 'slides panel should signal drag-active state');

    ctx.handler.handleDragLeave(dragEvent);
    assert.equal(ctx.handler.dragDepth, 1, 'dragDepth should decrement on dragleave but remain positive until last leave');
    assert.ok(dropOverlay.classList.contains('visible'), 'overlay should remain visible until dragDepth reaches zero');

    ctx.handler.handleDragLeave(dragEvent);
    assert.equal(ctx.handler.dragDepth, 0, 'dragDepth should reset once all drag contexts exit');
    assert.equal(dropOverlay.classList.contains('visible'), false, 'overlay should hide after final dragleave');
    assert.equal(slidesPanel.classList.contains('drag-active'), false, 'slides panel should clear drag-active class after final leave');
});

test('FileHandler_handleDrop_when_payloadMissingFiles_then_hidesOverlayAndSkipsProcessing', () => {
    const dropOverlay = createElementStub();
    const slidesPanel = createElementStub();
    const ctx = createTestContext({
        elements: {
            imageInput: {},
            browseButton: null,
            dropOverlay,
            slidesPanel
        }
    });

    let processed = false;
    ctx.handler.processFiles = () => {
        processed = true;
    };

    const dragWithFiles = {
        dataTransfer: {
            files: [{ name: 'art.png' }]
        }
    };

    ctx.handler.handleDragEnter(dragWithFiles);
    assert.ok(dropOverlay.classList.contains('visible'), 'overlay should show on dragenter with files');

    const dragWithoutFiles = {
        dataTransfer: {
            files: [],
            types: []
        }
    };

    ctx.handler.handleDrop(dragWithoutFiles);

    assert.equal(processed, false, 'processFiles should not run when drop payload lacks files');
    assert.equal(ctx.handler.dragDepth, 0, 'dragDepth must reset after drop cleanup');
    assert.equal(dropOverlay.classList.contains('visible'), false, 'overlay should hide when payload has no files');
    assert.equal(slidesPanel.classList.contains('drag-active'), false, 'slides panel should clear drag-active state after drop cleanup');
});

test('FileHandler_handleDragEnter_when_typesIncludeFiles_then_treatsEventAsFilePayload', () => {
    const dropOverlay = createElementStub();
    const slidesPanel = createElementStub();
    const ctx = createTestContext({
        elements: {
            imageInput: {},
            browseButton: null,
            dropOverlay,
            slidesPanel
        }
    });

    const dragEventWithTypes = {
        dataTransfer: {
            files: [],
            types: ['Files']
        }
    };

    ctx.handler.handleDragEnter(dragEventWithTypes);

    assert.equal(ctx.handler.dragDepth, 1, 'dragDepth should increment when dataTransfer.types contains Files');
    assert.equal(dropOverlay.classList.contains('visible'), true, 'overlay should display when payload advertises files via types');
    assert.equal(slidesPanel.classList.contains('drag-active'), true, 'slides panel should adopt drag-active state for types-backed payloads');

    ctx.handler.handleDragLeave(dragEventWithTypes);

    assert.equal(ctx.handler.dragDepth, 0, 'dragDepth should reset after matching dragleave event');
    assert.equal(dropOverlay.classList.contains('visible'), false, 'overlay should hide once dragDepth returns to zero');
    assert.equal(slidesPanel.classList.contains('drag-active'), false, 'slides panel should clear drag-active state once dragDepth resets');
});

test('FileHandler_teardown_when_called_then_overlayClassesCleared', () => {
    const dropOverlay = createElementStub();
    const slidesPanel = createElementStub();
    dropOverlay.classList.add('visible');
    slidesPanel.classList.add('drag-active');

    const ctx = createTestContext({
        elements: {
            imageInput: {},
            browseButton: null,
            dropOverlay,
            slidesPanel
        }
    });

    ctx.handler.dragDepth = 3;
    ctx.handler.teardown();

    assert.equal(ctx.handler.dragDepth, 0, 'teardown should reset drag depth to zero');
    assert.equal(dropOverlay.classList.contains('visible'), false, 'teardown should clear overlay visibility');
    assert.equal(slidesPanel.classList.contains('drag-active'), false, 'teardown should clear slides panel drag state');
});
