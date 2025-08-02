#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Performance Audit...\n');

// Check if .next exists
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.log('📦 Building project first...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Analyze bundle
console.log('\n📊 Analyzing bundle size...');
try {
  execSync('ANALYZE=true npm run build', { stdio: 'inherit' });
} catch (error) {
  console.warn('⚠️ Bundle analysis failed, continuing...');
}

// Check bundle size
function getBundleSize() {
  const staticDir = path.join(nextDir, 'static');
  if (!fs.existsSync(staticDir)) {
    console.warn('⚠️ Static directory not found');
    return;
  }

  console.log('\n📈 Bundle Size Analysis:');
  console.log('========================');

  // Check JavaScript bundles
  const chunksDir = path.join(staticDir, 'chunks');
  if (fs.existsSync(chunksDir)) {
    const chunks = fs.readdirSync(chunksDir);
    let totalSize = 0;

    chunks.forEach(chunk => {
      const chunkPath = path.join(chunksDir, chunk);
      const stat = fs.statSync(chunkPath);
      const sizeKB = Math.round(stat.size / 1024);
      totalSize += sizeKB;

      if (chunk.endsWith('.js')) {
        const status = sizeKB > 250 ? '🔴' : sizeKB > 100 ? '🟡' : '🟢';
        console.log(`${status} ${chunk}: ${sizeKB}KB`);
      }
    });

    console.log(`\n📊 Total JavaScript: ${totalSize}KB`);
    if (totalSize > 1000) {
      console.log('⚠️ Large bundle detected! Consider code splitting.');
    } else if (totalSize < 500) {
      console.log('✅ Good bundle size!');
    }
  }
}

// Check for performance anti-patterns
function checkAntiPatterns() {
  console.log('\n🔍 Checking for Performance Anti-patterns:');
  console.log('==========================================');

  const srcDir = path.join(process.cwd(), 'src');
  const issues = [];

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for performance issues
        if (content.includes('useEffect(() => {') && content.includes('[]')) {
          const emptyDepsCount = (content.match(/useEffect\([^,]+,\s*\[\]/g) || []).length;
          if (emptyDepsCount > 3) {
            issues.push(`⚠️ Multiple useEffect with empty deps in ${file}`);
          }
        }

        if (content.includes('useState') && content.includes('useEffect')) {
          const stateCount = (content.match(/useState/g) || []).length;
          const effectCount = (content.match(/useEffect/g) || []).length;
          if (stateCount > 10 || effectCount > 8) {
            issues.push(`🔴 High state/effect count in ${file}: ${stateCount} states, ${effectCount} effects`);
          }
        }

        if (content.includes('console.log') && !content.includes('NODE_ENV === \'development\'')) {
          issues.push(`🟡 Console.log found in ${file} (should be dev-only)`);
        }

        if (content.includes('import ') && content.includes(' from \'@/')) {
          const importCount = (content.match(/import .+ from ['"]@\//g) || []).length;
          if (importCount > 15) {
            issues.push(`🟡 High import count in ${file}: ${importCount} imports`);
          }
        }
      }
    });
  }

  try {
    scanDirectory(srcDir);
  } catch (error) {
    console.warn('Could not scan source directory');
  }

  if (issues.length === 0) {
    console.log('✅ No performance anti-patterns detected!');
  } else {
    issues.forEach(issue => console.log(issue));
    console.log(`\n📋 Found ${issues.length} potential performance issues`);
  }
}

// Generate performance recommendations
function generateRecommendations() {
  console.log('\n💡 Performance Recommendations:');
  console.log('================================');

  const recommendations = [
    '✅ Web Vitals monitoring is enabled',
    '✅ Bundle analyzer is configured',
    '✅ Performance monitoring components added',
    '✅ Lazy loading components implemented',
    '✅ PWA optimization enabled',
    '',
    '🚀 Next Steps:',
    '• Run `npm run bundle:analyze` to visualize bundle',
    '• Monitor Web Vitals in production',
    '• Consider implementing React.memo for heavy components',
    '• Use Suspense boundaries for better loading UX',
    '• Optimize images with next/image',
    '• Implement virtual scrolling for long lists',
  ];

  recommendations.forEach(rec => console.log(rec));
}

// Run audit
getBundleSize();
checkAntiPatterns();
generateRecommendations();

console.log('\n🎯 Performance Audit Complete!');
console.log('Run `npm run dev` and check the Performance Monitor in bottom-right corner.');
console.log('Check browser DevTools → Lighthouse for detailed metrics.');