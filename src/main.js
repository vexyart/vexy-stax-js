// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/main.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CameraAnimator } from './camera/animation.js';
import { CameraController } from './camera/CameraController.js';
import { RenderLoop } from './core/RenderLoop.js';
import { SceneComposition } from './core/SceneComposition.js';
import { MemoryMonitor } from './memory/MemoryMonitor.js';
import { ExportManager } from './export/ExportManager.js';
import { createLogger } from './utils/logger.js';
import { FileHandler } from './files/FileHandler.js';
import { RetryingTextureLoader } from './files/TextureLoader.js';
import { TweakpaneSetup } from './ui/TweakpaneSetup.js';
import { setupKeyboardShortcuts } from './ui/KeyboardShortcuts.js';
import { createToastService } from './ui/ToastService.js';
import { createSettingsManager } from './settings/SettingsManager.js';
import { HistoryManager } from './history/HistoryManager.js';
import { SceneManager } from './scene/SceneManager.js';
import { LightingManager, getAdaptiveEmissiveIntensity, calculateLuminance } from './scene/LightingManager.js';
import { FloorManager } from './scene/FloorManager.js';
import { AmbienceManager } from './scene/AmbienceManager.js';
import { Application } from './Application.js';
import { DebugAPI } from './automation/DebugAPI.js';
import { AutomationBridge } from './automation/AutomationBridge.js';
import {
    MAX_HISTORY,
    FPS_WARNING_THRESHOLD,
    MEMORY_WARNING_THRESHOLD_MB,
    MEMORY_CRITICAL_THRESHOLD_MB,
    MEMORY_WARNING_COOLDOWN,
    AUTO_SAVE_INTERVAL,
    TOAST_DURATION_ERROR,
    TOAST_DURATION_WARNING,
    TOAST_DURATION_INFO,
    CAMERA_FAR_PLANE,
    CAMERA_DEFAULT_DISTANCE,
    CAMERA_MIN_DISTANCE,
    CAMERA_MAX_DISTANCE,
    CONTROLS_DAMPING_FACTOR,
    TOAST_FADE_DURATION,
    OVERLAY_RENDER_DELAY,
    DEFAULT_CAMERA_FOV,
    DEFAULT_BG_COLOR,
    DEFAULT_Z_SPACING,
    MIN_LAYER_GAP,
    Z_INDEX_MODAL,
    BYTES_PER_MB,
    ORTHO_FRUSTUM_SIZE,
    MAX_DIMENSION_PX,
    MAX_LOAD_RETRIES,
    RETRY_DELAYS_MS,
    DEBOUNCE_DELAY_MS,
    MATERIAL_PRESETS,
    VIEWPOINT_PRESETS,
    EVENTS,
    FLOOR_Y,
    createDefaultParams
} from './core/constants.js';
import { appState } from './core/AppState.js';
import { eventBus } from './core/EventBus.js';
import { storeSharedRef, SHARED_STATE_KEYS } from './core/sharedState.js';
import { computeRetinaDimensions } from './core/studioSizing.js';
import { debounce } from './utils/helpers.js';

// Scene, Camera, Renderer
let scene, camera, orthoCamera, renderer, controls;
let canvas;
let cameraMode = 'perspective'; // 'perspective', 'orthographic', 'isometric'
let cameraAnimator; // Camera animation system
let cameraController; // Handles camera orchestration
let app; // Application orchestrator (Phase 5 integration)
let tweakpaneSetup; // Encapsulates Tweakpane wiring
let debugAPI; // Debug console API (window.vexyStax)
let automationBridge; // Playwright automation API (window.__vexyStaxAutomation)

let renderLoop; // Render animation loop manager
let sceneComposition; // Manages image stack meshes
let fileHandler = null; // Handles file intake (browse + drag/drop)
let exportManager = null; // Manages PNG/JSON exports and imports
let keyboardShortcuts = null; // Handles keyboard shortcut wiring
// Lighting and environment
let sceneManager = null;
let lightingManager = null;
let floorManager = null;
let ambienceManager = null;

// Image stack management
let imageStack = [];

// Event listener tracking for proper cleanup
let eventListeners = [];

// Cleanup callbacks for resource disposal
let cleanupCallbacks = [];

// History management for undo/redo
let historyStack = [];
let historyIndex = -1;
let historyManager = null;

// FPS monitor tracking
let showFPSEnabled = false;
let memoryMonitor = null;

// Hero view z-spacing: Store original spacing when entering Hero, restore when leaving
let savedHeroZSpacing = null;

// Parameters
const params = createDefaultParams();

// Module loggers for organized debugging
const logInit = createLogger('Init');
const logLighting = createLogger('Lighting');
const logFloor = createLogger('Floor');
const logImages = createLogger('Images');
const logFile = createLogger('File');
const logCamera = createLogger('Camera');
const logExport = createLogger('Export');
const logUI = createLogger('UI');
const logAPI = createLogger('API');
const logCleanup = createLogger('Cleanup');
const logWebGL = createLogger('WebGL');
const logMemory = createLogger('Memory');
const logHistory = createLogger('History');
const logResize = createLogger('Resize');
const logRetry = createLogger('Retry');
const logValidation = createLogger('Validation');
const logKeyboard = createLogger('Keyboard');
const logDebugAPI = createLogger('Debug API');
const logSettings = createLogger('Settings');
const showToast = createToastService({
    documentRef: typeof document !== 'undefined' ? document : null,
    setTimeoutFn: typeof window !== 'undefined' && typeof window.setTimeout === 'function'
        ? window.setTimeout.bind(window)
        : (typeof setTimeout === 'function' ? setTimeout : () => {}),
    fadeDuration: TOAST_FADE_DURATION,
    zIndex: Z_INDEX_MODAL
});
const settingsManager = createSettingsManager({
    params,
    storage: typeof window !== 'undefined' ? window.localStorage : null,
    logger: logSettings,
    confirm: typeof window !== 'undefined' && typeof window.confirm === 'function'
        ? (message) => window.confirm(message)
        : () => true,
    alert: typeof window !== 'undefined' && typeof window.alert === 'function'
        ? (message) => window.alert(message)
        : () => {},
    refreshPane: () => {
        if (pane) {
            pane.refresh();
        }
    },
    switchCameraMode: (mode) => switchCameraMode(mode),
    updateZoom: (zoom) => updateZoom(zoom),
    updateBackground: () => app?.sceneDirector?.updateBackground(),
    updateFloorColor: () => updateFloorColor(),
    updateZSpacing: (spacing) => updateZSpacing(spacing),
    autoZSpacing: () => {
        const autoValue = calculateAutoDistance();
        updateZSpacing(autoValue);
        return autoValue;
    },
    updateReflectionSettings: () => floorManager?.updateReflectionSettings(),
    defaults: {
        cameraMode: 'perspective',
        cameraFOV: DEFAULT_CAMERA_FOV,
        cameraZoom: 1.0,
        bgColor: { r: 255, g: 255, b: 255, a: 1 },
        zSpacing: null,
        viewpointPreset: 'beauty'
    }
});
cameraMode = params.cameraMode;

