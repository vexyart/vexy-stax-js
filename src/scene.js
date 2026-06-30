// SPDX-License-Identifier: Apache-2.0
// this_file: src/scene.js
//
// Shared scene-format v1 parser, mirroring vexy-stax-py/src/vexy_stax/scene.py
// and schema/vexy-stax-scene.schema.json. Parse, don't validate: unknown keys
// throw at the boundary (fail loud), defaults are filled in, and slide `src`
// paths are resolved against the scene URL base.

const VIEWS = ["expanded", "compact"];
const TRANSITION_KINDS = ["expand", "collapse", "expand_collapse", "collapse_expand"];
const SHOW_IN = ["expanded", "compact", "both", "none"];
const EASINGS = ["linear", "easeInOutCubic", "easeOutCubic", "easeInCubic"];
const DISTANCE_RE = /^[0-9]+(\.[0-9]+)?%?$/;

/** Reject any key on `obj` not present in `allowed`. */
function rejectExtraKeys(obj, allowed, where) {
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) {
      throw new Error(`Unknown key ${JSON.stringify(key)} in ${where}`);
    }
  }
}

function asObject(value, where) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${where} must be an object`);
  }
  return value;
}

function num(value, where, { min, max, gt, lt } = {}) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${where} must be a finite number`);
  }
  if (min !== undefined && value < min) throw new Error(`${where} must be >= ${min}`);
  if (max !== undefined && value > max) throw new Error(`${where} must be <= ${max}`);
  if (gt !== undefined && value <= gt) throw new Error(`${where} must be > ${gt}`);
  if (lt !== undefined && value >= lt) throw new Error(`${where} must be < ${lt}`);
  return value;
}

function int(value, where, opts) {
  num(value, where, opts);
  if (!Number.isInteger(value)) throw new Error(`${where} must be an integer`);
  return value;
}

function str(value, where) {
  if (typeof value !== "string") throw new Error(`${where} must be a string`);
  return value;
}

function bool(value, where) {
  if (typeof value !== "boolean") throw new Error(`${where} must be a boolean`);
  return value;
}

function oneOf(value, choices, where) {
  if (!choices.includes(value)) {
    throw new Error(`${where} must be one of ${choices.join(", ")} (got ${JSON.stringify(value)})`);
  }
  return value;
}

function parseSize(raw) {
  if (raw === undefined) return { width: 1920, height: 1080 };
  const o = asObject(raw, "size");
  rejectExtraKeys(o, new Set(["width", "height"]), "size");
  return {
    width: o.width === undefined ? 1920 : int(o.width, "size.width", { min: 1 }),
    height: o.height === undefined ? 1080 : int(o.height, "size.height", { min: 1 }),
  };
}

function parseDistance(raw) {
  if (raw === undefined) return "100%";
  if (typeof raw === "number") return num(raw, "camera.distance");
  if (typeof raw === "string") {
    if (!DISTANCE_RE.test(raw.trim())) {
      throw new Error(`camera.distance string must match ${DISTANCE_RE} (got ${JSON.stringify(raw)})`);
    }
    return raw;
  }
  throw new Error("camera.distance must be a number or string");
}

function parseCamera(raw) {
  if (raw === undefined) {
    return { gap: 1920, distance: "100%", angle: 60, elevation: 0, fov: 39.6 };
  }
  const o = asObject(raw, "camera");
  rejectExtraKeys(o, new Set(["gap", "distance", "angle", "elevation", "fov"]), "camera");
  return {
    gap: o.gap === undefined ? 1920 : num(o.gap, "camera.gap", { min: 0 }),
    distance: parseDistance(o.distance),
    angle: o.angle === undefined ? 60 : num(o.angle, "camera.angle"),
    elevation: o.elevation === undefined ? 0 : num(o.elevation, "camera.elevation"),
    fov: o.fov === undefined ? 39.6 : num(o.fov, "camera.fov", { gt: 0, lt: 180 }),
  };
}

function parseTransition(raw) {
  if (raw === undefined) return null;
  const o = asObject(raw, "transition");
  rejectExtraKeys(o, new Set(["kind", "duration", "wait", "fps", "easing"]), "transition");
  if (o.kind === undefined) throw new Error("transition.kind is required");
  return {
    kind: oneOf(o.kind, TRANSITION_KINDS, "transition.kind"),
    duration: o.duration === undefined ? 3.0 : num(o.duration, "transition.duration", { gt: 0 }),
    wait: o.wait === undefined ? 1.0 : num(o.wait, "transition.wait", { min: 0 }),
    fps: o.fps === undefined ? 30 : int(o.fps, "transition.fps", { min: 1 }),
    easing: o.easing === undefined ? "easeInOutCubic" : oneOf(o.easing, EASINGS, "transition.easing"),
  };
}

