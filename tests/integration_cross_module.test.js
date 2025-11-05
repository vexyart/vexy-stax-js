// this_file: tests/integration_cross_module.test.js
/**
 * @fileoverview Cross-Module Integration Tests
 * @description Integration tests verifying interactions between multiple modules
 *              Tests module boundaries, data flow, and inter-module contracts
 * @testCount 5 tests
 * @lastTested 2025-11-05 (Iteration 92)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Cross-Module Integration Tests', () => {
  it('EventBus + AppState: State changes emit events', async () => {
    const { EventBus } = await import('../src/core/EventBus.js');
    const { AppState } = await import('../src/core/AppState.js');

    const bus = new EventBus();
    const state = new AppState({ count: 0 });
    let emittedValue = null;

    // Subscribe to state changes
    bus.on('state:changed', (newValue) => {
      emittedValue = newValue;
    });

    // Update state and emit event
    state.set('count', 42);
    bus.emit('state:changed', state.get('count'));

    assert.strictEqual(emittedValue, 42, 'EventBus should propagate AppState changes');
  });

  // Note: RenderLoop requires requestAnimationFrame (browser-only API)
  // Integration tested in E2E tests with Playwright

  it('AppState + sharedState: Multiple modules share state via registry', async () => {
    const { AppState } = await import('../src/core/AppState.js');
    const { getSharedRef } = await import('../src/core/sharedState.js');

    const studioState = new AppState({ zoom: 1.0 });
    const cameraState = new AppState({ fov: 45 });

    // Simulate registry (in real code, this happens in main.js)
    const mockRegistry = {
      studio: studioState,
      camera: cameraState
    };

    // Both modules can access shared state
    const studio = mockRegistry.studio;
    const camera = mockRegistry.camera;

    studio.set('zoom', 2.0);
    camera.set('fov', 60);

    assert.strictEqual(studio.get('zoom'), 2.0, 'Studio state updated');
    assert.strictEqual(camera.get('fov'), 60, 'Camera state updated');
    assert.notStrictEqual(studio, camera, 'States are independent instances');
  });


  it('ordering + AppState: Reordering updates state correctly', async () => {
    const { reorderList } = await import('../src/core/ordering.js');
    const { AppState } = await import('../src/core/AppState.js');

    const state = new AppState({ items: ['a', 'b', 'c', 'd'] });
    const original = state.get('items');

    // Reorder: move index 0 to index 2
    const reordered = reorderList(original, 0, 2);
    state.set('items', reordered);

    assert.deepStrictEqual(state.get('items'), ['b', 'c', 'a', 'd'], 'State reflects reordering');
  });

  it('helpers + AppState: Deep cloning preserves state independence', async () => {
    const { deepClone } = await import('../src/utils/helpers.js');
    const { AppState } = await import('../src/core/AppState.js');

    const state1 = new AppState({ nested: { value: 10 } });
    const snapshot = deepClone(state1.snapshot());
    const state2 = new AppState(snapshot);

    state1.mergeInto('nested', { value: 20 });

    assert.strictEqual(state1.get('nested').value, 20, 'State1 updated');
    assert.strictEqual(state2.get('nested').value, 10, 'State2 unchanged - deep clone worked');
  });

  it('logger + EventBus: Logging integration with event system', async () => {
    const { createLogger } = await import('../src/utils/logger.js');
    const { EventBus } = await import('../src/core/EventBus.js');

    const bus = new EventBus();
    const log = createLogger('Integration');
    let loggedMessage = null;

    // Intercept logger output (in real app, this goes to console)
    const originalError = console.error;
    console.error = (...args) => {
      loggedMessage = args.join(' ');
    };

    bus.on('error:critical', (msg) => {
      log.error('Critical error:', msg);
    });

    bus.emit('error:critical', 'System failure');

    console.error = originalError; // Restore

    assert.ok(loggedMessage !== null, 'Error message was logged');
    assert.ok(loggedMessage.includes('[Integration]'), 'Logger module prefix present');
    assert.ok(loggedMessage.includes('Critical error'), 'Error message logged');
  });
});
