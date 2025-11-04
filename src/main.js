// src/main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { Pane } from 'tweakpane';
import * as EssentialsPlugin from '@kitschpatrol/tweakpane-plugin-essentials';
import * as ColorPlusPlugin from 'tweakpane-plugin-color-plus';
import { CameraAnimator } from './camera/animation.js';

// Scene, Camera, Renderer
let scene, camera, orthoCamera, renderer, controls;
let canvas;
let cameraMode = 'perspective'; // 'perspective', 'orthographic', 'isometric'
let cameraAnimator; // Camera animation system

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
const MAX_HISTORY = 10;

// FPS monitoring
let fpsCounter = null;
let fpsDisplay = null;
let showFPSEnabled = false;
let frameCount = 0;
let lastFrameTime = performance.now();
let fpsValues = [];
const FPS_WARNING_THRESHOLD = 30;

// Memory usage tracking
const MEMORY_WARNING_THRESHOLD_MB = 500;
const MEMORY_CRITICAL_THRESHOLD_MB = 1000;
let lastMemoryWarning = 0;
const MEMORY_WARNING_COOLDOWN = 30000; // 30 seconds between warnings

// Ambience constants
const FLOOR_Y = -250;
const FLOOR_SIZE = 2000;
const REFLECTION_TEXTURE_BASE = 0.65; // Fraction of screen resolution
const REFLECTION_MIN_RESOLUTION = 512;
const REFLECTION_OPACITY = 0.32;
const REFLECTION_BLUR_RADIUS = 0.003;
const REFLECTION_FADE_STRENGTH = 2.7;

// Image loading constants
const FILE_SIZE_WARN_MB = 10; // 10MB warning threshold
const FILE_SIZE_REJECT_MB = 50; // 50MB rejection threshold
const MAX_DIMENSION_PX = 4096; // Maximum recommended image dimension
const MAX_LOAD_RETRIES = 3; // Number of retry attempts for failed texture loads
const RETRY_DELAYS_MS = [500, 1500, 3000]; // Exponential backoff delays in ms

const SoftReflectorShader = {
    name: 'SoftReflectorShader',
    uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        tDiffuse: { value: null },
        textureMatrix: { value: null },
        opacity: { value: REFLECTION_OPACITY },
        blurRadius: { value: REFLECTION_BLUR_RADIUS },
        fadeStrength: { value: REFLECTION_FADE_STRENGTH },
        floorSize: { value: FLOOR_SIZE }
    },
    vertexShader: /* glsl */`
        uniform mat4 textureMatrix;
        varying vec4 vUv;
        varying vec3 vWorldPosition;

        #include <common>
        #include <logdepthbuf_pars_vertex>

        void main() {
            vUv = textureMatrix * vec4( position, 1.0 );
            vWorldPosition = ( modelMatrix * vec4( position, 1.0 ) ).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            #include <logdepthbuf_vertex>
        }
    `,
    fragmentShader: /* glsl */`
        uniform vec3 color;
        uniform sampler2D tDiffuse;
        uniform float opacity;
        uniform float blurRadius;
        uniform float fadeStrength;
        uniform float floorSize;

        varying vec4 vUv;
        varying vec3 vWorldPosition;

        #include <logdepthbuf_pars_fragment>

        vec4 sampleReflection( vec2 offset ) {
            vec4 offsetUv = vUv;
            offsetUv.xy += offset * vUv.w;
            return texture2DProj( tDiffuse, offsetUv );
        }

        void main() {
            #include <logdepthbuf_fragment>

            vec4 reflection = sampleReflection( vec2( 0.0 ) );
            reflection += sampleReflection( vec2(  blurRadius, 0.0 ) );
            reflection += sampleReflection( vec2( -blurRadius, 0.0 ) );
            reflection += sampleReflection( vec2( 0.0,  blurRadius ) );
            reflection += sampleReflection( vec2( 0.0, -blurRadius ) );
            reflection += sampleReflection( vec2(  blurRadius,  blurRadius ) );
            reflection += sampleReflection( vec2( -blurRadius,  blurRadius ) );
            reflection += sampleReflection( vec2(  blurRadius, -blurRadius ) );
            reflection += sampleReflection( vec2( -blurRadius, -blurRadius ) );
            reflection /= 9.0;

            float radialDistance = length( vWorldPosition.xz ) / max( floorSize * 0.5, 0.0001 );
            float falloff = clamp( exp( -radialDistance * fadeStrength ), 0.0, 1.0 );

            vec3 tinted = mix( color, reflection.rgb, 0.6 * falloff );
            gl_FragColor = vec4( tinted, opacity * falloff );

            #include <tonemapping_fragment>
            #include <colorspace_fragment>
        }
    `
};

// Parameters
const params = {
    // Studio settings
    canvasSize: { x: 1920, y: 1080 },  // Canvas size (render area)
    bgColor: '#000000',
    transparentBg: false,
    ambience: false,  // Realistic floor with reflections and shadows
    cameraMode: 'perspective',
    cameraFOV: 75,
    cameraZoom: 1.0,  // Unified zoom parameter (1.0 = default)
    // Slides settings
    zSpacing: 100,
    materialPreset: 'metallic-card',  // Current material preset
    materialRoughness: 0.2,
    materialMetalness: 0.8,
    materialThickness: 2.0,  // Depth multiplier (1.0 = thin plane)
    materialBorderWidth: 0,  // Border width in pixels
    materialBorderColor: '#ffffff',
    // Viewpoint preset
    viewpointPreset: 'front',  // Current viewpoint preset
    // Animation properties
    animDuration: 1.5,  // Tween duration in seconds
    animEasing: 'power2.inOut'  // GSAP easing function
};

// Material presets
const MATERIAL_PRESETS = {
    'flat-matte': { roughness: 1.0, metalness: 0, thickness: 1, borderWidth: 0 },
    'glossy-photo': { roughness: 0.1, metalness: 0, thickness: 1, borderWidth: 0 },
    'plastic-card': { roughness: 0.4, metalness: 0.1, thickness: 2, borderWidth: 0 },
    'thick-board': { roughness: 0.9, metalness: 0, thickness: 8, borderWidth: 0 },
    'metal-sheet': { roughness: 0.2, metalness: 0.8, thickness: 1, borderWidth: 0 },
    'metallic-card': { roughness: 0.2, metalness: 0.8, thickness: 2, borderWidth: 0 },  // New default
    'glass-slide': { roughness: 0.05, metalness: 0, thickness: 1, borderWidth: 0 },
    'matte-print': { roughness: 0.7, metalness: 0, thickness: 1, borderWidth: 0 },
    'bordered': { roughness: 0.2, metalness: 0, thickness: 1, borderWidth: 20 },
    '3d-box': { roughness: 0.6, metalness: 0, thickness: 15, borderWidth: 0 }
};

// Viewpoint presets
const VIEWPOINT_PRESETS = {
    'center': null,  // Special case - calls centerViewOnContent
    'front': 'fitToFrame',  // Special case - calculates distance to fit frontmost slide
    'beauty': { x: 600, y: 400, z: 700 },  // Angled dramatic view
    'top': { x: 0, y: 800, z: 100 },
    'isometric': { x: 500, y: 500, z: 500 },
    '3d-stack': { x: 400, y: 300, z: 600 },
    'side': { x: 800, y: 0, z: 0 }
};

