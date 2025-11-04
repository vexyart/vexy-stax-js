// this_file: tests/error_recovery.test.js

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { SceneManager } from '../src/scene/SceneManager.js';
import { LightingManager } from '../src/scene/LightingManager.js';
import { FloorManager } from '../src/scene/FloorManager.js';
import { CameraAnimator } from '../src/camera/animation.js';

describe('Error Recovery - SceneManager', () => {
  test('init throws clear error when canvas is missing', () => {
    const sceneManager = new SceneManager(null, { canvasSize: { x: 1920, y: 1080 }, bgColor: '#000000' });

    assert.throws(
      () => sceneManager.init(),
      /canvas element is required/,
      'should throw clear error for missing canvas'
    );
  });

  test('init throws clear error when params is missing', () => {
    const mockCanvas = { width: 1920, height: 1080, style: {}, addEventListener: () => {} };
    const sceneManager = new SceneManager(mockCanvas, null);

    assert.throws(
      () => sceneManager.init(),
      /params with canvasSize is required/,
      'should throw clear error for missing params'
    );
  });

  test('init throws clear error when canvasSize is missing', () => {
    const mockCanvas = { width: 1920, height: 1080, style: {}, addEventListener: () => {} };
    const sceneManager = new SceneManager(mockCanvas, { bgColor: '#000000' });

    assert.throws(
      () => sceneManager.init(),
      /params with canvasSize is required/,
      'should throw clear error for missing canvasSize'
    );
  });

  test('dispose is safe to call multiple times (without WebGL init)', () => {
    const mockCanvas = { width: 1920, height: 1080, style: {}, addEventListener: () => {} };
    const params = { canvasSize: { x: 1920, y: 1080 }, bgColor: '#000000' };
    const sceneManager = new SceneManager(mockCanvas, params);

    // Note: Cannot call init() in Node.js (requires WebGL), but can test dispose safety

    // First dispose
    assert.doesNotThrow(() => sceneManager.dispose(), 'first dispose should not throw');

    // Second dispose (should be idempotent)
    assert.doesNotThrow(() => sceneManager.dispose(), 'second dispose should not throw');
  });

  test('dispose before init does not throw', () => {
    const mockCanvas = { width: 1920, height: 1080, style: {}, addEventListener: () => {} };
    const params = { canvasSize: { x: 1920, y: 1080 }, bgColor: '#000000' };
    const sceneManager = new SceneManager(mockCanvas, params);

    // Dispose without init
    assert.doesNotThrow(() => sceneManager.dispose(), 'dispose before init should not throw');
  });
});

describe('Error Recovery - LightingManager', () => {
  test('setup throws clear error when scene is missing', () => {
    const lightingManager = new LightingManager(null, { bgColor: '#000000' });

    assert.throws(
      () => lightingManager.setup(),
      /scene is required/,
      'should throw clear error for missing scene'
    );
  });

  test('setup throws clear error when params is missing', () => {
    const mockScene = { add: () => {} };
    const lightingManager = new LightingManager(mockScene, null);

    assert.throws(
      () => lightingManager.setup(),
      /params with bgColor is required/,
      'should throw clear error for missing params'
    );
  });

  test('setup throws clear error when bgColor is missing', () => {
    const mockScene = { add: () => {} };
    const lightingManager = new LightingManager(mockScene, {});

    assert.throws(
      () => lightingManager.setup(),
      /params with bgColor is required/,
      'should throw clear error for missing bgColor'
    );
  });

  test('dispose is safe to call multiple times (after setup)', () => {
    const mockScene = { add: () => {}, remove: () => {} };
    const params = { bgColor: '#000000' };
    const lightingManager = new LightingManager(mockScene, params);
    lightingManager.setup();

    // First dispose
    assert.doesNotThrow(() => lightingManager.dispose(), 'first dispose should not throw');

    // Second dispose (should be idempotent)
    assert.doesNotThrow(() => lightingManager.dispose(), 'second dispose should not throw');
  });

  test('dispose before setup does not throw', () => {
    const mockScene = { add: () => {} };
    const params = { bgColor: '#000000' };
    const lightingManager = new LightingManager(mockScene, params);

    // Dispose without setup
    assert.doesNotThrow(() => lightingManager.dispose(), 'dispose before setup should not throw');
  });
});

