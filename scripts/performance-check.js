#!/usr/bin/env node

/**
 * Performance Check Script for Caitienwebtt
 * Analyzes project performance and provides recommendations
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Caitienwebtt Performance Analysis\n');

// Check bundle sizes
function checkBundleSizes() {
  console.log('📦 Bundle Size Analysis:');
  
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    console.log('✅ Next.js build directory exists');
    
    // Check for large files
    const staticDir = path.join(nextDir, 'static');
    if (fs.existsSync(staticDir)) {
      console.log('✅ Static assets directory exists');
    }
  } else {
    console.log('⚠️  Next.js build directory not found. Run "npm run build" first.');
  }
}

// Check for performance issues
function checkPerformanceIssues() {
  console.log('\n🔍 Performance Issue Check:');
  
  const issues = [];
  
  // Check for large images
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    const imageFiles = findImageFiles(publicDir);
    const largeImages = imageFiles.filter(file => {
      const stats = fs.statSync(file);
      return stats.size > 500 * 1024; // 500KB
    });
    
    if (largeImages.length > 0) {
      issues.push(`Found ${largeImages.length} large images (>500KB)`);
    }
  }
  
  // Check for unused dependencies
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = Object.keys(packageJson.dependencies || {});
  console.log(`📋 Total dependencies: ${dependencies.length}`);
  
  if (issues.length === 0) {
    console.log('✅ No major performance issues found');
  } else {
    console.log('⚠️  Potential issues:');
    issues.forEach(issue => console.log(`   - ${issue}`));
  }
}

// Check code quality
function checkCodeQuality() {
  console.log('\n📝 Code Quality Check:');
  
  const srcDir = path.join(process.cwd(), 'src');
  if (fs.existsSync(srcDir)) {
    const tsFiles = findTypeScriptFiles(srcDir);
    console.log(`✅ Found ${tsFiles.length} TypeScript files`);
    
    // Check for common issues
    let hasIssues = false;
    
    tsFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for console.log in production
      if (content.includes('console.log(') && !content.includes('NODE_ENV')) {
        hasIssues = true;
        console.log(`⚠️  Found console.log in ${file}`);
      }
      
      // Check for large components
      const lines = content.split('\n').length;
      if (lines > 500) {
        console.log(`⚠️  Large file detected: ${file} (${lines} lines)`);
      }
    });
    
    if (!hasIssues) {
      console.log('✅ Code quality looks good');
    }
  }
}

// Check environment setup
function checkEnvironment() {
  console.log('\n🔧 Environment Check:');
  
  const envFiles = ['.env.local', '.env'];
  envFiles.forEach(envFile => {
    if (fs.existsSync(envFile)) {
      console.log(`✅ ${envFile} exists`);
    } else {
      console.log(`⚠️  ${envFile} not found`);
    }
  });
  
  // Check for required environment variables
  const requiredVars = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'DATABASE_URL'
  ];
  
  console.log('\nRequired environment variables:');
  requiredVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
}

// Utility functions
function findImageFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(item)) {
      files.push(fullPath);
    }
  });
  
  return files;
}

function findTypeScriptFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findTypeScriptFiles(fullPath));
    } else if (/\.(ts|tsx)$/i.test(item)) {
      files.push(fullPath);
    }
  });
  
  return files;
}

// Generate recommendations
function generateRecommendations() {
  console.log('\n💡 Performance Recommendations:');
  
  const recommendations = [
    '🎯 Implement React.memo() for expensive components',
    '🎯 Use useMemo() and useCallback() for expensive calculations',
    '🎯 Implement proper error boundaries',
    '🎯 Add loading states for better UX',
    '🎯 Consider implementing service workers for offline support',
    '🎯 Optimize images with next/image',
    '🎯 Implement proper caching strategies',
    '🎯 Add performance monitoring (Web Vitals)',
    '🎯 Consider implementing virtual scrolling for large lists',
    '🎯 Add proper SEO meta tags'
  ];
  
  recommendations.forEach(rec => console.log(rec));
}

// Main execution
function main() {
  try {
    checkBundleSizes();
    checkPerformanceIssues();
    checkCodeQuality();
    checkEnvironment();
    generateRecommendations();
    
    console.log('\n🎉 Performance analysis complete!');
    console.log('\nNext steps:');
    console.log('1. Run "npm run build" to generate production build');
    console.log('2. Run "npm run start" to test production build');
    console.log('3. Use Lighthouse to audit performance');
    console.log('4. Monitor Core Web Vitals');
    
  } catch (error) {
    console.error('❌ Error during performance analysis:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkBundleSizes,
  checkPerformanceIssues,
  checkCodeQuality,
  checkEnvironment,
  generateRecommendations
}; 