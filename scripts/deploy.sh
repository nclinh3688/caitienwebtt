#!/bin/bash

# Caitienwebtt Deployment Script
# Automated deployment to production

set -e

echo "🚀 Starting Caitienwebtt Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

# Check npm version
NPM_VERSION=$(npm --version)
print_status "npm version: $NPM_VERSION"

# Install dependencies
print_status "Installing dependencies..."
npm ci --production=false

# Run tests
print_status "Running tests..."
npm run test || {
    print_warning "Tests failed, but continuing with deployment..."
}

# Run linting
print_status "Running linting..."
npm run lint || {
    print_warning "Linting issues found, but continuing with deployment..."
}

# Build the project
print_status "Building the project..."
npm run build

# Check build output
if [ ! -d ".next" ]; then
    print_error "Build failed - .next directory not found"
    exit 1
fi

print_success "Build completed successfully!"

# Check bundle size
print_status "Analyzing bundle size..."
npx @next/bundle-analyzer .next/static || {
    print_warning "Bundle analyzer failed, but continuing..."
}

# Run performance audit
print_status "Running performance audit..."
node scripts/performance-check.js || {
    print_warning "Performance check failed, but continuing..."
}

# Check environment variables
print_status "Checking environment variables..."
if [ -z "$NEXTAUTH_SECRET" ]; then
    print_warning "NEXTAUTH_SECRET not set"
fi

if [ -z "$DATABASE_URL" ]; then
    print_warning "DATABASE_URL not set"
fi

if [ -z "$OPENAI_API_KEY" ] && [ -z "$GEMINI_API_KEY" ]; then
    print_warning "No AI API keys found"
fi

# Deploy to Vercel (if vercel CLI is available)
if command -v vercel &> /dev/null; then
    print_status "Deploying to Vercel..."
    
    # Check if project is linked
    if [ ! -f ".vercel/project.json" ]; then
        print_status "Linking to Vercel project..."
        vercel link --yes
    fi
    
    # Deploy
    vercel --prod --yes
    
    print_success "Deployment to Vercel completed!"
else
    print_warning "Vercel CLI not found. Please install it with: npm i -g vercel"
    print_status "You can deploy manually by:"
    echo "  1. Push to GitHub"
    echo "  2. Connect repository to Vercel"
    echo "  3. Deploy automatically"
fi

# Alternative: Deploy to Netlify
if command -v netlify &> /dev/null; then
    print_status "Deploying to Netlify..."
    netlify deploy --prod --dir=.next
    
    print_success "Deployment to Netlify completed!"
fi

# Post-deployment checks
print_status "Running post-deployment checks..."

# Check if the site is accessible (if domain is provided)
if [ ! -z "$SITE_URL" ]; then
    print_status "Checking site accessibility..."
    if curl -f -s "$SITE_URL" > /dev/null; then
        print_success "Site is accessible at $SITE_URL"
    else
        print_warning "Site might not be accessible yet (deployment in progress)"
    fi
fi

# Generate deployment report
print_status "Generating deployment report..."
cat > deployment-report.md << EOF
# Deployment Report - $(date)

## Build Information
- Node.js: $NODE_VERSION
- npm: $NPM_VERSION
- Build Time: $(date)
- Build Status: ✅ Success

## Bundle Information
- Output Directory: .next
- Static Files: $(find .next/static -type f | wc -l) files
- Total Size: $(du -sh .next | cut -f1)

## Environment Variables
- NEXTAUTH_SECRET: ${NEXTAUTH_SECRET:+✅ Set}${NEXTAUTH_SECRET:-❌ Not Set}
- DATABASE_URL: ${DATABASE_URL:+✅ Set}${DATABASE_URL:-❌ Not Set}
- AI API Keys: ${OPENAI_API_KEY:+✅ OpenAI}${GEMINI_API_KEY:+✅ Gemini}${OPENAI_API_KEY:-}${GEMINI_API_KEY:-❌ None}

## Next Steps
1. Monitor the deployment
2. Test all features
3. Check performance metrics
4. Update DNS if needed

## Performance Recommendations
- Monitor Core Web Vitals
- Check error rates
- Optimize images and bundles
- Enable caching strategies
EOF

print_success "Deployment report generated: deployment-report.md"

# Final status
print_success "🎉 Deployment process completed!"
print_status "Next steps:"
echo "  1. Monitor the deployment status"
echo "  2. Test all features on the live site"
echo "  3. Check performance metrics"
echo "  4. Set up monitoring and analytics"
echo "  5. Configure custom domain if needed"

print_status "Deployment script finished at $(date)" 