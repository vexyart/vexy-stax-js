// this_file: src/core/constants.js
import * as THREE from 'three';

/**
 * Maximum number of history states to maintain for undo/redo functionality
 * @type {number}
 * @constant
 * @default 10
 */
export const MAX_HISTORY = 10;

/**
 * FPS threshold below which a performance warning is triggered
 * @type {number}
 * @constant
 * @default 30
 * @unit frames per second
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
 * Duration for error toast notifications
 * @type {number}
 * @constant
 * @default 5000
 * @unit milliseconds
 */
export const TOAST_DURATION_ERROR = 5000;

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
 * @default -250
 * @unit pixels
 */
export const FLOOR_Y = -250;

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
 * Base resolution multiplier for reflection texture sizing
 * @type {number}
 * @constant
 * @default 0.65
 * @range 0.0-1.0
 * @description Multiplied by window dimensions to determine reflection texture size
 */
export const REFLECTION_TEXTURE_BASE = 0.65;

/**
 * Minimum resolution for reflection render target
 * @type {number}
 * @constant
 * @default 512
 * @unit pixels
 * @description Ensures acceptable reflection quality on small viewports
 */
export const REFLECTION_MIN_RESOLUTION = 512;

/**
 * Reflection texture opacity (0.0 = invisible, 1.0 = opaque)
 * @type {number}
 * @constant
 * @default 0.01
 * @range 0.0-1.0
 * @description Reduced to 1% for subtle depth cue without visual distraction
 */
export const REFLECTION_OPACITY = 0.01;

/**
 * Blur radius for soft reflection sampling in shader
 * @type {number}
 * @constant
 * @default 0.003
 * @range 0.0-0.1
 * @description Controls the softness of reflected edges
 */
export const REFLECTION_BLUR_RADIUS = 0.003;

/**
 * Exponential fade strength for radial reflection falloff
 * @type {number}
 * @constant
 * @default 2.7
 * @range 0.0-10.0
 * @description Higher values create sharper fade from center to edges
 */
export const REFLECTION_FADE_STRENGTH = 2.7;

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
 * Floor base material properties (MeshStandardMaterial)
 * @type {Object}
 * @constant
 * @property {number} roughness - Surface roughness (0.45)
 * @property {number} metalness - Metallic property (0.08)
 * @property {number} envMapIntensity - Environment map intensity (0.35)
 * @range roughness: 0.0-1.0, metalness: 0.0-1.0, envMapIntensity: 0.0-1.0
 * @description Slightly rough, mostly non-metallic surface
 */
export const FLOOR_BASE_MATERIAL = Object.freeze({
    roughness: 0.45,
    metalness: 0.08,
    envMapIntensity: 0.35
});

/**
 * Vertical offset for floor reflector mesh above base plane
 * @type {number}
 * @constant
 * @default 0.1
 * @unit pixels
 * @description Prevents z-fighting between floor and reflector
 */
export const FLOOR_REFLECTOR_OFFSET = 0.1;

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
 * @property {Object} flat-matte - Completely matte, no reflections (roughness: 1.0)
 * @property {Object} glossy-photo - High gloss finish (roughness: 0.1)
 * @property {Object} plastic-card - Semi-glossy plastic appearance (roughness: 0.4, thickness: 2px)
 * @property {Object} thick-board - Thick matte board (roughness: 0.9, thickness: 8px)
 * @property {Object} metal-sheet - Reflective metal surface (roughness: 0.2, metalness: 0.8)
 * @property {Object} metallic-card - Metallic card with depth (roughness: 0.2, metalness: 0.8, thickness: 2px)
 * @property {Object} glass-slide - Very glossy glass (roughness: 0.05)
 * @property {Object} matte-print - Semi-matte print (roughness: 0.7)
 * @property {Object} bordered - Glossy with white border (borderWidth: 20px)
 * @property {Object} 3d-box - Thick 3D appearance (thickness: 15px)
 * @description Each preset defines roughness, metalness, thickness, and border width
 */
