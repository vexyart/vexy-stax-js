// this_file: tests/ui_tweakpane_setup.test.js
/**
 * Test Suite: UI - TweakpaneSetup
 *
 * Purpose: Ensures the Tweakpane setup module wires core controls to the
 * provided callbacks and surfaces helpful diagnostics when prerequisites are
 * missing.
 *
 * Modules Tested:
 * - src/ui/TweakpaneSetup.js (TweakpaneSetup class)
 *
 * Test Count: 3 tests
 * @lastTested 2025-11-05 (Phase 5 Iteration 3)
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { TweakpaneSetup } from '../src/ui/TweakpaneSetup.js';

class PaneStub {
    constructor(options) {
        this.options = options;
        this.plugins = [];
        this.folders = [];
        this.tabs = [];
        this.blades = [];
        this.buttons = [];
        this.disposed = false;
    }

    registerPlugin(plugin) {
        this.plugins.push(plugin);
    }

    addFolder(config) {
        const folder = new FolderStub(config);
        this.folders.push(folder);
        return folder;
    }

    addTab(config) {
        const tab = new TabStub(config);
        this.tabs.push(tab);
        return tab;
    }

    addBlade(config) {
        const blade = new BladeStub(config);
        this.blades.push(blade);
        return blade;
    }

    addButton(config) {
        const button = new ButtonStub(config);
        this.buttons.push(button);
        return button;
    }

    refresh() {
        this.refreshed = true;
    }

    dispose() {
        this.disposed = true;
    }
}

class FolderStub {
    constructor(config) {
        this.config = config;
        this.bindings = [];
    }

    addBinding(target, key, options) {
        const binding = {
            target,
            key,
            options,
            handlers: {}
        };
        this.bindings.push(binding);
        return {
            on: (event, handler) => {
                binding.handlers[event] = handler;
            }
        };
    }
}

class TabStub {
    constructor(config) {
        this.config = config;
        this.pages = config.pages.map(() => new TabPageStub());
    }
}

class TabPageStub {
    constructor() {
        this.blades = [];
        this.buttons = [];
    }

    addBlade(config) {
        const blade = new BladeStub(config);
        this.blades.push(blade);
        return blade;
    }

    addButton(config) {
        const button = new ButtonStub(config);
        this.buttons.push(button);
        return button;
    }

    addBinding(target, key, options) {
        const folder = new FolderStub({ title: 'page-binding' });
        return folder.addBinding(target, key, options);
    }
}

class BladeStub {
    constructor(config) {
        this.config = config;
        this.handlers = {};
    }

    on(event, handler) {
        this.handlers[event] = handler;
    }
}

class ButtonStub {
    constructor(config) {
        this.config = config;
        this.handlers = {};
    }

    on(event, handler) {
        this.handlers[event] = handler;
    }
}

function createDocument({ controlsElement = null } = {}) {
    return {
        getElementById: (id) => {
            if (id === 'controls') {
                return controlsElement;
            }
            return null;
        },
        createElement: (tag) => ({
            tagName: tag,
            style: {},
            click: () => {},
            addEventListener: () => {},
            removeEventListener: () => {}
        })
    };
}

function createSetupContext(overrides = {}) {
    const params = {
        canvasSize: { x: 1920, y: 1080 },
        bgColor: '#111111',
        transparentBg: false,
        ambience: false,
        cameraMode: 'perspective',
        cameraZoom: 1,
        cameraFOV: 60,
        viewpointPreset: 'beauty',
        materialPreset: 'metallic-card',
        zSpacing: 40,
        animDuration: 1.2,
        animEasing: 'power2.inOut'
    };

    const calls = {
        switchCameraMode: [],
        updateZoom: [],
        saveSettings: 0,
        errors: []
    };

    const setup = new TweakpaneSetup({
        Pane: overrides.Pane ?? PaneStub,
        plugins: {
            essentials: overrides.essentialsPlugin ?? {},
            colorPlus: overrides.colorPlusPlugin ?? {}
        },
        params,
        materialPresets: overrides.materialPresets ?? {
            'metallic-card': {}
        },
        viewpointPresets: overrides.viewpointPresets ?? {
            beauty: { x: 0, y: 500, z: 800 }
        },
        callbacks: {
            updateCanvasSize: overrides.updateCanvasSize ?? (() => {}),
            updateBackground: overrides.updateBackground ?? (() => {}),
            toggleAmbience: overrides.toggleAmbience ?? (() => {}),
            centerViewOnContent: overrides.centerViewOnContent ?? (() => {}),
            setViewpoint: overrides.setViewpoint ?? (() => {}),
            setViewpointFitToFrame: overrides.setViewpointFitToFrame ?? (() => {}),
            switchCameraMode: (mode) => calls.switchCameraMode.push(mode),
            updateZoom: (value) => calls.updateZoom.push(value),
            applyMaterialPreset: overrides.applyMaterialPreset ?? (() => {}),
            updateZSpacing: overrides.updateZSpacing ?? (() => {}),
            exportPNG: overrides.exportPNG ?? (() => {}),
            exportJSON: overrides.exportJSON ?? (() => {}),
            importJSON: overrides.importJSON ?? (() => {}),
            copyJSON: overrides.copyJSON ?? (() => {}),
            pasteJSON: overrides.pasteJSON ?? (() => {}),
            resetSettings: overrides.resetSettings ?? (() => {}),
            clearAll: overrides.clearAll ?? (() => {}),
            undo: overrides.undo ?? (() => {}),
            redo: overrides.redo ?? (() => {}),
            loadImage: overrides.loadImage ?? (() => {}),
            showToast: overrides.showToast ?? (() => {}),
            saveSettings: () => { calls.saveSettings += 1; },
            playHeroShot: overrides.playHeroShot ?? (async () => {})
        },
        dependencies: {
            cameraAnimator: overrides.cameraAnimator ?? {
                playHeroShot: async () => {}
            },
            logUI: {
                info: overrides.logInfo ?? (() => {}),
                error: (message) => calls.errors.push(message)
            },
            logCamera: overrides.logCamera ?? {
                error: () => {}
            },
            confirm: overrides.confirm ?? (() => true),
            document: overrides.document ?? createDocument({ controlsElement: {} }),
            imageStack: overrides.imageStack ?? []
        }
    });

    return { setup, params, calls };
}

test('TweakpaneSetup_setup_when_controlsContainerMissing_then_logsError', () => {
    const { setup, calls } = createSetupContext({
        document: createDocument({ controlsElement: null })
    });

    setup.setup();

    assert.equal(calls.errors.length, 1, 'logUI.error should capture missing container message');
});

test('TweakpaneSetup_setup_when_successful_then_registersPlugins', () => {
    const PaneSpy = class extends PaneStub {
        constructor(options) {
            super(options);
        }
    };

    const { setup } = createSetupContext({ Pane: PaneSpy });
    const paneInstance = setup.setup();

    assert.ok(paneInstance instanceof PaneSpy, 'setup should return the Pane instance');
    assert.equal(paneInstance.plugins.length, 2, 'both plugins should be registered');
});

test('TweakpaneSetup_cameraBindings_when_changed_then_delegateToCallbacks', () => {
    const { setup, calls } = createSetupContext();
    const pane = setup.setup();

    const cameraFolder = pane.folders.find((folder) => folder.config.title === 'Camera');
    assert.ok(cameraFolder, 'camera folder should be created');

    const modeBinding = cameraFolder.bindings.find((binding) => binding.key === 'cameraMode');
    assert.ok(modeBinding, 'camera mode binding should exist');
    modeBinding.handlers.change({ value: 'telephoto' });
    assert.deepEqual(calls.switchCameraMode, ['telephoto'], 'switchCameraMode should receive new mode');

    const zoomBinding = cameraFolder.bindings.find((binding) => binding.key === 'cameraZoom');
    assert.ok(zoomBinding, 'camera zoom binding should exist');
    zoomBinding.handlers.change({ value: 1.8 });
    assert.deepEqual(calls.updateZoom, [1.8], 'updateZoom should receive new value');
});

test('TweakpaneSetup_jsonGrid_when_openClicked_then_invokesImportCallback', () => {
    const files = [{ name: 'scene.json' }];
    const createdInputs = [];
    let importedFile = null;

    const { setup } = createSetupContext({
        document: {
            getElementById: () => ({}),
            createElement: (tag) => {
                const element = {
                    tag,
                    type: null,
                    accept: null,
                    onchange: null,
                    click: () => {
                        element.clickInvoked = true;
                    }
                };
                createdInputs.push(element);
                return element;
            },
            body: { appendChild: () => {} }
        },
        importJSON: (file) => {
            importedFile = file;
        }
    });

    const pane = setup.setup();
    const filePage = pane.tabs[0].pages[0];
    const jsonBlade = filePage.blades[0];

    jsonBlade.handlers.click({ index: [0, 0] });
    assert.equal(createdInputs.length, 1, 'should create a hidden file input');

    const input = createdInputs[0];
    assert.equal(input.type, 'file', 'input type should be file');
    assert.equal(input.accept, '.json', 'input should accept JSON files');
    assert.ok(input.clickInvoked, 'click should be triggered programmatically');
    assert.equal(typeof input.onchange, 'function', 'onchange handler should be assigned');

    input.onchange?.({ target: { files } });
    assert.deepEqual(importedFile, files[0], 'importJSON should receive selected file');
});

test('TweakpaneSetup_jsonGrid_when_otherButtonsClicked_then_delegateToJSONCallbacks', () => {
    const calls = { exportJSON: 0, copyJSON: 0, pasteJSON: 0 };
    const { setup } = createSetupContext({
        exportJSON: () => { calls.exportJSON += 1; },
        copyJSON: () => { calls.copyJSON += 1; },
        pasteJSON: () => { calls.pasteJSON += 1; }
    });

    const pane = setup.setup();
    const filePage = pane.tabs[0].pages[0];
    const jsonBlade = filePage.blades[0];

    jsonBlade.handlers.click({ index: [1, 0] });
    jsonBlade.handlers.click({ index: [0, 1] });
    jsonBlade.handlers.click({ index: [1, 1] });

    assert.equal(calls.pasteJSON, 1, 'pasteJSON should fire once');
    assert.equal(calls.exportJSON, 1, 'exportJSON should fire once');
    assert.equal(calls.copyJSON, 1, 'copyJSON should fire once');
});

test('TweakpaneSetup_toolsGrid_when_defaultsClicked_then_resetsAfterConfirm', () => {
    const confirmations = [];
    let resetCalled = 0;
    const { setup } = createSetupContext({
        confirm: (message) => {
            confirmations.push(message);
            return true;
        },
        resetSettings: () => { resetCalled += 1; }
    });

    const pane = setup.setup();
    const filePage = pane.tabs[0].pages[0];
    const toolsBlade = filePage.blades[1];

    toolsBlade.handlers.click({ index: [0, 0] });

    assert.equal(confirmations.length, 1, 'confirm should prompt once');
    assert.match(confirmations[0], /Reset all settings/i, 'confirm message should mention reset');
    assert.equal(resetCalled, 1, 'resetSettings should run when confirm returns true');
});

test('TweakpaneSetup_toolsGrid_when_defaultsCancelled_then_skipReset', () => {
    let resetCalled = 0;
    const { setup } = createSetupContext({
        confirm: () => false,
        resetSettings: () => { resetCalled += 1; }
    });

    const pane = setup.setup();
    const filePage = pane.tabs[0].pages[0];
    const toolsBlade = filePage.blades[1];

    toolsBlade.handlers.click({ index: [0, 0] });

    assert.equal(resetCalled, 0, 'resetSettings should not run when confirmation is declined');
});

test('TweakpaneSetup_toolsGrid_when_clearClicked_then_invokesClearAll', () => {
    let cleared = 0;
    const { setup } = createSetupContext({
        clearAll: () => { cleared += 1; }
    });

    const pane = setup.setup();
    const filePage = pane.tabs[0].pages[0];
    const toolsBlade = filePage.blades[1];

    toolsBlade.handlers.click({ index: [1, 0] });
    assert.equal(cleared, 1, 'clearAll should fire for Tools → Clear');
});

test('TweakpaneSetup_heroShot_when_noImages_then_showsErrorToast', async (t) => {
    t.mock.method(console, 'error'); // suppress potential noise

    const toasts = [];
    const { setup } = createSetupContext({
        showToast: (message, type) => {
            toasts.push({ message, type });
        },
        imageStack: []
    });

    const pane = setup.setup();
    const videoPage = pane.tabs[0].pages[2];
    const heroButton = videoPage.buttons[0];

    await heroButton.handlers.click();

    assert.equal(toasts.length, 1, 'should emit a toast');
    assert.equal(toasts[0].type, 'error', 'toast should be error type');
    assert.match(toasts[0].message, /No images loaded/i, 'toast should mention missing images');
});

test('TweakpaneSetup_heroShot_when_imagePresent_then_runsAnimatorAndToasts', async () => {
    const toasts = [];
    const animatorCalls = [];
    const mockSlide = { mesh: { id: 1 } };

    const { setup } = createSetupContext({
        showToast: (message, type) => {
            toasts.push({ message, type });
        },
        imageStack: [mockSlide],
        cameraAnimator: {
            playHeroShot: async (payload) => {
                animatorCalls.push(payload);
            }
        }
    });

    const pane = setup.setup();
    const videoPage = pane.tabs[0].pages[2];
    const heroButton = videoPage.buttons[0];

    await heroButton.handlers.click();

    assert.equal(animatorCalls.length, 1, 'playHeroShot should be invoked once');
    assert.equal(animatorCalls[0].topSlide, mockSlide, 'top slide should be passed to animator');
    assert.equal(toasts.length, 2, 'should display start and completion toasts');
    assert.equal(toasts[0].type, 'info', 'first toast should indicate start');
    assert.equal(toasts[1].type, 'success', 'second toast should confirm success');
});
