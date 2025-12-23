// this_file: tests/automation_debug_api.test.js

import { describe, it, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert';
import { DebugAPI } from '../src/automation/DebugAPI.js';

describe('DebugAPI', () => {
    let debugAPI;
    let mockCallbacks;
    let mockManagers;
    let mockImageStack;
    let mockParams;

    beforeEach(() => {
        // Clean up any existing window.vexyStax
        delete globalThis.window;
        globalThis.window = {};

        mockImageStack = [];
        mockParams = {
            cameraMode: 'perspective',
            cameraFOV: 60,
            cameraZoom: 1,
            bgColor: '#ffffff',
            zSpacing: 100
        };

        mockCallbacks = {
            exportPNG: mock.fn(),
            clearAll: mock.fn(),
            loadSettings: mock.fn(() => ({ loaded: true })),
            saveSettings: mock.fn(),
            resetSettings: mock.fn(),
            undo: mock.fn(),
            redo: mock.fn(),
            toggleAmbience: mock.fn()
        };

        mockManagers = {
            renderLoop: {
                getFPSStats: mock.fn(() => ({ average: 60 })),
                showFPS: mock.fn()
            },
            memoryMonitor: {
                invalidateOverlay: mock.fn()
            },
            cameraAnimator: {
                playHeroShot: mock.fn(() => Promise.resolve()),
                cancel: mock.fn()
            },
            historyManager: {
                getCurrentIndex: mock.fn(() => 2),
                getStackSize: mock.fn(() => 5)
            }
        };

        debugAPI = new DebugAPI({
            imageStack: mockImageStack,
            params: mockParams,
            scene: null,
            camera: null,
            controls: null,
            managers: mockManagers,
            callbacks: mockCallbacks
        });
    });

    afterEach(() => {
        debugAPI?.dispose();
        delete globalThis.window;
    });

    describe('constructor', () => {
        it('DebugAPI_constructor_when_created_then_storesReferences', () => {
            assert.strictEqual(debugAPI.imageStack, mockImageStack);
            assert.strictEqual(debugAPI.params, mockParams);
        });

        it('DebugAPI_constructor_when_noOptions_then_usesDefaults', () => {
            const api = new DebugAPI({});
            assert.deepStrictEqual(api.imageStack, []);
            assert.deepStrictEqual(api.params, {});
        });
    });

    describe('expose', () => {
        it('DebugAPI_expose_when_called_then_createsWindowVexyStax', () => {
            debugAPI.expose();
            assert.ok(window.vexyStax, 'window.vexyStax should exist');
        });

        it('DebugAPI_expose_when_called_then_exposesCoreAPIMethods', () => {
            debugAPI.expose();
            assert.strictEqual(typeof window.vexyStax.exportPNG, 'function');
            assert.strictEqual(typeof window.vexyStax.clearAll, 'function');
            assert.strictEqual(typeof window.vexyStax.getImageStack, 'function');
            assert.strictEqual(typeof window.vexyStax.undo, 'function');
            assert.strictEqual(typeof window.vexyStax.redo, 'function');
            assert.strictEqual(typeof window.vexyStax.help, 'function');
        });
    });

    describe('exportPNG', () => {
        it('DebugAPI_exportPNG_when_called_then_invokesCallback', () => {
            debugAPI.expose();
            window.vexyStax.exportPNG(2);
            assert.strictEqual(mockCallbacks.exportPNG.mock.callCount(), 1);
            assert.deepStrictEqual(mockCallbacks.exportPNG.mock.calls[0].arguments, [2]);
        });

        it('DebugAPI_exportPNG_when_noScale_then_defaults1x', () => {
            debugAPI.expose();
            window.vexyStax.exportPNG();
            assert.deepStrictEqual(mockCallbacks.exportPNG.mock.calls[0].arguments, [1]);
        });
    });

    describe('clearAll', () => {
        it('DebugAPI_clearAll_when_called_then_invokesCallback', () => {
            debugAPI.expose();
            window.vexyStax.clearAll();
            assert.strictEqual(mockCallbacks.clearAll.mock.callCount(), 1);
        });
    });

    describe('getImageStack', () => {
        it('DebugAPI_getImageStack_when_empty_then_returnsEmptyArray', () => {
            debugAPI.expose();
            const result = window.vexyStax.getImageStack();
            assert.deepStrictEqual(result, []);
        });

        it('DebugAPI_getImageStack_when_hasImages_then_returnsMappedData', () => {
            mockImageStack.push({
                filename: 'test.png',
                texture: { image: { width: 100, height: 200 } },
                mesh: { position: { x: 0, y: 100, z: -50 } }
            });
            debugAPI.expose();
            const result = window.vexyStax.getImageStack();
            assert.strictEqual(result.length, 1);
            assert.strictEqual(result[0].filename, 'test.png');
            assert.strictEqual(result[0].width, 100);
            assert.strictEqual(result[0].height, 200);
            assert.deepStrictEqual(result[0].position, { x: 0, y: 100, z: -50 });
        });
    });

    describe('settings', () => {
        it('DebugAPI_loadSettings_when_called_then_invokesCallback', () => {
            debugAPI.expose();
            const result = window.vexyStax.loadSettings();
            assert.strictEqual(mockCallbacks.loadSettings.mock.callCount(), 1);
            assert.deepStrictEqual(result, { loaded: true });
        });

        it('DebugAPI_saveSettings_when_called_then_invokesCallback', () => {
            debugAPI.expose();
            window.vexyStax.saveSettings();
            assert.strictEqual(mockCallbacks.saveSettings.mock.callCount(), 1);
        });

        it('DebugAPI_resetSettings_when_called_then_invokesCallback', () => {
            debugAPI.expose();
            window.vexyStax.resetSettings();
            assert.strictEqual(mockCallbacks.resetSettings.mock.callCount(), 1);
        });
    });

    describe('history', () => {
        it('DebugAPI_undo_when_called_then_invokesCallback', () => {
            debugAPI.expose();
            window.vexyStax.undo();
            assert.strictEqual(mockCallbacks.undo.mock.callCount(), 1);
        });

        it('DebugAPI_redo_when_called_then_invokesCallback', () => {
            debugAPI.expose();
            window.vexyStax.redo();
            assert.strictEqual(mockCallbacks.redo.mock.callCount(), 1);
        });
    });

    describe('showFPS', () => {
        it('DebugAPI_showFPS_when_enabled_then_updatesRenderLoop', () => {
            debugAPI.expose();
            window.vexyStax.showFPS(true);
            assert.strictEqual(mockManagers.renderLoop.showFPS.mock.callCount(), 1);
            assert.deepStrictEqual(mockManagers.renderLoop.showFPS.mock.calls[0].arguments, [true]);
        });

        it('DebugAPI_showFPS_when_disabled_then_updatesRenderLoop', () => {
            debugAPI.expose();
            window.vexyStax.showFPS(false);
            assert.deepStrictEqual(mockManagers.renderLoop.showFPS.mock.calls[0].arguments, [false]);
        });

        it('DebugAPI_showFPS_when_called_then_invalidatesMemoryOverlay', () => {
            debugAPI.expose();
            window.vexyStax.showFPS(true);
            assert.strictEqual(mockManagers.memoryMonitor.invalidateOverlay.mock.callCount(), 1);
        });
    });

    describe('getStats', () => {
        it('DebugAPI_getStats_when_called_then_returnsStatsObject', () => {
            debugAPI.expose();
            const stats = window.vexyStax.getStats();
            assert.strictEqual(stats.imageCount, 0);
            assert.strictEqual(stats.cameraMode, 'perspective');
            assert.ok('performance' in stats);
            assert.strictEqual(stats.performance.historySize, '3/5');
        });

        it('DebugAPI_getStats_when_hasImages_then_calculatesMemory', () => {
            mockImageStack.push({
                texture: { image: { width: 1000, height: 1000 } }
            });
            debugAPI.expose();
            const stats = window.vexyStax.getStats();
            assert.strictEqual(stats.imageCount, 1);
            assert.strictEqual(stats.totalPixels, 1000000);
            // 1000*1000*4 bytes = 4MB (approximately)
            assert.ok(parseFloat(stats.estimatedMemoryMB) > 3.5);
        });
    });

    describe('animation', () => {
        it('DebugAPI_playAnimation_when_noImages_then_doesNotPlay', async () => {
            debugAPI.expose();
            await window.vexyStax.playAnimation();
            assert.strictEqual(mockManagers.cameraAnimator.playHeroShot.mock.callCount(), 0);
        });

        it('DebugAPI_playAnimation_when_hasImages_then_playsAnimation', async () => {
            mockImageStack.push({ mesh: {}, texture: {} });
            debugAPI.expose();
            await window.vexyStax.playAnimation({ duration: 2 });
            assert.strictEqual(mockManagers.cameraAnimator.playHeroShot.mock.callCount(), 1);
        });

        it('DebugAPI_cancelAnimation_when_called_then_cancelsAnimator', () => {
            debugAPI.expose();
            window.vexyStax.cancelAnimation();
            assert.strictEqual(mockManagers.cameraAnimator.cancel.mock.callCount(), 1);
        });
    });

    describe('dispose', () => {
        it('DebugAPI_dispose_when_called_then_removesWindowVexyStax', () => {
            debugAPI.expose();
            assert.ok(window.vexyStax);
            debugAPI.dispose();
            assert.strictEqual(window.vexyStax, undefined);
        });
    });

    describe('setManager', () => {
        it('DebugAPI_setManager_when_called_then_updatesManagerReference', () => {
            const newManager = { test: true };
            debugAPI.setManager('testManager', newManager);
            assert.strictEqual(debugAPI.managers.testManager, newManager);
        });
    });

    describe('help', () => {
        it('DebugAPI_help_when_called_then_logsHelpText', () => {
            debugAPI.expose();
            // Just verify it doesn't throw
            window.vexyStax.help();
        });
    });
});
