#!/usr/bin/env bash
# this_file: vexy-stax-js/build.sh
# build.sh - Test + build vexy-stax-js (emits the dist bundles).
# Vexy Stax JS: Browser renderer for the shared vexy-stax scene format (Three.js).
# Runs the unit tests, then builds dist/vexy-stax.element.js + dist/vexy-stax.global.js.
set -euo pipefail
cd "$(dirname "$0")"

echo "==> Running unit tests..."
npm run test:unit

echo "==> Building dist bundles..."
npm run build

echo "==> Build complete:"
ls -lh dist/vexy-stax.element.js dist/vexy-stax.global.js

echo "==> Building docs/ for GitHub Pages..."
npm run build:docs

echo "==> docs/ contents:"
ls -lh docs/