describe('Error Recovery - FloorManager', () => {
  test('create throws clear error when scene is missing', () => {
    const floorManager = new FloorManager(null, { bgColor: '#000000' });

    assert.throws(
      () => floorManager.create(),
      /scene is required/,
      'should throw clear error for missing scene'
    );
  });

  test('create throws clear error when params is missing', () => {
    const mockScene = { add: () => {} };
    const floorManager = new FloorManager(mockScene, null);

    assert.throws(
      () => floorManager.create(),
      /params with bgColor is required/,
      'should throw clear error for missing params'
    );
  });

  test('create throws clear error when bgColor is missing', () => {
    const mockScene = { add: () => {} };
    const floorManager = new FloorManager(mockScene, {});

    assert.throws(
      () => floorManager.create(),
      /params with bgColor is required/,
      'should throw clear error for missing bgColor'
    );
  });

  test('dispose is safe to call multiple times (without WebGL create)', () => {
    const mockScene = {
      add: () => {},
      remove: () => {},
      environment: null
    };
    const params = { bgColor: '#000000' };
    const floorManager = new FloorManager(mockScene, params);

    // Note: Cannot call create() in Node.js (requires WebGL window), but can test dispose safety

    // First dispose
    assert.doesNotThrow(() => floorManager.dispose(), 'first dispose should not throw');

    // Second dispose (should be idempotent)
    assert.doesNotThrow(() => floorManager.dispose(), 'second dispose should not throw');
  });

  test('dispose before create does not throw', () => {
    const mockScene = { add: () => {} };
    const params = { bgColor: '#000000' };
    const floorManager = new FloorManager(mockScene, params);

    // Dispose without create
    assert.doesNotThrow(() => floorManager.dispose(), 'dispose before create should not throw');
  });

  test('isActive returns false before create', () => {
    const mockScene = { add: () => {} };
    const params = { bgColor: '#000000' };
    const floorManager = new FloorManager(mockScene, params);

    // Should return false when floor not created
    const result = floorManager.isActive();
    assert.equal(result, false, 'isActive should return false before create');
  });

  test('updateColor is safe to call before create', () => {
    const mockScene = { add: () => {} };
    const params = { bgColor: '#000000' };
    const floorManager = new FloorManager(mockScene, params);

    // Should not throw even when floor not created
    assert.doesNotThrow(() => floorManager.updateColor('#ffffff'), 'updateColor before create should not throw');
  });
});

describe('Error Recovery - CameraAnimator', () => {
  test('restoreState is safe when no state saved', () => {
    const mockCamera = { position: { clone: () => ({}) }, zoom: 1 };
    const mockControls = { target: { clone: () => ({}) }, enabled: true };
    const animator = new CameraAnimator(mockCamera, mockControls);

    // Should return undefined, not throw
    const result = animator.restoreState();
    assert.equal(result, undefined, 'should handle missing saved state gracefully');
  });

  test('cancel is safe when not animating', () => {
    const mockCamera = { position: { clone: () => ({}), copy: () => {} }, zoom: 1 };
    const mockControls = { target: { clone: () => ({}), copy: () => {} }, enabled: true };
    const animator = new CameraAnimator(mockCamera, mockControls);

    // Should not throw
    assert.doesNotThrow(() => animator.cancel(), 'cancel when not animating should not throw');
  });

  test('cleanup is safe to call multiple times', () => {
    const mockCamera = { position: { clone: () => ({}) }, zoom: 1 };
    const mockControls = { target: { clone: () => ({}) }, enabled: false };
    const animator = new CameraAnimator(mockCamera, mockControls);

    animator.isAnimating = true;

    // First cleanup
    animator.cleanup();
    assert.equal(mockControls.enabled, true, 'controls should be enabled');
    assert.equal(animator.isAnimating, false, 'isAnimating should be false');

    // Second cleanup (should be idempotent)
    assert.doesNotThrow(() => animator.cleanup(), 'second cleanup should not throw');
    assert.equal(mockControls.enabled, true, 'controls should remain enabled');
  });

  test('calculateFrontViewpoint handles missing topSlide properties gracefully', () => {
    const mockCamera = { position: { clone: () => ({}) }, zoom: 1, fov: 50 };
    const mockControls = { target: { clone: () => ({}) }, enabled: true };
    const animator = new CameraAnimator(mockCamera, mockControls);

    const incompleteSlide = {
      width: 400,
      height: 300,
      // Missing mesh.position
    };

    const canvasSize = { x: 1920, y: 1080 };

    // Should throw because mesh.position is required
    assert.throws(
      () => animator.calculateFrontViewpoint(incompleteSlide, canvasSize),
      'should throw for incomplete slide data'
    );
  });
});

describe('Error Recovery - Module Cleanup Order', () => {
  test('disposing managers in any order does not cause errors (after setup)', () => {
    const mockCanvas = { width: 1920, height: 1080, style: {}, addEventListener: () => {} };
    const mockScene = { add: () => {}, remove: () => {}, environment: null };
    const params = { canvasSize: { x: 1920, y: 1080 }, bgColor: '#000000' };

    const sceneManager = new SceneManager(mockCanvas, params);
    const lightingManager = new LightingManager(mockScene, params);
    const floorManager = new FloorManager(mockScene, params);

    // Note: Cannot init/create in Node.js (requires WebGL), only test cleanup of uninitialized state
    lightingManager.setup(); // This one works without WebGL

    // Dispose in "wrong" order - should still work
    assert.doesNotThrow(() => {
      lightingManager.dispose(); // Lights first
      sceneManager.dispose();    // Scene second
      floorManager.dispose();    // Floor last
    }, 'disposing in any order should not throw');
  });

  test('disposing managers without initialization does not cause errors', () => {
    const mockCanvas = { width: 1920, height: 1080, style: {}, addEventListener: () => {} };
    const mockScene = { add: () => {} };
    const params = { canvasSize: { x: 1920, y: 1080 }, bgColor: '#000000' };

    const sceneManager = new SceneManager(mockCanvas, params);
    const lightingManager = new LightingManager(mockScene, params);
    const floorManager = new FloorManager(mockScene, params);

    // Dispose without init/setup/create
    assert.doesNotThrow(() => {
      sceneManager.dispose();
      lightingManager.dispose();
      floorManager.dispose();
    }, 'disposing uninitialized managers should not throw');
  });
});
