// SPDX-License-Identifier: Apache-2.0
// this_file: tests/transition.test.js
//
// node --test for the pure transition timeline + morph mapping (transition.js)
// and the scrollspy progress mapping (scrollspy.js). No DOM/three.js here — only
// the deterministic math that drives the playable animation and scroll story.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { parseScene } from "../src/scene.js";
import { ease, frameStateAt } from "../src/geometry.js";
import { buildTimeline, morphAtProgress, transitionEndpoints, playTransition } from "../src/transition.js";
import { computeScrollProgress } from "../src/scrollspy.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXAMPLE = resolve(HERE, "../../vexy-stax-py/testdata/airbl-lores.scene.json");
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

function loadExample() {
  return parseScene(JSON.parse(readFileSync(EXAMPLE, "utf-8")));
}

test("transitionEndpoints picks first/last morph", () => {
  assert.deepEqual(transitionEndpoints("expand"), { startMorph: 0, endMorph: 1 });
  assert.deepEqual(transitionEndpoints("collapse"), { startMorph: 1, endMorph: 0 });
  assert.deepEqual(transitionEndpoints("expand_collapse"), { startMorph: 0, endMorph: 0 });
  assert.deepEqual(transitionEndpoints("collapse_expand"), { startMorph: 1, endMorph: 1 });
});

test("transitionEndpoints rejects unknown kind", () => {
  assert.throws(() => transitionEndpoints("bogus"), /Unknown transition kind/);
});

test("buildTimeline expand: one move + one hold spanning [0,1]", () => {
  const { segments, totalSeconds } = buildTimeline("expand", { duration: 3, wait: 1 });
  assert.equal(segments.length, 2);
  assert.equal(totalSeconds, 4);
  assert.equal(segments[0].type, "move");
  assert.ok(close(segments[0].from, 0));
  assert.ok(close(segments[0].to, 0.75));
  assert.equal(segments[1].type, "hold");
  assert.ok(close(segments[1].from, 0.75));
  assert.ok(close(segments[1].to, 1));
});

test("buildTimeline expand_collapse: two move + two hold legs", () => {
  const { segments } = buildTimeline("expand_collapse", { duration: 3, wait: 1 });
  assert.equal(segments.length, 4);
  assert.deepEqual(
    segments.map((s) => s.type),
    ["move", "hold", "move", "hold"]
  );
  // move leg 1: 0→1; move leg 2: 1→0
  assert.deepEqual([segments[0].start, segments[0].end], [0, 1]);
  assert.deepEqual([segments[2].start, segments[2].end], [1, 0]);
});

test("buildTimeline drops zero-length wait segment", () => {
  const { segments } = buildTimeline("expand", { duration: 3, wait: 0 });
  assert.equal(segments.length, 1);
  assert.equal(segments[0].type, "move");
});

test("morphAtProgress expand: endpoints + eased midpoint", () => {
  const tl = buildTimeline("expand", { duration: 3, wait: 1 });
  const ez = (x) => ease("easeInOutCubic", x);
  assert.ok(close(morphAtProgress(tl, 0, ez), 0));
  assert.ok(close(morphAtProgress(tl, 1, ez), 1)); // ends in hold at full expand
  // midpoint of the move segment (move spans [0,0.75]) → local 0.5 → eased 0.5
  assert.ok(close(morphAtProgress(tl, 0.375, ez), 0.5));
  // inside the hold (p>0.75) → stays at 1
  assert.ok(close(morphAtProgress(tl, 0.9, ez), 1));
});

test("morphAtProgress expand_collapse returns to 0 at end", () => {
  const tl = buildTimeline("expand_collapse", { duration: 3, wait: 1 });
  const ez = (x) => ease("easeInOutCubic", x);
  assert.ok(close(morphAtProgress(tl, 0, ez), 0));
  assert.ok(close(morphAtProgress(tl, 1, ez), 0)); // collapse back to compact
  // full expansion happens at the first hold (p in [0.375, 0.5] of total 8s)
  assert.ok(close(morphAtProgress(tl, 0.4375, ez), 1));
});

test("morphAtProgress clamps out-of-range p", () => {
  const tl = buildTimeline("expand", { duration: 3, wait: 1 });
  const ez = (x) => ease("linear", x);
  assert.ok(close(morphAtProgress(tl, -2, ez), 0));
  assert.ok(close(morphAtProgress(tl, 5, ez), 1));
});

test("computeScrollProgress: 0 below, 1 above, lerp through", () => {
  const viewportH = 800;
  const height = 1200;
  const travel = height + viewportH; // 2000
  // region top just at viewport bottom → 0
  assert.ok(close(computeScrollProgress({ top: viewportH, bottom: viewportH + height, height }, viewportH), 0));
  // region bottom just at viewport top → top = -height → scrolled = travel → 1
  assert.ok(close(computeScrollProgress({ top: -height, bottom: 0, height }, viewportH), 1));
  // halfway: scrolled = travel/2 → top = viewportH - travel/2 = -200
  assert.ok(close(computeScrollProgress({ top: -200, bottom: -200 + height, height }, viewportH), 0.5));
});

test("computeScrollProgress clamps and guards zero travel", () => {
  assert.equal(computeScrollProgress({ top: 5000, bottom: 6000, height: 1000 }, 800), 0);
  assert.equal(computeScrollProgress({ top: -9000, bottom: -8000, height: 1000 }, 800), 1);
  assert.equal(computeScrollProgress({ top: 0, bottom: 0, height: 0 }, 0), 0);
});

test("playTransition drives apply across a fake clock and resolves", async () => {
  const scene = loadExample();
  // Make a tiny deterministic clock: 5 frames over the timeline.
  let now = 0;
  const queue = [];
  const clock = {
    now: () => now,
    raf: (cb) => {
      queue.push(cb);
      return queue.length;
    },
    caf: () => {},
  };
  const applied = [];
  const { promise } = playTransition(
    scene,
    (state) => applied.push(state.opacities[6]), // halftone opacity (0.4→1.0)
    { kind: "expand", clock }
  );
  // Drive the queued rAF callbacks, advancing the clock past the total duration.
  const totalMs = (scene.transition.duration + 0) * 1000; // expand has no wait leg of its own here
  // expand kind uses scene.transition timing (duration=3, wait=1) → total 4s.
  const total = (scene.transition.duration + scene.transition.wait) * 1000;
  for (let i = 0; i <= 10 && queue.length; i++) {
    const cb = queue.shift();
    now = (i / 10) * (total + 1);
    cb(now);
  }
  await promise;
  assert.ok(applied.length >= 2);
  assert.ok(close(applied[0], 0.4, 1e-6)); // first frame at t≈0 → compact opacity
  assert.ok(close(applied[applied.length - 1], 1.0, 1e-6)); // last frame at t=1
});

test("frameStateAt endpoints match the view geometry", () => {
  const scene = loadExample();
  const compact = frameStateAt(scene, 0);
  const expanded = frameStateAt(scene, 1);
  // compact gaps all MIN_GAP=3; expanded gaps all camera.gap=480
  assert.ok(compact.gaps.every((g) => close(g, 3)));
  assert.ok(expanded.gaps.slice(1).every((g) => close(g, 480)));
  // halftone opacity endpoints
  assert.ok(close(compact.opacities[6], 0.4));
  assert.ok(close(expanded.opacities[6], 1.0));
});
