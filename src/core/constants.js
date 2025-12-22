// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: src/core/constants.js
import * as THREE from 'three';

/**
 * Maximum number of history states to maintain for undo/redo functionality
 * @type {number}
 * @constant
 * @default 10
 * @example
 * historyStates.push(snapshot);
 * if (historyStates.length > MAX_HISTORY) {
 *     historyStates.shift(); // Drop oldest state to respect undo limit
 * }
 */
export const MAX_HISTORY = 10;

/**
 * FPS threshold below which a performance warning is triggered
 * @type {number}
 * @constant
 * @default 30
 * @unit frames per second
 * @example
 * if (stats.fps < FPS_WARNING_THRESHOLD) {
 *     ui.showFpsWarning(stats.fps);
 * }
 */
export const FPS_WARNING_THRESHOLD = 30;

/**
 * Memory usage threshold for warning message
 * @type {number}
 * @constant
 * @default 500
 * @unit megabytes
 */
export const MEMORY_WARNING_THRESHOLD_MB = 500;

/**
 * Memory usage threshold for critical warning
 * @type {number}
 * @constant
 * @default 1000
 * @unit megabytes
 */
export const MEMORY_CRITICAL_THRESHOLD_MB = 1000;

/**
 * Cooldown period between memory warning messages
 * @type {number}
 * @constant
 * @default 30000
 * @unit milliseconds
 */
export const MEMORY_WARNING_COOLDOWN = 30000;

/**
 * Interval for auto-saving settings to localStorage
 * @type {number}
 * @constant
 * @default 30000
 * @unit milliseconds
 */
export const AUTO_SAVE_INTERVAL = 30000;

/**
 * Duration for error toast notifications (10s for readability)
 * @type {number}
 * @constant
 * @default 10000
 * @unit milliseconds
 */
export const TOAST_DURATION_ERROR = 10000;

/**
 * Duration for warning toast notifications
 * @type {number}
 * @constant
 * @default 4000
 * @unit milliseconds
 */
export const TOAST_DURATION_WARNING = 4000;

/**
 * Duration for success/info toast notifications
 * @type {number}
 * @constant
 * @default 3000
 * @unit milliseconds
 */
export const TOAST_DURATION_INFO = 3000;

/**
 * Camera far clipping plane distance
 * @type {number}
 * @constant
 * @default 5000
 * @unit world units
 */
export const CAMERA_FAR_PLANE = 5000;

/**
 * Default camera distance from scene origin
 * @type {number}
 * @constant
 * @default 800
 * @unit world units
 */
export const CAMERA_DEFAULT_DISTANCE = 800;

/**
 * Minimum allowed camera distance (zoom limit)
 * @type {number}
 * @constant
 * @default 100
 * @unit world units
 */
export const CAMERA_MIN_DISTANCE = 100;

/**
 * Maximum allowed camera distance (zoom limit)
 * @type {number}
 * @constant
 * @default 3000
 * @unit world units
 */
export const CAMERA_MAX_DISTANCE = 3000;

/**
 * OrbitControls damping factor (smoothing)
 * @type {number}
 * @constant
 * @default 0.05
 * @range 0-1 (0=no damping, 1=instant stop)
 */
export const CONTROLS_DAMPING_FACTOR = 0.05;

/**
 * Toast notification fade-out animation duration
 * @type {number}
 * @constant
 * @default 300
 * @unit milliseconds
 */
export const TOAST_FADE_DURATION = 300;

/**
 * Delay before showing overlay to allow rendering
 * @type {number}
 * @constant
 * @default 100
 * @unit milliseconds
 */
export const OVERLAY_RENDER_DELAY = 100;

/**
 * Default camera field of view (perspective mode)
 * @type {number}
 * @constant
 * @default 75
 * @unit degrees
 */
export const DEFAULT_CAMERA_FOV = 75;

/**
 * Default background color (black)
 * @type {string}
 * @constant
 * @default '#000000'
 */
export const DEFAULT_BG_COLOR = '#000000';

/**
 * Default Z-spacing between stacked images
 * @type {number}
 * @constant
 * @default 100
 * @unit pixels
 */
export const DEFAULT_Z_SPACING = 100;

