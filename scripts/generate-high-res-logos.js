#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const brandDir = path.join(__dirname, '../public/brand');

// Generate high-resolution SVG with proper scaling
function generateHighResLogo(variant, size = 1200) {
  const configs = {
    light: {
      bgGradient: ['#9333ea', '#6366f1'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
    },
    dark: {
      bgGradient: ['#ffffff', '#ffffff'],
      iconColor: '#9333ea',
      sparkleColor: '#6366f1',
    },
    transparent: {
      bgGradient: ['transparent', 'transparent'],
      iconColor: '#9333ea',
      sparkleColor: '#fbbf24',
      border: true,
    }
  };

  const config = configs[variant];
  const scale = size / 48; // Original viewBox is 48x48
  const iconScale = 0.5; // Icon takes up 50% of the canvas
  const iconSize = size * iconScale;
  const iconOffset = (size - iconSize) / 2;
  
  // Scale all path coordinates
  const messageSquarePath = `M${iconOffset + iconSize * 0.25} ${iconOffset + iconSize * 0.25}
    C${iconOffset + iconSize * 0.25} ${iconOffset + iconSize * 0.177}
    ${iconOffset + iconSize * 0.323} ${iconOffset + iconSize * 0.104}
    ${iconOffset + iconSize * 0.396} ${iconOffset + iconSize * 0.104}
    H${iconOffset + iconSize * 0.708}
    C${iconOffset + iconSize * 0.781} ${iconOffset + iconSize * 0.104}
    ${iconOffset + iconSize * 0.854} ${iconOffset + iconSize * 0.177}
    ${iconOffset + iconSize * 0.854} ${iconOffset + iconSize * 0.25}
    V${iconOffset + iconSize * 0.583}
    C${iconOffset + iconSize * 0.854} ${iconOffset + iconSize * 0.656}
    ${iconOffset + iconSize * 0.781} ${iconOffset + iconSize * 0.729}
    ${iconOffset + iconSize * 0.708} ${iconOffset + iconSize * 0.729}
    H${iconOffset + iconSize * 0.479}
    L${iconOffset + iconSize * 0.396} ${iconOffset + iconSize * 0.854}
    V${iconOffset + iconSize * 0.729}
    H${iconOffset + iconSize * 0.396}
    C${iconOffset + iconSize * 0.323} ${iconOffset + iconSize * 0.729}
    ${iconOffset + iconSize * 0.25} ${iconOffset + iconSize * 0.656}
    ${iconOffset + iconSize * 0.25} ${iconOffset + iconSize * 0.583}
    V${iconOffset + iconSize * 0.25}Z`;

  const sparkleOffset = iconOffset + iconSize * 0.75;
  const sparkleSize = iconSize * 0.25;
  const sparklePath = `M${sparkleOffset + sparkleSize/2} ${sparkleOffset}
    L${sparkleOffset + sparkleSize*0.6} ${sparkleOffset + sparkleSize*0.4}
    L${sparkleOffset + sparkleSize} ${sparkleOffset + sparkleSize/2}
    L${sparkleOffset + sparkleSize*0.6} ${sparkleOffset + sparkleSize*0.6}
    L${sparkleOffset + sparkleSize/2} ${sparkleOffset + sparkleSize}
    L${sparkleOffset + sparkleSize*0.4} ${sparkleOffset + sparkleSize*0.6}
    L${sparkleOffset} ${sparkleOffset + sparkleSize/2}
    L${sparkleOffset + sparkleSize*0.4} ${sparkleOffset + sparkleSize*0.4}Z`;

  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient-${variant}-${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.bgGradient[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${config.bgGradient[1]};stop-opacity:1" />
    </linearGradient>
    ${config.border ? `
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.1"/>
    </filter>` : ''}
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.08}" 
        fill="${config.bgGradient[0] !== 'transparent' ? `url(#gradient-${variant}-${size})` : 'rgba(147, 51, 234, 0.1)'}" 
        ${config.border ? 'stroke="rgba(147, 51, 234, 0.2)" stroke-width="2" filter="url(#shadow)"' : ''} />
  
  <!-- Message Square Icon -->
  <path d="${messageSquarePath}" fill="${config.iconColor}" />
  
  <!-- Sparkle -->
  <path d="${sparklePath}" fill="${config.sparkleColor}" />
</svg>`;

  return svg;
}

// Generate high-res versions
console.log('🎨 Generating high-resolution logos...\n');

// Shopify App Icon (1200x1200)
const shopifySvg = generateHighResLogo('light', 1200);
fs.writeFileSync(path.join(brandDir, 'shopify-app-icon-hires.svg'), shopifySvg);
console.log('✅ Generated: shopify-app-icon-hires.svg');

// Convert to PNG with maximum quality
try {
  execSync(`convert -background none "${path.join(brandDir, 'shopify-app-icon-hires.svg')}" -quality 100 "${path.join(brandDir, 'shopify-app-icon-1200.png')}"`);
  console.log('✅ Generated: shopify-app-icon-1200.png (high quality)');
} catch (error) {
  console.error('❌ Failed to convert Shopify icon to PNG:', error.message);
}

// Generate other high-res versions for testing
['light', 'dark', 'transparent'].forEach(variant => {
  const svg512 = generateHighResLogo(variant, 512);
  fs.writeFileSync(path.join(brandDir, `garrio-icon-${variant}-512-hires.svg`), svg512);
  
  try {
    execSync(`convert -background none "${path.join(brandDir, `garrio-icon-${variant}-512-hires.svg`)}" -quality 100 "${path.join(brandDir, `garrio-icon-${variant}-512.png`)}"`);
    console.log(`✅ Updated: garrio-icon-${variant}-512.png (high quality)`);
  } catch (error) {
    console.error(`❌ Failed to convert ${variant} icon:`, error.message);
  }
});

// Generate all standard sizes with high quality
const sizes = [64, 128, 256];
['light', 'dark', 'transparent'].forEach(variant => {
  sizes.forEach(size => {
    const svg = generateHighResLogo(variant, size);
    const tempSvgPath = path.join(brandDir, `temp-${variant}-${size}.svg`);
    fs.writeFileSync(tempSvgPath, svg);
    
    try {
      execSync(`convert -background none "${tempSvgPath}" -quality 100 "${path.join(brandDir, `garrio-icon-${variant}-${size}.png`)}"`);
      console.log(`✅ Updated: garrio-icon-${variant}-${size}.png`);
    } catch (error) {
      console.error(`❌ Failed to convert ${variant}-${size}:`, error.message);
    }
    
    // Clean up temp file
    fs.unlinkSync(tempSvgPath);
  });
});

console.log('\n✨ High-resolution logo generation complete!');