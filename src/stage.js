// SPDX-License-Identifier: Apache-2.0
// this_file: src/stage.js
//
// three.js stage: builds plates (PlaneGeometry + texture, bottom-aligned,
// centered, MeshBasicMaterial), a floor plane, and a perspective camera.
// Reduced to the two views (expanded/compact) per SPEC.md §3, consuming
// geometry.js for camera/spacing/opacity. Adapted from
// vexy-stax-old/vexy-stax-js (SceneComposition + FloorManager + camera),
// stripped of the editor UI.

import * as THREE from "three";

import {
  compactCamera,
  expandedCamera,
  plateGaps,
  stackDepth,
  MIN_GAP,
} from "./geometry.js";
import { resolvedOpacity } from "./scene.js";

/** Caption fade factor for a slide+view, given the morph factor t (0=compact,1=expanded). */
function captionFade(caption, t) {
  if (!caption) return 0;
  switch (caption.show_in) {
    case "both":
      return 1;
    case "none":
      return 0;
    case "compact":
      return 1 - t; // visible in compact, fades out as deck expands
    case "expanded":
    default:
      return t; // visible in expanded, fades in as deck expands
  }
}

/**
 * Build a canvas-texture sprite for caption text. Rendered upright (a Sprite
 * always faces the camera) and placed beneath its plate. Text is drawn left→right
 * so it reads correctly (never mirrored).
 */
function makeCaptionSprite(text, style) {
  const size = style?.size ?? 28;
  const color = style?.color ?? "#222222";
  const font = style?.font ?? "sans-serif";
  const dpr = 2; // crisper text
  const pxFont = `${size * dpr}px ${font}`;
  const pad = size * dpr * 0.4;

  const measureCanvas = document.createElement("canvas");
  const mctx = measureCanvas.getContext("2d");
  mctx.font = pxFont;
  const textW = Math.ceil(mctx.measureText(text).width);
  const canvasW = Math.max(1, textW + pad * 2);
  const canvasH = Math.ceil(size * dpr * 1.6);

  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d");
  ctx.font = pxFont;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, canvasW / 2, canvasH / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(material);
  // World size in scene points: scale to the caption pixel size (1px ≈ 1pt) so it
  // is legible relative to the plates. Preserve the canvas aspect ratio.
  const worldH = size * 2.2;
  const worldW = worldH * (canvasW / canvasH);
  sprite.scale.set(worldW, worldH, 1);
  return { sprite, material };
}

/** Load a texture from a URL/data-URI, resolving once decoded. */
function loadTexture(loader, src) {
  return new Promise((resolve, reject) => {
    loader.load(
      src,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        resolve(texture);
      },
      undefined,
      (err) => reject(new Error(`Failed to load texture: ${src} (${err?.message ?? err})`))
    );
  });
}

export class Stage {
  /**
   * @param {HTMLElement} container
   * @param {object} scene normalized scene (from loadScene)
   */
  constructor(container, scene) {
    this.container = container;
    this.scene = scene;
    this.plates = []; // { mesh, width, height, slide, caption? }
    this.captions = []; // { sprite, material, plateIndex }
    this.view = scene.view;
    this._disposed = false;
  }

