# 📊 Analytics Setup Guide

## Google Analytics Setup

### 1. Tạo Google Analytics Account
1. Truy cập [Google Analytics](https://analytics.google.com/)
2. Tạo account mới cho "PHÚC KHIÊM Education"
3. Tạo property cho website
4. Lấy Measurement ID (format: G-XXXXXXXXXX)

### 2. Cập nhật Measurement ID
Thay thế `GA_MEASUREMENT_ID` trong file `src/app/layout.tsx`:

```typescript
// Thay thế dòng này:
gtag('config', 'GA_MEASUREMENT_ID', {

// Thành:
gtag('config', 'G-XXXXXXXXXX', {
```

### 3. Facebook Pixel Setup
1. Tạo Facebook Business Manager
2. Tạo Facebook Pixel
3. Lấy Pixel ID
4. Thay thế `YOUR_FACEBOOK_PIXEL_ID` trong layout.tsx

## SEO Optimization

### 1. Google Search Console
1. Thêm website vào Google Search Console
2. Verify ownership
3. Submit sitemap: `https://eloquent-semolina-f30407.netlify.app/sitemap.xml`

### 2. Bing Webmaster Tools
1. Thêm website vào Bing Webmaster Tools
2. Submit sitemap

### 3. Social Media Meta Tags
- Facebook: Open Graph tags đã được setup
- Twitter: Twitter Card tags đã được setup

## Performance Monitoring

### 1. Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 2. Lighthouse Score
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## PWA Features

### 1. Service Worker
- Offline functionality
- Push notifications
- Background sync

### 2. Manifest
- App installation
- Splash screen
- Theme colors

## Security Headers

### 1. Content Security Policy
- Script sources whitelisted
- Style sources whitelisted
- Image sources whitelisted

### 2. Other Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## Monitoring Tools

### 1. Uptime Monitoring
- Setup uptime monitoring với UptimeRobot
- Alert khi website down

### 2. Error Tracking
- Setup Sentry cho error tracking
- Monitor JavaScript errors

### 3. User Behavior
- Heatmap tracking với Hotjar
- Session recording
- User feedback

## Custom Domain Setup

### 1. Domain Configuration
1. Mua domain (ví dụ: phuckhiem.edu.vn)
2. Point DNS đến Netlify
3. Setup SSL certificate

### 2. Environment Variables
Cập nhật các URL trong code:
- `metadataBase`
- `sitemap.ts`
- `robots.ts`

## Maintenance Checklist

### Weekly
- [ ] Check Google Analytics reports
- [ ] Monitor Core Web Vitals
- [ ] Review error logs
- [ ] Check uptime status

### Monthly
- [ ] Update dependencies
- [ ] Review SEO performance
- [ ] Analyze user behavior
- [ ] Optimize images and assets

### Quarterly
- [ ] Security audit
- [ ] Performance optimization
- [ ] Content updates
- [ ] Feature planning 