// UI
let pane;

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
            z-index: 10000;
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
        console.error('Capability check failed:', errors);
        return false;
    }

    console.log('✓ All required browser capabilities detected');
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
    scene.background = new THREE.Color(params.bgColor);

    // Create perspective camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(params.cameraFOV, aspect, 0.1, 5000);
    camera.position.set(0, 0, 800);  // Default distance
    camera.lookAt(0, 0, 0);
    camera.zoom = params.cameraZoom;

    // Create orthographic camera (for isometric/ortho modes)
    const frustumSize = 600;  // Base frustum size
    orthoCamera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        0.1,
        5000
    );
    orthoCamera.position.set(0, 0, 800);
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

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
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 100;
    controls.maxDistance = 3000;

    // Initialize camera animator
    cameraAnimator = new CameraAnimator(camera, controls);

    // Setup file input handler
    setupFileInput();

    // Setup Tweakpane UI
    setupTweakpane();

    console.log('Initialization complete - UI should be visible');

    // Handle window resize with debouncing
    setupDebouncedResize();

    // Setup keyboard shortcuts
    setupKeyboardShortcuts();

    // Expose debug API
    exposeDebugAPI();

    // Setup resource cleanup on page unload
    setupCleanup();

    // Setup WebGL context loss recovery
    setupContextLossRecovery();

    // Setup FPS monitor
    setupFPSMonitor();

    // Start render loop
    animate();

    console.log('Vexy Stax initialized');
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
    const minIntensity = 0.5;
    const maxIntensity = 0.8;

    // Inverse relationship: darker background = more light
    return maxIntensity - (luminance * (maxIntensity - minIntensity));
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
    const minEmissive = 0.05;
    const maxEmissive = 0.25;

    // Inverse relationship: darker background = more emissive
    return maxEmissive - (luminance * (maxEmissive - minEmissive));
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
    mainLight = new THREE.DirectionalLight(0xffffff, Math.PI * 0.4);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;

    // Configure high-quality shadow properties for photorealism
    mainLight.shadow.mapSize.width = 4096;  // High-res shadows
    mainLight.shadow.mapSize.height = 4096;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 500;
    mainLight.shadow.camera.left = -500;
    mainLight.shadow.camera.right = 500;
    mainLight.shadow.camera.top = 500;
    mainLight.shadow.camera.bottom = -500;
    mainLight.shadow.bias = -0.0001;       // Adjusted to prevent flickering
    mainLight.shadow.normalBias = 0.05;    // Increased to prevent shadow acne and flickering
    mainLight.shadow.radius = 6;            // Softer shadow edges
    mainLight.shadow.blurSamples = 16;      // VSM-specific softness control

    scene.add(mainLight);

    // Fill light from opposite side for softer shadows and ambient feel
    fillLight = new THREE.DirectionalLight(0xffffff, Math.PI * 0.15);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Add hemisphere light for realistic sky/ground ambient lighting
    const hemisphereLight = new THREE.HemisphereLight(
        0xffffff,  // Sky color
        0x444444,  // Ground color
        0.3        // Reduced intensity
    );
    scene.add(hemisphereLight);

    console.log(`Lighting setup complete (bg luminance: ${bgLuminance.toFixed(2)}, ambient: ${ambientIntensity.toFixed(2)})`);
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
    console.log(`Lighting updated (bg luminance: ${bgLuminance.toFixed(2)}, ambient: ${newIntensity.toFixed(2)})`);
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
        roughness: 0.45,
        metalness: 0.08,
        envMapIntensity: 0.35,
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
    floorReflector.position.y = FLOOR_Y + 0.1; // Prevent z-fighting with more separation
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

    console.log(`Floor created at y=${FLOOR_Y} with ambience reflections (texture ${width}x${height})`);

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

    console.log('Floor removed');

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
            // Calculate adaptive emissive for background contrast
            const bgLuminance = calculateLuminance(params.bgColor);
            const emissiveIntensity = getAdaptiveEmissiveIntensity(bgLuminance);

            // Use MeshStandardMaterial for realistic lighting
            material = new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                roughness: params.materialRoughness,
                metalness: params.materialMetalness,
                emissive: new THREE.Color(0xffffff),
                emissiveMap: texture,
                emissiveIntensity: emissiveIntensity
            });
            material.envMapIntensity = 0.55;
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
            // Enable shadows
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Position to stand on floor (rotate to be vertical like domino)
            mesh.rotation.y = 0; // Face forward
            mesh.position.y = FLOOR_Y + (height / 2); // Bottom edge touches floor
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

    console.log(`Images updated for ambience mode: ${enabled ? 'enabled' : 'disabled'}`);
}

/**
 * Toggle ambience mode (floor + realistic lighting)
 * @param {boolean} enabled - Whether to enable ambience
 */
