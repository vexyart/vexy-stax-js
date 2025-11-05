// this_file: tests/memory_memory_monitor.test.js
/**
 * Test Suite: Memory - MemoryMonitor
 *
 * Purpose: Validates GPU memory estimation thresholds, toast/confirm flows,
 * FPS overlay updates, and cooldown behaviour now that monitoring logic is
 * extracted from src/main.js.
 *
 * Modules Tested:
 * - src/memory/MemoryMonitor.js (MemoryMonitor class)
 *
 * Test Count: 7 tests
 * @lastTested 2025-11-05 (Phase 5 Iteration 6)
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { MemoryMonitor } from '../src/memory/MemoryMonitor.js';

const MB = 1024 * 1024;

function createImageOfSizeMB(megabytes) {
    return {
        texture: {
            image: {
                width: 1024,
                height: megabytes * 256
            }
        }
    };
}

function createOverlay(initialHTML = 'FPS: 60') {
    return {
        innerHTML: initialHTML,
        isConnected: true,
        removed: false,
        remove() {
            this.removed = true;
        }
    };
}

function createMonitorContext(overrides = {}) {
    const calls = {
        info: [],
        warn: [],
        toast: [],
        confirm: [],
        warningTimestamp: null,
        overlayResolves: 0
    };

    let currentOverlay = overrides.overlay ?? null;

    const monitor = new MemoryMonitor({
        getImageStack: overrides.getImageStack ?? (() => overrides.stack ?? []),
        logMemory: overrides.logMemory ?? {
            info: (message) => calls.info.push(message),
            warn: (message) => calls.warn.push(message)
        },
        showToast: overrides.showToast ?? ((message, type, duration) => {
            calls.toast.push({ message, type, duration });
        }),
        confirm: overrides.confirm ?? ((message) => {
            calls.confirm.push(message);
            return overrides.confirmResult ?? true;
        }),
        now: overrides.now ?? (() => overrides.nowValue ?? 0),
        thresholds: overrides.thresholds ?? {
            warningMB: 100,
            criticalMB: 200,
            cooldownMs: 60000
        },
        toastDurations: overrides.toastDurations ?? {
            warningMs: 1500,
            errorMs: 2000
        },
        bytesPerMB: overrides.bytesPerMB ?? MB,
        isFPSEnabled: overrides.isFPSEnabled ?? (() => true),
        resolveOverlay: overrides.resolveOverlay ?? (() => {
            calls.overlayResolves += 1;
            return currentOverlay;
        }),
        isOverlayAttached: overrides.isOverlayAttached ?? ((element) => Boolean(element?.isConnected ?? element?.parentNode)),
        onWarningUpdate: overrides.onWarningUpdate ?? ((timestamp) => {
            calls.warningTimestamp = timestamp;
        }),
        initialWarningTimestamp: overrides.initialWarningTimestamp ?? 0
    });

    return {
        monitor,
        calls,
        setOverlay(element) {
            currentOverlay = element;
        }
    };
}

test('MemoryMonitor_checkMemoryUsage_when_belowWarning_then_returnsTrueWithoutToast', () => {
    const imageStack = [createImageOfSizeMB(10)];
    const { monitor, calls } = createMonitorContext({ stack: imageStack, isFPSEnabled: () => false });

    const result = monitor.checkMemoryUsage(false);

    assert.equal(result, true, 'usage below warning should allow continuation');
    assert.equal(calls.toast.length, 0, 'no toast expected below warning');
    assert.equal(calls.warn.length, 0, 'no warning log expected below threshold');
});

test('MemoryMonitor_checkMemoryUsage_when_warningCooldownAllows_then_warnsOnce', () => {
    let nowValue = 10_000;
    const imageStack = [createImageOfSizeMB(150)];
    const { monitor, calls } = createMonitorContext({
        stack: imageStack,
        now: () => nowValue,
        thresholds: { warningMB: 100, criticalMB: 300, cooldownMs: 5000 }
    });

    const firstResult = monitor.checkMemoryUsage(false);
    assert.equal(firstResult, true, 'warning threshold should not block flow');
    assert.equal(calls.toast.length, 1, 'warning toast should fire once initially');
    assert.equal(calls.toast[0].type, 'warning', 'warning toast must flag warning type');
    assert.equal(calls.warningTimestamp, 10_000, 'warning timestamp should persist initial now value');

    nowValue = 12_000; // still within cooldown window (difference 2,000)
    const secondResult = monitor.checkMemoryUsage(false);
    assert.equal(secondResult, true, 'cooldown should still allow continuation');
    assert.equal(calls.toast.length, 1, 'cooldown should suppress duplicate toasts');

    nowValue = 16_000; // beyond cooldown (difference 6,000)
    const thirdResult = monitor.checkMemoryUsage(false);
    assert.equal(thirdResult, true, 'post-cooldown should still allow continuation');
    assert.equal(calls.toast.length, 2, 'warning toast should fire again after cooldown');
    assert.equal(calls.warningTimestamp, 16_000, 'warning timestamp should update after cooldown');
});

test('MemoryMonitor_checkMemoryUsage_when_criticalAndAdding_then_usesConfirmResult', () => {
    const imageStack = [createImageOfSizeMB(400)];
    const { monitor, calls } = createMonitorContext({
        stack: imageStack,
        confirmResult: false,
        thresholds: { warningMB: 100, criticalMB: 200, cooldownMs: 5000 }
    });

    const result = monitor.checkMemoryUsage(true);

    assert.equal(result, false, 'confirm rejection should block load');
    assert.equal(calls.confirm.length, 1, 'confirm dialog should appear for critical add');
    assert.equal(calls.toast.length, 0, 'critical + adding should not show toast');
});

test('MemoryMonitor_checkMemoryUsage_when_criticalAndAdding_then_confirmationMessageIncludesUsageStats', () => {
    const imageStack = [createImageOfSizeMB(320)];
    let confirmMessage = '';
    const { monitor } = createMonitorContext({
        stack: imageStack,
        confirm: (message) => {
            confirmMessage = message;
            return true;
        },
        thresholds: { warningMB: 100, criticalMB: 200, cooldownMs: 5000 }
    });

    const result = monitor.checkMemoryUsage(true);

    assert.equal(result, true, 'confirm acceptance should allow continuation');
    assert.ok(confirmMessage.includes('Critical memory usage'), 'confirm message should describe critical usage');
    assert.match(confirmMessage, /320 MB/, 'confirm message should include rounded memory amount');
    assert.ok(confirmMessage.includes('Continue anyway?'), 'confirm prompt should ask the user to continue');
});

test('MemoryMonitor_checkMemoryUsage_when_criticalWithoutAdd_then_showsErrorToast', () => {
    const overlay = createOverlay();
    const imageStack = [createImageOfSizeMB(250)];
    const { monitor, calls } = createMonitorContext({
        stack: imageStack,
        confirm: () => {
            throw new Error('confirm should not be called when not adding');
        },
        toastDurations: { warningMs: 1000, errorMs: 4000 },
        thresholds: { warningMB: 100, criticalMB: 200, cooldownMs: 5000 },
        overlay,
        resolveOverlay: () => overlay
    });

    const result = monitor.checkMemoryUsage(false);

    assert.equal(result, true, 'critical without add should continue after toast');
    assert.equal(calls.toast.length, 1, 'error toast should display');
    assert.equal(calls.toast[0].type, 'error', 'toast should be error typed');
    assert.equal(calls.toast[0].duration, 4000, 'toast should reuse provided error duration');
});

test('MemoryMonitor_checkMemoryUsage_when_overlayDetached_then_reacquiresBeforeUpdating', () => {
    const staleOverlay = createOverlay('FPS: 60<br><small data-fps-memory="true">Old</small>');
    staleOverlay.isConnected = false;
    const freshOverlay = createOverlay('FPS: 60');

    const imageStack = [createImageOfSizeMB(42)];
    const { monitor, calls } = createMonitorContext({
        stack: imageStack,
        isFPSEnabled: () => true,
        resolveOverlay: () => {
            calls.overlayResolves += 1;
            return staleOverlay.isConnected ? staleOverlay : freshOverlay;
        },
        isOverlayAttached: (element) => Boolean(element?.isConnected),
        overlay: staleOverlay
    });

    // First call sees stale overlay, should fetch replacement before writing.
    const result = monitor.checkMemoryUsage(false);
    assert.equal(result, true, 'overlay refresh should not affect continuation');
    assert.equal(calls.overlayResolves >= 1, true, 'overlay resolver should be invoked');
    const overlayHTML = monitor.overlayElement?.innerHTML ?? '';
    assert.ok(
        /data-fps-memory="true"[^>]*>\d+MB/.test(overlayHTML),
        'memory overlay should be appended to fresh element'
    );
});

test('MemoryMonitor_invalidateOverlay_when_called_then_forcesOverlayResolverOnNextCheck', () => {
    const overlayA = createOverlay('FPS: 60');
    const overlayB = createOverlay('FPS: 60');
    const imageStack = [createImageOfSizeMB(42)];
    const { monitor, calls, setOverlay } = createMonitorContext({
        stack: imageStack,
        isFPSEnabled: () => true,
        overlay: overlayA
    });

    // Prime cache with overlay A
    const firstResult = monitor.checkMemoryUsage(false);
    assert.equal(firstResult, true, 'initial overlay update should not block continuation');
    assert.equal(calls.overlayResolves, 1, 'resolver should execute on first update');
    assert.equal(monitor.overlayElement, overlayA, 'overlay cache should store first resolved element');

    // Swap overlay without invalidating – resolver should not run because element remains attached
    setOverlay(overlayB);
    monitor.checkMemoryUsage(false);
    assert.equal(calls.overlayResolves, 1, 'resolver should skip when cached overlay still attached');
    assert.equal(monitor.overlayElement, overlayA, 'cached overlay should remain until explicitly invalidated');

    // Force cache reset and ensure resolver executes for new overlay
    monitor.invalidateOverlay();
    const thirdResult = monitor.checkMemoryUsage(false);
    assert.equal(thirdResult, true, 'invalidateOverlay should not block continuation');
    assert.equal(calls.overlayResolves, 2, 'resolver should run again after invalidation');
    assert.equal(monitor.overlayElement, overlayB, 'overlay cache should swap to the new element');
    assert.match(
        overlayB.innerHTML,
        /data-fps-memory="true"/,
        'new overlay should receive memory stats markup'
    );
});