  /** Build renderer, scene graph, camera, floor, and load all plate textures. */
  async init() {
    const width = this.container.clientWidth || this.scene.size.width;
    const height = this.container.clientHeight || this.scene.size.height;

    this.threeScene = new THREE.Scene();
    this.threeScene.background = new THREE.Color(this.scene.background);

    this.camera = new THREE.PerspectiveCamera(
      this.scene.camera.fov,
      width / height,
      1,
      1_000_000
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(typeof window !== "undefined" ? window.devicePixelRatio : 1);
    this.renderer.setSize(width, height, false);
    this.container.appendChild(this.renderer.domElement);

    await this._buildPlates();
    this._buildFloor();
    this._buildCaptions();
    this.setView(this.view);

    return this;
  }

  async _buildPlates() {
    const loader = new THREE.TextureLoader();
    const textures = await Promise.all(this.scene.slides.map((s) => loadTexture(loader, s.src)));
    const reflectivity = this.scene.floor.reflectivity;

    textures.forEach((texture, i) => {
      const w = texture.image.width;
      const h = texture.image.height;
      const geometry = new THREE.PlaneGeometry(w, h);
      // DoubleSide so the front face reads un-mirrored from +Z and the plate stays
      // visible when the expanded camera orbits behind it.
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      this.threeScene.add(mesh);

      // Mirror copy below the floor line for the floor reflection (matches the
      // pygfx engine): scaled (1,-1,1), opacity = plate opacity * reflectivity,
      // rendered behind the floor (renderOrder -1).
      let reflection = null;
      if (reflectivity > 0) {
        const reflMat = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: reflectivity,
        });
        reflection = new THREE.Mesh(geometry.clone(), reflMat);
        reflection.scale.y = -1;
        reflection.renderOrder = -1;
        this.threeScene.add(reflection);
      }

      this.plates.push({ mesh, reflection, width: w, height: h, slide: this.scene.slides[i] });
    });
  }

  /** Build a caption sprite under each plate that declares one (best-effort). */
  _buildCaptions() {
    if (typeof document === "undefined") return; // no canvas → skip captions
    const defaults = this.scene.caption_defaults ?? null;
    this.plates.forEach((plate, i) => {
      const caption = plate.slide.caption;
      if (!caption) return;
      const style = { ...(defaults ?? {}), ...(caption.style ?? {}) };
      const { sprite, material } = makeCaptionSprite(caption.text, style);
      this.threeScene.add(sprite);
      this.captions.push({ sprite, material, plateIndex: i, caption });
    });
  }

  _tallestHeight() {
    return this.plates.reduce((m, p) => Math.max(m, p.height), 0);
  }

  _buildFloor() {
    // Match the pygfx engine's floor extents/placement so JS and Python frame the
    // deck identically: width = widest*4, depth = stackDepth + widest*2, centered
    // under the deck at (0, floorY, -depth/2).
    const widest = this.plates.reduce((m, p) => Math.max(m, p.width), 0) || this.scene.size.width;
    const depth = stackDepth(this.scene, "expanded");
    const extentW = widest * 4.0;
    const extentZ = depth > 0 ? depth + widest * 2.0 : widest * 2.0;
    const geometry = new THREE.PlaneGeometry(extentW, extentZ);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.scene.floor.color),
      transparent: true,
      opacity: this.scene.floor.opacity,
      side: THREE.DoubleSide,
    });
    const floor = new THREE.Mesh(geometry, material);
    // Lay flat on the XZ plane at the floor line (bottom of the tallest plate).
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -this._tallestHeight() / 2, -depth / 2.0);
    this.threeScene.add(floor);
    this.floor = floor;
  }

  /**
   * Position plates (Z spacing + Y bottom-align), opacity, and camera for a view.
   * @param {"expanded"|"compact"} view
   */
  setView(view) {
    this.view = view;
    const gaps = view === "compact" ? this.plates.map(() => MIN_GAP) : plateGaps(this.scene);
    const opacities = this.plates.map((p) => resolvedOpacity(p.slide, view));
    const pose = view === "compact" ? compactCamera(this.scene) : expandedCamera(this.scene);
    const t = view === "compact" ? 0 : 1;
    this._placePlates(gaps, opacities);
    this._placeCaptions(t);
    this._applyPose(pose);
  }

  /**
   * Apply a geometry.js FrameState (camera pose + per-plate gaps + per-slide
   * opacities) for the playable transition / scrollspy. `t` is the eased morph
   * factor (0=compact,1=expanded) used for caption fade.
   * @param {{camera:object, gaps:number[], opacities:number[]}} state
   * @param {number} t
   */
  applyFrameState(state, t) {
    this._placePlates(state.gaps, state.opacities);
    this._placeCaptions(t);
    this._applyPose(state.camera);
  }

  /** Lay out plates along Z (index 0 farthest), bottom-aligned, with opacities. */
  _placePlates(gaps, opacities) {
    const tallest = this._tallestHeight();
    const bottomY = -tallest / 2;
    const floorY = bottomY;
    const reflectivity = this.scene.floor.reflectivity;

    // Cumulative Z: index 0 farthest (most negative), last at 0.
    // stack_depth = sum(gaps[1:]); place slide i at z = -(stack_depth - cumGapTo(i)).
    let totalDepth = 0;
    for (let i = 1; i < gaps.length; i++) totalDepth += gaps[i];

    let cum = 0;
    this.plates.forEach((plate, i) => {
      if (i > 0) cum += gaps[i];
      const z = -(totalDepth - cum);
      const y = bottomY + plate.height / 2;
      plate.mesh.position.set(0, y, z);
      plate.mesh.material.opacity = opacities[i];
      if (plate.reflection) {
        // Mirror the plate (centered at y) across the floor line: a point at y
        // maps to 2*floorY - y; the plate center is y, so the reflection center
        // is 2*floorY - y, with scale.y=-1 flipping the image. Opacity fades with
        // the plate (matches the pygfx engine).
        plate.reflection.position.set(0, 2.0 * floorY - y, z);
        plate.reflection.material.opacity = opacities[i] * reflectivity;
        plate.reflection.visible = opacities[i] * reflectivity > 0.001;
      }
    });
  }

  /** Position each caption beneath its plate and fade it per the morph factor t. */
  _placeCaptions(t) {
    if (this.captions.length === 0) return;
    const tallest = this._tallestHeight();
    const floorY = -tallest / 2;
    this.captions.forEach(({ sprite, material, plateIndex, caption }) => {
      const plate = this.plates[plateIndex];
      sprite.position.set(plate.mesh.position.x, floorY - sprite.scale.y, plate.mesh.position.z);
      const fade = captionFade(caption, t);
      material.opacity = fade;
      sprite.visible = fade > 0.001;
    });
  }

  /** Apply a geometry.js pose (position/target/fov/near) to the three camera. */
  _applyPose(pose) {
    this.camera.position.set(pose.position[0], pose.position[1], pose.position[2]);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(pose.target[0], pose.target[1], pose.target[2]);
    // three.js PerspectiveCamera.fov is the VERTICAL fov. The shared geometry
    // treats scene.camera.fov as a reference fov consumed identically by the
    // Python pygfx engine, whose projection sets the vertical half-height to
    //   tan(vfov/2) = 2*tan(fov/2) / (1 + sceneAspect)
    // (it splits the reference size across width+height by the scene aspect).
    // Convert here so the JS stage frames the deck identically to the Python
    // engines (cross-engine parity, SPEC.md §8) without touching geometry.js.
    const sceneAspect = this.scene.size.width / this.scene.size.height;
    const halfFov = (pose.fov * Math.PI) / 360; // (fov/2) in radians
    const vfov = 2 * Math.atan((2 * Math.tan(halfFov)) / (1 + sceneAspect));
    this.camera.fov = (vfov * 180) / Math.PI;
    this.camera.near = pose.near;
    this.camera.updateProjectionMatrix();
  }

  render() {
    if (this._disposed) return;
    this.renderer.render(this.threeScene, this.camera);
  }

  resize(width, height) {
    if (!width || !height) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  dispose() {
    this._disposed = true;
    this.plates.forEach((p) => {
      p.mesh.geometry?.dispose();
      p.mesh.material?.map?.dispose();
      p.mesh.material?.dispose();
      if (p.reflection) {
        p.reflection.geometry?.dispose();
        p.reflection.material?.dispose();
      }
    });
    this.captions.forEach((c) => {
      c.material?.map?.dispose();
      c.material?.dispose();
    });
    this.floor?.geometry?.dispose();
    this.floor?.material?.dispose();
    this.renderer?.dispose();
    if (this.renderer?.domElement?.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.plates = [];
    this.captions = [];
  }
}
