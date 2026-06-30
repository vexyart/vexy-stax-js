// SPDX-License-Identifier: Apache-2.0
// this_file: src/geometry.js
//
// Engine-agnostic view geometry per SPEC.md §3, mirroring
// vexy-stax-py/src/vexy_stax/geometry.py EXACTLY (same formulas, same easings,
// same camera math). Pure functions only. The numeric outputs must match the
// Python for the same scene.
//
// Coordinate convention (three.js Y-up — SPEC.md §1, §3):
// - X = plate width (centered at 0); Y = vertical/up (plates centered at Y=0);
//   Z = depth/stacking, front plate at Z=0, index 0 (farthest) at Z=-stackDepth,
//   +Z toward the viewer. Deck center is at Z = -stackDepth/2.
// - Compact camera sits head-on on +Z; expanded orbits to azimuth/elevation.
// - Camera framing uses scene.size as the plate size so Python and JS agree.
// - Plate width/height in points == pixel dimensions of the source image.

import { resolvedOpacity } from "./scene.js";

export const MIN_GAP = 3.0;
export const FILL = 0.85;
export const V_FILL = 0.98; // expanded: max fraction of frame height the deck may occupy (no crop)

// Caption fade defaults (issue 302 §B.4): captions fade in over the final
// CAPTION_FADE_WINDOW fraction of the morph, staggered back->front by CAPTION_STAGGER.
export const CAPTION_FADE_WINDOW = 0.9;
export const CAPTION_STAGGER = 0.3;
// Caption layout (issue 302 §B, em-based): captions sit to the LEFT of the plates with
// their RIGHT edges aligned CAPTION_GAP_EM em (em == caption size) from the plate left
// edge (0 = touching, issues 321/323), and the text BASELINE CAPTION_BASELINE_EM em above
// the virtual ground (the floor at the bottom of the plates). The nominal "em" is the
// caption size in scene points.
export const CAPTION_GAP_EM = 0.0; // issues 321/323: caption plate right edge touches slide plate left edge
export const CAPTION_BASELINE_EM = 1.0;
// Caption plate (issues 311, 315): each caption sits on a small white opaque bordered plate.
// Plate height = CAPTION_PLATE_HEIGHT_FRAC of the plate height; text 1em =
// CAPTION_FONT_FRAC_OF_PLATE of the caption-plate height; plate padded CAPTION_PLATE_PAD_EM
// em on each side of the text. Default caption size = 0.10*0.75 = 0.075 of scene height
// (issue 315 revised plate height 20%->10% and pad 1.5em->0.75em). Mirrors geometry.py.
export const CAPTION_PLATE_HEIGHT_FRAC = (0.1 * 4) / 3; // ≈0.1333 (issue 324: font 1/3 larger; was 0.10)
export const CAPTION_FONT_FRAC_OF_PLATE = 0.75;
export const CAPTION_PLATE_PAD_EM = 0.75;
export const CAPTION_DEFAULT_SIZE_FRAC = CAPTION_PLATE_HEIGHT_FRAC * CAPTION_FONT_FRAC_OF_PLATE; // ≈0.10 (issue 324; was 0.075)

// Floor reflection (issue 303 §1) — shared so the blurry reflection is consistent across
// engines. Fraction of the plate-image height (px). (Floor shadows removed per issue 312.)
export const REFLECTION_BLUR_FRAC = 0.02; // Gaussian blur radius of the mirror reflection

/**
 * Plate border thickness in scene points (issue 305): edge.width × plate height. Mirrors
 * plate_edge_width in geometry.py. Caption plates (issue 311) reuse this same border.
 */
export function plateEdgeWidth(scene) {
  return scene.size.height * scene.edge.width;
}

/**
 * Nominal caption text size in scene points (1em). Resolves caption_defaults.size when set,
 * else CAPTION_DEFAULT_SIZE_FRAC of scene height (issue 311). Mirrors caption_size.
 */
export function captionSize(scene) {
  const cd = scene.caption_defaults;
  if (cd && cd.size !== null && cd.size !== undefined) return Number(cd.size);
  return Math.max(8.0, scene.size.height * CAPTION_DEFAULT_SIZE_FRAC);
}

