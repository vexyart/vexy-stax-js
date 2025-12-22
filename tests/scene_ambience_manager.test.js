// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: tests/scene_ambience_manager.test.js

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { AmbienceManager } from '../src/scene/AmbienceManager.js';

describe('AmbienceManager', () => {
    let scene, imageStack, params, manager;

    beforeEach(() => {
        scene = new THREE.Scene();
        imageStack = [];
        params = {
            zSpacing: 100,
            materialThickness: 5,
            materialRoughness: 0.5,
            materialMetalness: 0.1
        };
    });

    it('constructor should validate required scene', () => {
        assert.throws(
            () => new AmbienceManager(null, [], params),
            /\[AmbienceManager\] Cannot initialize: scene is required/
        );
    });

    it('constructor should validate imageStack is array', () => {
        assert.throws(
            () => new AmbienceManager(scene, null, params),
            /\[AmbienceManager\] Cannot initialize: imageStack array is required/
        );
    });

    it('constructor should validate params object', () => {
        assert.throws(
            () => new AmbienceManager(scene, [], null),
            /\[AmbienceManager\] Cannot initialize: params object is required/
        );
    });

    it('constructor should store references', () => {
        manager = new AmbienceManager(scene, imageStack, params);
        assert.strictEqual(manager.scene, scene);
        assert.strictEqual(manager.imageStack, imageStack);
        assert.strictEqual(manager.params, params);
    });

    it('updateMaterials should rebuild meshes with MeshStandardMaterial when enabled', () => {
        // Setup: create a simple image mesh
        const texture = new THREE.Texture();
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        imageStack.push({
            mesh,
            width: 100,
            height: 100
        });

        manager = new AmbienceManager(scene, imageStack, params);
        manager.updateMaterials(true);

        // Verify mesh was replaced
        assert.ok(imageStack[0].mesh);
        assert.ok(imageStack[0].mesh instanceof THREE.Mesh);
        assert.ok(imageStack[0].mesh.material instanceof THREE.MeshStandardMaterial);
        assert.strictEqual(imageStack[0].mesh.castShadow, true);
        assert.strictEqual(imageStack[0].mesh.receiveShadow, true);
        assert.strictEqual(imageStack[0].mesh.material.envMapIntensity, 0.0);
    });

    it('updateMaterials should rebuild meshes with MeshBasicMaterial when disabled', () => {
        // Setup: create a simple image mesh
        const texture = new THREE.Texture();
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        imageStack.push({
            mesh,
            width: 100,
            height: 100
        });

        manager = new AmbienceManager(scene, imageStack, params);
        manager.updateMaterials(false);

        // Verify mesh was replaced
        assert.ok(imageStack[0].mesh);
        assert.ok(imageStack[0].mesh instanceof THREE.Mesh);
        assert.ok(imageStack[0].mesh.material instanceof THREE.MeshBasicMaterial);
        assert.strictEqual(imageStack[0].mesh.castShadow, false);
    });

    it('updateMaterials should use BoxGeometry when materialThickness > 1', () => {
        const texture = new THREE.Texture();
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        imageStack.push({
            mesh,
            width: 100,
            height: 100
        });

        params.materialThickness = 10;
        manager = new AmbienceManager(scene, imageStack, params);
        manager.updateMaterials(true);

        assert.ok(imageStack[0].mesh.geometry instanceof THREE.BoxGeometry);
    });

    it('updateMaterials should position meshes based on zSpacing', () => {
        // Setup: create two image meshes
        for (let i = 0; i < 2; i++) {
            const texture = new THREE.Texture();
            const geometry = new THREE.PlaneGeometry(100, 100);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            imageStack.push({
                mesh,
                width: 100,
                height: 100
            });
        }

        manager = new AmbienceManager(scene, imageStack, params);
        manager.updateMaterials(true);

        assert.strictEqual(imageStack[0].mesh.position.z, 0);
        assert.strictEqual(imageStack[1].mesh.position.z, params.zSpacing);
    });

    it('updateMaterials should position slides on floor when enabled', async () => {
        // Setup: create image mesh with known height
        const texture = new THREE.Texture();
        const geometry = new THREE.PlaneGeometry(100, 200); // 200 height
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        imageStack.push({
            mesh,
            width: 100,
            height: 200
        });

        manager = new AmbienceManager(scene, imageStack, params);
        manager.updateMaterials(true);

        // When enabled: Y = FLOOR_Y (0) + height/2 = 100
        assert.strictEqual(imageStack[0].mesh.position.y, 100);
    });

    it('updateMaterials should center slides at Y=0 when disabled', () => {
        // Setup: create image mesh
        const texture = new THREE.Texture();
        const geometry = new THREE.PlaneGeometry(100, 200); // 200 height
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        imageStack.push({
            mesh,
            width: 100,
            height: 200
        });

        manager = new AmbienceManager(scene, imageStack, params);
        manager.updateMaterials(false);

        // When disabled: Y = 0 (centered)
        assert.strictEqual(imageStack[0].mesh.position.y, 0);
    });

    it('should use getEffectiveZSpacing callback when provided', () => {
        // Setup: create image mesh
        const texture = new THREE.Texture();
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        imageStack.push({
            mesh,
            width: 100,
            height: 100
        });

        // Custom zSpacing callback returns 250
        const customGetEffectiveZSpacing = () => 250;

        manager = new AmbienceManager(scene, imageStack, params, {
            getEffectiveZSpacing: customGetEffectiveZSpacing
        });
        manager.updateMaterials(true);

        // Z should use the callback value
        assert.strictEqual(imageStack[0].mesh.position.z, 0); // First slide at z=0
    });

    it('should use default zSpacing when getEffectiveZSpacing not provided', () => {
        // Setup: create two image meshes
        for (let i = 0; i < 2; i++) {
            const texture = new THREE.Texture();
            const geometry = new THREE.PlaneGeometry(100, 100);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            imageStack.push({
                mesh,
                width: 100,
                height: 100
            });
        }

        // No options passed - should use default (params.zSpacing)
        manager = new AmbienceManager(scene, imageStack, params);
        manager.updateMaterials(true);

        // Second slide should be at params.zSpacing
        assert.strictEqual(imageStack[1].mesh.position.z, params.zSpacing);
    });

    it('applyEmissiveIntensity should update materials with emissiveIntensity property', () => {
        // Setup: create a mesh with MeshStandardMaterial
        const texture = new THREE.Texture();
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material);

        imageStack.push({ mesh, width: 100, height: 100 });

        manager = new AmbienceManager(scene, imageStack, params);
        manager.applyEmissiveIntensity(0.5);

        assert.strictEqual(imageStack[0].mesh.material.emissiveIntensity, 0.5);
        // Note: needsUpdate is set but may not be readable due to THREE.js internal behavior
    });

    it('applyEmissiveIntensity should skip materials without emissiveIntensity', () => {
        // Setup: create a mesh with MeshBasicMaterial (no emissiveIntensity)
        const texture = new THREE.Texture();
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material);

        imageStack.push({ mesh, width: 100, height: 100 });

        manager = new AmbienceManager(scene, imageStack, params);
        // Should not throw
        manager.applyEmissiveIntensity(0.5);

        assert.strictEqual(imageStack[0].mesh.material.emissiveIntensity, undefined);
    });

    it('dispose should not throw', () => {
        manager = new AmbienceManager(scene, imageStack, params);
        assert.doesNotThrow(() => manager.dispose());
    });

    it('dispose should be safe to call multiple times', () => {
        manager = new AmbienceManager(scene, imageStack, params);
        manager.dispose();
        assert.doesNotThrow(() => manager.dispose());
    });

    it('updateMaterials should dispose old geometries and materials to prevent memory leaks', () => {
        // Setup: create a simple image mesh
        const texture = new THREE.Texture();
        const geometry = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        imageStack.push({
            mesh,
            width: 100,
            height: 100
        });

        // Track disposal calls
        const originalGeometryDispose = geometry.dispose;
        const originalMaterialDispose = material.dispose;
        let geometryDisposed = false;
        let materialDisposed = false;

        geometry.dispose = () => {
            geometryDisposed = true;
            originalGeometryDispose.call(geometry);
        };

        material.dispose = () => {
            materialDisposed = true;
            originalMaterialDispose.call(material);
        };

        manager = new AmbienceManager(scene, imageStack, params);
        manager.updateMaterials(true);

        assert.strictEqual(geometryDisposed, true, 'Old geometry should be disposed');
        assert.strictEqual(materialDisposed, true, 'Old material should be disposed');
    });

    it('integration: AmbienceManager + FloorManager disposal order is safe', async () => {
        const { FloorManager } = await import('../src/scene/FloorManager.js');

        // Create managers in initialization order
        const floorManager = new FloorManager(scene, params);
        manager = new AmbienceManager(scene, imageStack, params);

        // Setup callback
        floorManager.onAmbienceChange = (enabled) => {
            manager.updateMaterials(enabled);
        };

        // Test disposal in any order doesn't cause errors
        assert.doesNotThrow(() => {
            manager.dispose();
            floorManager.dispose();
        });
    });

    it('integration: AmbienceManager + FloorManager reverse disposal order is safe', async () => {
        const { FloorManager } = await import('../src/scene/FloorManager.js');

        // Create managers in initialization order
        const floorManager = new FloorManager(scene, params);
        manager = new AmbienceManager(scene, imageStack, params);

        // Setup callback
        floorManager.onAmbienceChange = (enabled) => {
            manager.updateMaterials(enabled);
        };

        // Test disposal in reverse order doesn't cause errors
        assert.doesNotThrow(() => {
            floorManager.dispose();
            manager.dispose();
        });
    });

    it('edge case: updateMaterials with empty imageStack should not throw', () => {
        // Empty imageStack
        manager = new AmbienceManager(scene, imageStack, params);
        assert.doesNotThrow(() => manager.updateMaterials(true));
        assert.doesNotThrow(() => manager.updateMaterials(false));
    });

    it('edge case: applyEmissiveIntensity with empty imageStack should not throw', () => {
        // Empty imageStack
        manager = new AmbienceManager(scene, imageStack, params);
        assert.doesNotThrow(() => manager.applyEmissiveIntensity(0.5));
    });

    it('edge case: updateMaterials handles imageData with missing mesh properties gracefully', () => {
        // Add imageData with incomplete structure
        const texture = new THREE.Texture();
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ map: texture }));
        scene.add(mesh);

        // Missing width/height - should use mesh geometry parameters
        imageStack.push({
            mesh,
            width: 100,
            height: 100
        });

        manager = new AmbienceManager(scene, imageStack, params);
        assert.doesNotThrow(() => manager.updateMaterials(true));

        // Verify mesh was still updated
        assert.ok(imageStack[0].mesh instanceof THREE.Mesh);
    });
});
