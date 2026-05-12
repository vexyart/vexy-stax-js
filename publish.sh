#!/usr/bin/env bash
# publish.sh - Build, version, and publish vexy-stax-js
# Vexy Stax JS: Browser-based tool for arranging PNG images along Z-axis in 3D (Three.js).
# Calls build.sh + install.sh, bumps version with gitnextver, then publishes to npm.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Running build..."
"$SCRIPT_DIR/build.sh"

echo "==> Running install..."
"$SCRIPT_DIR/install.sh"

echo "==> Bumping version with gitnextver..."
uvx gitnextver@latest

echo "==> Publishing to npm..."
npm publish

echo "==> Publish complete."