function toggleAmbience(enabled) {
    params.ambience = enabled;

    if (enabled) {
        createFloor();
        showToast('✨ Ambience enabled: Realistic floor & shadows', 'success');
    } else {
        removeFloor();
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
}

function setupKeyboardShortcuts() {
    let helpOverlay = null;

    // Create help overlay element (initially hidden)
    function createHelpOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'keyboard-help';
        overlay.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 400px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 10000;
            display: none;
        `;

        overlay.innerHTML = `
            <h2 style="margin-top: 0;">Keyboard Shortcuts</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + E</kbd></td><td>Export PNG</td></tr>
                <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + Z</kbd></td><td>Undo</td></tr>
                <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + Shift + Z</kbd></td><td>Redo</td></tr>
                <tr><td style="padding: 8px;"><kbd>Ctrl/Cmd + Delete</kbd></td><td>Clear all images</td></tr>
                <tr><td style="padding: 8px;"><kbd>?</kbd></td><td>Show this help</td></tr>
                <tr><td style="padding: 8px;"><kbd>Esc</kbd></td><td>Close help</td></tr>
            </table>
            <p style="margin-bottom: 0; margin-top: 20px; text-align: center; font-size: 0.9em; opacity: 0.7;">Press Esc or ? to close</p>
        `;

        document.body.appendChild(overlay);
        return overlay;
    }

    // Toggle help overlay
    function toggleHelp() {
        if (!helpOverlay) {
            helpOverlay = createHelpOverlay();
        }

        if (helpOverlay.style.display === 'none') {
            helpOverlay.style.display = 'block';
            console.log('Keyboard shortcuts help shown');
        } else {
            helpOverlay.style.display = 'none';
            console.log('Keyboard shortcuts help hidden');
        }
    }

    // Keyboard event handler
    const keydownHandler = (e) => {
        // Show help with ? key
        if (e.key === '?' || e.key === '/') {
            e.preventDefault();
            toggleHelp();
            return;
        }

        // Close help or cancel animation with Esc
        if (e.key === 'Escape') {
            // Cancel animation first if one is playing
            if (cameraAnimator && cameraAnimator.isAnimating) {
                cameraAnimator.cancel();
                showToast('Animation cancelled', 'info');
                console.log('Animation cancelled via ESC');
                return;
            }

            // Otherwise close help overlay
            if (helpOverlay && helpOverlay.style.display === 'block') {
                helpOverlay.style.display = 'none';
                console.log('Help closed');
            }
            return;
        }

        // Ctrl/Cmd + E: Export PNG
        if ((e.ctrlKey || e.metaKey) && e.key === 'e' && !e.shiftKey) {
            e.preventDefault();
            console.log('Keyboard shortcut: Export PNG (Ctrl/Cmd+E)');
            exportPNG(1);
            return;
        }

        // Ctrl/Cmd + Z: Undo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            console.log('Keyboard shortcut: Undo (Ctrl/Cmd+Z)');
            undo();
            return;
        }

        // Ctrl/Cmd + Shift + Z: Redo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
            e.preventDefault();
            console.log('Keyboard shortcut: Redo (Ctrl/Cmd+Shift+Z)');
            redo();
            return;
        }

        // Ctrl/Cmd + Delete: Clear all
        if ((e.ctrlKey || e.metaKey) && (e.key === 'Delete' || e.key === 'Backspace')) {
            e.preventDefault();
            if (imageStack.length > 0) {
                if (confirm('Clear all images? This cannot be undone.')) {
                    console.log('Keyboard shortcut: Clear all (Ctrl/Cmd+Delete)');
                    clearAll();
                }
            }
            return;
        }
    };

    addTrackedEventListener(window, 'keydown', keydownHandler);
    console.log('Keyboard shortcuts enabled (Ctrl/Cmd+E, Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z, Ctrl/Cmd+Delete, ?)');
}

/**
 * Expose debug API to window for console access and automation
 */
function exposeDebugAPI() {
    window.vexyStax = {
        // Export functions
        exportPNG: (scale = 1) => {
            console.log(`[API] Exporting PNG at ${scale}x`);
            exportPNG(scale);
        },

        // Image management
        clearAll: () => {
            console.log('[API] Clearing all images');
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
            console.log('[API] Image stack:', stack);
            return stack;
        },

        // Settings management
        loadSettings: () => {
            console.log('[API] Loading settings');
            return loadSettings();
        },

        saveSettings: () => {
            console.log('[API] Saving settings');
            saveSettings();
        },

        resetSettings: () => {
            console.log('[API] Resetting settings to defaults');
            resetSettings();
        },

        // History management
        undo: () => {
            console.log('[API] Undo');
            undo();
        },

        redo: () => {
            console.log('[API] Redo');
            redo();
        },

        // Performance monitoring
        showFPS: (enabled) => {
            console.log(`[API] FPS display: ${enabled ? 'enabled' : 'disabled'}`);
            toggleFPS(enabled);
        },

        // Stats and info
        getStats: () => {
            const fps = fpsValues.length > 0 ?
                Math.round(fpsValues.reduce((a, b) => a + b, 0) / fpsValues.length) :
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
                    return sum + (tex.width * tex.height * 4) / (1024 * 1024);
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
            console.log('[API] Stats:', stats);
            return stats;
        },

        // Animation
        playAnimation: async (config = {}) => {
            if (!cameraAnimator) {
                console.error('[API] Camera animator not initialized');
                return;
            }

            if (imageStack.length === 0) {
                console.error('[API] No images loaded');
                return;
            }

            const topSlide = imageStack[imageStack.length - 1];
            if (!topSlide) {
                console.error('[API] No top slide found');
                return;
            }

            const duration = config.duration || params.animDuration;
            const easing = config.easing || params.animEasing;

            console.log(`[API] Playing hero shot animation (duration: ${duration}s, easing: ${easing})`);

            try {
                await cameraAnimator.playHeroShot({
                    topSlide,
                    canvasSize: params.canvasSize,
                    duration,
                    easing
                });
                console.log('[API] Animation complete');
            } catch (error) {
                console.error('[API] Animation failed:', error);
            }
        },

        cancelAnimation: () => {
            if (!cameraAnimator) {
                console.error('[API] Camera animator not initialized');
                return;
            }

            console.log('[API] Cancelling animation');
            cameraAnimator.cancel();
        },

        // JSON configuration
        loadConfig: (config) => {
            console.log('[API] Loading configuration from object');

            // Return promise that resolves when all images are loaded
            return new Promise((resolve, reject) => {
                try {
                    // Validate config
                    if (!config.version || !config.params || !config.images) {
                        throw new Error('Invalid config format');
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

                                    console.log(`[API] Loaded ${imageConfig.filename} from config`);
                                    resolveImage();
                                },
                                undefined,
                                (error) => {
                                    console.error(`[API] Failed to load ${imageConfig.filename}:`, error);
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
                            console.log('[API] Configuration loaded successfully');
                            resolve();
                        })
                        .catch((error) => {
                            console.error('[API] Failed to load one or more images:', error);
                            reject(error);
                        });

                } catch (error) {
                    console.error('[API] Failed to load configuration:', error);
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
    console.log('%c[Debug API] Type vexyStax.help() for available commands', 'color: #00ff00');
}

/**
 * Setup proper resource cleanup on page unload to prevent memory leaks
 */
function setupCleanup() {
    window.addEventListener('beforeunload', () => {
        console.log('[Cleanup] Disposing Three.js resources...');

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
            imageStack = [];

            // Dispose controls
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

            // Remove all tracked event listeners
            eventListeners.forEach(({ target, event, handler, options }) => {
                target.removeEventListener(event, handler, options);
            });
            eventListeners = [];
            console.log('[Cleanup] Removed all event listeners');

            console.log('[Cleanup] All resources disposed successfully');
        } catch (error) {
            console.error('[Cleanup] Error during cleanup:', error);
        }
    });

    console.log('[Cleanup] Resource cleanup handler registered');
}

/**
 * Setup debounced window resize to prevent excessive recalculations
 */
function setupDebouncedResize() {
    let resizeTimeout = null;
    const DEBOUNCE_DELAY = 150; // ms - balance between responsiveness and performance

    const debouncedResize = () => {
        // Clear any pending resize
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }

        // Schedule new resize
        resizeTimeout = setTimeout(() => {
            onWindowResize();
            console.log('[Resize] Debounced resize executed');
            resizeTimeout = null;
        }, DEBOUNCE_DELAY);
    };

    addTrackedEventListener(window, 'resize', debouncedResize);
    console.log(`[Resize] Debounced resize handler registered (${DEBOUNCE_DELAY}ms delay)`);
}

/**
 * Setup WebGL context loss/restore handlers for graceful GPU reset recovery
 */
function setupContextLossRecovery() {
    const canvas = renderer.domElement;

    const contextLostHandler = (event) => {
        event.preventDefault(); // Allows context restoration
        console.warn('[WebGL] Context lost - GPU reset detected');

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
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        message.textContent = '⚠️ Graphics context lost - recovering...';
        document.body.appendChild(message);
    };

    const contextRestoredHandler = () => {
        console.log('[WebGL] Context restored - reinitializing renderer');

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
            console.log(`[WebGL] Reloading texture ${index + 1}/${imageStack.length}: ${imageData.filename}`);
            // Texture will be reloaded automatically by Three.js on next render
            if (imageData.texture && imageData.texture.image) {
                imageData.texture.needsUpdate = true;
            }
        });

        console.log('[WebGL] Context restoration complete');

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
            z-index: 10000;
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
    console.log('[WebGL] Context loss/restore handlers registered');
}

/**
 * Setup FPS counter and performance monitoring
 * Creates FPS display element and tracks rendering performance
 */
function setupFPSMonitor() {
    // Create FPS display element (hidden by default)
    fpsDisplay = document.createElement('div');
    fpsDisplay.id = 'fps-display';
    fpsDisplay.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: #00ff00;
        padding: 8px 12px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        z-index: 9999;
        display: none;
        min-width: 120px;
    `;
    document.body.appendChild(fpsDisplay);

    console.log('[FPS] Performance monitor initialized (use vexyStax.showFPS(true) to enable)');
}

/**
 * Update FPS counter (called each frame)
 */
function updateFPS() {
    if (!showFPSEnabled) return;

    const now = performance.now();
    frameCount++;

    // Update FPS display every second
    if (now >= lastFrameTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastFrameTime));
        fpsValues.push(fps);

        // Keep only last 5 seconds of data
        if (fpsValues.length > 5) {
            fpsValues.shift();
        }

        // Calculate average FPS
        const avgFPS = Math.round(fpsValues.reduce((a, b) => a + b, 0) / fpsValues.length);

        // Update display
        let color = '#00ff00'; // Green
        if (avgFPS < FPS_WARNING_THRESHOLD) {
            color = '#ff0000'; // Red for low FPS
        } else if (avgFPS < 50) {
            color = '#ffaa00'; // Orange for moderate FPS
        }

        fpsDisplay.style.color = color;
        fpsDisplay.innerHTML = `FPS: ${fps}<br>Avg: ${avgFPS}`;

        // Log warning if consistently low
        if (avgFPS < FPS_WARNING_THRESHOLD && fpsValues.length >= 3) {
            console.warn(`[FPS] Performance warning: Average FPS ${avgFPS} below threshold ${FPS_WARNING_THRESHOLD}`);
        }

        frameCount = 0;
        lastFrameTime = now;
    }
}

/**
 * Toggle FPS display
 * @param {boolean} enabled - Whether to show FPS counter
 */
function toggleFPS(enabled) {
    showFPSEnabled = enabled;
    fpsDisplay.style.display = enabled ? 'block' : 'none';

    if (enabled) {
        console.log('[FPS] Counter enabled');
        frameCount = 0;
        lastFrameTime = performance.now();
        fpsValues = [];
    } else {
        console.log('[FPS] Counter disabled');
    }
}

/**
 * Calculate estimated memory usage from image stack
 * @returns {number} Estimated memory in MB
 */
function calculateMemoryUsage() {
    let totalBytes = 0;
    imageStack.forEach(img => {
        if (img.texture && img.texture.image) {
            const width = img.texture.image.width;
            const height = img.texture.image.height;
            // Rough estimate: 4 bytes per pixel (RGBA)
            totalBytes += width * height * 4;
        }
    });
    return totalBytes / (1024 * 1024); // Convert to MB
}

/**
 * Check memory usage and warn if thresholds exceeded
 * @param {boolean} isAdding - Whether this check is before adding a new image
 * @returns {boolean} True if operation should proceed, false if critical threshold reached
 */
function checkMemoryUsage(isAdding = false) {
    const memoryMB = calculateMemoryUsage();
    const now = Date.now();

    // Log memory stats
    console.log(`[Memory] Current usage: ${memoryMB.toFixed(2)} MB (${imageStack.length} images)`);

    // Critical threshold - block operation with confirmation
    if (memoryMB >= MEMORY_CRITICAL_THRESHOLD_MB) {
        const message = `Critical memory usage: ${memoryMB.toFixed(0)} MB!\n\n` +
                       `Loading more images may cause browser slowdown or crash.\n\n` +
                       `Continue anyway?`;

        console.warn(`[Memory] CRITICAL: ${memoryMB.toFixed(2)} MB >= ${MEMORY_CRITICAL_THRESHOLD_MB} MB`);

        if (isAdding) {
            return confirm(message);
        } else {
            showToast(`⚠️ Critical memory: ${memoryMB.toFixed(0)} MB`, 'error', 5000);
            return true;
        }
    }

    // Warning threshold - show toast (with cooldown to avoid spam)
    if (memoryMB >= MEMORY_WARNING_THRESHOLD_MB && now - lastMemoryWarning > MEMORY_WARNING_COOLDOWN) {
        console.warn(`[Memory] Warning: ${memoryMB.toFixed(2)} MB >= ${MEMORY_WARNING_THRESHOLD_MB} MB`);
        showToast(`⚠️ High memory usage: ${memoryMB.toFixed(0)} MB. Consider reducing image count.`, 'warning', 4000);
        lastMemoryWarning = now;
    }

    // Update FPS display if showing
    if (showFPSEnabled && fpsDisplay) {
        const currentHTML = fpsDisplay.innerHTML;
        const memoryLine = `<br><small style="opacity: 0.7">${memoryMB.toFixed(0)}MB</small>`;
        if (!currentHTML.includes('MB')) {
            fpsDisplay.innerHTML += memoryLine;
        }
    }

    return true;
}

