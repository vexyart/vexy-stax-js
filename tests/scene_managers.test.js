// tests/scene_managers.test.js
// this_file: tests/scene_managers.test.js
/**
 * Test Suite: Scene Managers
 *
 * Purpose: Tests the public API and export structure of Scene, Lighting,
 * and Floor manager classes. Validates that all managers expose expected
 * methods and properties for proper initialization and cleanup.
 *
 * Modules Tested:
 * - src/scene/SceneManager.js
 * - src/scene/LightingManager.js (including getAdaptiveEmissiveIntensity)
 * - src/scene/FloorManager.js
 *
 * Test Count: 8 tests
 * @lastTested 2025-11-05 (Iteration 92)
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Unit tests for scene manager modules
 * These tests verify the extracted scene modules work correctly
 */

// Note: Full Three.js integration tests require a WebGL context
// These tests focus on module structure, exports, and basic logic

test('LightingManager exports getAdaptiveEmissiveIntensity function', () => {
    // Dynamic import to test ES module structure
    import('../src/scene/LightingManager.js').then((module) => {
        assert.ok(module.getAdaptiveEmissiveIntensity, 'getAdaptiveEmissiveIntensity should be exported');
        assert.strictEqual(typeof module.getAdaptiveEmissiveIntensity, 'function', 'Should export a function');
    });
});

test('getAdaptiveEmissiveIntensity returns values in expected range', async () => {
    const { getAdaptiveEmissiveIntensity } = await import('../src/scene/LightingManager.js');

    // Test with dark background (luminance 0)
    const darkResult = getAdaptiveEmissiveIntensity(0);
    assert.ok(darkResult >= 0 && darkResult <= 1, 'Should return value between 0 and 1 for dark bg');
    assert.ok(darkResult > 0.2, 'Dark backgrounds should get higher emissive intensity');

    // Test with bright background (luminance 1)
    const brightResult = getAdaptiveEmissiveIntensity(1);
    assert.ok(brightResult >= 0 && brightResult <= 1, 'Should return value between 0 and 1 for bright bg');
    assert.ok(brightResult < 0.1, 'Bright backgrounds should get lower emissive intensity');

    // Test with mid-range background (luminance 0.5)
    const midResult = getAdaptiveEmissiveIntensity(0.5);
    assert.ok(midResult > brightResult && midResult < darkResult, 'Mid-range should be between dark and bright');
});

test('getAdaptiveEmissiveIntensity has inverse relationship with luminance', async () => {
    const { getAdaptiveEmissiveIntensity } = await import('../src/scene/LightingManager.js');

    const result1 = getAdaptiveEmissiveIntensity(0.2);
    const result2 = getAdaptiveEmissiveIntensity(0.8);

    assert.ok(result1 > result2, 'Lower luminance should produce higher emissive intensity');
});

test('calculateLuminance reports 0 for black and 1 for white backgrounds', async () => {
    const { calculateLuminance } = await import('../src/scene/LightingManager.js');

    const black = calculateLuminance('#000000');
    const white = calculateLuminance('#ffffff');

    assert.strictEqual(black, 0, 'Black should yield luminance 0');
    assert.ok(white > 0.99 && white <= 1, 'White should approach luminance 1');
});

test('LightingManager class exports with expected structure', async () => {
    const { LightingManager } = await import('../src/scene/LightingManager.js');

    assert.ok(LightingManager, 'LightingManager class should be exported');
    assert.strictEqual(typeof LightingManager, 'function', 'LightingManager should be a class/function');

    // Check constructor can be called (without Three.js scene)
    const mockScene = { add: () => {}, remove: () => {} };
    const mockParams = { bgColor: '#000000' };

    const manager = new LightingManager(mockScene, mockParams);
    assert.ok(manager, 'Should be able to instantiate LightingManager');
    assert.strictEqual(manager.scene, mockScene, 'Should store scene reference');
    assert.strictEqual(manager.params, mockParams, 'Should store params reference');
});

