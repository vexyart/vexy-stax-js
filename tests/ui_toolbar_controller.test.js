// this_file: tests/ui_toolbar_controller.test.js

import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { ToolbarController } from '../src/ui/ToolbarController.js';

// Mock DOM
global.document = {
    getElementById: () => null
};

describe('ToolbarController', () => {
    let controller;
    const mockOnUndo = mock.fn(() => {});
    const mockOnRedo = mock.fn(() => {});
    const mockOnResetCamera = mock.fn(() => {});
    const mockOnToggleHelp = mock.fn(() => {});
    const mockShowToast = mock.fn(() => {});

    beforeEach(() => {
        mockOnUndo.mock.resetCalls();
        mockOnRedo.mock.resetCalls();
        mockOnResetCamera.mock.resetCalls();
        mockOnToggleHelp.mock.resetCalls();
        mockShowToast.mock.resetCalls();
        global.document.getElementById = () => null;
    });

    it('constructor should throw without onUndo', () => {
        assert.throws(
            () => new ToolbarController({ onRedo: () => {} }),
            /onUndo callback is required/
        );
    });

    it('constructor should throw without onRedo', () => {
        assert.throws(
            () => new ToolbarController({ onUndo: () => {} }),
            /onRedo callback is required/
        );
    });

    it('constructor should accept minimal options', () => {
        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo
        });
        assert.strictEqual(typeof controller.onUndo, 'function');
        assert.strictEqual(typeof controller.onRedo, 'function');
    });

    it('constructor should accept all options', () => {
        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo,
            onResetCamera: mockOnResetCamera,
            onToggleHelp: mockOnToggleHelp,
            showToast: mockShowToast
        });
        assert.strictEqual(controller.onResetCamera, mockOnResetCamera);
        assert.strictEqual(controller.onToggleHelp, mockOnToggleHelp);
    });

    it('setup should handle missing DOM elements gracefully', () => {
        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo
        });

        // No DOM elements exist
        assert.doesNotThrow(() => controller.setup());
        assert.strictEqual(controller.isInitialized(), true);
    });

    it('setup should attach click handlers to buttons', () => {
        const clickHandlers = {};
        const mockButton = {
            addEventListener: (event, handler) => {
                clickHandlers[event] = handler;
            }
        };

        global.document.getElementById = (id) => {
            if (id === 'btn-undo' || id === 'btn-redo') return mockButton;
            return null;
        };

        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo
        });

        controller.setup();

        // Simulate click
        clickHandlers['click']();
        // onUndo should have been called (second button overrides first in this mock)
        assert.ok(mockOnRedo.mock.calls.length > 0 || mockOnUndo.mock.calls.length > 0);

        global.document.getElementById = () => null;
    });

    it('setup should use addTrackedEventListener when provided', () => {
        let trackedCalls = 0;
        const mockTracker = (el, evt, fn) => {
            trackedCalls++;
            el.addEventListener(evt, fn);
        };

        const mockButton = { addEventListener: () => {} };
        global.document.getElementById = () => mockButton;

        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo,
            addTrackedEventListener: mockTracker
        });

        controller.setup();
        assert.ok(trackedCalls > 0);

        global.document.getElementById = () => null;
    });

    it('setup should not reinitialize if already initialized', () => {
        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo
        });

        controller.setup();
        assert.strictEqual(controller.isInitialized(), true);

        // Second call should be no-op
        controller.setup();
        assert.strictEqual(controller.isInitialized(), true);
    });

    it('isInitialized should return false initially', () => {
        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo
        });
        assert.strictEqual(controller.isInitialized(), false);
    });

    it('dispose should reset initialized state', () => {
        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo
        });

        controller.setup();
        assert.strictEqual(controller.isInitialized(), true);

        controller.dispose();
        assert.strictEqual(controller.isInitialized(), false);
    });

    it('reset camera button should call showToast after callback', () => {
        const clickHandlers = {};
        const mockButton = {
            addEventListener: (event, handler) => {
                clickHandlers[event] = handler;
            }
        };

        global.document.getElementById = (id) => {
            if (id === 'btn-reset-camera') return mockButton;
            return null;
        };

        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo,
            onResetCamera: mockOnResetCamera,
            showToast: mockShowToast
        });

        controller.setup();

        // Simulate click on reset camera
        clickHandlers['click']();

        assert.strictEqual(mockOnResetCamera.mock.calls.length, 1);
        assert.strictEqual(mockShowToast.mock.calls.length, 1);
        assert.strictEqual(mockShowToast.mock.calls[0].arguments[0], 'Camera reset to fit');

        global.document.getElementById = () => null;
    });

    it('default showToast should be no-op', () => {
        controller = new ToolbarController({
            onUndo: mockOnUndo,
            onRedo: mockOnRedo
        });

        // Should not throw
        assert.doesNotThrow(() => controller.showToast('test', 'info'));
    });
});