// Issue 335 §3 / 336: the `video` section centralizes the VIDEO render params. Mirrors
// vexy_stax.scene.Video exactly so PY and JS agree. Always present (default below): width/
// height fall back to scene.size when null; fps falls back to transition.fps (else 30);
// frames (transition frames PER LEG) falls back to round(transition.duration * fps);
// first_hold/last_hold (default 10) prepend/append held still frames in the video.
function parseVideo(raw) {
  if (raw === undefined) {
    return { width: null, height: null, fps: null, frames: null, first_hold: 10, last_hold: 10 };
  }
  const o = asObject(raw, "video");
  rejectExtraKeys(o, new Set(["width", "height", "fps", "frames", "first_hold", "last_hold"]), "video");
  const orNull = (v, where, opts) => (v === undefined || v === null ? null : int(v, where, opts));
  return {
    width: orNull(o.width, "video.width", { min: 1 }),
    height: orNull(o.height, "video.height", { min: 1 }),
    fps: orNull(o.fps, "video.fps", { min: 1 }),
    frames: orNull(o.frames, "video.frames", { min: 1 }),
    first_hold: o.first_hold === undefined ? 10 : int(o.first_hold, "video.first_hold", { min: 0 }),
    last_hold: o.last_hold === undefined ? 10 : int(o.last_hold, "video.last_hold", { min: 0 }),
  };
}

function parseFloor(raw) {
  // Default floor: an INVISIBLE white pane (opacity 0 → no grey floor rectangle) with faint
  // reflections (reflectivity 0.1) so decks read as floating with just a whisper of mirror.
  // Kept in exact lockstep with vexy_stax.scene.Floor (PY↔JS parity).
  if (raw === undefined) return { color: "#ffffff", opacity: 0.0, reflectivity: 0.1 };
  const o = asObject(raw, "floor");
  rejectExtraKeys(o, new Set(["color", "opacity", "reflectivity"]), "floor");
  return {
    color: o.color === undefined ? "#ffffff" : str(o.color, "floor.color"),
    opacity: o.opacity === undefined ? 0.0 : num(o.opacity, "floor.opacity", { min: 0, max: 1 }),
    reflectivity:
      o.reflectivity === undefined ? 0.1 : num(o.reflectivity, "floor.reflectivity", { min: 0, max: 1 }),
  };
}

function parseEdge(raw) {
  // Optional plate border (issue 305): thin frame, OFF by default (issue 326: width 0 ⇒ no
  // slide-plate border and no caption-plate border). Default color #f2f2f2 when enabled (issue 324).
  if (raw === undefined) return { width: 0.0, color: "#f2f2f2" };
  const o = asObject(raw, "edge");
  rejectExtraKeys(o, new Set(["width", "color"]), "edge");
  return {
    width: o.width === undefined ? 0.0 : num(o.width, "edge.width", { min: 0 }),
    color: o.color === undefined ? "#f2f2f2" : str(o.color, "edge.color"),
  };
}

function parseCaptionStyle(raw, where) {
  if (raw === undefined) return null;
  const o = asObject(raw, where);
  // color = caption TEXT color; fill_color/border_color = caption plate fill/border (issue 324).
  rejectExtraKeys(o, new Set(["size", "color", "font", "fill_color", "border_color"]), where);
  const out = {};
  if (o.size !== undefined) out.size = num(o.size, `${where}.size`, { gt: 0 });
  if (o.color !== undefined) out.color = str(o.color, `${where}.color`);
  if (o.font !== undefined) out.font = str(o.font, `${where}.font`);
  if (o.fill_color !== undefined) out.fill_color = str(o.fill_color, `${where}.fill_color`);
  if (o.border_color !== undefined) out.border_color = str(o.border_color, `${where}.border_color`);
  return out;
}