test('SceneManager class exports with expected structure', async () => {
    const { SceneManager } = await import('../src/scene/SceneManager.js');

    assert.ok(SceneManager, 'SceneManager class should be exported');
    assert.strictEqual(typeof SceneManager, 'function', 'SceneManager should be a class/function');

    // Check constructor can be called with mock canvas
    const mockCanvas = {
        width: 1920,
        height: 1080,
        style: {},
        addEventListener: () => {}
    };
    const mockParams = { bgColor: '#000000', canvasSize: { x: 1920, y: 1080 } };

    const manager = new SceneManager(mockCanvas, mockParams);
    assert.ok(manager, 'Should be able to instantiate SceneManager');
    assert.strictEqual(manager.canvas, mockCanvas, 'Should store canvas reference');
    assert.strictEqual(manager.params, mockParams, 'Should store params reference');
    assert.strictEqual(manager.scene, null, 'Scene should be null before init');
    assert.strictEqual(manager.renderer, null, 'Renderer should be null before init');
});

test('FloorManager class exports with expected structure', async () => {
    const { FloorManager } = await import('../src/scene/FloorManager.js');

    assert.ok(FloorManager, 'FloorManager class should be exported');
    assert.strictEqual(typeof FloorManager, 'function', 'FloorManager should be a class/function');

    // Check constructor can be called
    const mockScene = { add: () => {}, remove: () => {} };
    const mockParams = { bgColor: '#000000' };

    const manager = new FloorManager(mockScene, mockParams);
    assert.ok(manager, 'Should be able to instantiate FloorManager');
    assert.strictEqual(manager.scene, mockScene, 'Should store scene reference');
    assert.strictEqual(manager.params, mockParams, 'Should store params reference');
    assert.strictEqual(manager.floor, null, 'Floor should be null before create');
});

test('FloorManager.updateColor is a no-op for simplified floor', async () => {
    const { FloorManager } = await import('../src/scene/FloorManager.js');

    const mockScene = { add: () => {}, remove: () => {} };
    const manager = new FloorManager(mockScene, { bgColor: '#101010' });

    // updateColor should not throw and should be safe to call
    assert.doesNotThrow(() => manager.updateColor('#222222'), 'updateColor should not throw');
});

test('FloorManager isActive returns false before create', async () => {
    const { FloorManager } = await import('../src/scene/FloorManager.js');

    const mockScene = { add: () => {}, remove: () => {} };
    const mockParams = { bgColor: '#000000' };
    const manager = new FloorManager(mockScene, mockParams);

    assert.strictEqual(manager.isActive(), false, 'Should return false when no floor exists');
});

test('Scene managers have dispose methods', async () => {
    const { SceneManager } = await import('../src/scene/SceneManager.js');
    const { LightingManager } = await import('../src/scene/LightingManager.js');
    const { FloorManager } = await import('../src/scene/FloorManager.js');

    const mockCanvas = {
        width: 1920,
        height: 1080,
        style: {},
        addEventListener: () => {}
    };
    const mockScene = { add: () => {}, remove: () => {}, clear: () => {}, environment: null };
    const mockParams = { bgColor: '#000000', canvasSize: { x: 1920, y: 1080 } };

    const sceneManager = new SceneManager(mockCanvas, mockParams);
    const lightingManager = new LightingManager(mockScene, mockParams);
    const floorManager = new FloorManager(mockScene, mockParams);

    assert.strictEqual(typeof sceneManager.dispose, 'function', 'SceneManager should have dispose method');
    assert.strictEqual(typeof lightingManager.dispose, 'function', 'LightingManager should have dispose method');
    assert.strictEqual(typeof floorManager.dispose, 'function', 'FloorManager should have dispose method');

    // Should not throw when called
    assert.doesNotThrow(() => sceneManager.dispose(), 'SceneManager.dispose should not throw');
    assert.doesNotThrow(() => lightingManager.dispose(), 'LightingManager.dispose should not throw');
    assert.doesNotThrow(() => floorManager.dispose(), 'FloorManager.dispose should not throw');
});

// ============================================================
// FloorManager color normalization tests (added 2025-12-22)
// Tests the #normalizeColorComponent private method behavior
// via the public updateColor() API
// ============================================================

