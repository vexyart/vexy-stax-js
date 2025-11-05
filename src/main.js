// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/main.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { Pane } from 'tweakpane';
import { CameraAnimator } from './camera/animation.js';
import { CameraController } from './camera/CameraController.js';
import { RenderLoop } from './core/RenderLoop.js';
import { SceneComposition } from './core/SceneComposition.js';
import { MemoryMonitor } from './memory/MemoryMonitor.js';
import { ExportManager } from './export/ExportManager.js';
import { createLogger } from './utils/logger.js';
import { FileHandler } from './files/FileHandler.js';
import { TweakpaneSetup } from './ui/TweakpaneSetup.js';
import { setupKeyboardShortcuts } from './ui/KeyboardShortcuts.js';
import { createToastService } from './ui/ToastService.js';
import { createSettingsManager } from './settings/SettingsManager.js';
import {
    MAX_HISTORY,
    FPS_WARNING_THRESHOLD,
    MEMORY_WARNING_THRESHOLD_MB,
    MEMORY_CRITICAL_THRESHOLD_MB,
    MEMORY_WARNING_COOLDOWN,
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
    Z_INDEX_MODAL,
    BYTES_PER_MB,
    FLOOR_Y,
    FLOOR_SIZE,
    REFLECTION_TEXTURE_BASE,
    REFLECTION_MIN_RESOLUTION,
    REFLECTION_OPACITY,
    REFLECTION_BLUR_RADIUS,
    REFLECTION_FADE_STRENGTH,
    ORTHO_FRUSTUM_SIZE,
    MAX_DIMENSION_PX,
    MAX_LOAD_RETRIES,
    RETRY_DELAYS_MS,
    DEBOUNCE_DELAY_MS,
    MATERIAL_PRESETS,
    VIEWPOINT_PRESETS,
    SoftReflectorShader,
    AMBIENT_INTENSITY_RANGE,
    EMISSIVE_INTENSITY_RANGE,
    MAIN_LIGHT_SETTINGS,
    FILL_LIGHT_SETTINGS,
    HEMISPHERE_LIGHT_SETTINGS,
    FLOOR_BASE_MATERIAL,
    FLOOR_REFLECTOR_OFFSET,
    EVENTS,
    createDefaultParams
} from './core/constants.js';
import { appState } from './core/AppState.js';
import { eventBus } from './core/EventBus.js';
import { storeSharedRef, SHARED_STATE_KEYS } from './core/sharedState.js';
import { computeRetinaDimensions } from './core/studioSizing.js';

// Scene, Camera, Renderer
let scene, camera, orthoCamera, renderer, controls;
let canvas;
let cameraMode = 'perspective'; // 'perspective', 'orthographic', 'isometric'
let cameraAnimator; // Camera animation system
let cameraController; // Handles camera orchestration
let tweakpaneSetup; // Encapsulates Tweakpane wiring

let renderLoop; // Render animation loop manager
let sceneComposition; // Manages image stack meshes
let fileHandler = null; // Handles file intake (browse + drag/drop)
let exportManager = null; // Manages PNG/JSON exports and imports
let keyboardShortcuts = null; // Handles keyboard shortcut wiring
// Lighting and environment
let ambientLight, mainLight, fillLight;
let floorGroup = null;
let floorBase = null;
let floorReflector = null;
let environmentTexture = null;

// Image stack management
let imageStack = [];

// Event listener tracking for proper cleanup
let eventListeners = [];

// History management for undo/redo
let historyStack = [];
let historyIndex = -1;

// FPS monitor tracking
let showFPSEnabled = false;
let memoryMonitor = null;

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
    updateBackground: () => updateBackground(),
    updateZSpacing: (spacing) => updateZSpacing(spacing),
    updateReflectionSettings: () => updateReflectionSettings(),
    defaults: {
        cameraMode: 'perspective',
        cameraFOV: DEFAULT_CAMERA_FOV,
        cameraZoom: 1.0,
        bgColor: DEFAULT_BG_COLOR,
        transparentBg: false,
        zSpacing: DEFAULT_Z_SPACING
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

// UI
let pane;

function emitBackgroundChanged(reason) {
    eventBus.emit(EVENTS.backgroundChanged, {
        reason,
        color: params.bgColor,
        transparent: params.transparentBg,
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
    // Check browser capabilities first
    if (!detectCapabilities()) {
        return; // Stop initialization if capabilities missing
    }

    // Load saved settings from localStorage
    loadSettings();

    // Get canvas element
    canvas = document.getElementById('canvas');

    // Create scene
    scene = new THREE.Scene();
    storeSharedRef(SHARED_STATE_KEYS.scene, scene);
    scene.background = new THREE.Color(params.bgColor);

    // Create perspective camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(params.cameraFOV, aspect, 0.1, CAMERA_FAR_PLANE);
    storeSharedRef(SHARED_STATE_KEYS.camera, camera);
    camera.position.set(0, 0, CAMERA_DEFAULT_DISTANCE);
    camera.lookAt(0, 0, 0);
    camera.zoom = params.cameraZoom;

    // Create orthographic camera (for isometric/ortho modes)
    const frustumSize = ORTHO_FRUSTUM_SIZE;  // Base frustum size
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

    // Create renderer with advanced photorealistic features
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,  // Enable transparency
        preserveDrawingBuffer: true,  // Needed for export
        powerPreference: "high-performance"  // Use dedicated GPU if available
    });
    storeSharedRef(SHARED_STATE_KEYS.renderer, renderer);
    syncRendererDimensions(params.canvasSize, window.devicePixelRatio);

    // Enable high-quality shadows with soft edges
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;  // Variance shadows for softer look
    renderer.shadowMap.autoUpdate = true;

    // Enable physically correct lighting and rendering
    renderer.physicallyCorrectLights = true;  // Realistic light falloff
    renderer.toneMapping = THREE.ACESFilmicToneMapping;  // Cinematic tone mapping
    renderer.toneMappingExposure = 1.2;  // Slightly brighter for better visibility
    renderer.outputColorSpace = THREE.SRGBColorSpace;  // Correct color space for displays (Three.js r152+)

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    if (environmentTexture) {
        environmentTexture.dispose();
    }
    environmentTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environmentTexture;
    pmremGenerator.dispose();

    renderer.setClearColor(0x000000, 1);  // Default opaque black

    // Add lighting for 3D depth
    setupLighting();

    // Add orbit controls (use current active camera)
    controls = new OrbitControls(camera, renderer.domElement);
    storeSharedRef(SHARED_STATE_KEYS.controls, controls);
    controls.enableDamping = true;
    controls.dampingFactor = CONTROLS_DAMPING_FACTOR;
    controls.minDistance = CAMERA_MIN_DISTANCE;
    controls.maxDistance = CAMERA_MAX_DISTANCE;

    // Initialize camera animator
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
        getAdaptiveEmissiveIntensity
    });

    // Setup file input handler
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
        shouldProceedAfterMemoryCheck: () => checkMemoryUsage(true),
        showToast,
        loggers: {
            logFile,
            logValidation
        }
    });
    fileHandler.setup();

    // Setup Tweakpane UI
    setupTweakpane();
    cameraController.attachPane(pane);

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
        pane,
        getActiveCamera: () => getActiveCamera(),
        document,
        window,
        navigator,
        alert: (message) => alert(message)
    });

    logInit.info('Initialization complete - UI should be visible');

    // Handle window resize with debouncing
    setupDebouncedResize();

    // Setup keyboard shortcuts
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
        confirm: (message) => confirm(message)
    });

    // Expose debug API
    exposeDebugAPI();

    // Setup resource cleanup on page unload
    setupCleanup();

    // Setup WebGL context loss recovery
    setupContextLossRecovery();

    // Initialize RenderLoop
    renderLoop = new RenderLoop();
    renderLoop.setRenderCallback(() => {
        controls.update();
        const activeCamera = getActiveCamera();
        renderer.render(scene, activeCamera);
    });
    renderLoop.start();

    logInit.info('Vexy Stax initialized');
}