function parseCaptionFade(raw) {
  if (raw === undefined) return null;
  const o = asObject(raw, "caption_fade");
  rejectExtraKeys(o, new Set(["window", "stagger", "stagger_frames"]), "caption_fade");
  return {
    window: o.window === undefined ? 0.9 : num(o.window, "caption_fade.window", { gt: 0, max: 1 }),
    stagger: o.stagger === undefined ? 0.3 : num(o.stagger, "caption_fade.stagger", { min: 0, lt: 1 }),
    // Issue 309: per-caption back->front step in transition FRAMES; overrides `stagger`.
    stagger_frames:
      o.stagger_frames === undefined || o.stagger_frames === null
        ? null
        : int(o.stagger_frames, "caption_fade.stagger_frames", { min: 0 }),
  };
}

function parseCaption(raw, where) {
  if (raw === undefined) return null;
  const o = asObject(raw, where);
  rejectExtraKeys(o, new Set(["text", "show_in", "style"]), where);
  if (o.text === undefined) throw new Error(`${where}.text is required`);
  return {
    text: str(o.text, `${where}.text`),
    show_in: o.show_in === undefined ? "expanded" : oneOf(o.show_in, SHOW_IN, `${where}.show_in`),
    style: parseCaptionStyle(o.style, `${where}.style`),
  };
}

function parseOpacity(raw, where) {
  if (raw === undefined) return 1.0;
  if (typeof raw === "number") return num(raw, where, { min: 0, max: 1 });
  const o = asObject(raw, where);
  rejectExtraKeys(o, new Set(["expanded", "compact"]), where);
  return {
    expanded: o.expanded === undefined ? 1.0 : num(o.expanded, `${where}.expanded`, { min: 0, max: 1 }),
    compact: o.compact === undefined ? 1.0 : num(o.compact, `${where}.compact`, { min: 0, max: 1 }),
  };
}

function parseSlide(raw, index) {
  const where = `slides[${index}]`;
  const o = asObject(raw, where);
  rejectExtraKeys(o, new Set(["src", "gap", "opacity", "caption"]), where);
  if (o.src === undefined) throw new Error(`${where}.src is required`);
  // Tri-state gap: key absent ⇒ null (inherit camera.gap); explicit `null` or `0`
  // ⇒ the minimal gap (geometry resolves 0 ⇒ MIN_GAP, the compact-view spacing);
  // any positive number ⇒ that value. `null` and absence are deliberately distinct.
  let gap = null;
  if (o.gap === null) gap = 0;
  else if (o.gap !== undefined) gap = num(o.gap, `${where}.gap`, { min: 0 });
  return {
    src: str(o.src, `${where}.src`),
    gap,
    opacity: parseOpacity(o.opacity, `${where}.opacity`),
    caption: parseCaption(o.caption, `${where}.caption`),
  };
}

/** Opacity for `view`; a scalar opacity returns itself. Mirrors Slide.resolved_opacity. */
export function resolvedOpacity(slide, view) {
  const op = slide.opacity;
  if (op !== null && typeof op === "object") {
    return view === "expanded" ? op.expanded : op.compact;
  }
  return Number(op);
}

/**
 * Parse a raw scene object into a normalized scene. Strict: unknown top-level or
 * slide keys throw. Defaults are filled to match scene.py. The `$schema` pointer
 * key is accepted and ignored.
 */
export function parseScene(raw) {
  const o = asObject(raw, "scene");
  const allowed = new Set([
    "$schema",
    "version",
    "view",
    "size",
    "camera",
    "transition",
    "floor",
    "edge",
    "background",
    "juicy",
    "captions",
    "video",
    "caption_defaults",
    "caption_fade",
    "slides",
  ]);
  rejectExtraKeys(o, allowed, "scene");

  if (o.version !== undefined && o.version !== 1) {
    throw new Error(`version must be 1 (got ${JSON.stringify(o.version)})`);
  }
  if (o.slides === undefined) throw new Error("slides is required");
  if (!Array.isArray(o.slides) || o.slides.length < 1) {
    throw new Error("slides must be a non-empty array");
  }

  return {
    version: 1,
    view: o.view === undefined ? "expanded" : oneOf(o.view, VIEWS, "view"),
    size: parseSize(o.size),
    camera: parseCamera(o.camera),
    transition: parseTransition(o.transition),
    floor: parseFloor(o.floor),
    edge: parseEdge(o.edge),
    background: o.background === undefined ? "#ffffff" : str(o.background, "background"),
    juicy: o.juicy === undefined ? false : bool(o.juicy, "juicy"),
    // Issue 332: global captions toggle (default true → preserves prior stacked-with-captions
    // behavior). false skips all caption plates and drops slides onto the floor.
    captions: o.captions === undefined ? true : bool(o.captions, "captions"),
    video: parseVideo(o.video),
    caption_defaults: parseCaptionStyle(o.caption_defaults, "caption_defaults"),
    caption_fade: parseCaptionFade(o.caption_fade),
    slides: o.slides.map((s, i) => parseSlide(s, i)),
  };
}