export const MATERIAL_PRESETS = Object.freeze({
    'flat-matte': { roughness: 1.0, metalness: 0, thickness: 1, borderWidth: 0 },
    'glossy-photo': { roughness: 0.1, metalness: 0, thickness: 1, borderWidth: 0 },
    'plastic-card': { roughness: 0.4, metalness: 0.1, thickness: 2, borderWidth: 0 },
    'thick-board': { roughness: 0.9, metalness: 0, thickness: 8, borderWidth: 0 },
    'metal-sheet': { roughness: 0.2, metalness: 0.8, thickness: 1, borderWidth: 0 },
    'metallic-card': { roughness: 0.2, metalness: 0.8, thickness: 2, borderWidth: 0 },
    'glass-slide': { roughness: 0.05, metalness: 0, thickness: 1, borderWidth: 0 },
    'matte-print': { roughness: 0.7, metalness: 0, thickness: 1, borderWidth: 0 },
    'bordered': { roughness: 0.2, metalness: 0, thickness: 1, borderWidth: 20 },
    '3d-box': { roughness: 0.6, metalness: 0, thickness: 15, borderWidth: 0 }
});

/**
 * Camera viewpoint preset positions
 * @type {Object.<string, (null|string|{x: number, y: number, z: number})>}
 * @constant
 * @property {null} center - Returns camera to centered default position
 * @property {string} front - Special 'fitToFrame' mode that calculates distance to fit canvas
 * @property {Object} beauty - Attractive 3/4 view (x:600, y:400, z:700)
 * @property {Object} top - Top-down view (x:0, y:800, z:100)
 * @property {Object} isometric - True isometric angle (x:500, y:500, z:500)
 * @property {Object} 3d-stack - Emphasizes stack depth (x:400, y:300, z:600)
 * @property {Object} side - Pure side view (x:800, y:0, z:0)
 * @unit pixels for x/y/z coordinates
 * @description Preset camera positions for common viewing angles
 */
export const VIEWPOINT_PRESETS = Object.freeze({
    center: null,
    front: 'fitToFrame',
    beauty: { x: 600, y: 400, z: 700 },
    top: { x: 0, y: 800, z: 100 },
    isometric: { x: 500, y: 500, z: 500 },
    '3d-stack': { x: 400, y: 300, z: 600 },
    side: { x: 800, y: 0, z: 0 }
});

/**
 * Custom shader for soft floor reflections with radial fade
 * @type {Object}
 * @constant
 * @property {string} name - Shader identifier
 * @property {Object} uniforms - Shader uniform parameters
 * @property {Object} uniforms.color - Base tint color (white)
 * @property {Object} uniforms.tDiffuse - Reflection texture sampler
 * @property {Object} uniforms.textureMatrix - UV transform matrix for reflection mapping
 * @property {Object} uniforms.opacity - Overall reflection opacity
 * @property {Object} uniforms.blurRadius - Blur sampling radius
 * @property {Object} uniforms.fadeStrength - Exponential fade strength
 * @property {Object} uniforms.floorSize - Floor dimensions for fade calculation
 * @property {string} vertexShader - GLSL vertex shader source
 * @property {string} fragmentShader - GLSL fragment shader with 9-tap blur and radial fade
 * @description Implements soft reflections with 9-sample box blur and distance-based fade
 */
export const SoftReflectorShader = {
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

/**
 * Default parameter values for studio configuration
 * @type {Object}
 * @private
 * @constant
 * @property {Object} canvasSize - Canvas dimensions (x:1920, y:1080)
 * @property {string} bgColor - Background color hex (#000000 = black)
 * @property {boolean} transparentBg - Transparent background toggle (false)
 * @property {boolean} ambience - Ambient mode toggle (false)
 * @property {string} cameraMode - Camera projection mode ('perspective')
 * @property {number} cameraFOV - Field of view in degrees (75)
 * @property {number} cameraZoom - Camera zoom level (1.0)
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
    canvasSize: { x: 1920, y: 1080 },
    bgColor: '#000000',
    transparentBg: false,
    ambience: false,
    cameraMode: 'perspective',
    cameraFOV: 75,
    cameraZoom: 1.0,
    zSpacing: 100,
    materialPreset: 'metallic-card',
    materialRoughness: 0.2,
    materialMetalness: 0.8,
    materialThickness: 2.0,
    materialBorderWidth: 0,
    materialBorderColor: '#ffffff',
    viewpointPreset: 'front',
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
