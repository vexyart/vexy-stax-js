// this_file: tests/core_constants.test.js
/**
 * Test Suite: Core - Constants
 *
 * Purpose: Validates all configuration constants exported from constants.js,
 * including material presets, viewpoints, lighting, floor, events, and
 * numeric constants. Ensures all values are within valid ranges.
 *
 * Modules Tested:
 * - src/core/constants.js (all exported constants and configurations)
 *
 * Test Count: 30 tests
 */

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
    EVENTS,
    TOAST_DURATION_ERROR,
    TOAST_DURATION_WARNING,
    TOAST_DURATION_INFO,
    CAMERA_FAR_PLANE,
    Z_INDEX_MODAL,
    BYTES_PER_MB
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

// Configuration validation tests

test('MATERIAL_PRESETS all have values in valid PBR ranges', () => {
    Object.entries(MATERIAL_PRESETS).forEach(([name, preset]) => {
        assert.ok(preset.roughness >= 0 && preset.roughness <= 1,
            `${name}: roughness must be 0-1, got ${preset.roughness}`);
        assert.ok(preset.metalness >= 0 && preset.metalness <= 1,
            `${name}: metalness must be 0-1, got ${preset.metalness}`);
        assert.ok(preset.thickness >= 1 && preset.thickness <= 50,
            `${name}: thickness must be 1-50, got ${preset.thickness}`);
        assert.ok(preset.borderWidth >= 0 && preset.borderWidth <= 20,
            `${name}: borderWidth must be 0-20, got ${preset.borderWidth}`);
    });
});

test('MATERIAL_PRESETS has expected preset names', () => {
    const requiredPresets = [
        'flat-matte', 'glossy-photo', 'plastic-card', 'thick-board',
        'metal-sheet', 'glass-slide', '3d-box', 'metallic-card'
    ];

    requiredPresets.forEach(name => {
        assert.ok(MATERIAL_PRESETS[name],
            `Missing required material preset: ${name}`);
    });
});

test('VIEWPOINT_PRESETS have valid coordinate ranges', () => {
    Object.entries(VIEWPOINT_PRESETS).forEach(([name, preset]) => {
        if (preset === null || preset === 'fitToFrame') {
            return; // Skip special values
        }

        const { x, y, z } = preset;
        assert.ok(typeof x === 'number' && Number.isFinite(x),
            `${name}: x must be finite number, got ${x}`);
        assert.ok(typeof y === 'number' && Number.isFinite(y),
            `${name}: y must be finite number, got ${y}`);
        assert.ok(typeof z === 'number' && Number.isFinite(z),
            `${name}: z must be finite number, got ${z}`);

        // Reasonable bounds check (camera shouldn't be insanely far)
        const distance = Math.sqrt(x * x + y * y + z * z);
        assert.ok(distance < 10000,
            `${name}: camera distance ${distance} seems unreasonably large`);
    });
});

test('VIEWPOINT_PRESETS has expected viewpoint names', () => {
    const requiredViewpoints = [
        'front', 'top', 'beauty', 'side', '3d-stack', 'center', 'isometric'
    ];

    requiredViewpoints.forEach(name => {
        assert.ok(VIEWPOINT_PRESETS.hasOwnProperty(name),
            `Missing required viewpoint preset: ${name}`);
    });
});

test('SoftReflectorShader uniforms match constant definitions', () => {
    assert.equal(typeof SoftReflectorShader, 'object', 'SoftReflectorShader should be defined');
    assert.ok(SoftReflectorShader.uniforms, 'Shader should have uniforms');
    assert.ok(SoftReflectorShader.uniforms.opacity, 'Shader should have opacity uniform');

    const defaultOpacity = SoftReflectorShader.uniforms.opacity.value;
    assert.equal(defaultOpacity, REFLECTION_OPACITY,
        `Shader opacity uniform (${defaultOpacity}) should match REFLECTION_OPACITY constant (${REFLECTION_OPACITY})`);
});

