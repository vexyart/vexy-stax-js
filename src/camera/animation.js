// this_file: vexy-stax-js/src/camera/animation.js

import gsap from 'gsap';
import * as THREE from 'three';

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
   * @param {Object} topSlide - The mesh of the top slide
   * @param {Object} canvasSize - Studio canvas size {x, y}
   * @returns {Object} { position: Vector3, target: Vector3 }
   */
  calculateFrontViewpoint(topSlide, canvasSize) {
    // Get slide dimensions and position
    const slideHeight = topSlide.height;
    const slideWidth = topSlide.width;
    const slideZ = topSlide.mesh.position.z;

    // Calculate based on studio frame aspect ratio
    const aspect = canvasSize.x / canvasSize.y;
    const fov = this.camera.fov * (Math.PI / 180);

    // Calculate distance needed to fit slide height in frame
    const distanceForHeight = (slideHeight / 2) / Math.tan(fov / 2);

    // Calculate distance needed to fit slide width in frame
    const frameWidth = slideHeight * aspect;
    const distanceForWidth = slideWidth > frameWidth ?
        (slideWidth / 2) / Math.tan(fov / 2) * (slideWidth / frameWidth) :
        distanceForHeight;

    // Use the larger distance with padding
    const distance = Math.max(distanceForHeight, distanceForWidth) * 1.1;

    // Front view: camera directly in front of slide
    const position = new THREE.Vector3(0, 0, slideZ + distance);
    const target = new THREE.Vector3(0, 0, slideZ);

    return { position, target };
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
  async playHeroShot({ topSlide, canvasSize, duration = 1.5, easing = "power2.inOut" }) {
    return new Promise((resolve, reject) => {
      try {
        // Validation checks
        if (this.isAnimating) {
          console.warn('Animation already in progress');
          reject(new Error('Animation already in progress'));
          return;
        }

        if (!topSlide) {
          console.error('No top slide provided for hero shot');
          reject(new Error('No top slide provided'));
          return;
        }

        if (!canvasSize) {
          console.error('No canvas size provided for hero shot');
          reject(new Error('No canvas size provided'));
          return;
        }

        // Mark animation as started
        this.isAnimating = true;
        this.controls.enabled = false;

        // Calculate Front viewpoint position
        let frontPos;
        try {
          frontPos = this.calculateFrontViewpoint(topSlide, canvasSize);
        } catch (calcError) {
          console.error('Failed to calculate Front viewpoint:', calcError);
          this.cleanup();
          reject(new Error('Failed to calculate camera position'));
          return;
        }

        // Create animation timeline
        const timeline = gsap.timeline();

        // Tween from current position to Front viewpoint
        timeline.to(this.camera.position, {
          x: frontPos.position.x,
          y: frontPos.position.y,
          z: frontPos.position.z,
          duration: duration,
          ease: easing,
        });

        timeline.to(this.controls.target, {
          x: frontPos.target.x,
          y: frontPos.target.y,
          z: frontPos.target.z,
          duration: duration,
          ease: easing,
        }, "<"); // Start at same time as camera position

        // Set up completion and error handlers
        timeline.eventCallback('onComplete', () => {
          this.cleanup();
          resolve();
        });

        timeline.eventCallback('onInterrupt', () => {
          console.log('Animation interrupted');
          this.cleanup();
          reject(new Error('Animation interrupted'));
        });

      } catch (error) {
        console.error('Unexpected error in playHeroShot:', error);
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
  }

  /**
   * Cancel current animation and restore state
   */
  cancel() {
    if (!this.isAnimating) return;

    try {
      // Kill all active tweens
      gsap.killTweensOf(this.camera.position);
      gsap.killTweensOf(this.controls.target);

      // Restore camera state
      const restored = this.restoreState();
      if (restored) {
        this.camera.position.copy(restored.position);
        this.controls.target.copy(restored.target);
      }
    } catch (error) {
      console.error('Error during animation cancellation:', error);
    } finally {
      // Always cleanup, even if errors occur
      this.cleanup();
    }
  }
}