/**
 * Save current image stack state to history
 * Called before any modification (add, delete, reorder)
 */
function saveHistory() {
    // Remove any redo states (history after current index)
    historyStack = historyStack.slice(0, historyIndex + 1);

    // Create deep copy of current state
    const state = {
        timestamp: Date.now(),
        images: imageStack.map(img => ({
            filename: img.filename,
            width: img.width,
            height: img.height,
            position: { ...img.mesh.position },
            texture: img.texture,
            mesh: img.mesh
        }))
    };

    historyStack.push(state);
    historyIndex++;

    // Limit history size
    if (historyStack.length > MAX_HISTORY) {
        historyStack.shift();
        historyIndex--;
    }

    console.log(`[History] Saved state (${historyIndex + 1}/${historyStack.length})`);
}

/**
 * Undo last image stack change
 * Restores previous state from history
 */
function undo() {
    if (historyIndex <= 0) {
        console.log('[History] Nothing to undo');
        showToast('⚠️ Nothing to undo', 'warning');
        return;
    }

    historyIndex--;
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
    imageStack = [];

    // Restore previous state
    state.images.forEach(img => {
        imageStack.push({
            filename: img.filename,
            width: img.width,
            height: img.height,
            texture: img.texture,
            mesh: img.mesh
        });
        scene.add(img.mesh);
        img.mesh.position.copy(img.position);
    });

    updateImageList();
    console.log(`[History] Undo to state ${historyIndex + 1}/${historyStack.length}`);
    showToast('↶ Undo applied', 'success');
}

/**
 * Redo previously undone change
 * Restores next state from history
 */
function redo() {
    if (historyIndex >= historyStack.length - 1) {
        console.log('[History] Nothing to redo');
        showToast('⚠️ Nothing to redo', 'warning');
        return;
    }

    historyIndex++;
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
    imageStack = [];

    // Restore next state
    state.images.forEach(img => {
        imageStack.push({
            filename: img.filename,
            width: img.width,
            height: img.height,
            texture: img.texture,
            mesh: img.mesh
        });
        scene.add(img.mesh);
        img.mesh.position.copy(img.position);
    });

    updateImageList();
    console.log(`[History] Redo to state ${historyIndex + 1}/${historyStack.length}`);
    showToast('↷ Redo applied', 'success');
}

/**
 * Show temporary toast notification
 * @param {string} message - Message to display
 * @param {string} type - 'success', 'error', 'warning', or 'info'
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
    `;

    // Set color based on type
    const colors = {
        success: { bg: 'rgba(40, 167, 69, 0.95)', text: 'white' },
        error: { bg: 'rgba(220, 53, 69, 0.95)', text: 'white' },
        warning: { bg: 'rgba(255, 193, 7, 0.95)', text: 'black' },
        info: { bg: 'rgba(23, 162, 184, 0.95)', text: 'white' }
    };

    const color = colors[type] || colors.info;
    toast.style.background = color.bg;
    toast.style.color = color.text;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Auto-dismiss
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Load settings from localStorage
 * @returns {boolean} true if settings were loaded, false otherwise
 */
function loadSettings() {
    try {
        if (!window.localStorage) {
            console.warn('localStorage not available');
            return false;
        }

        const saved = localStorage.getItem('vexy-stax-settings');
        if (!saved) {
            console.log('No saved settings found');
            return false;
        }

        const settings = JSON.parse(saved);

        // Apply saved settings to params
        if (settings.cameraMode !== undefined) params.cameraMode = settings.cameraMode;
        if (settings.cameraFOV !== undefined) params.cameraFOV = settings.cameraFOV;
        if (settings.cameraZoom !== undefined) params.cameraZoom = settings.cameraZoom;
        if (settings.bgColor !== undefined) params.bgColor = settings.bgColor;
        if (settings.transparentBg !== undefined) params.transparentBg = settings.transparentBg;
        if (settings.zSpacing !== undefined) params.zSpacing = settings.zSpacing;

        console.log('Settings loaded from localStorage:', settings);
        return true;
    } catch (error) {
        console.error('Failed to load settings:', error);
        return false;
    }
}

/**
 * Save settings to localStorage with error recovery
 */
function saveSettings() {
    try {
        if (!window.localStorage) {
            console.warn('localStorage not available');
            return;
        }

        const settings = {
            cameraMode: params.cameraMode,
            cameraFOV: params.cameraFOV,
            cameraZoom: params.cameraZoom,
            bgColor: params.bgColor,
            transparentBg: params.transparentBg,
            zSpacing: params.zSpacing
        };

        localStorage.setItem('vexy-stax-settings', JSON.stringify(settings));
        console.log('Settings saved to localStorage');
    } catch (error) {
        // Check for quota exceeded error
        if (error.name === 'QuotaExceededError' || error.code === 22) {
            console.error('localStorage quota exceeded');

            // Show user-friendly error with option to clear storage
            const clearStorage = confirm(
                'Storage quota full!\n\n' +
                'Cannot save settings because browser storage is full.\n\n' +
                'Click OK to clear Vexy Stax storage and try again, or Cancel to continue without saving.'
            );

            if (clearStorage) {
                try {
                    // Clear all vexy-stax related storage
                    localStorage.removeItem('vexy-stax-settings');
                    console.log('Cleared storage, retrying save...');

                    // Retry save after clearing
                    localStorage.setItem('vexy-stax-settings', JSON.stringify(settings));
                    console.log('Settings saved successfully after clearing storage');
                    alert('Storage cleared and settings saved!');
                } catch (retryError) {
                    console.error('Failed to save even after clearing:', retryError);
                    alert('Still unable to save settings. Try closing other tabs or clearing browser data.');
                }
            } else {
                console.warn('User declined to clear storage - settings not saved');
            }
        } else {
            // Other localStorage errors
            console.error('Failed to save settings:', error.name, error.message);
        }
    }
}

/**
 * Reset settings to defaults
 */
function resetSettings() {
    params.cameraMode = 'perspective';
    params.cameraFOV = 75;
    params.cameraZoom = 1.0;
    params.bgColor = '#000000';
    params.transparentBg = false;
    params.zSpacing = 100;

    // Update UI
    if (pane) {
        pane.refresh();
    }

    // Update scene
    switchCameraMode(params.cameraMode);
    updateZoom(params.cameraZoom);
    updateBackground();
    updateZSpacing(params.zSpacing);

    // Clear localStorage
    try {
        if (window.localStorage) {
            localStorage.removeItem('vexy-stax-settings');
            console.log('Settings reset to defaults and cleared from localStorage');
        }
    } catch (error) {
        console.error('Failed to clear settings:', error);
    }
}