// Persist core state through AppState for upcoming modularisation
storeSharedRef(SHARED_STATE_KEYS.params, params);
storeSharedRef(SHARED_STATE_KEYS.imageStack, imageStack);
storeSharedRef(SHARED_STATE_KEYS.eventListeners, eventListeners);
storeSharedRef(SHARED_STATE_KEYS.historyStack, historyStack);
storeSharedRef(SHARED_STATE_KEYS.historyIndex, historyIndex);
appState.set('cameraMode', cameraMode);
appState.set('memoryState', { lastMemoryWarning: 0 });

historyManager = new HistoryManager({
    maxSize: MAX_HISTORY,
    captureState: captureHistorySnapshot,
    applyState: applyHistorySnapshot,
    onStackChange: handleHistoryStackChange,
    logger: logHistory,
    showToast
});

// UI
let pane;

function emitBackgroundChanged(reason) {
    eventBus.emit(EVENTS.backgroundChanged, {
        reason,
        color: params.bgColor,
        ambience: params.ambience
    });
}

function emitStackUpdated(reason) {
    eventBus.emit(EVENTS.stackUpdated, {
        reason,
        count: imageStack.length,
        filenames: imageStack.map((image) => image.filename)
    });
}

function handleHistoryStackChange(index, stack) {
    historyIndex = typeof index === 'number' ? index : -1;
    historyStack = Array.isArray(stack) ? stack.slice() : [];
    storeSharedRef(SHARED_STATE_KEYS.historyIndex, historyIndex);
    storeSharedRef(SHARED_STATE_KEYS.historyStack, historyStack);
}

function emitCameraUpdated(reason) {
    const activeCamera = (controls && controls.object) ? controls.object : camera;
    if (!activeCamera) {
        return;
    }

    const payload = {
        reason,
        mode: cameraMode,
        position: {
            x: activeCamera.position.x,
            y: activeCamera.position.y,
            z: activeCamera.position.z
        },
        zoom: activeCamera.zoom
    };

    if (typeof activeCamera.fov === 'number') {
        payload.fov = activeCamera.fov;
    }

    eventBus.emit(EVENTS.cameraUpdated, payload);
}

/**
 * Detect browser capabilities and display error if requirements not met
 * @returns {boolean} true if all capabilities present, false otherwise
 */
