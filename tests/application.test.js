// this_file: tests/application.test.js

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Application } from '../src/Application.js';

// Mock canvas for Node.js environment
function createMockCanvas() {
    return {
        getContext: () => null,
        width: 960,
        height: 540
    };
}

describe('Application', () => {
    let app;
    let canvas;

    beforeEach(() => {
        canvas = createMockCanvas();
        app = new Application(canvas);
    });

    it('constructor should throw without canvas', () => {
        assert.throws(
            () => new Application(null),
            /Canvas element required/
        );
    });

    it('constructor should store canvas reference', () => {
        assert.strictEqual(app.canvas, canvas);
    });

    it('constructor should create container and events', () => {
        assert.ok(app.container);
        assert.ok(app.events);
        assert.strictEqual(app.initialized, false);
    });

    it('init should set initialized to true', async () => {
        await app.init();
        assert.strictEqual(app.initialized, true);
        assert.strictEqual(app.isInitialized, true);
    });

    it('init should register events service', async () => {
        await app.init();
        assert.strictEqual(app.hasService('events'), true);
    });

    it('init should warn if already initialized', async () => {
        await app.init();
        // Should not throw
        await app.init();
        assert.strictEqual(app.initialized, true);
    });

    it('getService should retrieve registered service', async () => {
        await app.init();
        const events = app.getService('events');
        assert.strictEqual(events, app.events);
    });

    it('hasService should check service existence', async () => {
        await app.init();
        assert.strictEqual(app.hasService('events'), true);
        assert.strictEqual(app.hasService('unknown'), false);
    });

    it('registerService should add new service', async () => {
        await app.init();
        const service = { name: 'test' };
        app.registerService('test', service);
        assert.strictEqual(app.getService('test'), service);
    });

    it('dispose should clean up all resources', async () => {
        await app.init();
        app.registerService('test', { dispose: () => {} });

        app.dispose();

        assert.strictEqual(app.initialized, false);
        assert.strictEqual(app.container.size, 0);
    });

    it('isInitialized should return initialization state', () => {
        assert.strictEqual(app.isInitialized, false);
    });

    it('wireControllers should do nothing with no services', async () => {
        await app.init();
        app.wireControllers();
        // Should not throw
        assert.strictEqual(app.sceneDirector, null);
        assert.strictEqual(app.viewpointController, null);
    });

    it('wireControllers should create SceneDirector when deps exist', async () => {
        await app.init();

        // Register minimal dependencies
        const mockScene = {};
        const mockParams = { bgColor: '#ffffff' };

        app.registerService('scene', mockScene);
        app.registerService('params', mockParams);

        app.wireControllers();

        assert.notStrictEqual(app.sceneDirector, null);
        assert.strictEqual(app.hasService('sceneDirector'), true);
    });

    it('wireControllers should create ViewpointController when deps exist', async () => {
        await app.init();

        // Mock camera and controls
        const mockCamera = { position: { set: () => {} }, aspect: 1 };
        const mockControls = { target: { set: () => {}, copy: () => {} }, update: () => {} };
        const mockParams = { viewpointPreset: 'beauty', cameraOffsetX: 0, cameraOffsetY: 0, cameraDistance: 1000 };

        app.registerService('camera', mockCamera);
        app.registerService('controls', mockControls);
        app.registerService('params', mockParams);

        app.wireControllers({
            callbacks: {
                getEffectiveZSpacing: () => 100
            }
        });

        assert.notStrictEqual(app.viewpointController, null);
        assert.strictEqual(app.hasService('viewpointController'), true);
    });

    it('wireControllers should create SlidePanelController when callbacks exist', async () => {
        await app.init();

        app.registerService('imageStack', []);

        app.wireControllers({
            callbacks: {
                onDeleteSlide: () => {},
                onReorderSlides: () => {}
            }
        });

        assert.notStrictEqual(app.slidePanelController, null);
    });

    it('wireControllers should create ToolbarController when callbacks exist', async () => {
        await app.init();

        app.wireControllers({
            callbacks: {
                onUndo: () => {},
                onRedo: () => {}
            }
        });

        assert.notStrictEqual(app.toolbarController, null);
    });

    it('dispose should clear controller references', async () => {
        await app.init();
        app.registerService('scene', {});
        app.registerService('params', {});

        app.wireControllers();
        assert.notStrictEqual(app.sceneDirector, null);

        app.dispose();
        assert.strictEqual(app.sceneDirector, null);
        assert.strictEqual(app.viewpointController, null);
    });
});
