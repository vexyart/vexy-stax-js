// this_file: tests/scene_director.test.js

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { SceneDirector } from '../src/scene/SceneDirector.js';

describe('SceneDirector', () => {
    let scene, params, director;

    beforeEach(() => {
        scene = new THREE.Scene();
        params = {
            ambience: 0,
            bgColor: { r: 16, g: 16, b: 16, a: 1 }
        };
    });

    it('constructor should throw without scene', () => {
        assert.throws(
            () => new SceneDirector({ params }),
            /scene is required/
        );
    });

    it('constructor should throw without params', () => {
        assert.throws(
            () => new SceneDirector({ scene }),
            /params is required/
        );
    });

    it('constructor should accept minimal options', () => {
        director = new SceneDirector({ scene, params });
        assert.strictEqual(director.scene, scene);
        assert.strictEqual(director.params, params);
    });

    it('setManager should set valid manager reference', () => {
        director = new SceneDirector({ scene, params });
        const mockManager = { update: () => {} };

        director.setManager('lightingManager', mockManager);
        assert.strictEqual(director.lightingManager, mockManager);
    });

    it('setManager should warn on invalid manager name', () => {
        director = new SceneDirector({ scene, params });

        // Should not throw, just warn
        assert.doesNotThrow(() => director.setManager('invalidManager', {}));
    });

    it('setAmbience should update params and call managers', () => {
        const calls = {
            updateMaterials: [],
            applyEmissiveIntensity: [],
            setAmbientIntensity: [],
            updateMaterial: [],
            recalculateLayout: 0,
            controlsUpdate: 0
        };

        director = new SceneDirector({
            scene,
            params,
            ambienceManager: {
                updateMaterials: (enabled) => calls.updateMaterials.push(enabled),
                applyEmissiveIntensity: (val) => calls.applyEmissiveIntensity.push(val)
            },
            lightingManager: {
                setAmbientIntensity: (val) => calls.setAmbientIntensity.push(val),
                update: () => {}
            },
            floorManager: {
                updateMaterial: (enabled) => calls.updateMaterial.push(enabled)
            },
            sceneComposition: {
                recalculateLayout: () => calls.recalculateLayout++
            },
            controls: {
                update: () => calls.controlsUpdate++
            }
        });

        director.setAmbience(0.5);

        assert.strictEqual(params.ambience, 0.5);
        assert.deepEqual(calls.updateMaterials, [true]);
        assert.deepEqual(calls.applyEmissiveIntensity, [0.125]); // 0.5 * 0.25
        assert.deepEqual(calls.setAmbientIntensity, [0.55]); // 0.3 + 0.5 * 0.5
        assert.deepEqual(calls.updateMaterial, [true]);
        assert.strictEqual(calls.recalculateLayout, 1);
        assert.strictEqual(calls.controlsUpdate, 1);
    });

    it('setAmbience with 0 should disable ambience', () => {
        const calls = { updateMaterials: [], updateMaterial: [] };

        director = new SceneDirector({
            scene,
            params,
            ambienceManager: {
                updateMaterials: (enabled) => calls.updateMaterials.push(enabled)
            },
            floorManager: {
                updateMaterial: (enabled) => calls.updateMaterial.push(enabled)
            }
        });

        director.setAmbience(0);

        assert.strictEqual(params.ambience, 0);
        assert.deepEqual(calls.updateMaterials, [false]);
        assert.deepEqual(calls.updateMaterial, [false]);
    });

    it('updateBackground should use sceneManager when available', () => {
        let backgroundCalled = false;

        director = new SceneDirector({
            scene,
            params,
            sceneManager: {
                updateBackground: () => { backgroundCalled = true; }
            }
        });

        director.updateBackground();
        assert.strictEqual(backgroundCalled, true);
    });

    it('updateBackground should fall back to direct scene manipulation', () => {
        const mockRenderer = {
            setClearColor: () => {}
        };

        director = new SceneDirector({
            scene,
            params,
            renderer: mockRenderer
        });

        director.updateBackground();
        assert.ok(scene.background instanceof THREE.Color);
    });

    it('updateBackground should set null background when transparent', () => {
        params.bgColor = { r: 0, g: 0, b: 0, a: 0 };
        let clearColorAlpha = 1;

        director = new SceneDirector({
            scene,
            params,
            renderer: {
                setClearColor: (color, alpha) => { clearColorAlpha = alpha; }
            }
        });

        director.updateBackground();
        assert.strictEqual(scene.background, null);
        assert.strictEqual(clearColorAlpha, 0);
    });

    it('updateBackground should call onBackgroundChanged callback', () => {
        let callbackArg = null;

        director = new SceneDirector({
            scene,
            params,
            onBackgroundChanged: (arg) => { callbackArg = arg; }
        });

        director.updateBackground();
        assert.strictEqual(callbackArg, 'update');
    });

    it('updateBackground should update emissive when ambience enabled', () => {
        params.ambience = 0.5;
        const imageStack = [{
            mesh: {
                material: {
                    emissiveIntensity: 0,
                    needsUpdate: false
                }
            }
        }];

        director = new SceneDirector({
            scene,
            params,
            imageStack
        });

        director.updateBackground();
        assert.ok(imageStack[0].mesh.material.emissiveIntensity > 0);
        assert.strictEqual(imageStack[0].mesh.material.needsUpdate, true);
    });

    it('updateFloorColor should call floorManager.updateColor', () => {
        let colorUpdated = false;

        director = new SceneDirector({
            scene,
            params,
            floorManager: {
                updateColor: () => { colorUpdated = true; }
            }
        });

        director.updateFloorColor();
        assert.strictEqual(colorUpdated, true);
    });

    it('dispose should null all manager references', () => {
        director = new SceneDirector({
            scene,
            params,
            ambienceManager: {},
            lightingManager: {},
            floorManager: {}
        });

        director.dispose();

        assert.strictEqual(director.ambienceManager, null);
        assert.strictEqual(director.lightingManager, null);
        assert.strictEqual(director.floorManager, null);
    });
});
