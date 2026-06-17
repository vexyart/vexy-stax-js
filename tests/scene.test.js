// SPDX-License-Identifier: Apache-2.0
// this_file: tests/scene.test.js
//
// node --test for the strict scene parser. Mirrors the Python scene tests:
// loads the shared example, checks order/opacity resolution, and that extra
// keys throw (parse, don't validate).

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { parseScene, loadScene, resolvedOpacity } from "../src/scene.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const EXAMPLE = resolve(HERE, "../../vexy-stax-py/testdata/airbl-lores.scene.json");

function rawExample() {
  return JSON.parse(readFileSync(EXAMPLE, "utf-8"));
}

test("parseScene loads the example with 8 slides in order", () => {
  const scene = parseScene(rawExample());
  assert.equal(scene.version, 1);
  assert.equal(scene.view, "expanded");
  assert.equal(scene.slides.length, 8);
  assert.ok(scene.slides[0].src.endsWith("airbl-020-source.png"));
  assert.ok(scene.slides[7].src.endsWith("airbl-090-ui.png"));
});

test("parseScene fills defaults from the schema", () => {
  const scene = parseScene({ version: 1, slides: [{ src: "a.png" }] });
  assert.equal(scene.size.width, 1920);
  assert.equal(scene.size.height, 1080);
  assert.equal(scene.camera.gap, 1920);
  assert.equal(scene.camera.distance, "100%");
  assert.equal(scene.camera.fov, 39.6);
  assert.equal(scene.background, "#ffffff");
  assert.equal(scene.juicy, false);
  assert.equal(scene.transition, null);
  assert.equal(scene.slides[0].gap, null);
  assert.equal(scene.slides[0].opacity, 1.0);
  // Issue 303 §1: smoked-glass floor defaults (~4%, dark, just so visible).
  assert.equal(scene.floor.opacity, 0.04);
  assert.equal(scene.floor.color, "#1a1a1a");
  assert.equal(scene.floor.reflectivity, 0.5);
  // Issue 326: plate + caption borders OFF by default (width 0); color stays #f2f2f2 (issue 324).
  assert.equal(scene.edge.width, 0.0);
  assert.equal(scene.edge.color, "#f2f2f2");
});

test("edge is customizable and strict (issue 305)", () => {
  const scene = parseScene({ version: 1, edge: { width: 0.01, color: "#ff0000" }, slides: [{ src: "a.png" }] });
  assert.equal(scene.edge.width, 0.01);
  assert.equal(scene.edge.color, "#ff0000");
  assert.throws(() => parseScene({ version: 1, edge: { thickness: 1 }, slides: [{ src: "a.png" }] }));
});

test("caption fill/border colors parse and are separately overridable (issue 324)", () => {
  const scene = parseScene({
    version: 1,
    edge: { color: "#111111" },
    caption_defaults: { color: "#abcdef", fill_color: "#ff0000", border_color: "#00ff00" },
    slides: [{ src: "a.png" }],
  });
  assert.equal(scene.caption_defaults.color, "#abcdef");
  assert.equal(scene.caption_defaults.fill_color, "#ff0000");
  assert.equal(scene.caption_defaults.border_color, "#00ff00");
  // Unknown caption-style keys are still rejected (strict).
  assert.throws(() => parseScene({ version: 1, caption_defaults: { glow: true }, slides: [{ src: "a.png" }] }));
});

test("caption_fade.stagger_frames parses (issue 309)", () => {
  const scene = parseScene({
    version: 1,
    caption_fade: { window: 0.9, stagger_frames: 6 },
    slides: [{ src: "a.png" }],
  });
  assert.equal(scene.caption_fade.stagger_frames, 6);
  // omitted -> null (falls back to the `stagger` fraction)
  const d = parseScene({ version: 1, caption_fade: {}, slides: [{ src: "a.png" }] });
  assert.equal(d.caption_fade.stagger_frames, null);
});

test("resolvedOpacity handles scalar and per-view", () => {
  const scene = parseScene(rawExample());
  const source = scene.slides[0]; // scalar 1.0
  assert.equal(resolvedOpacity(source, "expanded"), 1.0);
  assert.equal(resolvedOpacity(source, "compact"), 1.0);
  const halftone = scene.slides[6]; // { expanded: 1.0, compact: 0.4 }
  assert.equal(resolvedOpacity(halftone, "expanded"), 1.0);
  assert.equal(resolvedOpacity(halftone, "compact"), 0.4);
});

test("unknown top-level key throws", () => {
  assert.throws(() => parseScene({ version: 1, slides: [{ src: "a.png" }], bogus: 1 }), /Unknown key/);
});

test("unknown slide key throws", () => {
  assert.throws(
    () => parseScene({ version: 1, slides: [{ src: "a.png", color: "#fff" }] }),
    /Unknown key/
  );
});

test("unknown camera key throws", () => {
  assert.throws(
    () => parseScene({ version: 1, slides: [{ src: "a.png" }], camera: { zoom: 2 } }),
    /Unknown key/
  );
});

test("missing slides throws", () => {
  assert.throws(() => parseScene({ version: 1 }), /slides is required/);
});

test("empty slides array throws", () => {
  assert.throws(() => parseScene({ version: 1, slides: [] }), /non-empty/);
});

test("wrong version throws", () => {
  assert.throws(() => parseScene({ version: 2, slides: [{ src: "a.png" }] }), /version must be 1/);
});

test("bad enum value throws", () => {
  assert.throws(() => parseScene({ version: 1, view: "hero", slides: [{ src: "a.png" }] }), /must be one of/);
});

test("out-of-range opacity throws", () => {
  assert.throws(
    () => parseScene({ version: 1, slides: [{ src: "a.png", opacity: 1.5 }] }),
    /must be <= 1/
  );
});

test("loadScene resolves slide src against baseUrl", async () => {
  const scene = await loadScene(
    { version: 1, slides: [{ src: "slide.png" }] },
    { baseUrl: "https://example.com/decks/scene.json" }
  );
  assert.equal(scene.slides[0].src, "https://example.com/decks/slide.png");
});

test("loadScene leaves data: URIs untouched", async () => {
  const data = "data:image/png;base64,AAAA";
  const scene = await loadScene(
    { version: 1, slides: [{ src: data }] },
    { baseUrl: "https://example.com/decks/scene.json" }
  );
  assert.equal(scene.slides[0].src, data);
});