function setupTweakpane() {
    const controlsContainer = document.getElementById('controls');
    if (!controlsContainer) {
        console.error('Controls container not found!');
        return;
    }

    pane = new Pane({
        title: 'Vexy-Stax Controls',
        container: controlsContainer,
        expanded: true
    });

    // Register plugins
    pane.registerPlugin(EssentialsPlugin);
    pane.registerPlugin(ColorPlusPlugin);

    console.log('Tweakpane created successfully');

    // ===== STUDIO SECTION =====
    const studioFolder = pane.addFolder({
        title: 'Studio',
        expanded: true
    });

    // Canvas size (Point control)
    studioFolder.addBinding(params, 'canvasSize', {
        label: 'Size',
        x: { min: 640, max: 3840, step: 1 },
        y: { min: 480, max: 2160, step: 1 }
    }).on('change', (ev) => {
        updateCanvasSize(ev.value);
        saveSettings();
    });

    // Background color (using color-plus plugin)
    studioFolder.addBinding(params, 'bgColor', {
        label: 'Color',
        view: 'color',
        picker: 'inline',
        expanded: false
    }).on('change', (ev) => {
        updateBackground();
        saveSettings();
    });

    // Transparent background toggle
    studioFolder.addBinding(params, 'transparentBg', {
        label: 'Transparent'
    }).on('change', (ev) => {
        updateBackground();
        saveSettings();
    });

    // Ambience toggle (realistic floor with shadows)
    studioFolder.addBinding(params, 'ambience', {
        label: 'Ambience'
    }).on('change', (ev) => {
        toggleAmbience(ev.value);
        saveSettings();
    });

    // ===== CAMERA SECTION =====
    const cameraFolder = pane.addFolder({
        title: 'Camera',
        expanded: true
    });

    // Viewpoint selector dropdown
    cameraFolder.addBinding(params, 'viewpointPreset', {
        label: 'Viewpoint',
        options: {
            'Beauty': 'beauty',
            'Center': 'center',
            'Front': 'front',
            'Top': 'top',
            'Isometric': 'isometric',
            '3D Stack': '3d-stack',
            'Side': 'side'
        }
    }).on('change', (ev) => {
        const preset = VIEWPOINT_PRESETS[ev.value];
        if (preset === null) {
            // Center is special case
            centerViewOnContent();
        } else if (preset === 'fitToFrame') {
            // Front view - fit frontmost slide to studio frame
            setViewpointFitToFrame();
        } else {
            setViewpoint(preset.x, preset.y, preset.z);
        }
        saveSettings();
    });

    // Camera mode selector
    cameraFolder.addBinding(params, 'cameraMode', {
        label: 'Mode',
        options: {
            'Perspective': 'perspective',
            'Orthographic': 'orthographic',
            'Isometric': 'isometric',
            'Telephoto': 'telephoto'
        }
    }).on('change', (ev) => {
        switchCameraMode(ev.value);
        saveSettings();
    });

    // Zoom slider (works for all camera modes)
    cameraFolder.addBinding(params, 'cameraZoom', {
        label: 'Zoom',
        min: 0.1,
        max: 3.0,
        step: 0.1
    }).on('change', (ev) => {
        updateZoom(ev.value);
        saveSettings();
    });

    // FOV slider (for perspective mode)
    cameraFolder.addBinding(params, 'cameraFOV', {
        label: 'FOV',
        min: 15,
        max: 120,
        step: 5
    }).on('change', (ev) => {
        if (cameraMode === 'perspective' || cameraMode === 'telephoto') {
            camera.fov = ev.value;
            camera.updateProjectionMatrix();
        }
        saveSettings();
    });

    // ===== SLIDES SECTION =====
    const slidesFolder = pane.addFolder({
        title: 'Slides',
        expanded: true
    });

    // Material selector dropdown
    slidesFolder.addBinding(params, 'materialPreset', {
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
            'Bordered': 'bordered',
            '3D Box': '3d-box'
        }
    }).on('change', (ev) => {
        applyMaterialPreset(MATERIAL_PRESETS[ev.value]);
        saveSettings();
    });

    // Distance slider (renamed from Z-Spacing)
    slidesFolder.addBinding(params, 'zSpacing', {
        label: 'Distance',
        min: 0,
        max: 500,
        step: 10
    }).on('change', (ev) => {
        updateZSpacing(ev.value);
        saveSettings();
    });

    // ===== TABBED INTERFACE =====
    const tabs = pane.addTab({
        pages: [
            { title: 'File' },
            { title: 'Image' },
            { title: 'Video' }
        ]
    });

    // ===== FILE TAB =====
    const fileTab = tabs.pages[0];

    // JSON button grid (2x2 grid)
    fileTab.addBlade({
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
            // Open
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => importJSON(e.target.files[0]);
            input.click();
        } else if (y === 0 && x === 1) {
            // Paste
            pasteJSON();
        } else if (y === 1 && x === 0) {
            // Save
            exportJSON();
        } else if (y === 1 && x === 1) {
            // Copy
            copyJSON();
        }
    });

    // Tools button grid (2x1 grid)
    fileTab.addBlade({
        view: 'buttongrid',
        size: [2, 1],
        cells: (x, y) => ({
            title: [['Defaults', 'Clear']][y][x]
        }),
        label: 'Tools'
    }).on('click', (ev) => {
        if (ev.index[0] === 0) {
            // Defaults
            if (confirm('Reset all settings to defaults? This will clear saved preferences.')) {
                resetSettings();
            }
        } else {
            // Clear
            clearAll();
        }
    });

    // ===== IMAGE TAB =====
    const imageTab = tabs.pages[1];

    // PNG button grid (1x3 grid)
    imageTab.addBlade({
        view: 'buttongrid',
        size: [3, 1],
        cells: (x, y) => ({
            title: [['1x', '2x', '4x']][y][x]
        }),
        label: 'PNG'
    }).on('click', (ev) => {
        const scale = ev.index[0] === 0 ? 1 : ev.index[0] === 1 ? 2 : 4;
        exportPNG(scale);
    });

    // ===== VIDEO TAB =====
    const videoTab = tabs.pages[2];

    videoTab.addButton({ title: 'Play Hero Shot' }).on('click', async () => {
        if (imageStack.length === 0) {
            showToast('No images loaded', 'error');
            return;
        }

        const topSlide = imageStack[imageStack.length - 1];
        if (!topSlide) {
            showToast('No top slide found', 'error');
            return;
        }

        showToast('Animating to Front view...', 'info');

        try {
            await cameraAnimator.playHeroShot({
                topSlide: topSlide,
                canvasSize: params.canvasSize,
                duration: params.animDuration,
                easing: params.animEasing
            });
            showToast('Animation complete', 'success');
        } catch (error) {
            console.error('Animation error:', error);
            showToast('Animation failed', 'error');
        }
    });

    videoTab.addBinding(params, 'animDuration', {
        label: 'Duration',
        min: 0.5,
        max: 5.0,
        step: 0.1
    }).on('change', saveSettings);

    videoTab.addBinding(params, 'animEasing', {
        label: 'Easing',
        options: {
            'Power In/Out': 'power2.inOut',
            'Power In': 'power2.in',
            'Power Out': 'power2.out',
            'Elastic Out': 'elastic.out',
            'Back In/Out': 'back.inOut',
            'Circ In/Out': 'circ.inOut'
        }
    }).on('change', saveSettings);
}

function exportPNG(scale = 1) {
    // Check if images are loaded
    if (imageStack.length === 0) {
        console.warn('[Export] No images loaded - cannot export empty scene');
        showToast('⚠️ Load images first', 'warning');
        return;
    }

    // Validate scale parameter (1-4 range for reasonable export sizes)
    if (typeof scale !== 'number' || scale < 1 || scale > 4) {
        console.warn(`Invalid scale parameter: ${scale}. Using 1x instead.`);
        scale = 1;
    }

    console.log(`Exporting PNG at ${scale}x resolution...`);

    // Show loading overlay for high-res exports
    let loadingOverlay = null;
    if (scale >= 2) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            z-index: 10000;
        `;

        loadingOverlay.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 24px; margin-bottom: 10px;">Exporting...</div>
                <div style="font-size: 16px; opacity: 0.7;">Rendering at ${scale}x resolution</div>
                <div style="margin-top: 20px; font-size: 14px; opacity: 0.5;">Please wait...</div>
            </div>
        `;

        document.body.appendChild(loadingOverlay);
    }

    // Use setTimeout to allow UI update before heavy operation
    setTimeout(() => {
        try {
            // Store original renderer state
            const originalWidth = window.innerWidth;
            const originalHeight = window.innerHeight;
            const originalPixelRatio = renderer.getPixelRatio();

            if (scale > 1) {
                // Use setPixelRatio to increase resolution without changing view
                // This renders at higher resolution while maintaining the same view
                renderer.setPixelRatio(originalPixelRatio * scale);
            }

            // Render one frame at higher pixel ratio
            const activeCamera = getActiveCamera();
            renderer.render(scene, activeCamera);

            // Get data URL (PNG supports transparency)
            const dataURL = renderer.domElement.toDataURL('image/png');

            // Verify data URL was created successfully
            if (!dataURL || !dataURL.startsWith('data:image/png')) {
                throw new Error('Failed to generate PNG data');
            }

            // Estimate file size (rough approximation)
            const base64Length = dataURL.length - 'data:image/png;base64,'.length;
            const fileSizeBytes = (base64Length * 3) / 4;
            const fileSizeMB = (fileSizeBytes / (1024 * 1024)).toFixed(2);

            // Create download link
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const filename = `vexy-stax-${scale}x-${timestamp}.png`;
            link.download = filename;
            link.href = dataURL;
            document.body.appendChild(link);

            // Trigger download
            let downloadSuccess = false;
            try {
                link.click();
                downloadSuccess = true;
            } catch (error) {
                console.error('[Export] Download failed:', error);
                throw new Error('Failed to trigger download');
            } finally {
                document.body.removeChild(link);
            }

            // Restore original pixel ratio
            if (scale > 1) {
                renderer.setPixelRatio(originalPixelRatio);
                // Re-render at normal resolution
                renderer.render(scene, activeCamera);
            }

            // Log success and show confirmation
            const dimensions = `${renderer.domElement.width}x${renderer.domElement.height}px`;
            console.log(`[Export] PNG exported successfully: ${filename} (${dimensions}, ~${fileSizeMB} MB)`);

            if (downloadSuccess) {
                showToast(`✓ Exported: ${filename} (${fileSizeMB} MB)`, 'success', 3000);
            }
        } catch (error) {
            console.error('[Export] Export failed:', error);
            showToast(`❌ Export failed: ${error.message}`, 'error', 5000);
        } finally {
            // Remove loading overlay
            if (loadingOverlay) {
                document.body.removeChild(loadingOverlay);
            }
        }
    }, 100); // 100ms delay to allow overlay to render
}

