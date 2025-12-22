// this_file: tests/camera_camera_controller.test.js
/**
 * Test Suite: Camera - CameraController
 *
 * Purpose: Verifies camera mode orchestration, zoom/FOV coordination,
 * distance/offset control, and centering logic provided by the CameraController.
 *
 * Modules Tested:
 * - src/camera/CameraController.js (CameraController class)
 *
 * Test Count: 15 tests
 * @lastTested 2025-12-22 (Camera Controls - setDistance, setOffset, resetOffset)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';

import { CameraController } from '../src/camera/CameraController.js';
import { CAMERA_MIN_DISTANCE } from '../src/core/constants.js';

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
        canvasSize: { x: 960, y: 540 }
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

const EPSILON = 1e-6;

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

test('CameraController_setViewpointFitToFrame_when_slidePresent_then_centresOnSlide', () => {
    const ctx = createContext();
    const slide = createSlide({
        width: 360,
        height: 220,
        position: new THREE.Vector3(120, 90, 240)
    });
    ctx.imageStack.push(slide);

    ctx.controller.setViewpointFitToFrame();

    const box = new THREE.Box3().setFromObject(slide.mesh);
    const center = new THREE.Vector3();
    box.getCenter(center);

    assert.ok(ctx.controls.target.equals(center), 'controls target should align with slide centre');
    assert.ok(Math.abs(ctx.camera.position.x - center.x) < EPSILON, 'camera x should match slide centre');
    assert.ok(Math.abs(ctx.camera.position.y - center.y) < EPSILON, 'camera y should match slide centre');

    const size = new THREE.Vector3();
    box.getSize(size);
    const width = size.x;
    const height = size.y;

    const fovRadians = ctx.params.cameraFOV * (Math.PI / 180);
    const halfVerticalTan = Math.max(Math.tan(fovRadians / 2), EPSILON);
    const horizontalFov = 2 * Math.atan(halfVerticalTan * ctx.camera.aspect);
    const halfHorizontalTan = Math.max(Math.tan(horizontalFov / 2), EPSILON);

    const distanceForHeight = (height / 2) / halfVerticalTan;
    const distanceForWidth = (width / 2) / halfHorizontalTan;
    const expectedDistance = Math.max(Math.max(distanceForHeight, distanceForWidth) * 1.1, CAMERA_MIN_DISTANCE);
    const actualDistance = ctx.camera.position.z - center.z;

    assert.ok(Math.abs(actualDistance - expectedDistance) < 1e-3, 'camera should respect padded distance from slide centre');
    assert.equal(ctx.controls.updateCalls, 1, 'controls update should be invoked once');
    assert.equal(ctx.params.viewpointPreset, 'front', 'params should track front preset');
    assert.deepEqual(ctx.emissions.slice(-1), ['viewpoint'], 'viewpoint change should emit');
});

test('CameraController_setBeautyViewpoint_when_stackPopulated_then_offsetsAlongBeautyDirection', () => {
    const ctx = createContext();
    const first = createSlide({
        width: 300,
        height: 200,
        position: new THREE.Vector3(-60, 40, 0)
    });
    const second = createSlide({
        width: 180,
        height: 320,
        position: new THREE.Vector3(90, 120, 180)
    });
    ctx.imageStack.push(first, second);

    ctx.controller.setBeautyViewpoint();

    const box = new THREE.Box3();
    ctx.imageStack.forEach((entry) => box.expandByObject(entry.mesh));
    const center = new THREE.Vector3();
    box.getCenter(center);

    assert.ok(ctx.controls.target.equals(center), 'beauty view should centre controls on stack');
    assert.equal(ctx.params.viewpointPreset, 'beauty', 'params should track beauty preset');

    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    const radius = Math.max(sphere.radius, 1);

    const fovRadians = ctx.params.cameraFOV * (Math.PI / 180);
    const halfVerticalTan = Math.max(Math.tan(fovRadians / 2), EPSILON);
    const horizontalFov = 2 * Math.atan(halfVerticalTan * ctx.camera.aspect);
    const halfHorizontalTan = Math.max(Math.tan(horizontalFov / 2), EPSILON);

    const distanceForHeight = radius / halfVerticalTan;
    const distanceForWidth = radius / halfHorizontalTan;
    const expectedDistance = Math.max(Math.max(distanceForHeight, distanceForWidth) * 1.35, CAMERA_MIN_DISTANCE * 2);
    const actualDistance = ctx.camera.position.distanceTo(center);

    assert.ok(Math.abs(actualDistance - expectedDistance) < 1e-3, 'beauty view should respect padded bounding-sphere distance');

    const expectedDirection = new THREE.Vector3(-0.82, -0.18, 1).normalize();
    const actualDirection = ctx.camera.position.clone().sub(center).normalize();
    assert.ok(actualDirection.distanceTo(expectedDirection) < 1e-3, 'beauty view camera direction should match configured vector');
    assert.ok(ctx.controls.updateCalls > 0, 'controls should update during beauty viewpoint computation');
    assert.deepEqual(ctx.emissions.slice(-1), ['viewpoint'], 'beauty viewpoint should emit change');
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

test('CameraController_setViewpoint_when_called_then_resetsOffsets', () => {
    const ctx = createContext();
    ctx.params.cameraOffsetX = 100;
    ctx.params.cameraOffsetY = 50;

    ctx.controller.setViewpoint(0, 0, 800);

    assert.strictEqual(ctx.params.cameraOffsetX, 0, 'X offset should be reset to 0');
    assert.strictEqual(ctx.params.cameraOffsetY, 0, 'Y offset should be reset to 0');
});

test('CameraController_setDistance_when_called_then_movesCameraAlongLookVector', () => {
    const ctx = createContext();
    ctx.camera.position.set(0, 0, 800);
    ctx.controls.target.set(0, 0, 0);

    ctx.controller.setDistance(1200);

    assert.strictEqual(ctx.params.cameraDistance, 1200, 'cameraDistance param should be updated');
    const actualDistance = ctx.camera.position.distanceTo(ctx.controls.target);
    assert.ok(Math.abs(actualDistance - 1200) < EPSILON, 'camera should be at new distance from target');
    assert.deepEqual(ctx.emissions.slice(-1), ['distance'], 'distance change should emit');
});

test('CameraController_setOffset_when_called_then_pansCameraAndTarget', () => {
    const ctx = createContext();
    ctx.camera.position.set(0, 0, 800);
    ctx.controls.target.set(0, 0, 0);
    const originalCameraX = ctx.camera.position.x;
    const originalTargetX = ctx.controls.target.x;

    // Apply offset of 100 in X direction
    ctx.controller.setOffset(100, 0);

    assert.strictEqual(ctx.params.cameraOffsetX, 100, 'cameraOffsetX param should be updated');
    assert.strictEqual(ctx.params.cameraOffsetY, 0, 'cameraOffsetY param should be 0');
    // Camera and target should both move by approximately 100 in screen-right direction
    assert.ok(ctx.camera.position.x !== originalCameraX, 'camera X should have changed');
    assert.ok(ctx.controls.target.x !== originalTargetX, 'target X should have changed');
    assert.deepEqual(ctx.emissions.slice(-1), ['offset'], 'offset change should emit');
});

test('CameraController_setOffset_when_calledTwice_then_appliesDelta', () => {
    const ctx = createContext();
    ctx.camera.position.set(0, 0, 800);
    ctx.controls.target.set(0, 0, 0);

    // First offset
    ctx.controller.setOffset(50, 0);
    const posAfterFirst = ctx.camera.position.x;

    // Second offset - should only move by delta (100 - 50 = 50 more)
    ctx.controller.setOffset(100, 0);
    const posAfterSecond = ctx.camera.position.x;

    // The second call should move approximately the same amount as the first
    const firstMove = Math.abs(posAfterFirst - 0);
    const secondMove = Math.abs(posAfterSecond - posAfterFirst);
    assert.ok(Math.abs(firstMove - secondMove) < 1, 'second offset should apply delta, not absolute');
});

test('CameraController_resetOffset_when_called_then_setsOffsetsToZero', () => {
    const ctx = createContext();
    ctx.params.cameraOffsetX = 150;
    ctx.params.cameraOffsetY = -75;

    ctx.controller.resetOffset();

    assert.strictEqual(ctx.params.cameraOffsetX, 0, 'X offset should be reset to 0');
    assert.strictEqual(ctx.params.cameraOffsetY, 0, 'Y offset should be reset to 0');
});
