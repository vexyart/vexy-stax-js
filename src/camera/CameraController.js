// SPDX-License-Identifier: Apache-2.0
// this_file: src/camera/CameraController.js

import * as THREE from 'three';

import {
    CAMERA_DEFAULT_DISTANCE
} from '../core/constants.js';

const TELEPHOTO_FOV = 30;
const ISOMETRIC_POSITION = new THREE.Vector3(500, 500, 500);

function noop() {}

/**
 * CameraController orchestrates camera mode switching, zoom/FOV synchronisation,
 * and viewport recentering logic across perspective and orthographic rigs.
 */
export class CameraController {
    /**
     * @param {Object} options
     * @param {THREE.PerspectiveCamera} options.camera
     * @param {THREE.OrthographicCamera} options.orthoCamera
     * @param {{ object: THREE.Camera, target: THREE.Vector3, update: Function, enabled?: boolean }} options.controls
     * @param {Record<string, any>} options.params
     * @param {Array} options.imageStack
     * @param {{ refresh?: Function }} [options.pane]
     * @param {{ info?: Function, warn?: Function, error?: Function }} [options.logCamera]
     * @param {(reason: string) => void} [options.emitCameraUpdated]
     * @param {(mode: string) => void} [options.onModeChange]
     */
    constructor(options) {
        if (!options?.camera || !options?.controls || !options?.params) {
            throw new Error('CameraController: missing required dependencies');
        }

        this.camera = options.camera;
        this.orthoCamera = options.orthoCamera ?? options.camera;
        this.controls = options.controls;
        this.params = options.params;
        this.imageStack = options.imageStack ?? [];
        this.pane = options.pane ?? { refresh: noop };
        this.logCamera = options.logCamera ?? { info: noop, warn: noop, error: noop };
        this.emitCameraUpdated = options.emitCameraUpdated ?? noop;
        this.onModeChange = options.onModeChange ?? noop;

        if (typeof this.controls.target?.copy !== 'function') {
            this.controls.target = new THREE.Vector3();
        }

        this.#initialiseMode();
    }

    /**
     * Attach a Tweakpane instance for refresh calls triggered by mode changes.
     * @param {{ refresh?: Function }} pane
     */
    attachPane(pane) {
        this.pane = pane ?? { refresh: noop };
    }

