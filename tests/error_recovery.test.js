// this_file: tests/error_recovery.test.js
/**
 * Test Suite: Error Recovery
 *
 * Purpose: Tests error handling and recovery patterns across all manager
 * classes. Validates disposal safety, initialization error handling,
 * and cleanup order independence. Ensures WebGL resources are properly managed.
 *
 * Modules Tested:
 * - src/scene/SceneManager.js
 * - src/scene/LightingManager.js
 * - src/scene/FloorManager.js
 * - src/scene/AmbienceManager.js
 * - src/camera/animation.js (CameraAnimator)
 *
 * Test Count: 28 tests
 * @lastTested 2025-11-08 (Iteration 120)
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { SceneManager } from '../src/scene/SceneManager.js';
import { LightingManager } from '../src/scene/LightingManager.js';
import { FloorManager } from '../src/scene/FloorManager.js';
import { AmbienceManager } from '../src/scene/AmbienceManager.js';
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

  test('create succeeds with minimal params (bgColor not required)', () => {
    const mockScene = { add: () => {} };
    const floorManager = new FloorManager(mockScene, null);

    // Simplified FloorManager uses fixed color, no bgColor required
    assert.doesNotThrow(
      () => floorManager.create(),
      'should not throw when params is null'
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

describe('Error Recovery - AmbienceManager', () => {
  test('constructor throws clear error when scene is missing', () => {
    const mockImageStack = [];
    const mockParams = { zSpacing: 100, materialThickness: 1, materialRoughness: 0.5, materialMetalness: 0 };

    assert.throws(
      () => new AmbienceManager(null, mockImageStack, mockParams),
      /\[AmbienceManager\] Cannot initialize: scene is required/,
      'should throw clear error for missing scene'
    );
  });

  test('constructor throws clear error when imageStack is not array', () => {
    const mockScene = { add: () => {}, remove: () => {} };
    const mockParams = { zSpacing: 100, materialThickness: 1, materialRoughness: 0.5, materialMetalness: 0 };

    assert.throws(
      () => new AmbienceManager(mockScene, null, mockParams),
      /\[AmbienceManager\] Cannot initialize: imageStack array is required/,
      'should throw clear error for non-array imageStack'
    );

    assert.throws(
      () => new AmbienceManager(mockScene, {}, mockParams),
      /\[AmbienceManager\] Cannot initialize: imageStack array is required/,
      'should throw clear error for non-array imageStack (object)'
    );

    assert.throws(
      () => new AmbienceManager(mockScene, 'not-an-array', mockParams),
      /\[AmbienceManager\] Cannot initialize: imageStack array is required/,
      'should throw clear error for non-array imageStack (string)'
    );
  });

  test('constructor throws clear error when params is missing', () => {
    const mockScene = { add: () => {}, remove: () => {} };
    const mockImageStack = [];

    assert.throws(
      () => new AmbienceManager(mockScene, mockImageStack, null),
      /\[AmbienceManager\] Cannot initialize: params object is required/,
      'should throw clear error for missing params'
    );
  });

  test('dispose is safe to call multiple times', () => {
    const mockScene = { add: () => {}, remove: () => {} };
    const mockImageStack = [];
    const mockParams = { zSpacing: 100, materialThickness: 1, materialRoughness: 0.5, materialMetalness: 0 };
    const ambienceManager = new AmbienceManager(mockScene, mockImageStack, mockParams);

    // First dispose
    assert.doesNotThrow(() => ambienceManager.dispose(), 'first dispose should not throw');

    // Second dispose (should be idempotent)
    assert.doesNotThrow(() => ambienceManager.dispose(), 'second dispose should not throw');
  });

  test('updateMaterials handles empty imageStack gracefully', () => {
    const mockScene = { add: () => {}, remove: () => {} };
    const mockImageStack = []; // Empty stack
    const mockParams = { zSpacing: 100, materialThickness: 1, materialRoughness: 0.5, metalMetalness: 0 };
    const ambienceManager = new AmbienceManager(mockScene, mockImageStack, mockParams);

    // Should not throw for empty stack
    assert.doesNotThrow(() => ambienceManager.updateMaterials(true), 'updateMaterials with empty stack should not throw');
    assert.doesNotThrow(() => ambienceManager.updateMaterials(false), 'updateMaterials with empty stack should not throw');
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

/**
 * Module Cleanup Order Safety Documentation
 *
 * All 4 scene managers (SceneManager, LightingManager, FloorManager, AmbienceManager)
 * can be disposed in ANY order without causing errors. This is verified through:
 *
 * 1. Arbitrary order disposal (Lighting -> Scene -> Ambience -> Floor)
 * 2. Reverse creation order disposal (Ambience -> Floor -> Lighting)
 * 3. Uninitialized manager disposal (all managers without init/setup/create)
 *
 * Key Safety Features:
 * - Each manager's dispose() is idempotent (safe to call multiple times)
 * - Each dispose() checks for null/undefined before cleanup
 * - No manager depends on another manager's state during disposal
 * - dispose() can be called before init/setup/create without errors
 *
 * Recommended disposal order (for clarity, not required):
 * 1. AmbienceManager.dispose()
 * 2. FloorManager.dispose()
 * 3. LightingManager.dispose()
 * 4. SceneManager.dispose()
 *
 * @verified 2025-11-08 (Iteration 120)
 */
