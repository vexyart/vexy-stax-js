// tests/scene_managers.test.js
// this_file: tests/scene_managers.test.js

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
    assert.strictEqual(manager.floorGroup, null, 'Floor group should be null before create');
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
