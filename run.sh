#!/usr/bin/env bash

# ====================================================================
# QUIETINK LOCAL RUNNER SCRIPT
# ====================================================================
# Usage:
#   chmod +x run.sh
#   ./run.sh
# ====================================================================

set -e

echo ""
echo "========================================================"
echo "   QuietInk — Give Your Thoughts a Quiet Place"
echo "========================================================"
echo ""

# 1. Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not detected on your system."
    echo "Please install Node.js (version 18 or newer) from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✓ Node.js detected ($NODE_VERSION)"

# 2. Check if npm is installed
if ! command -v npm >/dev/null 2>&1; then
    echo "❌ npm is not detected on your system."
    echo "Please install npm to continue."
    exit 1
fi

# 3. Check for dependencies / node_modules
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 First-time launch detected. Installing dependencies..."
    npm install
    echo "✓ Dependencies installed successfully."
fi

# 4. Start the development server
echo ""
echo "🚀 Starting QuietInk on http://localhost:3000"
echo "   Press [Ctrl + C] anytime to gracefully stop the server."
echo "========================================================"
echo ""

npm run dev
