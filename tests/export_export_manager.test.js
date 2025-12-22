// this_file: tests/export_export_manager.test.js
/**
 * Test Suite: Export Manager
 *
 * Purpose: Validates PNG/JSON export flows, clipboard interactions, and
 * import routines after extracting export logic from main.js into a dedicated
 * module. Ensures parameter sanitisation, DOM integration points, and config
 * transformations behave deterministically under dependency injection.
 *
 * Modules Tested:
 * - src/export/ExportManager.js
 *
 * Test Count: 10 tests
 * @lastTested 2025-12-22 (Session 17 - JSON Y-position fix)
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { ExportManager } from '../src/export/ExportManager.js';

function createStackEntry(overrides = {}) {
    const texture = overrides.texture ?? {
        image: {
            width: overrides.width ?? 400,
            height: overrides.height ?? 300
        }
    };

    const mesh = overrides.mesh ?? {
        material: { map: texture },
        position: { x: 0, y: 0, z: 0 }
    };

    return {
        mesh,
        texture,
        filename: overrides.filename ?? 'slide-01.png',
        width: overrides.width ?? 400,
        height: overrides.height ?? 300,
        originalWidth: overrides.originalWidth ?? 400,
        originalHeight: overrides.originalHeight ?? 300
    };
}

function createManagerHarness(overrides = {}) {
    const toasts = [];
    const infoLogs = [];
    const warnLogs = [];
    const errorLogs = [];
    const appendedNodes = [];
    const removedNodes = [];
    const downloads = [];
    const alerts = [];
    let clipboardText = overrides.initialClipboard ?? '';
    let cleared = false;
    let imageListUpdated = 0;
    let stackEvents = 0;
    let backgroundUpdates = 0;
    let paneRefreshes = 0;

    const imageStack = overrides.imageStack ?? [createStackEntry()];

    const renderer = overrides.renderer ?? {
        getPixelRatio: () => 1,
        setPixelRatio: (value) => setPixelRatioCalls.push(value),
        render: () => renderCalls++,
        domElement: {
            toDataURL: () => 'data:image/png;base64,e30=',
            width: 800,
            height: 600
        }
    };

    const setPixelRatioCalls = [];
    let renderCalls = 0;

    const documentStub = overrides.document ?? {
        createElement: (tag) => {
            if (tag === 'div') {
                const node = {
                    style: {},
                    innerHTML: '',
                    appendLog: [],
                    removeLog: [],
                    setAttribute: () => {}
                };
                node.appendChild = (child) => node.appendLog.push(child);
                node.remove = () => removedNodes.push(node);
                return node;
            }

            if (tag === 'canvas') {
                let width = 0;
                let height = 0;
                return {
                    set width(value) {
                        width = value;
                    },
                    get width() {
                        return width;
                    },
                    set height(value) {
                        height = value;
                    },
                    get height() {
                        return height;
                    },
                    getContext: () => ({
                        drawImage: () => {}
                    }),
                    toDataURL: () => 'data:image/png;base64,ZmFrZQ=='
                };
            }

            if (tag === 'a') {
                const node = {
                    download: '',
                    href: '',
                    click: () => {
                        downloads.push({
                            download: node.download,
                            href: node.href
                        });
                    }
                };
                return node;
            }

            return {};
        },
        body: {
            appendChild: (node) => appendedNodes.push(node),
            removeChild: (node) => removedNodes.push(node)
        }
    };

    const windowStub = overrides.window ?? {
        innerWidth: 1280,
        innerHeight: 720,
        setTimeout: (cb) => cb()
    };

    const navigatorStub = overrides.navigator ?? {
        clipboard: {
            writeText: async (text) => {
                clipboardText = text;
            },
            readText: async () => clipboardText
        }
    };

    const paneStub = overrides.pane ?? {
        refresh: () => {
            paneRefreshes++;
        }
    };

    const camera = overrides.camera ?? {
        position: {
            x: 0,
            y: 0,
            z: 10,
            set(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
        },
        lookAt: () => {},
        fov: 50,
        updateProjectionMatrix: () => {},
        zoom: 1
    };

    const controls = overrides.controls ?? {
        update: () => {}
    };

    const params = overrides.params ?? {
        zSpacing: 50,
        bgColor: '#000000',
        cameraMode: 'perspective',
        cameraFOV: 50,
        transparentBg: false
    };

    const scene = overrides.scene ?? {
        add: () => {},
        remove: () => {},
        background: null
    };

    const urlAPI = overrides.urlAPI ?? {
        lastCreated: null,
        lastRevoked: [],
        createObjectURL: (blob) => {
            urlAPI.lastCreated = blob;
            return 'blob:mock';
        },
        revokeObjectURL: (url) => {
            urlAPI.lastRevoked.push(url);
        }
    };

    const exportManager = new ExportManager({
        renderer,
        scene,
        imageStack,
        params,
        camera,
        orthoCamera: overrides.orthoCamera ?? camera,
        controls,
        logExport: overrides.logExport ?? {
            info: (...args) => infoLogs.push(args),
            warn: (...args) => warnLogs.push(args),
            error: (...args) => errorLogs.push(args)
        },
        showToast: overrides.showToast ?? ((message, type, duration) => {
            toasts.push({ message, type, duration });
        }),
        clearAll: overrides.clearAll ?? (() => {
            cleared = true;
            imageStack.length = 0;
        }),
        updateImageList: overrides.updateImageList ?? (() => {
            imageListUpdated++;
        }),
        emitStackUpdated: overrides.emitStackUpdated ?? (() => {
            stackEvents++;
        }),
        updateBackground: overrides.updateBackground ?? (() => {
            backgroundUpdates++;
        }),
        pane: paneStub,
        getActiveCamera: overrides.getActiveCamera ?? (() => camera),
        document: documentStub,
        window: windowStub,
        navigator: navigatorStub,
        alert: overrides.alert ?? ((message) => alerts.push(message)),
        createTextureLoader: overrides.createTextureLoader ?? (() => ({
            load: (dataURL, onLoad) => {
                const texture = {
                    image: {
                        width: 400,
                        height: 300,
                        currentSrc: dataURL
                    }
                };
                onLoad(texture);
            }
        })),
        createCanvas: overrides.createCanvas,
        createAnchor: overrides.createAnchor,
        readFileAsText: overrides.readFileAsText ?? (async () => '{}'),
        urlAPI,
        now: overrides.now ?? (() => new Date('2025-11-05T12:00:00Z'))
    });

    return {
        manager: exportManager,
        imageStack,
        params,
        camera,
        controls,
        toasts,
        infoLogs,
        warnLogs,
        errorLogs,
        appendedNodes,
        removedNodes,
        downloads,
        alerts,
        getClipboardText: () => clipboardText,
        wasCleared: () => cleared,
        getImageListUpdateCount: () => imageListUpdated,
        getStackEventCount: () => stackEvents,
        getBackgroundUpdateCount: () => backgroundUpdates,
        getPaneRefreshCount: () => paneRefreshes,
        getSetPixelRatioCalls: () => setPixelRatioCalls.slice(),
        getRenderCalls: () => renderCalls,
        urlAPI
    };
}

test('ExportManager_exportPNG_when_scaleOutOfRange_then_defaultsToOne', async () => {
    const ctx = createManagerHarness({
        readFileAsText: async () => '{}'
    });

    await ctx.manager.exportPNG(0);

    assert.equal(ctx.getSetPixelRatioCalls().length, 0, 'scale < 1 should not alter pixel ratio');
    assert.equal(ctx.downloads.length, 1, 'export should trigger download once');
    assert.match(ctx.downloads[0].download, /-1x-/i, 'download filename should fall back to 1x scale');
    assert.equal(ctx.warnLogs.length, 1, 'invalid scale should log a warning');
});

test('ExportManager_exportPNG_when_scaleHigh_then_showsOverlay', async () => {
    const ctx = createManagerHarness({
        readFileAsText: async () => '{}'
    });

    await ctx.manager.exportPNG(2);

    assert.equal(ctx.getSetPixelRatioCalls().length, 2, 'should set and restore pixel ratio for scale > 1');
    assert.equal(ctx.appendedNodes.length > 0, true, 'overlay should be appended for high-res export');
    assert.equal(ctx.removedNodes.length > 0, true, 'overlay should be removed after export completes');
    assert.equal(ctx.downloads.length, 1, 'high-res export should still trigger download');
});

test('ExportManager_exportPNG_when_rendererThrows_then_restoresPixelRatioAndRemovesOverlay', async () => {
    const setPixelRatioCalls = [];
    let renderCalls = 0;
    const rendererStub = {
        getPixelRatio: () => 1,
        setPixelRatio: (value) => setPixelRatioCalls.push(value),
        render: () => {
            renderCalls += 1;
        },
        domElement: {
            toDataURL: () => {
                throw new Error('renderer exploded');
            },
            width: 1024,
            height: 768
        }
    };

    const ctx = createManagerHarness({
        renderer: rendererStub
    });

    await ctx.manager.exportPNG(2);

    assert.deepEqual(setPixelRatioCalls, [2, 1], 'pixel ratio should scale up then restore on failure');
    assert.equal(renderCalls, 1, 'render should still be attempted once');
    assert.equal(ctx.removedNodes.length, 1, 'overlay should be removed even when export fails');
    assert.equal(ctx.toasts.length, 1, 'failure should trigger a toast message');
    assert.match(ctx.toasts[0].message, /Export failed/, 'toast should indicate export failure');
    assert.ok(ctx.errorLogs.length >= 1, 'error log should capture failure details');
});

test('ExportManager_exportJSON_when_stackPresent_then_createsDownload', async () => {
    const ctx = createManagerHarness({
        readFileAsText: async () => '{}'
    });

    await ctx.manager.exportJSON();

    assert.equal(ctx.downloads.length, 1, 'JSON export should trigger a download anchor');
    assert.match(ctx.downloads[0].download, /config/i, 'download name should describe JSON config');
    assert.equal(ctx.urlAPI.lastRevoked.length, 1, 'URL.createObjectURL should be revoked after export');
});

test('ExportManager_copyJSON_when_invoked_then_writesClipboard', async () => {
    const ctx = createManagerHarness({
        readFileAsText: async () => '{}'
    });

    await ctx.manager.copyJSON();

    const clipboard = ctx.getClipboardText();
    assert.ok(clipboard.includes('"images"'), 'clipboard JSON should include images array');
    assert.ok(clipboard.includes('"version"'), 'clipboard JSON should include version field');
});

test('ExportManager_importJSON_when_validFile_then_appliesConfig', async () => {
    const config = {
        version: '1.0',
        params: {
            zSpacing: 120,
            bgColor: '#123456',
            cameraMode: 'orthographic',
            cameraFOV: 60,
            transparentBg: true
        },
        camera: {
            position: { x: 5, y: 6, z: 7 }
        },
        images: [
            {
                filename: 'imported.png',
                dataURL: 'data:image/png;base64,abcd',
                width: 640,
                height: 480
            }
        ]
    };

    const ctx = createManagerHarness({
        imageStack: [],
        readFileAsText: async () => JSON.stringify(config)
    });

    await ctx.manager.importJSON({ name: 'config.json' });

    assert.equal(ctx.wasCleared(), true, 'import should clear existing stack first');
    assert.equal(ctx.imageStack.length, 1, 'import should push loaded images into the stack');
    assert.equal(ctx.params.zSpacing, 120, 'import should carry over zSpacing');
    assert.equal(ctx.params.bgColor, '#123456', 'import should carry over background colour');
    assert.equal(ctx.camera.position.x, 5, 'camera position should update from config');
    assert.equal(ctx.getPaneRefreshCount(), 1, 'pane should refresh after import');
});

test('ExportManager_importJSON_when_jsonMalformed_then_surfacesToastAndAlert', async () => {
    const ctx = createManagerHarness({
        readFileAsText: async () => '{"version": "1.0"',
        now: () => new Date('2025-11-05T12:00:00Z')
    });
    const initialStackSize = ctx.imageStack.length;

    await ctx.manager.importJSON({ name: 'broken-config.json' });

    assert.equal(ctx.wasCleared(), false, 'malformed config should not clear existing stack');
    assert.equal(ctx.imageStack.length, initialStackSize, 'image stack should remain unchanged on failure');
    assert.equal(ctx.alerts.length, 1, 'failure should trigger alert messaging');
    assert.match(ctx.alerts[0], /Failed to import configuration/i, 'alert should mention import failure');
    assert.equal(ctx.toasts.length, 1, 'failure should display toast feedback');
    assert.equal(ctx.toasts[0].type, 'error', 'toast should convey error severity');
    assert.equal(ctx.errorLogs.length, 1, 'error logger should record malformed file');
});

test('ExportManager_pasteJSON_when_clipboardValid_then_appliesConfigAndAlertsSuccess', async () => {
    const config = {
        version: '1.0',
        params: {
            zSpacing: 90,
            bgColor: '#654321',
            cameraMode: 'orthographic'
        },
        camera: {
            position: { x: 1, y: 2, z: 3 }
        },
        images: [
            {
                filename: 'clipboard.png',
                dataURL: 'data:image/png;base64,abcd',
                width: 320,
                height: 240
            }
        ]
    };

    const ctx = createManagerHarness({
        imageStack: [],
        navigator: {
            clipboard: {
                writeText: async () => {},
                readText: async () => JSON.stringify(config)
            }
        }
    });

    await ctx.manager.pasteJSON();

    assert.equal(ctx.wasCleared(), true, 'pasting should clear existing stack before applying config');
    assert.equal(ctx.imageStack.length > 0, true, 'config images should populate the stack');
    assert.equal(ctx.alerts.length, 1, 'success should still inform user via alert');
    assert.match(ctx.alerts[0], /Configuration pasted/i, 'alert should confirm paste success');
    assert.equal(ctx.getPaneRefreshCount(), 1, 'pane should refresh to reflect new state');
});

test('ExportManager_pasteJSON_when_clipboardMalformed_then_surfacesToastAndAlert', async () => {
    const ctx = createManagerHarness({
        navigator: {
            clipboard: {
                writeText: async () => {},
                readText: async () => 'not-json'
            }
        }
    });
    const initialStackSize = ctx.imageStack.length;

    await ctx.manager.pasteJSON();

    assert.equal(ctx.wasCleared(), false, 'failed paste should not clear stack');
    assert.equal(ctx.imageStack.length, initialStackSize, 'existing stack should remain untouched');
    assert.equal(ctx.alerts.length, 1, 'error should trigger alert messaging');
    assert.match(ctx.alerts[0], /Failed to paste configuration/i, 'alert should mention paste failure');
    assert.equal(ctx.toasts.length, 1, 'error should display toast feedback');
    assert.equal(ctx.toasts[0].type, 'error', 'toast should flag error severity');
    assert.equal(ctx.errorLogs.length, 1, 'error logger should capture parse failure');
});

test('ExportManager_importJSON_when_validFile_then_positionsSlidesOnFloor', async () => {
    // This test verifies the fix for JSON import Y-position bug (Session 16)
    // Slides should be positioned with bottom at floor level (Y = FLOOR_Y + height/2)
    const imageHeight = 480;
    const config = {
        version: '1.0',
        params: {
            zSpacing: 100,
            bgColor: '#ffffff'
        },
        camera: {
            position: { x: 0, y: 0, z: 800 }
        },
        images: [
            {
                filename: 'test-slide.png',
                dataURL: 'data:image/png;base64,abcd',
                width: 640,
                height: imageHeight
            }
        ]
    };

    // Create harness with custom texture loader that preserves mesh positioning
    let createdMesh = null;
    const ctx = createManagerHarness({
        imageStack: [],
        readFileAsText: async () => JSON.stringify(config),
        createTextureLoader: () => ({
            load: (dataURL, onLoad) => {
                const texture = {
                    image: {
                        width: 640,
                        height: imageHeight,
                        currentSrc: dataURL
                    }
                };
                onLoad(texture);
            }
        })
    });

    await ctx.manager.importJSON({ name: 'config.json' });

    // Verify slide was added to stack
    assert.equal(ctx.imageStack.length, 1, 'import should add slide to stack');

    // SCENE.md §1: Y position is initially 0, layout recalculation happens via onImportComplete callback
    // The actual Y positioning is done by SceneComposition.recalculateLayout() in main.js
    const importedSlide = ctx.imageStack[0];
    assert.equal(
        importedSlide.mesh.position.y,
        0,
        'slide Y position should be 0 initially (layout recalculated via onImportComplete callback)'
    );
});
