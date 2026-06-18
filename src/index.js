// SPDX-License-Identifier: Apache-2.0
// this_file: src/index.js
//
// Public ESM API (SPEC.md §6.1): a static view, image export, a playable
// transition, video export, and a scroll-driven transition. The view math comes
// from geometry.js (mirrors the Python exactly); the morph driver, scrollspy
// mapping, and exporters are in transition.js / scrollspy.js / export.js.

import { Stage } from "./stage.js";
import { loadScene, parseScene, resolvedOpacity } from "./scene.js";
import { frameStateAt, ease } from "./geometry.js";
import { playTransition, transitionEndpoints, buildTimeline, morphAtProgress } from "./transition.js";
import { attachScrollspy } from "./scrollspy.js";
import { canvasToPngBlob, recordVideo } from "./export.js";

export {
  loadScene,
  parseScene,
  resolvedOpacity,
};

export {
  MIN_GAP,
  FILL,
  plateGaps,
  stackDepth,
  compactCamera,
  expandedCamera,
  ease,
  interpolateOpacity,
  framePlan,
  frameStateAt,
} from "./geometry.js";

export { buildTimeline, morphAtProgress, transitionEndpoints } from "./transition.js";
export { computeScrollProgress, prefersReducedMotion } from "./scrollspy.js";
export { canvasToPngBlob } from "./export.js";

