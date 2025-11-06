// this_file: tests/files_texture_loader.test.js
/**
 * Test Suite: Files - RetryingTextureLoader
 *
 * Purpose: Ensures retry scheduling, logging, success callbacks, and failure
 * toasts for the texture loader abstraction extracted from src/main.js.
 *
 * Modules Tested:
 * - src/files/TextureLoader.js (RetryingTextureLoader)
 *
 * Test Count: 8 tests
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { RetryingTextureLoader } from '../src/files/TextureLoader.js';

function createHarness(overrides = {}) {
    const attempts = [];
    const scheduleCalls = [];
    const toasts = [];
    const infoLogs = [];
    const warnLogs = [];
    const errorLogs = [];
    const textures = [];

    let currentAttempt = 0;
    const failureSet = new Set(overrides.failures ?? []);

    const loader = new RetryingTextureLoader({
        createLoader: () => ({
            load: (_dataURL, onLoad, _onProgress, onError) => {
                const attemptNumber = currentAttempt;
                attempts.push(attemptNumber);
                currentAttempt += 1;

                if (failureSet.has(attemptNumber)) {
                    onError(new Error(`failure-${attemptNumber}`));
                } else {
                    onLoad({ id: `texture-${attemptNumber}` });
                }
            }
        }),
        maxRetries: overrides.maxRetries ?? 2,
        retryDelays: overrides.retryDelays ?? [10, 20],
        scheduleRetry: (callback, delay) => {
            scheduleCalls.push({ delay });
            callback();
        },
        onTextureLoaded: (texture, meta) => {
            textures.push({ texture, meta });
        },
        logRetry: {
            info: (message) => infoLogs.push(message),
            warn: (message, error) => warnLogs.push({ message, error }),
            error: (message, error) => errorLogs.push({ message, error })
        },
        showToast: (message, type, duration) => {
            toasts.push({ message, type, duration });
        },
        toastDurationError: overrides.toastDurationError ?? 1500
    });

    return {
        loader,
        attempts,
        scheduleCalls,
        toasts,
        infoLogs,
        warnLogs,
        errorLogs,
        textures
    };
}

test('RetryingTextureLoader_load_when_succeedsFirstAttempt_then_callsOnTextureLoadedOnce', () => {
    const harness = createHarness({ failures: [] });

    harness.loader.load('data:image/png;base64,AA==', 'slide.png');

    assert.deepEqual(harness.attempts, [0], 'should attempt to load exactly once');
    assert.equal(harness.scheduleCalls.length, 0, 'no retries should be scheduled on first-attempt success');
    assert.equal(harness.warnLogs.length, 0, 'no warnings expected on success');
    assert.equal(harness.toasts.length, 0, 'no toast should be displayed on success');
    assert.equal(harness.textures.length, 1, 'success callback should receive one texture');
    assert.equal(harness.textures[0].meta.attempt, 0, 'meta should record initial attempt index');
});

test('RetryingTextureLoader_load_when_retrySucceeds_then_logsRetryAndSchedulesDelay', () => {
    const harness = createHarness({
        failures: [0],
        retryDelays: [25, 50]
    });

    harness.loader.load('data:image/png;base64,BB==', 'poster.png');

    assert.deepEqual(harness.attempts, [0, 1], 'two attempts expected when first fails');
    assert.equal(harness.scheduleCalls.length, 1, 'one retry should be scheduled');
    assert.equal(harness.scheduleCalls[0].delay, 25, 'retry should use first configured delay');
    assert.equal(harness.warnLogs.length, 1, 'failed attempt should log warning');
    assert.equal(harness.infoLogs.length, 1, 'successful retry should log info');
    assert.equal(harness.errorLogs.length, 0, 'successful retry should not log errors');
    assert.equal(harness.toasts.length, 0, 'successful retry should not emit toast');
    assert.equal(harness.textures.length, 1, 'success callback should fire once');
    assert.equal(harness.textures[0].meta.attempt, 1, 'meta should reflect retry attempt index');
});

test('RetryingTextureLoader_load_when_allAttemptsFail_then_emitsErrorToast', () => {
    const harness = createHarness({
        failures: [0, 1, 2],
        maxRetries: 2,
        retryDelays: [15],
        toastDurationError: 2300
    });

    harness.loader.load('data:image/png;base64,CC==', 'cover.png');

    assert.deepEqual(harness.attempts, [0, 1, 2], 'should exhaust all attempts');
    assert.equal(harness.scheduleCalls.length, 2, 'each failure before the last should schedule retry');
    assert.equal(harness.warnLogs.length, 2, 'retryable failures should log warnings');
    assert.equal(harness.errorLogs.length, 1, 'final failure should log error');
    assert.equal(harness.infoLogs.length, 0, 'no success info logs expected when final failure');
    assert.equal(harness.toasts.length, 1, 'final failure should emit error toast');
    assert.equal(harness.toasts[0].type, 'error', 'toast type should be error');
    assert.match(harness.toasts[0].message, /Failed to load: cover\.png/, 'toast should reference filename');
    assert.equal(harness.toasts[0].duration, 2300, 'toast should respect injected duration');
    assert.equal(harness.textures.length, 0, 'success callback must not fire on failure');
});

test('RetryingTextureLoader_constructor_when_retryDelaysContainInvalidEntries_then_throws', () => {
    assert.throws(() => {
        // eslint-disable-next-line no-new
        new RetryingTextureLoader({
            createLoader: () => ({
                load: () => {}
            }),
            maxRetries: 1,
            retryDelays: [10, -5]
        });
    }, /retryDelays must contain non-negative numbers/, 'constructor should reject negative delay values');
});

test('RetryingTextureLoader_load_when_delayListShorterThanRetries_then_reusesFinalDelay', () => {
    const harness = createHarness({
        failures: [0, 1, 2],
        maxRetries: 3,
        retryDelays: [50]
    });

    harness.loader.load('data:image/png;base64,DD==', 'poster-wide.png');

    assert.deepEqual(harness.scheduleCalls.map((call) => call.delay), [50, 50, 50], 'each retry should reuse final delay value');
    assert.equal(harness.attempts.length, 4, 'should attempt initial load plus three retries');
    assert.equal(harness.textures.length, 1, 'final attempt should succeed');
    assert.equal(harness.textures[0].meta.attempt, 3, 'meta should reflect final retry attempt index');
});

test('RetryingTextureLoader_load_when_retryDelaysMissing_then_retriesImmediately', () => {
    const harness = createHarness({
        failures: [0, 1],
        maxRetries: 2,
        retryDelays: []
    });

    harness.loader.load('data:image/png;base64,FF==', 'instant.png');

    assert.deepEqual(harness.attempts, [0, 1, 2], 'loader should attempt initial load plus configured retries');
    assert.deepEqual(
        harness.scheduleCalls.map((call) => call.delay),
        [0, 0],
        'retries should default to zero-delay when no retryDelays provided'
    );
    assert.equal(harness.textures.length, 1, 'final retry should succeed and invoke success callback once');
    assert.equal(harness.textures[0].meta.attempt, 2, 'meta should reflect final retry index');
});

test('RetryingTextureLoader_load_when_loaderMissingLoad_then_logsErrorAndShowsToast', () => {
    const errorLogs = [];
    const toastCalls = [];

    const loader = new RetryingTextureLoader({
        createLoader: () => ({}),
        maxRetries: 1,
        retryDelays: [],
        onTextureLoaded: () => {
            throw new Error('should not trigger success callback');
        },
        logRetry: {
            info: () => {
                throw new Error('info log should not fire');
            },
            warn: () => {
                throw new Error('warn log should not fire');
            },
            error: (message, error) => {
                errorLogs.push({ message, error });
            }
        },
        showToast: (message, type, duration) => {
            toastCalls.push({ message, type, duration });
        },
        toastDurationError: 2100
    });

    assert.doesNotThrow(() => loader.load('data:image/png;base64,EE==', 'broken.png'), 'loader without load should not crash');
    assert.equal(errorLogs.length, 1, 'should log one error message');
    assert.match(errorLogs[0].message, /missing load\(\)/i, 'error message should mention missing load method');
    assert.equal(toastCalls.length, 1, 'should emit a single error toast');
    assert.equal(toastCalls[0].type, 'error', 'toast type should be error');
    assert.match(toastCalls[0].message, /Failed to load: broken\.png/, 'toast should reference the filename');
    assert.equal(toastCalls[0].duration, 2100, 'toast should honour injected duration');
});

test('RetryingTextureLoader_constructor_when_scheduleRetryInvalid_then_throws', () => {
    assert.throws(() => {
        // eslint-disable-next-line no-new
        new RetryingTextureLoader({
            createLoader: () => ({
                load: () => {}
            }),
            maxRetries: 1,
            retryDelays: [],
            scheduleRetry: 'invalid'
        });
    }, /\[RetryingTextureLoader] scheduleRetry must be a function/, 'constructor should reject non-function scheduleRetry values');
});
