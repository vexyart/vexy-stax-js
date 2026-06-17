#!/usr/bin/env bash
# this_file: vexy-stax-js/install.sh
# install.sh - Install vexy-stax-js dependencies + the E2E/example browser.
# Vexy Stax JS: Browser renderer for the shared vexy-stax scene format (Three.js).
# Part of Vexy Stax, a creative 3D image stacking tool.
set -euo pipefail
cd "$(dirname "$0")"

echo "==> Installing npm dependencies..."
npm install

echo "==> Ensuring Playwright chromium is available (E2E + example.sh)..."
# Chromium is normally already cached; this verifies/installs it as a no-op.
npx playwright install chromium

echo "==> Install complete."
