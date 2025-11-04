// src/scene/SceneManager.js
// this_file: src/scene/SceneManager.js

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { computeRetinaDimensions } from '../core/studioSizing.js';
import { ORTHO_FRUSTUM_SIZE } from '../core/constants.js';

/**
 * SceneManager - Manages Three.js scene, renderer, and render loop
 *
 * Responsibilities:
 * - Create and configure WebGLRenderer
 * - Create Three.js scene with environment
 * - Handle canvas sizing (retina-aware)
 * - Manage render loop
 * - Handle window resize events
 * - WebGL context loss/restore recovery
 * - Resource cleanup
 */
export class SceneManager {
    /**
     * Create a new SceneManager
     * @param {HTMLCanvasElement} canvas - Canvas element for rendering
     * @param {Object} params - Configuration parameters
     * @param {string} params.bgColor - Background color (hex string)
     * @param {Object} params.canvasSize - Canvas size {x, y}
     * @param {number} params.canvasSize.x - Canvas width in pixels
     * @param {number} params.canvasSize.y - Canvas height in pixels
     */
    constructor(canvas, params) {
        this.canvas = canvas;
        this.params = params;

        /** @type {THREE.Scene|null} */
        this.scene = null;

        /** @type {THREE.WebGLRenderer|null} */
        this.renderer = null;

        /** @type {THREE.Texture|null} */
        this.environmentTexture = null;

        // External dependencies (set via setters after construction)
        /** @type {THREE.PerspectiveCamera|null} */
        this.camera = null;

        /** @type {THREE.OrthographicCamera|null} */
        this.orthoCamera = null;

        /** @type {OrbitControls|null} */
        this.controls = null;

        /** @type {Object|null} */
        this.fpsMonitor = null;

        // Animation loop state
        /** @type {number|null} */
        this.rafId = null;

        /** @type {boolean} */
        this.isAnimating = false;
    }

    /**
     * Initialize scene and renderer
     * @returns {{scene: THREE.Scene, renderer: THREE.WebGLRenderer}} Created scene and renderer
     * @throws {Error} If canvas or params.canvasSize is missing
     */
    init() {
        // Defensive checks
        if (!this.canvas) {
            throw new Error('[SceneManager] Cannot initialize: canvas element is required');
        }
        if (!this.params || !this.params.canvasSize) {
            throw new Error('[SceneManager] Cannot initialize: params with canvasSize is required');
        }

        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.params.bgColor);

