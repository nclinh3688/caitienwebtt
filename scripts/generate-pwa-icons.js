const fs = require('fs');
const path = require('path');

// Generate simple PWA icons using Canvas API (Node.js version)
// For production, use actual high-quality images

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '../public/icons');

// Create simple SVG-based icons
const generateIcon = (size) => {
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#16a34a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#15803d;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="url(#grad)" />
  
  <!-- Letter P -->
  <text x="${size/2}" y="${size/2 + 8}" 
        font-family="Arial, sans-serif" 
        font-size="${size * 0.4}" 
        font-weight="bold" 
        text-anchor="middle" 
        fill="white">P</text>
        
  <!-- Small accent -->
  <circle cx="${size * 0.75}" cy="${size * 0.25}" r="${size * 0.08}" fill="#22c55e" />
</svg>
  `.trim();
  
  return svg;
};

// Generate icons
sizes.forEach(size => {
  const svg = generateIcon(size);
  const filename = `icon-${size}x${size}.png`;
  
  // For now, save as SVG (in production, convert to PNG)
  const svgFilename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(
    path.join(iconsDir, svgFilename), 
    svg
  );
  
  console.log(`Generated ${svgFilename}`);
});

// Generate shortcut icons
const shortcuts = ['dashboard', 'courses', 'test'];
shortcuts.forEach(shortcut => {
  const svg = generateIcon(96);
  const filename = `shortcut-${shortcut}.svg`;
  fs.writeFileSync(
    path.join(iconsDir, filename), 
    svg
  );
  console.log(`Generated ${filename}`);
});

console.log('PWA icons generated! 🎉');
console.log('Note: Convert SVG files to PNG for production use.');