/**
 * Minimum gap between slides to prevent z-fighting when Layer Depth is 0.
 * Added to the effective z-spacing regardless of user setting.
 * Set to 0.1 to ensure slides never perfectly overlap.
 * @type {number}
 * @constant
 * @default 0.1
 * @unit world units (pixels)
 * @example
 * // In getEffectiveZSpacing():
 * return (params.zSpacing ?? autoDistance) + MIN_LAYER_GAP;
 */
export const MIN_LAYER_GAP = 0.1;

/**
 * Default studio canvas dimensions (HD 16:9 quarter resolution).
 * @type {{x: number, y: number}}
 * @constant
 * @default {x: 960, y: 540}
 */
export const DEFAULT_CANVAS_SIZE = Object.freeze({ x: 960, y: 540 });

/**
 * Z-index for modal overlays and UI elements
 * @type {number}
 * @constant
 * @default 10000
 */
export const Z_INDEX_MODAL = 10000;

/**
 * Bytes per megabyte (for size conversions)
 * @type {number}
 * @constant
 * @default 1048576
 */
export const BYTES_PER_MB = 1024 * 1024;

/**
 * Vertical position of floor plane in world coordinates
 * @type {number}
 * @constant
 * @default 0
 * @unit pixels
 * @description Floor at Y=0 so slides sit on top of it
 */
export const FLOOR_Y = 0;

/**
 * Floor plane dimensions (width and depth)
 * @type {number}
 * @constant
 * @default 2000
 * @unit pixels
 * @description Large enough to extend beyond camera frustum
 */
export const FLOOR_SIZE = 2000;

/**
 * Orthographic camera frustum size (half-width)
 * @type {number}
 * @constant
 * @default 600
 * @unit pixels
 * @description Used for orthographic/isometric camera modes
 */
export const ORTHO_FRUSTUM_SIZE = 600;

/**
 * File size threshold for warning message
 * @type {number}
 * @constant
 * @default 10
 * @unit megabytes
 * @description Files larger than this trigger a performance warning
 */
export const FILE_SIZE_WARN_MB = 10;

/**
 * File size threshold for rejection
 * @type {number}
 * @constant
 * @default 50
 * @unit megabytes
 * @description Files larger than this are rejected to prevent memory issues
 */
export const FILE_SIZE_REJECT_MB = 50;

/**
 * Maximum allowed image dimension (width or height)
 * @type {number}
 * @constant
 * @default 4096
 * @unit pixels
 * @description Prevents extremely large textures that could crash WebGL
 */
export const MAX_DIMENSION_PX = 4096;

/**
 * Maximum number of retry attempts for failed image loads
 * @type {number}
 * @constant
 * @default 3
 */
export const MAX_LOAD_RETRIES = 3;

/**
 * Retry delay intervals in milliseconds for progressive backoff
 * @type {ReadonlyArray<number>}
 * @constant
 * @default [500, 1500, 3000]
 * @unit milliseconds
 * @description First retry after 500ms, second after 1500ms, third after 3000ms
 */
export const RETRY_DELAYS_MS = Object.freeze([500, 1500, 3000]);

/**
 * Debounce delay for resize and other frequently-fired events
 * @type {number}
 * @constant
 * @default 150
 * @unit milliseconds
 * @description Prevents excessive recalculations during window resize
 * @example
 * const debouncedResize = debounce(rebuildLayout, DEBOUNCE_DELAY_MS);
 * window.addEventListener('resize', debouncedResize);
 */
export const DEBOUNCE_DELAY_MS = 150;

/**
 * Ambient light intensity range for adaptive lighting
 * @type {{min: number, max: number}}
 * @constant
 * @property {number} min - Minimum ambient intensity (0.5)
 * @property {number} max - Maximum ambient intensity (0.8)
 * @range 0.0-1.0
 * @description Adjusts based on background luminance to maintain visibility
 */
export const AMBIENT_INTENSITY_RANGE = Object.freeze({
    min: 0.5,
    max: 0.8
});

/**
 * Emissive material intensity range for ambient mode
 * @type {{min: number, max: number}}
 * @constant
 * @property {number} min - Minimum emissive intensity (0.05)
 * @property {number} max - Maximum emissive intensity (0.25)
 * @range 0.0-1.0
 * @description Adjusts based on background luminance to prevent washout
 */
export const EMISSIVE_INTENSITY_RANGE = Object.freeze({
    min: 0.05,
    max: 0.25
});