function getActiveCamera() {
    return (cameraMode === 'orthographic' || cameraMode === 'isometric') ? orthoCamera : camera;
}

function updateZoom(zoomValue) {
    params.cameraZoom = zoomValue;

    // Apply zoom to both cameras
    camera.zoom = zoomValue;
    camera.updateProjectionMatrix();

    orthoCamera.zoom = zoomValue;
    orthoCamera.updateProjectionMatrix();

    console.log(`Zoom updated to ${zoomValue.toFixed(1)}x`);
}

function updateCanvasSize(size) {
    params.canvasSize = size;

    // Resize the actual renderer/canvas to match studio size
    renderer.setSize(size.x, size.y);

    // Update camera aspect ratio
    if (cameraMode === 'perspective' || cameraMode === 'telephoto') {
        camera.aspect = size.x / size.y;
        camera.updateProjectionMatrix();
    } else if (cameraMode === 'orthographic' || cameraMode === 'isometric') {
        const aspect = size.x / size.y;
        orthoCamera.left = -400 * aspect;
        orthoCamera.right = 400 * aspect;
        orthoCamera.top = 400;
        orthoCamera.bottom = -400;
        orthoCamera.updateProjectionMatrix();
    }

    // Update reflection resolution if ambience is enabled
    if (params.ambience) {
        updateReflectionSettings();
    }

    console.log(`Canvas resized to ${size.x}x${size.y}`);
}

// Studio frame visualization removed - canvas size now controls renderer dimensions directly

function centerViewOnContent() {
    if (imageStack.length === 0) {
        console.log('No content to center on');
        return;
    }

    // Calculate bounding box of all meshes
    const box = new THREE.Box3();
    imageStack.forEach(imageData => {
        box.expandByObject(imageData.mesh);
    });

    // Get center of bounding box
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Update controls target
    controls.target.copy(center);

    // Keep current camera position relative to new target
    const currentCam = getActiveCamera();
    const offset = new THREE.Vector3().subVectors(currentCam.position, new THREE.Vector3(0, 0, 0));
    currentCam.position.copy(center).add(offset);
    currentCam.lookAt(center);

    controls.update();
    console.log(`Centered view on content at (${center.x.toFixed(1)}, ${center.y.toFixed(1)}, ${center.z.toFixed(1)})`);
}

function switchCameraMode(mode) {
    cameraMode = mode;
    console.log(`Switching to ${mode} camera mode`);

    if (mode === 'orthographic') {
        // Front orthographic view
        orthoCamera.position.set(0, 0, 800);
        orthoCamera.lookAt(0, 0, 0);
        orthoCamera.zoom = params.cameraZoom;
        orthoCamera.updateProjectionMatrix();
        controls.object = orthoCamera;
    } else if (mode === 'isometric') {
        // Isometric view (45° angle)
        orthoCamera.position.set(500, 500, 500);
        orthoCamera.lookAt(0, 0, 0);
        orthoCamera.zoom = params.cameraZoom;
        orthoCamera.updateProjectionMatrix();
        controls.object = orthoCamera;
    } else if (mode === 'telephoto') {
        // Telephoto: far camera + narrow FOV
        params.cameraFOV = 30;
        camera.fov = 30;
        camera.position.set(0, 0, 1500);
        camera.lookAt(0, 0, 0);
        camera.zoom = params.cameraZoom;
        camera.updateProjectionMatrix();
        controls.object = camera;
        pane.refresh();
    } else {
        // Default perspective
        camera.position.set(0, 0, 800);
        camera.lookAt(0, 0, 0);
        camera.zoom = params.cameraZoom;
        camera.updateProjectionMatrix();
        controls.object = camera;
    }

    controls.update();
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
        console.log(`Floor color updated to ${params.bgColor}`);
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
        console.log(`Slides emissive updated (luminance: ${bgLuminance.toFixed(2)}, emissive: ${emissiveIntensity.toFixed(2)})`);
    }
}

function updateZSpacing(newSpacing) {
    // Update all existing images
    imageStack.forEach((imageData, index) => {
        imageData.mesh.position.z = index * newSpacing;
    });
    console.log(`Z-spacing updated to ${newSpacing}px`);
}

function setViewpoint(x, y, z) {
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
    controls.update();
    console.log(`Viewpoint set to (${x}, ${y}, ${z})`);
}

/**
 * Set viewpoint to fit frontmost slide within studio frame
 */
function setViewpointFitToFrame() {
    if (imageStack.length === 0) {
        // Default front view if no images
        setViewpoint(0, 0, 800);
        return;
    }

    // Get frontmost slide (last in stack)
    const frontSlide = imageStack[imageStack.length - 1];
    if (!frontSlide) {
        console.error('No front slide found despite non-empty imageStack');
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

    console.log(`Front view: fitted studio canvas ${canvasWidth}×${canvasHeight}px at distance ${distance.toFixed(1)} from slide`);
}

function clearAll() {
    // Save history before clearing
    saveHistory();

    // Remove all meshes from scene
    imageStack.forEach(imageData => {
        scene.remove(imageData.mesh);
        // Dispose geometry and material
        imageData.mesh.geometry.dispose();
        imageData.mesh.material.dispose();
        if (imageData.mesh.material.map) {
            imageData.mesh.material.map.dispose();
        }
    });

    // Clear array
    imageStack = [];

    // Update UI
    updateImageList();

    console.log('All images cleared');
    showToast('🗑️ All images cleared', 'info');
}

function setupFileInput() {
    const fileInput = document.getElementById('image-input');
    const dropZone = document.getElementById('image-list-container');

    // Drag and drop event handlers
    const dragoverHandler = (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    };

    const dragleaveHandler = () => {
        dropZone.classList.remove('drag-over');
    };

    const dropHandler = (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileDrop(files);
        }
    };

    // Register tracked event listeners
    addTrackedEventListener(fileInput, 'change', handleFileSelect);
    addTrackedEventListener(dropZone, 'dragover', dragoverHandler);
    addTrackedEventListener(dropZone, 'dragleave', dragleaveHandler);
    addTrackedEventListener(dropZone, 'drop', dropHandler);
}

function handleFileDrop(files) {
    console.log(`Dropped ${files.length} file(s)...`);

    let validCount = 0;
    let invalidCount = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type with enhanced validation
        if (!validateImageFile(file)) {
            invalidCount++;
            continue;
        }

        validCount++;
        loadImage(file);
    }

    // Summary log
    if (invalidCount > 0) {
        console.warn(`[Validation] ${invalidCount} file(s) rejected, ${validCount} accepted from drop`);
    }
}

/**
 * Validate file type for image loading
 * @param {File} file - File to validate
 * @returns {boolean} True if valid image file
 */
function validateImageFile(file) {
    // Supported MIME types
    const supportedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'image/webp',
        'image/svg+xml'
    ];

    // Check MIME type
    if (!supportedTypes.includes(file.type)) {
        // Extract extension for error message
        const extension = file.name.split('.').pop().toLowerCase();
        console.error(`[Validation] Unsupported file type: ${file.name} (${file.type || 'unknown type'})`);
        showToast(`❌ Unsupported file type: .${extension} (only images supported)`, 'error', 4000);
        return false;
    }

    return true;
}

function handleFileSelect(event) {
    const files = event.target.files;
    if (!files || files.length === 0) {
        console.warn('No files selected');
        return;
    }

    console.log(`Loading ${files.length} file(s)...`);

    let validCount = 0;
    let invalidCount = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!validateImageFile(file)) {
            invalidCount++;
            continue;
        }

        validCount++;
        loadImage(file);
    }

    // Summary log
    if (invalidCount > 0) {
        console.warn(`[Validation] ${invalidCount} file(s) rejected, ${validCount} accepted`);
    }
}

