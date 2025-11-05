// this_file: tests/settings_settings_manager.test.js
/**
 * Test Suite: Settings - SettingsManager
 *
 * Purpose: Covers persistence flows extracted from src/main.js including
 * storage availability checks, quota handling, and reset logic.
 *
 * Modules Tested:
 * - src/settings/SettingsManager.js (createSettingsManager)
 *
 * Test Count: 5 tests
 * @lastTested 2025-11-05 (Phase 5 Iteration 3)
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { createSettingsManager } from '../src/settings/SettingsManager.js';

function createLoggerRecorder() {
    const calls = [];
    const makeRecorder = (level) => (...args) => {
        calls.push({ level, args });
    };

    return {
        logger: {
            info: makeRecorder('info'),
            warn: makeRecorder('warn'),
            error: makeRecorder('error')
        },
        calls
    };
}

function defaultParams() {
    return {
        cameraMode: 'perspective',
        cameraFOV: 40,
        cameraZoom: 1,
        bgColor: '#222222',
        transparentBg: false,
        zSpacing: 120
    };
}

function createManager(overrides = {}) {
    const params = overrides.params ?? defaultParams();
    const { logger, calls: logCalls } = overrides.loggerRecorder ?? createLoggerRecorder();

    const context = {
        params,
        logCalls,
        storage: Object.prototype.hasOwnProperty.call(overrides, 'storage')
            ? overrides.storage
            : {
                  getItem: () => null,
                  setItem: () => {}
              },
        confirmCalls: [],
        alertCalls: [],
        refreshCalls: 0,
        switchCalls: [],
        zoomCalls: [],
        backgroundCalls: 0,
        reflectionCalls: 0
    };

    const manager = createSettingsManager({
        params,
        storage: context.storage,
        logger,
        confirm: overrides.confirm ?? ((message) => {
            context.confirmCalls.push(message);
            return true;
        }),
        alert: overrides.alert ?? ((message) => {
            context.alertCalls.push(message);
        }),
        refreshPane: overrides.refreshPane ?? (() => {
            context.refreshCalls += 1;
        }),
        switchCameraMode: overrides.switchCameraMode ?? ((mode) => {
            context.switchCalls.push(mode);
        }),
        updateZoom: overrides.updateZoom ?? ((zoom) => {
            context.zoomCalls.push(zoom);
        }),
        updateBackground: overrides.updateBackground ?? (() => {
            context.backgroundCalls += 1;
        }),
        updateReflectionSettings: overrides.updateReflectionSettings ?? (() => {
            context.reflectionCalls += 1;
        }),
        defaults: overrides.defaults ?? {
            cameraMode: 'perspective',
            cameraFOV: 50,
            cameraZoom: 1,
            bgColor: '#000000',
            transparentBg: false,
            zSpacing: 100
        }
    });

    return { manager, context };
}

test('createSettingsManager_loadSettings_when_storageUnavailable_then_returnsFalse', () => {
    const { manager, context } = createManager({ storage: null });

    const result = manager.loadSettings();

    assert.equal(result, false, 'loadSettings should return false when storage missing');
    assert.equal(context.logCalls.some((entry) => entry.level === 'warn'), true, 'warn log should record missing storage');
});

test('createSettingsManager_loadSettings_when_snapshotValid_then_updatesParams', () => {
    const params = defaultParams();
    const snapshot = {
        cameraMode: 'telephoto',
        cameraFOV: 25,
        cameraZoom: 1.5,
        bgColor: '#abcdef',
        transparentBg: true,
        zSpacing: 180
    };

    const storage = {
        getItem: () => JSON.stringify(snapshot),
        setItem: () => {}
    };

    const { manager, context } = createManager({ params, storage });

    const result = manager.loadSettings();

    assert.equal(result, true, 'loadSettings should succeed with snapshot');
    assert.deepEqual(params, snapshot, 'params should adopt saved snapshot values');
    assert.equal(context.logCalls.some((entry) => entry.level === 'info'), true, 'info log should record successful load');
});

test('createSettingsManager_saveSettings_when_quotaExceededAndUserClears_then_retriesAndAlerts', () => {
    const params = defaultParams();
    let firstAttempt = true;
    const storage = {
        getItem: () => null,
        setItem: () => {
            if (firstAttempt) {
                firstAttempt = false;
                const error = new Error('quota');
                error.name = 'QuotaExceededError';
                throw error;
            }
        },
        removeItem: () => {
            storage.removeCalls = (storage.removeCalls ?? 0) + 1;
        }
    };

    const { manager, context } = createManager({
        params,
        storage,
        confirm: () => true
    });

    manager.saveSettings();

    assert.equal(storage.removeCalls, 1, 'storage should be cleared once after quota error');
    assert.equal(context.alertCalls.length, 1, 'user should be notified on successful retry');
    assert.equal(context.logCalls.filter((entry) => entry.level === 'info').length >= 2, true, 'info logs should capture retry flow');
});

test('createSettingsManager_saveSettings_when_userDeclinesClear_then_logsWarning', () => {
    const params = defaultParams();
    const storage = {
        getItem: () => null,
        setItem: () => {
            const error = new Error('quota');
            error.name = 'QuotaExceededError';
            throw error;
        }
    };

    const { manager, context } = createManager({
        params,
        storage,
        confirm: () => false
    });

    manager.saveSettings();

    assert.equal(context.alertCalls.length, 0, 'no alert should show when user declines');
    assert.equal(context.logCalls.some((entry) => entry.level === 'warn'), true, 'warn log should record user decline');
});

test('createSettingsManager_resetSettings_when_called_then_restoresDefaultsAndUpdatesScene', () => {
    const params = defaultParams();
    const storage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {
            storage.removed = true;
        }
    };

    const { manager, context } = createManager({ params, storage });

    manager.resetSettings();

    assert.deepEqual(
        params,
        {
            cameraMode: 'perspective',
            cameraFOV: 50,
            cameraZoom: 1,
            bgColor: '#000000',
            transparentBg: false,
            zSpacing: 100
        },
        'params should revert to defaults'
    );
    assert.equal(context.refreshCalls, 1, 'pane.refresh should be invoked');
    assert.deepEqual(context.switchCalls, ['perspective'], 'camera mode reset should invoke switchCameraMode');
    assert.deepEqual(context.zoomCalls, [1], 'reset should update zoom');
    assert.equal(context.backgroundCalls, 1, 'background update should run');
    assert.equal(context.reflectionCalls, 1, 'reflection settings should refresh');
    assert.equal(storage.removed, true, 'storage should clear saved settings');
});
