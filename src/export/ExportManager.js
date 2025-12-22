// SPDX-License-Identifier: Apache-2.0
// this_file: src/export/ExportManager.js

import * as THREE from 'three';

import {
    Z_INDEX_MODAL,
    BYTES_PER_MB,
    OVERLAY_RENDER_DELAY,
    TOAST_DURATION_ERROR,
    TOAST_DURATION_INFO,
    TOAST_DURATION_WARNING,
    MAX_DIMENSION_PX,
    MAX_LOAD_RETRIES,
    RETRY_DELAYS_MS
} from '../core/constants.js';

const PNG_MIME = 'image/png';
const JSON_MIME = 'application/json';

/**
 * Default asynchronous file reader for browser environments.
 * @param {File} file
 * @returns {Promise<string>}
 */
function readFileAsTextDefault(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsText(file);
    });
}

/**
 * ExportManager encapsulates PNG/JSON export and import/clipboard routines.
 */
export class ExportManager {
    /**
     * @param {Object} options
     * @param {THREE.WebGLRenderer} options.renderer
     * @param {THREE.Scene} options.scene
     * @param {Array} options.imageStack
     * @param {Record<string, any>} options.params
     * @param {THREE.Camera} options.camera
     * @param {THREE.Camera} options.orthoCamera
     * @param {{ update: Function }} options.controls
     * @param {{ info: Function, warn: Function, error: Function }} options.logExport
     * @param {(message: string, type?: string, duration?: number) => void} options.showToast
     * @param {() => void} options.clearAll
     * @param {() => void} options.updateImageList
     * @param {(reason: string) => void} options.emitStackUpdated
     * @param {() => void} options.updateBackground
     * @param {{ refresh: Function }} [options.pane]
     * @param {() => THREE.Camera} options.getActiveCamera
     * @param {Document} [options.document]
     * @param {Window} [options.window]
     * @param {Navigator} [options.navigator]
     * @param {(message: string) => void} [options.alert]
     * @param {() => any} [options.createTextureLoader]
     * @param {() => HTMLCanvasElement} [options.createCanvas]
     * @param {() => HTMLAnchorElement} [options.createAnchor]
     * @param {(file: File) => Promise<string>} [options.readFileAsText]
     * @param {{ createObjectURL?: Function, revokeObjectURL?: Function }} [options.urlAPI]
     * @param {() => Date} [options.now]
     * @param {() => number} [options.getEffectiveZSpacing]
     */
    constructor(options) {
        this.renderer = options.renderer;
        this.scene = options.scene;
        this.imageStack = options.imageStack;
        this.params = options.params;
        this.camera = options.camera;
        this.orthoCamera = options.orthoCamera ?? options.camera;
        this.controls = options.controls;
        this.logExport = options.logExport;
        this.showToast = options.showToast ?? (() => {});
        this.clearAll = options.clearAll ?? (() => {});
        this.updateImageList = options.updateImageList ?? (() => {});
        this.emitStackUpdated = options.emitStackUpdated ?? (() => {});
        this.updateBackground = options.updateBackground ?? (() => {});
        this.pane = options.pane ?? { refresh: () => {} };
        this.getActiveCamera = options.getActiveCamera ?? (() => this.camera);
        this.getEffectiveZSpacing = options.getEffectiveZSpacing ?? (() => this.params.zSpacing ?? 100);

        this.document = options.document ?? globalThis.document;
        this.window = options.window ?? globalThis;
        this.navigator = options.navigator ?? globalThis.navigator;
        this.alert = options.alert ?? ((message) => {
            if (typeof globalThis.alert === 'function') {
                globalThis.alert(message);
            }
        });

        this.createTextureLoader = options.createTextureLoader ?? (() => new THREE.TextureLoader());
        this.createCanvas = options.createCanvas ?? (() => this.document?.createElement?.('canvas'));
        this.createAnchor = options.createAnchor ?? (() => this.document?.createElement?.('a'));
        this.readFileAsText = options.readFileAsText ?? readFileAsTextDefault;
        this.urlAPI = options.urlAPI ?? this.window?.URL ?? {};
        this.now = options.now ?? (() => new Date());

        this.setTimeout = this.window?.setTimeout?.bind(this.window) ?? globalThis.setTimeout;

        if (!this.renderer || !this.scene || !this.imageStack || !this.params || !this.camera || !this.controls) {
            throw new Error('ExportManager: missing required dependencies');
        }
    }

