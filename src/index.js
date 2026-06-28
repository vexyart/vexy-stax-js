// SPDX-License-Identifier: Apache-2.0
// this_file: src/index.js
//
// Public ESM API (SPEC.md §6.1): a static view, image export, a playable
// transition, video export, and a scroll-driven transition. The view math comes
// from geometry.js (mirrors the Python exactly); the morph driver, scrollspy
// mapping, and exporters are in transition.js / scrollspy.js / export.js.

import { Stage } from "./stage.js";
import { loadScene, parseScene, makeScene, resolvedOpacity } from "./scene.js";
import { frameStateAt, ease } from "./geometry.js";
import { playTransition, transitionEndpoints, buildTimeline, morphAtProgress } from "./transition.js";
import { attachScrollspy } from "./scrollspy.js";
import { attachControls } from "./controls.js";
import { canvasToPngBlob, recordVideo } from "./export.js";

export {
  loadScene,
  parseScene,
  makeScene,
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
    // Issue 342: track the CURRENT view so click-to-toggle knows which way to go. Starts at the
    // scene's initial view; updated by setView/seek/transition/toggleView. `_morphT` is the last
    // applied morph factor (0=compact, 1=expanded) used to disambiguate mid-morph clicks.
    this._currentView = scene.view === "compact" ? "compact" : "expanded";
    this._morphT = this._currentView === "compact" ? 0 : 1;
    this._clickToggle = null; // { handler } when wired (enableClickToggle)
    this._controls = null; // { destroy } when wired (controls(), issue 343)
    this._toggling = false; // guard against overlapping toggle transitions
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
    this._morphT = view === "compact" ? 0 : 1;
    this._setView_(view === "compact" ? "compact" : "expanded");
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
    // Issue 342: remember the morph position so a click-toggle on a scroll-driven deck knows
    // whether it is currently nearer compact (→ expand) or expanded (→ collapse).
    this._morphT = tt;
    // Issue 344 follow-up: emit a viewchange when the scroll crosses the compact/expanded midpoint
    // so the control-button label (and any host UI) stays in sync during a scroll-driven morph.
    this._setView_(tt >= 0.5 ? "expanded" : "compact");
    return this;
  }

  /** Set `_currentView` and emit a "viewchange" CustomEvent on the container when it changes (343/344). */
  _setView_(view) {
    if (view === this._currentView) return;
    this._currentView = view;
    this.container?.dispatchEvent?.(new CustomEvent("viewchange", { detail: { view } }));
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
      // Pass the LIVE container aspect so the animated frames match setView()/seek() framing
      // (issue 342: otherwise the compact endpoint is framed too close on a wide container).
      // `opts.duration` lets a click-toggle play a snappy leg instead of the full scene timing.
    }, { kind: resolvedKind, onProgress: opts.onProgress, aspect: this.stage.camera.aspect, duration: opts.duration });

    this._cancelTransition = controller.cancel;
    this.container.dispatchEvent?.(new CustomEvent("transitionstart", { detail: { kind: resolvedKind } }));
    try {
      await controller.promise;
      // Settle the tracked view to the transition's end endpoint (issue 342).
      const { endMorph } = transitionEndpoints(resolvedKind);
      this._morphT = endMorph;
      this._setView_(endMorph >= 0.5 ? "expanded" : "compact");
      this.container.dispatchEvent?.(new CustomEvent("transitionend", { detail: { kind: resolvedKind } }));
    } finally {
      this._cancelTransition = null;
    }
    return this;
  }

  /**
   * Click-to-toggle (issue 342): fluently transition between the two views. If the deck is
   * currently expanded (or mid-morph past halfway), collapse to compact; otherwise expand.
   * Reuses the existing morph driver (a smooth `collapse`/`expand` leg) — never a snap. Safe to
   * call repeatedly: an in-flight toggle is ignored until it settles. Returns the played kind.
   */
  async toggleView() {
    await this._ready;
    if (this._toggling) return null;
    const goCompact = this._currentView !== "compact"; // not compact ⇒ collapse to compact
    const kind = goCompact ? "collapse" : "expand";
    this._toggling = true;
    try {
      // The scene may have no `transition` section (e.g. a slides-only deck) — supply timing so
      // toggle still animates. transition() reads scene.transition for the easing; ensure one exists.
      if (!this.scene.transition) {
        this.scene.transition = { kind, duration: 0.7, wait: 0, fps: 30, easing: "easeInOutCubic" };
      }
      // Issue 342: a click-toggle plays a SNAPPY leg (0.7 s) regardless of the scene's
      // transition.duration (which may be a long 3 s scroll-story ramp) — overriding it here.
      await this.transition(kind, { duration: 0.7 });
    } finally {
      this._toggling = false;
    }
    return kind;
  }

  /**
   * Enable click-to-toggle on the container (issue 342): a pointer click anywhere inside the
   * element fluently toggles compact↔expanded. ON by default for interactive containers (the
   * <vexy-stax> element + createStax) and layered ON TOP of scrollspy (scroll drives the morph;
   * a click still toggles). Idempotent. Pass to disableClickToggle() to opt out.
   */
  enableClickToggle() {
    if (this._clickToggle || !this.container?.addEventListener) return this;
    const handler = (ev) => {
      // Ignore clicks on interactive controls a host may overlay (buttons/links/inputs).
      const tag = ev.target?.tagName;
      if (tag && /^(BUTTON|A|INPUT|SELECT|TEXTAREA|LABEL)$/.test(tag)) return;
      this.toggleView();
    };
    this.container.addEventListener("click", handler);
    // Pointer affordance so it reads as clickable.
    if (this.container.style && !this.container.style.cursor) this.container.style.cursor = "pointer";
    this._clickToggle = { handler };
    return this;
  }

  /**
   * Add built-in control buttons over the deck (issue 343): a single relabeling toggle
   * ("Explain" → expand, "Preview" → compact) or a side-by-side pair. Frosted, bottom-centered by
   * default; themeable via `--vexy-btn-*` CSS custom properties on the element. Replaces any prior
   * controls. Pass `false` to remove them. Options: `{type:"toggle"|"pair", explainLabel,
   * previewLabel, position, style}`.
   */
  controls(opts = {}) {
    this._controls?.destroy();
    this._controls = opts === false ? null : attachControls(this, this.container, opts);
    return this;
  }

  /** Remove the click-to-toggle handler (issue 342 opt-out). */
  disableClickToggle() {
    if (this._clickToggle) {
      this.container.removeEventListener?.("click", this._clickToggle.handler);
      this._clickToggle = null;
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
   * Record the transition to a video Blob.
   *
   * **Encoding path selection** (export.js `recordVideo`):
   * 1. **PRIMARY — WebCodecs + mp4-muxer** (issue 331): uses `VideoEncoder` to
   *    encode each rendered frame directly into H.264/mp4 (preferred) or VP9/webm.
   *    Produces a fully seekable container with correct duration and per-stream
   *    frame-count metadata. Available in Chrome 94+, Edge 94+, and recent Safari.
   * 2. **FALLBACK — MediaRecorder** (`canvas.captureStream`): used when
   *    `VideoEncoder` is unavailable (older browsers, some WebViews). Output is a
   *    non-seekable webm stream; duration/frame metadata may be absent. The
   *    recorded MIME type reflects the first supported codec from
   *    `[vp9, vp8, webm, mp4]`.
   *
   * The clip is bookended by held stills: `scene.video.first_hold` copies of the
   * start frame and `scene.video.last_hold` copies of the end frame (default 10
   * each, matching the Python `frame_plan` holds).
   *
   * @param {object} [opts]
   * @param {string} [opts.kind] override scene.transition.kind
   * @returns {Promise<Blob>} mp4 Blob (WebCodecs path) or webm Blob (MediaRecorder fallback)
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
   * §6.4). Attaches an `IntersectionObserver` that activates a
   * `scroll`+`requestAnimationFrame` loop only while the trigger is visible,
   * mapping scroll progress [0,1] to a morph factor via the scene's transition
   * timeline (`buildTimeline` → `morphAtProgress`).
   *
   * **`prefers-reduced-motion` handling**: when the OS/browser reports reduced
   * motion (or when `opts.reducedMotion` is `true`), the rAF loop is skipped
   * entirely. Instead, a lightweight scroll listener snaps the deck to the
   * nearest endpoint (0 or 1) based on whether the trigger's center has passed
   * the middle of the viewport — no per-frame interpolation occurs.
   *
   * @param {object} opts
   * @param {Element|string} opts.trigger element or CSS selector for the scroll region
   * @param {string} [opts.kind] override scene.transition.kind
   * @param {boolean} [opts.reducedMotion] override prefers-reduced-motion detection
   * @param {(p:number)=>number} [opts.map] custom progress→morph mapping (e.g. tent
   *   function for compact-at-edges / expanded-at-center stories; overrides the
   *   built-in timeline mapping when provided)
   * @returns {{disconnect:()=>void}} handle — call `.disconnect()` to stop observing
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
    this.disableClickToggle();
    this._controls?.destroy();
    this._controls = null;
    this._ro?.disconnect?.();
    this._ro = null;
    this.stage?.dispose();
  }
}

