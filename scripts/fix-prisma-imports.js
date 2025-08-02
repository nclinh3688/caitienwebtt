const fs = require('fs');
const path = require('path');

// Files that need to be updated
const filesToUpdate = [
  'src/app/api/profile/route.ts',
  'src/app/api/pronunciation/route.ts',
  'src/app/api/progress/route.ts',
  'src/app/api/course/[id]/route.ts',
  'src/app/api/course/route.ts',
  'src/app/api/auth/register/route.ts',
  'src/app/api/assignments/route.ts',
  'src/app/api/assignments/complete/route.ts',
  'src/app/lessons/[level]/page.tsx',
  'src/app/lessons/[level]/[lessonId]/page.tsx',
  'src/lib/auth.ts'
];

function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace direct PrismaClient import with getPrismaClient
    if (content.includes('import prisma from \'@/lib/prisma\'')) {
      content = content.replace(
        'import prisma from \'@/lib/prisma\';',
        'import getPrismaClient from \'@/lib/prisma\';'
      );
      
      // Add prisma initialization in functions
      content = content.replace(
        /export async function (\w+)/g,
        'export async function $1() {\n  const prisma = getPrismaClient();'
      );
      
      // Fix function declarations
      content = content.replace(
        /const (\w+) = async/g,
        'const $1 = async'
      );
      
      console.log(`✅ Updated ${filePath}`);
    }
    
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.log(`❌ Error updating ${filePath}:`, error.message);
  }
}

console.log('🔧 Fixing Prisma imports...');

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    updateFile(file);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log('✅ Done fixing Prisma imports!'); 