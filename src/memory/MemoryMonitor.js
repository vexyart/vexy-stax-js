// SPDX-License-Identifier: Apache-2.0
// this_file: src/memory/MemoryMonitor.js

/**
 * MemoryMonitor centralises GPU memory estimation, threshold handling, and FPS
 * overlay synchronisation. The class is intentionally dependency-injected so it
 * can run inside tests without a browser DOM.
 */
export class MemoryMonitor {
    constructor(options = {}) {
        this.getImageStack = options.getImageStack ?? (() => []);
        this.logMemory = options.logMemory ?? {
            info: () => {},
            warn: () => {}
        };
        this.showToast = typeof options.showToast === 'function' ? options.showToast : () => {};
        this.confirm = typeof options.confirm === 'function' ? options.confirm : () => true;
        this.now = typeof options.now === 'function' ? options.now : () => Date.now();

        this.thresholds = {
            warningMB: options.thresholds?.warningMB ?? 500,
            criticalMB: options.thresholds?.criticalMB ?? 750,
            cooldownMs: options.thresholds?.cooldownMs ?? 30_000
        };

        this.toastDurations = {
            warningMs: options.toastDurations?.warningMs ?? 3_000,
            errorMs: options.toastDurations?.errorMs ?? 3_000
        };

        this.bytesPerMB = options.bytesPerMB ?? 1024 * 1024;
        this.isFPSEnabled = typeof options.isFPSEnabled === 'function' ? options.isFPSEnabled : () => false;

        this.resolveOverlay = typeof options.resolveOverlay === 'function'
            ? options.resolveOverlay
            : () => {
                  if (typeof document === 'undefined') {
                      return null;
                  }
                  const elementId = options.fpsElementId ?? 'fps-display';
                  return document.getElementById(elementId) ?? null;
              };

        this.isOverlayAttached = typeof options.isOverlayAttached === 'function'
            ? options.isOverlayAttached
            : (element) => {
                  if (!element) {
                      return false;
                  }

                  if (typeof element.isConnected === 'boolean') {
                      return element.isConnected;
                  }

                  if (typeof document !== 'undefined' && document.body && typeof document.body.contains === 'function') {
                      return document.body.contains(element);
                  }

                  return Boolean(element.parentNode);
              };

        this.formatMemory = typeof options.formatMemory === 'function'
            ? options.formatMemory
            : (value) => value.toFixed(0);

        this.onWarningUpdate = typeof options.onWarningUpdate === 'function' ? options.onWarningUpdate : () => {};

        this.overlayElement = null;
        this.lastWarning = options.initialWarningTimestamp ?? 0;
        this.onWarningUpdate(this.lastWarning);
    }

    /**
     * Estimate total memory usage of the current image stack in megabytes.
     * @returns {number}
     */
    calculateUsageMB() {
        const stack = this.getImageStack() ?? [];

        const totalBytes = stack.reduce((sum, item) => {
            const width = item?.texture?.image?.width;
            const height = item?.texture?.image?.height;
            if (typeof width === 'number' && typeof height === 'number') {
                return sum + width * height * 4;
            }
            return sum;
        }, 0);

        return totalBytes / this.bytesPerMB;
    }

    /**
     * Public accessor for the most recent warning timestamp.
     * @returns {number}
     */
    getLastWarningTimestamp() {
        return this.lastWarning;
    }

    /**
     * Ensure FPS overlay shows latest memory usage, reacquiring the element if
     * RenderLoop recreated it.
     * @param {number} memoryMB
     */
    updateOverlay(memoryMB) {
        if (!this.isFPSEnabled()) {
            return;
        }

        if (!this.overlayElement || !this.isOverlayAttached(this.overlayElement)) {
            this.overlayElement = this.resolveOverlay() ?? null;
        }

        const overlay = this.overlayElement;
        if (!overlay || typeof overlay.innerHTML !== 'string') {
            return;
        }

        const memoryMarkup = `<br><small data-fps-memory="true" style="opacity: 0.7">${this.formatMemory(memoryMB)}MB</small>`;
        const existingHTML = overlay.innerHTML;
        const cleanedHTML = existingHTML.replace(/\s*<br><small\s+data-fps-memory="true"[^>]*>.*?<\/small>/, '');

        overlay.innerHTML = `${cleanedHTML}${memoryMarkup}`;
    }

    /**
     * Forces the monitor to reacquire the FPS overlay on the next update.
     */
    invalidateOverlay() {
        this.overlayElement = null;
    }

    /**
     * Evaluate memory and act on thresholds.
     * @param {boolean} [isAdding=false]
     * @returns {boolean} Whether processing should continue.
     */
    checkMemoryUsage(isAdding = false) {
        const memoryMB = this.calculateUsageMB();
        const stackSize = (this.getImageStack() ?? []).length;
        this.logMemory.info(` Current usage: ${memoryMB.toFixed(2)} MB (${stackSize} images)`);

        if (memoryMB >= this.thresholds.criticalMB) {
            const message = `Critical memory usage: ${memoryMB.toFixed(0)} MB!\n\n` +
                'Loading more images may cause browser slowdown or crash.\n\n' +
                'Continue anyway?';

            this.logMemory.warn(` CRITICAL: ${memoryMB.toFixed(2)} MB >= ${this.thresholds.criticalMB} MB`);

            if (isAdding) {
                return this.confirm(message);
            }

            this.showToast(`⚠️ Critical memory: ${memoryMB.toFixed(0)} MB`, 'error', this.toastDurations.errorMs);
            this.updateOverlay(memoryMB);
            return true;
        }

        const now = this.now();
        const shouldWarn = memoryMB >= this.thresholds.warningMB && now - this.lastWarning > this.thresholds.cooldownMs;

        if (shouldWarn) {
            this.logMemory.warn(` Warning: ${memoryMB.toFixed(2)} MB >= ${this.thresholds.warningMB} MB`);
            this.showToast(
                `⚠️ High memory usage: ${memoryMB.toFixed(0)} MB. Consider reducing image count.`,
                'warning',
                this.toastDurations.warningMs
            );
            this.lastWarning = now;
            this.onWarningUpdate(this.lastWarning);
        }

        this.updateOverlay(memoryMB);
        return true;
    }
}
