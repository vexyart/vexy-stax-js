// SPDX-License-Identifier: Apache-2.0
// this_file: src/automation/AutomationBridge.js

import { CAMERA_DEFAULT_DISTANCE, VIEWPOINT_PRESETS, EVENTS } from '../core/constants.js';
import { eventBus } from '../core/EventBus.js';

/**
 * AutomationBridge exposes window.__vexyStaxAutomation for E2E testing.
 * All methods are async-safe and return promises.
 */
export class AutomationBridge {
    /**
     * @param {Object} options
     * @param {Array} options.imageStack
     * @param {Record<string, any>} options.params
     * @param {Object} [options.managers] - Manager references
     * @param {Object} [options.managers.cameraAnimator]
     * @param {Object} [options.managers.ambienceManager]
     * @param {Object} [options.managers.floorManager]
     * @param {Object} [options.callbacks] - Action callbacks
     * @param {Function} [options.callbacks.loadImage]
     * @param {Function} [options.callbacks.setViewpoint]
     * @param {Function} [options.callbacks.setBeautyViewpoint]
     * @param {Function} [options.callbacks.setHeroViewpoint]
     * @param {Function} [options.callbacks.setViewpointFitToFrame]
     * @param {Function} [options.callbacks.centerViewOnContent]
     */
    constructor(options) {
        this.imageStack = options.imageStack ?? [];
        this.params = options.params ?? {};
        this.managers = options.managers ?? {};
        this.callbacks = options.callbacks ?? {};
    }

    /**
     * Update manager references.
     * @param {string} name
     * @param {Object} manager
     */
    setManager(name, manager) {
        this.managers[name] = manager;
    }

    /**
     * Expose window.__vexyStaxAutomation API.
     */
    expose() {
        if (typeof window === 'undefined') {
            return;
        }

        const self = this;

        const automation = {
            /**
             * Add a slide from a base64 data URL.
             * @param {string} dataURL - Base64-encoded image data URL
             * @param {string} [filename='playwright-slide.png'] - Filename for the slide
             */
            async addSlideFromDataURL(dataURL, filename = 'playwright-slide.png') {
                if (typeof dataURL !== 'string' || dataURL.length === 0) {
                    throw new Error('addSlideFromDataURL requires a base64 data URL string');
                }
                const response = await fetch(dataURL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch slide data (status ${response.status})`);
                }
                const blob = await response.blob();
                const type = blob.type || 'image/png';
                const file = new File([blob], filename, { type });
                const initialCount = self.imageStack.length;

                await new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => {
                        unsubscribe();
                        reject(new Error('addSlideFromDataURL timed out after 30s'));
                    }, 30000);

                    const unsubscribe = eventBus.once(EVENTS.stackUpdated, () => {
                        clearTimeout(timeout);
                        resolve();
                    });

                    try {
                        self.callbacks.loadImage?.(file);
                    } catch (error) {
                        clearTimeout(timeout);
                        unsubscribe();
                        reject(error);
                    }
                });
            },

            /**
             * Add multiple slides in sequence.
             * @param {Array<{dataURL: string, filename?: string}>} slides
             */
            async addSlides(slides = []) {
                for (const slide of slides) {
                    await automation.addSlideFromDataURL(slide?.dataURL, slide?.filename);
                }
            },

            /**
             * Set camera to a viewpoint preset.
             * @param {string|Array|Object} preset - Preset name, [x,y,z] array, or {x,y,z} object
             */
            async setViewpointPreset(preset) {
                const key = preset;

                if (key === 'beauty') {
                    self.callbacks.setBeautyViewpoint?.();
                    return;
                }
                if (key === 'hero') {
                    self.callbacks.setHeroViewpoint?.();
                    return;
                }
                if (key === 'front') {
                    self.callbacks.setViewpointFitToFrame?.();
                    return;
                }
                if (key === 'center' || preset === null) {
                    self.callbacks.centerViewOnContent?.();
                    return;
                }

                const presetConfig = VIEWPOINT_PRESETS[key];
                if (presetConfig === 'fitToFrame') {
                    self.callbacks.setViewpointFitToFrame?.();
                    return;
                }
                if (presetConfig && typeof presetConfig === 'object') {
                    self.callbacks.setViewpoint?.(presetConfig.x, presetConfig.y, presetConfig.z);
                    return;
                }
                if (Array.isArray(preset) && preset.length === 3) {
                    self.callbacks.setViewpoint?.(preset[0], preset[1], preset[2]);
                    return;
                }
                if (typeof preset === 'object' && preset) {
                    const { x = 0, y = 0, z = CAMERA_DEFAULT_DISTANCE } = preset;
                    self.callbacks.setViewpoint?.(x, y, z);
                    return;
                }

                throw new Error(`Unknown viewpoint preset: ${preset}`);
            },

            /**
             * Play the hero shot animation.
             * @param {Object} [options] - Animation options
             * @param {number} [options.duration] - Animation duration in seconds
             * @param {string} [options.easing] - Easing function name
             * @param {number} [options.holdTime] - Hold time at culmination
             */
            async playHeroShot(options = {}) {
                const cameraAnimator = self.managers.cameraAnimator;
                if (!cameraAnimator) {
                    throw new Error('Camera animator not initialized');
                }

                const topSlide = self.imageStack[self.imageStack.length - 1];
                if (!topSlide) {
                    throw new Error('No slides available for hero shot');
                }

                await cameraAnimator.playHeroShot({
                    topSlide,
                    canvasSize: self.params.canvasSize,
                    duration: options.duration ?? self.params.animDuration,
                    easing: options.easing ?? self.params.animEasing,
                    imageStack: self.imageStack,
                    holdTime: options.holdTime,
                    startAmbience: self.params.ambience ?? 0,
                    onAmbienceChange: (value) => {
                        self.params.ambience = value;
                        const enabled = value > 0;
                        self.managers.ambienceManager?.updateMaterials?.(enabled);
                        if (enabled) {
                            self.managers.ambienceManager?.applyEmissiveIntensity?.(value * 0.25);
                        }
                        self.managers.floorManager?.updateMaterial?.(enabled);
                    }
                });
            }
        };

        window.__vexyStaxAutomation = automation;
    }

    /**
     * Remove window.__vexyStaxAutomation API.
     */
    dispose() {
        if (typeof window !== 'undefined') {
            delete window.__vexyStaxAutomation;
        }
    }
}