function detectCapabilities() {
    const errors = [];

    // Check WebGL support
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
        errors.push('WebGL is not supported by your browser');
    }

    // Check FileReader API
    if (!window.FileReader) {
        errors.push('FileReader API is not supported by your browser');
    }

    // Check Canvas.toDataURL
    if (!testCanvas.toDataURL) {
        errors.push('Canvas export is not supported by your browser');
    }

    // Display errors if any
    if (errors.length > 0) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: ' + Z_INDEX_MODAL + ';
        `;

        errorDiv.innerHTML = `
            <h2 style="margin-top: 0;">Browser Not Supported</h2>
            <p>Vexy Stax requires the following features:</p>
            <ul style="text-align: left;">
                ${errors.map(err => `<li>${err}</li>`).join('')}
            </ul>
            <p>Please use a modern browser like Chrome, Firefox, or Safari.</p>
        `;

        document.body.appendChild(errorDiv);
        logInit.error('Capability check failed:', errors);
        return false;
    }

    logInit.info('✓ All required browser capabilities detected');
    return true;
}

function init() {
    if (!detectCapabilities()) {
        return;
    }

    settingsManager.loadSettings();
    canvas = document.getElementById('canvas');

    // Accessibility: Canvas needs aria-label and tabindex for keyboard users
    canvas.setAttribute('tabindex', '0');
    canvas.setAttribute('role', 'img');
    updateCanvasAriaLabel();

    // ═══════════════════════════════════════════════════════════════════════
    // Manager Initialization Pattern
    // ═══════════════════════════════════════════════════════════════════════
    // Managers are initialized in dependency order:
    // 1. SceneManager (creates scene + renderer)
    // 2. LightingManager (requires scene)
    // 3. FloorManager (requires scene + params)
    // 4. AmbienceManager (requires scene + imageStack + params)
    //
    // Each manager is self-contained and can be disposed independently.
    // See tests/error_recovery.test.js for disposal order safety verification.
    // ═══════════════════════════════════════════════════════════════════════

    // Step 1: Create SceneManager (owns scene + renderer lifecycle)
    sceneManager = new SceneManager(canvas, params);
    sceneManager.onContextRestoredCallback = () => {
        imageStack.forEach((imageData, index) => {
            if (imageData?.texture) {
                imageData.texture.needsUpdate = true;
                logWebGL.info(` Reloading texture ${index + 1}/${imageStack.length}: ${imageData.filename}`);
            }
        });
    };

    // Initialize scene and renderer (WebGL context creation happens here)
    const { scene: managedScene, renderer: managedRenderer } = sceneManager.init();
    scene = managedScene;
    renderer = managedRenderer;
    storeSharedRef(SHARED_STATE_KEYS.scene, scene);
    storeSharedRef(SHARED_STATE_KEYS.renderer, renderer);

    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(params.cameraFOV, aspect, 0.1, CAMERA_FAR_PLANE);
    storeSharedRef(SHARED_STATE_KEYS.camera, camera);
    camera.position.set(0, 0, CAMERA_DEFAULT_DISTANCE);
    camera.lookAt(0, 0, 0);
    camera.zoom = params.cameraZoom;

    const frustumSize = ORTHO_FRUSTUM_SIZE;
    orthoCamera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        0.1,
        5000
    );
    storeSharedRef(SHARED_STATE_KEYS.orthoCamera, orthoCamera);
    orthoCamera.position.set(0, 0, CAMERA_DEFAULT_DISTANCE);
    orthoCamera.lookAt(0, 0, 0);
    orthoCamera.zoom = params.cameraZoom;

    sceneManager.camera = camera;
    sceneManager.orthoCamera = orthoCamera;

    controls = new OrbitControls(camera, renderer.domElement);
    storeSharedRef(SHARED_STATE_KEYS.controls, controls);
    controls.enableDamping = true;
    controls.dampingFactor = CONTROLS_DAMPING_FACTOR;
    controls.minDistance = CAMERA_MIN_DISTANCE;
    controls.maxDistance = CAMERA_MAX_DISTANCE;
    sceneManager.controls = controls;

    // Sync cameraDistance param when OrbitControls changes camera position (pinch/wheel)
    // Use debounced pane refresh to update Z slider without affecting drag performance
    const debouncedPaneRefresh = debounce(() => {
        if (pane) {
            pane.refresh();
        }
    }, 100);

    controls.addEventListener('change', () => {
        const activeCamera = controls.object;
        if (activeCamera) {
            const distance = activeCamera.position.distanceTo(controls.target);
            // Only update if significantly different (avoid feedback loops)
            if (Math.abs(distance - params.cameraDistance) > 1) {
                params.cameraDistance = distance;
                // Debounced refresh updates Z slider after drag settles
                debouncedPaneRefresh();
            }
        }
    });

    // Camera control hints - show first 3 interactions
    const HINT_STORAGE_KEY = 'vexy-stax-camera-hints';
    const MAX_HINTS = 3;
    let hintCount = parseInt(localStorage.getItem(HINT_STORAGE_KEY) || '0', 10);

    const showCameraHint = () => {
        if (hintCount >= MAX_HINTS) return;
        hintCount++;
        localStorage.setItem(HINT_STORAGE_KEY, String(hintCount));

        const hints = [
            'ℹ️ Drag to rotate • Pinch/scroll to zoom • Shift+drag to pan',
            'ℹ️ Arrow keys rotate • +/- zoom • Shift+arrows pan',
            'ℹ️ Press ? for all keyboard shortcuts'
        ];
        showToast(hints[hintCount - 1] || hints[0], 'info', 4000);
    };

    // Trigger hint on first canvas interaction
    const canvasEl = renderer.domElement;
    const hintHandler = () => {
        showCameraHint();
        if (hintCount >= MAX_HINTS) {
            canvasEl.removeEventListener('mousedown', hintHandler);
            canvasEl.removeEventListener('touchstart', hintHandler);
        }
    };
    if (hintCount < MAX_HINTS) {
        canvasEl.addEventListener('mousedown', hintHandler, { once: false });
        canvasEl.addEventListener('touchstart', hintHandler, { once: false });
    }

    cameraAnimator = new CameraAnimator(camera, controls);
    storeSharedRef(SHARED_STATE_KEYS.cameraAnimator, cameraAnimator);

    cameraController = new CameraController({
        camera,
        orthoCamera,
        controls,
        params,
        imageStack,
        pane: { refresh: () => {} },
        logCamera,
        emitCameraUpdated,
        onModeChange: (mode) => {
            cameraMode = mode;
            appState.set('cameraMode', mode);
        }
    });
    cameraMode = cameraController.getMode();
    appState.set('cameraMode', cameraMode);

    // Step 2: Create LightingManager (sets up all scene lights)
    // Manages ambient, directional, fill, and hemisphere lights
    // Calculates adaptive intensities based on background luminance
    lightingManager = new LightingManager(scene, params);
    lightingManager.setup();

    // Step 3: Create FloorManager + AmbienceManager (coordinate ambience mode)
    // FloorManager: Manages reflective floor plane and ambient background
    // AmbienceManager: Handles material switching (flat ↔ lit) for image meshes
    floorManager = new FloorManager(scene, params);
    ambienceManager = new AmbienceManager(scene, imageStack, params, {
        getEffectiveZSpacing,
        // SCENE.md §1: Recalculate layout after material updates
        onMaterialsUpdated: () => {
            if (sceneComposition) {
                sceneComposition.recalculateLayout();
            }
        }
    });

    // NOTE: Ambience coordination is handled in toggleAmbience() function.
    // FloorManager.onAmbienceChange is NOT used - keeps floor subordinate to slides.
    sceneManager.onResizeCallback = () => {
        if (params.ambience) {
            floorManager.updateReflectionSettings();
        }
    };

    // Floor is always visible (in both ambience and non-ambience modes)
    floorManager.create();

    if (params.ambience) {
        app?.sceneDirector?.updateBackground();
    }

    memoryMonitor = new MemoryMonitor({
        getImageStack: () => imageStack,
        logMemory,
        showToast,
        confirm: (message) => confirm(message),
        now: () => Date.now(),
        thresholds: {
            warningMB: MEMORY_WARNING_THRESHOLD_MB,
            criticalMB: MEMORY_CRITICAL_THRESHOLD_MB,
            cooldownMs: MEMORY_WARNING_COOLDOWN
        },
        toastDurations: {
            warningMs: TOAST_DURATION_WARNING,
            errorMs: TOAST_DURATION_ERROR
        },
        bytesPerMB: BYTES_PER_MB,
        isFPSEnabled: () => showFPSEnabled,
        resolveOverlay: () => {
            if (typeof document === 'undefined') {
                return null;
            }
            return document.getElementById('fps-display') ?? null;
        },
        isOverlayAttached: (element) => {
            if (!element) {
                return false;
            }
            if (typeof element.isConnected === 'boolean') {
                return element.isConnected;
            }
            if (typeof document !== 'undefined') {
                const { body } = document;
                if (body && typeof body.contains === 'function') {
                    return body.contains(element);
                }
            }
            return Boolean(element.parentNode);
        },
        onWarningUpdate: (timestamp) => {
            appState.set('memoryState', { lastMemoryWarning: timestamp });
        },
        initialWarningTimestamp: appState.get('memoryState')?.lastMemoryWarning ?? 0
    });

    sceneComposition = new SceneComposition({
        scene,
        params,
        imageStack,
        saveHistory,
        emitStackUpdated,
        updateImageList,
        showToast,
        checkMemoryUsage,
        logImages,
        logMemory,
        calculateLuminance,
        getAdaptiveEmissiveIntensity,
        getEffectiveZSpacing,
        // SCENE.md §2: Set initial defaults when first slide is added
        onFirstSlide: (slideCount) => {
            logInit.info(`First slide added (${slideCount} total) - applying initial defaults`);
            // Set viewpoint to beauty
            setBeautyViewpoint();
            // Set material to default (neutral)
            params.materialPreset = 'neutral';
            applyMaterialPreset(MATERIAL_PRESETS.neutral);
            // Set ambience to default (0 = off)
            params.ambience = 0;
            // Set slide distance to auto: STUDIOWIDTH/(NUM_SLIDES+2)
            params.zSpacing = null; // null triggers auto calculation
            updateCanvasAriaLabel();
        },
        // SCENE.md §1: Update floor position and size when layout changes
        onLayoutChanged: (floorY, stackDepth, zSpacing, widestSlideWidth) => {
            console.log(`[main.js] onLayoutChanged: floorY=${floorY}, stackDepth=${stackDepth}, zSpacing=${zSpacing}, widest=${widestSlideWidth}`);
            if (floorManager) {
                floorManager.setPositionY(floorY);
                floorManager.resize(stackDepth, zSpacing, widestSlideWidth);
            } else {
                console.warn('[main.js] floorManager is null/undefined');
            }
        }
    });

    fileHandler = new FileHandler({
        elements: {
            imageInput: document.getElementById('image-input'),
            browseButton: document.getElementById('browse-button'),
            dropOverlay: document.getElementById('drop-overlay'),
            slidesPanel: document.getElementById('slides-panel')
        },
        addTrackedEventListener,
        onFileAccepted: (file) => {
            loadImage(file);
        },
        onJSONFileAccepted: (file) => {
            // Import JSON scene - same as JSON > Open
            importJSON(file);
        },
        shouldProceedAfterMemoryCheck: () => checkMemoryUsage(true),
        showToast,
        loggers: {
            logFile,
            logValidation
        }
    });
    fileHandler.setup();

    // Wrap Tweakpane setup in try-catch for headless/automation environments
    try {
        setupTweakpane();
        cameraController.attachPane(pane);
    } catch (err) {
        logInit.warn('Tweakpane setup failed (headless mode?)', err.message);
        // Continue without UI controls - API will still be exposed
    }

    exportManager = new ExportManager({
        renderer,
        scene,
        imageStack,
        params,
        camera,
        orthoCamera,
        controls,
        logExport,
        showToast,
        clearAll,
        updateImageList,
        emitStackUpdated,
        updateBackground,
        updateFloorColor,
        pane,
        getActiveCamera: () => getActiveCamera(),
        getEffectiveZSpacing,
        document,
        window,
        navigator,
        alert: (message) => alert(message),
        // SCENE.md §1: Recalculate layout after JSON import completes
        onImportComplete: () => {
            if (sceneComposition) {
                sceneComposition.recalculateLayout();
            }
        }
    });

    logInit.info('Initialization complete - UI should be visible');

    setupDebouncedResize();

    keyboardShortcuts = setupKeyboardShortcuts({
        addTrackedEventListener,
        windowRef: window,
        document,
        cameraAnimator,
        showToast,
        logUI,
        logCamera,
        exportPNG: (scale) => exportPNG(scale),
        undo,
        redo,
        clearAll,
        imageStack,
        confirm: (message) => confirm(message),
        cameraControls: {
            rotateCamera: (deltaAzimuth, deltaPolar) => {
                if (!controls) return;
                // Rotate around target using spherical coordinates
                const offset = camera.position.clone().sub(controls.target);
                const spherical = new THREE.Spherical().setFromVector3(offset);
                spherical.theta += deltaAzimuth;
                spherical.phi += deltaPolar;
                // Clamp polar angle to avoid flipping
                spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
                offset.setFromSpherical(spherical);
                camera.position.copy(controls.target).add(offset);
                camera.lookAt(controls.target);
                controls.update();
            },
            panCamera: (deltaX, deltaY) => {
                if (!cameraController) return;
                const currentX = params.cameraOffsetX + deltaX;
                const currentY = params.cameraOffsetY + deltaY;
                cameraController.setOffset(currentX, currentY);
                if (pane) pane.refresh();
            },
            zoomCamera: (delta) => {
                if (!cameraController) return;
                const newDistance = Math.max(
                    CAMERA_MIN_DISTANCE,
                    Math.min(CAMERA_MAX_DISTANCE, params.cameraDistance + delta)
                );
                cameraController.setDistance(newDistance);
                if (pane) pane.refresh();
            }
        }
    });

    // Expose debug API (window.vexyStax)
    debugAPI = new DebugAPI({
        imageStack,
        params,
        scene,
        camera,
        controls,
        managers: {
            renderLoop: null, // Set after creation
            cameraAnimator: null,
            cameraController,
            ambienceManager,
            floorManager,
            memoryMonitor: null,
            historyManager
        },
        pane,
        callbacks: {
            exportPNG,
            clearAll,
            loadSettings: () => settingsManager.loadSettings(),
            saveSettings: () => settingsManager.saveSettings(),
            resetSettings: () => settingsManager.resetSettings(),
            undo: () => historyManager?.undo?.(),
            redo: () => historyManager?.redo?.(),
            toggleAmbience: (intensity) => app?.sceneDirector?.setAmbience(intensity)
        }
    });
    debugAPI.expose();

    // Playwright automation API (window.__vexyStaxAutomation)
    automationBridge = new AutomationBridge({
        imageStack,
        params,
        managers: {
            cameraAnimator,
            ambienceManager,
            floorManager
        },
        callbacks: {
            loadImage,
            setViewpoint,
            setBeautyViewpoint,
            setHeroViewpoint,
            setViewpointFitToFrame,
            centerViewOnContent
        }
    });
    automationBridge.expose();
    setupCleanup();

    renderLoop = new RenderLoop();
    renderLoop.setRenderCallback(() => {
        controls.update();
        const activeCamera = getActiveCamera();
        renderer.render(scene, activeCamera);
    });
    renderLoop.start();

    // Update debugAPI with late-bound managers
    if (debugAPI) {
        debugAPI.setManager('renderLoop', renderLoop);
        debugAPI.setManager('cameraAnimator', cameraAnimator);
        debugAPI.setManager('memoryMonitor', memoryMonitor);
    }

    // Auto-save settings every 30 seconds
    setupAutoSave();

    // ═══════════════════════════════════════════════════════════════════════
    // Phase 5: Application Orchestration
    // Register all managers with Application for centralized lifecycle
    // ═══════════════════════════════════════════════════════════════════════
    app = new Application(canvas);
    app.init();

    // Register core services
    app.registerService('scene', scene);
    app.registerService('renderer', renderer);
    app.registerService('params', params);
    app.registerService('imageStack', imageStack);
    app.registerService('camera', camera);
    app.registerService('orthoCamera', orthoCamera);
    app.registerService('controls', controls);

    // Register managers
    app.registerService('sceneManager', sceneManager);
    app.registerService('lightingManager', lightingManager);
    app.registerService('floorManager', floorManager);
    app.registerService('ambienceManager', ambienceManager);
    app.registerService('sceneComposition', sceneComposition);
    app.registerService('cameraController', cameraController);
    app.registerService('historyManager', historyManager);
    app.registerService('pane', pane);

    // Wire controllers with callbacks
    app.wireControllers({
        callbacks: {
            getEffectiveZSpacing,
            onBackgroundChanged: (reason) => emitBackgroundChanged(reason),
            onViewpointChanged: (preset) => emitCameraUpdated(preset),
            onDeleteSlide: (index) => sceneComposition?.deleteAt?.(index),
            onReorderSlides: (from, to) => sceneComposition?.reorder?.(from, to),
            onUpdateAriaLabel: updateCanvasAriaLabel,
            showToast,
            onUndo: () => historyManager?.undo?.(),
            onRedo: () => historyManager?.redo?.(),
            onResetCamera: () => setViewpointFitToFrame(),
            onToggleHelp: () => keyboardShortcuts?.toggleHelp?.(),
            // Hero mode callbacks: Set ambience to 0 (flat) on enter, restore on exit
            onHeroModeEnter: (savedState) => {
                // Set ambience to 0 for flat materials in Hero mode
                params.ambience = 0;
                if (ambienceManager) {
                    ambienceManager.updateMaterials(false);
                }
                if (floorManager) {
                    floorManager.updateMaterial(false);
                }
                pane?.refresh?.();
            },
            onHeroModeExit: (savedState) => {
                // Restore ambience from saved state
                params.ambience = savedState.ambience;
                const enabled = savedState.ambience > 0;
                if (ambienceManager) {
                    ambienceManager.updateMaterials(enabled);
                    if (enabled) {
                        ambienceManager.applyEmissiveIntensity(savedState.ambience * 0.25);
                    }
                }
                if (floorManager) {
                    floorManager.updateMaterial(enabled);
                }
                pane?.refresh?.();
            }
        }
    });

    logInit.info('Application orchestrator wired');
    logInit.info('Vexy Stax initialized');
}

/**
 * Calculate relative luminance of a color (0-1 range)
 * Uses formula from WCAG 2.0
 * @param {string} hexColor - Hex color string (e.g. '#ffffff')
 * @returns {number} Luminance value between 0 (black) and 1 (white)
 */

/**
 * Helper function to add event listener and track it for cleanup
 * @param {EventTarget} target - DOM element or window
 * @param {string} event - Event name
 * @param {Function} handler - Event handler function
 * @param {Object} options - Event listener options
 */
function addTrackedEventListener(target, event, handler, options = {}) {
    target.addEventListener(event, handler, options);
    eventListeners.push({ target, event, handler, options });
    storeSharedRef(SHARED_STATE_KEYS.eventListeners, eventListeners);
}

/**
 * Setup proper resource cleanup on page unload to prevent memory leaks
 */
function setupCleanup() {
    window.addEventListener('beforeunload', () => {
        logCleanup.info(' Disposing Three.js resources...');

        try {
            if (floorManager) {
                floorManager.remove();
                floorManager.dispose?.();
                floorManager = null;
            }
            if (lightingManager) {
                lightingManager.dispose();
                lightingManager = null;
            }

            // Dispose all images in stack
            imageStack.forEach(imageData => {
                if (imageData.mesh) {
                    // Dispose geometry
                    if (imageData.mesh.geometry) {
                        imageData.mesh.geometry.dispose();
                    }

                    // Dispose material and texture
                    if (imageData.mesh.material) {
                        if (imageData.mesh.material.map) {
                            imageData.mesh.material.map.dispose();
                        }
                        imageData.mesh.material.dispose();
                    }

                    // Remove from scene
                    scene.remove(imageData.mesh);
                }
            });

            // Clear image stack
            imageStack.length = 0;
            storeSharedRef(SHARED_STATE_KEYS.imageStack, imageStack);
            emitStackUpdated('disposed');

            // Dispose controls

            // Dispose render loop
            if (renderLoop) {
                renderLoop.dispose();
            }
            if (controls) {
                controls.dispose();
            }

            if (sceneManager) {
                sceneManager.dispose();
                sceneManager = null;
            } else {
                if (renderer) {
                    renderer.dispose();
                    renderer.forceContextLoss();
                }
                if (scene) {
                    scene.environment = null;
                    scene.clear();
                }
            }

            if (fileHandler) {
                fileHandler.teardown();
                fileHandler = null;
            }

            if (keyboardShortcuts) {
                keyboardShortcuts.teardown?.();
                keyboardShortcuts = null;
            }

            // Execute registered cleanup callbacks
            cleanupCallbacks.forEach(callback => {
                try {
                    callback();
                } catch (e) {
                    logCleanup.error('Cleanup callback error:', e);
                }
            });
            cleanupCallbacks = [];

            // Remove all tracked event listeners
            eventListeners.forEach(({ target, event, handler, options }) => {
                target.removeEventListener(event, handler, options);
            });
            eventListeners = [];
            storeSharedRef(SHARED_STATE_KEYS.eventListeners, eventListeners);
            logCleanup.info(' Removed all event listeners');

            logCleanup.info(' All resources disposed successfully');
        } catch (error) {
            logCleanup.error(' Error during cleanup:', error);
        }
    });

    logCleanup.info(' Resource cleanup handler registered');
}

/**
 * Setup debounced window resize to prevent excessive recalculations
 */
function setupDebouncedResize() {
    let resizeTimeout = null;
    const DEBOUNCE_DELAY = DEBOUNCE_DELAY_MS; // ms - balance between responsiveness and performance

    const debouncedResize = () => {
        // Clear any pending resize
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }

        // Schedule new resize
        resizeTimeout = setTimeout(() => {
            onWindowResize();
            logResize.info(' Debounced resize executed');
            resizeTimeout = null;
        }, DEBOUNCE_DELAY);
    };

    addTrackedEventListener(window, 'resize', debouncedResize);
    logResize.info(` Debounced resize handler registered (${DEBOUNCE_DELAY}ms delay)`);
}

/**
 * Setup auto-save interval to persist settings every 30 seconds
 */
let autoSaveIntervalId = null;

function setupAutoSave() {
    if (autoSaveIntervalId) {
        clearInterval(autoSaveIntervalId);
    }

    autoSaveIntervalId = setInterval(() => {
        settingsManager.saveSettings();
        logUI.info('Settings auto-saved');
    }, AUTO_SAVE_INTERVAL);

    // Track for cleanup
    cleanupCallbacks.push(() => {
        if (autoSaveIntervalId) {
            clearInterval(autoSaveIntervalId);
            autoSaveIntervalId = null;
        }
    });
}

/**
 * Setup WebGL context loss/restore handlers for graceful GPU reset recovery
 */

/**
 * Setup FPS counter and performance monitoring
 * Creates FPS display element and tracks rendering performance
 */

function checkMemoryUsage(isAdding = false) {
    if (!memoryMonitor) {
        return true;
    }
    return memoryMonitor.checkMemoryUsage(isAdding);
}

function captureHistorySnapshot() {
    return {
        timestamp: Date.now(),
        images: imageStack.map((img) => ({
            filename: img.filename,
            width: img.width,
            height: img.height,
            originalWidth: img.originalWidth,
            originalHeight: img.originalHeight,
            thumbnailSrc: img.thumbnailSrc,
            position: { ...img.mesh.position },
            texture: img.texture,
            mesh: img.mesh
        }))
    };
}

function clearCurrentImageStack() {
    if (!scene) {
        return;
    }
    imageStack.forEach((img) => {
        scene.remove(img.mesh);
        img.mesh.geometry.dispose();
        img.mesh.material.dispose();
        if (img.mesh.material.map) {
            img.mesh.material.map.dispose();
        }
    });
    imageStack.length = 0;
    storeSharedRef(SHARED_STATE_KEYS.imageStack, imageStack);
}

function restoreImageStackFromSnapshot(images) {
    if (!scene || !Array.isArray(images)) {
        return;
    }
    images.forEach((img) => {
        imageStack.push({
            filename: img.filename,
            width: img.width,
            height: img.height,
            originalWidth: img.originalWidth,
            originalHeight: img.originalHeight,
            thumbnailSrc: img.thumbnailSrc,
            texture: img.texture,
            mesh: img.mesh
        });
        scene.add(img.mesh);
        if (img.position) {
            img.mesh.position.copy(img.position);
        }
    });
}

function applyHistorySnapshot(state, meta = {}) {
    if (!state || !Array.isArray(state.images)) {
        logHistory.warn(' History snapshot missing images; skipping apply');
        return;
    }

    clearCurrentImageStack();
    restoreImageStackFromSnapshot(state.images);
    updateImageList();

    const stackSize = historyManager ? historyManager.size() : historyStack.length;
    if (meta.action === 'undo') {
        logHistory.info(` Undo to state ${meta.index + 1}/${stackSize}`);
    } else if (meta.action === 'redo') {
        logHistory.info(` Redo to state ${meta.index + 1}/${stackSize}`);
    }

    if (meta.action) {
        emitStackUpdated(meta.action);
    }
}

function saveHistory() {
    if (!historyManager) {
        logHistory.warn(' HistoryManager not initialised; skipping capture');
        return;
    }
    const snapshot = historyManager.capture();
    if (snapshot === null) {
        return;
    }
    const index = historyManager.getIndex();
    const size = historyManager.size();
    logHistory.info(` Saved state (${index + 1}/${size})`);
}

function setupTweakpane() {
    tweakpaneSetup = new TweakpaneSetup({
        params,
        materialPresets: MATERIAL_PRESETS,
        viewpointPresets: VIEWPOINT_PRESETS,
        callbacks: {
            updateCanvasSize,
            updateBackground: () => app?.sceneDirector?.updateBackground(),
            updateFloorColor,
            toggleAmbience: (intensity) => app?.sceneDirector?.setAmbience(intensity),
            centerViewOnContent,
            setViewpoint: (...args) => { setViewpoint(...args); updateCanvasAriaLabel(); },
            setBeautyViewpoint: () => { setBeautyViewpoint(); updateCanvasAriaLabel(); },
            setViewpointFitToFrame: () => { setViewpointFitToFrame(); updateCanvasAriaLabel(); },
            switchCameraMode,
            updateZoom,
            updateCameraDistance,
            updateCameraOffset,
            setCameraFOV: (value) => {
                if (cameraController) {
                    cameraController.setFOV(value);
                } else {
                    camera.fov = value;
                    camera.updateProjectionMatrix();
                }
            },
            setHeroViewpoint: () => { setHeroViewpoint(); updateCanvasAriaLabel(); },
            applyMaterialPreset: (preset) => { applyMaterialPreset(preset); updateCanvasAriaLabel(); },
            updateZSpacing,
            exportPNG,
            exportJSON,
            importJSON,
            copyJSON,
            pasteJSON,
            resetSettings: () => settingsManager.resetSettings(),
            clearAll,
            undo: () => historyManager?.undo?.(),
            redo: () => historyManager?.redo?.(),
            showToast,
            saveSettings: () => settingsManager.saveSettings(),
            loadExample,
            // Hero Shot animation ambience transition
            onAmbienceChange: (value) => {
                params.ambience = value;
                const enabled = value > 0;
                if (ambienceManager) {
                    ambienceManager.updateMaterials(enabled);
                    if (enabled) {
                        ambienceManager.applyEmissiveIntensity(value * 0.25);
                    }
                }
                if (floorManager) {
                    floorManager.updateMaterial(enabled);
                }
            }
        },
        dependencies: {
            cameraAnimator,
            logUI,
            logCamera,
            confirm: (message) => confirm(message),
            document,
            imageStack
        }
    });

    const paneInstance = tweakpaneSetup.setup();
    if (paneInstance) {
        pane = paneInstance;
    }
}

/**
 * Export current 3D scene as PNG image with configurable resolution
 *
 * @param {number} [scale=1] - Resolution multiplier (1x, 2x, or 4x). Values outside 1-4 range default to 1x.
 * @returns {Promise<void>}
 *
 * @example
 * // Export at standard resolution (window size)
 * window.vexyStax.exportPNG(1);
 *
 * @example
 * // Export at 2x resolution for high-DPI displays
 * window.vexyStax.exportPNG(2);
 *
 * @example
 * // Export at 4x resolution for print quality
 * window.vexyStax.exportPNG(4);
 *
 * @example
 * // Use default 1x if no parameter
 * window.vexyStax.exportPNG();
 */
function exportPNG(scale = 1) {
    if (!exportManager) {
        logExport.warn('Export manager not initialized');
        return;
    }
    return exportManager.exportPNG(scale);
}

function getActiveCamera() {
    if (cameraController) {
        return cameraController.getActiveCamera();
    }
    return (cameraMode === 'orthographic' || cameraMode === 'isometric') ? orthoCamera : camera;
}

function updateZoom(zoomValue) {
    if (cameraController) {
        cameraController.setZoom(zoomValue);
        return;
    }

    params.cameraZoom = zoomValue;

    // Apply zoom to both cameras
    camera.zoom = zoomValue;
    camera.updateProjectionMatrix();

    orthoCamera.zoom = zoomValue;
    orthoCamera.updateProjectionMatrix();

    logCamera.info(`Zoom updated to ${zoomValue.toFixed(1)}x`);
    emitCameraUpdated('zoom');
}

/**
 * Update camera distance (delegates to CameraController)
 * @param {number} distance - Camera distance from target
 */
function updateCameraDistance(distance) {
    if (cameraController) {
        cameraController.setDistance(distance);
    }
}

/**
 * Update camera X/Y offset (delegates to CameraController)
 * @param {number} offsetX - X offset (positive = right in screen space)
 * @param {number} offsetY - Y offset (positive = up in screen space)
 */
function updateCameraOffset(offsetX, offsetY) {
    if (cameraController) {
        cameraController.setOffset(offsetX, offsetY);
    }
}

function syncRendererDimensions(size, pixelRatioOverride) {
    if (!renderer || !canvas) {
        return;
    }

    const dimensions = computeRetinaDimensions(size, pixelRatioOverride);
    renderer.setPixelRatio(dimensions.pixelRatio);
    renderer.setSize(dimensions.cssWidth, dimensions.cssHeight, false);
    canvas.style.width = `${dimensions.cssWidth}px`;
    canvas.style.height = `${dimensions.cssHeight}px`;
    return dimensions;
}

function updateCanvasSize(size) {
    params.canvasSize = size;

    const dimensions = sceneManager
        ? sceneManager.syncRendererDimensions(size, window.devicePixelRatio)
        : null;

    const aspect = size.x / size.y;
    if (cameraMode === 'perspective' || cameraMode === 'telephoto') {
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
    } else if (cameraMode === 'orthographic' || cameraMode === 'isometric') {
        const frustumSize = ORTHO_FRUSTUM_SIZE;
        orthoCamera.left = (frustumSize * aspect) / -2;
        orthoCamera.right = (frustumSize * aspect) / 2;
        orthoCamera.top = frustumSize / 2;
        orthoCamera.bottom = frustumSize / -2;
        orthoCamera.updateProjectionMatrix();
    }

    if (params.ambience) {
        floorManager?.updateReflectionSettings();
    }

    if (dimensions) {
        logResize.info(`Canvas resized to ${dimensions.cssWidth}x${dimensions.cssHeight} (pixel ratio ${dimensions.pixelRatio})`);
    } else {
        logResize.info(`Canvas resized to ${size.x}x${size.y}`);
    }
}

// Studio frame visualization removed - canvas size now controls renderer dimensions directly

/**
 * Center the active camera on the combined bounds of all loaded slides.
 *
 * When the refactored `CameraController` is available the call is delegated,
 * otherwise falls back to legacy bounding-box logic.
 *
 * @returns {void}
 *
 * @example
 * // Reframe camera after dragging slides
 * centerViewOnContent();
 */
function centerViewOnContent() {
    // Restore z-positions if coming from Hero viewpoint (SCENE.md §5)
    // restoreSlideZPositions() is self-guarding via savedHeroZSpacing check
    restoreSlideZPositions();

    if (cameraController) {
        cameraController.centerOnContent();
        return;
    }

    if (imageStack.length === 0) {
        logCamera.info('No content to center on');
        return;
    }

    const box = new THREE.Box3();
    imageStack.forEach(imageData => {
        box.expandByObject(imageData.mesh);
    });

    const center = new THREE.Vector3();
    box.getCenter(center);

    controls.target.copy(center);

    const currentCam = getActiveCamera();
    const offset = new THREE.Vector3().subVectors(currentCam.position, new THREE.Vector3(0, 0, 0));
    currentCam.position.copy(center).add(offset);
    currentCam.lookAt(center);

    controls.update();
    logCamera.info(`Centered view on content at (${center.x.toFixed(1)}, ${center.y.toFixed(1)}, ${center.z.toFixed(1)})`);
    emitCameraUpdated('center');
}

/**
 * Switch the active camera configuration between perspective variants.
 *
 * @param {string} mode - One of 'perspective', 'orthographic', 'isometric', 'telephoto'.
 *
 * @example
 * switchCameraMode('telephoto');
 */
function switchCameraMode(mode) {
    if (cameraController) {
        cameraController.switchMode(mode);
        return;
    }

    cameraMode = mode;
    params.cameraMode = mode;
    logCamera.info(`Switching to ${mode} camera mode`);

    if (mode === 'orthographic') {
        orthoCamera.position.set(0, 0, CAMERA_DEFAULT_DISTANCE);
        orthoCamera.lookAt(0, 0, 0);
        orthoCamera.zoom = params.cameraZoom;
        orthoCamera.updateProjectionMatrix();
        controls.object = orthoCamera;
    } else if (mode === 'isometric') {
        orthoCamera.position.set(500, 500, 500);
        orthoCamera.lookAt(0, 0, 0);
        orthoCamera.zoom = params.cameraZoom;
        orthoCamera.updateProjectionMatrix();
        controls.object = orthoCamera;
    } else if (mode === 'telephoto') {
        params.cameraFOV = 30;
        camera.fov = 30;
        camera.position.set(0, 0, 1500);
        camera.lookAt(0, 0, 0);
        camera.zoom = params.cameraZoom;
        camera.updateProjectionMatrix();
        controls.object = camera;
        pane?.refresh?.();
    } else {
        camera.position.set(0, 0, CAMERA_DEFAULT_DISTANCE);
        camera.lookAt(0, 0, 0);
        camera.zoom = params.cameraZoom;
        camera.updateProjectionMatrix();
        controls.object = camera;
    }

    controls.update();
    emitCameraUpdated('mode-change');
}

/**
 * Update floor color and opacity from params.floorColor
 */
function updateFloorColor() {
    if (floorManager) {
        floorManager.updateColor();
    }
}

/**
 * Update canvas aria-label to describe current scene state for screen readers.
 * Called when images are added/removed or viewpoint changes.
 */
function updateCanvasAriaLabel() {
    if (!canvas) return;

    const imageCount = imageStack.length;
    const viewpoint = params.viewpointPreset || 'custom';
    const material = params.materialPreset || 'neutral';

    let description;
    if (imageCount === 0) {
        description = '3D image stack viewer. No images loaded. Drop images here or click the + button to add images.';
    } else {
        const imageWord = imageCount === 1 ? 'image' : 'images';
        description = `3D image stack with ${imageCount} ${imageWord}. ${viewpoint} viewpoint, ${material} material. Use arrow keys to rotate camera, +/- to zoom.`;
    }

    canvas.setAttribute('aria-label', description);
}

/**
 * Update the Z-offset applied between consecutive slides in the stack.
 *
 * @param {number|null} newSpacing - Distance in Three.js world units between slides.
 *                                   Pass null to use automatic calculation.
 *
 * @example
 * // Increase separation for a thicker stack appearance
 * updateZSpacing(80);
 *
 * @example
 * // Use automatic distance calculation
 * updateZSpacing(null);
 */
function updateZSpacing(newSpacing) {
    params.zSpacing = newSpacing;
    const effectiveSpacing = newSpacing === null ? calculateAutoDistance() : newSpacing;

    // Update all existing images
    // PLAN.md §1: Final slide at z=0, others at negative z
    const slideCount = imageStack.length;
    imageStack.forEach((imageData, index) => {
        const offset = (slideCount - 1 - index) * effectiveSpacing;
        imageData.mesh.position.z = offset === 0 ? 0 : -offset;
    });
    logImages.info(`Z-spacing updated to ${effectiveSpacing}px${newSpacing === null ? ' (auto)' : ''}`);

    // PLAN.md §3(a): Trigger floor resize when slide space changes
    if (sceneComposition) {
        sceneComposition.recalculateLayout();
    }
}

/**
 * Calculate content center from imageStack for fallback camera targeting.
 * @returns {THREE.Vector3}
 */
function getContentCenterFromStack() {
    if (imageStack.length === 0) {
        return new THREE.Vector3(0, 0, 0);
    }
    const box = new THREE.Box3();
    imageStack.forEach((entry) => {
        if (entry?.mesh) {
            box.expandByObject(entry.mesh);
        }
    });
    if (box.isEmpty()) {
        return new THREE.Vector3(0, 0, 0);
    }
    return box.getCenter(new THREE.Vector3());
}

function setViewpoint(x, y, z) {
    // Restore z-positions if coming from Hero viewpoint (SCENE.md §5)
    // restoreSlideZPositions() is self-guarding via savedHeroZSpacing check
    restoreSlideZPositions();

    if (cameraController) {
        cameraController.setViewpoint(x, y, z);
        return;
    }

    const target = getContentCenterFromStack();
    camera.position.set(x, y, z);
    camera.lookAt(target);
    controls.target.copy(target);
    controls.update();
    logCamera.info(`Viewpoint set to (${x}, ${y}, ${z}), target (${target.x.toFixed(1)}, ${target.y.toFixed(1)}, ${target.z.toFixed(1)})`);
    emitCameraUpdated('viewpoint');
}

/**
 * Set viewpoint to fit frontmost slide within studio frame.
 * Delegates to ViewpointController for coordinated camera updates.
 * @param {Object} [options] - Options for viewpoint setting
 * @param {boolean} [options.skipRestore=false] - Skip restoring z-positions (used by Hero mode)
 */
function setViewpointFitToFrame(options = {}) {
    if (app?.viewpointController) {
        app.viewpointController.setViewpointFitToFrame(options);
        emitCameraUpdated('viewpoint');
    }
}

/**
 * Calculate automatic slide distance based on tallest slide height.
 * Formula: tallest_slide_height * 0.6
 * @returns {number} The calculated automatic distance
 */
function calculateAutoDistance() {
    if (imageStack.length === 0) {
        return DEFAULT_Z_SPACING;
    }
    // PLAN.md: Default slide space = tallest_slide_height * 0.6
    const tallestHeight = Math.max(...imageStack.map(img => img.height ?? 0), 100);
    return Math.round(tallestHeight * 0.6);
}

/**
 * Get the effective z-spacing, using automatic calculation if null.
 * Always adds MIN_LAYER_GAP to prevent z-fighting when Layer Depth is 0.
 * @returns {number} The z-spacing to use (always >= MIN_LAYER_GAP)
 */
function getEffectiveZSpacing() {
    const baseSpacing = (params.zSpacing === null || params.zSpacing === undefined)
        ? calculateAutoDistance()
        : params.zSpacing;
    return baseSpacing + MIN_LAYER_GAP;
}

/**
 * Restore slide z-positions to their proper spacing based on params.zSpacing.
 * Called when switching away from Hero viewpoint, which collapses slides.
 * SCENE.md §5: Layer depth should restore when changing away from Hero.
 *
 * PLAN.md §1: Final slide stays at Z=0, other slides at negative Z.
 * Formula: z = -(slideCount - 1 - index) * effectiveSpacing
 */
function restoreSlideZPositions() {
    // Check ViewpointController's state (primary) or legacy savedHeroZSpacing
    const isInHeroMode = app?.viewpointController?.isInHeroMode?.() || savedHeroZSpacing !== null;
    if (!isInHeroMode) {
        return;
    }

    const effectiveSpacing = getEffectiveZSpacing();
    const slideCount = imageStack.length;

    // PLAN.md §1: Final slide at Z=0, others at negative Z
    imageStack.forEach((imageData, index) => {
        const offset = (slideCount - 1 - index) * effectiveSpacing;
        imageData.mesh.position.z = offset === 0 ? 0 : -offset;
    });
    logCamera.info(`Slide z-positions restored to spacing ${effectiveSpacing}px (was in Hero mode)`);

    // Clear both state systems
    savedHeroZSpacing = null;
    if (app?.viewpointController?.savedHeroState) {
        app.viewpointController.savedHeroState = null;
    }
}

/**
 * Set viewpoint to Hero view - front view with slides collapsed.
 * Delegates to ViewpointController for coordinated camera updates.
 */
function setHeroViewpoint() {
    if (app?.viewpointController) {
        app.viewpointController.setHeroViewpoint();
        pane?.refresh?.();
    }
}

/**
 * Set viewpoint to a dynamic three-quarter "beauty" angle.
 */
function setBeautyViewpoint() {
    if (app?.viewpointController) {
        app.viewpointController.setBeautyViewpoint();
        emitCameraUpdated('viewpoint');
    }
}

/**
 * Remove all loaded images from the 3D scene and clear the image stack
 *
 * Properly disposes of all Three.js resources (geometries, materials, textures)
 * to prevent memory leaks. Saves current state to history for undo/redo.
 *
 * @returns {void}
 *
 * @example
 * // Clear all images and start fresh
 * window.vexyStax.clearAll();
 *
 * @example
 * // Check if images exist before clearing
 * if (window.vexyStax.getImageStack().length > 0) {
 *   window.vexyStax.clearAll();
 * }
 *
 * @example
 * // Clear and reload from JSON
 * window.vexyStax.clearAll();
 * // Then load new configuration
 * const fileInput = document.getElementById('json-input');
 * fileInput.click();
 */
function clearAll() {
    sceneComposition?.clearAll();
}

/**
 * Load example images for quick onboarding.
 * Creates 3 gradient placeholder images programmatically.
 */
function loadExample() {
    // Clear existing images first
    clearAll();

    // Create 3 example gradient images
    const colors = [
        { start: '#ff6b6b', end: '#ee5a5a', name: 'Red Layer' },
        { start: '#4ecdc4', end: '#45b7aa', name: 'Teal Layer' },
        { start: '#45b7d1', end: '#3a9bb5', name: 'Blue Layer' }
    ];

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    colors.forEach((color, index) => {
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, color.start);
        gradient.addColorStop(1, color.end);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add layer number
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Layer ${index + 1}`, canvas.width / 2, canvas.height / 2);

        // Convert to data URL and load
        const dataURL = canvas.toDataURL('image/png');
        const loader = new THREE.TextureLoader();
        loader.load(dataURL, (texture) => {
            sceneComposition?.addImage(texture, `${color.name}.png`);
        });
    });

    showToast('Loaded 3 example layers', 'success');
    logImages.info('Example images loaded');
}

