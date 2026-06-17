#!/usr/bin/env python3
# this_file: vexy-stax-js/verify/gate.py
"""HARD VERIFICATION GATE decoder for the JS render ops (G008).

Decodes the compact + expanded PNGs that verify/run.mjs captured from the
three.js canvas and asserts the gate:

  pixel std > 30 AND unique-color count > 500

(a blank/white render fails). The canvas is supersampled x2 in the harness (SSAA,
matching the Python pygfx engine's _SUPERSAMPLE=2); this gate Lanczos-downscales
each capture to the nominal 640x414 before measuring — the identical SSAA-resolve
pipeline pygfx uses for its stills.

Un-mirrored orientation check: verify/run.mjs renders the colorful front art plate
(airbl-020-source.png) head-on filling the frame and saves it as plate-probe.png.
This gate compares that render to the plate's OWN source PNG (un-flipped vs
flipped). The un-flipped source must correlate better — decisive proof that the
rendered artwork (and its text) is not mirrored, independent of any reference
renderer's framing.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
OUT = HERE / "out"
REPO_ROOT = HERE.parent  # vexy-stax-js (package root)

NOMINAL = (640, 414)  # downscale target (matches pygfx still output)
STD_MIN = 30.0
UNIQ_MIN = 500


def load_rgb_downscaled(path: Path, size=NOMINAL) -> np.ndarray:
    """Load and Lanczos-downscale to the nominal size (SSAA resolve, like pygfx)."""
    img = Image.open(path).convert("RGB")
    if img.size != size:
        img = img.resize(size, Image.LANCZOS)
    return np.asarray(img, dtype=np.uint8)


def stats(arr: np.ndarray) -> tuple[float, int]:
    std = float(arr.astype(np.float64).std())
    flat = arr.reshape(-1, 3).astype(np.uint32)
    packed = (flat[:, 0] << 16) | (flat[:, 1] << 8) | flat[:, 2]
    uniq = int(np.unique(packed).size)
    return std, uniq


def normalized(a: np.ndarray) -> np.ndarray:
    a = a.astype(np.float64)
    a -= a.mean()
    n = np.linalg.norm(a)
    return a / n if n else a


def plate_orientation_check(probe_path: Path, src_path: Path) -> dict:
    """Compare the head-on plate render to its source PNG (un-flipped vs flipped).

    The probe fills the frame with one plate, so the rendered art directly
    matches the source image. Correlate the probe luminance with the source and
    its horizontal flip; the un-flipped source must win, proving the render is not
    mirrored. Strong, unambiguous signal because it is the same image.
    """
    grid = (200, 130)
    probe = Image.open(probe_path).convert("L").resize(grid)
    src_rgb = Image.open(src_path).convert("RGBA")
    # Composite the source over white so transparent areas match the render bg.
    bg = Image.new("RGBA", src_rgb.size, (255, 255, 255, 255))
    src = Image.alpha_composite(bg, src_rgb).convert("L").resize(grid)

    p = normalized(np.asarray(probe, dtype=np.float64)).ravel()
    s = normalized(np.asarray(src, dtype=np.float64)).ravel()
    sf = normalized(np.asarray(src.transpose(Image.FLIP_LEFT_RIGHT), dtype=np.float64)).ravel()
    corr_same = float(np.dot(p, s))
    corr_flip = float(np.dot(p, sf))
    return {
        "corr_same": corr_same,
        "corr_flip": corr_flip,
        "not_mirrored": corr_same > corr_flip,
    }


def main() -> int:
    failures: list[str] = []
    report: list[str] = []

    for view in ("compact", "expanded"):
        p = OUT / f"airbl-{view}.png"
        if not p.exists():
            failures.append(f"{view}: missing {p}")
            continue
        arr = load_rgb_downscaled(p)
        std, uniq = stats(arr)
        report.append(f"{view}: {arr.shape[1]}x{arr.shape[0]} (ssaa-resolved) std={std:.2f} uniq={uniq}")
        if std <= STD_MIN:
            failures.append(f"{view}: std {std:.2f} <= {STD_MIN}")
        if uniq <= UNIQ_MIN:
            failures.append(f"{view}: uniq {uniq} <= {UNIQ_MIN}")

    # Un-mirrored orientation check via the single-plate probe vs its source PNG.
    results_path = OUT / "results.json"
    probe_path = OUT / "plate-probe.png"
    if results_path.exists() and probe_path.exists():
        meta = json.loads(results_path.read_text())
        src_local = Path(meta.get("probe", {}).get("srcLocal", ""))
        if src_local.exists():
            mc = plate_orientation_check(probe_path, src_local)
            report.append(
                f"orientation: corr_same={mc['corr_same']:.4f} corr_flip={mc['corr_flip']:.4f} "
                f"not_mirrored={mc['not_mirrored']} (front plate vs {src_local.name})"
            )
            if not mc["not_mirrored"]:
                failures.append(
                    f"front plate appears MIRRORED: corr_flip {mc['corr_flip']:.4f} >= "
                    f"corr_same {mc['corr_same']:.4f}"
                )
        else:
            failures.append(f"orientation: source PNG not found ({src_local})")
    else:
        failures.append("orientation: missing plate-probe.png or results.json")

    print("\n".join(report))
    if failures:
        print("GATE FAILED:")
        for f in failures:
            print("  - " + f)
        return 1
    print("GATE PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
