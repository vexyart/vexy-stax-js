// SPDX-License-Identifier: Apache-2.0
// this_file: src/automation/DebugAPI.js

import * as THREE from 'three';
import { BYTES_PER_MB, FLOOR_Y } from '../core/constants.js';
import { createLogger } from '../utils/logger.js';

const logAPI = createLogger('Debug API');

/**
 * DebugAPI exposes window.vexyStax for console debugging and automation.
 * All methods are safe to call - they check for null managers.
 */
export class DebugAPI {
    /**
     * @param {Object} options
     * @param {Array} options.imageStack
     * @param {Record<string, any>} options.params
     * @param {THREE.Scene} options.scene
     * @param {THREE.Camera} options.camera
     * @param {{ update: Function, target: THREE.Vector3 }} options.controls
     * @param {Object} [options.managers] - Optional manager references
     * @param {Object} [options.managers.renderLoop]
     * @param {Object} [options.managers.cameraAnimator]
     * @param {Object} [options.managers.cameraController]
     * @param {Object} [options.managers.ambienceManager]
     * @param {Object} [options.managers.floorManager]
     * @param {Object} [options.managers.memoryMonitor]
     * @param {Object} [options.managers.historyManager]
     * @param {{ refresh?: Function }} [options.pane]
     * @param {Object} [options.callbacks] - Action callbacks
     * @param {Function} [options.callbacks.exportPNG]
     * @param {Function} [options.callbacks.clearAll]
     * @param {Function} [options.callbacks.loadSettings]
     * @param {Function} [options.callbacks.saveSettings]
     * @param {Function} [options.callbacks.resetSettings]
     * @param {Function} [options.callbacks.undo]
     * @param {Function} [options.callbacks.redo]
     * @param {Function} [options.callbacks.toggleAmbience]
     */
    constructor(options) {
        this.imageStack = options.imageStack ?? [];
        this.params = options.params ?? {};
        this.scene = options.scene;
        this.camera = options.camera;
        this.controls = options.controls;
        this.managers = options.managers ?? {};
        this.pane = options.pane;
        this.callbacks = options.callbacks ?? {};

        // Track state
        this._showFPSEnabled = false;
    }

    /**
     * Update manager references (called after initialization).
     * @param {string} name
     * @param {Object} manager
     */
    setManager(name, manager) {
        this.managers[name] = manager;
    }

