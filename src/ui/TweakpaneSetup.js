// SPDX-License-Identifier: Apache-2.0
// this_file: src/ui/TweakpaneSetup.js

import { Pane as DefaultPane } from 'tweakpane';
import * as EssentialsPlugin from '@kitschpatrol/tweakpane-plugin-essentials';
import * as ColorPlusPlugin from 'tweakpane-plugin-color-plus';

import { MATERIAL_PRESETS, VIEWPOINT_PRESETS } from '../core/constants.js';

const noop = () => {};

function safeCall(fn, context, ...args) {
    if (typeof fn === 'function') {
        return fn.apply(context, args);
    }
    return undefined;
}

export class TweakpaneSetup {
    constructor({
        Pane = DefaultPane,
        plugins = {},
        params,
        materialPresets = MATERIAL_PRESETS,
        viewpointPresets = VIEWPOINT_PRESETS,
        callbacks = {},
        dependencies = {}
    }) {
        this.Pane = Pane;
        this.plugins = {
            essentials: plugins.essentials ?? EssentialsPlugin,
            colorPlus: plugins.colorPlus ?? ColorPlusPlugin
        };
        this.params = params ?? {};
        this.materialPresets = materialPresets;
        this.viewpointPresets = viewpointPresets;
        this.callbacks = {
            updateCanvasSize: callbacks.updateCanvasSize ?? noop,
            updateBackground: callbacks.updateBackground ?? noop,
            toggleAmbience: callbacks.toggleAmbience ?? noop,
            centerViewOnContent: callbacks.centerViewOnContent ?? noop,
            setViewpoint: callbacks.setViewpoint ?? noop,
            setBeautyViewpoint: callbacks.setBeautyViewpoint ?? noop,
            setViewpointFitToFrame: callbacks.setViewpointFitToFrame ?? noop,
            switchCameraMode: callbacks.switchCameraMode ?? noop,
            updateZoom: callbacks.updateZoom ?? noop,
            setCameraFOV: callbacks.setCameraFOV ?? noop,
            applyMaterialPreset: callbacks.applyMaterialPreset ?? noop,
            updateZSpacing: callbacks.updateZSpacing ?? noop,
            exportPNG: callbacks.exportPNG ?? noop,
            exportJSON: callbacks.exportJSON ?? noop,
            importJSON: callbacks.importJSON ?? noop,
            copyJSON: callbacks.copyJSON ?? noop,
            pasteJSON: callbacks.pasteJSON ?? noop,
            resetSettings: callbacks.resetSettings ?? noop,
            clearAll: callbacks.clearAll ?? noop,
            undo: callbacks.undo ?? noop,
            redo: callbacks.redo ?? noop,
            loadImage: callbacks.loadImage ?? noop,
            showToast: callbacks.showToast ?? noop,
            saveSettings: callbacks.saveSettings ?? noop,
            playHeroShot: callbacks.playHeroShot ?? (async () => {})
        };
        this.cameraAnimator = dependencies.cameraAnimator ?? { playHeroShot: async () => {} };
        this.logUI = dependencies.logUI ?? { info: noop, error: noop };
        this.logCamera = dependencies.logCamera ?? { error: noop };
        this.confirm = dependencies.confirm ?? ((message) => (typeof globalThis.confirm === 'function' ? globalThis.confirm(message) : true));
        this.document = dependencies.document ?? globalThis.document;
        this.imageStack = dependencies.imageStack ?? [];
        this.pane = null;
    }

    setup() {
        if (this.pane) {
            return this.pane;
        }

        const controlsContainer = this.document?.getElementById?.('controls');
        if (!controlsContainer) {
            this.logUI?.error?.('Controls container not found!');
            return null;
        }

        const pane = new this.Pane({
            title: 'Vexy-Stax Controls',
            container: controlsContainer,
            expanded: true
        });

        if (this.plugins.essentials) {
            safeCall(pane.registerPlugin, pane, this.plugins.essentials);
        }
        if (this.plugins.colorPlus) {
            safeCall(pane.registerPlugin, pane, this.plugins.colorPlus);
        }

        this.logUI?.info?.('Tweakpane created successfully');

        this.#buildStudioFolder(pane);
        this.#buildCameraFolder(pane);
        this.#buildSlidesFolder(pane);
        this.#buildTabs(pane);

        this.pane = pane;
        return pane;
    }

