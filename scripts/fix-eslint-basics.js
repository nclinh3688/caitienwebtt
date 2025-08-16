import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // 1. Sửa HTML entities
    if (content.includes('"') && !content.includes('&quot;')) {
      content = content.replace(/"/g, '&quot;');
      hasChanges = true;
    }
    
    if (content.includes("'") && !content.includes('&apos;')) {
      content = content.replace(/'/g, '&apos;');
      hasChanges = true;
    }
    
    // 2. Sửa img tags thành Image components
    if (content.includes('<img') && !content.includes('<Image')) {
      content = content.replace(/<img([^>]*)>/g, '<Image$1>');
      content = content.replace(/<\/img>/g, '</Image>');
      hasChanges = true;
    }
    
    // 3. Sửa anonymous default export
    if (content.includes('export default {') && !content.includes('const defaultExport = {')) {
      content = content.replace(/export default \{/g, 'const defaultExport = {');
      content = content.replace(/export default defaultExport;/g, 'export default defaultExport;');
      hasChanges = true;
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let totalFixed = 0;
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      totalFixed += walkDir(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      if (fixFile(filePath)) {
        totalFixed++;
      }
    }
  });
  
  return totalFixed;
}

console.log('🔧 Starting basic ESLint fixes...');
const totalFixed = walkDir('./src');
console.log(`✨ Basic ESLint fixes completed! Fixed ${totalFixed} files.`);
