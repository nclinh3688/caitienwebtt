# 🚀 Caitienwebtt Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ Node.js 18+ installed
- ✅ npm or yarn package manager
- ✅ Git repository set up
- ✅ Environment variables configured
- ✅ Database set up (PostgreSQL recommended)

## 🔧 Environment Setup

### 1. Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Authentication
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-domain.com

# Database
DATABASE_URL=postgresql://username:password@host:port/database

# AI Services
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
AI_PROVIDER=GEMINI

# Optional: Analytics
GOOGLE_ANALYTICS_ID=your-ga-id
```

### 2. Database Setup

```bash
# Run database migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

#### Automatic Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

### Option 3: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t caitienwebtt .
docker run -p 3000:3000 caitienwebtt
```

## 📊 Performance Optimization

### 1. Build Optimization

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer .next/static

# Check performance
node scripts/performance-check.js
```

### 2. Image Optimization

- Use Next.js Image component
- Optimize image formats (WebP, AVIF)
- Implement lazy loading
- Use CDN for static assets

### 3. Caching Strategy

```javascript
// next.config.mjs
export default {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## 🔍 Post-Deployment Checklist

### 1. Functionality Tests
- [ ] User registration/login
- [ ] Course navigation
- [ ] AI features (chat, explain)
- [ ] Gamification system
- [ ] Social features
- [ ] Mobile responsiveness

### 2. Performance Tests
- [ ] Core Web Vitals
- [ ] Page load times
- [ ] API response times
- [ ] Database performance

### 3. Security Checks
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API rate limiting
- [ ] Input validation

### 4. Monitoring Setup
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Analytics (Google Analytics)
- [ ] Uptime monitoring

## 📈 Monitoring & Analytics

### 1. Performance Monitoring

```bash
# Run performance audit
npm run lighthouse

# Monitor Core Web Vitals
# Use the PerformanceMonitor component
```

### 2. Error Tracking

```javascript
// Add to your app
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

### 3. Analytics

```javascript
// Google Analytics
import { GA_TRACKING_ID } from '../lib/gtag'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### 2. Database Connection Issues
```bash
# Check database connection
npx prisma db push

# Reset database (development only)
npx prisma migrate reset
```

#### 3. Environment Variables
```bash
# Verify environment variables
node -e "console.log(process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set')"
```

#### 4. Performance Issues
```bash
# Run performance audit
node scripts/performance-check.js

# Analyze bundle
npx @next/bundle-analyzer .next/static
```

## 📞 Support

If you encounter issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the [Vercel documentation](https://vercel.com/docs)
3. Check the project's GitHub issues
4. Contact the development team

## 🎉 Success!

Once deployed successfully:

1. **Test all features** on the live site
2. **Monitor performance** using the built-in tools
3. **Set up alerts** for downtime and errors
4. **Configure backups** for your database
5. **Plan for scaling** as your user base grows

---

**Happy Deploying! 🚀** 