    /**
     * Export current scene as PNG.
     * @param {number} scale
     * @returns {Promise<void>}
     */
    async exportPNG(scale = 1) {
        if (!Array.isArray(this.imageStack) || this.imageStack.length === 0) {
            this.logExport?.warn?.(' No images loaded - cannot export empty scene');
            this.showToast('⚠️ Load images first', 'warning');
            return;
        }

        let safeScale = Number(scale);
        if (!Number.isFinite(safeScale) || safeScale < 1 || safeScale > 4) {
            this.logExport?.warn?.(`Invalid scale parameter: ${scale}. Using 1x instead.`);
            safeScale = 1;
        }

        this.logExport?.info?.(`Exporting PNG at ${safeScale}x resolution...`);

        // Always show overlay for visual feedback during export
        const overlayNode = this.#createOverlay(safeScale);

        await new Promise((resolve) => {
            this.setTimeout?.(() => {
                const originalPixelRatio = this.renderer.getPixelRatio();
                let activeCamera = null;
                let scaled = false;
                let exportSucceeded = false;
                try {
                    if (safeScale > 1) {
                        this.renderer.setPixelRatio(originalPixelRatio * safeScale);
                        scaled = true;
                    }
                    activeCamera = this.getActiveCamera();
                    this.renderer.render(this.scene, activeCamera);

                    const dataURL = this.renderer.domElement.toDataURL(PNG_MIME);
                    if (!dataURL || !dataURL.startsWith(`data:${PNG_MIME}`)) {
                        throw new Error('exportPNG: failed to generate PNG data URL');
                    }

                    const base64Length = dataURL.length - `data:${PNG_MIME};base64,`.length;
                    const fileSizeBytes = (base64Length * 3) / 4;
                    const fileSizeMB = (fileSizeBytes / BYTES_PER_MB).toFixed(2);

                    const link = this.createAnchor();
                    if (!link) {
                        throw new Error('exportPNG: anchor element unavailable');
                    }

                    const timestamp = this.now().toISOString().replace(/[:.]/g, '-').slice(0, -5);
                    const filename = `vexy-stax-${safeScale}x-${timestamp}.png`;
                    link.download = filename;
                    link.href = dataURL;

                    if (this.document?.body) {
                        this.document.body.appendChild(link);
                    }

                    let downloadSuccess = false;
                    try {
                        link.click();
                        downloadSuccess = true;
                    } finally {
                        if (this.document?.body?.removeChild) {
                            this.document.body.removeChild(link);
                        }
                    }

                    const dimensions = `${this.renderer.domElement.width}x${this.renderer.domElement.height}px`;
                    this.logExport?.info?.(` PNG exported successfully: ${filename} (${dimensions}, ~${fileSizeMB} MB)`);

                    if (downloadSuccess) {
                        this.showToast(`✓ Exported: ${filename} (${fileSizeMB} MB)`, 'success', TOAST_DURATION_INFO);
                    }
                    exportSucceeded = true;
                } catch (error) {
                    this.logExport?.error?.(' Export failed:', error);
                    this.showToast(`❌ Export failed: ${error.message}`, 'error', TOAST_DURATION_ERROR);
                } finally {
                    if (scaled) {
                        this.renderer.setPixelRatio(originalPixelRatio);
                        if (exportSucceeded && activeCamera) {
                            try {
                                this.renderer.render(this.scene, activeCamera);
                            } catch (renderError) {
                                this.logExport?.warn?.(' Re-render after PNG export failed:', renderError);
                            }
                        }
                    }

                    if (overlayNode && this.document?.body?.removeChild) {
                        this.document.body.removeChild(overlayNode);
                    }
                    resolve();
                }
            }, OVERLAY_RENDER_DELAY);
        });
    }

    /**
     * Export current scene configuration as JSON download.
     * @returns {Promise<void>}
     */
    async exportJSON() {
        if (!Array.isArray(this.imageStack) || this.imageStack.length === 0) {
            this.logExport?.warn?.(' No images loaded - cannot export empty configuration');
            this.showToast('⚠️ Load images first', 'warning');
            return;
        }

        this.logExport?.info?.('Exporting JSON configuration...');
        const config = this.#buildConfig({ includeExtendedParams: false });
        const json = JSON.stringify(config, null, 2);
        const blob = new Blob([json], { type: JSON_MIME });

        const url = this.urlAPI?.createObjectURL?.(blob) ?? `data:${JSON_MIME};base64,${globalThis.btoa?.(json) ?? ''}`;
        const link = this.createAnchor();
        if (!link) {
            this.logExport?.error?.(' Unable to create anchor element for JSON export');
            return;
        }

        const timestamp = this.now().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        link.download = `vexy-stax-config-${timestamp}.json`;
        link.href = url;

        if (this.document?.body) {
            this.document.body.appendChild(link);
        }

        try {
            link.click();
            this.logExport?.info?.(`JSON exported successfully as ${link.download}`);
        } finally {
            if (this.document?.body?.removeChild) {
                this.document.body.removeChild(link);
            }
            if (url && this.urlAPI?.revokeObjectURL) {
                this.urlAPI.revokeObjectURL(url);
            }
        }
    }