/** Caption plate FILL color (issue 324): caption_defaults.fill_color else scene.edge.color. */
export function captionFillColor(scene) {
  const cd = scene.caption_defaults;
  return cd && cd.fill_color ? cd.fill_color : scene.edge.color;
}

/** Caption plate BORDER color (issue 324): caption_defaults.border_color else scene.edge.color. */
export function captionBorderColor(scene) {
  const cd = scene.caption_defaults;
  return cd && cd.border_color ? cd.border_color : scene.edge.color;
}

/**
 * Height of a caption plate in scene points (issue 311): caption_size / 0.75 so the text
 * 1em stays 75% of the plate height. Mirrors caption_plate_height in geometry.py.
 */
export function captionPlateHeight(scene) {
  return captionSize(scene) / CAPTION_FONT_FRAC_OF_PLATE;
}

/**
 * World Y of a caption plate's vertical center (issue 311; relayout issue 332): the plate
 * sits RIGHT ON the floor (its bottom edge on the floor line Y = -height/2), so its center
 * is half its plate height above it. The slide plate then sits on TOP (see slideLift).
 * Mirrors caption_plate_center_y in geometry.py.
 */
export function captionPlateCenterY(scene) {
  return -(scene.size.height / 2.0) + captionPlateHeight(scene) / 2.0;
}

/**
 * World Y offset added to EVERY slide plate's vertical center (issue 332). Captions ON: each
 * slide sits on TOP of its on-floor caption plate, so it is lifted by exactly one
 * caption-plate height relative to the centered (Y=0) convention. Captions OFF: no caption
 * plates, slides sit directly on the floor → lift 0. Mirrors slide_lift in geometry.py.
 */
export function slideLift(scene) {
  return scene.captions ? captionPlateHeight(scene) : 0.0;
}

/**
 * World X where every caption plate's LEFT edge aligns (issue 332 relayout): the caption
 * plate is LEFT-aligned with its slide plate, so its left edge sits at the slide left edge
 * (-width/2). CAPTION_GAP_EM is 0, so the numeric value is unchanged from the prior
 * right-edge anchor; only the meaning (now a LEFT edge) changed. Mirrors caption_anchor_x.
 */
export function captionAnchorX(scene) {
  return -(scene.size.width / 2.0 + CAPTION_GAP_EM * captionSize(scene));
}

/**
 * World Y of the caption text BASELINE — CAPTION_BASELINE_EM em above the virtual ground
 * (the floor at the bottom of the plates, Y = -height/2). Mirrors caption_baseline_y in
 * geometry.py.
 */
export function captionBaselineY(scene) {
  return -(scene.size.height / 2.0) + CAPTION_BASELINE_EM * captionSize(scene);
}

/**
 * Per-slide gap (points). A null field (set only when the scene omits the gap key)
 * inherits camera.gap; a 0 field (set by an explicit `null` or `0` in the scene)
 * resolves to MIN_GAP, the same minimal spacing used in the compact view.
 */
export function plateGaps(scene) {
  return scene.slides.map((s) => {
    let g = (s.gap === null || s.gap === undefined ? scene.camera.gap : s.gap);
    if (g === 0) {
      g = MIN_GAP;
    }
    return g;
  });
}

/**
 * Total deck depth along Z. Compact collapses every gap to MIN_GAP; expanded
 * sums the (N-1) inter-plate gaps (gaps[0] is before slide 0 and unused).
 */
export function stackDepth(scene, view) {
  const n = scene.slides.length;
  if (n <= 1) return 0.0;
  if (view === "compact") return (n - 1) * MIN_GAP;
  const gaps = plateGaps(scene);
  let sum = 0;
  for (let i = 1; i < gaps.length; i++) sum += gaps[i];
  return sum;
}

