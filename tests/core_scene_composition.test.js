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
 * Test Count: 4 tests
 * @lastTested 2025-11-05 (Phase 5 Iteration 2)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';

import { SceneComposition } from '../src/core/SceneComposition.js';

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
        checkMemoryUsage
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