    /**
     * Copy configuration JSON to clipboard.
     * @returns {Promise<void>}
     */
    async copyJSON() {
        if (!Array.isArray(this.imageStack) || this.imageStack.length === 0) {
            this.logExport?.warn?.(' No images loaded - cannot copy empty configuration');
            this.showToast('⚠️ Load images first', 'warning');
            return;
        }

        if (!this.navigator?.clipboard?.writeText) {
            this.showToast('⚠️ Clipboard API unavailable', 'warning', TOAST_DURATION_WARNING);
            return;
        }

        const config = this.#buildConfig({ includeExtendedParams: true });
        const json = JSON.stringify(config, null, 2);

        try {
            await this.navigator.clipboard.writeText(json);
            this.logExport?.info?.('JSON configuration copied to clipboard');
            this.showToast('📋 Configuration copied to clipboard!', 'success', TOAST_DURATION_INFO);
        } catch (error) {
            this.logExport?.error?.('Failed to copy to clipboard:', error);
            this.showToast('⚠️ Failed to copy to clipboard', 'warning', TOAST_DURATION_WARNING);
        }
    }

    /**
     * Import configuration from file.
     * @param {File} file
     * @returns {Promise<void>}
     */
    async importJSON(file) {
        if (!file) {
            this.logExport?.error?.('No file provided for import');
            this.showToast('⚠️ Select a configuration file first', 'warning');
            return;
        }

        this.logExport?.info?.(`Importing JSON configuration from ${file.name}...`);

        try {
            const text = await this.readFileAsText(file);
            const config = JSON.parse(text);
            this.#applyConfig(config);
            this.logExport?.info?.('JSON configuration imported successfully');
        } catch (error) {
            this.logExport?.error?.('Failed to import JSON:', error);
            this.showToast(`❌ Failed to import configuration: ${error.message}`, 'error', TOAST_DURATION_ERROR);
            this.alert(`Failed to import configuration: ${error.message}`);
        }
    }

    /**
     * Import configuration from clipboard text.
     * @returns {Promise<void>}
     */
    async pasteJSON() {
        if (!this.navigator?.clipboard?.readText) {
            this.showToast('⚠️ Clipboard read not supported', 'warning', TOAST_DURATION_WARNING);
            return;
        }

        this.logExport?.info?.('Pasting JSON configuration from clipboard...');

        try {
            const text = await this.navigator.clipboard.readText();
            const config = JSON.parse(text);
            this.#applyConfig(config);
            this.logExport?.info?.('JSON configuration pasted successfully');
            this.alert('Configuration pasted from clipboard!');
        } catch (error) {
            this.logExport?.error?.('Failed to parse JSON from clipboard:', error);
            this.showToast(`❌ Failed to paste configuration: ${error.message}`, 'error', TOAST_DURATION_ERROR);
            this.alert(`Failed to paste configuration: ${error.message}`);
        }
    }

    #createOverlay(scale) {
        if (!this.document?.createElement) {
            return null;
        }

