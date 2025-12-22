#!/bin/bash
# this_file: vexy-stax-js/dev.sh
# Development server for vexy-stax-js
cd "$(dirname "$0")"

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Starting vexy-stax-js development server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo

# Check for node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo
fi

echo "🚀 Starting Vite dev server..."
echo "   Press Ctrl+C to stop"
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo

# Open browser after short delay, then start server (foreground)
(sleep 1 && open "http://localhost:5173") &
npm run dev
