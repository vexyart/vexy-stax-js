// this_file: tests/camera_animation.test.js
/**
 * Test Suite: Camera Animation
 *
 * Purpose: Validates camera animation helpers, including state persistence,
 * front-view computation, and the hero-shot orchestration (camera travel and
 * stack spacing collapse/restore).
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import gsap from 'gsap';

import { CameraAnimator } from '../src/camera/animation.js';

const EPSILON = 1e-6;

function createAnimatorContext() {
    const camera = new THREE.PerspectiveCamera(60, 16 / 9, 0.1, 5000);
    camera.position.set(0, 0, 800);
    camera.updateProjectionMatrix();

    const controls = {
        target: new THREE.Vector3(0, 0, 0),
        enabled: true,
        updateCalls: 0,
        update() {
            this.updateCalls += 1;
        }
    };

    const animator = new CameraAnimator(camera, controls);
    return { animator, camera, controls };
}

function createSlide(width, height, position = new THREE.Vector3()) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    return { width, height, mesh };
}

test('CameraAnimator_saveState_when_called_then_capturesCameraAndControls', () => {
    const { animator, camera, controls } = createAnimatorContext();

    camera.position.set(120, -45, 640);
    controls.target.set(25, 10, -30);
    camera.zoom = 1.35;

    animator.saveState();

    assert.ok(animator.savedState, 'saved state should be created');
    assert.equal(animator.savedState.position.x, 120);
    assert.equal(animator.savedState.position.y, -45);
    assert.equal(animator.savedState.position.z, 640);
    assert.equal(animator.savedState.target.x, 25);
    assert.equal(animator.savedState.target.y, 10);
    assert.equal(animator.savedState.target.z, -30);
    assert.equal(animator.savedState.zoom, 1.35);
});

test('CameraAnimator_restoreState_when_unsaved_then_returnsUndefined', () => {
    const { animator } = createAnimatorContext();
    const result = animator.restoreState();
    assert.equal(result, undefined, 'restoreState should return undefined without prior save');
});

test('CameraAnimator_calculateFrontViewpoint_when_slideHasOffset_then_centresOnBounds', () => {
    const { animator } = createAnimatorContext();
    const slide = createSlide(360, 220, new THREE.Vector3(80, 140, 280));
    const front = animator.calculateFrontViewpoint(slide, { x: 960, y: 540 }, 3);

    assert.ok(front.position instanceof THREE.Vector3, 'position should be a Vector3');
    assert.ok(front.target instanceof THREE.Vector3, 'target should be a Vector3');
    assert.ok(front.position.z > front.target.z, 'camera should sit in front of slide');
    assert.ok(Math.abs(front.position.x - front.target.x) < EPSILON, 'camera X should align with target centre');
    assert.ok(Math.abs(front.position.y - front.target.y) < EPSILON, 'camera Y should align with target centre');
    assert.ok(Math.abs(front.target.x - 80) < EPSILON, 'target should match slide centre X');
    assert.ok(Math.abs(front.target.y - 140) < EPSILON, 'target should match slide centre Y');
    // Target Z is 0 (front slide position), not slide's current Z - slides collapse to origin
    assert.ok(Math.abs(front.target.z - 0) < EPSILON, 'target Z should be 0');
    // collapsePositions is array with positions for each slide (front slide at 0, others offset)
    assert.ok(Array.isArray(front.collapsePositions), 'collapsePositions should be an array');
    assert.equal(front.collapsePositions.length, 3, 'collapsePositions should have 3 entries');
    assert.ok(Math.abs(front.collapsePositions[2]) < EPSILON, 'front slide (index 2) should collapse to 0');
    assert.ok(front.collapsePositions[0] < 0, 'back slide (index 0) should collapse to negative z');
});

test('CameraAnimator_calculateFrontViewpoint_when_slideSizeVaries_then_adjustsDistance', () => {
    const { animator } = createAnimatorContext();
    const small = createSlide(200, 150, new THREE.Vector3(0, 0, 0));
    const large = createSlide(800, 600, new THREE.Vector3(0, 0, 0));

    const frontSmall = animator.calculateFrontViewpoint(small, { x: 960, y: 540 });
    const frontLarge = animator.calculateFrontViewpoint(large, { x: 960, y: 540 });

    const smallDistance = frontSmall.position.z - frontSmall.target.z;
    const largeDistance = frontLarge.position.z - frontLarge.target.z;

    assert.ok(largeDistance > smallDistance, 'larger slide should require greater camera distance');
});

test('CameraAnimator_calculateFrontViewpoint_when_meshMissing_then_throws', () => {
    const { animator } = createAnimatorContext();
    assert.throws(
        () => animator.calculateFrontViewpoint({ width: 200, height: 150 }, { x: 960, y: 540 }),
        /slide mesh missing/i,
        'missing mesh should raise descriptive error'
    );
});

test('CameraAnimator_playHeroShot_when_stackProvided_then_collapsesAndRestoresSpacing', async () => {
    const { animator, camera, controls } = createAnimatorContext();
    const slides = [
        createSlide(240, 180, new THREE.Vector3(-40, 60, 0)),
        createSlide(320, 200, new THREE.Vector3(20, 110, 140))
    ];
    const topSlide = slides[slides.length - 1];
    const originalCameraPosition = camera.position.clone();
    const originalTarget = controls.target.clone();
    const originalZoom = camera.zoom;
    const originalPositions = slides.map(({ mesh }) => mesh.position.z);

    const frontView = animator.calculateFrontViewpoint(topSlide, { x: 960, y: 540 });

    const timelineCalls = [];
    const callbacks = {};
    const originalTimeline = gsap.timeline;
    const originalKillTweensOf = gsap.killTweensOf;

    gsap.killTweensOf = () => {};
    gsap.timeline = () => {
        return {
            to(target, vars, position) {
                timelineCalls.push({ target, vars: { ...vars }, position });
                return this;
            },
            eventCallback(event, callback) {
                callbacks[event] = callback;
                return this;
            },
            kill() {
                callbacks.killed = true;
                return this;
            }
        };
    };

    try {
        const animationPromise = animator.playHeroShot({
            topSlide,
            canvasSize: { x: 960, y: 540 },
            duration: 0.2,
            easing: 'linear',
            imageStack: slides,
            holdTime: 0.05
        });

        callbacks.onUpdate?.();
        callbacks.onComplete?.();
        await animationPromise;

        const cameraTweens = timelineCalls.filter(({ target }) => target === camera.position);
        assert.equal(cameraTweens.length, 2, 'camera should tween forward and return');
        assert.ok(Math.abs(cameraTweens[0].vars.x - frontView.position.x) < EPSILON, 'forward camera tween X should match front view');
        assert.ok(Math.abs(cameraTweens[0].vars.y - frontView.position.y) < EPSILON, 'forward camera tween Y should match front view');
        assert.ok(Math.abs(cameraTweens[1].vars.x - originalCameraPosition.x) < EPSILON, 'return camera tween X should restore original');

        const meshPositions = slides.map(({ mesh }) => mesh.position);
        const meshTweens = timelineCalls.filter(({ target }) => meshPositions.includes(target));
        slides.forEach(({ mesh }, index) => {
            const collapseTweens = meshTweens.filter(({ target, vars }) =>
                target === mesh.position && Math.abs(vars.z - frontView.target.z) < EPSILON
            );
            assert.ok(collapseTweens.length >= 1, `slide ${index} should have tween collapsing to front target`);
        });
        slides.forEach(({ mesh }, index) => {
            assert.ok(Math.abs(mesh.position.z - originalPositions[index]) < EPSILON, 'slide should return to original spacing');
        });

        assert.equal(animator.isAnimating, false, 'animator should reset animation flag');
        assert.equal(controls.enabled, true, 'controls should be re-enabled after animation');
        assert.equal(camera.zoom, originalZoom, 'camera zoom should remain unchanged');
        assert.ok(camera.position.distanceTo(originalCameraPosition) < EPSILON, 'camera should end at original position');
        assert.ok(controls.target.distanceTo(originalTarget) < EPSILON, 'controls target should be restored');
        assert.ok(controls.updateCalls > 0, 'controls.update should be called during animation');
    } finally {
        gsap.timeline = originalTimeline;
        gsap.killTweensOf = originalKillTweensOf;
    }
});
