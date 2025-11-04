#!/bin/bash
# this_file: vexy-stax-js/dev.sh
# Development server for vexy-stax-js

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
echo
echo "   Local:   http://localhost:5173"
echo "   Network: (see output below)"
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo

# Start dev server
npm run dev
