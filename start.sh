#!/bin/bash

echo "🚀 Starting EvloevFilm API Proxy..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the React app
echo "🔨 Building React app..."
npm run build

# Start the server
echo "🌐 Starting server..."
npm run server 