// this_file: tests/core_render_loop.test.js

import { describe, it, beforeEach, afterEach, mock, before } from 'node:test';
import assert from 'node:assert/strict';
import { RenderLoop } from '../src/core/RenderLoop.js';

describe('RenderLoop', () => {
  let renderLoop;
  let mockRenderCallback;
  let rafId = 0;
  let rafCallbacks = [];

  // Mock browser APIs globally
  before(() => {
    // Mock requestAnimationFrame
    global.requestAnimationFrame = (callback) => {
      rafId++;
      rafCallbacks.push({ id: rafId, callback });
      return rafId;
    };

    // Mock cancelAnimationFrame
    global.cancelAnimationFrame = (id) => {
      const index = rafCallbacks.findIndex(r => r.id === id);
      if (index !== -1) {
        rafCallbacks.splice(index, 1);
      }
    };

    // Mock document
    global.document = {
      createElement: (tag) => ({
        id: null,
        style: { cssText: '' },
        innerHTML: '',
        parentNode: null,
      }),
      body: {
        appendChild: () => {},
      },
    };

    // Mock performance
    global.performance = {
      now: () => Date.now(),
    };
  });

  beforeEach(() => {
    renderLoop = new RenderLoop();
    mockRenderCallback = mock.fn();
    rafId = 0;
    rafCallbacks = [];
  });

  afterEach(() => {
    if (renderLoop) {
      renderLoop.dispose();
    }
  });

  // Constructor tests
  it('constructor initializes with default state', () => {
    assert.equal(renderLoop.renderCallback, null, 'renderCallback should be null');
    assert.equal(renderLoop.isRunning, false, 'isRunning should be false');
    assert.equal(renderLoop.showFPSEnabled, false, 'showFPSEnabled should be false');
    assert.equal(renderLoop.frameCount, 0, 'frameCount should be 0');
    assert.ok(Array.isArray(renderLoop.fpsValues), 'fpsValues should be an array');
    assert.equal(renderLoop.fpsValues.length, 0, 'fpsValues should be empty');
  });

  it('constructor accepts onFPSUpdate callback', () => {
    const onFPSUpdate = mock.fn();
    const loop = new RenderLoop({ onFPSUpdate });
    assert.equal(loop.onFPSUpdate, onFPSUpdate, 'onFPSUpdate should be stored');
    loop.dispose();
  });

  // setRenderCallback tests
  it('setRenderCallback stores callback function', () => {
    renderLoop.setRenderCallback(mockRenderCallback);
    assert.equal(renderLoop.renderCallback, mockRenderCallback, 'renderCallback should be stored');
  });

  it('setRenderCallback throws TypeError for non-function', () => {
    assert.throws(
      () => renderLoop.setRenderCallback('not a function'),
      TypeError,
      'Should throw TypeError for non-function'
    );
  });

  // start tests
  it('start throws error if no render callback set', () => {
    assert.throws(
      () => renderLoop.start(),
      /No render callback set/,
      'Should throw error when starting without callback'
    );
  });

  it('start sets isRunning to true', () => {
    renderLoop.setRenderCallback(mockRenderCallback);
    renderLoop.start();
    assert.equal(renderLoop.isRunning, true, 'isRunning should be true after start');
  });

  it('start warns if already running', () => {
    renderLoop.setRenderCallback(mockRenderCallback);
    renderLoop.start();

    const originalWarn = console.warn;
    let warnCalled = false;
    console.warn = () => { warnCalled = true; };

    renderLoop.start();
    assert.equal(warnCalled, true, 'Should warn when starting already running loop');

    console.warn = originalWarn;
  });

  // stop tests
  it('stop sets isRunning to false', () => {
    renderLoop.setRenderCallback(mockRenderCallback);
    renderLoop.start();
    renderLoop.stop();
    assert.equal(renderLoop.isRunning, false, 'isRunning should be false after stop');
  });

  it('stop is safe to call when not running', () => {
    assert.doesNotThrow(() => renderLoop.stop(), 'stop should not throw when not running');
  });

  it('stop clears animation ID', () => {
    renderLoop.setRenderCallback(mockRenderCallback);
    renderLoop.start();
    assert.ok(renderLoop.animationId !== null, 'animationId should be set when running');
    renderLoop.stop();
    assert.equal(renderLoop.animationId, null, 'animationId should be null after stop');
  });

  // showFPS tests
  it('showFPS enables FPS display', () => {
    renderLoop.showFPS(true);
    assert.equal(renderLoop.showFPSEnabled, true, 'showFPSEnabled should be true');
  });

  it('showFPS disables FPS display', () => {
    renderLoop.showFPS(true);
    renderLoop.showFPS(false);
    assert.equal(renderLoop.showFPSEnabled, false, 'showFPSEnabled should be false');
  });

  it('showFPS resets counters when enabled', () => {
    renderLoop.fpsValues = [60, 58, 59];
    renderLoop.frameCount = 100;

    renderLoop.showFPS(true);

    assert.equal(renderLoop.frameCount, 0, 'frameCount should be reset');
    assert.equal(renderLoop.fpsValues.length, 0, 'fpsValues should be reset');
  });

  // getFPSStats tests
  it('getFPSStats returns zero stats when no data', () => {
    const stats = renderLoop.getFPSStats();
    assert.equal(stats.current, 0, 'current should be 0');
    assert.equal(stats.average, 0, 'average should be 0');
    assert.equal(stats.isLow, false, 'isLow should be false');
  });

  it('getFPSStats calculates average correctly', () => {
    renderLoop.fpsValues = [60, 58, 62];
    const stats = renderLoop.getFPSStats();

    assert.equal(stats.current, 62, 'current should be last value');
    assert.equal(stats.average, 60, 'average should be 60');
  });

  it('getFPSStats detects low FPS', () => {
    renderLoop.fpsValues = [25, 28, 22]; // Below FPS_WARNING_THRESHOLD (30)
    const stats = renderLoop.getFPSStats();

    assert.equal(stats.isLow, true, 'isLow should be true for low FPS');
  });

  // dispose tests
  it('dispose stops the loop', () => {
    renderLoop.setRenderCallback(mockRenderCallback);
    renderLoop.start();
    renderLoop.dispose();

    assert.equal(renderLoop.isRunning, false, 'Loop should be stopped');
    assert.equal(renderLoop.renderCallback, null, 'renderCallback should be null');
  });

  it('dispose clears FPS values', () => {
    renderLoop.fpsValues = [60, 58, 59];
    renderLoop.dispose();

    assert.equal(renderLoop.fpsValues.length, 0, 'fpsValues should be empty');
  });

  it('dispose is safe to call multiple times', () => {
    renderLoop.setRenderCallback(mockRenderCallback);
    renderLoop.start();

    assert.doesNotThrow(() => {
      renderLoop.dispose();
      renderLoop.dispose();
      renderLoop.dispose();
    }, 'dispose should be safe to call multiple times');
  });

  // Integration tests
  it('render callback is invoked when loop is running', () => {
    renderLoop.setRenderCallback(mockRenderCallback);
    renderLoop.start();

    // Simulate one animation frame
    if (rafCallbacks.length > 0) {
      rafCallbacks[0].callback();
    }

    assert.ok(mockRenderCallback.mock.calls.length >= 1, 'Render callback should be called');
  });
});
