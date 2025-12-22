// SPDX-License-Identifier: Apache-2.0
// this_file: src/files/TextureLoader.js

/**
 * RetryingTextureLoader wraps a Three.js TextureLoader instance with retry logic.
 * Dependencies are injected so the loader can be tested without touching the DOM.
 */
export class RetryingTextureLoader {
    /**
     * @param {Object} options
     * @param {() => { load: Function }} options.createLoader - Factory returning a loader with a `load` method.
     * @param {number} options.maxRetries - Number of retry attempts after the initial load.
     * @param {number[]} options.retryDelays - Delay (ms) before each retry; last value reused when shorter than retries.
     * @param {(callback: Function, delay: number) => void} [options.scheduleRetry] - Scheduler, defaults to `setTimeout`.
     * @param {(texture: any, meta: { attempt: number }) => void} [options.onTextureLoaded] - Success callback.
     * @param {{ info?: Function, warn?: Function, error?: Function }} [options.logRetry] - Logger facade.
     * @param {(message: string, type: string, duration?: number) => void} [options.showToast] - Toast emitter.
     * @param {number} [options.toastDurationError] - Duration for error toasts (ms).
     */
    constructor(options) {
        if (typeof options?.createLoader !== 'function') {
            throw new Error('[RetryingTextureLoader] createLoader must be provided');
        }
        if (!Number.isInteger(options.maxRetries) || options.maxRetries < 0) {
            throw new Error('[RetryingTextureLoader] maxRetries must be a non-negative integer');
        }

        this.createLoader = options.createLoader;
        this.maxRetries = options.maxRetries;
        const retryDelays = Array.isArray(options.retryDelays) ? options.retryDelays.slice() : [];
        const invalidDelay = retryDelays.find(
            (value) => typeof value !== 'number' || !Number.isFinite(value) || value < 0
        );
        if (invalidDelay !== undefined) {
            throw new Error('[RetryingTextureLoader] retryDelays must contain non-negative numbers');
        }
        this.retryDelays = retryDelays;
        if (options.scheduleRetry === undefined) {
            this.scheduleRetry = (callback, delay) => setTimeout(callback, delay);
        } else if (typeof options.scheduleRetry === 'function') {
            this.scheduleRetry = options.scheduleRetry;
        } else {
            throw new Error('[RetryingTextureLoader] scheduleRetry must be a function');
        }
        this.onTextureLoaded = options.onTextureLoaded ?? (() => {});
        this.logRetry = options.logRetry ?? { info: () => {}, warn: () => {}, error: () => {} };
        this.showToast = typeof options.showToast === 'function' ? options.showToast : () => {};
        this.toastDurationError = options.toastDurationError ?? 3000;
    }

    /**
     * Attempt to load a texture with retry logic.
     * @param {string} dataURL
     * @param {string} filename
     */
    load(dataURL, filename) {
        this.#loadInternal(dataURL, filename, 0);
    }

    #loadInternal(dataURL, filename, attempt) {
        const loader = this.createLoader();
        if (typeof loader?.load !== 'function') {
            this.logRetry.error?.(
                `[RetryingTextureLoader] Loader missing load() for ${filename}`,
                { filename }
            );
            this.showToast(
                `❌ Failed to load: ${filename}. Loader misconfigured.`,
                'error',
                this.toastDurationError
            );
            return;
        }
        loader.load(
            dataURL,
            (texture) => {
                if (attempt > 0) {
                    this.logRetry.info?.(`Successfully loaded ${filename} on attempt ${attempt + 1}`);
                }
                this.onTextureLoaded(texture, { attempt });
            },
            undefined,
            (error) => {
                if (attempt < this.maxRetries) {
                    const delay = this.#resolveDelay(attempt);
                    this.logRetry.warn?.(
                        `Failed to load ${filename} (attempt ${attempt + 1}/${this.maxRetries + 1}). Retrying in ${delay}ms...`,
                        error
                    );
                    this.scheduleRetry(() => {
                        this.#loadInternal(dataURL, filename, attempt + 1);
                    }, delay);
                    return;
                }

                this.logRetry.error?.(
                    `Failed to load ${filename} after ${this.maxRetries + 1} attempts:`,
                    error
                );
                this.showToast(`❌ ${filename} failed to load. Try re-exporting the image`, 'error', this.toastDurationError);
            }
        );
    }

    #resolveDelay(attempt) {
        if (this.retryDelays.length === 0) {
            return 0;
        }
        if (attempt < this.retryDelays.length) {
            return this.retryDelays[attempt];
        }
        return this.retryDelays[this.retryDelays.length - 1];
    }
}
