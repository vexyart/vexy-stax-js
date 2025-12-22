// this_file: tests/ui_toast_service.test.js
/**
 * Test Suite: UI - ToastService
 *
 * Purpose: Ensures toast notifications render with expected styling,
 * scheduling, and fallbacks once extracted from src/main.js.
 *
 * Modules Tested:
 * - src/ui/ToastService.js (createToastService)
 *
 * Test Count: 6 tests
 * @lastTested 2025-12-21 (Added ARIA accessibility tests)
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { createToastService } from '../src/ui/ToastService.js';

function createFakeDocument() {
    const appended = [];

    return {
        appended,
        body: {
            appendChild: (element) => {
                appended.push(element);
                element.parentNode = {
                    removeChild: (child) => {
                        const index = appended.indexOf(child);
                        if (index !== -1) {
                            appended.splice(index, 1);
                        }
                    }
                };
            }
        },
        createElement: () => {
            const element = {
                style: {
                    cssText: '',
                    animation: ''
                },
                textContent: '',
                removed: false,
                _attributes: {},
                setAttribute(name, value) {
                    this._attributes[name] = value;
                },
                getAttribute(name) {
                    return this._attributes[name];
                },
                remove() {
                    this.removed = true;
                }
            };
            return element;
        }
    };
}

function createTimerHarness() {
    const timers = [];
    const setTimeoutFn = (fn, delay) => {
        timers.push({ fn, delay });
        return timers.length - 1;
    };
    return { timers, setTimeoutFn };
}

test('createToastService_when_documentMissing_then_noop', () => {
    const service = createToastService({ documentRef: null });

    assert.doesNotThrow(() => {
        service('Hello');
    }, 'service should no-op when document unavailable');
});

test('createToastService_showToast_when_success_then_configuresElementAndRemoval', () => {
    const fakeDocument = createFakeDocument();
    const { timers, setTimeoutFn } = createTimerHarness();

    const service = createToastService({
        documentRef: fakeDocument,
        setTimeoutFn,
        fadeDuration: 150,
        zIndex: 9000
    });

    service('Saved!', 'success', 400);

    assert.equal(fakeDocument.appended.length, 1, 'toast should be appended to document body');
    const toast = fakeDocument.appended[0];
    assert.ok(toast.style.cssText.includes('position: fixed'), 'toast style should fix element');
    assert.ok(toast.style.cssText.includes('z-index: 9000'), 'toast style should apply injected z-index');
    assert.equal(toast.textContent, '✓ Saved!', 'toast text should include icon prefix');

    assert.equal(timers.length, 1, 'initial call should schedule primary timer');
    assert.equal(timers[0].delay, 400, 'primary timer should honour provided duration');

    timers[0].fn();
    assert.equal(timers.length, 2, 'executing primary timer should schedule removal timer');
    assert.equal(timers[1].delay, 150, 'secondary timer should use fade duration');
    assert.equal(toast.style.animation, 'slideOut 0.3s ease-in', 'toast should animate on dismiss');

    timers[1].fn();
    assert.equal(toast.removed, true, 'toast should remove itself after fade');
});

test('createToastService_showToast_when_warningUsesDefaultDuration_then_colorsAndTimersMatch', () => {
    const fakeDocument = createFakeDocument();
    const { timers, setTimeoutFn } = createTimerHarness();

    const service = createToastService({
        documentRef: fakeDocument,
        setTimeoutFn,
        defaultDuration: 600
    });

    service('Heads up', 'warning');

    assert.equal(fakeDocument.appended.length, 1, 'toast should append once');
    const toast = fakeDocument.appended[0];
    assert.equal(toast.style.background, 'rgba(255, 193, 7, 0.95)', 'warning toast should use warning background');
    assert.equal(toast.style.color, 'black', 'warning toast should use provided text colour');
    assert.equal(timers[0].delay, 600, 'default duration should drive hide timer');
});

test('createToastService_showToast_when_error_then_ariaAlertRole', () => {
    const fakeDocument = createFakeDocument();
    const { setTimeoutFn } = createTimerHarness();

    const service = createToastService({
        documentRef: fakeDocument,
        setTimeoutFn
    });

    service('Something went wrong', 'error');

    const toast = fakeDocument.appended[0];
    assert.equal(toast.getAttribute('role'), 'alert', 'error toast should have role="alert"');
    assert.equal(toast.getAttribute('aria-live'), 'assertive', 'error toast should be assertive');
});

test('createToastService_showToast_when_success_then_ariaStatusRole', () => {
    const fakeDocument = createFakeDocument();
    const { setTimeoutFn } = createTimerHarness();

    const service = createToastService({
        documentRef: fakeDocument,
        setTimeoutFn
    });

    service('Saved successfully', 'success');

    const toast = fakeDocument.appended[0];
    assert.equal(toast.getAttribute('role'), 'status', 'success toast should have role="status"');
    assert.equal(toast.getAttribute('aria-live'), 'polite', 'success toast should be polite');
});

test('createToastService_showToast_when_info_then_ariaStatusRole', () => {
    const fakeDocument = createFakeDocument();
    const { setTimeoutFn } = createTimerHarness();

    const service = createToastService({
        documentRef: fakeDocument,
        setTimeoutFn
    });

    service('Just FYI', 'info');

    const toast = fakeDocument.appended[0];
    assert.equal(toast.getAttribute('role'), 'status', 'info toast should have role="status"');
    assert.equal(toast.getAttribute('aria-live'), 'polite', 'info toast should be polite');
});

test('createToastService_showToast_when_anyType_then_includesIconPrefix', () => {
    const fakeDocument = createFakeDocument();
    const { setTimeoutFn } = createTimerHarness();

    const service = createToastService({
        documentRef: fakeDocument,
        setTimeoutFn
    });

    // Test all four types have icons (WCAG: don't rely on color alone)
    const types = [
        { type: 'success', icon: '✓' },
        { type: 'error', icon: '✕' },
        { type: 'warning', icon: '⚠' },
        { type: 'info', icon: 'ℹ' }
    ];

    types.forEach(({ type, icon }) => {
        fakeDocument.appended.length = 0; // Reset
        service('Test message', type);
        const toast = fakeDocument.appended[0];
        assert.ok(
            toast.textContent.startsWith(icon),
            `${type} toast should start with ${icon} icon`
        );
    });
});
