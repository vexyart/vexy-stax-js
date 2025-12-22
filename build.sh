#!/bin/bash
# this_file: vexy-stax-js/build.sh
# Build script for vexy-stax-js

cd "$(dirname "$0")"

set -e  # Exit on error

# Parse flags
NO_SERVE=false
for arg in "$@"; do
    case $arg in
        --no-serve) NO_SERVE=true ;;
    esac
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Building vexy-stax-js"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "   Install from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js $(node --version)"
echo "✓ npm $(npm --version)"
echo

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

echo

# Run build
echo "🔨 Building for production..."
npm run build

echo

# Verify output
if [ ! -d "docs" ]; then
    echo "❌ Error: docs/ directory not created"
    exit 1
fi

if [ ! -f "docs/index.html" ]; then
    echo "❌ Error: docs/index.html not found"
    exit 1
fi

# Show build stats
BUILD_SIZE=$(du -sh docs/ | cut -f1)
FILE_COUNT=$(find docs -type f | wc -l | tr -d ' ')

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Build complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Output:  docs/"
echo "  Size:    $BUILD_SIZE"
echo "  Files:   $FILE_COUNT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo
echo "To deploy:"
echo "  git add docs/ && git commit -m 'Build for production'"
echo "  git push"
echo
if [ "$NO_SERVE" = false ]; then
    echo "Starting preview server..."
    echo "   Press Ctrl+C to stop"
    echo

    # Open browser after short delay, then start server (foreground, blocks until Ctrl+C)
    (sleep 1 && open "http://localhost:4173") &
    npm run preview
fi