export class VexyStax {
  /**
   * @param {HTMLElement} container mount point for the three.js canvas
   * @param {object} scene normalized scene object (from loadScene)
   */
  constructor(container, scene) {
    if (!container) throw new Error("VexyStax: container is required");
    if (!scene || !Array.isArray(scene.slides)) {
      throw new Error("VexyStax: scene must be a parsed scene object (use loadScene first)");
    }
    this.container = container;
    this.scene = scene;
    this.stage = new Stage(container, scene);
    this._ro = null; // ResizeObserver for post-layout resize
    this._ready = this.stage.init().then(() => {
      this.stage.render();
      // After mount, observe the container for its first actual layout dimensions.
      // When the container uses height:auto + aspect-ratio, clientHeight is 0 at
      // init time; the ResizeObserver fires once the CSS engine resolves the size,
      // ensuring the canvas fits the container rather than the raw scene pixel size.
      if (typeof ResizeObserver !== "undefined") {
        let observed = false;
        this._ro = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const w = entry.contentRect?.width;
            const h = entry.contentRect?.height;
            if (w > 0 && h > 0) {
              this.stage.resize(w, h);
              this.stage.render();
              // After the first real resize we can stop if the element has a
              // fixed CSS size; keep observing for responsive containers.
              observed = true;
            }
          }
        });
        this._ro.observe(container);
      }
      return this;
    });
  }

  /** Resolves once textures are loaded and the initial view is rendered. */
  get ready() {
    return this._ready;
  }

  /** Position the deck + camera for a view and render a frame. */
  async setView(view) {
    await this._ready;
    this.stage.setView(view);
    this.stage.render();
    return this;
  }

  /**
   * Apply an arbitrary morph factor `t` (0 = compact, 1 = expanded) and render. The
   * low-level scrub primitive behind scroll-driven stories (e.g. the scrollable demo
   * computes its own tent mapping and calls seek each scroll frame). Clamped to [0,1].
   */
  seek(t) {
    const tt = Math.max(0, Math.min(1, Number(t) || 0));
    this.stage.applyFrameState(frameStateAt(this.scene, tt, this.stage.camera.aspect), tt);
    this.stage.render();
    return this;
  }

  /** Resize the renderer/camera to the container (or explicit size). */
  resize(width, height) {
    const w = width ?? this.container.clientWidth;
    const h = height ?? this.container.clientHeight;
    this.stage.resize(w, h);
    this.stage.render();
  }

  /**
   * Render the current view to a PNG Blob. `scale` re-renders at a higher
   * pixel size. (Animated transition export is a later story.)
   */
  async toImage({ scale = 1 } = {}) {
    await this._ready;
    const renderer = this.stage.renderer;
    const canvas = renderer.domElement;
    let restore = null;
    if (scale !== 1) {
      // getSize fills a Vector2; we read CSS size then re-render larger.
      const w = canvas.width;
      const h = canvas.height;
      const cssW = this.container.clientWidth || this.scene.size.width;
      const cssH = this.container.clientHeight || this.scene.size.height;
      const prevPR = renderer.getPixelRatio();
      renderer.setPixelRatio(prevPR * scale);
      renderer.setSize(cssW, cssH, false);
      restore = () => {
        renderer.setPixelRatio(prevPR);
        renderer.setSize(cssW, cssH, false);
        this.stage.render();
      };
    }
    this.stage.render();
    try {
      return await canvasToPngBlob(canvas);
    } finally {
      if (restore) restore();
    }
  }

  // --- Render operations (SPEC.md §6.1) ------------------------------------

  /**
   * Play a transition (camera + spacing + opacity + caption fade morph) as an
   * animation, rendering each frame. Resolves when the animation finishes.
   *
   * @param {string} [kind] override scene.transition.kind
   * @param {object} [opts]
   * @param {(p:number)=>void} [opts.onProgress] global progress [0,1] per frame
   * @returns {Promise<this>}
   */
  async transition(kind, opts = {}) {
    await this._ready;
    const resolvedKind = kind ?? this.scene.transition?.kind;
    if (!resolvedKind) {
      throw new Error("VexyStax.transition: no kind given and scene.transition is null");
    }
    // Snap to the starting endpoint so the first frame is correct.
    const { startMorph } = transitionEndpoints(resolvedKind);
    this.stage.applyFrameState(frameStateAt(this.scene, startMorph, this.stage.camera.aspect), startMorph);
    this.stage.render();

    this._cancelTransition?.();
    const controller = playTransition(this.scene, (state) => {
      // Derive the (unclamped) morph factor for caption fade from the state's
      // camera lerp between compact/expanded targets is unnecessary; the driver
      // already passes opacities/gaps. We re-derive t from gaps[1] for captions.
      const t = this._morphFromGaps(state.gaps);
      this.stage.applyFrameState(state, t);
      this.stage.render();
    }, { kind: resolvedKind, onProgress: opts.onProgress });

    this._cancelTransition = controller.cancel;
    this.container.dispatchEvent?.(new CustomEvent("transitionstart", { detail: { kind: resolvedKind } }));
    try {
      await controller.promise;
      this.container.dispatchEvent?.(new CustomEvent("transitionend", { detail: { kind: resolvedKind } }));
    } finally {
      this._cancelTransition = null;
    }
    return this;
  }

  /** Re-derive the morph factor t from a frame's gap[1] (for caption fade). */
  _morphFromGaps(gaps) {
    if (gaps.length < 2) return 0;
    const fullGap = this.stage.scene.camera.gap;
    const span = fullGap - 3.0; // MIN_GAP = 3
    if (span <= 0) return gaps[1] >= fullGap ? 1 : 0;
    return Math.max(0, Math.min(1, (gaps[1] - 3.0) / span));
  }

  /**
   * Record the transition to a video Blob (WebCodecs preferred, MediaRecorder
   * fallback). Plays the full transition while capturing the canvas.
   * @param {object} [opts]
   * @param {string} [opts.kind] override scene.transition.kind
   * @returns {Promise<Blob>}
   */
  async toVideo(opts = {}) {
    await this._ready;
    const kind = opts.kind ?? this.scene.transition?.kind;
    if (!kind) throw new Error("VexyStax.toVideo: no kind given and scene.transition is null");
    const fps = this.scene.video?.fps ?? this.scene.transition?.fps ?? 30;
    const canvas = this.stage.renderer.domElement;
    // Issue 335 §2: bookend the clip with HELD STILLS — render the start frame and capture it
    // `first_hold` times, then the transition, then capture the end frame `last_hold` times
    // (still → transition → still). Defaults 10/10 from scene.video. Mirrors geometry.py's
    // frame_plan holds (the Python engines get holds via frame_plan; here toVideo drives a
    // real-time capture, so we hold by capturing the boundary frames repeatedly).
    const firstHold = this.scene.video?.first_hold ?? 10;
    const lastHold = this.scene.video?.last_hold ?? 10;
    const { startMorph, endMorph } = transitionEndpoints(kind);
    const aspect = this.stage.camera.aspect;

    return recordVideo({
      canvas,
      fps,
      run: async (onFrame) => {
        // Held still intro: snap to the start endpoint and capture it `firstHold` times.
        const startState = frameStateAt(this.scene, startMorph, aspect);
        this.stage.applyFrameState(startState, startMorph);
        this.stage.render();
        for (let i = 0; i < firstHold; i++) onFrame(startState);

        const controller = playTransition(this.scene, (state) => {
          const t = this._morphFromGaps(state.gaps);
          this.stage.applyFrameState(state, t);
          this.stage.render();
          onFrame(state);
        }, { kind });
        await controller.promise;

        // Held still outro: snap to the end endpoint and capture it `lastHold` times.
        const endState = frameStateAt(this.scene, endMorph, aspect);
        this.stage.applyFrameState(endState, endMorph);
        this.stage.render();
        for (let i = 0; i < lastHold; i++) onFrame(endState);
      },
    });
  }

  /**
   * Drive the transition from scroll position over a trigger region (SPEC.md
   * §6.4). Maps scroll progress [0,1] to the morph; respects
   * prefers-reduced-motion (snaps to endpoints).
   *
   * @param {object} opts
   * @param {Element|string} opts.trigger element or selector for the scroll region
   * @param {string} [opts.kind] override scene.transition.kind
   * @param {boolean} [opts.reducedMotion] override prefers-reduced-motion
   * @returns {{disconnect:()=>void}}
   */
  scrollspy(opts = {}) {
    const kind = opts.kind ?? this.scene.transition?.kind ?? "expand";
    const trigger =
      typeof opts.trigger === "string" ? document.querySelector(opts.trigger) : opts.trigger;
    if (!trigger) throw new Error("VexyStax.scrollspy: trigger element not found");

    // Build a normalized timeline so scroll progress maps through the same legs
    // (including holds) as the playable animation.
    const easing = this.scene.transition?.easing ?? "easeInOutCubic";
    const duration = this.scene.transition?.duration ?? 3.0;
    const wait = this.scene.transition?.wait ?? 0.0;

    const apply = (p) => {
      // Map scroll progress [0,1] -> morph t. By default through the transition
      // timeline; a custom `opts.map` (p -> t) enables non-linear scroll stories such
      // as the scrollable demo's tent (compact at the edges, expanded when centered).
      const t =
        typeof opts.map === "function"
          ? Math.max(0, Math.min(1, opts.map(p)))
          : this._scrollMorph(kind, p, easing, duration, wait);
      this.stage.applyFrameState(frameStateAt(this.scene, t, this.stage.camera.aspect), t);
      this.stage.render();
    };

    // Prime to the starting endpoint.
    apply(0);

    this._scrollspy?.disconnect?.();
    this._scrollspy = attachScrollspy({
      trigger,
      reducedMotion: opts.reducedMotion,
      onProgress: apply,
    });
    return this._scrollspy;
  }

  /** Resolve scroll progress p to a morph factor via the transition timeline. */
  _scrollMorph(kind, p, easing, duration, wait) {
    const timeline = buildTimeline(kind, { duration, wait });
    return morphAtProgress(timeline, p, (x) => ease(easing, x));
  }

  /** Tear down the three.js stage, stop animations/scrollspy, remove the canvas. */
  destroy() {
    this._cancelTransition?.();
    this._scrollspy?.disconnect?.();
    this._ro?.disconnect?.();
    this._ro = null;
    this.stage?.dispose();
  }
}