        const overlay = this.document.createElement('div');
        // ARIA: Modal dialog for export progress
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'export-overlay-title');
        overlay.setAttribute('aria-describedby', 'export-overlay-desc');
        overlay.style.cssText = [
            'position: fixed',
            'top: 0',
            'left: 0',
            'width: 100%',
            'height: 100%',
            'background: rgba(0, 0, 0, 0.8)',
            'color: white',
            'display: flex',
            'flex-direction: column',
            'align-items: center',
            'justify-content: center',
            "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            `z-index: ${Z_INDEX_MODAL}`
        ].join(';');
        overlay.innerHTML = `
            <div style="text-align: center;">
                <div id="export-overlay-title" style="font-size: 24px; margin-bottom: 10px;">Exporting...</div>
                <div id="export-overlay-desc" style="font-size: 16px; opacity: 0.7;">Rendering at ${scale}x resolution</div>
                <div style="margin-top: 20px; font-size: 14px; opacity: 0.5;">Please wait...</div>
            </div>
        `;

        this.document.body?.appendChild?.(overlay);
        return overlay;
    }

    #buildConfig({ includeExtendedParams }) {
        const config = {
            version: '1.0',
            params: {
                zSpacing: this.params.zSpacing,
                bgColor: this.params.bgColor
            },
            camera: {
                position: {
                    x: this.camera.position.x,
                    y: this.camera.position.y,
                    z: this.camera.position.z
                }
            },
            images: []
        };

        if (includeExtendedParams) {
            config.params.cameraMode = this.params.cameraMode;
            config.params.cameraFOV = this.params.cameraFOV;
            config.params.transparentBg = this.params.transparentBg;
        }

        this.imageStack.forEach((imageData) => {
            const serialized = this.#serializeImage(imageData);
            if (serialized) {
                config.images.push(serialized);
            }
        });

        return config;
    }

    #serializeImage(imageData) {
        const texture = imageData?.mesh?.material?.map ?? imageData?.texture;
        const sourceImage = texture?.image;
        if (!texture || !sourceImage || !this.createCanvas) {
            return null;
        }

        const canvas = this.createCanvas();
        const context = canvas?.getContext?.('2d');
        if (!canvas || !context) {
            return null;
        }

        canvas.width = sourceImage.width;
        canvas.height = sourceImage.height;
        context.drawImage(sourceImage, 0, 0);
        const dataURL = canvas.toDataURL(PNG_MIME);

        return {
            filename: imageData.filename,
            dataURL,
            width: imageData.width,
            height: imageData.height
        };
    }

    #applyConfig(config) {
        if (!config || !config.version || !config.params || !Array.isArray(config.images)) {
            throw new Error('Invalid config format');
        }

        this.clearAll();

        this.params.zSpacing = config.params.zSpacing;
        this.params.bgColor = config.params.bgColor;
        if (config.params.cameraMode) {
            this.params.cameraMode = config.params.cameraMode;
        }
        if (config.params.cameraFOV) {
            this.params.cameraFOV = config.params.cameraFOV;
        }
        if (config.params.transparentBg !== undefined) {
            this.params.transparentBg = config.params.transparentBg;
        }

        if (this.scene) {
            this.scene.background = new THREE.Color(this.params.transparentBg ? 0x000000 : this.params.bgColor);
            if (this.params.transparentBg) {
                this.scene.background = null;
            }
        }

        this.updateBackground();

        if (config.camera?.position) {
            this.camera.position.set(
                config.camera.position.x,
                config.camera.position.y,
                config.camera.position.z
            );
            this.camera.lookAt(0, 0, 0);
            this.controls.update();
        }

        config.images.forEach((imageConfig, index) => {
            this.#loadTextureWithRetry(imageConfig, index, 0);
        });

        this.pane?.refresh?.();
    }

    #loadTextureWithRetry(imageConfig, index, attempt) {
        const loader = this.createTextureLoader();
        loader.load(
            imageConfig.dataURL,
            (texture) => {
                const img = texture.image;
                if (img.width > MAX_DIMENSION_PX || img.height > MAX_DIMENSION_PX) {
                    this.logExport?.warn?.(`Warning: Image ${imageConfig.filename} has large dimensions (${img.width}x${img.height}). Max recommended: ${MAX_DIMENSION_PX}px.`);
                    this.showToast(
                        `⚠️ Large dimensions: ${imageConfig.filename} (${img.width}x${img.height}px). May render slowly`,
                        'warning',
                        TOAST_DURATION_WARNING
                    );
                }

                if (attempt > 0) {
                    this.logExport?.info?.(`Successfully loaded ${imageConfig.filename} on attempt ${attempt + 1}`);
                }

                const geometry = new THREE.PlaneGeometry(imageConfig.width, imageConfig.height);
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide,
                    transparent: true
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.position.z = index * this.getEffectiveZSpacing();

                const imageData = {
                    mesh,
                    texture,
                    filename: imageConfig.filename,
                    width: imageConfig.width,
                    height: imageConfig.height,
                    originalWidth: imageConfig.width,
                    originalHeight: imageConfig.height,
                    id: Date.now() + Math.random()
                };

                this.imageStack.push(imageData);
                this.scene.add(mesh);
                this.updateImageList();
                this.emitStackUpdated('imported');
                this.logExport?.info?.(`Loaded ${imageConfig.filename} from config`);
            },
            undefined,
            (error) => {
                if (attempt < MAX_LOAD_RETRIES) {
                    const delay = RETRY_DELAYS_MS[attempt];
                    this.logExport?.warn?.(`Failed to load ${imageConfig.filename} (attempt ${attempt + 1}/${MAX_LOAD_RETRIES + 1}). Retrying in ${delay}ms...`, error);
                    this.setTimeout?.(() => {
                        this.#loadTextureWithRetry(imageConfig, index, attempt + 1);
                    }, delay);
                } else {
                    this.logExport?.error?.(`Failed to load ${imageConfig.filename} after ${MAX_LOAD_RETRIES + 1} attempts:`, error);
                    this.showToast(`❌ Failed to load: ${imageConfig.filename}. Check file is valid`, 'error', TOAST_DURATION_ERROR);
                }
            }
        );
    }
}
