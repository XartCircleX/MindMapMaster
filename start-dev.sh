#!/bin/bash

echo "Starting MindMapMaster Development Environment..."
echo

echo "Installing dependencies..."
npm run install-all

echo
echo "Starting development servers..."
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:5000"
echo

npm run dev



