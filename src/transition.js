// SPDX-License-Identifier: Apache-2.0
// this_file: src/transition.js
//
// Morph driver (SPEC.md §3, §6.1). Drives the camera pose + per-plate spacing +
// per-slide opacity (and caption fade) from compact↔expanded endpoints, using
// the shared easing from geometry.js so the playable animation matches the
// frame_plan math the engines render.
//
// The geometry is provided by frameStateAt() (pure, in geometry.js); this module
// only sequences the legs over wall-clock time with requestAnimationFrame and
// applies each FrameState through an `apply` callback. No three.js here, so the
// timeline logic is testable under node --test.

import { frameStateAt, ease } from "./geometry.js";

// Each transition is a sequence of legs expressed as morph endpoints
// (0=compact, 1=expanded). Mirrors _LEGS in geometry.py / framePlan.
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

/** Endpoint morph factors for a transition kind: [start, end] of its first/last leg. */
export function transitionEndpoints(kind) {
  const legs = LEGS[kind];
  if (!legs) throw new Error(`Unknown transition kind: ${JSON.stringify(kind)}`);
  return { startMorph: legs[0][0], endMorph: legs[legs.length - 1][1] };
}

/**
 * Build a normalized timeline of segments for a transition, in [0,1] global
 * progress. Each leg contributes a move segment (duration seconds) and a hold
 * segment (wait seconds). Returns segments with their global-progress span and
 * the morph endpoints they interpolate between (move) or hold at (hold).
 *
 * Pure + deterministic so it can be unit-tested without a clock.
 * @param {string} kind transition kind
 * @param {{duration:number, wait:number}} timing
 */
export function buildTimeline(kind, { duration, wait }) {
  const legs = LEGS[kind];
  if (!legs) throw new Error(`Unknown transition kind: ${JSON.stringify(kind)}`);
  const segments = [];
  let total = 0;
  for (const [start, end] of legs) {
    if (duration > 0) segments.push({ type: "move", start, end, seconds: duration });
    if (wait > 0) segments.push({ type: "hold", start: end, end, seconds: wait });
    total += duration + wait;
  }
  // Guard: a zero-length timeline (duration=wait=0) still needs one instantaneous
  // segment so we can settle at the final endpoint.
  if (total <= 0) {
    const last = legs[legs.length - 1];
    segments.push({ type: "hold", start: last[1], end: last[1], seconds: 0 });
    total = 0;
  }
  // Assign global-progress spans [from, to] across the whole timeline.
  let acc = 0;
  for (const seg of segments) {
    const from = total > 0 ? acc / total : 0;
    acc += seg.seconds;
    const to = total > 0 ? acc / total : 1;
    seg.from = from;
    seg.to = to;
  }
  return { segments, totalSeconds: total };
}

/**
 * Resolve a global progress p in [0,1] to a morph factor (already eased) using a
 * timeline from buildTimeline(). The move segments ease their local progress; the
 * hold segments stay at their endpoint morph. Pure — used by both the rAF player
 * and the scrollspy mapper.
 * @param {{segments:Array}} timeline
 * @param {number} p global progress [0,1]
 * @param {(t:number)=>number} easeFn easing applied within move segments
 */
export function morphAtProgress(timeline, p, easeFn) {
  const { segments } = timeline;
  const clamped = Math.max(0, Math.min(1, p));
  for (const seg of segments) {
    if (clamped <= seg.to || seg === segments[segments.length - 1]) {
      if (seg.type === "hold" || seg.to === seg.from) return seg.end;
      const local = (clamped - seg.from) / (seg.to - seg.from);
      const eased = easeFn(Math.max(0, Math.min(1, local)));
      return seg.start + (seg.end - seg.start) * eased;
    }
  }
  return segments[segments.length - 1].end;
}

/**
 * Play a transition over wall-clock time, calling `apply(frameState)` each frame
 * and `onProgress(p)` with global progress [0,1]. Resolves when complete.
 *
 * @param {object} scene parsed scene
 * @param {(state:object)=>void} apply applies a FrameState to the stage
 * @param {object} [opts]
 * @param {string} [opts.kind] override scene.transition.kind
 * @param {(p:number)=>void} [opts.onProgress]
 * @param {(ms:number)=>void} [opts.render] called after each apply (renders a frame)
 * @param {{now:()=>number, raf:(cb)=>any, caf:(h)=>void}} [opts.clock] injectable for tests
 * @returns {{promise:Promise<void>, cancel:()=>void}}
 */
export function playTransition(scene, apply, opts = {}) {
  const tr = scene.transition;
  const kind = opts.kind ?? tr?.kind;
  if (!kind) throw new Error("playTransition: no transition kind (scene.transition is null and no kind given)");
  // `opts.duration` overrides the scene timing (issue 342: a click-toggle plays a SNAPPY leg, not
  // the scene's full transition.duration). `opts.aspect` is the LIVE container aspect — without it
  // frameStateAt() falls back to the scene aspect and the compact endpoint is framed too close for
  // a non-scene-aspect container (e.g. the wide scrollable demo).
  const duration = opts.duration ?? tr?.duration ?? 3.0;
  const wait = opts.duration != null ? 0.0 : tr?.wait ?? 0.0;
  const easing = tr?.easing ?? "easeInOutCubic";
  const timeline = buildTimeline(kind, { duration, wait });

  const now = opts.clock?.now ?? (() => performance.now());
  const raf =
    opts.clock?.raf ??
    (typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : (cb) => setTimeout(() => cb(now()), 16));
  const caf =
    opts.clock?.caf ??
    (typeof cancelAnimationFrame !== "undefined" ? cancelAnimationFrame : (h) => clearTimeout(h));

  let handle = null;
  let cancelled = false;
  let resolveFn;
  let rejectFn;
  const promise = new Promise((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });

  const totalMs = timeline.totalSeconds * 1000;
  const start = now();

  const step = () => {
    if (cancelled) {
      rejectFn(new Error("transition cancelled"));
      return;
    }
    const elapsed = now() - start;
    const p = totalMs > 0 ? Math.min(1, elapsed / totalMs) : 1;
    const t = morphAtProgress(timeline, p, (x) => ease(easing, x));
    apply(frameStateAt(scene, t, opts.aspect));
    opts.onProgress?.(p);
    if (p >= 1) {
      resolveFn();
      return;
    }
    handle = raf(step);
  };

  // Kick off on the next frame so listeners can attach.
  handle = raf(step);

  return {
    promise,
    cancel() {
      cancelled = true;
      if (handle != null) caf(handle);
    },
  };
}
