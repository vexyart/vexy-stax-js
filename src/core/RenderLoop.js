// this_file: src/core/RenderLoop.js

import { FPS_WARNING_THRESHOLD } from './constants.js';

/**
 * Manages the rendering animation loop with FPS monitoring and performance tracking.
 *
 * Provides a clean abstraction over requestAnimationFrame with built-in FPS monitoring,
 * performance warnings, and lifecycle management. Automatically tracks frame rate and
 * displays metrics on screen when enabled.
 *
 * @class RenderLoop
 * @example
 * // Basic usage
 * const renderLoop = new RenderLoop();
 * renderLoop.setRenderCallback(() => {
 *   controls.update();
 *   renderer.render(scene, camera);
 * });
 * renderLoop.start();
 *
 * @example
 * // With FPS monitoring and callbacks
 * const renderLoop = new RenderLoop({
 *   onFPSUpdate: ({ current, average }) => {
 *     console.log(`FPS: ${current}, Avg: ${average}`);
 *   }
 * });
 * renderLoop.setRenderCallback(renderScene);
 * renderLoop.showFPS(true); // Enable on-screen display
 * renderLoop.start();
 *
 * @example
 * // Cleanup on page unload
 * window.addEventListener('beforeunload', () => {
 *   renderLoop.dispose();
 * });
 */
export class RenderLoop {
  /**
   * Create a new render loop instance.
   *
   * @param {Object} [options={}] - Configuration options
   * @param {Function} [options.onFPSUpdate] - Optional callback invoked every second with FPS stats
   * @param {Object} options.onFPSUpdate.stats - FPS statistics object
   * @param {number} options.onFPSUpdate.stats.current - Current frame rate
   * @param {number} options.onFPSUpdate.stats.average - Average frame rate over last 5 seconds
   */
  constructor(options = {}) {
    this.renderCallback = null;
    this.animationId = null;
    this.isRunning = false;

    // FPS monitoring state
    this.showFPSEnabled = false;
    this.frameCount = 0;
    this.lastFrameTime = performance.now();
    this.fpsValues = [];
    this.fpsDisplay = null;
    this.onFPSUpdate = options.onFPSUpdate || null;

    // Bind methods to preserve context
    this._animate = this._animate.bind(this);
  }

