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
   * Calculate hero position for the top slide in the stack
   * @param {Object} topSlide - The mesh of the top slide
   * @returns {Object} { position: Vector3, target: Vector3 }
   */
  calculateHeroPosition(topSlide) {
    // Get bounding box of top slide
    const box = new THREE.Box3().setFromObject(topSlide);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Calculate camera distance to fit the slide in viewport
    // Account for FOV and add padding (1.2x multiplier)
    const fov = this.camera.fov * (Math.PI / 180);
    const maxDim = Math.max(size.x, size.y);
    const distance = (maxDim / 2 / Math.tan(fov / 2)) * 1.2;

    // Position camera in front of the slide
    const position = new THREE.Vector3(
      center.x,
      center.y,
      center.z + distance
    );

    return { position, target: center };
  }

  /**
   * Play hero shot animation
   * Tweens camera to top slide, holds, then returns
   *
   * @param {Object} params - Animation parameters
   * @param {Object} params.topSlide - The top slide mesh
   * @param {number} params.duration - Tween duration in seconds (default: 1.5)
   * @param {number} params.holdTime - Hold time at hero position (default: 1.0)
   * @param {string} params.easing - GSAP easing function (default: "power2.inOut")
   * @returns {Promise} Resolves when animation completes
   */
  async playHeroShot({ topSlide, duration = 1.5, holdTime = 1.0, easing = "power2.inOut" }) {
    if (this.isAnimating) {
      console.warn('Animation already in progress');
      return;
    }

    if (!topSlide) {
      console.error('No top slide provided for hero shot');
      return;
    }

    this.isAnimating = true;
    this.controls.enabled = false;

    // Save current state
    this.saveState();

    // Calculate hero position
    const heroPos = this.calculateHeroPosition(topSlide);

    // Create animation timeline
    const timeline = gsap.timeline();

    // Tween to hero position
    timeline.to(this.camera.position, {
      x: heroPos.position.x,
      y: heroPos.position.y,
      z: heroPos.position.z,
      duration: duration,
      ease: easing,
    });

    timeline.to(this.controls.target, {
      x: heroPos.target.x,
      y: heroPos.target.y,
      z: heroPos.target.z,
      duration: duration,
      ease: easing,
    }, "<"); // Start at same time as camera position

    // Hold at hero position
    timeline.to({}, { duration: holdTime });

    // Get restored state
    const restored = this.restoreState();

    // Tween back to original
    timeline.to(this.camera.position, {
      x: restored.position.x,
      y: restored.position.y,
      z: restored.position.z,
      duration: duration,
      ease: easing,
    });

    timeline.to(this.controls.target, {
      x: restored.target.x,
      y: restored.target.y,
      z: restored.target.z,
      duration: duration,
      ease: easing,
      onComplete: () => {
        // Re-enable controls after animation
        this.controls.enabled = true;
        this.isAnimating = false;
      }
    }, "<");

    // Return promise that resolves when animation completes
    return new Promise((resolve) => {
      timeline.eventCallback('onComplete', resolve);
    });
  }

  /**
   * Cancel current animation and restore state
   */
  cancel() {
    if (!this.isAnimating) return;

    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.controls.target);

    const restored = this.restoreState();
    if (restored) {
      this.camera.position.copy(restored.position);
      this.controls.target.copy(restored.target);
    }

    this.controls.enabled = true;
    this.isAnimating = false;
  }
}
