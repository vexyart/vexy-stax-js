// this_file: tests/core_constants.test.js
import test from 'node:test';
import assert from 'node:assert/strict';

import {
    createDefaultParams,
    MATERIAL_PRESETS,
    VIEWPOINT_PRESETS,
    RETRY_DELAYS_MS,
    REFLECTION_OPACITY,
    SoftReflectorShader,
    AMBIENT_INTENSITY_RANGE,
    EMISSIVE_INTENSITY_RANGE,
    ORTHO_FRUSTUM_SIZE,
    MAIN_LIGHT_SETTINGS,
    FILL_LIGHT_SETTINGS,
    HEMISPHERE_LIGHT_SETTINGS,
    FLOOR_BASE_MATERIAL,
    FLOOR_REFLECTOR_OFFSET,
    EVENTS
} from '../src/core/constants.js';

test('createDefaultParams returns a deep clone each call', () => {
    const first = createDefaultParams();
    const second = createDefaultParams();

    assert.notStrictEqual(first, second, 'calls should return new objects');
    assert.notStrictEqual(first.canvasSize, second.canvasSize, 'nested objects should be cloned');

    first.canvasSize.x = 123;
    first.materialPreset = 'glass-slide';

    assert.equal(second.canvasSize.x, 1920, 'mutating one instance must not affect another');
    assert.equal(second.materialPreset, 'metallic-card', 'defaults should remain intact on other clones');
});

test('material presets expose expected schema and are frozen', () => {
    assert.equal(Object.isFrozen(MATERIAL_PRESETS), true, 'material preset map should be frozen');

    Object.values(MATERIAL_PRESETS).forEach((preset) => {
        assert.equal(typeof preset.roughness, 'number', 'roughness must be numeric');
        assert.equal(typeof preset.metalness, 'number', 'metalness must be numeric');
        assert.equal(typeof preset.thickness, 'number', 'thickness must be numeric');
        assert.equal(typeof preset.borderWidth, 'number', 'borderWidth must be numeric');
    });
});

test('viewpoint presets include fit-to-frame sentinel for front view', () => {
    assert.equal(VIEWPOINT_PRESETS.front, 'fitToFrame', 'front preset should request fit-to-frame calculation');
    assert.equal(VIEWPOINT_PRESETS.center, null, 'center preset should be null to reuse current camera state');
});

test('retry delays array is immutable', () => {
    assert.equal(Object.isFrozen(RETRY_DELAYS_MS), true, 'retry delay list should be frozen');

    const snapshot = [...RETRY_DELAYS_MS];
    // Attempt mutation; should be ignored when frozen.
    try {
        RETRY_DELAYS_MS[0] = 9999;
    } catch {
        // Ignore TypeError on strict runtimes.
    }

    assert.deepStrictEqual(RETRY_DELAYS_MS, snapshot, 'frozen array should not reflect attempted mutations');
});

test('SoftReflectorShader carries default opacity from constants', () => {
    assert.equal(
        SoftReflectorShader.uniforms.opacity.value,
        REFLECTION_OPACITY,
        'shader opacity uniform should reuse constant value'
    );
});

test('lighting configuration constants are frozen and expose expected ranges', () => {
    assert.equal(Object.isFrozen(AMBIENT_INTENSITY_RANGE), true, 'ambient intensity range should be frozen');
    assert.equal(AMBIENT_INTENSITY_RANGE.min, 0.5, 'ambient intensity minimum should remain 0.5');
    assert.equal(AMBIENT_INTENSITY_RANGE.max, 0.8, 'ambient intensity maximum should remain 0.8');

    assert.equal(Object.isFrozen(EMISSIVE_INTENSITY_RANGE), true, 'emissive intensity range should be frozen');
    assert.equal(EMISSIVE_INTENSITY_RANGE.min, 0.05, 'emissive minimum must stay 0.05');
    assert.equal(EMISSIVE_INTENSITY_RANGE.max, 0.25, 'emissive maximum must stay 0.25');

    assert.equal(ORTHO_FRUSTUM_SIZE, 600, 'orthographic frustum size should match legacy tuning');

    assert.equal(Object.isFrozen(MAIN_LIGHT_SETTINGS), true, 'main light settings should be frozen');
    assert.equal(
        MAIN_LIGHT_SETTINGS.intensity,
        Math.PI * 0.4,
        'main light intensity should retain tuned multiplier'
    );
    assert.deepStrictEqual(
        MAIN_LIGHT_SETTINGS.position,
        { x: 5, y: 10, z: 7 },
        'main light position should remain unchanged'
    );
    assert.equal(
        MAIN_LIGHT_SETTINGS.shadow.mapSize,
        4096,
        'shadow map size should stay high resolution'
    );
    assert.equal(MAIN_LIGHT_SETTINGS.shadow.camera.near, 0.5, 'shadow camera near plane should remain 0.5');
    assert.equal(MAIN_LIGHT_SETTINGS.shadow.camera.far, 500, 'shadow camera far plane should remain 500');
    assert.equal(
        MAIN_LIGHT_SETTINGS.shadow.bias,
        -0.0001,
        'shadow bias should preserve flicker prevention value'
    );
    assert.equal(
        MAIN_LIGHT_SETTINGS.shadow.normalBias,
        0.05,
        'shadow normal bias should preserve acne mitigation value'
    );
    assert.equal(MAIN_LIGHT_SETTINGS.shadow.radius, 6, 'shadow radius should remain 6');
    assert.equal(MAIN_LIGHT_SETTINGS.shadow.blurSamples, 16, 'shadow blur samples should remain 16');

    assert.equal(Object.isFrozen(FILL_LIGHT_SETTINGS), true, 'fill light settings should be frozen');
    assert.deepStrictEqual(
        FILL_LIGHT_SETTINGS,
        {
            intensity: Math.PI * 0.15,
            position: { x: -5, y: 5, z: -5 }
        },
        'fill light configuration should match tuned defaults'
    );

    assert.equal(Object.isFrozen(HEMISPHERE_LIGHT_SETTINGS), true, 'hemisphere light settings must be frozen');
    assert.deepStrictEqual(
        HEMISPHERE_LIGHT_SETTINGS,
        { skyColor: 0xffffff, groundColor: 0x444444, intensity: 0.3 },
        'hemisphere light colors/intensity should persist'
    );
});

test('floor material constants stay frozen with expected values', () => {
    assert.equal(Object.isFrozen(FLOOR_BASE_MATERIAL), true, 'floor base material constants must be frozen');
    assert.equal(FLOOR_BASE_MATERIAL.roughness, 0.45, 'floor roughness baseline must remain 0.45');
    assert.equal(FLOOR_BASE_MATERIAL.metalness, 0.08, 'floor metalness baseline must remain 0.08');
    assert.equal(FLOOR_BASE_MATERIAL.envMapIntensity, 0.35, 'floor envMap intensity must remain 0.35');
    assert.equal(FLOOR_REFLECTOR_OFFSET, 0.1, 'floor reflector offset should remain 0.1');
});

test('event channel constants are defined and frozen', () => {
    assert.equal(Object.isFrozen(EVENTS), true, 'event name registry should be frozen');
    assert.equal(
        EVENTS.backgroundChanged,
        'background:changed',
        'backgroundChanged event should retain semantic name'
    );
    assert.equal(EVENTS.stackUpdated, 'stack:updated', 'stackUpdated event should retain semantic name');
    assert.equal(EVENTS.cameraUpdated, 'camera:updated', 'cameraUpdated event should retain semantic name');
});
