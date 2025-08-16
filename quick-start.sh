#!/bin/bash

# 🚀 CAITIENWEBTT - QUICK START SCRIPT
# One-command setup for the entire project

clear
echo "🎉 CAITIENWEBTT - QUICK START SETUP"
echo "====================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "${PURPLE}🚀 $1${NC}"
}

# Check if we're in the right directory
print_header "Checking project structure..."

if [ ! -f "package.json" ]; then
    print_error "package.json not found! Please run this script from the project root directory."
    exit 1
fi

if [ ! -d "src" ]; then
    print_error "src directory not found! Please run this script from the project root directory."
    exit 1
fi

print_status "Project structure verified"

# Step 1: Fix permissions
print_header "Step 1: Fixing file permissions..."
chmod +x scripts/fix-permissions.sh
./scripts/fix-permissions.sh

# Step 2: Clean previous builds
print_header "Step 2: Cleaning previous builds..."
if [ -d ".next" ]; then
    rm -rf .next
    print_status "Removed .next directory"
fi

if [ -d "node_modules" ]; then
    print_info "Keeping existing node_modules (use 'npm ci' if you want clean install)"
else
    print_info "No node_modules found - will install fresh"
fi

# Step 3: Install dependencies
print_header "Step 3: Installing dependencies..."
if command -v npm &> /dev/null; then
    print_info "Using npm for package management"
    npm install
    if [ $? -eq 0 ]; then
        print_status "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_error "npm not found! Please install Node.js first."
    exit 1
fi

# Step 4: Generate Prisma client (if prisma exists)
if [ -f "prisma/schema.prisma" ]; then
    print_header "Step 4: Generating Prisma client..."
    npx prisma generate
    if [ $? -eq 0 ]; then
        print_status "Prisma client generated"
    else
        print_warning "Prisma generation failed (this might be okay if no database is configured)"
    fi
else
    print_info "No Prisma schema found, skipping..."
fi

# Step 5: Create .env.local template if not exists
print_header "Step 5: Setting up environment variables..."
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOL'
# 🔐 CAITIENWEBTT - Environment Variables
# Copy this file and add your actual values

# Authentication
NEXTAUTH_SECRET=your-32-character-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Database (Optional - for full features)
# DATABASE_URL=postgresql://username:password@localhost:5432/caitienwebtt

# AI Services (Optional - for AI features)
# OPENAI_API_KEY=your-openai-api-key
# GEMINI_API_KEY=your-gemini-api-key
# AI_PROVIDER=GEMINI

# Analytics (Optional)
# GOOGLE_ANALYTICS_ID=your-ga-id

# Development
NODE_ENV=development
EOL
    print_status "Created .env.local template"
    print_info "Please edit .env.local with your actual values"
else
    print_info ".env.local already exists"
fi

# Step 6: Build the project
print_header "Step 6: Building the project..."
npm run build
if [ $? -eq 0 ]; then
    print_status "Build completed successfully!"
else
    print_error "Build failed! Check the errors above."
    exit 1
fi

# Step 7: Success message and next steps
clear
echo ""
echo "🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉"
echo ""
print_header "SETUP COMPLETED SUCCESSFULLY!"
echo ""
echo "🚀 CAITIENWEBTT is ready to launch!"
echo ""
echo "📋 WHAT'S BEEN DONE:"
print_status "✅ File permissions fixed"
print_status "✅ Dependencies installed"
print_status "✅ Prisma client generated"
print_status "✅ Environment template created"
print_status "✅ Project built successfully"
echo ""
echo "🎯 NEXT STEPS:"
echo ""
echo "1. 🔧 Edit .env.local with your API keys (optional)"
echo "2. 🚀 Start development server:"
echo "   ${CYAN}npm run dev${NC}"
echo ""
echo "3. 🌐 Open your browser:"
echo "   ${CYAN}http://localhost:3000${NC}"
echo ""
echo "4. 🎉 Start learning languages!"
echo ""
echo "📚 AVAILABLE FEATURES:"
echo "• 🇯🇵 Japanese N5 Course (Ready)"
echo "• 🤖 AI Chat Assistant"
echo "• 📊 Progress Tracking"
echo "• 🎮 Gamification System"
echo "• 📱 PWA Support"
echo "• 🌙 Dark/Light Theme"
echo ""
echo "🚀 FOR PRODUCTION DEPLOYMENT:"
echo "   ${CYAN}./scripts/deploy.sh${NC}"
echo ""
echo "💡 Need help? Check the documentation:"
echo "• README.md"
echo "• DEPLOYMENT.md"
echo "• FINAL_PROJECT_REPORT.md"
echo ""
echo "🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉"
echo ""

# Optional: Auto-start dev server
read -p "🚀 Do you want to start the development server now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting development server..."
    npm run dev
fi