/**
 * Main directional light configuration
 * @type {Object}
 * @constant
 * @property {number} intensity - Light intensity (Math.PI * 0.4 ≈ 1.26)
 * @property {Object} position - Light position in world coordinates
 * @property {number} position.x - X position (5)
 * @property {number} position.y - Y position (10)
 * @property {number} position.z - Z position (7)
 * @property {Object} shadow - Shadow map configuration
 * @property {number} shadow.mapSize - Shadow map resolution (4096x4096)
 * @property {Object} shadow.camera - Shadow camera frustum settings
 * @property {number} shadow.bias - Shadow bias to reduce artifacts (-0.0001)
 * @property {number} shadow.normalBias - Normal-based bias (0.05)
 * @property {number} shadow.radius - Shadow blur radius (6)
 * @property {number} shadow.blurSamples - Number of blur samples (16)
 * @description Primary light source positioned above and to the right
 */
export const MAIN_LIGHT_SETTINGS = Object.freeze({
    intensity: Math.PI * 0.4,
    position: Object.freeze({ x: 5, y: 10, z: 7 }),
    shadow: Object.freeze({
        mapSize: 4096,
        camera: Object.freeze({
            near: 0.5,
            far: 500,
            left: -500,
            right: 500,
            top: 500,
            bottom: -500
        }),
        bias: -0.0001,
        normalBias: 0.05,
        radius: 6,
        blurSamples: 16
    })
});

/**
 * Fill light configuration (no shadows)
 * @type {Object}
 * @constant
 * @property {number} intensity - Light intensity (Math.PI * 0.15 ≈ 0.47)
 * @property {Object} position - Light position in world coordinates
 * @property {number} position.x - X position (-5)
 * @property {number} position.y - Y position (5)
 * @property {number} position.z - Z position (-5)
 * @description Secondary light to reduce harsh shadows
 */
export const FILL_LIGHT_SETTINGS = Object.freeze({
    intensity: Math.PI * 0.15,
    position: Object.freeze({ x: -5, y: 5, z: -5 })
});

/**
 * Hemisphere light configuration for ambient illumination
 * @type {Object}
 * @constant
 * @property {number} skyColor - Sky color (0xffffff = white)
 * @property {number} groundColor - Ground color (0x444444 = dark gray)
 * @property {number} intensity - Light intensity (0.3)
 * @range intensity: 0.0-1.0
 * @description Provides base ambient lighting from above and below
 */
export const HEMISPHERE_LIGHT_SETTINGS = Object.freeze({
    skyColor: 0xffffff,
    groundColor: 0x444444,
    intensity: 0.3
});

/**
 * Event names for EventBus communication
 * @type {Object}
 * @constant
 * @property {string} backgroundChanged - Emitted when background color changes
 * @property {string} stackUpdated - Emitted when image stack is modified
 * @property {string} cameraUpdated - Emitted when camera position/settings change
 * @description Used for decoupled component communication via EventBus
 */
export const EVENTS = Object.freeze({
    backgroundChanged: 'background:changed',
    stackUpdated: 'stack:updated',
    cameraUpdated: 'camera:updated'
});

/**
 * Material preset configurations for slide appearance
 * @type {Object.<string, {roughness: number, metalness: number, thickness: number, borderWidth: number}>}
 * @constant
 * @property {Object} glossy - Reflective glossy finish (roughness: 0.2, metalness: 0.8)
 * @property {Object} neutral - Flat neutral appearance (roughness: 0.05, metalness: 0)
 * @property {Object} matte - Diffuse matte finish (roughness: 0.7, metalness: 0)
 * @description Each preset defines roughness, metalness, thickness, and border width
 */
export const MATERIAL_PRESETS = Object.freeze({
    'glossy': { roughness: 0.2, metalness: 0.8, thickness: 1, borderWidth: 0 },
    'neutral': { roughness: 0.05, metalness: 0, thickness: 1, borderWidth: 0 },
    'matte': { roughness: 0.7, metalness: 0, thickness: 1, borderWidth: 0 }
});

