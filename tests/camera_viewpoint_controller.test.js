// this_file: tests/camera_viewpoint_controller.test.js

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { ViewpointController } from '../src/camera/ViewpointController.js';

// Mock OrbitControls
function createMockControls() {
    return {
        target: new THREE.Vector3(),
        update: () => {}
    };
}

describe('ViewpointController', () => {
    let camera, controls, params, imageStack, controller;

    beforeEach(() => {
        camera = new THREE.PerspectiveCamera(60, 16/9, 1, 10000);
        controls = createMockControls();
        params = {
            viewpointPreset: 'front',
            cameraFOV: 60,
            cameraZoom: 1.0,
            cameraDistance: 1000,
            cameraOffsetX: 0,
            cameraOffsetY: 0,
            canvasSize: { x: 960, y: 540 }
        };
        imageStack = [];
    });

    function createController(overrides = {}) {
        return new ViewpointController({
            camera,
            controls,
            params,
            imageStack,
            getEffectiveZSpacing: () => 100,
            ...overrides
        });
    }

    it('constructor should throw without camera', () => {
        assert.throws(
            () => new ViewpointController({ controls, params, getEffectiveZSpacing: () => 100 }),
            /camera is required/
        );
    });

    it('constructor should throw without controls', () => {
        assert.throws(
            () => new ViewpointController({ camera, params, getEffectiveZSpacing: () => 100 }),
            /controls is required/
        );
    });

    it('constructor should throw without params', () => {
        assert.throws(
            () => new ViewpointController({ camera, controls, getEffectiveZSpacing: () => 100 }),
            /params is required/
        );
    });

    it('constructor should throw without getEffectiveZSpacing', () => {
        assert.throws(
            () => new ViewpointController({ camera, controls, params }),
            /getEffectiveZSpacing function is required/
        );
    });

    it('constructor should accept valid options', () => {
        controller = createController();
        assert.strictEqual(controller.camera, camera);
        assert.strictEqual(controller.controls, controls);
    });

    it('isInHeroMode should return false initially', () => {
        controller = createController();
        assert.strictEqual(controller.isInHeroMode(), false);
    });

    it('setHeroViewpoint should collapse slides and save spacing', () => {
        // Create slides with proper THREE.js meshes
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial();
        imageStack = [
            { mesh: new THREE.Mesh(geometry, material) },
            { mesh: new THREE.Mesh(geometry, material) },
            { mesh: new THREE.Mesh(geometry, material) }
        ];
        imageStack[0].mesh.position.set(0, 0, 0);
        imageStack[1].mesh.position.set(0, 0, 100);
        imageStack[2].mesh.position.set(0, 0, 200);

        controller = createController({ imageStack });
        controller.setHeroViewpoint();

        assert.strictEqual(controller.isInHeroMode(), true);
        assert.strictEqual(params.viewpointPreset, 'hero');
        // Slides should be collapsed (front slide at z=0, others behind)
        assert.strictEqual(imageStack[2].mesh.position.z, 0); // Front slide
        assert.ok(imageStack[0].mesh.position.z < 0); // Back slides negative z
    });

    it('restoreSlideZPositions should restore spacing', () => {
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial();
        imageStack = [
            { mesh: new THREE.Mesh(geometry, material) },
            { mesh: new THREE.Mesh(geometry, material) }
        ];
        imageStack[0].mesh.position.set(0, 0, 0);
        imageStack[1].mesh.position.set(0, 0, 100);

        controller = createController({ imageStack });
        controller.setHeroViewpoint();
        controller.restoreSlideZPositions();

        assert.strictEqual(controller.isInHeroMode(), false);
        assert.strictEqual(imageStack[0].mesh.position.z, 0);
        assert.strictEqual(imageStack[1].mesh.position.z, 100);
    });

    it('restoreSlideZPositions should do nothing if not in hero mode', () => {
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial();
        imageStack = [{ mesh: new THREE.Mesh(geometry, material) }];

        controller = createController({ imageStack });
        // Not in hero mode, should not throw or change anything
        controller.restoreSlideZPositions();

        assert.strictEqual(controller.isInHeroMode(), false);
    });

    it('setBeautyViewpoint should restore z-positions first', () => {
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial();
        imageStack = [
            { mesh: new THREE.Mesh(geometry, material) },
            { mesh: new THREE.Mesh(geometry, material) }
        ];
        imageStack[0].mesh.position.set(0, 0, 0);
        imageStack[1].mesh.position.set(0, 0, 100);

        controller = createController({ imageStack });
        controller.setHeroViewpoint();
        assert.strictEqual(controller.isInHeroMode(), true);

        controller.setBeautyViewpoint();
        assert.strictEqual(controller.isInHeroMode(), false);
        assert.strictEqual(params.viewpointPreset, 'beauty');
    });

    it('setViewpointFitToFrame should restore z-positions by default', () => {
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial();
        imageStack = [{ mesh: new THREE.Mesh(geometry, material) }];

        controller = createController({ imageStack });
        controller.setHeroViewpoint();
        controller.setViewpointFitToFrame();

        assert.strictEqual(controller.isInHeroMode(), false);
    });

    it('setViewpointFitToFrame with skipRestore should not restore', () => {
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial();
        imageStack = [{ mesh: new THREE.Mesh(geometry, material) }];

        controller = createController({ imageStack });
        controller.setHeroViewpoint();
        controller.setViewpointFitToFrame({ skipRestore: true });

        assert.strictEqual(controller.isInHeroMode(), true);
    });

    it('setViewpoint should set custom position', () => {
        controller = createController();
        controller.setViewpoint(100, 200, 300);

        assert.strictEqual(params.viewpointPreset, 'custom');
        assert.strictEqual(camera.position.x, 100);
        assert.strictEqual(camera.position.y, 200);
        assert.strictEqual(camera.position.z, 300);
    });

    it('centerViewOnContent should update controls target', () => {
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshBasicMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(50, 50, 50);

        imageStack = [{ mesh }];
        controller = createController({ imageStack });
        controller.centerViewOnContent();

        // Target should be at mesh center
        assert.ok(controls.target.x !== 0 || controls.target.y !== 0 || controls.target.z !== 0);
    });

    it('centerViewOnContent should handle empty stack', () => {
        controller = createController();
        // Should not throw
        assert.doesNotThrow(() => controller.centerViewOnContent());
    });

    it('setRef should set references', () => {
        controller = createController();
        const mockPane = { refresh: () => {} };

        controller.setRef('pane', mockPane);
        assert.strictEqual(controller.pane, mockPane);
    });

    it('onViewpointChanged callback should be called', () => {
        let callbackArg = null;
        controller = createController({
            onViewpointChanged: (preset) => { callbackArg = preset; }
        });

        controller.setBeautyViewpoint();
        assert.strictEqual(callbackArg, 'beauty');
    });

    it('dispose should clear references', () => {
        controller = createController({
            cameraController: {},
            pane: {}
        });

        controller.setHeroViewpoint(); // Set savedHeroState
        controller.dispose();

        assert.strictEqual(controller.savedHeroState, null);
        assert.strictEqual(controller.cameraController, null);
        assert.strictEqual(controller.pane, null);
    });
});
