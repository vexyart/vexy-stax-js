// SPDX-License-Identifier: Apache-2.0
// Copyright 2025 Adam Twardoch / VexyArt
// this_file: vexy-stax-js/src/camera/animation.js

import gsap from 'gsap';
import * as THREE from 'three';

import { DEFAULT_CANVAS_SIZE, CAMERA_MIN_DISTANCE } from '../core/constants.js';

// Strict fit: 1.0 = slide fills canvas exactly, no padding
const FRONT_VIEW_PADDING = 1.0;
const DEFAULT_HOLD_RATIO = 0.35;
// Tiny gap between slides to prevent z-fighting when collapsed
const MIN_SLIDE_GAP = 0.5;

/**
 * Handles camera animations for Vexy Stax
 * Provides smooth, GSAP-powered camera tweens for hero shots and transitions
 */
export class CameraAnimator {
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;
    this.isAnimating = false;
    this.savedState = null;
    this.timeline = null;
    this.activeAnimation = null;
  }

  /**
   * Save current camera and controls state
   */
  saveState() {
    this.savedState = {
      position: this.camera.position.clone(),
      target: this.controls.target.clone(),
      zoom: this.camera.zoom,
    };
  }

  /**
   * Restore saved camera state
   */
  restoreState() {
    if (!this.savedState) return;
    return {
      position: this.savedState.position.clone(),
      target: this.savedState.target.clone(),
      zoom: this.savedState.zoom,
    };
  }

  /**
   * Calculate Front viewpoint position for the top slide
   * Fits the frontmost slide within the studio frame
   * Accounts for both FOV and camera zoom (Tele) in distance calculation
   * @param {Object} topSlide - The mesh of the top slide
   * @param {Object} canvasSize - Studio canvas size {x, y}
   * @param {number} slideCount - Total number of slides (for calculating collapse positions)
   * @returns {Object} { position: Vector3, target: Vector3, collapsePositions: number[] }
   */
  calculateFrontViewpoint(topSlide, canvasSize, slideCount = 1) {
    if (!topSlide?.mesh) {
      throw new Error('calculateFrontViewpoint: slide mesh missing');
    }

    const box = new THREE.Box3().setFromObject(topSlide.mesh);
    if (box.isEmpty()) {
      throw new Error('calculateFrontViewpoint: slide bounds empty');
    }

    // Get slide center and dimensions
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const width = size.x || 1;
    const height = size.y || 1;

    // Calculate collapse positions with tiny gaps to prevent z-fighting
    // Front slide (highest index) at z=0, others spaced behind with MIN_SLIDE_GAP
    const collapsePositions = [];
    for (let i = 0; i < slideCount; i++) {
      // Back slides have lower z values (negative direction from front)
      const offset = (slideCount - 1 - i) * MIN_SLIDE_GAP;
      collapsePositions.push(-offset);
    }

    // Target is at origin (front slide collapse position)
    const target = new THREE.Vector3(center.x, center.y, 0);

    const widthPx = canvasSize?.x ?? DEFAULT_CANVAS_SIZE.x;
    const heightPx = canvasSize?.y ?? DEFAULT_CANVAS_SIZE.y;
    const aspect = widthPx / heightPx;
    const fov = (this.camera.fov ?? 60) * (Math.PI / 180);
    const zoom = this.camera.zoom ?? 1.0;

    // Account for zoom: effective FOV = 2 * atan(tan(fov/2) / zoom)
    // This means with higher zoom, we see less (narrower FOV), so need more distance
    const halfVerticalTan = Math.max(Math.tan(fov / 2) / zoom, 1e-6);
    const horizontalFov = 2 * Math.atan(halfVerticalTan * aspect);
    const halfHorizontalTan = Math.max(Math.tan(horizontalFov / 2), 1e-6);

    // Calculate distance to fit the larger dimension of the slide to the canvas
    const distanceForHeight = (height / 2) / halfVerticalTan;
    const distanceForWidth = (width / 2) / halfHorizontalTan;
    const distance = Math.max(distanceForHeight, distanceForWidth, CAMERA_MIN_DISTANCE) * FRONT_VIEW_PADDING;

    // Position camera directly in front of collapsed stack at target's X, Y
    const position = new THREE.Vector3(center.x, center.y, distance);

    return { position, target, collapsePositions };
  }

  /**
   * Play hero shot animation
   * Animates camera from current position to Front viewpoint
   *
   * @param {Object} params - Animation parameters
   * @param {Object} params.topSlide - The top slide data object
   * @param {Object} params.canvasSize - Studio canvas size {x, y}
   * @param {number} params.duration - Tween duration in seconds (default: 1.5)
   * @param {string} params.easing - GSAP easing function (default: "power2.inOut")
   * @returns {Promise} Resolves when animation completes, rejects on error
   */
  async playHeroShot({
    topSlide,
    canvasSize,
    duration = 1.5,
    easing = 'power2.inOut',
    imageStack = [],
    holdTime
  }) {
    return new Promise((resolve, reject) => {
      if (this.isAnimating) {
        reject(new Error('Animation already in progress'));
        return;
      }

      if (!topSlide?.mesh) {
        reject(new Error('No top slide provided'));
        return;
      }

      const slideCount = Array.isArray(imageStack) ? imageStack.length : 1;

      let frontPos;
      try {
        frontPos = this.calculateFrontViewpoint(topSlide, canvasSize, slideCount);
      } catch (error) {
        reject(error);
        return;
      }

      this.saveState();
      const originalState = this.restoreState();

      const stackEntries = Array.isArray(imageStack)
        ? imageStack
            .map((entry, index) => (entry?.mesh ? {
              mesh: entry.mesh,
              originalZ: entry.mesh.position?.z ?? 0,
              collapseZ: frontPos.collapsePositions[index] ?? 0
            } : null))
            .filter(Boolean)
        : [];

      const resolvedHold = typeof holdTime === 'number' && holdTime >= 0
        ? holdTime
        : Math.min(Math.max(duration * DEFAULT_HOLD_RATIO, 0.3), 2);

      const restoreStackImmediate = () => {
        stackEntries.forEach(({ mesh, originalZ }) => {
          if (mesh?.position) {
            mesh.position.z = originalZ;
          }
        });
      };

      const restoreCameraInstant = () => {
        if (!originalState) {
          return;
        }
        this.camera.position.copy(originalState.position);
        this.controls.target.copy(originalState.target);
        this.camera.zoom = originalState.zoom;
        if (typeof this.camera.updateProjectionMatrix === 'function') {
          this.camera.updateProjectionMatrix();
        }
        this.controls.update?.();
      };

      try {
        this.isAnimating = true;
        this.controls.enabled = false;
        this.activeAnimation = { stackEntries, originalState };

        const timeline = gsap.timeline();
        this.timeline = timeline;

        timeline.to(this.camera.position, {
          x: frontPos.position.x,
          y: frontPos.position.y,
          z: frontPos.position.z,
          duration,
          ease: easing
        });

        timeline.to(this.controls.target, {
          x: frontPos.target.x,
          y: frontPos.target.y,
          z: frontPos.target.z,
          duration,
          ease: easing
        }, '<');

        // Animate each slide to its collapse position (with tiny gaps to prevent z-fighting)
        stackEntries.forEach(({ mesh, collapseZ }) => {
          timeline.to(mesh.position, {
            z: collapseZ,
            duration,
            ease: easing
          }, '<');
        });

        timeline.to({}, { duration: resolvedHold });

        if (originalState) {
          timeline.to(this.camera.position, {
            x: originalState.position.x,
            y: originalState.position.y,
            z: originalState.position.z,
            duration,
            ease: easing
          });

          timeline.to(this.controls.target, {
            x: originalState.target.x,
            y: originalState.target.y,
            z: originalState.target.z,
            duration,
            ease: easing
          }, '<');
        }

        stackEntries.forEach(({ mesh, originalZ }) => {
          timeline.to(mesh.position, {
            z: originalZ,
            duration,
            ease: easing
          }, '<');
        });

        timeline.eventCallback('onUpdate', () => {
          this.controls.update?.();
        });

        timeline.eventCallback('onComplete', () => {
          restoreStackImmediate();
          restoreCameraInstant();
          this.cleanup();
          resolve();
        });

        timeline.eventCallback('onInterrupt', () => {
          restoreStackImmediate();
          restoreCameraInstant();
          this.cleanup();
          reject(new Error('Animation interrupted'));
        });
      } catch (error) {
        restoreStackImmediate();
        restoreCameraInstant();
        this.cleanup();
        reject(error);
      }
    });
  }

  /**
   * Cleanup animation state (always re-enable controls)
   * @private
   */
  cleanup() {
    this.controls.enabled = true;
    this.isAnimating = false;
    this.timeline = null;
    this.activeAnimation = null;
  }

  /**
   * Cancel current animation and restore state
   */
  cancel() {
    if (!this.isAnimating) return;

    try {
      if (this.timeline?.kill) {
        this.timeline.eventCallback?.('onComplete', null);
        this.timeline.eventCallback?.('onInterrupt', null);
        this.timeline.kill();
      } else {
        gsap.killTweensOf(this.camera.position);
        gsap.killTweensOf(this.controls.target);
      }

      const originalState = this.activeAnimation?.originalState ?? this.restoreState();
      if (originalState) {
        this.camera.position.copy(originalState.position);
        this.controls.target.copy(originalState.target);
        this.camera.zoom = originalState.zoom;
        if (typeof this.camera.updateProjectionMatrix === 'function') {
          this.camera.updateProjectionMatrix();
        }
      }

      if (this.activeAnimation?.stackEntries) {
        this.activeAnimation.stackEntries.forEach(({ mesh, originalZ }) => {
          if (mesh?.position) {
            mesh.position.z = originalZ;
          }
        });
      }

      this.controls.update?.();
    } catch (error) {
      console.error('Error during animation cancellation:', error);
    } finally {
      // Always cleanup, even if errors occur
      this.cleanup();
    }
  }
}
