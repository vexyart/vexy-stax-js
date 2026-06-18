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
  // Smoked glass: ~4% opacity, dark tint, reflective (issue 303 §1).
  if (raw === undefined) return { color: "#1a1a1a", opacity: 0.04, reflectivity: 0.5 };
  const o = asObject(raw, "floor");
  rejectExtraKeys(o, new Set(["color", "opacity", "reflectivity"]), "floor");
  return {
    color: o.color === undefined ? "#1a1a1a" : str(o.color, "floor.color"),
    opacity: o.opacity === undefined ? 0.04 : num(o.opacity, "floor.opacity", { min: 0, max: 1 }),
    reflectivity:
      o.reflectivity === undefined ? 0.5 : num(o.reflectivity, "floor.reflectivity", { min: 0, max: 1 }),
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
  let gap = null;
  if (o.gap !== undefined && o.gap !== null) gap = num(o.gap, `${where}.gap`, { min: 0 });
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

/** Resolve a slide `src` against `base` (a URL string). `data:` URIs pass through. */
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
