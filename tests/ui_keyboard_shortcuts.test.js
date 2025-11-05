// this_file: tests/ui_keyboard_shortcuts.test.js
import test from 'node:test';
import assert from 'node:assert/strict';

import { setupKeyboardShortcuts } from '../src/ui/KeyboardShortcuts.js';

function createEvent() {
    return {
        preventDefaultCalled: false,
        key: '',
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        preventDefault() {
            this.preventDefaultCalled = true;
        }
    };
}

test('KeyboardShortcuts_setup_when_called_then_attachesKeydownListener', () => {
    const listeners = [];
    setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => {
            listeners.push({ target, type, handler });
        },
        document: {
            createElement: () => ({ style: { display: 'none' } }),
            body: { appendChild: () => {} }
        },
        windowRef: {}
    });

    assert.equal(listeners.length, 1, 'should register a single keydown listener');
    assert.equal(listeners[0].type, 'keydown', 'listener should be attached to keydown');
    assert.equal(typeof listeners[0].handler, 'function', 'keydown handler should be a function');
});

test('KeyboardShortcuts_keydown_when_questionMark_then_togglesHelpOverlay', () => {
    const listeners = [];
    const overlay = { style: { display: 'none' } };
    const documentStub = {
        createElement: () => overlay,
        body: { appendChild: () => { overlay.appended = true; } }
    };

    setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => {
            listeners.push(handler);
        },
        document: documentStub,
        windowRef: {},
        logUI: { info: () => {} }
    });

    const handler = listeners[0];
    const event = createEvent();
    event.key = '?';
    handler(event);

    assert.equal(event.preventDefaultCalled, true, 'should prevent default for help toggle');
    assert.equal(overlay.style.display, 'block', 'overlay should become visible');
    assert.equal(overlay.appended, true, 'overlay should be appended to body');

    const event2 = createEvent();
    event2.key = '?';
    handler(event2);

    assert.equal(overlay.style.display, 'none', 'overlay should hide on second toggle');
});

test('KeyboardShortcuts_keydown_when_slashAlias_then_togglesHelpOverlay', () => {
    const listeners = [];
    const overlay = { style: { display: 'none' } };

    setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => listeners.push(handler),
        document: {
            createElement: () => overlay,
            body: { appendChild: () => {} }
        },
        windowRef: {},
        logUI: { info: () => {} }
    });

    const handler = listeners[0];
    const helpEvent = createEvent();
    helpEvent.key = '?';
    handler(helpEvent);
    assert.equal(overlay.style.display, 'block', 'overlay should be visible after initial toggle');

    const hideEvent = createEvent();
    hideEvent.key = '?';
    handler(hideEvent);
    assert.equal(overlay.style.display, 'none', 'overlay should hide before alias test');

    const slashEvent = createEvent();
    slashEvent.key = '/';
    handler(slashEvent);
    assert.equal(overlay.style.display, 'block', 'slash alias should reopen overlay');
});

test('KeyboardShortcuts_keydown_when_escapeDuringAnimation_then_cancelsAndToasts', () => {
    const listeners = [];
    const cameraAnimator = {
        isAnimating: true,
        cancel: () => {
            cameraAnimator.cancelled = true;
        }
    };
    const toasts = [];
    const logCamera = { info: (message) => { logCamera.messages = [...(logCamera.messages ?? []), message]; } };

    setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => { listeners.push(handler); },
        document: {
            createElement: () => ({ style: { display: 'none' } }),
            body: { appendChild: () => {} }
        },
        windowRef: {},
        cameraAnimator,
        showToast: (message, type) => toasts.push({ message, type }),
        logCamera
    });

    const handler = listeners[0];
    const event = createEvent();
    event.key = 'Escape';
    handler(event);

    assert.equal(cameraAnimator.cancelled, true, 'cancel should be invoked for running animation');
    assert.deepEqual(toasts[0], { message: 'Animation cancelled', type: 'info' }, 'should show cancellation toast');
    assert.ok(logCamera.messages?.some((msg) => msg.includes('Animation cancelled')), 'logCamera.info should record action');
});

test('KeyboardShortcuts_keydown_when_escapeWithOverlayVisible_then_hidesOverlay', () => {
    const listeners = [];
    const overlay = { style: { display: 'none' } };

    setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => listeners.push(handler),
        document: {
            createElement: () => overlay,
            body: { appendChild: () => {} }
        },
        windowRef: {}
    });

    const handler = listeners[0];
    const helpEvent = createEvent();
    helpEvent.key = '?';
    handler(helpEvent);
    assert.equal(overlay.style.display, 'block', 'overlay visible after toggle');

    const escEvent = createEvent();
    escEvent.key = 'Escape';
    handler(escEvent);
    assert.equal(overlay.style.display, 'none', 'overlay hidden after escape');
});