    /**
     * Expose window.vexyStax API.
     */
    expose() {
        const self = this;

        window.vexyStax = {
            // Export functions
            exportPNG: (scale = 1) => {
                logAPI.info(` Exporting PNG at ${scale}x`);
                self.callbacks.exportPNG?.(scale);
            },

            // Image management
            clearAll: () => {
                logAPI.info(' Clearing all images');
                self.callbacks.clearAll?.();
            },

            getImageStack: () => {
                const stack = self.imageStack.map((img, index) => ({
                    index,
                    filename: img.filename,
                    width: img.texture?.image?.width ?? img.width,
                    height: img.texture?.image?.height ?? img.height,
                    position: img.mesh ? {
                        x: img.mesh.position.x,
                        y: img.mesh.position.y,
                        z: img.mesh.position.z
                    } : null
                }));
                logAPI.info(' Image stack:', stack);
                return stack;
            },

            // Settings management
            loadSettings: () => {
                logAPI.info(' Loading settings');
                return self.callbacks.loadSettings?.();
            },

            saveSettings: () => {
                logAPI.info(' Saving settings');
                self.callbacks.saveSettings?.();
            },

            resetSettings: () => {
                logAPI.info(' Resetting settings to defaults');
                self.callbacks.resetSettings?.();
            },

            // History management
            undo: () => {
                logAPI.info(' Undo');
                self.callbacks.undo?.();
            },

            redo: () => {
                logAPI.info(' Redo');
                self.callbacks.redo?.();
            },

            // Performance monitoring
            showFPS: (enabled) => {
                logAPI.info(` FPS display: ${enabled ? 'enabled' : 'disabled'}`);
                self._showFPSEnabled = Boolean(enabled);
                self.managers.memoryMonitor?.invalidateOverlay?.();
                self.managers.renderLoop?.showFPS?.(self._showFPSEnabled);
            },

            // Stats and info
            getStats: () => {
                const fpsStats = self.managers.renderLoop?.getFPSStats?.() ?? { average: null };
                const fps = fpsStats.average;
                const historyManager = self.managers.historyManager;

                const stats = {
                    imageCount: self.imageStack.length,
                    totalPixels: self.imageStack.reduce((sum, img) => {
                        const tex = img.texture?.image;
                        return sum + (tex ? tex.width * tex.height : 0);
                    }, 0),
                    estimatedMemoryMB: self.imageStack.reduce((sum, img) => {
                        const tex = img.texture?.image;
                        return sum + (tex ? (tex.width * tex.height * 4) / BYTES_PER_MB : 0);
                    }, 0).toFixed(2),
                    cameraMode: self.params.cameraMode,
                    currentSettings: {
                        cameraMode: self.params.cameraMode,
                        cameraFOV: self.params.cameraFOV,
                        cameraZoom: self.params.cameraZoom,
                        bgColor: self.params.bgColor,
                        zSpacing: self.params.zSpacing
                    },
                    performance: {
                        fpsMonitorEnabled: self._showFPSEnabled,
                        currentFPS: fps,
                        historySize: historyManager
                            ? `${historyManager.getCurrentIndex?.() + 1}/${historyManager.getStackSize?.()}`
                            : 'N/A'
                    }
                };
                logAPI.info(' Stats:', stats);
                return stats;
            },

            // Animation
            playAnimation: async (config = {}) => {
                const cameraAnimator = self.managers.cameraAnimator;
                if (!cameraAnimator) {
                    logAPI.error(' Camera animator not initialized');
                    return;
                }

                if (self.imageStack.length === 0) {
                    logAPI.error(' No images loaded');
                    return;
                }

                const topSlide = self.imageStack[self.imageStack.length - 1];
                if (!topSlide) {
                    logAPI.error(' No top slide found');
                    return;
                }

                const duration = config.duration || self.params.animDuration;
                const easing = config.easing || self.params.animEasing;

                logAPI.info(` Playing hero shot animation (duration: ${duration}s, easing: ${easing})`);

                try {
                    await cameraAnimator.playHeroShot({
                        topSlide,
                        canvasSize: self.params.canvasSize,
                        duration,
                        easing,
                        imageStack: self.imageStack,
                        holdTime: config.holdTime,
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
                    logAPI.info(' Animation complete');
                } catch (error) {
                    logAPI.error(' Animation failed:', error);
                }
            },

            cancelAnimation: () => {
                const cameraAnimator = self.managers.cameraAnimator;
                if (!cameraAnimator) {
                    logAPI.error(' Camera animator not initialized');
                    return;
                }

                logAPI.info(' Cancelling animation');
                cameraAnimator.cancel();
            },

            // JSON configuration loading
            loadConfig: (config) => {
                logAPI.info(' Loading configuration from object');

                return new Promise((resolve, reject) => {
                    try {
                        if (!config.version || !config.params || !config.images) {
                            throw new Error('Invalid config format: missing version, params, or images');
                        }

                        self.callbacks.clearAll?.();

                        // Apply params
                        self.params.zSpacing = config.params.zSpacing;
                        self.params.bgColor = config.params.bgColor;
                        if (config.params.cameraMode) self.params.cameraMode = config.params.cameraMode;
                        if (config.params.cameraFOV) self.params.cameraFOV = config.params.cameraFOV;

                        // Update scene background
                        if (self.scene) {
                            self.scene.background = new THREE.Color(self.params.bgColor);
                        }

                        // Update camera
                        if (config.camera?.position && self.camera && self.controls) {
                            self.camera.position.set(
                                config.camera.position.x,
                                config.camera.position.y,
                                config.camera.position.z
                            );
                            self.camera.lookAt(0, 0, 0);
                            self.controls.update();
                        }

                        // Load images
                        const textureLoader = new THREE.TextureLoader();
                        const totalImages = config.images.length;
                        const loadPromises = config.images.map((imageConfig, index) => {
                            return new Promise((resolveImage, rejectImage) => {
                                textureLoader.load(
                                    imageConfig.dataURL,
                                    (texture) => {
                                        const geometry = new THREE.PlaneGeometry(
                                            imageConfig.width,
                                            imageConfig.height
                                        );
                                        const material = new THREE.MeshBasicMaterial({
                                            map: texture,
                                            side: THREE.FrontSide,
                                            transparent: true
                                        });

                                        const mesh = new THREE.Mesh(geometry, material);
                                        mesh.position.y = FLOOR_Y + (imageConfig.height / 2);
                                        const offset = (totalImages - 1 - index) * self.params.zSpacing;
                                        mesh.position.z = offset === 0 ? 0 : -offset;

                                        self.imageStack.push({
                                            mesh,
                                            texture,
                                            filename: imageConfig.filename,
                                            width: imageConfig.width,
                                            height: imageConfig.height
                                        });

                                        self.scene?.add(mesh);
                                        logAPI.info(` Loaded ${imageConfig.filename} from config`);
                                        resolveImage();
                                    },
                                    undefined,
                                    (error) => {
                                        logAPI.error(` Failed to load ${imageConfig.filename}:`, error);
                                        rejectImage(error);
                                    }
                                );
                            });
                        });

                        Promise.all(loadPromises)
                            .then(() => {
                                if (self.params.ambience > 0) {
                                    self.callbacks.toggleAmbience?.(self.params.ambience);
                                }

                                const cameraController = self.managers.cameraController;
                                if (cameraController && self.camera && self.controls) {
                                    const center = cameraController.getContentCenter();
                                    self.camera.lookAt(center);
                                    self.controls.target.copy(center);
                                    self.controls.update();
                                }

                                self.pane?.refresh?.();
                                logAPI.info(' Configuration loaded successfully');
                                resolve();
                            })
                            .catch((error) => {
                                logAPI.error(' Failed to load one or more images:', error);
                                reject(error);
                            });

                    } catch (error) {
                        logAPI.error(' Failed to load configuration:', error);
                        reject(error);
                    }
                });
            },

            // Help
            help: () => {
                console.log(`
%cVexy Stax Debug API
%c
Available commands:
  vexyStax.exportPNG(scale)  - Export PNG at 1x, 2x, 3x, or 4x resolution
  vexyStax.clearAll()        - Remove all images
  vexyStax.getImageStack()   - Get info about loaded images
  vexyStax.undo()            - Undo last change
  vexyStax.redo()            - Redo last undone change
  vexyStax.showFPS(enabled)  - Toggle FPS counter (true/false)
  vexyStax.loadSettings()    - Load settings from localStorage
  vexyStax.saveSettings()    - Save current settings
  vexyStax.resetSettings()   - Reset to default settings
  vexyStax.getStats()        - Get memory and image statistics
  vexyStax.loadConfig(config) - Load JSON configuration object
  vexyStax.playAnimation(config) - Play hero shot animation
  vexyStax.cancelAnimation() - Cancel current animation
  vexyStax.help()            - Show this help

Example:
  vexyStax.exportPNG(2)      // Export at 2x resolution
  vexyStax.showFPS(true)     // Enable FPS counter
                `,
                'color: #00ff00; font-size: 16px; font-weight: bold',
                'color: #ccc'
                );
            }
        };

        logAPI.log('%c Type vexyStax.help() for available commands', 'color: #00ff00');
    }

    /**
     * Remove window.vexyStax API.
     */
    dispose() {
        delete window.vexyStax;
    }
}