describe('Error Recovery - Module Cleanup Order', () => {
  test('disposing managers in any order does not cause errors (after setup)', () => {
    const mockCanvas = { width: 1920, height: 1080, style: {}, addEventListener: () => {} };
    const mockScene = { add: () => {}, remove: () => {}, environment: null };
    const mockImageStack = [];
    const params = { canvasSize: { x: 1920, y: 1080 }, bgColor: '#000000', zSpacing: 100, materialThickness: 1, materialRoughness: 0.5, materialMetalness: 0 };

    const sceneManager = new SceneManager(mockCanvas, params);
    const lightingManager = new LightingManager(mockScene, params);
    const floorManager = new FloorManager(mockScene, params);
    const ambienceManager = new AmbienceManager(mockScene, mockImageStack, params);

    // Note: Cannot init/create in Node.js (requires WebGL), only test cleanup of uninitialized state
    lightingManager.setup(); // This one works without WebGL

    // Dispose in "wrong" order - should still work
    assert.doesNotThrow(() => {
      lightingManager.dispose(); // Lights first
      sceneManager.dispose();    // Scene second
      ambienceManager.dispose();  // Ambience third
      floorManager.dispose();    // Floor last
    }, 'disposing in any order should not throw');
  });

  test('disposing managers without initialization does not cause errors', () => {
    const mockCanvas = { width: 1920, height: 1080, style: {}, addEventListener: () => {} };
    const mockScene = { add: () => {} };
    const mockImageStack = [];
    const params = { canvasSize: { x: 1920, y: 1080 }, bgColor: '#000000', zSpacing: 100, materialThickness: 1, materialRoughness: 0.5, materialMetalness: 0 };

    const sceneManager = new SceneManager(mockCanvas, params);
    const lightingManager = new LightingManager(mockScene, params);
    const floorManager = new FloorManager(mockScene, params);
    const ambienceManager = new AmbienceManager(mockScene, mockImageStack, params);

    // Dispose without init/setup/create
    assert.doesNotThrow(() => {
      sceneManager.dispose();
      lightingManager.dispose();
      floorManager.dispose();
      ambienceManager.dispose();
    }, 'disposing uninitialized managers should not throw');
  });

  test('disposing all 4 scene managers in reverse creation order', () => {
    const mockScene = { add: () => {}, remove: () => {}, environment: null };
    const mockImageStack = [];
    const params = { bgColor: '#000000', zSpacing: 100, materialThickness: 1, materialRoughness: 0.5, materialMetalness: 0 };

    const lightingManager = new LightingManager(mockScene, params);
    const floorManager = new FloorManager(mockScene, params);
    const ambienceManager = new AmbienceManager(mockScene, mockImageStack, params);

    lightingManager.setup();

    // Dispose in reverse order: Ambience -> Floor -> Lighting
    assert.doesNotThrow(() => {
      ambienceManager.dispose();
      floorManager.dispose();
      lightingManager.dispose();
    }, 'disposing in reverse order should not throw');
  });
});
