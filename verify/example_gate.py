#!/usr/bin/env python3
# this_file: vexy-stax-js/verify/example_gate.py
"""Gate for the example.sh artifacts.

Decodes the PNGs produced by verify/example.mjs and asserts the demo really
rendered something:

  - airbl-compact.png / airbl-expanded.png (toImage):  pixel std > 30
  - scrollspy-top.png / scrollspy-bottom.png:          pixel std > 30 each, AND
    top (compact) must DIFFER from bottom (expanded) — proves the scrollspy drove
    the morph (mean abs pixel diff above a threshold)
  - airbl-transition.<webm|mp4> (toVideo):             non-zero size
  - playable.html + element + scene + slides:          present

Prints a PASS/size summary. Exit 0 on pass, 1 on failure.
"""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
JS_ROOT = HERE.parent
OUT = JS_ROOT / "outputs"

STD_MIN = 30.0
# Compact and expanded frames differ substantially (deck spacing + opacity +
# captions + camera); require a clear mean-abs difference so a static capture fails.
DIFF_MIN = 5.0


def load_rgb(path: Path) -> np.ndarray:
    return np.asarray(Image.open(path).convert("RGB"), dtype=np.uint8)


def std_of(arr: np.ndarray) -> float:
    return float(arr.astype(np.float64).std())


def mean_abs_diff(a: np.ndarray, b: np.ndarray) -> float:
    if a.shape != b.shape:
        h = min(a.shape[0], b.shape[0])
        w = min(a.shape[1], b.shape[1])
        a = a[:h, :w]
        b = b[:h, :w]
    return float(np.abs(a.astype(np.float64) - b.astype(np.float64)).mean())


def human(n: int) -> str:
    for unit in ("B", "KB", "MB"):
        if n < 1024 or unit == "MB":
            return f"{n:.1f}{unit}" if unit != "B" else f"{n}{unit}"
        n /= 1024
    return f"{n}B"


def main() -> int:
    failures: list[str] = []
    report: list[str] = []

    # --- toImage PNGs (non-blank) ---
    for view in ("compact", "expanded"):
        p = OUT / f"airbl-{view}.png"
        if not p.exists():
            failures.append(f"image: missing {p.name}")
            continue
        arr = load_rgb(p)
        std = std_of(arr)
        report.append(
            f"image {view:8s}: {arr.shape[1]}x{arr.shape[0]} std={std:.2f} size={human(p.stat().st_size)}"
        )
        if std <= STD_MIN:
            failures.append(f"image {view}: std {std:.2f} <= {STD_MIN} (blank?)")

    # --- combined single image (optional convenience) ---
    combined = OUT / "airbl-combined.png"
    if combined.exists():
        report.append(f"image combined: size={human(combined.stat().st_size)}")

    # --- video (non-zero) ---
    vids = list(OUT.glob("airbl-transition.*"))
    if not vids:
        failures.append("video: missing airbl-transition.*")
    else:
        v = vids[0]
        vb = v.stat().st_size
        report.append(f"video {v.name}: size={human(vb)}")
        if vb <= 0:
            failures.append(f"video {v.name}: zero bytes")

    # --- playable artifact ---
    needed = [
        OUT / "playable.html",
        OUT / "vexy-stax.element.js",
        OUT / "airbl.scene.json",
    ]
    for f in needed:
        if not f.exists():
            failures.append(f"playable: missing {f.name}")
    slides = list((OUT / "airbl-lores").glob("*.png")) if (OUT / "airbl-lores").exists() else []
    if len(slides) < 8:
        failures.append(f"playable: expected 8 slides, found {len(slides)}")
    if not failures or (OUT / "playable.html").exists():
        report.append(
            f"playable: playable.html + element + scene + {len(slides)} slides "
            f"(html size={human((OUT / 'playable.html').stat().st_size)})"
            if (OUT / "playable.html").exists()
            else "playable: MISSING"
        )

    # --- scrollspy top vs bottom (non-blank + differ) ---
    top_p = OUT / "scrollspy-top.png"
    bot_p = OUT / "scrollspy-bottom.png"
    if not top_p.exists() or not bot_p.exists():
        failures.append("scrollspy: missing top/bottom PNG")
    else:
        top = load_rgb(top_p)
        bot = load_rgb(bot_p)
        std_top = std_of(top)
        std_bot = std_of(bot)
        diff = mean_abs_diff(top, bot)
        report.append(
            f"scrollspy top   : std={std_top:.2f} size={human(top_p.stat().st_size)}"
        )
        report.append(
            f"scrollspy bottom: std={std_bot:.2f} size={human(bot_p.stat().st_size)}"
        )
        report.append(f"scrollspy diff (top vs bottom mean-abs): {diff:.2f}")
        if std_top <= STD_MIN:
            failures.append(f"scrollspy top: std {std_top:.2f} <= {STD_MIN} (blank?)")
        if std_bot <= STD_MIN:
            failures.append(f"scrollspy bottom: std {std_bot:.2f} <= {STD_MIN} (blank?)")
        if diff < DIFF_MIN:
            failures.append(
                f"scrollspy top == bottom: mean-abs diff {diff:.2f} < {DIFF_MIN} "
                "(scrollspy did not drive the morph)"
            )

    print("\n".join(report))
    if failures:
        print("EXAMPLE GATE FAILED:")
        for f in failures:
            print("  - " + f)
        return 1
    print("EXAMPLE GATE PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