function applyMaterialPreset(preset) {
    // Update material parameters
    params.materialRoughness = preset.roughness;
    params.materialMetalness = preset.metalness;
    params.materialThickness = preset.thickness;
    params.materialBorderWidth = preset.borderWidth;

    console.log(`Applying material preset: roughness=${preset.roughness}, metalness=${preset.metalness}, thickness=${preset.thickness}, border=${preset.borderWidth}`);

    // Apply to all existing images
    imageStack.forEach((imageData, index) => {
        const texture = imageData.mesh.material.map;
        const width = imageData.width;
        const height = imageData.height;

        // Remove old mesh
        scene.remove(imageData.mesh);
        imageData.mesh.geometry.dispose();
        imageData.mesh.material.dispose();

        // Create new geometry based on thickness
        let geometry;
        if (params.materialThickness > 1) {
            geometry = new THREE.BoxGeometry(width, height, params.materialThickness);
        } else {
            geometry = new THREE.PlaneGeometry(width, height);
        }

        // Calculate adaptive emissive for background contrast
        const bgLuminance = calculateLuminance(params.bgColor);
        const emissiveIntensity = getAdaptiveEmissiveIntensity(bgLuminance);

        // Create new material with updated properties
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            roughness: params.materialRoughness,
            metalness: params.materialMetalness,
            emissive: new THREE.Color(0xffffff),
            emissiveMap: texture,
            emissiveIntensity: emissiveIntensity
        });
        material.envMapIntensity = 0.55;
        material.needsUpdate = true;

        // Create new mesh
        const mesh = new THREE.Mesh(geometry, material);
        if (params.ambience) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.position.y = FLOOR_Y + (height / 2);
        } else {
            mesh.position.y = 0;
        }
        mesh.position.z = index * params.zSpacing;

        // Add border if enabled
        if (params.materialBorderWidth > 0) {
            const borderWidth = width + params.materialBorderWidth * 2;
            const borderHeight = height + params.materialBorderWidth * 2;
            const borderGeometry = new THREE.PlaneGeometry(borderWidth, borderHeight);
            const borderMaterial = new THREE.MeshStandardMaterial({
                color: params.materialBorderColor,
                side: THREE.DoubleSide,
                roughness: params.materialRoughness,
                metalness: params.materialMetalness
            });
            borderMaterial.envMapIntensity = 0.35;
            const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
            borderMesh.position.z = -0.5;
            if (params.ambience) {
                borderMesh.castShadow = true;
                borderMesh.receiveShadow = true;
            }
            mesh.add(borderMesh);
        }

        // Update image data
        imageData.mesh = mesh;
        scene.add(mesh);
    });

    console.log(`Material applied to ${imageStack.length} images`);
}

function loadImage(file) {
    // Validate file size before loading
    const maxSizeWarn = FILE_SIZE_WARN_MB * 1024 * 1024;
    const maxSizeReject = FILE_SIZE_REJECT_MB * 1024 * 1024;

    if (file.size > maxSizeReject) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        console.error(`File ${file.name} is too large (${sizeMB}MB). Maximum size is ${FILE_SIZE_REJECT_MB}MB.`);
        showToast(`❌ File too large: ${file.name} (${sizeMB}MB). Max: ${FILE_SIZE_REJECT_MB}MB`, 'error', 5000);
        return;
    }

    if (file.size > maxSizeWarn) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        console.warn(`Warning: File ${file.name} is large (${sizeMB}MB). This may affect performance.`);
        showToast(`⚠️ Large file: ${file.name} (${sizeMB}MB). May affect performance`, 'warning', 4000);
    }

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
                    console.warn(`Warning: Image ${filename} has large dimensions (${img.width}x${img.height}). Max recommended: ${MAX_DIMENSION_PX}px.`);
                    showToast(`⚠️ Large dimensions: ${filename} (${img.width}x${img.height}px). May render slowly`, 'warning', 4000);
                }

                if (attempt > 0) {
                    console.log(`[Retry] Successfully loaded ${filename} on attempt ${attempt + 1}`);
                }

                addImageToStack(texture, filename);
            },
            undefined,
            function(error) {
                // Error callback - retry or fail
                if (attempt < MAX_LOAD_RETRIES) {
                    const delay = RETRY_DELAYS_MS[attempt];
                    console.warn(`[Retry] Failed to load ${filename} (attempt ${attempt + 1}/${MAX_LOAD_RETRIES + 1}). Retrying in ${delay}ms...`, error);

                    setTimeout(() => {
                        loadTextureWithRetry(dataURL, filename, attempt + 1);
                    }, delay);
                } else {
                    // All retries exhausted
                    console.error(`[Retry] Failed to load ${filename} after ${MAX_LOAD_RETRIES + 1} attempts:`, error);
                    showToast(`❌ Failed to load: ${filename}. Check file is valid`, 'error', 5000);
                }
            }
        );
    }

    reader.onerror = function(error) {
        console.error(`Failed to read file ${file.name}:`, error);
        showToast(`❌ Failed to read file: ${file.name}`, 'error', 5000);
    };

    reader.readAsDataURL(file);
}

function addImageToStack(texture, filename) {
    // Check memory before adding
    if (!checkMemoryUsage(true)) {
        console.log(`[Memory] User declined to add image due to high memory usage`);
        showToast('❌ Image not added (memory limit)', 'warning');
        return;
    }

    // Save history before modification
    saveHistory();

    // Get image dimensions from texture
    const img = texture.image;
    const width = img.width;
    const height = img.height;

    // Scale to reasonable size (max 400px)
    const maxDimension = 400;
    let planeWidth = width;
    let planeHeight = height;

    if (width > height) {
        if (width > maxDimension) {
            planeWidth = maxDimension;
            planeHeight = (height / width) * maxDimension;
        }
    } else {
        if (height > maxDimension) {
            planeHeight = maxDimension;
            planeWidth = (width / height) * maxDimension;
        }
    }

    // Create geometry based on thickness setting
    let geometry;
    if (params.materialThickness > 1) {
        // Use BoxGeometry for thick materials
        geometry = new THREE.BoxGeometry(planeWidth, planeHeight, params.materialThickness);
    } else {
        // Use PlaneGeometry for thin materials
        geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    }

    // Create material based on ambience mode
    let material;
    if (params.ambience) {
        // Use MeshStandardMaterial with FULL saturation - no emissive washout
        material = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.FrontSide,  // Only render front face to prevent mirroring artifacts
            transparent: true,
            roughness: params.materialRoughness,
            metalness: params.materialMetalness,
            // NO emissive - keeps full color saturation
            envMapIntensity: 0.15  // Reduced for less washing out
        });
        material.needsUpdate = true;
    } else {
        // Use MeshBasicMaterial to show true colors without lighting effects
        material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.FrontSide,  // Only render front face
            transparent: true
        });
    }

    // Create main mesh
    const mesh = new THREE.Mesh(geometry, material);

    if (params.ambience) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    }

    // Add border if enabled
    let borderMesh = null;
    if (params.materialBorderWidth > 0) {
        const borderWidth = planeWidth + params.materialBorderWidth * 2;
        const borderHeight = planeHeight + params.materialBorderWidth * 2;
        const borderGeometry = new THREE.PlaneGeometry(borderWidth, borderHeight);
        const borderMaterial = new THREE.MeshStandardMaterial({
            color: params.materialBorderColor,
            side: THREE.FrontSide,  // Only render front face
            roughness: params.materialRoughness,
            metalness: params.materialMetalness
        });
        borderMaterial.envMapIntensity = 0.35;
        borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
        borderMesh.position.z = -0.5; // Slightly behind the image
        if (params.ambience) {
            borderMesh.castShadow = true;
            borderMesh.receiveShadow = true;
        }
        mesh.add(borderMesh);
    }

    // Position based on ambience mode
    const index = imageStack.length;
    if (params.ambience) {
        // Stand on floor like domino pieces
        mesh.position.y = FLOOR_Y + (planeHeight / 2);
        mesh.position.z = index * params.zSpacing;
    } else {
        // Default positioning (centered)
        mesh.position.z = index * params.zSpacing;
    }

    // Store in stack
    const imageData = {
        mesh: mesh,
        texture: texture,
        filename: filename,
        width: planeWidth,
        height: planeHeight,
        originalWidth: width,
        originalHeight: height,
        id: Date.now() + Math.random() // Unique ID
    };
    imageStack.push(imageData);

    // Add to scene
    scene.add(mesh);

    // Update UI list
    updateImageList();

    console.log(`Added ${filename} to stack at Z=${zPosition} (${imageStack.length} images total)`);
}

function updateImageList() {
    const listContainer = document.getElementById('image-list');
    const dropZoneContainer = document.getElementById('image-list-container');

    // Toggle has-images class based on whether images are loaded
    if (imageStack.length > 0) {
        dropZoneContainer.classList.add('has-images');
    } else {
        dropZoneContainer.classList.remove('has-images');
    }

    // Remove existing items properly to prevent memory leaks
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }

    imageStack.forEach((imageData, index) => {
        const item = document.createElement('div');
        item.className = 'image-item';
        item.draggable = true;
        item.dataset.index = index;
        item.dataset.id = imageData.id;

        // Keyboard navigation support
        item.tabIndex = 0; // Make focusable
        item.setAttribute('role', 'listitem');
        item.setAttribute('aria-label', `Image ${index + 1}: ${imageData.filename}, ${imageData.originalWidth} by ${imageData.originalHeight} pixels`);

        item.innerHTML = `
            <div class="image-item-info">
                <div class="image-item-name">${index + 1}. ${imageData.filename}</div>
                <div>${imageData.originalWidth}×${imageData.originalHeight}px</div>
            </div>
            <div class="image-item-controls">
                <button class="image-item-btn delete" onclick="deleteImage(${index})">✕</button>
            </div>
        `;

        // Drag events for reordering
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);

        // Keyboard navigation events
        item.addEventListener('keydown', handleImageListKeydown);
        item.addEventListener('focus', () => {
            item.style.outline = '2px solid #4CAF50';
            item.style.outlineOffset = '2px';
        });
        item.addEventListener('blur', () => {
            item.style.outline = 'none';
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

                console.log(`[Keyboard] Highlighted image ${index + 1}: ${imageData.filename}`);
                showToast(`✨ Image ${index + 1}: ${imageData.filename}`, 'info', 2000);
            }
            break;
    }
}