function applyMaterialPreset(preset) {
    sceneComposition?.applyMaterialPreset(preset);
}

function loadImage(file) {
    const reader = new FileReader();

    reader.onload = function(event) {
        const dataURL = event.target.result;

        const retryingLoader = new RetryingTextureLoader({
            createLoader: () => new THREE.TextureLoader(),
            maxRetries: MAX_LOAD_RETRIES,
            retryDelays: RETRY_DELAYS_MS,
            logRetry,
            scheduleRetry: (callback, delay) => setTimeout(callback, delay),
            showToast,
            toastDurationError: TOAST_DURATION_ERROR,
            onTextureLoaded: (texture) => {
                const img = texture.image;

                if (img?.width > MAX_DIMENSION_PX || img?.height > MAX_DIMENSION_PX) {
                    logValidation.warn(
                        `Warning: Image ${file.name} has large dimensions (${img?.width}x${img?.height}). Max recommended: ${MAX_DIMENSION_PX}px.`
                    );
                    showToast(
                        `⚠️ Large dimensions: ${file.name} (${img?.width}x${img?.height}px). May render slowly`,
                        'warning',
                        TOAST_DURATION_WARNING
                    );
                }

                sceneComposition?.addImage(texture, file.name);
            }
        });

        retryingLoader.load(dataURL, file.name);
    };
    reader.onerror = function(error) {
        logFile.error(`Failed to read file ${file.name}:`, error);
        showToast(`❌ Failed to read file: ${file.name}`, 'error', TOAST_DURATION_ERROR);
    };

    reader.readAsDataURL(file);
}