test('Lighting intensity ranges are valid', () => {
    assert.ok(AMBIENT_INTENSITY_RANGE.min >= 0,
        'Ambient min intensity must be non-negative');
    assert.ok(AMBIENT_INTENSITY_RANGE.max <= 1,
        'Ambient max intensity should not exceed 1');
    assert.ok(AMBIENT_INTENSITY_RANGE.min < AMBIENT_INTENSITY_RANGE.max,
        'Ambient min must be less than max');

    assert.ok(EMISSIVE_INTENSITY_RANGE.min >= 0,
        'Emissive min intensity must be non-negative');
    assert.ok(EMISSIVE_INTENSITY_RANGE.max <= 5,
        'Emissive max intensity should be reasonable (<= 5)');
    assert.ok(EMISSIVE_INTENSITY_RANGE.min < EMISSIVE_INTENSITY_RANGE.max,
        'Emissive min must be less than max');
});

test('Light settings have valid coordinates and properties', () => {
    // Main light
    assert.equal(typeof MAIN_LIGHT_SETTINGS.intensity, 'number');
    assert.ok(MAIN_LIGHT_SETTINGS.intensity > 0, 'Main light intensity should be positive');
    assert.ok(typeof MAIN_LIGHT_SETTINGS.position === 'object', 'Main light position should be object');
    assert.ok(typeof MAIN_LIGHT_SETTINGS.position.x === 'number', 'Position.x should be number');
    assert.ok(typeof MAIN_LIGHT_SETTINGS.position.y === 'number', 'Position.y should be number');
    assert.ok(typeof MAIN_LIGHT_SETTINGS.position.z === 'number', 'Position.z should be number');

    // Fill light
    assert.equal(typeof FILL_LIGHT_SETTINGS.intensity, 'number');
    assert.ok(FILL_LIGHT_SETTINGS.intensity > 0, 'Fill light intensity should be positive');
    assert.ok(typeof FILL_LIGHT_SETTINGS.position === 'object', 'Fill light position should be object');
    assert.ok(typeof FILL_LIGHT_SETTINGS.position.x === 'number', 'Fill position.x should be number');

    // Hemisphere light
    assert.equal(typeof HEMISPHERE_LIGHT_SETTINGS.skyColor, 'number');
    assert.equal(typeof HEMISPHERE_LIGHT_SETTINGS.groundColor, 'number');
    assert.equal(typeof HEMISPHERE_LIGHT_SETTINGS.intensity, 'number');
});

test('ORTHO_FRUSTUM_SIZE is reasonable for orthographic projection', () => {
    assert.equal(typeof ORTHO_FRUSTUM_SIZE, 'number');
    assert.ok(ORTHO_FRUSTUM_SIZE > 0, 'Frustum size must be positive');
    assert.ok(ORTHO_FRUSTUM_SIZE < 10000, 'Frustum size should be reasonable');
});

test('Light settings nested objects are deeply frozen', () => {
    // MAIN_LIGHT_SETTINGS - top level frozen
    assert.ok(Object.isFrozen(MAIN_LIGHT_SETTINGS), 'MAIN_LIGHT_SETTINGS should be frozen');

    // position object frozen
    assert.ok(Object.isFrozen(MAIN_LIGHT_SETTINGS.position),
        'MAIN_LIGHT_SETTINGS.position should be frozen');
    assert.throws(() => {
        MAIN_LIGHT_SETTINGS.position.x = 999;
    }, 'Cannot mutate frozen position.x');

    // shadow object frozen
    assert.ok(Object.isFrozen(MAIN_LIGHT_SETTINGS.shadow),
        'MAIN_LIGHT_SETTINGS.shadow should be frozen');
    assert.throws(() => {
        MAIN_LIGHT_SETTINGS.shadow.mapSize = 999;
    }, 'Cannot mutate frozen shadow.mapSize');

    // shadow.camera nested object frozen
    assert.ok(Object.isFrozen(MAIN_LIGHT_SETTINGS.shadow.camera),
        'MAIN_LIGHT_SETTINGS.shadow.camera should be frozen');
    assert.throws(() => {
        MAIN_LIGHT_SETTINGS.shadow.camera.near = 999;
    }, 'Cannot mutate frozen shadow.camera.near');
});