/** Per-plate Z (front plate at 0, index 0 at -stackDepth). Mirrors _stack_positions. */
function stackPositions(gaps) {
  const n = gaps.length;
  if (n === 0) return [];
  let depth = 0;
  for (let i = 1; i < n; i++) depth += gaps[i];
  const cum = [0.0];
  for (let i = 1; i < n; i++) cum.push(cum[cum.length - 1] + gaps[i]);
  return cum.map((c) => c - depth);
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
function normalize(a) {
  const n = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1.0;
  return [a[0] / n, a[1] / n, a[2] / n];
}

/** Resolve a distance spec to absolute points (number, numeric string, or "P%"). */
function parseDistance(distance, viewportWidth) {
  if (typeof distance === "number") return distance;
  const text = String(distance).trim();
  if (text.endsWith("%")) return (parseFloat(text.slice(0, -1)) / 100.0) * viewportWidth;
  return parseFloat(text);
}

/**
 * Angled hero camera framing the expanded *deck* (SPEC.md §3, issue 302 §2). The
 * distance is chosen — and the camera horizontally re-centered (panned) — by a
 * deterministic bisection so that, in the projected image, the left margin (frame
 * edge → leftmost plate) and the right margin (rightmost plate → frame edge) each
 * equal the projected inter-plate gap (mean adjacent plate-center horizontal stagger).
 * A vertical-fit floor keeps the deck from cropping top/bottom. Plate size = scene.size
 * so JS and Python agree exactly (same iterations/brackets → identical numbers).
 * Returns { position:[x,y,z], target:[x,y,z], fov, near }.
 */
export function expandedCamera(scene, viewportAspect) {
  const cam = scene.camera;
  const depth = stackDepth(scene, "expanded");
  const baseTarget = [0.0, 0.0, -depth / 2.0];

  // Direction target -> camera (azimuth swings toward -X, elevation lifts +Y).
  const az = (cam.angle * Math.PI) / 180.0;
  const el = (cam.elevation * Math.PI) / 180.0;
  const toCam = normalize([
    -Math.sin(az) * Math.cos(el),
    Math.sin(el),
    Math.cos(az) * Math.cos(el),
  ]);
  const look = [-toCam[0], -toCam[1], -toCam[2]]; // camera -> target

  const upWorld = [0.0, 1.0, 0.0];
  let right = cross(look, upWorld);
  right = Math.abs(dot(look, upWorld)) < 0.999 ? normalize(right) : [1.0, 0.0, 0.0];
  const up = normalize(cross(right, look));

  const hfov = (cam.fov * Math.PI) / 180.0;
  const aspect = viewportAspect || scene.size.width / scene.size.height;
  const vfov = 2.0 * Math.atan(Math.tan(hfov / 2.0) / aspect);
  const th = Math.tan(hfov / 2.0);
  const tv = Math.tan(vfov / 2.0);

  const halfWPlate = scene.size.width / 2.0;
  const halfHPlate = scene.size.height / 2.0;
  const zPositions = stackPositions(plateGaps(scene));

  // Issue 332: slides are LIFTED by one caption-plate height (captions on) so they sit on
  // top of their on-floor caption plates. The full composite the camera frames (NO crop)
  // spans vertically from the floor line (caption-plate bottom == -H/2) up to the lifted
  // slide top (lift + H/2). Include the lifted slide corners AND the caption-plate bottom
  // corners so the bounding fit never crops the caption row. Mirrors geometry.py.
  const lift = slideLift(scene);
  const floorY = -halfHPlate; // caption plate bottom (and floor line)
  const slideYLo = lift - halfHPlate;
  const slideYHi = lift + halfHPlate;
  const capYs = scene.captions ? [floorY] : []; // extra bottom row (caption plate bottom)

  // Precompute each corner's (right, up, look) offsets relative to baseTarget so
  // projecting at a candidate (distance D, horizontal pan) is cheap and exact.
  // ndc_x = (cr - pan)/((cl + D)*th). Mirrors geometry.py expanded_camera.
  const corners = []; // [cr, cu, cl]
  const centers = []; // [cr, cl] of each plate center
  for (const z of zPositions) {
    const relC = sub([0.0, lift, z], baseTarget);
    centers.push([dot(relC, right), dot(relC, look)]);
    for (const sx of [-halfWPlate, halfWPlate]) {
      for (const sy of [slideYLo, slideYHi, ...capYs]) {
        const rel = sub([sx, sy, z], baseTarget);
        corners.push([dot(rel, right), dot(rel, up), dot(rel, look)]);
      }
    }
  }

  const span = (D, pan) => {
    let a = Infinity;
    let b = -Infinity;
    let ymax = 0.0;
    for (const [cr, cu, cl] of corners) {
      const zv = cl + D;
      const nx = (cr - pan) / (zv * th);
      a = Math.min(a, nx);
      b = Math.max(b, nx);
      ymax = Math.max(ymax, Math.abs(cu / (zv * tv)));
    }
    return [a, b, ymax];
  };

  const gapOf = (D, pan) => {
    const xs = centers.map(([cr, cl]) => (cr - pan) / ((cl + D) * th));
    if (xs.length < 2) return 0.0;
    let s = 0.0;
    for (let i = 0; i < xs.length - 1; i++) s += Math.abs(xs[i + 1] - xs[i]);
    return s / (xs.length - 1);
  };

  const recenter = (D) => {
    let lo = -halfWPlate * 8.0;
    let hi = halfWPlate * 8.0;
    for (let i = 0; i < 64; i++) {
      const pan = 0.5 * (lo + hi);
      const [a, b] = span(D, pan);
      if (a + b > 0.0) lo = pan;
      else hi = pan;
    }
    return 0.5 * (lo + hi);
  };

  // Bracket scale: the legacy bounding-box fit distance.
  let halfW = 0.0;
  let halfH = 0.0;
  for (const [cr, cu] of corners) {
    halfW = Math.max(halfW, Math.abs(cr));
    halfH = Math.max(halfH, Math.abs(cu));
  }
  const d0 = Math.max(halfW / (FILL * th), halfH / (FILL * tv));

  // margin grows with distance, gap shrinks => (margin - gap) increasing; bisect.
  let lo = d0 * 0.1;
  let hi = d0 * 20.0;
  let distance = d0;
  for (let i = 0; i < 80; i++) {
    distance = 0.5 * (lo + hi);
    const pan = recenter(distance);
    const [a, b] = span(distance, pan);
    const margin = 0.5 * (a + 1.0 + (1.0 - b));
    if (margin - gapOf(distance, pan) > 0.0) hi = distance;
    else lo = distance;
  }
  distance = 0.5 * (lo + hi);

  // Vertical-fit floor: never let the gap pull the camera so close the deck crops.
  let vlo = d0 * 0.05;
  let vhi = d0 * 40.0;
  for (let i = 0; i < 80; i++) {
    const dv = 0.5 * (vlo + vhi);
    const [, , ymax] = span(dv, 0.0); // vertical extent is independent of pan
    if (ymax > V_FILL) vlo = dv;
    else vhi = dv;
  }
  distance = Math.max(distance, 0.5 * (vlo + vhi));

  const pan = recenter(distance);
  const near = Math.max(1.0, distance * 0.005);
  const target = [
    baseTarget[0] + right[0] * pan,
    baseTarget[1] + right[1] * pan,
    baseTarget[2] + right[2] * pan,
  ];
  const position = [
    target[0] + toCam[0] * distance,
    target[1] + toCam[1] * distance,
    target[2] + toCam[2] * distance,
  ];
  return { position, target, fov: cam.fov, near };
}

/**
 * Head-on camera on +Z aimed at the deck center. `distance` is "P%" of viewport
 * width or absolute points; near plane scales with distance.
 * Returns { position:[x,y,z], target:[x,y,z], fov, near }.
 */
export function compactCamera(scene, viewportAspect) {
  const cam = scene.camera;
  const depth = stackDepth(scene, "compact");
  // Issue 337: the compact view frames ONLY the frontmost SLIDE plate — not the composite with
  // its caption row. Captions are invisible in compact (they fade in only as the deck expands),
  // so reserving the caption-plate height just padded the frame. The slide is lifted by `lift`
  // (issue 332: it sits on top of the on-floor caption plate), so its center is at Y = lift and
  // it spans height H. Aim at the slide center and fit H so the slide fills the frame tight.
  // Mirrors geometry.py.
  const lift = slideLift(scene);
  const target = [0.0, lift, -depth / 2.0];

  let isPercent = false;
  let pctVal = 90.0;
  if (typeof cam.distance === "string") {
    const text = cam.distance.trim();
    if (text.endsWith("%")) {
      isPercent = true;
      const parsed = parseFloat(text.slice(0, -1));
      if (!isNaN(parsed)) pctVal = parsed;
    }
  }

  let distance;
  if (isPercent) {
    // Dual-axis crop-free fit (SPEC.md §3, issue 302 §1, issue 337): fit the frontmost SLIDE
    // plate (width W, height H — NOT the caption composite) so the limiting axis touches P% and
    // the other axis only ever has extra padding (never a crop). distance = max(d_w, d_h).
    // Mirrors geometry.py.
    const hfov = (cam.fov * Math.PI) / 180.0;
    const aspect = viewportAspect || scene.size.width / scene.size.height;
    const vfov = 2.0 * Math.atan(Math.tan(hfov / 2.0) / aspect);
    const frac = pctVal / 100.0;
    const dW = scene.size.width / (2.0 * Math.tan(hfov / 2.0) * frac);
    const dH = scene.size.height / (2.0 * Math.tan(vfov / 2.0) * frac);
    const distToZ0 = Math.max(dW, dH);
    distance = distToZ0 + depth / 2.0;
  } else {
    distance = parseDistance(cam.distance, scene.size.width);
  }

  const near = Math.max(1.0, distance * 0.005);
  const position = [target[0], target[1], target[2] + distance];
  return { position, target, fov: cam.fov, near };
}

/** Evaluate a shared easing curve at t (clamped to [0, 1]). */
export function ease(name, t) {
  t = Math.max(0.0, Math.min(1.0, t));
  if (name === "linear") return t;
  if (name === "easeInCubic") return t * t * t;
  if (name === "easeOutCubic") {
    const u = 1.0 - t;
    return 1.0 - u * u * u;
  }
  if (name === "easeInOutCubic") {
    if (t < 0.5) return 4.0 * t * t * t;
    const u = -2.0 * t + 2.0;
    return 1.0 - (u * u * u) / 2.0;
  }
  throw new Error(`Unknown easing: ${JSON.stringify(name)}`);
}

/**
 * Opacity at morph progress tExpanded in [0, 1] (0=compact, 1=expanded). Lerps
 * the compact and expanded per-view values. Mirrors interpolate_opacity.
 */
export function interpolateOpacity(slide, tExpanded) {
  const t = Math.max(0.0, Math.min(1.0, tExpanded));
  const lo = resolvedOpacity(slide, "compact");
  const hi = resolvedOpacity(slide, "expanded");
  const value = lo + (hi - lo) * t;
  return Math.max(0.0, Math.min(1.0, value));
}

/**
 * Per-slide caption opacity at morph factor tExpanded (0=compact, 1=expanded).
 * Honors caption.show_in and the staggered fade (issue 302 §B.4): an `expanded`
 * caption stays invisible until the final `window` fraction of the morph, then fades
 * in — staggered back (index 0) → front so the frontmost reaches full opacity exactly
 * at t=1 (full opacity ONLY in expanded). `both`→1, `none`→0, `compact`→fades out.
 * Slides without a caption → 0. Mirrors caption_opacities in geometry.py.
 */
export function captionOpacities(scene, tExpanded) {
  const t = Math.max(0.0, Math.min(1.0, tExpanded));
  // Issue 332: a global captions=false toggle suppresses ALL caption plates everywhere.
  if (!scene.captions) return scene.slides.map(() => 0.0);
  const cf = scene.caption_fade;
  const window = cf ? cf.window : CAPTION_FADE_WINDOW;
  const stagger = cf ? cf.stagger : CAPTION_STAGGER;
  const n = scene.slides.length;
  const denom = n > 1 ? n - 1 : 1;

  // Total back->front spread (fraction of the morph). Default: `stagger` of the window.
  // Issue 309: if stagger_frames is set + a transition exists, the per-caption step is
  // that many frames of one leg; spread = (n-1) steps, capped so the frontmost finishes
  // fading at t=1 (ramp stays positive).
  let spread = stagger * window;
  if (cf && cf.stagger_frames !== null && cf.stagger_frames !== undefined && scene.transition) {
    const legFrames = Math.round(scene.transition.duration * scene.transition.fps);
    if (legFrames > 0) {
      const stepT = cf.stagger_frames / legFrames;
      spread = Math.min((n - 1) * stepT, window * 0.95);
    }
  }
  const ramp = Math.max(1e-6, window - spread);

  return scene.slides.map((slide, i) => {
    const cap = slide.caption;
    if (!cap || cap.show_in === "none") return 0.0;
    if (cap.show_in === "both") return 1.0;
    if (cap.show_in === "compact") return 1.0 - t;
    // expanded: staggered window fade-in, backmost (i=0) first, frontmost last.
    const startI = 1.0 - window + (i / denom) * spread;
    return Math.max(0.0, Math.min(1.0, (t - startI) / ramp));
  });
}

function lerp3(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function poseAt(compact, expanded, t) {
  return {
    position: lerp3(compact.position, expanded.position, t),
    target: lerp3(compact.target, expanded.target, t),
    fov: compact.fov + (expanded.fov - compact.fov) * t,
    near: compact.near + (expanded.near - compact.near) * t,
  };
}

/** Build a frame state at morph factor t (already eased) from precomputed poses. */
function frameState(scene, compact, expanded, t) {
  const expandedGaps = plateGaps(scene);
  const gaps = expandedGaps.map((g) => MIN_GAP + (g - MIN_GAP) * t);
  const opacities = scene.slides.map((s) => interpolateOpacity(s, t));
  return {
    camera: poseAt(compact, expanded, t),
    gaps,
    opacities,
    captionOpacities: captionOpacities(scene, t),
  };
}

/**
 * Build a FrameState at an already-eased morph factor t (0=compact, 1=expanded).
 * Computes the compact/expanded endpoint poses on demand; used by the playable
 * transition driver and scrollspy so a single t produces the full morph state
 * (camera pose + per-plate gaps + per-slide opacities).
 * @param {object} scene parsed scene
 * @param {number} t eased morph factor
 */
export function frameStateAt(scene, t, viewportAspect) {
  // viewportAspect (the live element's container aspect) defaults to the scene aspect, so
  // the rendered/aspect-locked paths are unchanged; the scrollable passes its 2:1 container
  // aspect so compact fits with side padding and expanded fills vertically (issue 314).
  const compact = compactCamera(scene, viewportAspect);
  const expanded = expandedCamera(scene, viewportAspect);
  return frameState(scene, compact, expanded, Math.max(0, Math.min(1, t)));
}

// Each transition is a sequence of legs expressed as morph endpoints
// (0=compact, 1=expanded). Mirrors _LEGS in geometry.py.
const LEGS = {
  expand: [[0.0, 1.0]],
  collapse: [[1.0, 0.0]],
  expand_collapse: [
    [0.0, 1.0],
    [1.0, 0.0],
  ],
  collapse_expand: [
    [1.0, 0.0],
    [0.0, 1.0],
  ],
};

/**
 * Per-frame states for scene.transition (empty when no transition). Each leg
 * renders round(duration*fps) frames; a hold of round(wait*fps) frames is
 * inserted at the far end of each leg. Mirrors frame_plan in geometry.py.
 */
export function framePlan(scene) {
  const tr = scene.transition;
  if (!tr) return [];
  const compact = compactCamera(scene);
  const expanded = expandedCamera(scene);
  const legFrames = Math.round(tr.duration * tr.fps);
  const waitFrames = Math.round(tr.wait * tr.fps);
  const legs = LEGS[tr.kind];

  const states = [];
  for (const [start, end] of legs) {
    for (let i = 0; i < legFrames; i++) {
      const p = legFrames ? i / legFrames : 0.0;
      const eased = ease(tr.easing, p);
      const t = start + (end - start) * eased;
      states.push(frameState(scene, compact, expanded, t));
    }
    const hold = frameState(scene, compact, expanded, end);
    for (let i = 0; i < waitFrames; i++) states.push(hold);
  }
  return states;
}