function updateImageList() {
    if (app?.slidePanelController) {
        app.slidePanelController.updateImageList();
    }
}

// Global function for delete button
window.deleteImage = function(index) {
    sceneComposition?.deleteAt(index);
};

function onWindowResize() {
    if (!sceneManager) {
        return;
    }

    sceneManager.onWindowResize();
    if (params.ambience) {
        floorManager?.updateReflectionSettings();
    }
}

/**
 * Export the current scene configuration (camera, materials, stack) as JSON.
 *
 * Delegates to `ExportManager` to serialise params, mesh transforms, and
 * embedded texture data. The resulting file is downloaded immediately.
 *
 * @returns {Promise<void>} Resolves once the download has been triggered.
 *
 * @example
 * // Trigger a JSON export from the public API
 * window.vexyStax.exportJSON();
 */
function exportJSON() {
    if (!exportManager) {
        logExport.warn('Export manager not initialized');
        return;
    }
    return exportManager.exportJSON();
}

/**
 * Import scene configuration from JSON file
 *
 * Loads a previously exported JSON file containing scene parameters,
 * camera position, and image data (encoded as base64). Clears current
 * scene before applying imported configuration.
 *
 * @param {File} file - File object from file input or drag-and-drop event
 * @returns {Promise<void>}
 *
 * @example
 * // Import from file input
 * const fileInput = document.getElementById('json-input');
 * fileInput.addEventListener('change', (e) => {
 *   const file = e.target.files[0];
 *   if (file) {
 *     window.vexyStax.importJSON(file);
 *   }
 * });
 *
 * @example
 * // Import from drag-and-drop
 * dropZone.addEventListener('drop', (e) => {
 *   e.preventDefault();
 *   const files = Array.from(e.dataTransfer.files);
 *   const jsonFile = files.find(f => f.name.endsWith('.json'));
 *   if (jsonFile) {
 *     window.vexyStax.importJSON(jsonFile);
 *   }
 * });
 *
 * @example
 * // Import with error handling
 * try {
 *   window.vexyStax.importJSON(file);
 * } catch (error) {
 *   console.error('Import failed:', error);
 * }
 */
function importJSON(file) {
    if (!exportManager) {
        logExport.warn('Export manager not initialized');
        return;
    }
    return exportManager.importJSON(file);
}

function copyJSON() {
    if (!exportManager) {
        logExport.warn('Export manager not initialized');
        return;
    }
    return exportManager.copyJSON();
}

function pasteJSON() {
    if (!exportManager) {
        logExport.warn('Export manager not initialized');
        return;
    }
    return exportManager.pasteJSON();
}

// Initialize when DOM is ready
init();