    #initialiseMode() {
        const mode = this.params.cameraMode ?? 'perspective';
        this.params.cameraMode = mode;
        this.controls.object = mode === 'orthographic' || mode === 'isometric' ? this.orthoCamera : this.camera;
    }

    /**
     * Current camera mode string.
     * @returns {string}
     */
    getMode() {
        return this.params.cameraMode ?? 'perspective';
    }

    /**
     * Retrieve the active camera instance based on current mode.
     * @returns {THREE.Camera}
     */
    getActiveCamera() {
        return this.getMode() === 'orthographic' || this.getMode() === 'isometric'
            ? this.orthoCamera
            : this.camera;
    }

    /**
     * Switch the camera mode and synchronise transforms/controls.
     * @param {string} mode
     */
    switchMode(mode) {
        const validModes = new Set(['perspective', 'orthographic', 'isometric', 'telephoto']);
        const nextMode = validModes.has(mode) ? mode : 'perspective';
        this.params.cameraMode = nextMode;
        this.onModeChange(nextMode);
        this.logCamera?.info?.(`Switching to ${nextMode} camera mode`);

        if (nextMode === 'orthographic') {
            this.#configureOrtho({ position: new THREE.Vector3(0, 0, CAMERA_DEFAULT_DISTANCE) });
        } else if (nextMode === 'isometric') {
            this.#configureOrtho({ position: ISOMETRIC_POSITION });
        } else if (nextMode === 'telephoto') {
            this.#configureTelephoto();
        } else {
            this.#configurePerspective();
        }

        this.controls.update?.();
        this.emitCameraUpdated('mode-change');
    }

    #configurePerspective() {
        this.camera.position.set(0, 0, CAMERA_DEFAULT_DISTANCE);
        this.camera.lookAt(0, 0, 0);
        this.camera.zoom = this.params.cameraZoom;
        this.camera.updateProjectionMatrix();
        this.controls.object = this.camera;
    }

    #configureOrtho({ position }) {
        this.orthoCamera.position.copy(position);
        this.orthoCamera.lookAt(0, 0, 0);
        this.orthoCamera.zoom = this.params.cameraZoom;
        this.orthoCamera.updateProjectionMatrix();
        this.controls.object = this.orthoCamera;
    }

    #configureTelephoto() {
        this.params.cameraFOV = TELEPHOTO_FOV;
        this.camera.fov = TELEPHOTO_FOV;
        this.camera.position.set(0, 0, 1500);
        this.camera.lookAt(0, 0, 0);
        this.camera.zoom = this.params.cameraZoom;
        this.camera.updateProjectionMatrix();
        this.controls.object = this.camera;
        this.pane?.refresh?.();
    }

    /**
     * Update zoom level for both cameras and emit downstream notifications.
     * @param {number} zoomValue
     */
    setZoom(zoomValue) {
        this.params.cameraZoom = zoomValue;
        this.camera.zoom = zoomValue;
        this.camera.updateProjectionMatrix();
        this.orthoCamera.zoom = zoomValue;
        this.orthoCamera.updateProjectionMatrix();
        this.logCamera?.info?.(`Zoom updated to ${zoomValue.toFixed?.(1) ?? zoomValue}x`);
        this.emitCameraUpdated('zoom');
    }

    /**
     * Adjust perspective camera FOV when applicable.
     * @param {number} fovValue
     */
    setFOV(fovValue) {
        this.params.cameraFOV = fovValue;
        const mode = this.getMode();
        if (mode === 'perspective' || mode === 'telephoto') {
            this.camera.fov = fovValue;
            this.camera.updateProjectionMatrix();
            this.emitCameraUpdated('fov');
        }
    }

    /**
     * Position cameras at provided coordinates and emit viewpoint update.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    setViewpoint(x, y, z) {
        const position = new THREE.Vector3(x, y, z);
        this.camera.position.copy(position);
        this.camera.lookAt(0, 0, 0);
        this.orthoCamera.position.copy(position);
        this.orthoCamera.lookAt(0, 0, 0);
        this.controls.update?.();
        this.logCamera?.info?.(`Viewpoint set to (${x}, ${y}, ${z})`);
        this.emitCameraUpdated('viewpoint');
    }

    /**
     * Move perspective camera to fit the studio canvas in frame.
     */
    setViewpointFitToFrame() {
        if (!Array.isArray(this.imageStack) || this.imageStack.length === 0) {
            this.setViewpoint(0, 0, 800);
            return;
        }

        const frontSlide = this.imageStack[this.imageStack.length - 1];
        if (!frontSlide?.mesh) {
            this.logCamera?.error?.('No front slide found despite non-empty image stack');
            this.setViewpoint(0, 0, 800);
            return;
        }

        const fovRadians = (this.params.cameraFOV ?? 60) * (Math.PI / 180);
        const canvasHeight = this.params.canvasSize?.y ?? 1080;
        const canvasWidth = this.params.canvasSize?.x ?? 1920;

        const distanceForHeight = (canvasHeight / 2) / Math.tan(fovRadians / 2);
        const aspect = this.camera.aspect || (canvasWidth / canvasHeight);
        const visibleHeightAtDistance = 2 * Math.tan(fovRadians / 2) * distanceForHeight;
        const visibleWidthAtDistance = visibleHeightAtDistance * aspect;
        const distanceForWidth = canvasWidth > visibleWidthAtDistance
            ? (canvasWidth / 2) / (Math.tan(fovRadians / 2) * aspect)
            : distanceForHeight;
        const distance = Math.max(distanceForHeight, distanceForWidth) * 1.05;

        const frontZ = frontSlide.mesh.position.z;
        this.camera.position.set(0, 0, frontZ + distance);
        this.camera.lookAt(0, 0, frontZ);
        this.controls.target.set(0, 0, frontZ);
        this.controls.update?.();
        this.logCamera?.info?.(`Front view: fitted studio canvas ${canvasWidth}×${canvasHeight}px at distance ${distance.toFixed(1)} from slide`);
        this.emitCameraUpdated('viewpoint');
    }

    /**
     * Center the active camera and controls target on the image stack bounds.
     */
    centerOnContent() {
        if (!Array.isArray(this.imageStack) || this.imageStack.length === 0) {
            this.logCamera?.info?.('No content to center on');
            return;
        }

        const box = new THREE.Box3();
        this.imageStack.forEach((entry) => {
            if (entry?.mesh) {
                box.expandByObject(entry.mesh);
            }
        });

        if (box.isEmpty()) {
            this.logCamera?.warn?.('Unable to compute bounding box for centering');
            return;
        }

        const center = new THREE.Vector3();
        box.getCenter(center);

        const activeCamera = this.getActiveCamera();
        const offset = activeCamera.position.clone();
        activeCamera.position.copy(center).add(offset);
        activeCamera.lookAt(center);
        this.controls.target.copy(center);
        this.controls.update?.();
        this.logCamera?.info?.(`Centered view on content at (${center.x.toFixed(1)}, ${center.y.toFixed(1)}, ${center.z.toFixed(1)})`);
        this.emitCameraUpdated('center');
    }
}