test('KeyboardShortcuts_keydown_when_shortcutsUsed_then_delegateToCallbacks', () => {
    const listeners = [];
    const calls = { exportPNG: 0, undo: 0, redo: 0 };

    setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => listeners.push(handler),
        document: {
            createElement: () => ({ style: { display: 'none' } }),
            body: { appendChild: () => {} }
        },
        windowRef: {},
        exportPNG: () => { calls.exportPNG += 1; },
        undo: () => { calls.undo += 1; },
        redo: () => { calls.redo += 1; }
    });

    const handler = listeners[0];

    const exportEvent = createEvent();
    exportEvent.key = 'e';
    exportEvent.ctrlKey = true;
    handler(exportEvent);

    const undoEvent = createEvent();
    undoEvent.key = 'z';
    undoEvent.ctrlKey = true;
    handler(undoEvent);

    const redoEvent = createEvent();
    redoEvent.key = 'z';
    redoEvent.ctrlKey = true;
    redoEvent.shiftKey = true;
    handler(redoEvent);

    assert.equal(calls.exportPNG, 1, 'export shortcut should trigger exportPNG');
    assert.equal(calls.undo, 1, 'undo shortcut should trigger undo');
    assert.equal(calls.redo, 1, 'redo shortcut should trigger redo');
});

test('KeyboardShortcuts_keydown_when_clearShortcutUsed_then_runsConfirmFlow', () => {
    const listeners = [];
    const clearCalls = [];
    let confirmMessage = null;

    setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => listeners.push(handler),
        document: {
            createElement: () => ({ style: { display: 'none' } }),
            body: { appendChild: () => {} }
        },
        windowRef: {},
        imageStack: [{}],
        confirm: (message) => {
            confirmMessage = message;
            return true;
        },
        clearAll: () => clearCalls.push('cleared'),
        logUI: { info: () => {} }
    });

    const handler = listeners[0];
    const event = createEvent();
    event.key = 'Delete';
    event.ctrlKey = true;
    handler(event);

    assert.ok(confirmMessage?.includes('Clear all images'), 'confirm should prompt about clearing all images');
    assert.equal(clearCalls.length, 1, 'clearAll should run when confirm passes');
});

test('KeyboardShortcuts_keydown_when_clearShortcutCancelled_then_skipsClear', () => {
    const listeners = [];
    const clearCalls = [];

    setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => listeners.push(handler),
        document: {
            createElement: () => ({ style: { display: 'none' } }),
            body: { appendChild: () => {} }
        },
        windowRef: {},
        imageStack: [{}],
        confirm: () => false,
        clearAll: () => clearCalls.push('cleared'),
        logUI: { info: () => {} }
    });

    const handler = listeners[0];
    const event = createEvent();
    event.key = 'Backspace';
    event.metaKey = true;
    handler(event);

    assert.equal(clearCalls.length, 0, 'clearAll should be skipped when confirm returns false');
});

test('KeyboardShortcuts_teardown_when_called_then_removesOverlay', () => {
    const listeners = [];
    let removed = false;

    const documentStub = {
        createElement: () => ({
            style: { display: 'none' },
            remove: () => {
                removed = true;
            }
        }),
        body: { appendChild: () => {} }
    };

    const instance = setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => listeners.push(handler),
        document: documentStub,
        windowRef: {}
    });

    const handler = listeners[0];
    const event = createEvent();
    event.key = '?';
    handler(event); // create overlay
    instance.teardown();

    assert.equal(removed, true, 'teardown should remove overlay element from DOM');
});

test('KeyboardShortcuts_teardown_when_called_then_removesListenerAndStopsShortcuts', () => {
    const documentStub = {
        createElement: () => ({ style: { display: 'none' } }),
        body: { appendChild: () => {} }
    };

    const windowStub = {
        listeners: [],
        addEventListener(type, handler) {
            this.listeners.push({ type, handler });
        },
        removeEventListener(type, handler) {
            this.listeners = this.listeners.filter(
                (entry) => entry.type !== type || entry.handler !== handler
            );
        },
        dispatch(type, event) {
            this.listeners
                .filter((entry) => entry.type === type)
                .forEach((entry) => entry.handler(event));
        }
    };

    const tracker = { exportPNG: 0 };

    const instance = setupKeyboardShortcuts({
        addTrackedEventListener: (target, type, handler) => target.addEventListener(type, handler),
        document: documentStub,
        windowRef: windowStub,
        exportPNG: () => {
            tracker.exportPNG += 1;
        }
    });

    const beforeEvent = createEvent();
    beforeEvent.key = 'e';
    beforeEvent.ctrlKey = true;
    windowStub.dispatch('keydown', beforeEvent);

    assert.equal(tracker.exportPNG, 1, 'shortcut should fire before teardown');

    instance.teardown();

    const afterEvent = createEvent();
    afterEvent.key = 'e';
    afterEvent.ctrlKey = true;
    windowStub.dispatch('keydown', afterEvent);

    assert.equal(tracker.exportPNG, 1, 'shortcut should not fire after teardown');
    assert.equal(windowStub.listeners.length, 0, 'keydown listener should be removed after teardown');
});