test('FloorManager_updateColor_when_colorIs0to255_then_normalizesCorrectly', async () => {
    const { FloorManager } = await import('../src/scene/FloorManager.js');

    let capturedColor = null;
    const mockScene = { add: () => {}, remove: () => {} };
    // 0-255 format: red (255, 0, 0) with alpha 0.5
    const mockParams = {
        floorColor: { r: 255, g: 128, b: 0, a: 0.5 }
    };

    const manager = new FloorManager(mockScene, mockParams);

    // Create a mock floor mesh to test updateColor behavior
    manager.floor = {
        material: {
            color: {
                setRGB: (r, g, b) => {
                    capturedColor = { r, g, b };
                }
            },
            opacity: 1,
            needsUpdate: false
        }
    };

    manager.updateColor();

    // 0-255 values should be normalized to 0-1
    assert.ok(capturedColor, 'setRGB should have been called');
    assert.ok(Math.abs(capturedColor.r - 1.0) < 0.01, 'r=255 should normalize to 1.0');
    assert.ok(Math.abs(capturedColor.g - 0.502) < 0.01, 'g=128 should normalize to ~0.5');
    assert.ok(Math.abs(capturedColor.b - 0) < 0.01, 'b=0 should normalize to 0');
});

test('FloorManager_updateColor_when_colorIs0to1_then_passesThrough', async () => {
    const { FloorManager } = await import('../src/scene/FloorManager.js');

    let capturedColor = null;
    const mockScene = { add: () => {}, remove: () => {} };
    // 0-1 format (already normalized)
    const mockParams = {
        floorColor: { r: 0.8, g: 0.5, b: 0.2, a: 0.7 }
    };

    const manager = new FloorManager(mockScene, mockParams);

    manager.floor = {
        material: {
            color: {
                setRGB: (r, g, b) => {
                    capturedColor = { r, g, b };
                }
            },
            opacity: 1,
            needsUpdate: false
        }
    };

    manager.updateColor();

    // 0-1 values should pass through unchanged
    assert.ok(capturedColor, 'setRGB should have been called');
    assert.ok(Math.abs(capturedColor.r - 0.8) < 0.01, 'r=0.8 should remain 0.8');
    assert.ok(Math.abs(capturedColor.g - 0.5) < 0.01, 'g=0.5 should remain 0.5');
    assert.ok(Math.abs(capturedColor.b - 0.2) < 0.01, 'b=0.2 should remain 0.2');
});

test('FloorManager_updateColor_when_alphaProvided_then_setsOpacity', async () => {
    const { FloorManager } = await import('../src/scene/FloorManager.js');

    const mockScene = { add: () => {}, remove: () => {} };
    const mockParams = {
        floorColor: { r: 100, g: 100, b: 100, a: 0.42 }
    };

    const manager = new FloorManager(mockScene, mockParams);

    manager.floor = {
        material: {
            color: { setRGB: () => {} },
            opacity: 1,
            needsUpdate: false
        }
    };

    manager.updateColor();

    assert.strictEqual(manager.floor.material.opacity, 0.42, 'Opacity should be set from alpha');
    assert.strictEqual(manager.floor.material.needsUpdate, true, 'needsUpdate should be true');
});

test('FloorManager_updateColor_when_floorNull_then_silentNoOp', async () => {
    const { FloorManager } = await import('../src/scene/FloorManager.js');

    const mockScene = { add: () => {}, remove: () => {} };
    const mockParams = {
        floorColor: { r: 255, g: 0, b: 0, a: 1 }
    };

    const manager = new FloorManager(mockScene, mockParams);
    // floor is null by default

    // Should not throw
    assert.doesNotThrow(() => manager.updateColor(), 'updateColor should not throw when floor is null');
});

test('FloorManager_updateColor_when_floorColorMissing_then_usesDefault', async () => {
    const { FloorManager } = await import('../src/scene/FloorManager.js');

    let capturedColor = null;
    const mockScene = { add: () => {}, remove: () => {} };
    // No floorColor in params - should use default
    const mockParams = {};

    const manager = new FloorManager(mockScene, mockParams);

    manager.floor = {
        material: {
            color: {
                setRGB: (r, g, b) => {
                    capturedColor = { r, g, b };
                }
            },
            opacity: 1,
            needsUpdate: false
        }
    };

    manager.updateColor();

    // Default is { r: 236, g: 236, b: 236, a: 0.05 }
    assert.ok(capturedColor, 'setRGB should have been called with default color');
    assert.ok(Math.abs(capturedColor.r - 236 / 255) < 0.01, 'Should use default r=236');
    assert.ok(Math.abs(capturedColor.g - 236 / 255) < 0.01, 'Should use default g=236');
    assert.ok(Math.abs(capturedColor.b - 236 / 255) < 0.01, 'Should use default b=236');
    assert.strictEqual(manager.floor.material.opacity, 0.05, 'Should use default alpha=0.05');
});