// Issue 341: the "extremely easy to use" entry point. Build a valid Scene object from a
// bare list of slide image URLs (or {src, caption, opacity, gap} objects) + a flat options
// bag, filling sensible defaults so even `makeScene(["a.png", "b.png"])` renders. The result
// goes straight through parseScene (so the SAME strict invariants apply — illegal scenes
// still throw) and is returned normalized, ready for `new VexyStax(el, scene)`. Slide `src`
// may be a local path, a `data:` URI, OR a remote http(s) URL — resolveSrc/the TextureLoader
// preserve absolute URLs (and stage.js sets crossOrigin so remote images load + stay
// canvas-exportable). This keeps "easy scene customization" + "remote URL" in one helper.

/** One slide entry → a raw scene-slide object. A bare string is treated as `src`. */
function slideEntry(entry, index, defaults) {
  if (typeof entry === "string") {
    const slide = { src: entry };
    if (defaults.caption) slide.caption = { text: "", show_in: "expanded" };
    return slide;
  }
  if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
    throw new Error(`makeScene: slides[${index}] must be a string URL or an object`);
  }
  // Accept the friendly shape {src, caption, opacity, gap}. `caption` may be a plain
  // string (→ {text, show_in:"expanded"}) for ergonomics, or the full caption object.
  const slide = {};
  if (entry.src === undefined) throw new Error(`makeScene: slides[${index}].src is required`);
  slide.src = entry.src;
  // Pass `null` through so the friendly array can request the minimal gap too;
  // parseSlide maps absent ⇒ inherit, null/0 ⇒ minimal.
  if (entry.gap !== undefined) slide.gap = entry.gap;
  if (entry.opacity !== undefined) slide.opacity = entry.opacity;
  if (entry.caption !== undefined) {
    slide.caption =
      typeof entry.caption === "string"
        ? { text: entry.caption, show_in: "expanded" }
        : entry.caption;
  }
  return slide;
}

/**
 * Build a normalized Scene from a list of slide image URLs (or slide objects) plus a flat
 * options bag (issue 341). Returns a parsed scene (via parseScene), so it is ready to hand
 * to `new VexyStax(container, scene)`. Sensible defaults are filled so a bare list of URLs
 * renders. Slide `src` may be local, `data:`, or a remote http(s) URL.
 *
 * @param {Array<string|{src:string, caption?:string|object, opacity?:number|object, gap?:number}>} slides
 *   slide image URLs or slide objects (at least one).
 * @param {object} [opts] flat scene options:
 *   @param {{width:number,height:number}|number[]} [opts.size]  scene size (default 1920×1080)
 *   @param {object} [opts.camera]      camera overrides (gap/distance/angle/elevation/fov)
 *   @param {string} [opts.gap]         shortcut for camera.gap (expanded plate spacing)
 *   @param {string|object} [opts.transition]  a transition KIND string, or a full transition object
 *   @param {string} [opts.view]        initial view ("expanded" | "compact")
 *   @param {string} [opts.background]  background CSS color
 *   @param {boolean} [opts.captions]   global captions toggle (default: true)
 *   @param {object} [opts.floor]       floor overrides (color/opacity/reflectivity)
 *   @param {object} [opts.edge]        plate edge overrides (width/color)
 *   @param {object} [opts.caption_defaults] caption style defaults (size/color/font/…)
 *   @param {object} [opts.caption_fade]     caption fade overrides
 *   @param {object} [opts.video]       video render overrides
 * @returns {object} a normalized scene (same shape as parseScene's output)
 */
