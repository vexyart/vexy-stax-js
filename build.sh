#!/usr/bin/env bash
# this_file: vexy-stax-js/build.sh
# build.sh - Test + build vexy-stax-js (emits the dist bundles) and the documentation site.
# Vexy Stax JS: Browser renderer for the shared vexy-stax scene format (Three.js).
# Usage: ./build.sh [all|docs]   (default: all)
#   all   unit tests, dist bundles, the demo pages (into src_docs/md/), then the docs site (docs/)
#   docs  only rebuild the docs site from src_docs/ into docs/ with ProperDocs
set -euo pipefail
cd "$(dirname "$0")"

target="${1:-all}"
case "$target" in
  all|docs) ;;
  *) echo "usage: $0 [all|docs]" >&2; exit 2 ;;
esac

if [[ "$target" == all ]]; then
  echo "==> Running unit tests..."
  npm run test:unit

  echo "==> Building dist bundles..."
  npm run build

  echo "==> Build complete:"
  ls -lh dist/vexy-stax.element.js dist/vexy-stax.global.js

  echo "==> Building the live demos into src_docs/md/..."
  npm run build:docs
fi

echo "==> Building the documentation site into docs/..."
src_docs/build.sh
