const puppeteer = require('puppeteer');

async function testMobilePerformance() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewport({
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  
  // Set user agent for mobile
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');
  
  // Enable performance monitoring
  await page.setCacheEnabled(false);
  
  console.log('📱 Testing mobile performance...');
  
  // Navigate to the page
  const startTime = Date.now();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const loadTime = Date.now() - startTime;
  
  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const resources = performance.getEntriesByType('resource');
    
    // Calculate total resource size
    const totalSize = resources.reduce((sum, resource) => {
      return sum + (resource.transferSize || 0);
    }, 0);
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      totalResources: resources.length,
      totalSize: totalSize,
      largestContentfulPaint: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0,
    };
  });
  
  console.log('📊 Mobile Performance Results:');
  console.log(`⏱️  Total Load Time: ${loadTime}ms`);
  console.log(`🎨 First Paint: ${Math.round(metrics.firstPaint)}ms`);
  console.log(`📝 First Contentful Paint: ${Math.round(metrics.firstContentfulPaint)}ms`);
  console.log(`🖼️  Largest Contentful Paint: ${Math.round(metrics.largestContentfulPaint)}ms`);
  console.log(`🔧 DOM Content Loaded: ${Math.round(metrics.domContentLoaded)}ms`);
  console.log(`📦 Total Resources: ${metrics.totalResources}`);
  console.log(`💾 Total Size: ${Math.round(metrics.totalSize / 1024)}KB`);
  
  // Estimate performance score
  const fcp = metrics.firstContentfulPaint;
  const lcp = metrics.largestContentfulPaint;
  let estimatedScore = 100;
  
  // FCP scoring
  if (fcp > 3000) estimatedScore -= 30;
  else if (fcp > 2000) estimatedScore -= 20;
  else if (fcp > 1500) estimatedScore -= 10;
  
  // LCP scoring
  if (lcp > 4000) estimatedScore -= 25;
  else if (lcp > 2500) estimatedScore -= 15;
  else if (lcp > 2000) estimatedScore -= 10;
  
  // Load time scoring
  if (loadTime > 5000) estimatedScore -= 20;
  else if (loadTime > 3000) estimatedScore -= 10;
  
  // Bundle size scoring
  if (metrics.totalSize > 3000000) estimatedScore -= 15; // 3MB
  else if (metrics.totalSize > 2000000) estimatedScore -= 10; // 2MB
  else if (metrics.totalSize > 1000000) estimatedScore -= 5; // 1MB
  
  console.log(`🎯 Estimated Mobile Performance Score: ${Math.max(0, estimatedScore)}`);
  
  // Test touch interactions
  console.log('\n📱 Testing mobile interactions...');
  
  // Test header navigation
  try {
    await page.tap('.nav-item');
    console.log('✅ Header navigation works');
  } catch (e) {
    console.log('❌ Header navigation issue');
  }
  
  // Test mobile menu
  try {
    await page.tap('.mobile-menu-button');
    await page.waitForTimeout(500);
    console.log('✅ Mobile menu works');
  } catch (e) {
    console.log('❌ Mobile menu issue');
  }
  
  // Test hero slider
  try {
    await page.tap('.hero-slider');
    console.log('✅ Hero slider touch works');
  } catch (e) {
    console.log('❌ Hero slider touch issue');
  }
  
  await browser.close();
}

testMobilePerformance().catch(console.error);
