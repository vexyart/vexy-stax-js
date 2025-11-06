// this_file: tests/core_scene_composition.test.js
/**
 * Test Suite: Core - SceneComposition
 *
 * Purpose: Verifies image stack mutations are delegated to the SceneComposition
 * module with proper history hooks, scene interactions, and callbacks.
 *
 * Modules Tested:
 * - src/core/SceneComposition.js (SceneComposition class)
 *
 * Test Count: 10 tests
 * @lastTested 2025-11-06 (Phase 5 Iteration 6)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';

import { SceneComposition } from '../src/core/SceneComposition.js';
import { FLOOR_Y } from '../src/core/constants.js';
import { appState } from '../src/core/AppState.js';
import { getSharedRef, SHARED_STATE_KEYS } from '../src/core/sharedState.js';

function createTexture(width, height) {
    return {
        image: {
            width,
            height,
            currentSrc: `memory://${width}x${height}`,
            src: `memory://${width}x${height}`
        },
        dispose: () => {}
    };
}

function createContext(overrides = {}) {
    appState.reset();

    const scene = {
        added: [],
        removed: [],
        add(mesh) {
            this.added.push(mesh);
        },
        remove(mesh) {
            this.removed.push(mesh);
        }
    };

    const params = {
        materialThickness: 1,
        ambience: false,
        materialRoughness: 0.5,
        materialMetalness: 0.3,
        materialBorderWidth: 0,
        materialBorderColor: 0xffffff,
        bgColor: '#101010',
        zSpacing: 12,
        ...overrides.params
    };

    const imageStack = [];
    const calls = {
        saveHistory: 0,
        updateImageList: 0,
        emitStackUpdated: [],
        showToast: [],
        checkMemoryUsage: []
    };

    const saveHistory = () => {
        calls.saveHistory += 1;
    };

    const updateImageList = () => {
        calls.updateImageList += 1;
    };

    const emitStackUpdated = (reason) => {
        calls.emitStackUpdated.push(reason);
    };

    const showToast = (message, type) => {
        calls.showToast.push({ message, type });
    };

    const checkMemoryUsage = (isAdding) => {
        calls.checkMemoryUsage.push(isAdding);
        return true;
    };

    const composition = new SceneComposition({
        scene,
        params,
        imageStack,
        saveHistory,
        emitStackUpdated,
        updateImageList,
        showToast,
        logImages: {
            info: () => {},
            warn: () => {}
        },
        logMemory: {
            info: () => {}
        },
        checkMemoryUsage,
        calculateLuminance: overrides.calculateLuminance,
        getAdaptiveEmissiveIntensity: overrides.getAdaptiveEmissiveIntensity
    });

    return {
        composition,
        scene,
        params,
        imageStack,
        calls
    };
}

test('SceneComposition_addImage_when_called_then_stackUpdatedAndCallbacksFired', () => {
    const ctx = createContext();
    const texture = createTexture(800, 600);

    ctx.composition.addImage(texture, 'poster.png');

    assert.equal(ctx.imageStack.length, 1, 'addImage should append an entry to the stack');
    const [entry] = ctx.imageStack;
    assert.equal(entry.filename, 'poster.png', 'stored filename should match input');
    assert.ok(entry.mesh instanceof THREE.Mesh, 'entry mesh should be a THREE.Mesh instance');
    assert.equal(entry.mesh.position.z, 0, 'first mesh should be positioned at z=0');
    assert.equal(ctx.scene.added.length, 1, 'scene.add should be invoked once per image');
    assert.equal(ctx.calls.saveHistory, 1, 'history should record before mutation');
    assert.deepEqual(ctx.calls.emitStackUpdated, ['added'], 'stack update event should signal addition');
    assert.equal(ctx.calls.updateImageList, 1, 'UI update callback should run after addition');
    assert.deepEqual(ctx.calls.checkMemoryUsage, [false], 'post-add memory check should run with false flag');
});

test('SceneComposition_clearAll_when_stackPopulated_then_resourcesRemovedAndStackReset', () => {
    const ctx = createContext();
    ctx.composition.addImage(createTexture(400, 400), 'square.png');
    ctx.composition.addImage(createTexture(200, 800), 'poster.png');

    const sharedBeforeClear = getSharedRef(SHARED_STATE_KEYS.imageStack);
    assert.strictEqual(
        sharedBeforeClear,
        ctx.imageStack,
        'shared state should reference the live image stack before clearing'
    );
    const memoryCallsBefore = ctx.calls.checkMemoryUsage.length;

    ctx.composition.clearAll();

    assert.equal(ctx.imageStack.length, 0, 'clearAll should empty the stack');
    assert.equal(ctx.scene.removed.length, 2, 'scene.remove should be called for each mesh');
    assert.equal(ctx.calls.saveHistory, 3, 'history should capture additions and the clear operation');
    assert.equal(ctx.calls.updateImageList, 3, 'UI callback should run after each mutation including clear');
    assert.deepEqual(
        ctx.calls.emitStackUpdated.slice(-1),
        ['cleared'],
        'final emitted reason should indicate clearing'
    );
    assert.equal(
        ctx.calls.showToast.slice(-1)[0].type,
        'info',
        'clearAll should surface informational toast'
    );
    const sharedAfterClear = getSharedRef(SHARED_STATE_KEYS.imageStack);
    assert.strictEqual(sharedAfterClear, ctx.imageStack, 'shared state should reference the same array instance after clearing');
    assert.equal(sharedAfterClear.length, 0, 'shared state image stack should be empty after clearing');
    assert.equal(
        ctx.calls.checkMemoryUsage.length,
        memoryCallsBefore + 1,
        'clearAll should invoke memory guard exactly once'
    );
    assert.equal(
        ctx.calls.checkMemoryUsage.at(-1),
        false,
        'memory guard should run with false flag when clearing'
    );
});

test('SceneComposition_deleteAt_when_givenValidIndex_then_removesEntryAndReflowsZ', () => {
    const ctx = createContext();
    ctx.composition.addImage(createTexture(300, 300), 'first.png');
    ctx.composition.addImage(createTexture(300, 300), 'second.png');
    ctx.composition.addImage(createTexture(300, 300), 'third.png');

    ctx.composition.deleteAt(1);

    assert.equal(ctx.imageStack.length, 2, 'deleteAt should reduce stack length by one');
    assert.equal(ctx.imageStack[0].filename, 'first.png', 'first item should remain');
    assert.equal(ctx.imageStack[1].filename, 'third.png', 'third item should shift into second position');
    assert.equal(ctx.imageStack[1].mesh.position.z, ctx.params.zSpacing, 'remaining meshes should reflow Z positions');
    assert.deepEqual(
        ctx.calls.emitStackUpdated.slice(-1),
        ['removed'],
        'deletion should emit removed reason'
    );
});

test('SceneComposition_reorder_when_indicesDiffer_then_stackOrderUpdated', () => {
    const ctx = createContext();
    ctx.composition.addImage(createTexture(100, 100), 'A.png');
    ctx.composition.addImage(createTexture(100, 100), 'B.png');
    ctx.composition.addImage(createTexture(100, 100), 'C.png');

    ctx.composition.reorder(0, 2);

    assert.deepEqual(
        ctx.imageStack.map((item) => item.filename),
        ['B.png', 'C.png', 'A.png'],
        'reorder should move source index to destination and shift others'
    );
    assert.equal(
        ctx.imageStack[2].mesh.position.z,
        ctx.params.zSpacing * 2,
        'mesh Z offsets should align with new indices'
    );
    assert.deepEqual(
        ctx.calls.emitStackUpdated.slice(-1),
        ['reordered'],
        'reorder should notify listeners with reason reordered'
    );
});

test('SceneComposition_deleteAt_when_called_then_disposesResourcesAndChecksMemory', () => {
    const ctx = createContext();
    ctx.composition.addImage(createTexture(320, 180), 'first.png');
    ctx.composition.addImage(createTexture(320, 180), 'second.png');

    const target = ctx.imageStack[1];
    let geometryDisposed = 0;
    let materialDisposed = 0;
    let textureDisposed = 0;
    target.mesh.geometry.dispose = () => {
        geometryDisposed += 1;
    };
    target.mesh.material.dispose = () => {
        materialDisposed += 1;
    };
    if (target.mesh.material.map) {
        target.mesh.material.map.dispose = () => {
            textureDisposed += 1;
        };
    }

    const memoryCallsBefore = ctx.calls.checkMemoryUsage.length;

    ctx.composition.deleteAt(1);

    assert.equal(geometryDisposed, 1, 'deleting an image should dispose its geometry exactly once');
    assert.equal(materialDisposed, 1, 'deleting an image should dispose its material exactly once');
    assert.equal(textureDisposed, 1, 'deleting an image should dispose the texture map exactly once');
    assert.equal(
        ctx.calls.checkMemoryUsage.length,
        memoryCallsBefore + 1,
        'memory guard should run once after deletion'
    );
    assert.equal(
        ctx.calls.checkMemoryUsage.at(-1),
        false,
        'memory guard should flag deletion as a non-add operation'
    );
});

test('SceneComposition_reorder_when_validIndices_then_recordsHistorySnapshot', () => {
    const ctx = createContext();
    ctx.composition.addImage(createTexture(120, 120), 'first.png');
    ctx.composition.addImage(createTexture(120, 120), 'second.png');
    ctx.composition.addImage(createTexture(120, 120), 'third.png');

    const historyBefore = ctx.calls.saveHistory;

    ctx.composition.reorder(0, 2);

    assert.equal(
        ctx.calls.saveHistory,
        historyBefore + 1,
        'reorder should capture history exactly once when indices are valid'
    );
    assert.equal(
        ctx.calls.updateImageList,
        4,
        'reorder should still trigger UI update callback once on top of prior additions'
    );
});

test('SceneComposition_reorder_when_indicesInvalid_then_skipHistoryCapture', () => {
    const ctx = createContext();
    ctx.composition.addImage(createTexture(80, 80), 'first.png');
    ctx.composition.addImage(createTexture(80, 80), 'second.png');

    const historyBefore = ctx.calls.saveHistory;

    ctx.composition.reorder(-1, 1);
    ctx.composition.reorder(0, 5);
    ctx.composition.reorder(0, 0);

    assert.equal(
        ctx.calls.saveHistory,
        historyBefore,
        'invalid reorder requests should not capture history'
    );
});

test('SceneComposition_applyMaterialPreset_when_ambienceEnabled_then_rebuildsMeshesAndAppliesEmissive', () => {
    const luminanceCalls = [];
    const emissiveCalls = [];
    const ctx = createContext({
        params: {
            ambience: true,
            bgColor: '#445566',
            materialThickness: 1,
            materialBorderWidth: 0,
            materialRoughness: 0.2,
            materialMetalness: 0.1,
            zSpacing: 18
        },
        calculateLuminance: (hex) => {
            luminanceCalls.push(hex);
            return 0.62;
        },
        getAdaptiveEmissiveIntensity: (luminance) => {
            emissiveCalls.push(luminance);
            return 0.48;
        }
    });

    const texture = createTexture(600, 300);
    ctx.composition.addImage(texture, 'panel.png');

    const [imageData] = ctx.imageStack;
    const originalMesh = imageData.mesh;
    let geometryDisposed = 0;
    let materialDisposed = 0;
    originalMesh.geometry.dispose = () => {
        geometryDisposed += 1;
    };
    originalMesh.material.dispose = () => {
        materialDisposed += 1;
    };

    const preset = {
        roughness: 0.35,
        metalness: 0.55,
        thickness: 4,
        borderWidth: 0
    };

    ctx.composition.applyMaterialPreset(preset);

    assert.equal(geometryDisposed, 1, 'previous geometry should be disposed exactly once');
    assert.equal(materialDisposed, 1, 'previous material should be disposed exactly once');
    assert.equal(ctx.scene.removed.length, 1, 'scene.remove should run for each replaced mesh');
    assert.equal(ctx.scene.added.at(-1), imageData.mesh, 'new mesh should be re-added to the scene');
    assert.notStrictEqual(imageData.mesh, originalMesh, 'image stack should point to the rebuilt mesh instance');

    const newMesh = imageData.mesh;
    assert.ok(newMesh.material instanceof THREE.MeshStandardMaterial, 'ambience mode should use MeshStandardMaterial');
    assert.equal(newMesh.material.roughness, preset.roughness, 'roughness should adopt preset value');
    assert.equal(newMesh.material.metalness, preset.metalness, 'metalness should adopt preset value');
    assert.equal(newMesh.material.emissiveIntensity, 0.48, 'emissive intensity should follow adaptive helper result');
    assert.deepEqual(luminanceCalls, ['#445566'], 'bgColor should be passed to luminance calculator');
    assert.deepEqual(emissiveCalls, [0.62], 'adaptive emissive helper should receive luminance output');

    const geometryParams = newMesh.geometry.parameters;
    const expectedY = FLOOR_Y + ((geometryParams.height ?? 0) / 2);
    assert.equal(newMesh.position.z, 0, 'z position should remain aligned with index 0');
    assert.equal(newMesh.position.y, expectedY, 'ambience should elevate mesh to rest on the floor plane');
    assert.equal(
        geometryParams.depth ?? geometryParams.height,
        preset.thickness,
        'geometry depth/height should match preset thickness'
    );
    assert.equal(imageData.width, geometryParams.width, 'image metadata width should sync with new mesh geometry');
    assert.equal(imageData.height, geometryParams.height, 'image metadata height should sync with new mesh geometry');
});

test('SceneComposition_applyMaterialPreset_when_borderWidthPositive_then_attachesBorderMesh', () => {
    const ctx = createContext({
        params: {
            ambience: true,
            bgColor: '#202020',
            materialBorderColor: 0xffcc00,
            materialBorderWidth: 0,
            materialThickness: 1,
            materialRoughness: 0.4,
            materialMetalness: 0.25,
            zSpacing: 15
        }
    });

    const texture = createTexture(320, 240);
    ctx.composition.addImage(texture, 'bordered.png');

    const [imageData] = ctx.imageStack;
    const preset = {
        roughness: 0.35,
        metalness: 0.55,
        thickness: 1,
        borderWidth: 12
    };

    ctx.composition.applyMaterialPreset(preset);

    const mesh = imageData.mesh;
    assert.equal(mesh.children.length, 1, 'border branch should append a single child mesh');

    const [borderMesh] = mesh.children;
    assert.ok(borderMesh instanceof THREE.Mesh, 'border child should be a THREE.Mesh instance');
    assert.ok(borderMesh.geometry instanceof THREE.PlaneGeometry, 'border should be composed of PlaneGeometry');
    assert.equal(borderMesh.position.z, -0.5, 'border mesh should sit just behind the primary mesh');
    assert.equal(borderMesh.castShadow, true, 'ambience mode should enable casting shadows on the border');
    assert.equal(borderMesh.receiveShadow, true, 'ambience mode should enable receiving shadows on the border');

    const borderColor = borderMesh.material.color.getHexString();
    assert.equal(borderColor, 'ffcc00', 'border colour should match materialBorderColor parameter');

    const borderWidth = borderMesh.geometry.parameters.width;
    const borderHeight = borderMesh.geometry.parameters.height;
    assert.equal(borderWidth, 320 + (12 * 2), 'border width should expand plane width by twice the border width');
    assert.equal(borderHeight, 240 + (12 * 2), 'border height should expand plane height by twice the border width');
});

test('SceneComposition_applyMaterialPreset_when_thicknessGreaterThanOne_then_usesBoxGeometry', () => {
    const ctx = createContext({
        params: {
            ambience: false,
            materialThickness: 1,
            materialBorderWidth: 0,
            materialRoughness: 0.2,
            materialMetalness: 0.15,
            zSpacing: 10
        }
    });

    const texture = createTexture(256, 128);
    ctx.composition.addImage(texture, 'thick.png');

    const [imageData] = ctx.imageStack;
    const originalMesh = imageData.mesh;
    let geometryDisposed = 0;
    let materialDisposed = 0;
    originalMesh.geometry.dispose = () => {
        geometryDisposed += 1;
    };
    originalMesh.material.dispose = () => {
        materialDisposed += 1;
    };

    const preset = {
        roughness: 0.4,
        metalness: 0.1,
        thickness: 6,
        borderWidth: 0
    };

    ctx.composition.applyMaterialPreset(preset);

    assert.equal(geometryDisposed, 1, 'existing geometry should dispose before rebuild');
    assert.equal(materialDisposed, 1, 'existing material should dispose before rebuild');
    assert.equal(ctx.scene.removed.length, 1, 'scene.remove should execute for the prior mesh');

    const newMesh = imageData.mesh;
    assert.ok(newMesh.geometry instanceof THREE.BoxGeometry, 'thickness > 1 should create BoxGeometry');
    assert.equal(newMesh.geometry.parameters.depth, 6, 'box depth should match preset thickness');
    assert.ok(newMesh.material instanceof THREE.MeshBasicMaterial, 'non-ambience preset should use MeshBasicMaterial');
    assert.equal(newMesh.material.transparent, true, 'MeshBasicMaterial should preserve transparency');

    assert.equal(imageData.width, newMesh.geometry.parameters.width, 'stack width metadata should reflect box width');
    assert.equal(imageData.height, newMesh.geometry.parameters.height, 'stack height metadata should reflect box height');
});
