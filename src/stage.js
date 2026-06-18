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
  captionAnchorX,
  captionPlateCenterY,
  captionPlateHeight,
  captionSize,
  captionFillColor,
  captionBorderColor,
  captionOpacities,
  slideLift,
  plateEdgeWidth,
  CAPTION_PLATE_PAD_EM,
  REFLECTION_BLUR_FRAC,
} from "./geometry.js";
import { resolvedOpacity } from "./scene.js";

/**
 * Build a white OPAQUE bordered caption PLATE (issue 311). The whole caption is one
 * rectangle drawn on a single canvas texture: solid white fill, a stroked border of
 * `edgeWidth` (scene points) in `edgeColor`, and the caption `text` at `size` (1em)
 * HORIZONTALLY + VERTICALLY CENTERED. It is mapped onto a PlaneGeometry sized
 *   width  = (measured text width) + 2 * CAPTION_PLATE_PAD_EM * size   (1.5em pad each side)
 *   height = plateHeight                                               (= size / 0.75)
 * in scene-point world units (caller positions the mesh's RIGHT edge / vertical center).
 * The whole plate (fill + border + text) fades together via the mesh material opacity.
 * Returns { mesh, material, worldWidth } so the caller can anchor the right edge.
 *
 * @param {string} text caption string
 * @param {{size:number, color:string, font:string, plateHeight:number,
 *          edgeWidth:number, edgeColor:string, fillColor?:string,
 *          borderColor?:string}} style resolved layout/style values (scene pts).
 *          `fillColor`/`borderColor` are the caption plate fill + border colors
 *          (issue 324); each defaults to `edgeColor` when omitted.
 */
export function makeCaptionSprite(text, style) {
  const size = style?.size ?? 28;
  const color = style?.color ?? "#222222";
  const plateHeight = style?.plateHeight ?? size / 0.75;
  const edgeWidth = style?.edgeWidth ?? 0;
  const edgeColor = style?.edgeColor ?? "#000000";
  const fillColor = style?.fillColor ?? edgeColor;
  const borderColor = style?.borderColor ?? edgeColor;

  // Caption font (issue 328): the default is "Zalando Sans" — the bundled vexy-stax face — an
  // EXPANDED, medium-weight grotesque pulled from Google Fonts (wdth 125 / wght 500). We match
  // that with `500 expanded` + 0.02em tracking. An explicit family is used as given, with a
  // `system-ui, sans-serif` fallback so an unloaded family never resolves to the canvas default
  // serif (Times New Roman — issue 327). Quote the family for safety.
  const dpr = 2; // render the canvas at 2x for crisper text
  const usesDefaultFont = !style?.font;
  const fontFamily = usesDefaultFont
    ? `"Zalando Sans", system-ui, sans-serif`
    : `"${style.font}", system-ui, sans-serif`;
  const weightStretch = usesDefaultFont ? "500 expanded " : "";
  const trackingPx = usesDefaultFont ? 0.02 * size * dpr : 0; // 0.02em → device px

  const pxFont = `${weightStretch}${size * dpr}px ${fontFamily}`;

  // Measure the typeset text width (px at 1× = scene points), then the plate world width is
  // text width + 1.5em pad on EACH side (issue 311). Heights are exact: plate world height.
  // letterSpacing must be set BEFORE measuring so the plate width accounts for the tracking.
  const measureCanvas = document.createElement("canvas");
  const mctx = measureCanvas.getContext("2d");
  mctx.font = pxFont;
  if (trackingPx && "letterSpacing" in mctx) mctx.letterSpacing = `${trackingPx}px`;
  const textWWorld = mctx.measureText(text).width / dpr; // scene-point text width
  const worldWidth = textWWorld + 2.0 * CAPTION_PLATE_PAD_EM * size;
  const worldHeight = plateHeight;

  // Canvas in device px: world units × dpr, so the white plate fills the whole texture and
  // the border stroke is `edgeWidth` scene points thick (× dpr px).
  const canvasW = Math.max(1, Math.round(worldWidth * dpr));
  const canvasH = Math.max(1, Math.round(worldHeight * dpr));
  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d");

  // Fill the plate with the caption fill color (default = the edge color; issue 324).
  ctx.fillStyle = fillColor;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Thin border frame matching the slide plates: thickness = edgeWidth (× dpr px), color =
  // scene.edge.color. Stroke is centered on the path, so inset by half the line width to keep
  // it fully inside the plate.
  const lwPx = edgeWidth * dpr;
  if (lwPx > 0) {
    ctx.lineWidth = lwPx;
    ctx.strokeStyle = borderColor;
    ctx.strokeRect(lwPx / 2, lwPx / 2, canvasW - lwPx, canvasH - lwPx);
  }

  // Caption text, centered both ways, in the caption color (same tracking as the measurement).
  ctx.font = pxFont;
  if (trackingPx && "letterSpacing" in ctx) ctx.letterSpacing = `${trackingPx}px`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, canvasW / 2, canvasH / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  // Opaque plate that fades as one: transparent:true lets the per-frame opacity drive the
  // whole mesh (fill+border+text) 0→1; depthTest:false keeps it readable over the deck.
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    side: THREE.DoubleSide,
    opacity: 1,
  });
  const geometry = new THREE.PlaneGeometry(worldWidth, worldHeight);
  const mesh = new THREE.Mesh(geometry, material);
  return { mesh, material, worldWidth };
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

