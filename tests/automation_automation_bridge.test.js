// this_file: tests/automation_automation_bridge.test.js

import { describe, it, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert';
import { AutomationBridge } from '../src/automation/AutomationBridge.js';

describe('AutomationBridge', () => {
    let bridge;
    let mockCallbacks;
    let mockManagers;
    let mockImageStack;
    let mockParams;

    beforeEach(() => {
        delete globalThis.window;
        globalThis.window = {};

        mockImageStack = [];
        mockParams = {
            canvasSize: { x: 960, y: 540 },
            animDuration: 2,
            animEasing: 'power2.inOut',
            ambience: 0
        };

        mockCallbacks = {
            loadImage: mock.fn(),
            setViewpoint: mock.fn(),
            setBeautyViewpoint: mock.fn(),
            setHeroViewpoint: mock.fn(),
            setViewpointFitToFrame: mock.fn(),
            centerViewOnContent: mock.fn()
        };

        mockManagers = {
            cameraAnimator: {
                playHeroShot: mock.fn(() => Promise.resolve())
            },
            ambienceManager: {
                updateMaterials: mock.fn(),
                applyEmissiveIntensity: mock.fn()
            },
            floorManager: {
                updateMaterial: mock.fn()
            }
        };

        bridge = new AutomationBridge({
            imageStack: mockImageStack,
            params: mockParams,
            managers: mockManagers,
            callbacks: mockCallbacks
        });
    });

    afterEach(() => {
        bridge?.dispose();
        delete globalThis.window;
    });

    describe('constructor', () => {
        it('AutomationBridge_constructor_when_created_then_storesReferences', () => {
            assert.strictEqual(bridge.imageStack, mockImageStack);
            assert.strictEqual(bridge.params, mockParams);
        });

        it('AutomationBridge_constructor_when_noOptions_then_usesDefaults', () => {
            const b = new AutomationBridge({});
            assert.deepStrictEqual(b.imageStack, []);
            assert.deepStrictEqual(b.params, {});
        });
    });

    describe('expose', () => {
        it('AutomationBridge_expose_when_called_then_createsWindowAutomation', () => {
            bridge.expose();
            assert.ok(window.__vexyStaxAutomation, 'window.__vexyStaxAutomation should exist');
        });

        it('AutomationBridge_expose_when_called_then_exposesAPIMethods', () => {
            bridge.expose();
            assert.strictEqual(typeof window.__vexyStaxAutomation.addSlideFromDataURL, 'function');
            assert.strictEqual(typeof window.__vexyStaxAutomation.addSlides, 'function');
            assert.strictEqual(typeof window.__vexyStaxAutomation.setViewpointPreset, 'function');
            assert.strictEqual(typeof window.__vexyStaxAutomation.playHeroShot, 'function');
        });
    });

    describe('setViewpointPreset', () => {
        beforeEach(() => {
            bridge.expose();
        });

        it('AutomationBridge_setViewpointPreset_when_beauty_then_callsBeautyCallback', async () => {
            await window.__vexyStaxAutomation.setViewpointPreset('beauty');
            assert.strictEqual(mockCallbacks.setBeautyViewpoint.mock.callCount(), 1);
        });

        it('AutomationBridge_setViewpointPreset_when_hero_then_callsHeroCallback', async () => {
            await window.__vexyStaxAutomation.setViewpointPreset('hero');
            assert.strictEqual(mockCallbacks.setHeroViewpoint.mock.callCount(), 1);
        });

        it('AutomationBridge_setViewpointPreset_when_front_then_callsFitToFrame', async () => {
            await window.__vexyStaxAutomation.setViewpointPreset('front');
            assert.strictEqual(mockCallbacks.setViewpointFitToFrame.mock.callCount(), 1);
        });

        it('AutomationBridge_setViewpointPreset_when_center_then_callsCenterView', async () => {
            await window.__vexyStaxAutomation.setViewpointPreset('center');
            assert.strictEqual(mockCallbacks.centerViewOnContent.mock.callCount(), 1);
        });

        it('AutomationBridge_setViewpointPreset_when_null_then_callsCenterView', async () => {
            await window.__vexyStaxAutomation.setViewpointPreset(null);
            assert.strictEqual(mockCallbacks.centerViewOnContent.mock.callCount(), 1);
        });

        it('AutomationBridge_setViewpointPreset_when_array_then_callsSetViewpoint', async () => {
            await window.__vexyStaxAutomation.setViewpointPreset([100, 200, 300]);
            assert.strictEqual(mockCallbacks.setViewpoint.mock.callCount(), 1);
            assert.deepStrictEqual(mockCallbacks.setViewpoint.mock.calls[0].arguments, [100, 200, 300]);
        });

        it('AutomationBridge_setViewpointPreset_when_object_then_callsSetViewpoint', async () => {
            await window.__vexyStaxAutomation.setViewpointPreset({ x: 50, y: 100, z: 150 });
            assert.strictEqual(mockCallbacks.setViewpoint.mock.callCount(), 1);
            assert.deepStrictEqual(mockCallbacks.setViewpoint.mock.calls[0].arguments, [50, 100, 150]);
        });

        it('AutomationBridge_setViewpointPreset_when_unknown_then_throws', async () => {
            await assert.rejects(
                async () => window.__vexyStaxAutomation.setViewpointPreset('invalid'),
                /Unknown viewpoint preset/
            );
        });
    });

    describe('playHeroShot', () => {
        beforeEach(() => {
            bridge.expose();
        });

        it('AutomationBridge_playHeroShot_when_noAnimator_then_throws', async () => {
            bridge.managers.cameraAnimator = null;
            await assert.rejects(
                async () => window.__vexyStaxAutomation.playHeroShot(),
                /Camera animator not initialized/
            );
        });

        it('AutomationBridge_playHeroShot_when_noSlides_then_throws', async () => {
            await assert.rejects(
                async () => window.__vexyStaxAutomation.playHeroShot(),
                /No slides available/
            );
        });

        it('AutomationBridge_playHeroShot_when_hasSlides_then_playsAnimation', async () => {
            mockImageStack.push({ mesh: {}, texture: {} });
            await window.__vexyStaxAutomation.playHeroShot({ duration: 3 });
            assert.strictEqual(mockManagers.cameraAnimator.playHeroShot.mock.callCount(), 1);
            const args = mockManagers.cameraAnimator.playHeroShot.mock.calls[0].arguments[0];
            assert.strictEqual(args.duration, 3);
        });
    });

    describe('dispose', () => {
        it('AutomationBridge_dispose_when_called_then_removesWindowAutomation', () => {
            bridge.expose();
            assert.ok(window.__vexyStaxAutomation);
            bridge.dispose();
            assert.strictEqual(window.__vexyStaxAutomation, undefined);
        });
    });

    describe('setManager', () => {
        it('AutomationBridge_setManager_when_called_then_updatesReference', () => {
            const newManager = { test: true };
            bridge.setManager('testManager', newManager);
            assert.strictEqual(bridge.managers.testManager, newManager);
        });
    });
});