test('FILL_LIGHT_SETTINGS nested objects are frozen', () => {
    assert.ok(Object.isFrozen(FILL_LIGHT_SETTINGS), 'FILL_LIGHT_SETTINGS should be frozen');
    assert.ok(Object.isFrozen(FILL_LIGHT_SETTINGS.position),
        'FILL_LIGHT_SETTINGS.position should be frozen');

    assert.throws(() => {
        FILL_LIGHT_SETTINGS.position.y = 999;
    }, 'Cannot mutate frozen fill light position.y');
});

test('HEMISPHERE_LIGHT_SETTINGS is frozen', () => {
    assert.ok(Object.isFrozen(HEMISPHERE_LIGHT_SETTINGS),
        'HEMISPHERE_LIGHT_SETTINGS should be frozen');

    assert.throws(() => {
        HEMISPHERE_LIGHT_SETTINGS.intensity = 999;
    }, 'Cannot mutate frozen hemisphere intensity');
});

test('FLOOR_BASE_MATERIAL is frozen', () => {
    assert.ok(Object.isFrozen(FLOOR_BASE_MATERIAL),
        'FLOOR_BASE_MATERIAL should be frozen');

    assert.throws(() => {
        FLOOR_BASE_MATERIAL.roughness = 999;
    }, 'Cannot mutate frozen floor material roughness');
});

test('EVENTS object is frozen', () => {
    assert.ok(Object.isFrozen(EVENTS), 'EVENTS should be frozen');

    assert.throws(() => {
        EVENTS.BACKGROUND_CHANGED = 'hacked';
    }, 'Cannot mutate frozen event constant');
});

// Tests for Iteration 13 constants (added 2025-11-05)
test('TOAST_DURATION constants have correct values', () => {
    assert.strictEqual(TOAST_DURATION_ERROR, 5000, 'Error toast duration should be 5000ms');
    assert.strictEqual(TOAST_DURATION_WARNING, 4000, 'Warning toast duration should be 4000ms');
    assert.strictEqual(TOAST_DURATION_INFO, 3000, 'Info toast duration should be 3000ms');
});

test('TOAST_DURATION constants are numbers', () => {
    assert.strictEqual(typeof TOAST_DURATION_ERROR, 'number', 'ERROR should be number');
    assert.strictEqual(typeof TOAST_DURATION_WARNING, 'number', 'WARNING should be number');
    assert.strictEqual(typeof TOAST_DURATION_INFO, 'number', 'INFO should be number');
});

test('CAMERA_FAR_PLANE has correct value', () => {
    assert.strictEqual(CAMERA_FAR_PLANE, 5000, 'Camera far plane should be 5000');
    assert.strictEqual(typeof CAMERA_FAR_PLANE, 'number', 'Should be number');
});

test('Z_INDEX_MODAL has correct value', () => {
    assert.strictEqual(Z_INDEX_MODAL, 10000, 'Modal z-index should be 10000');
    assert.strictEqual(typeof Z_INDEX_MODAL, 'number', 'Should be number');
});

test('BYTES_PER_MB has correct value', () => {
    assert.strictEqual(BYTES_PER_MB, 1048576, 'Bytes per MB should be 1048576 (1024 * 1024)');
    assert.strictEqual(BYTES_PER_MB, 1024 * 1024, 'Should equal 1024 * 1024');
    assert.strictEqual(typeof BYTES_PER_MB, 'number', 'Should be number');
});