/**
 * Calculate relative luminance of a color (0-1 range)
 * Uses formula from WCAG 2.0
 * @param {string} hexColor - Hex color string (e.g. '#ffffff')
 * @returns {number} Luminance value between 0 (black) and 1 (white)
 */
function calculateLuminance(hexColor) {
    // Parse hex color to RGB
    const color = new THREE.Color(hexColor);
    const r = color.r;
    const g = color.g;
    const b = color.b;

    // Apply gamma correction
    const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // Calculate luminance
    return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Get adaptive ambient light intensity based on background luminance
 * Dark backgrounds need more light, bright backgrounds need less
 * @param {number} luminance - Background luminance (0-1)
 * @returns {number} Ambient light intensity
 */
function getAdaptiveAmbientIntensity(luminance) {
    // Reduced intensity range to prevent overexposure
    // Range: 0.5 (bright bg) to 0.8 (dark bg)
    const { min, max } = AMBIENT_INTENSITY_RANGE;

    // Inverse relationship: darker background = more light
    return max - (luminance * (max - min));
}

/**
 * Get adaptive emissive intensity for materials based on background luminance
 * Helps slides remain visible on dark backgrounds and prevents washout on bright ones
 * @param {number} luminance - Background luminance (0-1)
 * @returns {number} Emissive intensity (0-1)
 */
function getAdaptiveEmissiveIntensity(luminance) {
    // For dark backgrounds, add subtle emissive glow
    // For bright backgrounds, reduce emissive to near zero
    // Range: 0.05 (bright bg) to 0.25 (dark bg)
    const { min, max } = EMISSIVE_INTENSITY_RANGE;

    // Inverse relationship: darker background = more emissive
    return max - (luminance * (max - min));
}

function setupLighting() {
    // Calculate adaptive ambient light intensity based on background
    const bgLuminance = calculateLuminance(params.bgColor);
    const ambientIntensity = getAdaptiveAmbientIntensity(bgLuminance);

    // Ambient light with adaptive intensity
    ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
    scene.add(ambientLight);

    // Main directional light (sun-like) with high-quality shadows
    // Reduced intensity to prevent overexposure
    mainLight = new THREE.DirectionalLight(0xffffff, MAIN_LIGHT_SETTINGS.intensity);
    mainLight.position.set(
        MAIN_LIGHT_SETTINGS.position.x,
        MAIN_LIGHT_SETTINGS.position.y,
        MAIN_LIGHT_SETTINGS.position.z
    );
    mainLight.castShadow = true;

    // Configure high-quality shadow properties for photorealism
    mainLight.shadow.mapSize.width = MAIN_LIGHT_SETTINGS.shadow.mapSize;  // High-res shadows
    mainLight.shadow.mapSize.height = MAIN_LIGHT_SETTINGS.shadow.mapSize;
    mainLight.shadow.camera.near = MAIN_LIGHT_SETTINGS.shadow.camera.near;
    mainLight.shadow.camera.far = MAIN_LIGHT_SETTINGS.shadow.camera.far;
    mainLight.shadow.camera.left = MAIN_LIGHT_SETTINGS.shadow.camera.left;
    mainLight.shadow.camera.right = MAIN_LIGHT_SETTINGS.shadow.camera.right;
    mainLight.shadow.camera.top = MAIN_LIGHT_SETTINGS.shadow.camera.top;
    mainLight.shadow.camera.bottom = MAIN_LIGHT_SETTINGS.shadow.camera.bottom;
    mainLight.shadow.bias = MAIN_LIGHT_SETTINGS.shadow.bias;       // Adjusted to prevent flickering
    mainLight.shadow.normalBias = MAIN_LIGHT_SETTINGS.shadow.normalBias;    // Increased to prevent shadow acne and flickering
    mainLight.shadow.radius = MAIN_LIGHT_SETTINGS.shadow.radius;            // Softer shadow edges
    mainLight.shadow.blurSamples = MAIN_LIGHT_SETTINGS.shadow.blurSamples;      // VSM-specific softness control

    scene.add(mainLight);

    // Fill light from opposite side for softer shadows and ambient feel
    fillLight = new THREE.DirectionalLight(0xffffff, FILL_LIGHT_SETTINGS.intensity);
    fillLight.position.set(
        FILL_LIGHT_SETTINGS.position.x,
        FILL_LIGHT_SETTINGS.position.y,
        FILL_LIGHT_SETTINGS.position.z
    );
    scene.add(fillLight);

    // Add hemisphere light for realistic sky/ground ambient lighting
    const hemisphereLight = new THREE.HemisphereLight(
        HEMISPHERE_LIGHT_SETTINGS.skyColor,  // Sky color
        HEMISPHERE_LIGHT_SETTINGS.groundColor,  // Ground color
        HEMISPHERE_LIGHT_SETTINGS.intensity        // Reduced intensity
    );
    scene.add(hemisphereLight);

    logLighting.info(`Lighting setup complete (bg luminance: ${bgLuminance.toFixed(2)}, ambient: ${ambientIntensity.toFixed(2)})`);
}

/**
 * Update lighting based on current background color
 * Called when background color changes
 */
function updateLighting() {
    if (!ambientLight) return;

    const bgLuminance = calculateLuminance(params.bgColor);
    const newIntensity = getAdaptiveAmbientIntensity(bgLuminance);

    ambientLight.intensity = newIntensity;
    logLighting.info(`Lighting updated (bg luminance: ${bgLuminance.toFixed(2)}, ambient: ${newIntensity.toFixed(2)})`);
}

function getReflectionResolution() {
    const pixelRatio = window.devicePixelRatio || 1;
    const width = Math.max(
        REFLECTION_MIN_RESOLUTION,
        Math.round(window.innerWidth * pixelRatio * REFLECTION_TEXTURE_BASE)
    );
    const height = Math.max(
        REFLECTION_MIN_RESOLUTION,
        Math.round(window.innerHeight * pixelRatio * REFLECTION_TEXTURE_BASE)
    );
    return { width, height, pixelRatio };
}

function updateReflectionSettings() {
    if (!floorReflector) {
        return;
    }

    const { width, height, pixelRatio } = getReflectionResolution();
    const target = floorReflector.getRenderTarget();
    if (target.width !== width || target.height !== height) {
        target.setSize(width, height);
    }

    floorReflector.material.uniforms.blurRadius.value = REFLECTION_BLUR_RADIUS / pixelRatio;
    floorReflector.material.uniforms.floorSize.value = FLOOR_SIZE;
}

/**
 * Create realistic floor with reflections and shadows
 * Floor is positioned below the images
 */
/**
 * Floor color should MATCH background exactly for seamless ambience
 * Depth comes from shadows and reflections, not floor color contrast
 */
function getAdaptiveFloorColor(bgColor) {
    // Return the exact background color - floor blends seamlessly
    return new THREE.Color(bgColor);
}

function createFloor() {
    if (floorGroup) return; // Already exists

    const { width, height, pixelRatio } = getReflectionResolution();

    floorGroup = new THREE.Group();
    floorGroup.name = 'ambience-floor';

    const baseGeometry = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
    const floorColor = getAdaptiveFloorColor(params.bgColor);
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: floorColor,
        roughness: FLOOR_BASE_MATERIAL.roughness,
        metalness: FLOOR_BASE_MATERIAL.metalness,
        envMapIntensity: FLOOR_BASE_MATERIAL.envMapIntensity,
        side: THREE.DoubleSide
    });

    floorBase = new THREE.Mesh(baseGeometry, baseMaterial);
    floorBase.rotation.x = -Math.PI / 2;
    floorBase.position.y = FLOOR_Y;
    floorBase.receiveShadow = true;

    const reflectionGeometry = new THREE.PlaneGeometry(FLOOR_SIZE, FLOOR_SIZE);
    floorReflector = new Reflector(reflectionGeometry, {
        textureWidth: width,
        textureHeight: height,
        shader: SoftReflectorShader,
        multisample: Math.max(2, Math.round(pixelRatio * 2))
    });
    floorReflector.rotation.x = -Math.PI / 2;
    floorReflector.position.y = FLOOR_Y + FLOOR_REFLECTOR_OFFSET; // Prevent z-fighting with more separation
    floorReflector.material.transparent = true;
    floorReflector.material.depthWrite = false;
    floorReflector.material.uniforms.color.value.copy(floorColor);
    floorReflector.material.uniforms.opacity.value = REFLECTION_OPACITY;
    floorReflector.material.uniforms.blurRadius.value = REFLECTION_BLUR_RADIUS / pixelRatio;
    floorReflector.material.uniforms.fadeStrength.value = REFLECTION_FADE_STRENGTH;
    floorReflector.material.uniforms.floorSize.value = FLOOR_SIZE;

    floorGroup.add(floorBase);
    floorGroup.add(floorReflector);
    scene.add(floorGroup);
    updateReflectionSettings();

    logFloor.info(`Floor created at y=${FLOOR_Y} with ambience reflections (texture ${width}x${height})`);

    // Update all images to stand on floor and cast shadows
    updateImagesForAmbience(true);
}

