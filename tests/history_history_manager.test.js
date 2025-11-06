// this_file: tests/history_history_manager.test.js
/**
 * Test Suite: History - HistoryManager
 *
 * Purpose: Encapsulates undo/redo stack behaviour extracted from src/main.js
 * with dependency injection for logging, toasts, and shared state mirrors.
 *
 * Modules Tested:
 * - src/history/HistoryManager.js (HistoryManager)
 *
 * Test Count: 13 tests
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { HistoryManager } from '../src/history/HistoryManager.js';

function createHarness(overrides = {}) {
    const snapshots = overrides.snapshots ?? [];
    let captureIndex = 0;

    const applied = [];
    const applyAttempts = [];
    const stackMirrors = [];
    const toastCalls = [];
    const logCalls = [];

    const captureStateImpl = overrides.captureState ?? (() => {
        if (captureIndex >= snapshots.length) {
            throw new Error('captureState called without prepared snapshot');
        }
        const snapshot = snapshots[captureIndex];
        captureIndex += 1;
        return snapshot;
    });

    const userApplyState = overrides.applyState;

    const userOnStackChange = overrides.onStackChange;

    const manager = new HistoryManager({
        maxSize: overrides.maxSize ?? 3,
        captureState: () => captureStateImpl(),
        applyState: (snapshot, meta) => {
            applyAttempts.push({ snapshot, meta });
            if (userApplyState) {
                return userApplyState(snapshot, meta);
            }
            applied.push({ snapshot, meta });
            return undefined;
        },
        onStackChange: (index, stack) => {
            if (Array.isArray(stack)) {
                stackMirrors.push({ index, stack: stack.slice() });
            } else {
                stackMirrors.push({ index, stack });
            }
            if (userOnStackChange) {
                userOnStackChange(index, stack);
            }
        },
        logger: {
            info: (...args) => logCalls.push({ level: 'info', args }),
            warn: (...args) => logCalls.push({ level: 'warn', args }),
            error: (...args) => logCalls.push({ level: 'error', args })
        },
        showToast: (message, type) => {
            toastCalls.push({ message, type });
        }
    });

    return { manager, applied, applyAttempts, stackMirrors, toastCalls, logCalls };
}

test('HistoryManager_capture_when_newSnapshot_then_prunesRedoStatesAndEnforcesLimit', () => {
    const harness = createHarness({
        maxSize: 2,
        snapshots: [{ id: 's1' }, { id: 's2' }, { id: 's3' }]
    });

    harness.manager.capture();
    harness.manager.capture();
    harness.manager.undo();

    harness.manager.capture();

    assert.equal(harness.manager.size(), 2, 'stack should honour max size');
    assert.deepEqual(
        harness.manager.peekStack(),
        [{ id: 's1' }, { id: 's3' }],
        'stack should drop redo chain and respect limit'
    );
    assert.equal(harness.manager.getIndex(), 1, 'index should point to most recent snapshot');
    assert.deepEqual(
        harness.stackMirrors.map((mirror) => mirror.index),
        [-1, 0, 1, 0, 1],
        'onStackChange should emit for initial state and every operation'
    );
});

test('HistoryManager_undo_when_stateAvailable_then_appliesPreviousAndSignalsSuccess', () => {
    const harness = createHarness({
        snapshots: [{ id: 's1' }, { id: 's2' }]
    });

    harness.manager.capture();
    harness.manager.capture();

    const undone = harness.manager.undo();

    assert.equal(undone, true, 'undo should succeed when a previous state exists');
    assert.deepEqual(harness.applied.map((entry) => entry.snapshot), [{ id: 's1' }], 'applyState should receive previous snapshot');
    assert.deepEqual(
        harness.toastCalls.map((entry) => entry.type),
        ['success'],
        'successful undo should emit success toast'
    );
    assert.equal(harness.manager.getIndex(), 0, 'index should move back after undo');
});

test('HistoryManager_redo_when_noFutureState_then_warnsAndReturnsFalse', () => {
    const harness = createHarness({
        snapshots: [{ id: 's1' }]
    });

    harness.manager.capture();
    const result = harness.manager.redo();

    assert.equal(result, false, 'redo should fail when no future state exists');
    assert.deepEqual(
        harness.toastCalls,
        [{ message: '⚠️ Nothing to redo', type: 'warning' }],
        'redo failure should show warning toast'
    );
});

test('HistoryManager_clear_when_called_then_resetsStack', () => {
    const harness = createHarness({
        snapshots: [{ id: 's1' }]
    });

    harness.manager.capture();
    harness.manager.clear();

    assert.equal(harness.manager.size(), 0, 'clear should empty stack');
    assert.equal(harness.manager.getIndex(), -1, 'index should reset to -1');
    assert.deepEqual(harness.stackMirrors.at(-1), { index: -1, stack: [] }, 'onStackChange should reflect cleared state');
});

test('HistoryManager_capture_when_captureStateThrows_then_warnsAndLeavesStackUntouched', () => {
    const harness = createHarness({
        maxSize: 2,
        snapshots: [{ id: 's1' }]
    });

    const firstSnapshot = harness.manager.capture();
    assert.deepEqual(firstSnapshot, { id: 's1' }, 'first capture should succeed with prepared snapshot');

    const result = harness.manager.capture();

    assert.equal(result, null, 'capture should return null when captureState throws');
    assert.equal(harness.manager.size(), 1, 'stack size should remain unchanged after failed capture');
    assert.equal(harness.manager.getIndex(), 0, 'index should continue to point at the last valid snapshot');
    assert.deepEqual(
        harness.stackMirrors.at(-1),
        { index: 0, stack: [{ id: 's1' }] },
        'onStackChange should not emit additional entries on failure'
    );

    const failureToast = harness.toastCalls.at(-1);
    assert.ok(failureToast, 'capture failure should emit a toast');
    assert.equal(failureToast.type, 'error', 'capture failure toast should be error typed');
    assert.match(failureToast.message, /history snapshot/i, 'toast message should mention history snapshot capture');

    const errorLogs = harness.logCalls.filter((entry) => entry.level === 'error');
    assert.ok(errorLogs.length >= 1, 'capture failure should log an error');
});

test('HistoryManager_undo_when_applyStateThrows_then_restoresIndexAndSignalsError', () => {
    const appliedRecords = [];
    const harness = createHarness({
        snapshots: [{ id: 's1' }, { id: 's2' }],
        applyState: (snapshot, meta) => {
            appliedRecords.push({ snapshot, meta });
            if (meta.action === 'undo') {
                throw new Error('undo failure');
            }
        }
    });

    harness.manager.capture();
    harness.manager.capture();

    const result = harness.manager.undo();

    assert.equal(result, false, 'undo should return false when applyState throws');
    assert.equal(harness.manager.getIndex(), 1, 'failed undo should restore index to latest snapshot');
    assert.deepEqual(
        harness.manager.peekStack(),
        [{ id: 's1' }, { id: 's2' }],
        'stack should remain intact after failed undo'
    );
    assert.deepEqual(
        harness.stackMirrors.at(-1),
        { index: 1, stack: [{ id: 's1' }, { id: 's2' }] },
        'onStackChange should not emit additional entry on failure'
    );

    const failureToast = harness.toastCalls.at(-1);
    assert.ok(failureToast, 'undo failure should emit a toast');
    assert.equal(failureToast.type, 'error', 'undo failure toast should be error typed');
    assert.match(failureToast.message, /undo/i, 'undo failure toast should reference undo');

    const errorLogs = harness.logCalls.filter((entry) => entry.level === 'error');
    assert.ok(errorLogs.length >= 1, 'undo failure should log an error');

    const attempt = harness.applyAttempts.at(-1);
    assert.deepEqual(attempt?.meta?.action, 'undo', 'applyState should have been attempted with undo metadata');
});

test('HistoryManager_redo_when_applyStateThrows_then_reversesIndexAndSignalsError', () => {
    const harness = createHarness({
        snapshots: [{ id: 's1' }, { id: 's2' }],
        applyState: (snapshot, meta) => {
            if (meta.action === 'redo') {
                throw new Error('redo failure');
            }
        }
    });

    harness.manager.capture();
    harness.manager.capture();

    const undoResult = harness.manager.undo();
    assert.equal(undoResult, true, 'setup undo should succeed to create redo opportunity');

    const redoResult = harness.manager.redo();

    assert.equal(redoResult, false, 'redo should return false when applyState throws');
    assert.equal(harness.manager.getIndex(), 0, 'failed redo should keep index at the previous state');
    assert.deepEqual(
        harness.manager.peekStack(),
        [{ id: 's1' }, { id: 's2' }],
        'stack should remain intact after failed redo'
    );
    assert.deepEqual(
        harness.stackMirrors.at(-1),
        { index: 0, stack: [{ id: 's1' }, { id: 's2' }] },
        'onStackChange should continue to reflect last successful state'
    );

    const failureToast = harness.toastCalls.at(-1);
    assert.ok(failureToast, 'redo failure should emit a toast');
    assert.equal(failureToast.type, 'error', 'redo failure toast should be error typed');
    assert.match(failureToast.message, /redo/i, 'redo failure toast should reference redo');

    const errorLogs = harness.logCalls.filter((entry) => entry.level === 'error');
    assert.ok(errorLogs.length >= 1, 'redo failure should log an error');

    const attempt = harness.applyAttempts.at(-1);
    assert.deepEqual(attempt?.meta?.action, 'redo', 'applyState should have been attempted with redo metadata');
});

test('HistoryManager_notify_when_onStackChangeThrows_then_logsErrorAndShowsToast', () => {
    let callCount = 0;
    const harness = createHarness({
        snapshots: [{ id: 's1' }],
        onStackChange: () => {
            callCount += 1;
            if (callCount === 2) {
                throw new Error('mirror failure');
            }
        }
    });

    const toastCountBefore = harness.toastCalls.length;
    const logCountBefore = harness.logCalls.length;

    const snapshot = harness.manager.capture();

    assert.deepEqual(snapshot, { id: 's1' }, 'capture should still return the snapshot');
    assert.equal(harness.manager.getIndex(), 0, 'index should advance to the captured snapshot');

    const toastCountAfter = harness.toastCalls.length;
    assert.equal(toastCountAfter, toastCountBefore + 1, 'failing onStackChange should emit an error toast');
    const lastToast = harness.toastCalls.at(-1);
    assert.equal(lastToast.type, 'error', 'toast type should be error');
    assert.match(lastToast.message, /History sync failed/i, 'toast should mention history sync failure');

    const errorLogs = harness.logCalls.slice(logCountBefore).filter((entry) => entry.level === 'error');
    assert.ok(errorLogs.length >= 1, 'failing onStackChange should log at least one error');
    const errorMessage = String(errorLogs.at(-1)?.args?.[0] ?? '');
    assert.match(errorMessage, /onStackChange/i, 'error log should reference onStackChange failure');

    const lastMirror = harness.stackMirrors.at(-1);
    assert.equal(lastMirror?.index, 0, 'stack mirror should reflect latest index even when observer fails');
    assert.deepEqual(lastMirror?.stack, [{ id: 's1' }], 'stack mirror should still receive cloned snapshot state');
});

test('HistoryManager_getCurrent_when_stackEmpty_then_returnsNull', () => {
    const harness = createHarness({
        snapshots: [{ id: 's1' }]
    });

    assert.equal(harness.manager.getCurrent(), null, 'empty stack should return null current snapshot');
    harness.manager.capture();
    harness.manager.clear();
    assert.equal(harness.manager.getCurrent(), null, 'cleared stack should return null current snapshot');
});

test('HistoryManager_getCurrent_when_snapshotPresent_then_returnsActiveSnapshot', () => {
    const harness = createHarness({
        snapshots: [{ id: 's1' }, { id: 's2' }]
    });

    harness.manager.capture();
    assert.deepEqual(harness.manager.getCurrent(), { id: 's1' }, 'should return initial snapshot');

    harness.manager.capture();
    assert.deepEqual(harness.manager.getCurrent(), { id: 's2' }, 'should return latest snapshot after capture');
});

test('HistoryManager_constructor_when_captureStateMissing_then_throws', () => {
    assert.throws(() => {
        // eslint-disable-next-line no-new
        new HistoryManager({
            maxSize: 3,
            // captureState omitted
            applyState: () => {}
        });
    }, /\[HistoryManager] captureState callback is required/, 'missing captureState should raise descriptive error');
});

test('HistoryManager_constructor_when_applyStateMissing_then_throws', () => {
    assert.throws(() => {
        // eslint-disable-next-line no-new
        new HistoryManager({
            maxSize: 3,
            captureState: () => ({})
            // applyState omitted
        });
    }, /\[HistoryManager] applyState callback is required/, 'missing applyState should raise descriptive error');
});

test('HistoryManager_constructor_when_maxSizeInvalid_then_throws', () => {
    assert.throws(() => {
        // eslint-disable-next-line no-new
        new HistoryManager({
            maxSize: 0,
            captureState: () => ({}),
            applyState: () => {}
        });
    }, /\[HistoryManager] maxSize must be a positive integer/, 'non-positive maxSize should be rejected');
});