// Scene-construction options consumed by createStax/makeScene rather than describing how to
// MOUNT (view/mode/trigger/width/height) or WHICH source (slides/scene). Everything else in
// `opts` is treated as a flat scene override and forwarded to makeScene (issue 341).
const MOUNT_KEYS = new Set([
  "slides", "scene", "view", "mode", "trigger", "width", "height", "aspect", "baseUrl", "clickToggle",
]);

/**
 * The "extremely easy to use" ESM factory (issue 341), mirroring lines-nano's `createNano`.
 * Resolve the mount element, build the scene (from a bare `slides` list via makeScene, or
 * from a `scene` URL/object via loadScene), mount a VexyStax, wait until it's ready, optionally
 * start a mode (playable/scrollspy), and return the ready instance.
 *
 * @param {HTMLElement|string} elOrSelector mount element or a CSS selector for it
 * @param {object} [opts]
 *   @param {string[]|object[]} [opts.slides]  slide image URLs (local/data:/remote) or slide
 *       objects — the easy path; built via makeScene with the remaining opts as overrides.
 *   @param {string|object} [opts.scene]  a scene URL or inline scene object (via loadScene);
 *       used when `slides` is not given.
 *   @param {"expanded"|"compact"} [opts.view]  initial view.
 *   @param {"static"|"playable"|"scrollspy"} [opts.mode]  mount mode (default "static").
 *       "playable" plays scene.transition once when ready; "scrollspy" attaches a scroll story.
 *   @param {Element|string} [opts.trigger]  scrollspy trigger (default: the element).
 *   @param {string} [opts.width] @param {string} [opts.height]  CSS size overrides on the element.
 *   @param {string|number} [opts.aspect]  CSS aspect-ratio for the box (e.g. 3, "3/1", "3:1").
 *   @param {string} [opts.baseUrl]  base for resolving relative slide/scene URLs.
 *   ...any other key is a flat scene override forwarded to makeScene (size, camera, gap,
 *      transition, background, captions, floor, edge, caption_defaults, …).
 * @returns {Promise<VexyStax>} the ready instance.
 */
