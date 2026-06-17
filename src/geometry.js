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

/** Per-slide gap (points), falling back to camera.gap when unset (null). */
export function plateGaps(scene) {
  return scene.slides.map((s) => (s.gap === null || s.gap === undefined ? scene.camera.gap : s.gap));
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
 * Angled hero camera framing the expanded *deck* (SPEC.md §3). Fits the plate
 * bounding box (not the floor diagonal) so the deck fills FILL of the frame on
 * its tighter axis. Plate size = scene.size so JS and Python agree exactly.
 * Returns { position:[x,y,z], target:[x,y,z], fov, near }.
 */
export function expandedCamera(scene) {
  const cam = scene.camera;
  const depth = stackDepth(scene, "expanded");
  const target = [0.0, 0.0, -depth / 2.0];

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

  const halfWPlate = scene.size.width / 2.0;
  const halfHPlate = scene.size.height / 2.0;
  const zPositions = stackPositions(plateGaps(scene));
  let halfW = 0.0;
  let halfH = 0.0;
  for (const z of zPositions) {
    for (const sx of [-halfWPlate, halfWPlate]) {
      for (const sy of [-halfHPlate, halfHPlate]) {
        const rel = sub([sx, sy, z], target);
        halfW = Math.max(halfW, Math.abs(dot(rel, right)));
        halfH = Math.max(halfH, Math.abs(dot(rel, up)));
      }
    }
  }

  const hfov = (cam.fov * Math.PI) / 180.0;
  const aspect = scene.size.width / scene.size.height;
  const vfov = 2.0 * Math.atan(Math.tan(hfov / 2.0) / aspect);
  const dW = halfW / (FILL * Math.tan(hfov / 2.0));
  const dH = halfH / (FILL * Math.tan(vfov / 2.0));
  const distance = Math.max(dW, dH);
  const near = Math.max(1.0, distance * 0.005);
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
export function compactCamera(scene) {
  const cam = scene.camera;
  const depth = stackDepth(scene, "compact");
  const target = [0.0, 0.0, -depth / 2.0];
  const distance = parseDistance(cam.distance, scene.size.width);
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
  return { camera: poseAt(compact, expanded, t), gaps, opacities };
}

/**
 * Build a FrameState at an already-eased morph factor t (0=compact, 1=expanded).
 * Computes the compact/expanded endpoint poses on demand; used by the playable
 * transition driver and scrollspy so a single t produces the full morph state
 * (camera pose + per-plate gaps + per-slide opacities).
 * @param {object} scene parsed scene
 * @param {number} t eased morph factor
 */
export function frameStateAt(scene, t) {
  const compact = compactCamera(scene);
  const expanded = expandedCamera(scene);
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
