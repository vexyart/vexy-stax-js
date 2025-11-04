// this_file: src/core/constants.js
import * as THREE from 'three';

export const MAX_HISTORY = 10;

export const FPS_WARNING_THRESHOLD = 30;

export const MEMORY_WARNING_THRESHOLD_MB = 500;
export const MEMORY_CRITICAL_THRESHOLD_MB = 1000;
export const MEMORY_WARNING_COOLDOWN = 30000;

export const FLOOR_Y = -250;
export const FLOOR_SIZE = 2000;
export const REFLECTION_TEXTURE_BASE = 0.65;
export const REFLECTION_MIN_RESOLUTION = 512;
export const REFLECTION_OPACITY = 0.32;
export const REFLECTION_BLUR_RADIUS = 0.003;
export const REFLECTION_FADE_STRENGTH = 2.7;

export const FILE_SIZE_WARN_MB = 10;
export const FILE_SIZE_REJECT_MB = 50;
export const MAX_DIMENSION_PX = 4096;
export const MAX_LOAD_RETRIES = 3;
export const RETRY_DELAYS_MS = Object.freeze([500, 1500, 3000]);

export const DEBOUNCE_DELAY_MS = 150;

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

export const VIEWPOINT_PRESETS = Object.freeze({
    center: null,
    front: 'fitToFrame',
    beauty: { x: 600, y: 400, z: 700 },
    top: { x: 0, y: 800, z: 100 },
    isometric: { x: 500, y: 500, z: 500 },
    '3d-stack': { x: 400, y: 300, z: 600 },
    side: { x: 800, y: 0, z: 0 }
});

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

export function createDefaultParams() {
    return clonePlain(PARAM_TEMPLATE);
}

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
