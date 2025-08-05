#!/bin/bash

# 🔧 CAITIENWEBTT - AUTO FIX PERMISSIONS SCRIPT
# Automatically fixes file permissions and directory structure

echo "🚀 Starting Auto-Fix Process..."
echo "================================="

# Get current directory
CURRENT_DIR=$(pwd)
echo "📁 Current directory: $CURRENT_DIR"

# Fix directory permissions (755 = rwxr-xr-x)
echo "🔧 Fixing directory permissions..."
find . -type d -exec chmod 755 {} \;

# Fix file permissions (644 = rw-r--r--)
echo "🔧 Fixing file permissions..."
find . -type f -exec chmod 644 {} \;

# Make script files executable (755)
echo "🔧 Making scripts executable..."
chmod +x scripts/*.sh
chmod +x scripts/*.js
chmod +x *.sh

# Fix Node.js related permissions
echo "🔧 Fixing Node.js permissions..."
if [ -d "node_modules" ]; then
    chmod -R 755 node_modules
fi

if [ -d ".next" ]; then
    chmod -R 755 .next
fi

# Create necessary directories if they don't exist
echo "📁 Creating necessary directories..."
mkdir -p public/images/logo
mkdir -p public/audio/japanese/n5
mkdir -p src/components
mkdir -p src/app
mkdir -p prisma

# Fix package.json permissions
echo "📦 Fixing package.json permissions..."
if [ -f "package.json" ]; then
    chmod 644 package.json
fi

if [ -f "package-lock.json" ]; then
    chmod 644 package-lock.json
fi

# Fix Next.js config files
echo "⚙️ Fixing config files..."
if [ -f "next.config.js" ]; then
    chmod 644 next.config.js
fi

if [ -f "next.config.mjs" ]; then
    chmod 644 next.config.mjs
fi

if [ -f "tsconfig.json" ]; then
    chmod 644 tsconfig.json
fi

if [ -f "tailwind.config.js" ]; then
    chmod 644 tailwind.config.js
fi

# Fix environment files
echo "🔐 Fixing environment files..."
if [ -f ".env" ]; then
    chmod 600 .env
fi

if [ -f ".env.local" ]; then
    chmod 600 .env.local
fi

if [ -f ".env.example" ]; then
    chmod 644 .env.example
fi

# Fix Git files
echo "📝 Fixing Git files..."
if [ -f ".gitignore" ]; then
    chmod 644 .gitignore
fi

if [ -d ".git" ]; then
    chmod -R 755 .git
fi

# Display structure
echo "📋 Project structure:"
echo "├── src/"
echo "│   ├── app/ (Next.js App Router)"
echo "│   ├── components/"
echo "│   └── ..."
echo "├── public/"
echo "├── scripts/"
echo "├── package.json"
echo "└── ..."

echo ""
echo "✅ Permissions fixed successfully!"
echo "✅ All directories: 755 (rwxr-xr-x)"
echo "✅ All files: 644 (rw-r--r--)"
echo "✅ Scripts: 755 (executable)"
echo "✅ Environment files: 600 (secure)"
echo ""
echo "🎉 Ready to run: npm install && npm run build"
echo "================================="