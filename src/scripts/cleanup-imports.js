#!/usr/bin/env node

/**
 * 🧹 Import Cleanup Script
 * Identifies and suggests fixes for unused imports
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 [Cleanup] Starting import analysis...');

const srcDir = path.join(process.cwd(), 'src');
let totalFiles = 0;
let filesWithUnusedImports = 0;
let totalIssues = 0;

// Common patterns for unused imports
const patterns = {
  unusedImports: /import\s+{[^}]+}\s+from\s+['"][^'"]+['"];?\s*\n/g,
  duplicateImports: /import.*from\s+['"]([^'"]+)['"].*\n.*import.*from\s+['"](\1)['"].*/g,
  unusedTypes: /import\s+type\s+{[^}]+}\s+from/g
};

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check for potential unused imports (basic heuristic)
    const imports = content.match(/import\s+.*from\s+['"][^'"]+['"];?/g) || [];
    const importedItems = [];
    
    imports.forEach(importLine => {
      const match = importLine.match(/import\s+(?:{([^}]+)}|\s*(\w+))\s+from/);
      if (match) {
        if (match[1]) {
          // Named imports
          const namedImports = match[1].split(',').map(item => item.trim().split(' as ')[0]);
          importedItems.push(...namedImports);
        } else if (match[2]) {
          // Default import
          importedItems.push(match[2]);
        }
      }
    });
    
    // Check if imported items are used (simple check)
    let unusedImports = 0;
    importedItems.forEach(item => {
      const itemRegex = new RegExp(`\\b${item}\\b`, 'g');
      const matches = content.match(itemRegex) || [];
      // If only appears once (in import), likely unused
      if (matches.length <= 1) {
        unusedImports++;
      }
    });
    
    if (unusedImports > 0) {
      issues.push(`${unusedImports} potentially unused imports`);
    }
    
    // Check for duplicate imports
    const duplicates = content.match(patterns.duplicateImports);
    if (duplicates) {
      issues.push('Duplicate imports detected');
    }
    
    return issues;
  } catch (error) {
    return [`Error reading file: ${error.message}`];
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      scanDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      totalFiles++;
      const issues = analyzeFile(fullPath);
      
      if (issues.length > 0) {
        filesWithUnusedImports++;
        totalIssues += issues.length;
        console.log(`📄 ${path.relative(process.cwd(), fullPath)}`);
        issues.forEach(issue => console.log(`   ⚠️  ${issue}`));
      }
    }
  });
}

// Run the analysis
scanDirectory(srcDir);

console.log('\n📊 [Summary] Import Analysis Complete:');
console.log(`📁 Total files scanned: ${totalFiles}`);
console.log(`⚠️  Files with issues: ${filesWithUnusedImports}`);
console.log(`🔍 Total issues found: ${totalIssues}`);

if (totalIssues > 0) {
  console.log('\n💡 [Suggestions]:');
  console.log('• Remove unused imports to reduce bundle size');
  console.log('• Combine duplicate imports from same module');
  console.log('• Consider using import type for TypeScript types');
  console.log('• Use ESLint with unused-imports plugin for automated cleanup');
} else {
  console.log('\n✅ [Excellent] No import issues detected!');
}

console.log('\n🚀 [Next] Run ESLint with --fix for automated cleanup');