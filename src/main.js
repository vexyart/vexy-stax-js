// src/main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';
import { CameraAnimator } from './camera/animation.js';

// Scene, Camera, Renderer
let scene, camera, orthoCamera, renderer, controls;
let canvas;
let cameraMode = 'perspective'; // 'perspective', 'orthographic', 'isometric'
let cameraAnimator; // Camera animation system

// Image stack management
let imageStack = [];

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

// Parameters
const params = {
    zSpacing: 100,
    bgColor: '#000000',
    cameraMode: 'perspective',
    cameraFOV: 75,
    cameraZoom: 1.0,  // Unified zoom parameter (1.0 = default)
    transparentBg: false,
    // Material properties
    materialRoughness: 0.7,
    materialMetalness: 0.1,
    materialThickness: 1.0,  // Depth multiplier (1.0 = thin plane)
    materialBorderWidth: 0,  // Border width in pixels
    materialBorderColor: '#ffffff',
    // Animation properties
    animDuration: 1.5,  // Tween duration in seconds
    animHoldTime: 1.0,  // Hold time at hero position
    animEasing: 'power2.inOut'  // GSAP easing function
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

    // Create renderer with shadows and transparency support
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,  // Enable transparency
        preserveDrawingBuffer: true  // Needed for export
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

function setupLighting() {
    // Ambient light for overall scene illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main directional light (sun-like) with shadows
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;

    // Configure shadow properties
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 500;
    mainLight.shadow.camera.left = -500;
    mainLight.shadow.camera.right = 500;
    mainLight.shadow.camera.top = 500;
    mainLight.shadow.camera.bottom = -500;

    scene.add(mainLight);

    // Fill light from opposite side for softer shadows
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    console.log('Lighting setup complete');
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
    window.addEventListener('keydown', (e) => {
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
    });

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
            const duration = config.duration || params.animDuration;
            const holdTime = config.holdTime || params.animHoldTime;
            const easing = config.easing || params.animEasing;

            console.log(`[API] Playing hero shot animation (duration: ${duration}s, hold: ${holdTime}s, easing: ${easing})`);

            try {
                await cameraAnimator.playHeroShot({
                    topSlide,
                    duration,
                    holdTime,
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
                scene.clear();
            }

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

    window.addEventListener('resize', debouncedResize);
    console.log(`[Resize] Debounced resize handler registered (${DEBOUNCE_DELAY}ms delay)`);
}

/**
 * Setup WebGL context loss/restore handlers for graceful GPU reset recovery
 */
function setupContextLossRecovery() {
    const canvas = renderer.domElement;

    canvas.addEventListener('webglcontextlost', (event) => {
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
    });

    canvas.addEventListener('webglcontextrestored', () => {
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
    });

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

    console.log('Tweakpane created successfully');

    // Camera settings folder
    const cameraFolder = pane.addFolder({
        title: 'Camera',
        expanded: true
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

    // Z-spacing slider
    pane.addBinding(params, 'zSpacing', {
        label: 'Z-Spacing',
        min: 0,
        max: 500,
        step: 10
    }).on('change', (ev) => {
        updateZSpacing(ev.value);
        saveSettings();
    });

    // Background color
    pane.addBinding(params, 'bgColor', {
        label: 'Background'
    }).on('change', (ev) => {
        updateBackground();
        saveSettings();
    });

    // Transparent background toggle
    pane.addBinding(params, 'transparentBg', {
        label: 'Transparent BG'
    }).on('change', (ev) => {
        updateBackground();
        saveSettings();
    });

    // Viewpoint presets folder
    const viewFolder = pane.addFolder({
        title: 'Viewpoints'
    });

    viewFolder.addButton({ title: 'Center' }).on('click', centerViewOnContent);

    viewFolder.addButton({ title: 'Front' }).on('click', () => {
        setViewpoint(0, 0, 800);
    });

    viewFolder.addButton({ title: 'Top' }).on('click', () => {
        setViewpoint(0, 800, 100);
    });

    viewFolder.addButton({ title: 'Isometric' }).on('click', () => {
        setViewpoint(500, 500, 500);
    });

    viewFolder.addButton({ title: '3D Stack View' }).on('click', () => {
        setViewpoint(400, 300, 600);
    });

    viewFolder.addButton({ title: 'Side' }).on('click', () => {
        setViewpoint(800, 0, 0);
    });

    // Animation folder
    const animFolder = pane.addFolder({
        title: 'Animation',
        expanded: false
    });

    animFolder.addButton({ title: 'Play Hero Shot' }).on('click', async () => {
        if (imageStack.length === 0) {
            showToast('No images loaded', 'error');
            return;
        }

        const topSlide = imageStack[imageStack.length - 1];
        if (!topSlide) {
            showToast('No top slide found', 'error');
            return;
        }

        showToast('Playing hero shot animation...', 'info');

        try {
            await cameraAnimator.playHeroShot({
                topSlide: topSlide,
                duration: params.animDuration,
                holdTime: params.animHoldTime,
                easing: params.animEasing
            });
            showToast('Animation complete', 'success');
        } catch (error) {
            console.error('Animation error:', error);
            showToast('Animation failed', 'error');
        }
    });

    animFolder.addBinding(params, 'animDuration', {
        label: 'Duration',
        min: 0.5,
        max: 5.0,
        step: 0.1
    }).on('change', saveSettings);

    animFolder.addBinding(params, 'animHoldTime', {
        label: 'Hold Time',
        min: 0,
        max: 3.0,
        step: 0.1
    }).on('change', saveSettings);

    animFolder.addBinding(params, 'animEasing', {
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

    // Export folder with compact layout
    const exportFolder = pane.addFolder({
        title: 'Export'
    });

    // PNG exports row
    const pngRow = exportFolder.addFolder({ title: 'PNG', expanded: false });
    pngRow.addButton({ title: '1x' }).on('click', exportPNG);
    pngRow.addButton({ title: '2x' }).on('click', () => exportPNG(2));
    pngRow.addButton({ title: '4x' }).on('click', () => exportPNG(4));

    // JSON operations row
    const jsonRow = exportFolder.addFolder({ title: 'JSON', expanded: false });
    jsonRow.addButton({ title: 'Export' }).on('click', exportJSON);
    jsonRow.addButton({ title: 'Import' }).on('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => importJSON(e.target.files[0]);
        input.click();
    });
    jsonRow.addButton({ title: 'Copy' }).on('click', copyJSON);
    jsonRow.addButton({ title: 'Paste' }).on('click', pasteJSON);

    // Materials folder
    const materialsFolder = pane.addFolder({
        title: 'Materials',
        expanded: false
    });

    materialsFolder.addButton({ title: 'Flat Matte' }).on('click', () => {
        applyMaterialPreset({ roughness: 1.0, metalness: 0, thickness: 1, borderWidth: 0 });
    });

    materialsFolder.addButton({ title: 'Glossy Photo' }).on('click', () => {
        applyMaterialPreset({ roughness: 0.1, metalness: 0, thickness: 1, borderWidth: 0 });
    });

    materialsFolder.addButton({ title: 'Plastic Card' }).on('click', () => {
        applyMaterialPreset({ roughness: 0.4, metalness: 0.1, thickness: 2, borderWidth: 0 });
    });

    materialsFolder.addButton({ title: 'Thick Board' }).on('click', () => {
        applyMaterialPreset({ roughness: 0.9, metalness: 0, thickness: 8, borderWidth: 0 });
    });

    materialsFolder.addButton({ title: 'Metal Sheet' }).on('click', () => {
        applyMaterialPreset({ roughness: 0.2, metalness: 0.8, thickness: 1, borderWidth: 0 });
    });

    materialsFolder.addButton({ title: 'Glass Slide' }).on('click', () => {
        applyMaterialPreset({ roughness: 0.05, metalness: 0, thickness: 1, borderWidth: 0 });
    });

    materialsFolder.addButton({ title: 'Matte Print' }).on('click', () => {
        applyMaterialPreset({ roughness: 0.7, metalness: 0, thickness: 1, borderWidth: 0 });
    });

    materialsFolder.addButton({ title: 'Bordered' }).on('click', () => {
        applyMaterialPreset({ roughness: 0.2, metalness: 0, thickness: 1, borderWidth: 20 });
    });

    materialsFolder.addButton({ title: '3D Box' }).on('click', () => {
        applyMaterialPreset({ roughness: 0.6, metalness: 0, thickness: 15, borderWidth: 0 });
    });

    // Actions
    pane.addButton({ title: 'Reset to Defaults' }).on('click', () => {
        if (confirm('Reset all settings to defaults? This will clear saved preferences.')) {
            resetSettings();
        }
    });
    pane.addButton({ title: 'Clear All' }).on('click', clearAll);
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
    const dropZone = document.getElementById('drop-zone');

    // File input change
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileDrop(files);
        }
    });
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

        // Create new material with updated properties
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            roughness: params.materialRoughness,
            metalness: params.materialMetalness
        });

        // Create new mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
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
            const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
            borderMesh.position.z = -0.5;
            borderMesh.castShadow = true;
            borderMesh.receiveShadow = true;
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
    const maxSizeWarn = 10 * 1024 * 1024; // 10MB warning threshold
    const maxSizeReject = 50 * 1024 * 1024; // 50MB rejection threshold

    if (file.size > maxSizeReject) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        console.error(`File ${file.name} is too large (${sizeMB}MB). Maximum size is 50MB.`);
        showToast(`❌ File too large: ${file.name} (${sizeMB}MB). Max: 50MB`, 'error', 5000);
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
        const MAX_RETRIES = 3;
        const RETRY_DELAYS = [500, 1500, 3000]; // Exponential backoff in ms

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            dataURL,
            function(texture) {
                // Success callback
                // Validate image dimensions
                const img = texture.image;
                const maxDimension = 4096;

                if (img.width > maxDimension || img.height > maxDimension) {
                    console.warn(`Warning: Image ${filename} has large dimensions (${img.width}x${img.height}). Max recommended: ${maxDimension}px.`);
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
                if (attempt < MAX_RETRIES) {
                    const delay = RETRY_DELAYS[attempt];
                    console.warn(`[Retry] Failed to load ${filename} (attempt ${attempt + 1}/${MAX_RETRIES + 1}). Retrying in ${delay}ms...`, error);

                    setTimeout(() => {
                        loadTextureWithRetry(dataURL, filename, attempt + 1);
                    }, delay);
                } else {
                    // All retries exhausted
                    console.error(`[Retry] Failed to load ${filename} after ${MAX_RETRIES + 1} attempts:`, error);
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

    // Use MeshStandardMaterial with current material settings
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        roughness: params.materialRoughness,
        metalness: params.materialMetalness
    });

    // Create main mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Add border if enabled
    let borderMesh = null;
    if (params.materialBorderWidth > 0) {
        const borderWidth = planeWidth + params.materialBorderWidth * 2;
        const borderHeight = planeHeight + params.materialBorderWidth * 2;
        const borderGeometry = new THREE.PlaneGeometry(borderWidth, borderHeight);
        const borderMaterial = new THREE.MeshStandardMaterial({
            color: params.materialBorderColor,
            side: THREE.DoubleSide,
            roughness: params.materialRoughness,
            metalness: params.materialMetalness
        });
        borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
        borderMesh.position.z = -0.5; // Slightly behind the image
        borderMesh.castShadow = true;
        borderMesh.receiveShadow = true;
        mesh.add(borderMesh);
    }

    // Position along Z-axis
    const zPosition = imageStack.length * params.zSpacing;
    mesh.position.z = zPosition;

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

                    const material = new THREE.MeshStandardMaterial({
                        map: texture,
                        side: THREE.DoubleSide,
                        transparent: true,
                        roughness: 0.7,
                        metalness: 0.1
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