/**
 * Build a BLURRED canvas texture from a sharp plate texture for the floor reflection
 * (issue 303 §1). The plate image is drawn into a same-size canvas with a Gaussian
 * blur (radius = REFLECTION_BLUR_FRAC × image-height px), so the reflection reads soft
 * while the plate keeps its crisp texture. Returns the original (sharp) texture when no
 * canvas/2D filter is available (headless), so the reflection still renders (just not
 * blurred) instead of throwing. The canvas is padded by the blur radius on every side so
 * the soft edge isn't clipped, then mapped back to the plate's exact UV box.
 * @returns {{texture: THREE.Texture, padFrac: [number, number]}|null}
 */
function makeBlurredReflectionTexture(srcTexture) {
  if (typeof document === "undefined") return null;
  const img = srcTexture.image;
  const iw = img?.width ?? 0;
  const ih = img?.height ?? 0;
  if (!iw || !ih) return null;

  // Blur radius in source-image pixels (shared fraction of the plate IMAGE height).
  const blurPx = Math.max(0, REFLECTION_BLUR_FRAC * ih);
  const pad = Math.ceil(blurPx * 3) + 1; // 3σ of bleed each side so the soft edge fits

  const canvas = document.createElement("canvas");
  canvas.width = iw + pad * 2;
  canvas.height = ih + pad * 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  if (typeof ctx.filter === "string") ctx.filter = `blur(${blurPx}px)`;
  ctx.drawImage(img, pad, pad, iw, ih);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  // The plate geometry is sized to (iw, ih); the reflection quad is padded by `pad`
  // px on each side, so it must be scaled up by these fractions to keep the image at
  // the same world size as the plate (the pad becomes transparent overhang).
  return { texture, padFrac: [(iw + pad * 2) / iw, (ih + pad * 2) / ih] };
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
    this.captions = []; // { sprite, material, plateIndex, worldWidth }
    this.view = scene.view;
    this._disposed = false;
  }

  /** Build renderer, scene graph, camera, floor, and load all plate textures. */
  async init() {
    const sceneAspect = this.scene.size.width / (this.scene.size.height || 1);
    const cssW = this.container.clientWidth;
    const cssH = this.container.clientHeight;
    // When the container has a definite CSS width but height:auto (e.g. via
    // aspect-ratio), clientHeight is 0 before layout fully resolves. Derive it
    // from the scene aspect rather than falling back to the raw scene pixel size
    // (6234px), which would create a canvas far too large for the container.
    const width = cssW || this.scene.size.width;
    const height = cssH || (cssW ? Math.round(cssW / sceneAspect) : this.scene.size.height);

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
    // updateStyle=true (default): three sets the canvas CSS size to width×height (the
    // container's CSS px) and the backing buffer to ×devicePixelRatio. Passing false left
    // the canvas displayed at its backing size — 2× too large (and clipped) on HiDPI.
    this.renderer.setSize(width, height);
    this.container.appendChild(this.renderer.domElement);

    await this._buildPlates();
    this._buildFloor();
    await this._ensureCaptionFonts();
    this._buildCaptions();
    this.setView(this.view);

    return this;
  }

  async _buildPlates() {
    const loader = new THREE.TextureLoader();
    const textures = await Promise.all(this.scene.slides.map((s) => loadTexture(loader, s.src)));
    const reflectivity = this.scene.floor.reflectivity;

    // Scale all plate geometry so the widest plate == scene.size.width (scene-point
    // units). geometry.js computes cameras/captions in scene.size units, so the
    // plate geometry must match — otherwise the camera is computed for a 640pt plate
    // but the THREE geometry is e.g. 6234pt (raw texture pixels), causing a ~10x
    // zoom mismatch. Mirrors pygfx._scale = scene.size.width / widest.
    const maxW = textures.reduce((m, t) => Math.max(m, t.image.width), 0) || this.scene.size.width;
    this._texScale = this.scene.size.width / maxW;

    // Plate edge frame thickness in WORLD units: plateEdgeWidth() is in scene points
    // (== scene.size units), and the plate world width is already in scene.size units
    // (widest == scene.size.width), so no extra scaling is needed. Skip when edge.width==0.
    const edge = this.scene.edge;
    this._edgeWidth = edge.width > 0 ? plateEdgeWidth(this.scene) : 0;
    this._edgeColor = edge.color;

    textures.forEach((texture, i) => {
      const w = texture.image.width * this._texScale;
      const h = texture.image.height * this._texScale;
      const geometry = new THREE.PlaneGeometry(w, h);
      // DoubleSide so the front face reads un-mirrored from +Z and the plate stays
      // visible when the expanded camera orbits behind it.
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false, // prevents z-fighting with floor/reflections (issue 320)
        opacity: 1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      // Explicit renderOrder so the transparent draw order is STABLE (reflection -2 <
      // floor -1 < plate 0 < border 1 < caption 2). Equal renderOrders (plate==floor==0)
      // let three.js distance-sort them, which flips frame-to-frame at the floor line and
      // flickers at the bottom of each slide (issue 320 §9).
      mesh.renderOrder = 0;
      this.threeScene.add(mesh);

      // BLURRY mirror reflection (issue 303 §1): a mirror copy below the floor line
      // whose texture is the plate image GAUSSIAN-BLURRED (blur radius =
      // REFLECTION_BLUR_FRAC × plate image-height px) so the reflection reads soft, not
      // a crisp mirror. scaled (1,-1,1), opacity = plate opacity × reflectivity, rendered
      // behind the floor (renderOrder -1). Falls back to the sharp texture if no canvas.
      let reflection = null;
      if (reflectivity > 0) {
        const blurred = makeBlurredReflectionTexture(texture);
        const reflTex = blurred ? blurred.texture : texture;
        const reflMat = new THREE.MeshBasicMaterial({
          map: reflTex,
          side: THREE.DoubleSide,
          transparent: true,
          depthWrite: false, // must not occlude plates or floor (issue 320)
          opacity: reflectivity,
        });
        reflection = new THREE.Mesh(geometry.clone(), reflMat);
        reflection.scale.y = -1;
        // Scale the padded reflection quad up so the (blurred) image keeps the plate's
        // exact world size; the blur pad becomes transparent overhang around it.
        if (blurred) {
          reflection.scale.x = blurred.padFrac[0];
          reflection.scale.y = -blurred.padFrac[1];
        }
        reflection.renderOrder = -2; // behind the floor (issue 320 §9: distinct order, no sort-flip)
        this.threeScene.add(reflection);
      }

      // Plate edge border (issue 305): 4 thin filled quads along the plate perimeter,
      // thickness = this._edgeWidth (world units), color = scene.edge.color. Works
      // regardless of plate-image transparency and is thickness-controllable (not a 1px
      // GL line). Positioned/opacity-tracked per frame in _placePlates. Skipped when 0.
      let border = null;
      if (this._edgeWidth > 0) {
        border = this._makeBorder(w, h, this._edgeWidth, this._edgeColor);
        border.group.renderOrder = 1; // draw on top of the plate
        this.threeScene.add(border.group);
      }

      this.plates.push({
        mesh,
        reflection,
        border,
        width: w,
        height: h,
        slide: this.scene.slides[i],
      });
    });
  }

  /**
   * Build a rectangular border frame as 4 thin filled quads (top/bottom/left/right) sized
   * for a plate of (w, h) with the given thickness `t` and CSS color. Returns the parent
   * group (positioned per-frame) plus the four meshes/material so opacity can be tracked.
   * The frame is centered on the plate origin and sits flush with the plate edges.
   */
  _makeBorder(w, h, t, color) {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });
    const group = new THREE.Group();
    const hw = w / 2;
    const hh = h / 2;
    // Top/bottom run the full width; left/right span the inner height (so corners aren't
    // double-covered). Each is a thin PlaneGeometry positioned along the perimeter.
    const segs = [
      { geo: new THREE.PlaneGeometry(w, t), x: 0, y: hh - t / 2 }, // top
      { geo: new THREE.PlaneGeometry(w, t), x: 0, y: -hh + t / 2 }, // bottom
      { geo: new THREE.PlaneGeometry(t, h - 2 * t), x: -hw + t / 2, y: 0 }, // left
      { geo: new THREE.PlaneGeometry(t, h - 2 * t), x: hw - t / 2, y: 0 }, // right
    ];
    const meshes = segs.map(({ geo, x, y }) => {
      const m = new THREE.Mesh(geo, material);
      m.position.set(x, y, 0);
      group.add(m);
      return m;
    });
    return { group, material, meshes };
  }

  /**
   * Ensure the default caption font is loaded before the caption canvases are drawn (issue 328).
   * Caption text is rasterized to a canvas at build time, so the font must be available first or
   * it falls back to a system font. The default font is "Zalando Sans" (the bundled vexy-stax
   * face) pulled from Google Fonts at wdth 125 / wght 500; explicit families are left to the host
   * page. Best-effort: in non-browser/offline contexts it resolves without blocking.
   */
  async _ensureCaptionFonts() {
    if (typeof document === "undefined" || !document.fonts) return;
    // Does any caption fall back to the DEFAULT font (no explicit family anywhere)?
    const defFont = this.scene.caption_defaults?.font;
    const needsDefault = !defFont && this.scene.slides.some((s) => s.caption && !s.caption.style?.font);
    if (!needsDefault) return;
    // Pull "Zalando Sans" (wdth 125 / wght 500) from Google Fonts. We must await the stylesheet
    // PARSE before document.fonts.load — otherwise the @font-face rules don't exist yet and
    // load() resolves against the system fallback, leaving captions in a serif default (327).
    if (typeof document.getElementById === "function" && !document.getElementById("vexy-zalando-font")) {
      for (const [id, href, cors] of [
        ["vexy-gf-preconnect", "https://fonts.googleapis.com", false],
        ["vexy-gf-preconnect-static", "https://fonts.gstatic.com", true],
      ]) {
        if (!document.getElementById(id)) {
          const pre = document.createElement("link");
          pre.id = id;
          pre.rel = "preconnect";
          pre.href = href;
          if (cors) pre.crossOrigin = "anonymous";
          document.head?.appendChild(pre);
        }
      }
      const link = document.createElement("link");
      link.id = "vexy-zalando-font";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Zalando+Sans:wdth,wght@125,500&display=swap";
      const linkLoaded = new Promise((resolve) => {
        link.onload = resolve;
        link.onerror = resolve; // offline → fall through to system fallback
      });
      document.head?.appendChild(link);
      await linkLoaded;
    }
    try {
      // Match the canvas font descriptor (500 / expanded == wdth 125) so the right face preloads.
      await document.fonts.load('500 expanded 32px "Zalando Sans"');
      if (document.fonts.ready) await document.fonts.ready;
    } catch {
      /* offline / unsupported → captions fall back to a system font */
    }
  }

  /** Build a caption sprite under each plate that declares one (best-effort). */
  _buildCaptions() {
    if (typeof document === "undefined") return; // no canvas → skip captions
    if (!this.scene.captions) return; // issue 332: global captions toggle off
    const defaults = this.scene.caption_defaults ?? null;
    // Caption-plate layout (issue 311): the caption is a small white opaque bordered PLATE.
    // 1em == captionSize, plate height == captionPlateHeight, border == the slide-plate edge
    // (plateEdgeWidth in scene.edge.color). The stage world is already in scene-point units
    // (plate world width == scene.size.width), so these values are used as world units.
    const nominalSize = captionSize(this.scene);
    const plateHeight = captionPlateHeight(this.scene);
    const edgeWidth = this._edgeWidth; // 0 when scene.edge.width == 0
    const edgeColor = this._edgeColor;
    // Caption plate fill + border colors (issue 324): independently overridable via
    // caption_defaults.fill_color / .border_color, each defaulting to scene.edge.color.
    const fillColor = captionFillColor(this.scene);
    const borderColor = captionBorderColor(this.scene);
    this.plates.forEach((plate, i) => {
      const caption = plate.slide.caption;
      if (!caption) return;
      // Merge per-caption style over caption_defaults; force layout plate height and border
      // so the plates align correctly, but allow slide-level custom font size for the text.
      const style = {
        ...(defaults ?? {}),
        ...(caption.style ?? {}),
        size: caption.style?.size ?? nominalSize,
        plateHeight,
        edgeWidth,
        edgeColor,
        fillColor,
        borderColor,
      };
      const { mesh, material, worldWidth } = makeCaptionSprite(caption.text, style);
      mesh.renderOrder = 2; // draw the caption plate on top of the deck + borders
      this.threeScene.add(mesh);
      this.captions.push({ sprite: mesh, material, plateIndex: i, caption, worldWidth });
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
    // Smoked-glass floor (issue 303 §1): a barely-visible (~4% opacity) dark tint that the
    // blurry reflections beneath it show THROUGH. transparent:true alpha-blends the tint;
    // depthWrite:false so the floor never depth-occludes the reflection meshes below it;
    // renderOrder>reflections so it composites OVER (tints) them. (Shadows removed: issue 312.)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.scene.floor.color),
      transparent: true,
      opacity: this.scene.floor.opacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const floor = new THREE.Mesh(geometry, material);
    // Lay flat on the XZ plane at the floor line (bottom of the tallest plate).
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -this._tallestHeight() / 2, -depth / 2.0);
    floor.renderOrder = -1; // reflections (-2) drawn first then tinted; plates (0) draw over
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
    // Pass the container aspect so the compact view fits with side padding (and expanded
    // fills) when the element's aspect differs from the plate (issue 314).
    const va = this.camera.aspect || undefined;
    const pose = view === "compact" ? compactCamera(this.scene, va) : expandedCamera(this.scene, va);
    const t = view === "compact" ? 0 : 1;
    this._placePlates(gaps, opacities);
    this._placeCaptions(captionOpacities(this.scene, t));
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
    // Use per-frame captionOpacities from FrameState when available (video/transition
    // frames populated by framePlan); fall back to computing from t for still views.
    const capOp = state.captionOpacities ?? captionOpacities(this.scene, t);
    this._placeCaptions(capOp);
    this._applyPose(state.camera);
  }

  /** Lay out plates along Z (index 0 farthest), bottom-aligned, with opacities. */
  _placePlates(gaps, opacities) {
    const tallest = this._tallestHeight();
    const bottomY = -tallest / 2;
    const floorY = bottomY;
    const reflectivity = this.scene.floor.reflectivity;
    // Issue 332: lift every slide plate (+ border/reflection) by one caption-plate height so
    // it sits ON TOP of its on-floor caption plate (0 when captions are off → on the floor).
    const lift = slideLift(this.scene);

    // Cumulative Z: index 0 farthest (most negative), last at 0.
    // stack_depth = sum(gaps[1:]); place slide i at z = -(stack_depth - cumGapTo(i)).
    let totalDepth = 0;
    for (let i = 1; i < gaps.length; i++) totalDepth += gaps[i];

    let cum = 0;
    this.plates.forEach((plate, i) => {
      if (i > 0) cum += gaps[i];
      const z = -(totalDepth - cum);
      const y = bottomY + lift + plate.height / 2;
      const op = opacities[i];
      plate.mesh.position.set(0, y, z);
      plate.mesh.material.opacity = op;
      if (plate.reflection) {
        // Mirror the plate (centered at y) across the floor line: a point at y
        // maps to 2*floorY - y; the plate center is y, so the reflection center
        // is 2*floorY - y, with scale.y=-1 flipping the image. Opacity fades with
        // the plate (matches the pygfx engine).
        plate.reflection.position.set(0, 2.0 * floorY - y, z);
        plate.reflection.material.opacity = op * reflectivity;
        plate.reflection.visible = op * reflectivity > 0.001;
      }
      if (plate.border) {
        // The frame tracks the plate's position/Z every frame and fades with it
        // (issue 305). It shares the plate center (X=0, Y=y, Z=z).
        plate.border.group.position.set(0, y, z);
        plate.border.material.opacity = op;
        plate.border.group.visible = op > 0.001;
      }
    });
  }

  /**
   * Position each caption PLATE (issue 311; relayout issue 332) so its LEFT edge is at
   * captionAnchorX (the slide LEFT edge) and its VERTICAL CENTER is at captionPlateCenterY
   * (the plate sits on the floor, the slide stacked on top of it), at the slide plate's
   * current Z (captions recede with their plate). The caption mesh is centered geometry of
   * width `worldWidth`, so the mesh CENTER X is anchorX + worldWidth/2. The whole plate
   * (fill + border + text) fades with the per-frame opacity. opacities[plateIndex] == 0 →
   * fully invisible.
   * @param {number[]} opacities  per-slide opacity list (1:1 with this.plates)
   */
  _placeCaptions(opacities) {
    if (this.captions.length === 0) return;
    const anchorX = captionAnchorX(this.scene);
    const centerY = captionPlateCenterY(this.scene);
    this.captions.forEach(({ sprite, material, plateIndex, worldWidth }) => {
      const plate = this.plates[plateIndex];
      // Issue 332: LEFT edge at anchorX (the slide left edge) → mesh center at anchorX + w/2;
      // vertical center at centerY (on the floor); plate Z (captions recede with their plate).
      const w = worldWidth ?? sprite.scale?.x ?? 0;
      sprite.position.set(anchorX + w / 2, centerY, plate.mesh.position.z);
      const op = opacities[plateIndex] ?? 0;
      material.opacity = op;
      sprite.visible = op > 0.001;
    });
  }

  /** Apply a geometry.js pose (position/target/fov/near) to the three camera. */
  _applyPose(pose) {
    this.camera.position.set(pose.position[0], pose.position[1], pose.position[2]);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(pose.target[0], pose.target[1], pose.target[2]);
    // three.js PerspectiveCamera.fov is the VERTICAL fov. Convert from horizontal
    // fov (pose.fov) to vertical fov using the CAMERA (container) aspect — equal to the
    // scene aspect for the rendered/aspect-locked paths, but the actual container aspect
    // for the live element so a non-scene-aspect viewport frames correctly (issue 314).
    const aspect = this.camera.aspect || this.scene.size.width / this.scene.size.height;
    const halfFov = (pose.fov * Math.PI) / 360; // (fov/2) in radians
    const vfov = 2 * Math.atan(Math.tan(halfFov) / aspect);
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
    // updateStyle=true so the live <vexy-stax> canvas displays at its CSS size (not the
    // HiDPI backing size). Headless capture (playwright) reads the backing buffer, so the
    // CSS size is irrelevant there — safe for both paths.
    this.renderer.setSize(width, height);
  }

  dispose() {
    this._disposed = true;
    this.plates.forEach((p) => {
      p.mesh.geometry?.dispose();
      p.mesh.material?.map?.dispose();
      p.mesh.material?.dispose();
      if (p.reflection) {
        p.reflection.geometry?.dispose();
        // The reflection's map is the per-plate BLURRED CanvasTexture (own resource);
        // dispose it too (it is not the shared sharp plate texture above).
        if (p.reflection.material?.map !== p.mesh.material?.map) {
          p.reflection.material?.map?.dispose();
        }
        p.reflection.material?.dispose();
      }
      if (p.border) {
        p.border.meshes.forEach((m) => m.geometry?.dispose());
        p.border.material?.dispose();
      }
    });
    this.captions.forEach((c) => {
      // Each caption plate owns its PlaneGeometry + CanvasTexture material (issue 311).
      c.sprite?.geometry?.dispose();
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