        // Create renderer with advanced photorealistic features
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,  // Enable transparency
            preserveDrawingBuffer: true,  // Needed for export
            powerPreference: "high-performance"  // Use dedicated GPU if available
        });

        // Apply initial sizing
        this.syncRendererDimensions(this.params.canvasSize, window.devicePixelRatio);

        // Enable high-quality shadows with soft edges
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.VSMShadowMap;  // Variance shadows for softer look
        this.renderer.shadowMap.autoUpdate = true;

        // Enable physically correct lighting and rendering
        this.renderer.physicallyCorrectLights = true;  // Realistic light falloff
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;  // Cinematic tone mapping
        this.renderer.toneMappingExposure = 1.2;  // Slightly brighter for better visibility
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;  // Correct color space for displays

        // Create environment texture for PBR materials
        this.updateEnvironment();

        this.renderer.setClearColor(0x000000, 1);  // Default opaque black

        // Setup context loss recovery
        this.setupContextLossRecovery();

        console.log('SceneManager initialized');

        return { scene: this.scene, renderer: this.renderer };
    }

    /**
     * Update environment texture (for PBR materials)
     */
    updateEnvironment() {
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();

        if (this.environmentTexture) {
            this.environmentTexture.dispose();
        }

        this.environmentTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
        this.scene.environment = this.environmentTexture;
        pmremGenerator.dispose();
    }

    /**
     * Sync renderer dimensions with retina-aware sizing
     * @param {Object} size - {x, y} logical size in pixels
     * @param {number} pixelRatioOverride - Optional pixel ratio override
     * @returns {Object} - Computed dimensions
     */
    syncRendererDimensions(size, pixelRatioOverride) {
        if (!this.renderer || !this.canvas) {
            return null;
        }

        const dimensions = computeRetinaDimensions(size, pixelRatioOverride);
        this.renderer.setPixelRatio(dimensions.pixelRatio);
        this.renderer.setSize(dimensions.cssWidth, dimensions.cssHeight, false);
        this.canvas.style.width = `${dimensions.cssWidth}px`;
        this.canvas.style.height = `${dimensions.cssHeight}px`;

        return dimensions;
    }

    /**
     * Handle window resize - updates cameras and renderer
     */
    onWindowResize() {
        if (!this.camera || !this.orthoCamera) {
            return;
        }

        const aspect = this.params.canvasSize.x / this.params.canvasSize.y;

        // Update perspective camera
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();

        // Update orthographic camera
        const frustumSize = ORTHO_FRUSTUM_SIZE;
        this.orthoCamera.left = frustumSize * aspect / -2;
        this.orthoCamera.right = frustumSize * aspect / 2;
        this.orthoCamera.top = frustumSize / 2;
        this.orthoCamera.bottom = frustumSize / -2;
        this.orthoCamera.updateProjectionMatrix();

        this.syncRendererDimensions(this.params.canvasSize, window.devicePixelRatio);

        // Notify listeners (for floor reflection updates, etc.)
        if (this.onResizeCallback) {
            this.onResizeCallback();
        }
    }

    /**
     * Update scene background color
     * @param {string} color - Hex color string
     * @param {boolean} transparent - Whether background should be transparent
     */
    updateBackground(color, transparent) {
        if (transparent) {
            this.scene.background = null;
            this.renderer.setClearColor(0x000000, 0);  // Transparent
        } else {
            this.scene.background = new THREE.Color(color);
            this.renderer.setClearColor(color, 1);  // Opaque
        }
    }

    /**
     * Start animation loop
     * @param {Function} getActiveCamera - Function to get the current camera
     */
    startAnimationLoop(getActiveCamera) {
        if (this.isAnimating) {
            return;
        }

        this.isAnimating = true;

        const animate = () => {
            this.rafId = requestAnimationFrame(animate);

            // Update FPS monitor if set
            if (this.fpsMonitor) {
                this.fpsMonitor.update();
            }

            // Update controls if set
            if (this.controls) {
                this.controls.update();
            }

            // Render scene
            const activeCamera = getActiveCamera ? getActiveCamera() : this.camera;
            this.renderer.render(this.scene, activeCamera);
        };

        animate();
        console.log('Animation loop started');
    }

    /**
     * Stop animation loop
     */
    stopAnimationLoop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
        this.isAnimating = false;
        console.log('Animation loop stopped');
    }

    /**
     * Setup WebGL context loss/restore handlers
     */
    setupContextLossRecovery() {
        const contextLostHandler = (event) => {
            event.preventDefault();
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

            // Remove warning message
            const message = document.getElementById('webgl-context-lost-message');
            if (message) {
                message.remove();
            }

            // Re-initialize renderer settings
            this.syncRendererDimensions(this.params.canvasSize, window.devicePixelRatio);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.setClearColor(this.params.bgColor, this.params.transparentBg ? 0 : 1);

            // Trigger texture reloads via callback
            if (this.onContextRestoredCallback) {
                this.onContextRestoredCallback();
            }

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

        this.canvas.addEventListener('webglcontextlost', contextLostHandler);
        this.canvas.addEventListener('webglcontextrestored', contextRestoredHandler);

        console.log('[WebGL] Context loss/restore handlers registered');
    }

    /**
     * Add object to scene
     * @param {THREE.Object3D} object - Object to add
     */
    add(object) {
        this.scene.add(object);
    }

    /**
     * Remove object from scene
     * @param {THREE.Object3D} object - Object to remove
     */
    remove(object) {
        this.scene.remove(object);
    }

    /**
     * Dispose all resources
     */
    dispose() {
        console.log('[SceneManager] Disposing resources...');

        // Stop animation loop
        this.stopAnimationLoop();

        // Dispose environment texture
        if (this.environmentTexture) {
            this.environmentTexture.dispose();
            this.environmentTexture = null;
        }

        // Clear scene
        if (this.scene) {
            this.scene.environment = null;
            this.scene.clear();
        }

        // Dispose renderer
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.forceContextLoss();
        }

        console.log('[SceneManager] Resources disposed');
    }
}