test('File size constants have valid values', async () => {
    const { FILE_SIZE_WARN_MB, FILE_SIZE_REJECT_MB } = await import('../src/core/constants.js');

    assert.strictEqual(typeof FILE_SIZE_WARN_MB, 'number', 'FILE_SIZE_WARN_MB should be number');
    assert.strictEqual(typeof FILE_SIZE_REJECT_MB, 'number', 'FILE_SIZE_REJECT_MB should be number');
    assert.strictEqual(FILE_SIZE_WARN_MB, 10, 'Warning threshold should be 10MB');
    assert.strictEqual(FILE_SIZE_REJECT_MB, 50, 'Rejection threshold should be 50MB');
    assert.ok(FILE_SIZE_WARN_MB < FILE_SIZE_REJECT_MB, 'Warning should be less than rejection threshold');
});

test('History and FPS constants have valid values', async () => {
    const { MAX_HISTORY, FPS_WARNING_THRESHOLD } = await import('../src/core/constants.js');

    assert.strictEqual(MAX_HISTORY, 10, 'Max history should be 10 states');
    assert.strictEqual(FPS_WARNING_THRESHOLD, 30, 'FPS warning threshold should be 30');
    assert.ok(MAX_HISTORY > 0, 'Max history must be positive');
    assert.ok(FPS_WARNING_THRESHOLD > 0 && FPS_WARNING_THRESHOLD < 60, 'FPS threshold should be between 0 and 60');
});

test('Memory warning constants have valid values', async () => {
    const { MEMORY_WARNING_COOLDOWN } = await import('../src/core/constants.js');

    assert.strictEqual(MEMORY_WARNING_COOLDOWN, 30000, 'Memory warning cooldown should be 30000ms (30 seconds)');
    assert.strictEqual(typeof MEMORY_WARNING_COOLDOWN, 'number', 'Should be number');
});

test('Floor constants have valid values', async () => {
    const { FLOOR_Y, FLOOR_SIZE, FLOOR_REFLECTOR_OFFSET } = await import('../src/core/constants.js');

    assert.strictEqual(FLOOR_Y, -250, 'Floor Y position should be -250');
    assert.strictEqual(FLOOR_SIZE, 2000, 'Floor size should be 2000');
    assert.strictEqual(FLOOR_REFLECTOR_OFFSET, 0.1, 'Floor reflector offset should be 0.1');
    assert.ok(FLOOR_Y < 0, 'Floor should be below origin');
    assert.ok(FLOOR_SIZE > 0, 'Floor size must be positive');
});

test('Reflection constants have valid values', async () => {
    const {
        REFLECTION_TEXTURE_BASE,
        REFLECTION_MIN_RESOLUTION,
        REFLECTION_BLUR_RADIUS,
        REFLECTION_FADE_STRENGTH
    } = await import('../src/core/constants.js');

    assert.strictEqual(REFLECTION_TEXTURE_BASE, 0.65, 'Texture base should be 0.65');
    assert.strictEqual(REFLECTION_MIN_RESOLUTION, 512, 'Min resolution should be 512');
    assert.strictEqual(REFLECTION_BLUR_RADIUS, 0.003, 'Blur radius should be 0.003');
    assert.strictEqual(REFLECTION_FADE_STRENGTH, 2.7, 'Fade strength should be 2.7');
    assert.ok(REFLECTION_TEXTURE_BASE > 0 && REFLECTION_TEXTURE_BASE < 1, 'Texture base should be 0-1');
    assert.ok(REFLECTION_MIN_RESOLUTION > 0, 'Min resolution must be positive');
});

test('Loading and dimension constants have valid values', async () => {
    const { MAX_LOAD_RETRIES, MAX_DIMENSION_PX, DEBOUNCE_DELAY_MS } = await import('../src/core/constants.js');

    assert.strictEqual(MAX_LOAD_RETRIES, 3, 'Max retries should be 3');
    assert.strictEqual(MAX_DIMENSION_PX, 4096, 'Max dimension should be 4096px');
    assert.strictEqual(DEBOUNCE_DELAY_MS, 150, 'Debounce delay should be 150ms');
    assert.ok(MAX_LOAD_RETRIES > 0, 'Max retries must be positive');
    assert.ok(MAX_DIMENSION_PX > 0, 'Max dimension must be positive');
    assert.ok(DEBOUNCE_DELAY_MS > 0, 'Debounce delay must be positive');
});
