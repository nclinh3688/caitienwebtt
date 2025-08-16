import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // 1. Sửa any types thành unknown (an toàn)
    if (content.includes(': any')) {
      content = content.replace(/(\w+)\s*:\s*any\b/g, '$1: unknown');
      hasChanges = true;
    }
    
    // 2. Comment out unused FontAwesome imports (chỉ comment, không xóa)
    const unusedIcons = [
      'FaImage', 'FaLightbulb', 'FaHandshake', 'FaFacebook', 'FaArrowRight',
      'FaHeart', 'FaShare', 'FaBookmark', 'FaUserFriends', 'FaClock',
      'FaEnvelope', 'FaLanguage', 'FaPhone', 'FaMapMarkerAlt', 'FaCheckCircle',
      'FaGraduationCap', 'FaHeadphones', 'FaMicrophone', 'FaPencilAlt', 'FaBrain',
      'FaCalendarAlt', 'FaFire', 'FaRocket', 'FaLightbulb', 'FaPen', 'FaTrophy',
      'FaGlobe', 'FaCheck', 'FaHandPointer', 'FaDesktop', 'FaStop',
      'FaVolumeDown', 'FaVolumeOff', 'FaMusic', 'FaFastForward', 'FaWaveSquare',
      'FaExpand', 'FaSync', 'FaExclamationTriangle', 'FaInfoCircle', 'FaQuestionCircle'
    ];
    
    unusedIcons.forEach(icon => {
      if (content.includes(icon) && !content.includes(`// ${icon}`)) {
        const regex = new RegExp(`\\b${icon}\\b`, 'g');
        if (content.match(regex)) {
          content = content.replace(regex, `// ${icon}`);
          hasChanges = true;
        }
      }
    });
    
    // 3. Sửa img tags thành Image components (chỉ khi có import Image)
    if (content.includes('<img') && content.includes('import Image') && !content.includes('next/image')) {
      content = content.replace(/<img([^>]*)>/g, '<Image$1>');
      content = content.replace(/<\/img>/g, '</Image>');
      hasChanges = true;
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir) {
  let totalFixed = 0;
  
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        totalFixed += walkDir(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        if (fixFile(filePath)) {
          totalFixed++;
          console.log(`✅ Fixed: ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return totalFixed;
}

console.log('🔧 Starting simple ESLint fixes...');
const totalFixed = walkDir('./src');
console.log(`✨ Simple ESLint fixes completed! Fixed ${totalFixed} files.`);