/**
 * Remove floor from scene
 */
function removeFloor() {
    if (!floorGroup) return;

    scene.remove(floorGroup);
    if (floorReflector) {
        floorReflector.dispose();
        floorReflector = null;
    }
    if (floorBase) {
        floorBase.geometry.dispose();
        floorBase.material.dispose();
        floorBase = null;
    }
    floorGroup = null;

    logFloor.info('Floor removed');

    // Update images to remove shadow casting
    updateImagesForAmbience(false);
}

/**
 * Update all images in stack for ambience mode
 * - Change material to MeshStandardMaterial (responds to lighting)
 * - Enable shadow casting
 * - Position to stand on floor like domino pieces
 * @param {boolean} enabled - Whether ambience is enabled
 */
function updateImagesForAmbience(enabled) {
    imageStack.forEach((imageData, index) => {
        const texture = imageData.mesh.material.map;
        const width = imageData.width;
        const height = imageData.height;

        // Remove old mesh
        scene.remove(imageData.mesh);
        imageData.mesh.geometry.dispose();
        imageData.mesh.material.dispose();

        // Create new geometry
        let geometry;
        if (params.materialThickness > 1) {
            geometry = new THREE.BoxGeometry(width, height, params.materialThickness);
        } else {
            geometry = new THREE.PlaneGeometry(width, height);
        }

        // Create material based on ambience mode
        let material;
        if (enabled) {
            // Use MeshStandardMaterial WITHOUT emissive - preserve original colors
            // No emissive properties to avoid washing out colors
            material = new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                roughness: params.materialRoughness,
                metalness: params.materialMetalness
            });
            // Very low envMapIntensity to avoid over-brightening
            material.envMapIntensity = 0.0;
            material.needsUpdate = true;
        } else {
            // Use MeshBasicMaterial for flat, unlit appearance
            material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true
            });
        }

        // Create new mesh
        const mesh = new THREE.Mesh(geometry, material);

        if (enabled) {
            // Enable shadows (for depth, even without floor)
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Default positioning (centered, NO floor to stand on)
            mesh.rotation.y = 0;
            mesh.position.y = 0;
            mesh.position.z = index * params.zSpacing;
        } else {
            // Default positioning (centered, no rotation)
            mesh.position.z = index * params.zSpacing;
            mesh.position.y = 0;
        }

        // Update image data
        imageData.mesh = mesh;
        scene.add(mesh);
    });

    logImages.info(`Images updated for ambience mode: ${enabled ? 'enabled' : 'disabled'}`);
}

