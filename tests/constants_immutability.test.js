// this_file: tests/constants_immutability.test.js
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
    MATERIAL_PRESETS,
    VIEWPOINT_PRESETS,
    RETRY_DELAYS_MS,
    AMBIENT_INTENSITY_RANGE,
    EMISSIVE_INTENSITY_RANGE,
    MAIN_LIGHT_SETTINGS,
    FILL_LIGHT_SETTINGS,
    HEMISPHERE_LIGHT_SETTINGS,
    FLOOR_BASE_MATERIAL,
    EVENTS
} from '../src/core/constants.js';

describe('Constants Immutability', () => {
    test('MATERIAL_PRESETS is frozen and cannot be mutated', () => {
        assert.ok(Object.isFrozen(MATERIAL_PRESETS), 'MATERIAL_PRESETS should be frozen');

        // Attempt to modify top-level object should fail silently in non-strict mode
        // or throw in strict mode
        const originalKey = 'flat-matte';
        const originalValue = MATERIAL_PRESETS[originalKey];

        assert.throws(() => {
            'use strict';
            MATERIAL_PRESETS['new-preset'] = { roughness: 0.5, metalness: 0.5, thickness: 1, borderWidth: 0 };
        }, TypeError, 'Adding new preset should throw in strict mode');

        assert.strictEqual(MATERIAL_PRESETS[originalKey], originalValue, 'Original preset should remain unchanged');
    });

    test('MATERIAL_PRESETS nested objects are NOT deeply frozen (documented limitation)', () => {
        const preset = MATERIAL_PRESETS['flat-matte'];
        const originalRoughness = preset.roughness;

        // Note: Object.freeze() is shallow - nested objects are mutable
        // This documents current behavior, not ideal behavior
        preset.roughness = 0.99;
        assert.strictEqual(preset.roughness, 0.99, 'Nested object properties can be mutated (shallow freeze only)');

        // Restore original value to prevent test pollution
        preset.roughness = originalRoughness;
    });

    test('VIEWPOINT_PRESETS is frozen and cannot be mutated', () => {
        assert.ok(Object.isFrozen(VIEWPOINT_PRESETS), 'VIEWPOINT_PRESETS should be frozen');

        assert.throws(() => {
            'use strict';
            VIEWPOINT_PRESETS['new-viewpoint'] = { x: 100, y: 100, z: 100 };
        }, TypeError, 'Adding new viewpoint should throw');
    });

    test('VIEWPOINT_PRESETS nested objects are NOT deeply frozen (documented limitation)', () => {
        const preset = VIEWPOINT_PRESETS.beauty;
        const originalX = preset.x;

        // Note: Object.freeze() is shallow - nested objects are mutable
        preset.x = 999;
        assert.strictEqual(preset.x, 999, 'Nested object properties can be mutated (shallow freeze only)');

        // Restore original value to prevent test pollution
        preset.x = originalX;
    });

    test('RETRY_DELAYS_MS array is frozen', () => {
        assert.ok(Object.isFrozen(RETRY_DELAYS_MS), 'RETRY_DELAYS_MS should be frozen');

        assert.throws(() => {
            'use strict';
            RETRY_DELAYS_MS[0] = 999;
        }, TypeError, 'Modifying array element should throw');

        assert.throws(() => {
            'use strict';
            RETRY_DELAYS_MS.push(5000);
        }, TypeError, 'Pushing to array should throw');
    });

    test('AMBIENT_INTENSITY_RANGE is frozen', () => {
        assert.ok(Object.isFrozen(AMBIENT_INTENSITY_RANGE), 'AMBIENT_INTENSITY_RANGE should be frozen');

        assert.throws(() => {
            'use strict';
            AMBIENT_INTENSITY_RANGE.min = 0.1;
        }, TypeError, 'Modifying min property should throw');

        assert.throws(() => {
            'use strict';
            AMBIENT_INTENSITY_RANGE.max = 0.9;
        }, TypeError, 'Modifying max property should throw');
    });

    test('EMISSIVE_INTENSITY_RANGE is frozen', () => {
        assert.ok(Object.isFrozen(EMISSIVE_INTENSITY_RANGE), 'EMISSIVE_INTENSITY_RANGE should be frozen');

        assert.throws(() => {
            'use strict';
            EMISSIVE_INTENSITY_RANGE.min = 0.1;
        }, TypeError, 'Modifying min property should throw');
    });

    test('MAIN_LIGHT_SETTINGS is frozen', () => {
        assert.ok(Object.isFrozen(MAIN_LIGHT_SETTINGS), 'MAIN_LIGHT_SETTINGS should be frozen');

        assert.throws(() => {
            'use strict';
            MAIN_LIGHT_SETTINGS.intensity = 5.0;
        }, TypeError, 'Modifying intensity should throw');
    });

    test('MAIN_LIGHT_SETTINGS nested position is frozen', () => {
        assert.ok(Object.isFrozen(MAIN_LIGHT_SETTINGS.position), 'position should be frozen');

        assert.throws(() => {
            'use strict';
            MAIN_LIGHT_SETTINGS.position.x = 999;
        }, TypeError, 'Modifying position.x should throw');
    });

    test('MAIN_LIGHT_SETTINGS nested shadow is frozen', () => {
        assert.ok(Object.isFrozen(MAIN_LIGHT_SETTINGS.shadow), 'shadow should be frozen');

        assert.throws(() => {
            'use strict';
            MAIN_LIGHT_SETTINGS.shadow.mapSize = 2048;
        }, TypeError, 'Modifying shadow.mapSize should throw');
    });

    test('MAIN_LIGHT_SETTINGS shadow camera is frozen', () => {
        assert.ok(Object.isFrozen(MAIN_LIGHT_SETTINGS.shadow.camera), 'shadow.camera should be frozen');

        assert.throws(() => {
            'use strict';
            MAIN_LIGHT_SETTINGS.shadow.camera.near = 1.0;
        }, TypeError, 'Modifying shadow.camera.near should throw');
    });

    test('FILL_LIGHT_SETTINGS is frozen', () => {
        assert.ok(Object.isFrozen(FILL_LIGHT_SETTINGS), 'FILL_LIGHT_SETTINGS should be frozen');

        assert.throws(() => {
            'use strict';
            FILL_LIGHT_SETTINGS.intensity = 2.0;
        }, TypeError, 'Modifying intensity should throw');
    });

    test('FILL_LIGHT_SETTINGS position is frozen', () => {
        assert.ok(Object.isFrozen(FILL_LIGHT_SETTINGS.position), 'position should be frozen');

        assert.throws(() => {
            'use strict';
            FILL_LIGHT_SETTINGS.position.x = 999;
        }, TypeError, 'Modifying position.x should throw');
    });

    test('HEMISPHERE_LIGHT_SETTINGS is frozen', () => {
        assert.ok(Object.isFrozen(HEMISPHERE_LIGHT_SETTINGS), 'HEMISPHERE_LIGHT_SETTINGS should be frozen');

        assert.throws(() => {
            'use strict';
            HEMISPHERE_LIGHT_SETTINGS.intensity = 0.5;
        }, TypeError, 'Modifying intensity should throw');
    });

    test('FLOOR_BASE_MATERIAL is frozen', () => {
        assert.ok(Object.isFrozen(FLOOR_BASE_MATERIAL), 'FLOOR_BASE_MATERIAL should be frozen');

        assert.throws(() => {
            'use strict';
            FLOOR_BASE_MATERIAL.roughness = 0.9;
        }, TypeError, 'Modifying roughness should throw');

        assert.throws(() => {
            'use strict';
            FLOOR_BASE_MATERIAL.metalness = 0.5;
        }, TypeError, 'Modifying metalness should throw');
    });

    test('EVENTS is frozen', () => {
        assert.ok(Object.isFrozen(EVENTS), 'EVENTS should be frozen');

        assert.throws(() => {
            'use strict';
            EVENTS.newEvent = 'new:event';
        }, TypeError, 'Adding new event should throw');

        assert.throws(() => {
            'use strict';
            EVENTS.backgroundChanged = 'modified:event';
        }, TypeError, 'Modifying existing event should throw');
    });

    test('Frozen constants maintain correct original values', () => {
        // Verify core constant values are as expected
        assert.strictEqual(RETRY_DELAYS_MS.length, 3, 'Array length should be 3');
        assert.strictEqual(RETRY_DELAYS_MS[0], 500, 'First retry delay should be 500');
        assert.strictEqual(RETRY_DELAYS_MS[1], 1500, 'Second retry delay should be 1500');
        assert.strictEqual(RETRY_DELAYS_MS[2], 3000, 'Third retry delay should be 3000');
        assert.strictEqual(MATERIAL_PRESETS['flat-matte'].roughness, 1.0, 'flat-matte roughness should be 1.0');
        assert.strictEqual(MATERIAL_PRESETS['flat-matte'].metalness, 0, 'flat-matte metalness should be 0');
        assert.strictEqual(VIEWPOINT_PRESETS.beauty.x, 600, 'beauty viewpoint x should be 600');
        assert.strictEqual(VIEWPOINT_PRESETS.beauty.y, 400, 'beauty viewpoint y should be 400');
        assert.strictEqual(VIEWPOINT_PRESETS.beauty.z, 700, 'beauty viewpoint z should be 700');
        assert.strictEqual(EVENTS.backgroundChanged, 'background:changed', 'backgroundChanged event name should be correct');
        assert.strictEqual(EVENTS.stackUpdated, 'stack:updated', 'stackUpdated event name should be correct');
        assert.strictEqual(EVENTS.cameraUpdated, 'camera:updated', 'cameraUpdated event name should be correct');
    });
});
