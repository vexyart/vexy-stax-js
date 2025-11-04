// this_file: tests/core_constants.test.js
import test from 'node:test';
import assert from 'node:assert/strict';

import {
    createDefaultParams,
    MATERIAL_PRESETS,
    VIEWPOINT_PRESETS,
    RETRY_DELAYS_MS,
    REFLECTION_OPACITY,
    SoftReflectorShader
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