    teardown() {
        if (this.pane?.dispose) {
            this.pane.dispose();
        }
        this.pane = null;
    }

    #buildStudioFolder(pane) {
        const studioFolder = pane.addFolder({
            title: 'Studio',
            expanded: true
        });

        studioFolder.addBinding(this.params, 'canvasSize', {
            label: 'Size',
            x: { min: 640, max: 3840, step: 1 },
            y: { min: 480, max: 2160, step: 1 }
        }).on('change', (ev) => {
            this.callbacks.updateCanvasSize(ev.value);
            this.callbacks.saveSettings();
        });

        studioFolder.addBinding(this.params, 'bgColor', {
            label: 'Color',
            view: 'color',
            picker: 'inline',
            expanded: false
        }).on('change', () => {
            this.callbacks.updateBackground();
            this.callbacks.saveSettings();
        });

        studioFolder.addBinding(this.params, 'transparentBg', {
            label: 'Transparent'
        }).on('change', () => {
            this.callbacks.updateBackground();
            this.callbacks.saveSettings();
        });

        studioFolder.addBinding(this.params, 'ambience', {
            label: 'Ambience'
        }).on('change', (ev) => {
            this.callbacks.toggleAmbience(ev.value);
            this.callbacks.saveSettings();
        });
    }

    #buildCameraFolder(pane) {
        const cameraFolder = pane.addFolder({
            title: 'Camera',
            expanded: true
        });

        cameraFolder.addBinding(this.params, 'viewpointPreset', {
            label: 'Viewpoint',
            options: {
                Beauty: 'beauty',
                Center: 'center',
                Front: 'front',
                Top: 'top',
                Isometric: 'isometric',
                '3D Stack': '3d-stack',
                Side: 'side'
            }
        }).on('change', (ev) => {
            const presetKey = ev.value;
            const preset = this.viewpointPresets[presetKey];
            if (presetKey === 'beauty') {
                this.callbacks.setBeautyViewpoint();
            } else if (preset === null || presetKey === 'center') {
                this.callbacks.centerViewOnContent();
            } else if (preset === 'fitToFrame' || presetKey === 'front') {
                this.callbacks.setViewpointFitToFrame();
            } else if (preset) {
                this.callbacks.setViewpoint(preset.x, preset.y, preset.z);
            }
            this.callbacks.saveSettings();
        });

        cameraFolder.addBinding(this.params, 'cameraMode', {
            label: 'Mode',
            options: {
                Perspective: 'perspective',
                Orthographic: 'orthographic',
                Isometric: 'isometric',
                Telephoto: 'telephoto'
            }
        }).on('change', (ev) => {
            this.callbacks.switchCameraMode(ev.value);
            this.callbacks.saveSettings();
        });

        cameraFolder.addBinding(this.params, 'cameraZoom', {
            label: 'Zoom',
            min: 0.1,
            max: 3.0,
            step: 0.1
        }).on('change', (ev) => {
            this.callbacks.updateZoom(ev.value);
            this.callbacks.saveSettings();
        });

        cameraFolder.addBinding(this.params, 'cameraFOV', {
            label: 'FOV',
            min: 15,
            max: 120,
            step: 5
        }).on('change', (ev) => {
            this.params.cameraFOV = ev.value;
            this.callbacks.setCameraFOV(ev.value);
            this.callbacks.saveSettings();
        });
    }

    #buildSlidesFolder(pane) {
        const slidesFolder = pane.addFolder({
            title: 'Slides',
            expanded: true
        });

        slidesFolder.addBinding(this.params, 'materialPreset', {
            label: 'Material',
            options: {
                'Metallic Card': 'metallic-card',
                'Flat Matte': 'flat-matte',
                'Glossy Photo': 'glossy-photo',
                'Plastic Card': 'plastic-card',
                'Thick Board': 'thick-board',
                'Metal Sheet': 'metal-sheet',
                'Glass Slide': 'glass-slide',
                'Matte Print': 'matte-print',
                Bordered: 'bordered',
                '3D Box': '3d-box'
            }
        }).on('change', (ev) => {
            const preset = this.materialPresets[ev.value];
            if (preset) {
                this.callbacks.applyMaterialPreset(preset);
            }
            this.callbacks.saveSettings();
        });

        slidesFolder.addBinding(this.params, 'zSpacing', {
            label: 'Distance',
            min: 0,
            max: 500,
            step: 10
        }).on('change', (ev) => {
            this.callbacks.updateZSpacing(ev.value);
            this.callbacks.saveSettings();
        });
    }

    #buildTabs(pane) {
        const tabs = pane.addTab({
            pages: [
                { title: 'File' },
                { title: 'Image' },
                { title: 'Video' }
            ]
        });

        this.#buildFileTab(tabs.pages[0]);
        this.#buildImageTab(tabs.pages[1]);
        this.#buildVideoTab(tabs.pages[2]);
    }

    #buildFileTab(tab) {
        tab.addBlade({
            view: 'buttongrid',
            size: [2, 2],
            cells: (x, y) => ({
                title: [
                    ['Open', 'Paste'],
                    ['Save', 'Copy']
                ][y][x]
            }),
            label: 'JSON'
        }).on('click', (ev) => {
            const [x, y] = ev.index;
            if (y === 0 && x === 0) {
                const input = this.document?.createElement?.('input');
                if (input) {
                    input.type = 'file';
                    input.accept = '.json';
                    input.onchange = (e) => {
                        const file = e?.target?.files?.[0];
                        if (file) {
                            this.callbacks.importJSON(file);
                        }
                    };
                    safeCall(input.click, input);
                }
            } else if (y === 0 && x === 1) {
                this.callbacks.pasteJSON();
            } else if (y === 1 && x === 0) {
                this.callbacks.exportJSON();
            } else if (y === 1 && x === 1) {
                this.callbacks.copyJSON();
            }
        });

        tab.addBlade({
            view: 'buttongrid',
            size: [2, 1],
            cells: (x, y) => ({
                title: [['Defaults', 'Clear']][y][x]
            }),
            label: 'Tools'
        }).on('click', (ev) => {
            if (ev.index[0] === 0) {
                if (this.confirm('Reset all settings to defaults? This will clear saved preferences.')) {
                    this.callbacks.resetSettings();
                }
            } else {
                this.callbacks.clearAll();
            }
        });
    }

    #buildImageTab(tab) {
        tab.addBlade({
            view: 'buttongrid',
            size: [3, 1],
            cells: (x, y) => ({
                title: [['1x', '2x', '4x']][y][x]
            }),
            label: 'PNG'
        }).on('click', (ev) => {
            const scale = ev.index[0] === 0 ? 1 : ev.index[0] === 1 ? 2 : 4;
            this.callbacks.exportPNG(scale);
        });
    }

    #buildVideoTab(tab) {
        tab.addButton({ title: 'Play Hero Shot' }).on('click', async () => {
            if (!Array.isArray(this.imageStack) || this.imageStack.length === 0) {
                this.callbacks.showToast('No images loaded', 'error');
                return;
            }

            const topSlide = this.imageStack[this.imageStack.length - 1];
            if (!topSlide) {
                this.callbacks.showToast('No top slide found', 'error');
                return;
            }

            this.callbacks.showToast('Animating to Front view...', 'info');

            try {
                await this.cameraAnimator.playHeroShot({
                    topSlide,
                    canvasSize: this.params.canvasSize,
                    duration: this.params.animDuration,
                    easing: this.params.animEasing
                });
                this.callbacks.showToast('Animation complete', 'success');
            } catch (error) {
                this.logCamera?.error?.('Animation error:', error);
                this.callbacks.showToast('Animation failed', 'error');
            }
        });

        tab.addBinding(this.params, 'animDuration', {
            label: 'Duration',
            min: 0.5,
            max: 5.0,
            step: 0.1
        }).on('change', () => {
            this.callbacks.saveSettings();
        });

        tab.addBinding(this.params, 'animEasing', {
            label: 'Easing',
            options: {
                'Power In/Out': 'power2.inOut',
                'Power In': 'power2.in',
                'Power Out': 'power2.out',
                'Elastic Out': 'elastic.out',
                'Back In/Out': 'back.inOut',
                'Circ In/Out': 'circ.inOut'
            }
        }).on('change', () => {
            this.callbacks.saveSettings();
        });
    }
}
