const puppeteer = require('puppeteer');

async function testPerformance() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Enable performance monitoring
  await page.setCacheEnabled(false);
  
  console.log('🚀 Testing performance...');
  
  // Navigate to the page
  const startTime = Date.now();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const loadTime = Date.now() - startTime;
  
  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
    };
  });
  
  console.log('📊 Performance Results:');
  console.log(`⏱️  Total Load Time: ${loadTime}ms`);
  console.log(`🎨 First Paint: ${Math.round(metrics.firstPaint)}ms`);
  console.log(`📝 First Contentful Paint: ${Math.round(metrics.firstContentfulPaint)}ms`);
  console.log(`🔧 DOM Content Loaded: ${Math.round(metrics.domContentLoaded)}ms`);
  
  // Estimate performance score
  const fcp = metrics.firstContentfulPaint;
  let estimatedScore = 100;
  
  if (fcp > 3000) estimatedScore -= 30;
  else if (fcp > 2000) estimatedScore -= 20;
  else if (fcp > 1500) estimatedScore -= 10;
  
  if (loadTime > 5000) estimatedScore -= 20;
  else if (loadTime > 3000) estimatedScore -= 10;
  
  console.log(`🎯 Estimated Performance Score: ${Math.max(0, estimatedScore)}`);
  
  await browser.close();
}

testPerformance().catch(console.error);
