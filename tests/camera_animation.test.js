// this_file: tests/camera_animation.test.js

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { CameraAnimator } from '../src/camera/animation.js';

// Mock Three.js Vector3
class MockVector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  clone() {
    return new MockVector3(this.x, this.y, this.z);
  }
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
}

// Mock camera
const createMockCamera = () => ({
  position: new MockVector3(0, 0, 800),
  zoom: 1,
  fov: 50,
});

// Mock controls
const createMockControls = () => ({
  target: new MockVector3(0, 0, 0),
  enabled: true,
});

describe('CameraAnimator', () => {
  test('constructor initializes with camera and controls', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    assert.equal(animator.camera, camera, 'camera should be stored');
    assert.equal(animator.controls, controls, 'controls should be stored');
    assert.equal(animator.isAnimating, false, 'isAnimating should start false');
    assert.equal(animator.savedState, null, 'savedState should start null');
  });

  test('saveState stores current camera and controls state', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    camera.position.x = 100;
    camera.position.y = 200;
    camera.position.z = 300;
    controls.target.x = 10;
    controls.target.y = 20;
    controls.target.z = 30;
    camera.zoom = 1.5;

    animator.saveState();

    assert.ok(animator.savedState, 'savedState should be created');
    assert.equal(animator.savedState.position.x, 100, 'position.x saved');
    assert.equal(animator.savedState.position.y, 200, 'position.y saved');
    assert.equal(animator.savedState.position.z, 300, 'position.z saved');
    assert.equal(animator.savedState.target.x, 10, 'target.x saved');
    assert.equal(animator.savedState.target.y, 20, 'target.y saved');
    assert.equal(animator.savedState.target.z, 30, 'target.z saved');
    assert.equal(animator.savedState.zoom, 1.5, 'zoom saved');
  });

  test('saveState creates independent clone (not reference)', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    camera.position.x = 100;
    animator.saveState();

    // Modify original
    camera.position.x = 999;

    // Saved state should be unchanged
    assert.equal(animator.savedState.position.x, 100, 'savedState should be independent clone');
  });

  test('restoreState returns null when no state saved', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    const result = animator.restoreState();

    assert.equal(result, undefined, 'should return undefined when no saved state');
  });

  test('restoreState returns cloned saved state', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    camera.position.x = 100;
    camera.position.y = 200;
    camera.position.z = 300;
    controls.target.x = 10;
    controls.target.y = 20;
    controls.target.z = 30;
    camera.zoom = 1.5;

    animator.saveState();

    const restored = animator.restoreState();

    assert.ok(restored, 'restored state should exist');
    assert.equal(restored.position.x, 100, 'restored position.x');
    assert.equal(restored.position.y, 200, 'restored position.y');
    assert.equal(restored.position.z, 300, 'restored position.z');
    assert.equal(restored.target.x, 10, 'restored target.x');
    assert.equal(restored.target.y, 20, 'restored target.y');
    assert.equal(restored.target.z, 30, 'restored target.z');
    assert.equal(restored.zoom, 1.5, 'restored zoom');
  });

  test('restoreState returns independent clone', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    camera.position.x = 100;
    animator.saveState();

    const restored1 = animator.restoreState();
    const restored2 = animator.restoreState();

    // Modify first restored
    restored1.position.x = 999;

    // Second restored should be unchanged
    assert.equal(restored2.position.x, 100, 'each restore should return independent clone');
  });

  test('calculateFrontViewpoint calculates correct camera position', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    const topSlide = {
      width: 400,
      height: 300,
      mesh: {
        position: { z: 0 }
      }
    };

    const canvasSize = { x: 1920, y: 1080 };

    const result = animator.calculateFrontViewpoint(topSlide, canvasSize);

    assert.ok(result, 'should return result object');
    assert.ok(result.position, 'should have position');
    assert.ok(result.target, 'should have target');

    // Camera should be positioned in front of slide (positive z)
    assert.ok(result.position.z > topSlide.mesh.position.z, 'camera should be in front of slide');

    // Camera should be centered horizontally and vertically
    assert.equal(result.position.x, 0, 'camera x should be centered');
    assert.equal(result.position.y, 0, 'camera y should be centered');

    // Target should be at slide position
    assert.equal(result.target.x, 0, 'target x should be centered');
    assert.equal(result.target.y, 0, 'target y should be centered');
    assert.equal(result.target.z, topSlide.mesh.position.z, 'target z should be at slide');
  });

  test('calculateFrontViewpoint accounts for slide z-position', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    const topSlide = {
      width: 400,
      height: 300,
      mesh: {
        position: { z: 100 } // Slide at z=100
      }
    };

    const canvasSize = { x: 1920, y: 1080 };

    const result = animator.calculateFrontViewpoint(topSlide, canvasSize);

    // Target should be at slide z position
    assert.equal(result.target.z, 100, 'target should be at slide z position');

    // Camera should be in front of the slide
    assert.ok(result.position.z > 100, 'camera should be in front of slide z position');
  });

  test('calculateFrontViewpoint uses slide dimensions for distance calculation', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    const smallSlide = {
      width: 200,
      height: 150,
      mesh: { position: { z: 0 } }
    };

    const largeSlide = {
      width: 800,
      height: 600,
      mesh: { position: { z: 0 } }
    };

    const canvasSize = { x: 1920, y: 1080 };

    const smallResult = animator.calculateFrontViewpoint(smallSlide, canvasSize);
    const largeResult = animator.calculateFrontViewpoint(largeSlide, canvasSize);

    // Larger slide should require camera to be further away
    assert.ok(
      largeResult.position.z > smallResult.position.z,
      'camera should be further for larger slide'
    );
  });

  test('cleanup re-enables controls and clears animation flag', () => {
    const camera = createMockCamera();
    const controls = createMockControls();
    const animator = new CameraAnimator(camera, controls);

    // Simulate animation state
    animator.isAnimating = true;
    controls.enabled = false;

    animator.cleanup();

    assert.equal(controls.enabled, true, 'controls should be re-enabled');
    assert.equal(animator.isAnimating, false, 'isAnimating should be false');
  });
});