/**
 * Camera viewpoint preset positions
 * @type {Object.<string, (null|string|{x: number, y: number, z: number})>}
 * @constant
 * @property {null} center - Returns camera to centered default position
 * @property {string} front - Special 'fitToFrame' mode that calculates distance to fit canvas
 * @property {string} hero - Hero shot view with slides collapsed to front (culmination view)
 * @property {Object} beauty - Readable 3/4 view with clear layer separation (x:-1280, y:-40, z:1400)
 * @property {Object} top - Top-down view with slight depth (x:0, y:1200, z:200)
 * @property {Object} isometric - True isometric angle (x:-900, y:900, z:900)
 * @property {Object} 3d-stack - Emphasizes stack depth (x:-800, y:400, z:1000)
 * @property {Object} side - Side view with slight perspective (x:-1400, y:0, z:200)
 * @unit pixels for x/y/z coordinates
 * @description Preset camera positions for common viewing angles, optimized for layer readability
 */
export const VIEWPOINT_PRESETS = Object.freeze({
    center: null,
    front: 'fitToFrame',
    hero: 'heroView',
    beauty: { x: -1280, y: -40, z: 1400 },
    top: { x: 0, y: 1200, z: 200 },
    isometric: { x: -900, y: 900, z: 900 },
    '3d-stack': { x: -800, y: 400, z: 1000 },
    side: { x: -1400, y: 0, z: 200 }
});

/**
 * Default parameter values for studio configuration
 * @type {Object}
 * @private
 * @constant
 * @property {Object} canvasSize - Canvas dimensions (x:960, y:540)
 * @property {string} bgColor - Background color hex (#000000 = black)
 * @property {boolean} transparentBg - Transparent background toggle (false)
 * @property {boolean} ambience - Ambient mode toggle (false)
 * @property {string} cameraMode - Camera projection mode ('perspective')
 * @property {number} cameraFOV - Field of view in degrees (75)
 * @property {number} cameraZoom - Camera zoom level (1.0)
 * @property {number} cameraOffsetX - Additive X offset from viewpoint (-WIDTH/2 to +WIDTH/2)
 * @property {number} cameraOffsetY - Additive Y offset from viewpoint (-HEIGHT/2 to +HEIGHT/2)
 * @property {number} zSpacing - Stack spacing in pixels (100)
 * @property {string} materialPreset - Material preset key ('metallic-card')
 * @property {number} materialRoughness - Surface roughness (0.2)
 * @property {number} materialMetalness - Metallic property (0.8)
 * @property {number} materialThickness - Slide thickness in pixels (2.0)
 * @property {number} materialBorderWidth - Border width in pixels (0)
 * @property {string} materialBorderColor - Border color hex (#ffffff = white)
 * @property {string} viewpointPreset - Viewpoint preset key ('front')
 * @property {number} animDuration - Animation duration in seconds (1.5)
 * @property {string} animEasing - GSAP easing function ('power2.inOut')
 * @description Master template for default studio parameters
 */
const PARAM_TEMPLATE = {
    canvasSize: { ...DEFAULT_CANVAS_SIZE },
    bgColor: '#ffffff',
    floorColor: { r: 236, g: 236, b: 236, a: 0.05 },
    transparentBg: false,
    ambience: false,
    cameraMode: 'perspective',
    cameraFOV: 75,
    cameraZoom: 1.0,
    cameraDistance: 800,
    cameraOffsetX: 0,
    cameraOffsetY: 0,
    zSpacing: null,
    materialPreset: 'neutral',
    materialRoughness: 0.05,
    materialMetalness: 0,
    materialThickness: 1.0,
    materialBorderWidth: 0,
    materialBorderColor: '#ffffff',
    viewpointPreset: 'beauty',
    animDuration: 1.5,
    animEasing: 'power2.inOut'
};

/**
 * Creates a fresh copy of default parameters
 * @returns {Object} Deep clone of PARAM_TEMPLATE with all default values
 * @description Returns a new object instance to prevent accidental mutation of defaults
 * @example
 * const params = createDefaultParams();
 * params.bgColor = '#ffffff'; // Safe - modifies copy, not template
 */
export function createDefaultParams() {
    return clonePlain(PARAM_TEMPLATE);
}

/**
 * Recursively clones plain objects and arrays (no special constructors)
 * @param {*} value - Value to clone (primitive, array, or plain object)
 * @returns {*} Deep clone of input value
 * @private
 * @description Only clones plain objects (Object.constructor === Object), not class instances
 */
function clonePlain(value) {
    if (Array.isArray(value)) {
        return value.map((item) => clonePlain(item));
    }
    if (value && typeof value === 'object' && value.constructor === Object) {
        const cloned = {};
        Object.entries(value).forEach(([key, val]) => {
            cloned[key] = clonePlain(val);
        });
        return cloned;
    }
    return value;
}