  /**
   * Set the render callback function that will be invoked each frame.
   *
   * This callback should contain all rendering logic (e.g., camera updates,
   * scene rendering). Must be set before calling start().
   *
   * @param {Function} callback - Function to call each frame for rendering
   * @throws {TypeError} If callback is not a function
   * @example
   * renderLoop.setRenderCallback(() => {
   *   controls.update();
   *   renderer.render(scene, activeCamera);
   * });
   */
  setRenderCallback(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Render callback must be a function');
    }
    this.renderCallback = callback;
  }

  /**
   * Start the animation loop.
   *
   * Begins the requestAnimationFrame loop and starts tracking FPS if enabled.
   * Logs a warning if already running. Requires render callback to be set first.
   *
   * @throws {Error} If no render callback has been set via setRenderCallback()
   * @example
   * renderLoop.setRenderCallback(renderScene);
   * renderLoop.start();
   * // Animation loop now running at ~60 FPS
   */
  start() {
    if (this.isRunning) {
      console.warn('[RenderLoop] Already running');
      return;
    }

    if (!this.renderCallback) {
      throw new Error('[RenderLoop] No render callback set. Call setRenderCallback() first.');
    }

    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this._animate();
    console.log('[RenderLoop] Started');
  }

  /**
   * Stop the animation loop.
   *
   * Cancels the active animation frame request and stops FPS tracking.
   * Safe to call multiple times. Does not clear the render callback.
   *
   * @example
   * renderLoop.stop();
   * // Loop stopped, can be restarted with start()
   */
  stop() {
    if (!this.isRunning) {
      return;
    }

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    this.isRunning = false;
    console.log('[RenderLoop] Stopped');
  }

  /**
   * Internal animation loop
   * @private
   */
  _animate() {
    if (!this.isRunning) return;

    this.animationId = requestAnimationFrame(this._animate);
    this._updateFPS();

    if (this.renderCallback) {
      this.renderCallback();
    }
  }

  /**
   * Update FPS counter (called each frame)
   * @private
   */
  _updateFPS() {
    if (!this.showFPSEnabled) return;

    const now = performance.now();
    this.frameCount++;

    // Update FPS display every second
    if (now >= this.lastFrameTime + 1000) {
      const fps = Math.round((this.frameCount * 1000) / (now - this.lastFrameTime));
      this.fpsValues.push(fps);

      // Keep only last 5 seconds of data
      if (this.fpsValues.length > 5) {
        this.fpsValues.shift();
      }

      // Calculate average FPS
      const avgFPS = Math.round(this.fpsValues.reduce((a, b) => a + b, 0) / this.fpsValues.length);

      // Update display
      this._updateFPSDisplay(fps, avgFPS);

      // Notify callback if provided
      if (this.onFPSUpdate) {
        this.onFPSUpdate({ current: fps, average: avgFPS });
      }

      // Log warning if consistently low
      if (avgFPS < FPS_WARNING_THRESHOLD && this.fpsValues.length >= 3) {
        console.warn(`[RenderLoop] Performance warning: Average FPS ${avgFPS} below threshold ${FPS_WARNING_THRESHOLD}`);
      }

      this.frameCount = 0;
      this.lastFrameTime = now;
    }
  }

  /**
   * Update the FPS display element
   * @param {number} fps Current FPS
   * @param {number} avgFPS Average FPS
   * @private
   */
  _updateFPSDisplay(fps, avgFPS) {
    if (!this.fpsDisplay) return;

    let color = '#00ff00'; // Green
    if (avgFPS < FPS_WARNING_THRESHOLD) {
      color = '#ff0000'; // Red for low FPS
    } else if (avgFPS < 50) {
      color = '#ffaa00'; // Orange for moderate FPS
    }

    this.fpsDisplay.style.color = color;
    this.fpsDisplay.innerHTML = `FPS: ${fps}<br>Avg: ${avgFPS}`;
  }

  /**
   * Toggle on-screen FPS display.
   *
   * Creates/shows a fixed-position overlay displaying current and average FPS.
   * Updates every second. Display color changes based on performance:
   * - Green: >= 50 FPS
   * - Orange: 30-49 FPS
   * - Red: < 30 FPS (warning threshold)
   *
   * @param {boolean} enabled - Whether to show FPS counter
   * @example
   * renderLoop.showFPS(true);  // Enable FPS display
   * renderLoop.showFPS(false); // Hide FPS display
   */
  showFPS(enabled) {
    this.showFPSEnabled = Boolean(enabled);

    // Create display element if needed
    if (enabled && !this.fpsDisplay) {
      this._createFPSDisplay();
    }

    // Show/hide display
    if (this.fpsDisplay) {
      this.fpsDisplay.style.display = enabled ? 'block' : 'none';
    }

    // Reset counters
    if (enabled) {
      this.frameCount = 0;
      this.lastFrameTime = performance.now();
      this.fpsValues = [];
    }

    console.log(`[RenderLoop] FPS display ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Create the FPS display DOM element
   * @private
   */
  _createFPSDisplay() {
    if (this.fpsDisplay) return;

    this.fpsDisplay = document.createElement('div');
    this.fpsDisplay.id = 'fps-display';
    this.fpsDisplay.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: #00ff00;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      z-index: 9999;
      display: none;
      min-width: 120px;
    `;
    document.body.appendChild(this.fpsDisplay);
  }

  /**
   * Get current FPS statistics.
   *
   * Returns performance metrics based on the last 5 seconds of data.
   * Useful for programmatic performance monitoring or analytics.
   *
   * @returns {Object} FPS statistics object
   * @returns {number} return.current - Most recent FPS measurement (0 if no data)
   * @returns {number} return.average - Average FPS over last 5 seconds (0 if no data)
   * @returns {boolean} return.isLow - True if average FPS below warning threshold (30)
   * @example
   * const stats = renderLoop.getFPSStats();
   * if (stats.isLow) {
   *   console.warn(`Low FPS detected: ${stats.average}`);
   * }
   */
  getFPSStats() {
    if (this.fpsValues.length === 0) {
      return { current: 0, average: 0, isLow: false };
    }

    const current = this.fpsValues[this.fpsValues.length - 1];
    const average = Math.round(this.fpsValues.reduce((a, b) => a + b, 0) / this.fpsValues.length);
    const isLow = average < FPS_WARNING_THRESHOLD;

    return { current, average, isLow };
  }

  /**
   * Cleanup resources and remove DOM elements.
   *
   * Stops the animation loop, removes the FPS display element, and clears
   * all references. Safe to call multiple times. Should be called before
   * page unload to prevent memory leaks.
   *
   * @example
   * // Cleanup on page unload
   * window.addEventListener('beforeunload', () => {
   *   renderLoop.dispose();
   * });
   */
  dispose() {
    this.stop();

    if (this.fpsDisplay && this.fpsDisplay.parentNode) {
      this.fpsDisplay.parentNode.removeChild(this.fpsDisplay);
      this.fpsDisplay = null;
    }

    this.fpsValues = [];
    this.renderCallback = null;
    this.onFPSUpdate = null;
    console.log('[RenderLoop] Disposed');
  }
}
