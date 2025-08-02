#!/bin/bash

# Caitienwebtt Production Setup Script
# This script helps set up the project for production deployment

set -e

echo "🚀 Setting up Caitienwebtt for Production..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

print_status "Creating production environment file..."

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOF'
# Caitienwebtt Production Environment Variables
# Fill in your actual values below

# Authentication
NEXTAUTH_SECRET=your-super-secret-key-here-minimum-32-characters
NEXTAUTH_URL=https://your-domain.com

# Database (PostgreSQL recommended)
DATABASE_URL=postgresql://username:password@host:port/database

# AI Services
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
AI_PROVIDER=GEMINI

# Optional: Analytics
GOOGLE_ANALYTICS_ID=your-ga-id

# Optional: Error Tracking
SENTRY_DSN=your-sentry-dsn

# Optional: Email Service
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# Optional: File Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional: Payment (if implementing premium features)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Optional: Social Login
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Optional: Push Notifications
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key

# Optional: CDN
NEXT_PUBLIC_CDN_URL=https://your-cdn.com

# Optional: Monitoring
UPTIME_ROBOT_API_KEY=your-uptime-robot-api-key
EOF
    print_success "Created .env.local file"
    print_warning "Please edit .env.local with your actual values before deploying"
else
    print_status ".env.local already exists"
fi

# Install production dependencies
print_status "Installing production dependencies..."
npm ci --production=false

# Run database migrations
print_status "Setting up database..."
if command -v npx &> /dev/null; then
    npx prisma generate
    print_status "Prisma client generated"
    
    # Check if DATABASE_URL is set
    if [ ! -z "$DATABASE_URL" ]; then
        print_status "Running database migrations..."
        npx prisma migrate deploy || {
            print_warning "Database migration failed. Please check your DATABASE_URL"
        }
    else
        print_warning "DATABASE_URL not set. Please set it in .env.local"
    fi
else
    print_warning "npx not found. Please install Node.js and npm"
fi

# Build the project
print_status "Building the project..."
npm run build

# Check build output
if [ ! -d ".next" ]; then
    print_error "Build failed - .next directory not found"
    exit 1
fi

print_success "Build completed successfully!"

# Generate production report
print_status "Generating production setup report..."
cat > production-setup-report.md << EOF
# Production Setup Report - $(date)

## Environment Setup
- ✅ .env.local created
- ✅ Dependencies installed
- ✅ Prisma client generated
- ✅ Project built successfully

## Next Steps
1. **Edit .env.local** with your actual values
2. **Set up database** (PostgreSQL recommended)
3. **Configure AI services** (OpenAI/Gemini)
4. **Set up monitoring** (Sentry, Analytics)
5. **Deploy to Vercel**

## Required Environment Variables
- NEXTAUTH_SECRET (32+ characters)
- NEXTAUTH_URL (your domain)
- DATABASE_URL (PostgreSQL connection string)
- AI API keys (OpenAI or Gemini)

## Optional Environment Variables
- Analytics (Google Analytics)
- Error tracking (Sentry)
- Email service
- File storage (Cloudinary)
- Payment processing (Stripe)
- Social login providers
- Push notifications

## Deployment Commands
\`\`\`bash
# Deploy to Vercel
vercel --prod

# Or use the deployment script
./scripts/deploy.sh
\`\`\`

## Post-Deployment Checklist
- [ ] Test all features
- [ ] Check performance metrics
- [ ] Set up monitoring alerts
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test mobile responsiveness
- [ ] Verify PWA functionality
- [ ] Check SEO optimization

## Support
- Documentation: README.md
- Deployment Guide: DEPLOYMENT.md
- Performance Report: FINAL_PROJECT_REPORT.md
EOF

print_success "Production setup report generated: production-setup-report.md"

# Final instructions
print_success "🎉 Production setup completed!"
print_status "Next steps:"
echo "  1. Edit .env.local with your actual values"
echo "  2. Set up your database"
echo "  3. Configure AI services"
echo "  4. Deploy to Vercel: vercel --prod"
echo "  5. Test all features on the live site"

print_status "Setup script finished at $(date)" 