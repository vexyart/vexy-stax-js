// this_file: tests/EventCoordinator.test.js

import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { EventCoordinator } from '../src/core/EventCoordinator.js';
import { EVENTS } from '../src/core/constants.js';

describe('EventCoordinator', () => {
    let eventBus;
    let params;
    let imageStack;
    let camera;
    let controls;
    let coordinator;

    beforeEach(() => {
        eventBus = { emit: mock.fn() };
        params = {
            bgColor: '#ffffff',
            ambience: 0.5
        };
        imageStack = [
            { filename: 'image1.png' },
            { filename: 'image2.png' }
        ];
        camera = {
            position: { x: 100, y: 200, z: 300 },
            zoom: 1,
            fov: 75
        };
        controls = {
            object: camera
        };

        coordinator = new EventCoordinator({
            eventBus,
            getParams: () => params,
            getImageStack: () => imageStack,
            getCamera: () => camera,
            getControls: () => controls,
            getCameraMode: () => 'perspective'
        });
    });

    describe('constructor', () => {
        it('throws if eventBus is missing', () => {
            assert.throws(
                () => new EventCoordinator({
                    getParams: () => params,
                    getImageStack: () => imageStack
                }),
                /eventBus required/
            );
        });

        it('throws if getParams is not a function', () => {
            assert.throws(
                () => new EventCoordinator({
                    eventBus,
                    getParams: 'not a function',
                    getImageStack: () => imageStack
                }),
                /getParams must be a function/
            );
        });

        it('throws if getImageStack is not a function', () => {
            assert.throws(
                () => new EventCoordinator({
                    eventBus,
                    getParams: () => params,
                    getImageStack: 'not a function'
                }),
                /getImageStack must be a function/
            );
        });

        it('creates instance with valid options', () => {
            const coord = new EventCoordinator({
                eventBus,
                getParams: () => params,
                getImageStack: () => imageStack
            });
            assert.ok(coord);
        });
    });

    describe('emitBackgroundChanged', () => {
        it('emits backgroundChanged event with params', () => {
            coordinator.emitBackgroundChanged('user');

            assert.strictEqual(eventBus.emit.mock.calls.length, 1);
            const call = eventBus.emit.mock.calls[0];
            assert.strictEqual(call.arguments[0], EVENTS.backgroundChanged);
            assert.deepStrictEqual(call.arguments[1], {
                reason: 'user',
                color: '#ffffff',
                ambience: 0.5
            });
        });

        it('reflects current params values', () => {
            params.bgColor = '#000000';
            params.ambience = 0.8;

            coordinator.emitBackgroundChanged('import');

            const call = eventBus.emit.mock.calls[0];
            assert.strictEqual(call.arguments[1].color, '#000000');
            assert.strictEqual(call.arguments[1].ambience, 0.8);
        });
    });

    describe('emitStackUpdated', () => {
        it('emits stackUpdated event with stack info', () => {
            coordinator.emitStackUpdated('add');

            assert.strictEqual(eventBus.emit.mock.calls.length, 1);
            const call = eventBus.emit.mock.calls[0];
            assert.strictEqual(call.arguments[0], EVENTS.stackUpdated);
            assert.deepStrictEqual(call.arguments[1], {
                reason: 'add',
                count: 2,
                filenames: ['image1.png', 'image2.png']
            });
        });

        it('reflects current imageStack', () => {
            imageStack.push({ filename: 'image3.png' });

            coordinator.emitStackUpdated('add');

            const call = eventBus.emit.mock.calls[0];
            assert.strictEqual(call.arguments[1].count, 3);
            assert.deepStrictEqual(call.arguments[1].filenames, ['image1.png', 'image2.png', 'image3.png']);
        });

        it('handles empty stack', () => {
            imageStack.length = 0;

            coordinator.emitStackUpdated('clear');

            const call = eventBus.emit.mock.calls[0];
            assert.strictEqual(call.arguments[1].count, 0);
            assert.deepStrictEqual(call.arguments[1].filenames, []);
        });
    });

    describe('emitCameraUpdated', () => {
        it('emits cameraUpdated event with camera info', () => {
            coordinator.emitCameraUpdated('viewpoint');

            assert.strictEqual(eventBus.emit.mock.calls.length, 1);
            const call = eventBus.emit.mock.calls[0];
            assert.strictEqual(call.arguments[0], EVENTS.cameraUpdated);
            assert.deepStrictEqual(call.arguments[1], {
                reason: 'viewpoint',
                mode: 'perspective',
                position: { x: 100, y: 200, z: 300 },
                zoom: 1,
                fov: 75
            });
        });

        it('uses controls.object as camera if available', () => {
            const otherCamera = {
                position: { x: 1, y: 2, z: 3 },
                zoom: 2,
                fov: 60
            };
            controls.object = otherCamera;

            coordinator.emitCameraUpdated('orbit');

            const call = eventBus.emit.mock.calls[0];
            assert.deepStrictEqual(call.arguments[1].position, { x: 1, y: 2, z: 3 });
            assert.strictEqual(call.arguments[1].zoom, 2);
            assert.strictEqual(call.arguments[1].fov, 60);
        });

        it('falls back to getCamera when controls.object is null', () => {
            controls.object = null;

            coordinator.emitCameraUpdated('zoom');

            const call = eventBus.emit.mock.calls[0];
            assert.deepStrictEqual(call.arguments[1].position, { x: 100, y: 200, z: 300 });
        });

        it('does not emit if no camera available', () => {
            controls.object = null;
            coordinator = new EventCoordinator({
                eventBus,
                getParams: () => params,
                getImageStack: () => imageStack,
                getCamera: () => null,
                getControls: () => controls,
                getCameraMode: () => 'perspective'
            });

            coordinator.emitCameraUpdated('pan');

            assert.strictEqual(eventBus.emit.mock.calls.length, 0);
        });

        it('omits fov for orthographic camera', () => {
            const orthoCamera = {
                position: { x: 0, y: 0, z: 500 },
                zoom: 1
                // No fov property
            };
            controls.object = orthoCamera;

            coordinator.emitCameraUpdated('viewpoint');

            const call = eventBus.emit.mock.calls[0];
            assert.strictEqual(call.arguments[1].fov, undefined);
        });

        it('uses getCameraMode for mode value', () => {
            coordinator = new EventCoordinator({
                eventBus,
                getParams: () => params,
                getImageStack: () => imageStack,
                getCamera: () => camera,
                getControls: () => controls,
                getCameraMode: () => 'orthographic'
            });

            coordinator.emitCameraUpdated('mode');

            const call = eventBus.emit.mock.calls[0];
            assert.strictEqual(call.arguments[1].mode, 'orthographic');
        });
    });

    describe('default getters', () => {
        it('uses default getCameraMode if not provided', () => {
            const coord = new EventCoordinator({
                eventBus,
                getParams: () => params,
                getImageStack: () => imageStack,
                getCamera: () => camera,
                getControls: () => controls
            });

            coord.emitCameraUpdated('test');

            const call = eventBus.emit.mock.calls[0];
            assert.strictEqual(call.arguments[1].mode, 'perspective');
        });

        it('uses default getCamera if not provided', () => {
            const coord = new EventCoordinator({
                eventBus,
                getParams: () => params,
                getImageStack: () => imageStack,
                getControls: () => ({ object: null })
            });

            coord.emitCameraUpdated('test');

            // Should not emit since no camera
            assert.strictEqual(eventBus.emit.mock.calls.length, 0);
        });

        it('uses default getControls if not provided', () => {
            const coord = new EventCoordinator({
                eventBus,
                getParams: () => params,
                getImageStack: () => imageStack,
                getCamera: () => camera
            });

            coord.emitCameraUpdated('test');

            const call = eventBus.emit.mock.calls[0];
            assert.deepStrictEqual(call.arguments[1].position, { x: 100, y: 200, z: 300 });
        });
    });
});
