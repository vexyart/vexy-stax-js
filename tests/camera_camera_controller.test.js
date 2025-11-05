// this_file: tests/camera_camera_controller.test.js
/**
 * Test Suite: Camera - CameraController
 *
 * Purpose: Verifies camera mode orchestration, zoom/FOV coordination, and
 * centering logic provided by the CameraController abstraction.
 *
 * Modules Tested:
 * - src/camera/CameraController.js (CameraController class)
 *
 * Test Count: 9 tests
 * @lastTested 2025-11-06 (Quality Improvements - Iteration 106)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';

import { CameraController } from '../src/camera/CameraController.js';

function createContext(overrides = {}) {
    const camera = new THREE.PerspectiveCamera(60, 16 / 9, 0.1, 5000);
    camera.position.set(0, 0, 800);

    const orthoSize = 500;
    const orthoCamera = new THREE.OrthographicCamera(
        -orthoSize,
        orthoSize,
        orthoSize,
        -orthoSize,
        0.1,
        5000
    );
    orthoCamera.position.set(0, 0, 800);

    const controls = {
        object: camera,
        target: new THREE.Vector3(0, 0, 0),
        enabled: true,
        updateCalls: 0,
        update() {
            this.updateCalls += 1;
        }
    };

    const params = {
        cameraMode: 'perspective',
        cameraZoom: 1,
        cameraFOV: 60,
        canvasSize: { x: 1920, y: 1080 }
    };

    const imageStack = [];

    const logCamera = {
        info: overrides.logInfo ?? (() => {}),
        warn: overrides.logWarn ?? (() => {}),
        error: overrides.logError ?? (() => {})
    };

    const modeChanges = [];
    const emissions = [];
    const pane = overrides.pane ?? { refresh: () => {} };

    const controller = new CameraController({
        camera,
        orthoCamera,
        controls,
        params,
        imageStack,
        pane,
        logCamera,
        emitCameraUpdated: (reason) => emissions.push(reason),
        onModeChange: (mode) => modeChanges.push(mode)
    });

    return {
        controller,
        camera,
        orthoCamera,
        controls,
        params,
        imageStack,
        modeChanges,
        emissions
    };
}

function createSlide({ width, height, position }) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    return {
        width,
        height,
        mesh
    };
}

test('CameraController_switchMode_when_switchingToOrthographic_then_controlsBindOrthoCamera', () => {
    const ctx = createContext();
    ctx.params.cameraZoom = 1.6;

    ctx.controller.switchMode('orthographic');

    assert.equal(ctx.params.cameraMode, 'orthographic', 'params.cameraMode should track selected mode');
    assert.equal(ctx.controls.object, ctx.orthoCamera, 'controls.object should swap to the orthographic camera');
    assert.equal(ctx.orthoCamera.zoom, 1.6, 'orthographic zoom should match params.cameraZoom');
    assert.deepEqual(ctx.modeChanges, ['orthographic'], 'onModeChange callback should fire once');
    assert.deepEqual(ctx.emissions, ['mode-change'], 'mode change should emit cameraUpdated reason');
});

test('CameraController_switchMode_when_switchingToTelephoto_then_setsFOVAndTriggersPaneRefresh', () => {
    let refreshCalls = 0;
    const ctx = createContext({
        pane: {
            refresh: () => {
                refreshCalls += 1;
            }
        }
    });
    ctx.params.cameraZoom = 1.2;
    ctx.params.cameraFOV = 55;

    ctx.controller.switchMode('telephoto');

    assert.equal(ctx.params.cameraMode, 'telephoto', 'telephoto mode should be stored in params');
    assert.equal(ctx.params.cameraFOV, 30, 'telephoto mode should clamp FOV to 30 degrees');
    assert.equal(ctx.camera.fov, 30, 'camera FOV should sync with params');
    assert.equal(ctx.camera.position.z, 1500, 'telephoto positions camera further away');
    assert.equal(ctx.camera.zoom, 1.2, 'zoom should persist when switching modes');
    assert.equal(refreshCalls, 1, 'pane.refresh should be invoked to update UI state');
    assert.deepEqual(ctx.emissions.slice(-1), ['mode-change'], 'telephoto switch should emit mode-change');
});

test('CameraController_switchMode_when_modeUnknown_then_defaultsToPerspective', () => {
    const ctx = createContext();

    ctx.controller.switchMode('hyperreal');

    assert.equal(ctx.params.cameraMode, 'perspective', 'unknown mode should reset to perspective');
    assert.equal(ctx.controls.object, ctx.camera, 'controls should continue to target perspective camera');
    assert.equal(ctx.controller.getActiveCamera(), ctx.camera, 'active camera should remain perspective rig');
    assert.deepEqual(ctx.modeChanges.slice(-1), ['perspective'], 'fallback should emit perspective mode change');
    assert.deepEqual(ctx.emissions.slice(-1), ['mode-change'], 'mode-change emission should still fire');
});

test('CameraController_setZoom_when_called_then_updatesBothCamerasAndEmits', () => {
    const ctx = createContext();

    ctx.controller.setZoom(2.5);

    assert.equal(ctx.params.cameraZoom, 2.5, 'params.cameraZoom should track zoom');
    assert.equal(ctx.camera.zoom, 2.5, 'perspective camera zoom should update');
    assert.equal(ctx.orthoCamera.zoom, 2.5, 'orthographic camera zoom should update');
    assert.deepEqual(ctx.emissions, ['zoom'], 'zoom update should emit cameraUpdated reason');
});

test('CameraController_centerOnContent_when_stackHasMeshes_then_centersControlsAndCamera', () => {
    const ctx = createContext();
    const originalPosition = ctx.camera.position.clone();
    ctx.imageStack.push(createSlide({
        width: 800,
        height: 600,
        position: new THREE.Vector3(-100, 50, 0)
    }));
    ctx.imageStack.push(createSlide({
        width: 400,
        height: 300,
        position: new THREE.Vector3(200, -150, 200)
    }));

    ctx.controller.centerOnContent();

    const box = new THREE.Box3();
    ctx.imageStack.forEach((entry) => box.expandByObject(entry.mesh));
    const expectedCenter = new THREE.Vector3();
    box.getCenter(expectedCenter);

    assert.ok(ctx.controls.target.equals(expectedCenter), 'controls target should match bounding box centre');
    const expectedCameraPosition = expectedCenter.clone().add(originalPosition);
    assert.ok(
        ctx.controller.getActiveCamera().position.equals(expectedCameraPosition),
        'active camera should translate by original offset'
    );
    assert.equal(ctx.controls.updateCalls, 1, 'controls.update should be invoked');
    assert.deepEqual(ctx.emissions.slice(-1), ['center'], 'centering should emit cameraUpdated reason');
});

test('CameraController_setViewpointFitToFrame_when_stackEmpty_then_usesDefaultDistance', () => {
    const ctx = createContext();
    ctx.params.cameraFOV = 55;

    ctx.controller.setViewpointFitToFrame();

    assert.equal(ctx.camera.position.z, 800, 'camera should fall back to default distance');
    assert.equal(ctx.controls.updateCalls, 1, 'controls.update should run via setViewpoint');
    assert.deepEqual(ctx.emissions.slice(-1), ['viewpoint'], 'fallback should emit viewpoint update');
});

test('CameraController_setViewpointFitToFrame_when_frontSlideMissingMesh_then_logsErrorAndFallsBack', () => {
    const errorMessages = [];
    const ctx = createContext({
        logError: (message) => errorMessages.push(message)
    });
    ctx.imageStack.push({
        width: 400,
        height: 300
        // mesh intentionally omitted to trigger fallback branch
    });

    ctx.controller.setViewpointFitToFrame();

    assert.equal(ctx.camera.position.z, 800, 'camera should use fallback distance without mesh');
    assert.equal(ctx.controls.updateCalls, 1, 'controls.update should still execute');
    assert.ok(errorMessages.some((msg) => msg.includes('No front slide found')), 'error log should note missing mesh');
    assert.deepEqual(ctx.emissions.slice(-1), ['viewpoint'], 'fallback should emit viewpoint update');
});

test('CameraController_setFOV_when_modeOrthographic_then_leavesPerspectiveProjectionUntouched', () => {
    const ctx = createContext();
    ctx.controller.switchMode('orthographic');
    const originalFOV = ctx.camera.fov;
    const originalEmissionCount = ctx.emissions.length;

    ctx.controller.setFOV(35);

    assert.equal(ctx.camera.fov, originalFOV, 'perspective camera FOV should remain unchanged outside perspective/telephoto modes');
    assert.equal(ctx.emissions.length, originalEmissionCount, 'FOV update should not emit in orthographic mode');
});

test('CameraController_setViewpoint_when_presetProvided_then_positionsCamera', () => {
    const ctx = createContext();
    const beautyViewpoint = { x: -1280, y: -40, z: 1400 };

    ctx.controller.setViewpoint(beautyViewpoint.x, beautyViewpoint.y, beautyViewpoint.z);

    assert.equal(ctx.camera.position.x, beautyViewpoint.x, 'camera x position should match preset');
    assert.equal(ctx.camera.position.y, beautyViewpoint.y, 'camera y position should match preset');
    assert.equal(ctx.camera.position.z, beautyViewpoint.z, 'camera z position should match preset');
    assert.ok(ctx.controls.updateCalls > 0, 'controls should be updated after viewpoint change');
    // Verify camera was repositioned successfully regardless of event emissions
    const distance = Math.sqrt(
        beautyViewpoint.x ** 2 + beautyViewpoint.y ** 2 + beautyViewpoint.z ** 2
    );
    const actualDistance = ctx.camera.position.length();
    assert.ok(Math.abs(actualDistance - distance) < 0.01, 'camera should be at expected distance from origin');
});