let draggedElement = null;
let draggedIndex = null;

function handleDragStart(e) {
    draggedElement = e.target;
    draggedIndex = parseInt(e.target.dataset.index);
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDrop(e) {
    e.preventDefault();

    const dropIndex = parseInt(e.currentTarget.dataset.index);

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
        // Reorder the array
        const [movedItem] = imageStack.splice(draggedIndex, 1);
        imageStack.splice(dropIndex, 0, movedItem);

        // Update Z positions
        imageStack.forEach((imageData, index) => {
            imageData.mesh.position.z = index * params.zSpacing;
        });

        // Update UI
        updateImageList();

        console.log(`Reordered: moved ${draggedIndex} to ${dropIndex}`);
    }

    return false;
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedElement = null;
    draggedIndex = null;
}

// Global function for delete button
window.deleteImage = function(index) {
    // Save history before deletion
    saveHistory();

    const imageData = imageStack[index];

    // Remove from scene
    scene.remove(imageData.mesh);

    // Dispose resources
    imageData.mesh.geometry.dispose();
    imageData.mesh.material.dispose();
    if (imageData.mesh.material.map) {
        imageData.mesh.material.map.dispose();
    }

    // Remove from array
    imageStack.splice(index, 1);

    // Update Z positions
    imageStack.forEach((img, i) => {
        img.mesh.position.z = i * params.zSpacing;
    });

    // Update UI
    updateImageList();

    console.log(`Deleted image at index ${index}`);
    showToast(`🗑️ Deleted ${imageData.filename}`, 'info');

    // Check memory after deletion
    checkMemoryUsage(false);
};

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    // Update perspective camera
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    // Update orthographic camera
    const frustumSize = 600;
    orthoCamera.left = frustumSize * aspect / -2;
    orthoCamera.right = frustumSize * aspect / 2;
    orthoCamera.top = frustumSize / 2;
    orthoCamera.bottom = frustumSize / -2;
    orthoCamera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    updateReflectionSettings();
}

function animate() {
    requestAnimationFrame(animate);
    updateFPS();
    controls.update();
    const activeCamera = getActiveCamera();
    renderer.render(scene, activeCamera);
}

function exportJSON() {
    // Check if images are loaded
    if (imageStack.length === 0) {
        console.warn('[Export] No images loaded - cannot export empty configuration');
        showToast('⚠️ Load images first', 'warning');
        return;
    }

    console.log('Exporting JSON configuration...');

    // Collect configuration
    const config = {
        version: '1.0',
        params: {
            zSpacing: params.zSpacing,
            bgColor: params.bgColor
        },
        camera: {
            position: {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z
            }
        },
        images: []
    };

    // Export each image with embedded base64 data
    imageStack.forEach(imageData => {
        // Get canvas from texture
        const texture = imageData.mesh.material.map;
        if (texture && texture.image) {
            // Create temporary canvas to extract image data
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = texture.image.width;
            tempCanvas.height = texture.image.height;
            const ctx = tempCanvas.getContext('2d');
            ctx.drawImage(texture.image, 0, 0);
            const dataURL = tempCanvas.toDataURL('image/png');

            config.images.push({
                filename: imageData.filename,
                dataURL: dataURL,
                width: imageData.width,
                height: imageData.height
            });
        }
    });

    // Create download
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    link.download = `vexy-stax-config-${timestamp}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`JSON exported successfully as ${link.download}`);
}

function importJSON(file) {
    if (!file) {
        console.error('No file provided for import');
        return;
    }

    console.log(`Importing JSON configuration from ${file.name}...`);

    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            const config = JSON.parse(event.target.result);

            // Validate config
            if (!config.version || !config.params || !config.images) {
                throw new Error('Invalid config format');
            }

            // Clear existing
            clearAll();

            // Apply params
            params.zSpacing = config.params.zSpacing;
            params.bgColor = config.params.bgColor;

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

            // Load images
            const textureLoader = new THREE.TextureLoader();
            config.images.forEach((imageConfig, index) => {
                textureLoader.load(imageConfig.dataURL, (texture) => {
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

                    console.log(`Loaded ${imageConfig.filename} from config`);
                });
            });

            // Refresh Tweakpane to show updated params
            pane.refresh();

            console.log('JSON configuration imported successfully');

        } catch (error) {
            console.error('Failed to import JSON:', error);
            alert(`Failed to import configuration: ${error.message}`);
        }
    };

    reader.onerror = function(error) {
        console.error('Failed to read JSON file:', error);
    };

    reader.readAsText(file);
}

function copyJSON() {
    // Check if images are loaded
    if (imageStack.length === 0) {
        console.warn('[Export] No images loaded - cannot copy empty configuration');
        showToast('⚠️ Load images first', 'warning');
        return;
    }

    console.log('Copying JSON configuration to clipboard...');

    // Build config object (same as exportJSON)
    const config = {
        version: '1.0',
        params: {
            zSpacing: params.zSpacing,
            bgColor: params.bgColor,
            cameraMode: params.cameraMode,
            cameraFOV: params.cameraFOV,
            transparentBg: params.transparentBg
        },
        camera: {
            position: {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z
            }
        },
        images: []
    };

    // Export each image with embedded base64 data
    imageStack.forEach(imageData => {
        const texture = imageData.mesh.material.map;
        if (texture && texture.image) {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = texture.image.width;
            tempCanvas.height = texture.image.height;
            const ctx = tempCanvas.getContext('2d');
            ctx.drawImage(texture.image, 0, 0);
            const dataURL = tempCanvas.toDataURL('image/png');

            config.images.push({
                filename: imageData.filename,
                dataURL: dataURL,
                width: imageData.width,
                height: imageData.height
            });
        }
    });

    // Copy to clipboard
    const json = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(json).then(() => {
        console.log('JSON configuration copied to clipboard');
        showToast('📋 Configuration copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy to clipboard:', err);
        showToast('⚠️ Failed to copy to clipboard', 'warning');
    });
}

function pasteJSON() {
    console.log('Pasting JSON configuration from clipboard...');

    navigator.clipboard.readText().then(text => {
        try {
            const config = JSON.parse(text);

            // Validate config
            if (!config.version || !config.params || !config.images) {
                throw new Error('Invalid config format');
            }

            // Clear existing
            clearAll();

            // Apply params
            params.zSpacing = config.params.zSpacing;
            params.bgColor = config.params.bgColor;
            if (config.params.cameraMode) params.cameraMode = config.params.cameraMode;
            if (config.params.cameraFOV) params.cameraFOV = config.params.cameraFOV;
            if (config.params.transparentBg !== undefined) params.transparentBg = config.params.transparentBg;

            // Update background
            updateBackground();

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

            // Load images
            const textureLoader = new THREE.TextureLoader();
            config.images.forEach((imageConfig, index) => {
                textureLoader.load(imageConfig.dataURL, (texture) => {
                    const geometry = new THREE.PlaneGeometry(
                        imageConfig.width,
                        imageConfig.height
                    );

                    const material = new THREE.MeshBasicMaterial({
                        map: texture,
                        side: THREE.DoubleSide,
                        transparent: true
                    });

                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    mesh.position.z = index * params.zSpacing;

                    imageStack.push({
                        mesh: mesh,
                        texture: texture,
                        filename: imageConfig.filename,
                        width: imageConfig.width,
                        height: imageConfig.height,
                        originalWidth: imageConfig.width,
                        originalHeight: imageConfig.height,
                        id: Date.now() + Math.random()
                    });

                    scene.add(mesh);
                    updateImageList();
                    console.log(`Loaded ${imageConfig.filename} from clipboard`);
                });
            });

            // Refresh Tweakpane
            pane.refresh();

            console.log('JSON configuration pasted successfully');
            alert('Configuration pasted from clipboard!');

        } catch (error) {
            console.error('Failed to parse JSON from clipboard:', error);
            alert(`Failed to paste configuration: ${error.message}`);
        }
    }).catch(err => {
        console.error('Failed to read from clipboard:', err);
        alert('Failed to read from clipboard. Check console for details.');
    });
}

// Initialize when DOM is ready
init();
