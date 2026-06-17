#!/usr/bin/env bash
# this_file: vexy-stax-js/example.sh
# example.sh - Produce demo artifacts using ALL implemented JS technologies.
# Vexy Stax JS: Browser renderer for the shared vexy-stax scene format (Three.js).
#
# Runs headless in the installed Playwright chromium (verify/example.mjs), serving
# the repo root over HTTP (so three.js loads the airbl PNG textures + scene without
# file:// CORS). Into outputs/ it produces:
#   1. IMAGE     toImage() PNGs of compact + expanded (+ a single combined PNG)
#   2. VIDEO     toVideo() of the transition, saved to a .webm file
#   3. PLAYABLE  self-contained playable.html (built element + scene + slides) that
#                plays the transition on a button when served
#   4. SCROLLSPY top (compact) + bottom (expanded) frames driven by the real
#                scrollspy, saved as PNGs
# A PIL/numpy gate (verify/example_gate.py) then asserts the artifacts are non-blank
# (std > 30), the video is non-zero, and the scrollspy top ≠ bottom.
set -euo pipefail
cd "$(dirname "$0")"

OUT_DIR="outputs"

echo "==> Ensuring dist bundles exist (building if needed)..."
if [ ! -f "dist/vexy-stax.element.js" ]; then
    npm run build
fi

echo "==> Producing demo artifacts headless (Playwright chromium)..."
rm -rf "$OUT_DIR"
node verify/example.mjs

echo
echo "==> Verifying artifacts (PIL/numpy gate)..."
if command -v python3 >/dev/null 2>&1 && python3 -c "import PIL, numpy" >/dev/null 2>&1; then
    python3 verify/example_gate.py
else
    uv run --with pillow --with numpy python3 verify/example_gate.py
fi

echo
echo "==> Artifacts in $(pwd)/$OUT_DIR:"
ls -lh "$OUT_DIR"
echo
echo "==> To play the demo: serve outputs/ over HTTP and open playable.html, e.g."
echo "    (cd $OUT_DIR && python3 -m http.server 8765)  then open http://localhost:8765/playable.html"
echo
echo "==> example.sh complete."