export async function createStax(elOrSelector, opts = {}) {
  const el =
    typeof elOrSelector === "string" ? document.querySelector(elOrSelector) : elOrSelector;
  if (!el) throw new Error(`createStax: element not found (${String(elOrSelector)})`);
  if (opts === null || typeof opts !== "object") throw new Error("createStax: opts must be an object");

  // Optional CSS size on the host element (parity with the <vexy-stax> width/height attrs).
  if (opts.width) el.style.width = /^\d+$/.test(String(opts.width)) ? `${opts.width}px` : opts.width;
  if (opts.height) el.style.height = /^\d+$/.test(String(opts.height)) ? `${opts.height}px` : opts.height;
  // Issue 701: `aspect` shapes the box via CSS aspect-ratio (e.g. 3, "3/1", "3:1" → a 3:1 deck);
  // ":"/"x" are normalized to "/". Parity with the <vexy-stax aspect="…"> attribute.
  if (opts.aspect) el.style.aspectRatio = String(opts.aspect).trim().replace(/[:x]/i, " / ");
  if (typeof el.style === "object") {
    el.style.position = el.style.position || "relative";
    el.style.display = el.style.display || "block";
  }

  const baseUrl = opts.baseUrl ?? (typeof document !== "undefined" ? document.baseURI : undefined);

  let scene;
  if (opts.slides) {
    // Flat scene overrides = every opt that isn't a mount/source key.
    const sceneOpts = { baseUrl };
    for (const [k, v] of Object.entries(opts)) {
      if (!MOUNT_KEYS.has(k)) sceneOpts[k] = v;
    }
    scene = makeScene(opts.slides, sceneOpts);
  } else if (opts.scene !== undefined) {
    scene = await loadScene(opts.scene, { baseUrl });
  } else {
    throw new Error("createStax: provide `slides` (URLs) or `scene` (URL/object)");
  }

  // The view override wins over the scene's own initial view.
  if (opts.view) scene.view = opts.view;

  const stax = new VexyStax(el, scene);
  await stax.ready;

  const mode = opts.mode ?? "static";
  if (mode === "scrollspy") {
    const trigger =
      typeof opts.trigger === "string" ? document.querySelector(opts.trigger) : opts.trigger ?? el;
    stax.scrollspy({ trigger });
  } else if (mode === "playable" && scene.transition) {
    // Kick off the scene's transition once (best-effort; ignore if it's cancelled by teardown).
    stax.transition().catch(() => {});
  }

  // Issue 342: click-to-toggle is ON by default for the interactive container (every mode),
  // and layers on top of scrollspy (scroll drives the morph; a click still toggles). Opt out
  // with `clickToggle: false`.
  if (opts.clickToggle !== false) stax.enableClickToggle();

  // Issue 343: built-in control buttons. `buttons: true` (or "toggle"/"pair") shows the overlay;
  // `explainLabel`/`previewLabel`/`buttonsPosition`/`buttonStyle` customize it (or pass a full
  // object as `buttons`).
  if (opts.buttons) {
    const c = typeof opts.buttons === "object" ? opts.buttons : { type: opts.buttons === "pair" ? "pair" : "toggle" };
    stax.controls({
      explainLabel: opts.explainLabel,
      previewLabel: opts.previewLabel,
      position: opts.buttonsPosition,
      style: opts.buttonStyle,
      ...c,
    });
  }
  return stax;
}
