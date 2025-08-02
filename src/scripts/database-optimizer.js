#!/usr/bin/env node

/**
 * 🗄️ Database Query Optimizer
 * Analyzes and optimizes database queries for better performance
 */

const fs = require('fs');
const path = require('path');

console.log('🗄️ [DB Optimizer] Starting database analysis...');

const apiDir = path.join(process.cwd(), 'src', 'app', 'api');
let queryAnalysis = {
  totalQueries: 0,
  unoptimizedQueries: 0,
  missingIndexes: [],
  nPlusOneQueries: [],
  largeFetches: []
};

// Common database anti-patterns
const antiPatterns = {
  nPlusOne: /await\s+prisma\.\w+\.findMany.*\n[\s\S]*?\.map.*await\s+prisma/g,
  largeFetch: /findMany\(\s*\)/g,
  missingSelect: /findMany\({[^}]*}\)(?!.*select)/g,
  sequentialQueries: /(await\s+prisma\.\w+\.find.*\n\s*){2,}/g
};

// Optimization suggestions
const optimizations = {
  addSelect: 'Add select clause to fetch only needed fields',
  addPagination: 'Add pagination (take/skip) for large datasets',  
  useIncludes: 'Use include instead of separate queries',
  addTransaction: 'Wrap multiple queries in transaction',
  addIndexes: 'Add database indexes for frequently queried fields'
};

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Count total queries
    const queries = content.match(/await\s+prisma\.\w+\./g) || [];
    queryAnalysis.totalQueries += queries.length;
    
    // Check for N+1 queries
    const nPlusOnes = content.match(antiPatterns.nPlusOne) || [];
    if (nPlusOnes.length > 0) {
      issues.push(`🔴 N+1 Query detected (${nPlusOnes.length} instances)`);
      queryAnalysis.nPlusOneQueries.push(filePath);
    }
    
    // Check for large unfiltered fetches
    const largeFetches = content.match(antiPatterns.largeFetch) || [];
    if (largeFetches.length > 0) {
      issues.push(`🟡 Unfiltered findMany() calls (${largeFetches.length} instances)`);
      queryAnalysis.largeFetches.push(filePath);
    }
    
    // Check for missing select clauses
    const missingSelects = content.match(antiPatterns.missingSelect) || [];
    if (missingSelects.length > 0) {
      issues.push(`🟡 Missing select clauses (${missingSelects.length} instances)`);
    }
    
    // Check for sequential queries that could be optimized
    const sequential = content.match(antiPatterns.sequentialQueries) || [];
    if (sequential.length > 0) {
      issues.push(`🟡 Sequential queries (consider batching)`);
    }
    
    if (issues.length > 0) {
      queryAnalysis.unoptimizedQueries++;
    }
    
    return issues;
  } catch (error) {
    return [`Error analyzing file: ${error.message}`];
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log('⚠️ [Warning] API directory not found');
    return;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.ts')) {
      const issues = analyzeFile(fullPath);
      
      if (issues.length > 0) {
        console.log(`📄 ${path.relative(process.cwd(), fullPath)}`);
        issues.forEach(issue => console.log(`   ${issue}`));
      }
    }
  });
}

// Suggestions for schema optimization
function generateSchemaOptimizations() {
  console.log('\n🔧 [Schema Optimizations] Recommended indexes:');
  
  const commonIndexes = [
    { table: 'User', field: 'email', reason: 'Authentication queries' },
    { table: 'Course', field: 'language', reason: 'Filter by language' },
    { table: 'Lesson', field: 'courseId', reason: 'Course-lesson relationship' },
    { table: 'UserProgress', field: 'userId', reason: 'User progress lookup' },
    { table: 'Test', field: 'level', reason: 'Filter tests by level' },
    { table: 'TestResult', field: 'userId', reason: 'User test history' }
  ];
  
  commonIndexes.forEach(index => {
    console.log(`📋 @@index([${index.field}]) on ${index.table} - ${index.reason}`);
  });
}

function generateQueryOptimizations() {
  console.log('\n💡 [Query Optimizations] Best Practices:');
  
  const practices = [
    '✅ Use select to fetch only needed fields',
    '✅ Add pagination (take/skip) for lists',
    '✅ Use include for related data instead of separate queries',
    '✅ Implement caching for frequently accessed data',
    '✅ Use transactions for multi-step operations',
    '✅ Add proper error handling and retries'
  ];
  
  practices.forEach(practice => console.log(`   ${practice}`));
}

// Run the analysis
scanDirectory(apiDir);

console.log('\n📊 [Summary] Database Analysis:');
console.log(`🔢 Total queries analyzed: ${queryAnalysis.totalQueries}`);
console.log(`⚠️  Files with issues: ${queryAnalysis.unoptimizedQueries}`);
console.log(`🔴 N+1 query files: ${queryAnalysis.nPlusOneQueries.length}`);
console.log(`🟡 Large fetch files: ${queryAnalysis.largeFetches.length}`);

generateSchemaOptimizations();
generateQueryOptimizations();

console.log('\n🚀 [Complete] Database optimization analysis finished!');