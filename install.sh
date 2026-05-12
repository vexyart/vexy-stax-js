#!/usr/bin/env bash
# install.sh - Install vexy-stax-js dependencies
# Vexy Stax JS: Browser-based tool for arranging PNG images along Z-axis in 3D (Three.js).
# Part of Vexy Stax, a creative 3D image stacking tool.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Installing npm dependencies..."
npm install

echo "==> Install complete."