export function makeScene(slides, opts = {}) {
  if (!Array.isArray(slides) || slides.length < 1) {
    throw new Error("makeScene: pass a non-empty array of slide URLs or slide objects");
  }
  if (opts === null || typeof opts !== "object" || Array.isArray(opts)) {
    throw new Error("makeScene: opts must be an object");
  }
  // Fail loud on unknown options (parse, don't validate): a typo'd override (e.g. `juicey`)
  // shouldn't be silently dropped. `baseUrl`/`gap` are makeScene conveniences; the rest map
  // 1:1 onto scene keys validated by parseScene.
  const ALLOWED_OPTS = new Set([
    "baseUrl", "gap", "size", "camera", "transition", "view", "background",
    "captions", "floor", "edge", "juicy", "caption_defaults", "caption_fade", "video",
  ]);
  for (const key of Object.keys(opts)) {
    if (!ALLOWED_OPTS.has(key)) throw new Error(`makeScene: unknown option ${JSON.stringify(key)}`);
  }

  // A bare list of objects with no caption text shouldn't auto-add empty caption plates;
  // `captions` only forces empty captions for STRING slides when explicitly requested.
  const wantCaptions = opts.captions === true;
  const raw = { version: 1, slides: slides.map((s, i) => slideEntry(s, i, { caption: wantCaptions })) };

  // size: accept {width,height} or [w,h].
  if (opts.size !== undefined) {
    if (Array.isArray(opts.size)) raw.size = { width: opts.size[0], height: opts.size[1] };
    else raw.size = opts.size;
  }

  // camera: start from explicit overrides, then fold in the `gap` shortcut.
  if (opts.camera !== undefined || opts.gap !== undefined) {
    raw.camera = { ...(opts.camera ?? {}) };
    if (opts.gap !== undefined) raw.camera.gap = opts.gap;
  }

  // transition: a bare kind string is expanded to a minimal transition object; an object
  // passes through (parseScene fills its own defaults + validates the kind).
  if (opts.transition !== undefined) {
    raw.transition =
      typeof opts.transition === "string" ? { kind: opts.transition } : opts.transition;
  }

  if (opts.view !== undefined) raw.view = opts.view;
  if (opts.background !== undefined) raw.background = opts.background;
  // captions: only forward an explicit boolean (string-slide empty captions handled above).
  if (typeof opts.captions === "boolean") raw.captions = opts.captions;
  if (opts.floor !== undefined) raw.floor = opts.floor;
  if (opts.edge !== undefined) raw.edge = opts.edge;
  if (opts.juicy !== undefined) raw.juicy = opts.juicy;
  if (opts.caption_defaults !== undefined) raw.caption_defaults = opts.caption_defaults;
  if (opts.caption_fade !== undefined) raw.caption_fade = opts.caption_fade;
  if (opts.video !== undefined) raw.video = opts.video;

  const scene = parseScene(raw);
  // Resolve slide srcs against an optional base (the host page / scene URL). Absolute
  // http(s) URLs and `data:` URIs are preserved (resolveSrc uses `new URL(src, base)`), so
  // remote slide images keep working; relative paths resolve against the base (issue 341).
  const base =
    opts.baseUrl ?? (typeof document !== "undefined" ? document.baseURI : undefined);
  if (base) {
    for (const slide of scene.slides) slide.src = resolveSrc(slide.src, base);
  }
  return scene;
}

/**
 * Resolve a slide `src` against `base` (a URL string).
 *
 * **`data:` URI pass-through**: when `src` begins with `"data:"` it is returned
 * unchanged. These URIs carry their payload (often base64-encoded image bytes)
 * inline — no network request is needed and no URL resolution applies. Three.js
 * texture loader accepts them directly. The actual base64 decode happens inside
 * the browser's image decoding pipeline when the texture is uploaded to the GPU.
 *
 * For all other values `new URL(src, base)` resolves relative paths against the
 * scene file's location (or `options.baseUrl`). Absolute `http(s)` URLs are
 * preserved as-is by `URL` resolution.
 */
function resolveSrc(src, base) {
  if (src.startsWith("data:")) return src;
  if (!base) return src;
  try {
    return new URL(src, base).href;
  } catch {
    return src;
  }
}

/**
 * Load and normalize a scene from a URL string or an inline object.
 *
 * - String: fetched, JSON-parsed, and slide `src` paths are resolved relative to
 *   that URL.
 * - Object: parsed in place; slide `src` paths are resolved relative to
 *   `options.baseUrl` if given, otherwise left as-is.
 */
export async function loadScene(urlOrObject, options = {}) {
  let raw;
  let base = options.baseUrl;

  if (typeof urlOrObject === "string") {
    const url = new URL(urlOrObject, options.baseUrl ?? (typeof location !== "undefined" ? location.href : undefined));
    base = url.href;
    const res = await fetch(url.href);
    if (!res.ok) throw new Error(`Failed to fetch scene ${url.href}: ${res.status}`);
    raw = await res.json();
  } else {
    raw = urlOrObject;
  }

  const scene = parseScene(raw);
  for (const slide of scene.slides) {
    slide.src = resolveSrc(slide.src, base);
  }
  return scene;
}