/**
 * Toggle ambience mode (floor + realistic lighting)
 * @param {boolean} enabled - Whether to enable ambience
 */
function toggleAmbience(enabled) {
    params.ambience = enabled;

    if (enabled) {
        // NO FLOOR - just update materials for ambient lighting
        updateImagesForAmbience(true);
        showToast('✨ Ambience enabled: Realistic lighting', 'success');
    } else {
        updateImagesForAmbience(false);
        showToast('Ambience disabled: Flat rendering', 'info');
    }
}

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
 * Expose debug API to window for console access and automation
 */
function exposeDebugAPI() {
    window.vexyStax = {
        // Export functions
        exportPNG: (scale = 1) => {
            logAPI.info(` Exporting PNG at ${scale}x`);
            exportPNG(scale);
        },

        // Image management
        clearAll: () => {
            logAPI.info(' Clearing all images');
            clearAll();
        },

        getImageStack: () => {
            const stack = imageStack.map((img, index) => ({
                index,
                filename: img.filename,
                width: img.texture.image.width,
                height: img.texture.image.height,
                position: { x: img.mesh.position.x, y: img.mesh.position.y, z: img.mesh.position.z }
            }));
            logAPI.info(' Image stack:', stack);
            return stack;
        },

        // Settings management
        loadSettings: () => {
            logAPI.info(' Loading settings');
            return loadSettings();
        },

        saveSettings: () => {
            logAPI.info(' Saving settings');
            saveSettings();
        },

        resetSettings: () => {
            logAPI.info(' Resetting settings to defaults');
            resetSettings();
        },

        // History management
        undo: () => {
            logAPI.info(' Undo');
            undo();
        },

        redo: () => {
            logAPI.info(' Redo');
            redo();
        },

        // Performance monitoring
        showFPS: (enabled) => {
            logAPI.info(` FPS display: ${enabled ? 'enabled' : 'disabled'}`);
            showFPSEnabled = Boolean(enabled);
            if (memoryMonitor) {
                memoryMonitor.invalidateOverlay();
            }
            if (renderLoop) {
                renderLoop.showFPS(showFPSEnabled);
            }
        },

        // Stats and info
        getStats: () => {
            const fpsStats = renderLoop ? renderLoop.getFPSStats() : { average: null };
            const fps = fpsStats.average;
                null;

            const stats = {
                imageCount: imageStack.length,
                totalPixels: imageStack.reduce((sum, img) => {
                    const tex = img.texture.image;
                    return sum + (tex.width * tex.height);
                }, 0),
                estimatedMemoryMB: imageStack.reduce((sum, img) => {
                    const tex = img.texture.image;
                    // Rough estimate: 4 bytes per pixel (RGBA)
                    return sum + (tex.width * tex.height * 4) / BYTES_PER_MB;
                }, 0).toFixed(2),
                cameraMode: params.cameraMode,
                currentSettings: {
                    cameraMode: params.cameraMode,
                    cameraFOV: params.cameraFOV,
                    cameraZoom: params.cameraZoom,
                    bgColor: params.bgColor,
                    transparentBg: params.transparentBg,
                    zSpacing: params.zSpacing
                },
                performance: {
                    fpsMonitorEnabled: showFPSEnabled,
                    currentFPS: fps,
                    historySize: `${historyIndex + 1}/${historyStack.length}`
                }
            };
            logAPI.info(' Stats:', stats);
            return stats;
        },

        // Animation
        playAnimation: async (config = {}) => {
            if (!cameraAnimator) {
                logAPI.error(' Camera animator not initialized');
                return;
            }

            if (imageStack.length === 0) {
                logAPI.error(' No images loaded');
                return;
            }

            const topSlide = imageStack[imageStack.length - 1];
            if (!topSlide) {
                logAPI.error(' No top slide found');
                return;
            }

            const duration = config.duration || params.animDuration;
            const easing = config.easing || params.animEasing;

            logAPI.info(` Playing hero shot animation (duration: ${duration}s, easing: ${easing})`);

            try {
                await cameraAnimator.playHeroShot({
                    topSlide,
                    canvasSize: params.canvasSize,
                    duration,
                    easing
                });
                logAPI.info(' Animation complete');
            } catch (error) {
                logAPI.error(' Animation failed:', error);
            }
        },

        cancelAnimation: () => {
            if (!cameraAnimator) {
                logAPI.error(' Camera animator not initialized');
                return;
            }

            logAPI.info(' Cancelling animation');
            cameraAnimator.cancel();
        },

        // JSON configuration
        loadConfig: (config) => {
            logAPI.info(' Loading configuration from object');

            // Return promise that resolves when all images are loaded
            return new Promise((resolve, reject) => {
                try {
                    // Validate config
                    if (!config.version || !config.params || !config.images) {
                        throw new Error('importJSON: invalid config format, missing version, params, or images');
                    }

                    // Clear existing
                    clearAll();

                    // Apply params
                    params.zSpacing = config.params.zSpacing;
                    params.bgColor = config.params.bgColor;
                    if (config.params.cameraMode) params.cameraMode = config.params.cameraMode;
                    if (config.params.cameraFOV) params.cameraFOV = config.params.cameraFOV;

                    // Update scene background
                    scene.background = new THREE.Color(params.bgColor);

                    // Update camera
                    if (config.camera && config.camera.position) {
                        camera.position.set(
                            config.camera.position.x,
                            config.camera.position.y,
                            config.camera.position.z
                        );
                        camera.lookAt(0, 0, 0);
                        controls.update();
                    }

                    // Load images and wait for all to complete
                    const textureLoader = new THREE.TextureLoader();
                    const loadPromises = config.images.map((imageConfig, index) => {
                        return new Promise((resolveImage, rejectImage) => {
                            textureLoader.load(
                                imageConfig.dataURL,
                                (texture) => {
                                    // Create geometry with saved dimensions
                                    const geometry = new THREE.PlaneGeometry(
                                        imageConfig.width,
                                        imageConfig.height
                                    );

                                    // Create material
                                    const material = new THREE.MeshBasicMaterial({
                                        map: texture,
                                        side: THREE.DoubleSide,
                                        transparent: true
                                    });

                                    // Create mesh
                                    const mesh = new THREE.Mesh(geometry, material);
                                    mesh.position.z = index * params.zSpacing;

                                    // Store and add to scene
                                    imageStack.push({
                                        mesh: mesh,
                                        texture: texture,
                                        filename: imageConfig.filename,
                                        width: imageConfig.width,
                                        height: imageConfig.height
                                    });

                                    scene.add(mesh);

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

                    // Wait for all images to load
                    Promise.all(loadPromises)
                        .then(() => {
                            // Refresh Tweakpane
                            pane.refresh();
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
  vexyStax.playAnimation(config) - Play hero shot animation (config: { duration, holdTime, easing })
  vexyStax.cancelAnimation() - Cancel current animation
  vexyStax.help()            - Show this help

Example usage:
  vexyStax.exportPNG(2)      // Export at 2x resolution
  vexyStax.showFPS(true)     // Enable FPS counter
  vexyStax.undo()            // Undo last action
  vexyStax.getStats()        // Check current state
  vexyStax.loadConfig(config) // Load config from JSON object
  vexyStax.playAnimation({ duration: 2, holdTime: 1.5 }) // Custom animation
  vexyStax.cancelAnimation() // Stop current animation
            `,
            'color: #00ff00; font-size: 16px; font-weight: bold',
            'color: #ccc'
            );
        }
    };

    // Log available API on init
    logDebugAPI.log('%c Type vexyStax.help() for available commands', 'color: #00ff00');
}

/**
 * Setup proper resource cleanup on page unload to prevent memory leaks
 */
function setupCleanup() {
    window.addEventListener('beforeunload', () => {
        logCleanup.info(' Disposing Three.js resources...');

        try {
            removeFloor();

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

            // Dispose renderer
            if (renderer) {
                renderer.dispose();
                renderer.forceContextLoss();
            }

            // Clear scene
            if (scene) {
                scene.environment = null;
                scene.clear();
            }

            if (environmentTexture) {
                environmentTexture.dispose();
                environmentTexture = null;
            }

            if (fileHandler) {
                fileHandler.teardown();
                fileHandler = null;
            }

            if (keyboardShortcuts) {
                keyboardShortcuts.teardown?.();
                keyboardShortcuts = null;
            }

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
 * Setup WebGL context loss/restore handlers for graceful GPU reset recovery
 */
function setupContextLossRecovery() {
    const canvas = renderer.domElement;

    const contextLostHandler = (event) => {
        event.preventDefault(); // Allows context restoration
        logWebGL.warn(' Context lost - GPU reset detected');

        // Show user-friendly message
        const message = document.createElement('div');
        message.id = 'webgl-context-lost-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 165, 0, 0.95);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: ' + Z_INDEX_MODAL + ';
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        message.textContent = '⚠️ Graphics context lost - recovering...';
        document.body.appendChild(message);
    };

    const contextRestoredHandler = () => {
        logWebGL.info(' Context restored - reinitializing renderer');

        // Remove message
        const message = document.getElementById('webgl-context-lost-message');
        if (message) {
            message.remove();
        }

        // Re-initialize renderer settings
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(params.bgColor, params.transparentBg ? 0 : 1);

        // Reload all textures in image stack
        imageStack.forEach((imageData, index) => {
            logWebGL.info(` Reloading texture ${index + 1}/${imageStack.length}: ${imageData.filename}`);
            // Texture will be reloaded automatically by Three.js on next render
            if (imageData.texture && imageData.texture.image) {
                imageData.texture.needsUpdate = true;
            }
        });

        logWebGL.info(' Context restoration complete');

        // Show success message briefly
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(40, 167, 69, 0.95);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: ' + Z_INDEX_MODAL + ';
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        successMessage.textContent = '✓ Graphics recovered successfully';
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    };

    addTrackedEventListener(canvas, 'webglcontextlost', contextLostHandler);
    addTrackedEventListener(canvas, 'webglcontextrestored', contextRestoredHandler);
    logWebGL.info(' Context loss/restore handlers registered');
}

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

/**
 * Save current image stack state to history
 * Called before any modification (add, delete, reorder)
 */
function saveHistory() {
    // Remove any redo states (history after current index)
    historyStack = historyStack.slice(0, historyIndex + 1);
    storeSharedRef(SHARED_STATE_KEYS.historyStack, historyStack);

    // Create deep copy of current state
    const state = {
        timestamp: Date.now(),
        images: imageStack.map(img => ({
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

    historyStack.push(state);
    historyIndex++;
    storeSharedRef(SHARED_STATE_KEYS.historyStack, historyStack);
    storeSharedRef(SHARED_STATE_KEYS.historyIndex, historyIndex);

    // Limit history size
    if (historyStack.length > MAX_HISTORY) {
        historyStack.shift();
        historyIndex--;
        storeSharedRef(SHARED_STATE_KEYS.historyStack, historyStack);
        storeSharedRef(SHARED_STATE_KEYS.historyIndex, historyIndex);
    }

    logHistory.info(` Saved state (${historyIndex + 1}/${historyStack.length})`);
}

/**
 * Undo the most recent change in the image stack history.
 * @returns {void}
 *
 * @example
 * undo();
 */
function undo() {
    if (historyIndex <= 0) {
        logHistory.info(' Nothing to undo');
        showToast('⚠️ Nothing to undo', 'warning');
        return;
    }

    historyIndex--;
    storeSharedRef(SHARED_STATE_KEYS.historyIndex, historyIndex);
    const state = historyStack[historyIndex];

    // Clear current stack
    imageStack.forEach(img => {
        scene.remove(img.mesh);
        img.mesh.geometry.dispose();
        img.mesh.material.dispose();
        // Dispose texture to prevent memory leak
        if (img.mesh.material.map) {
            img.mesh.material.map.dispose();
        }
    });
    imageStack.length = 0;
    storeSharedRef(SHARED_STATE_KEYS.imageStack, imageStack);

    // Restore previous state
    state.images.forEach(img => {
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
        img.mesh.position.copy(img.position);
    });

    updateImageList();
    logHistory.info(` Undo to state ${historyIndex + 1}/${historyStack.length}`);
    emitStackUpdated('undo');
    showToast('↶ Undo applied', 'success');
}

/**
 * Redo the next change in the history stack after an undo.
 * @returns {void}
 *
 * @example
 * redo();
 */
function redo() {
    if (historyIndex >= historyStack.length - 1) {
        logHistory.info(' Nothing to redo');
        showToast('⚠️ Nothing to redo', 'warning');
        return;
    }

    historyIndex++;
    storeSharedRef(SHARED_STATE_KEYS.historyIndex, historyIndex);
    const state = historyStack[historyIndex];

    // Clear current stack
    imageStack.forEach(img => {
        scene.remove(img.mesh);
        img.mesh.geometry.dispose();
        img.mesh.material.dispose();
        // Dispose texture to prevent memory leak
        if (img.mesh.material.map) {
            img.mesh.material.map.dispose();
        }
    });
    imageStack.length = 0;
    storeSharedRef(SHARED_STATE_KEYS.imageStack, imageStack);

    // Restore next state
    state.images.forEach(img => {
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
        img.mesh.position.copy(img.position);
    });

    updateImageList();
    logHistory.info(` Redo to state ${historyIndex + 1}/${historyStack.length}`);
    emitStackUpdated('redo');
    showToast('↷ Redo applied', 'success');
}

/**
 * Load persisted studio settings from `localStorage` into `params`.
 *
 * @returns {boolean} `true` when a snapshot was applied successfully.
 *
 * @example
 * if (!loadSettings()) {
 *   console.info('First run – using defaults');
 * }
 */
function loadSettings() {
    return settingsManager.loadSettings();
}

/**
 * Persist current camera/background/z-spacing preferences to `localStorage`.
 * Handles quota errors by offering to clear stale data before retrying.
 */
function saveSettings() {
    settingsManager.saveSettings();
}

/**
 * Restore default studio settings, refresh UI, and clear persisted storage.
 *
 * @returns {void}
 *
 * @example
 * // Restore factory defaults
 * resetSettings();
 */
function resetSettings() {
    settingsManager.resetSettings();
}


function setupTweakpane() {
    tweakpaneSetup = new TweakpaneSetup({
        params,
        materialPresets: MATERIAL_PRESETS,
        viewpointPresets: VIEWPOINT_PRESETS,
        callbacks: {
            updateCanvasSize,
            updateBackground,
            toggleAmbience,
            centerViewOnContent,
            setViewpoint,
            setViewpointFitToFrame,
            switchCameraMode,
            updateZoom,
            setCameraFOV: (value) => {
                if (cameraController) {
                    cameraController.setFOV(value);
                } else {
                    camera.fov = value;
                    camera.updateProjectionMatrix();
                }
            },
            applyMaterialPreset,
            updateZSpacing,
            exportPNG,
            exportJSON,
            importJSON,
            copyJSON,
            pasteJSON,
            resetSettings,
            clearAll,
            undo,
            redo,
            showToast,
            saveSettings
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

    // Resize the actual renderer/canvas to match studio size
    const dimensions = syncRendererDimensions(size, window.devicePixelRatio);

    // Update camera aspect ratio
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

    // Update reflection resolution if ambience is enabled
    if (params.ambience) {
        updateReflectionSettings();
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

function updateBackground() {
    if (params.transparentBg) {
        scene.background = null;
        renderer.setClearColor(0x000000, 0); // Transparent
    } else {
        scene.background = new THREE.Color(params.bgColor);
        renderer.setClearColor(params.bgColor, 1);
    }

    // Update lighting to adapt to new background color
    updateLighting();

    // Update floor color adaptively based on background luminance
    if (params.ambience) {
        const floorColor = getAdaptiveFloorColor(params.bgColor);
        if (floorBase) {
            floorBase.material.color.copy(floorColor);
            floorBase.material.needsUpdate = true;
        }
        if (floorReflector) {
            floorReflector.material.uniforms.color.value.copy(floorColor);
        }
        logFloor.info(`Floor color updated to ${params.bgColor}`);
    }

    // Update all existing slides' emissive intensity to react to background
    if (params.ambience) {
        const bgLuminance = calculateLuminance(params.bgColor);
        const emissiveIntensity = getAdaptiveEmissiveIntensity(bgLuminance);

        imageStack.forEach(imageData => {
            if (imageData.mesh.material.emissiveIntensity !== undefined) {
                imageData.mesh.material.emissiveIntensity = emissiveIntensity;
                imageData.mesh.material.needsUpdate = true;
            }
        });
        logImages.info(`Slides emissive updated (luminance: ${bgLuminance.toFixed(2)}, emissive: ${emissiveIntensity.toFixed(2)})`);
    }

    emitBackgroundChanged('update');
}

/**
 * Update the Z-offset applied between consecutive slides in the stack.
 *
 * @param {number} newSpacing - Distance in Three.js world units between slides.
 *
 * @example
 * // Increase separation for a thicker stack appearance
 * updateZSpacing(80);
 */
function updateZSpacing(newSpacing) {
    // Update all existing images
    imageStack.forEach((imageData, index) => {
        imageData.mesh.position.z = index * newSpacing;
    });
    logImages.info(`Z-spacing updated to ${newSpacing}px`);
}

function setViewpoint(x, y, z) {
    if (cameraController) {
        cameraController.setViewpoint(x, y, z);
        return;
    }

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
    controls.update();
    logCamera.info(`Viewpoint set to (${x}, ${y}, ${z})`);
    emitCameraUpdated('viewpoint');
}

/**
 * Set viewpoint to fit frontmost slide within studio frame
 */
function setViewpointFitToFrame() {
    if (cameraController) {
        cameraController.setViewpointFitToFrame();
        return;
    }

    if (imageStack.length === 0) {
        // Default front view if no images
        setViewpoint(0, 0, 800);
        return;
    }

    // Get frontmost slide (last in stack)
    const frontSlide = imageStack[imageStack.length - 1];
    if (!frontSlide) {
        logCamera.error('No front slide found despite non-empty imageStack');
        setViewpoint(0, 0, 800);
        return;
    }

    // Calculate camera distance to fit studio canvas (not slide) in frame
    // The viewport should show the entire studio canvas size at the frontmost slide position
    const fov = params.cameraFOV * (Math.PI / 180); // Convert to radians
    const canvasHeight = params.canvasSize.y;
    const canvasWidth = params.canvasSize.x;

    // Calculate distance needed to fit canvas height in frame
    const distanceForHeight = (canvasHeight / 2) / Math.tan(fov / 2);

    // Calculate distance needed to fit canvas width in frame
    const aspect = camera.aspect; // Actual viewport aspect ratio
    const visibleHeightAtDistance = 2 * Math.tan(fov / 2) * distanceForHeight;
    const visibleWidthAtDistance = visibleHeightAtDistance * aspect;

    // Adjust if canvas width exceeds visible width
    const distanceForWidth = canvasWidth > visibleWidthAtDistance ?
        (canvasWidth / 2) / (Math.tan(fov / 2) * aspect) :
        distanceForHeight;

    // Use the larger distance to ensure both dimensions fit
    const distance = Math.max(distanceForHeight, distanceForWidth) * 1.05; // 5% padding

    // Position camera at front of slide stack
    const frontSlideZ = frontSlide.mesh.position.z;
    camera.position.set(0, 0, frontSlideZ + distance);
    camera.lookAt(0, 0, frontSlideZ);
    controls.target.set(0, 0, frontSlideZ);
    controls.update();

    logCamera.info(`Front view: fitted studio canvas ${canvasWidth}×${canvasHeight}px at distance ${distance.toFixed(1)} from slide`);
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

function applyMaterialPreset(preset) {
    sceneComposition?.applyMaterialPreset(preset);
}

function loadImage(file) {
    const reader = new FileReader();

    reader.onload = function(event) {
        const dataURL = event.target.result;

        // Load texture with retry logic
        loadTextureWithRetry(dataURL, file.name, 0);
    };

    /**
     * Load texture with exponential backoff retry
     * @param {string} dataURL - Data URL of the image
     * @param {string} filename - Original filename for error messages
     * @param {number} attempt - Current attempt number (0-based)
     */
    function loadTextureWithRetry(dataURL, filename, attempt) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            dataURL,
            function(texture) {
                // Success callback
                // Validate image dimensions
                const img = texture.image;

                if (img.width > MAX_DIMENSION_PX || img.height > MAX_DIMENSION_PX) {
                    logValidation.warn(`Warning: Image ${filename} has large dimensions (${img.width}x${img.height}). Max recommended: ${MAX_DIMENSION_PX}px.`);
                    showToast(`⚠️ Large dimensions: ${filename} (${img.width}x${img.height}px). May render slowly`, 'warning', TOAST_DURATION_WARNING);
                }

                if (attempt > 0) {
                    logRetry.info(`Successfully loaded ${filename} on attempt ${attempt + 1}`);
                }

                sceneComposition?.addImage(texture, filename);
            },
            undefined,
            function(error) {
                // Error callback - retry or fail
                if (attempt < MAX_LOAD_RETRIES) {
                    const delay = RETRY_DELAYS_MS[attempt];
                    logRetry.warn(`Failed to load ${filename} (attempt ${attempt + 1}/${MAX_LOAD_RETRIES + 1}). Retrying in ${delay}ms...`, error);

                    setTimeout(() => {
                        loadTextureWithRetry(dataURL, filename, attempt + 1);
                    }, delay);
                } else {
                    // All retries exhausted
                    logRetry.error(`Failed to load ${filename} after ${MAX_LOAD_RETRIES + 1} attempts:`, error);
                    showToast(`❌ Failed to load: ${filename}. Check file is valid`, 'error', TOAST_DURATION_ERROR);
                }
            }
        );
    }

    reader.onerror = function(error) {
        logFile.error(`Failed to read file ${file.name}:`, error);
        showToast(`❌ Failed to read file: ${file.name}`, 'error', TOAST_DURATION_ERROR);
    };

    reader.readAsDataURL(file);
}

function updateImageList() {
    const listContainer = document.getElementById('image-list');
    const emptyMessage = document.getElementById('slides-empty-message');
    const slidesPanel = document.getElementById('slides-panel');

    if (!listContainer) {
        return;
    }

    listContainer.setAttribute('role', 'list');
    listContainer.innerHTML = '';

    const hasImages = imageStack.length > 0;
    slidesPanel?.classList.toggle('is-empty', !hasImages);
    if (emptyMessage) {
        emptyMessage.classList.toggle('hidden', hasImages);
    }

    imageStack.forEach((imageData, index) => {
        const item = document.createElement('div');
        item.className = 'slide-thumb';
        item.draggable = true;
        item.dataset.index = index;
        item.dataset.id = imageData.id;
        item.tabIndex = 0;
        item.setAttribute('role', 'listitem');
        item.setAttribute(
            'aria-label',
            `Slide ${index + 1}: ${imageData.filename}, ${imageData.originalWidth} by ${imageData.originalHeight} pixels`
        );
        item.title = `${imageData.filename} — ${imageData.originalWidth}×${imageData.originalHeight}px`;

        const image = document.createElement('img');
        image.src =
            imageData.thumbnailSrc ||
            imageData.texture?.image?.currentSrc ||
            imageData.texture?.image?.src ||
            '';
        image.alt = '';
        image.draggable = false;
        item.appendChild(image);

        const indexBadge = document.createElement('span');
        indexBadge.className = 'slide-thumb-index';
        indexBadge.textContent = index + 1;
        item.appendChild(indexBadge);

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'slide-thumb-delete';
        deleteButton.setAttribute('aria-label', `Delete ${imageData.filename}`);
        deleteButton.textContent = '✕';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteImage(index);
        });
        item.appendChild(deleteButton);

        item.addEventListener('click', () => {
            item.focus();
        });

        // Drag events for reordering
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);

        // Keyboard navigation events
        item.addEventListener('keydown', handleImageListKeydown);
        item.addEventListener('focus', () => {
            item.classList.add('focused');
        });
        item.addEventListener('blur', () => {
            item.classList.remove('focused');
        });

        listContainer.appendChild(item);
    });
}

/**
 * Handle keyboard navigation within image list
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleImageListKeydown(e) {
    const item = e.currentTarget;
    const index = parseInt(item.dataset.index);
    const listContainer = document.getElementById('image-list');
    const items = Array.from(listContainer.children);

    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            // Focus previous item
            if (index > 0) {
                items[index - 1].focus();
            }
            break;

        case 'ArrowDown':
            e.preventDefault();
            // Focus next item
            if (index < items.length - 1) {
                items[index + 1].focus();
            }
            break;

        case 'Delete':
        case 'Backspace':
            e.preventDefault();
            // Delete with confirmation
            const imageData = imageStack[index];
            if (confirm(`Delete "${imageData.filename}"?`)) {
                deleteImage(index);
                // Focus next or previous item if available
                setTimeout(() => {
                    const newItems = Array.from(listContainer.children);
                    if (newItems.length > 0) {
                        const focusIndex = Math.min(index, newItems.length - 1);
                        newItems[focusIndex]?.focus();
                    }
                }, 100);
            }
            break;

        case 'Enter':
            e.preventDefault();
            // Highlight/zoom to image in 3D view
            const mesh = imageStack[index].mesh;
            if (mesh) {
                // Briefly highlight by changing material emissive
                const originalEmissive = mesh.material.emissive.getHex();
                mesh.material.emissive.setHex(0x44ff44);

                // Restore after 500ms
                setTimeout(() => {
                    mesh.material.emissive.setHex(originalEmissive);
                }, 500);

                logKeyboard.info(`Highlighted image ${index + 1}: ${imageData.filename}`);
                showToast(`✨ Image ${index + 1}: ${imageData.filename}`, 'info', 2000);
            }
            break;
    }
}

let draggedElement = null;
let draggedIndex = null;

function handleDragStart(e) {
    const item = e.currentTarget;
    draggedElement = item;
    draggedIndex = parseInt(item.dataset.index, 10);
    item.classList.add('dragging');

    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(draggedIndex));
    }
}

function handleDragOver(e) {
    e.preventDefault();
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
    }
    return false;
}

function handleDrop(e) {
    e.preventDefault();

    const dropIndex = parseInt(e.currentTarget.dataset.index, 10);

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
        sceneComposition?.reorder(draggedIndex, dropIndex);
    }

    return false;
}

function handleDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    draggedElement = null;
    draggedIndex = null;
}

// Global function for delete button
window.deleteImage = function(index) {
    sceneComposition?.deleteAt(index);
};

function onWindowResize() {
    const aspect = params.canvasSize.x / params.canvasSize.y;

    // Update perspective camera
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    // Update orthographic camera
    const frustumSize = ORTHO_FRUSTUM_SIZE;
    orthoCamera.left = frustumSize * aspect / -2;
    orthoCamera.right = frustumSize * aspect / 2;
    orthoCamera.top = frustumSize / 2;
    orthoCamera.bottom = frustumSize / -2;
    orthoCamera.updateProjectionMatrix();

    syncRendererDimensions(params.canvasSize, window.devicePixelRatio);
    updateReflectionSettings();
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
