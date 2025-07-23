#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create output directory
const outputDir = path.join(__dirname, '../public/brand');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Logo configurations
const logoConfigs = {
  light: {
    // For use on light backgrounds - colored logo
    bgGradient: ['#9333ea', '#6366f1'], // purple-600 to indigo-600
    iconColor: '#ffffff',
    sparkleColor: '#fbbf24', // yellow-400
    textColor: '#111827', // gray-900
  },
  dark: {
    // For use on dark backgrounds - white/light logo
    bgGradient: ['#ffffff', '#ffffff'], // white background
    iconColor: '#9333ea', // purple-600
    sparkleColor: '#6366f1', // indigo-600
    textColor: '#ffffff', // white text
  },
  transparent: {
    // For use on any background - transparent with border
    bgGradient: ['transparent', 'transparent'],
    bgOpacity: 0.1,
    iconColor: '#9333ea', // purple-600
    sparkleColor: '#fbbf24', // yellow-400
    textColor: '#111827', // gray-900
    border: true,
  }
};

// Generate SVG logo
function generateLogo(variant, config, includeText = true, size = 'normal') {
  const dimensions = {
    normal: { width: includeText ? 140 : 48, height: 48 },
    favicon: { width: 32, height: 32 },
    large: { width: includeText ? 280 : 96, height: 96 }
  };

  const dim = dimensions[size];
  const iconSize = size === 'favicon' ? 20 : (size === 'large' ? 48 : 24);
  const sparkleSize = size === 'favicon' ? 12 : (size === 'large' ? 24 : 12);
  const cornerRadius = size === 'favicon' ? 8 : (size === 'large' ? 24 : 12);

  const gradientId = `gradient-${variant}-${size}`;
  const hasBg = config.bgGradient[0] !== 'transparent';

  let svg = `<svg width="${dim.width}" height="${dim.height}" viewBox="0 0 ${dim.width} ${dim.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.bgGradient[0]};stop-opacity:${config.bgOpacity || 1}" />
      <stop offset="100%" style="stop-color:${config.bgGradient[1]};stop-opacity:${config.bgOpacity || 1}" />
    </linearGradient>
  </defs>
  
  <!-- Logo Container -->
  <g>
    <!-- Background -->
    <rect x="0" y="0" width="${size === 'favicon' ? 32 : 48}" height="${dim.height}" rx="${cornerRadius}" fill="${hasBg ? `url(#${gradientId})` : 'rgba(147, 51, 234, 0.1)'}" ${config.border ? 'stroke="rgba(147, 51, 234, 0.2)" stroke-width="1"' : ''} />
    
    <!-- Message Square Icon -->
    <path d="M${size === 'favicon' ? 6 : 12} ${size === 'favicon' ? 8 : 12}C${size === 'favicon' ? 6 : 12} ${size === 'favicon' ? 6.9 : 10.3431} ${size === 'favicon' ? 6.9 : 13.3431} ${size === 'favicon' ? 6 : 9} ${size === 'favicon' ? 8 : 15} ${size === 'favicon' ? 6 : 9}H${size === 'favicon' ? 20 : 28}C${size === 'favicon' ? 21.1 : 29.6569} ${size === 'favicon' ? 6 : 9} ${size === 'favicon' ? 22 : 31} ${size === 'favicon' ? 6.9 : 10.3431} ${size === 'favicon' ? 22 : 31} ${size === 'favicon' ? 8 : 12}V${size === 'favicon' ? 18 : 24}C${size === 'favicon' ? 22 : 31} ${size === 'favicon' ? 19.1 : 25.6569} ${size === 'favicon' ? 21.1 : 29.6569} ${size === 'favicon' ? 20 : 27} ${size === 'favicon' ? 20 : 28} ${size === 'favicon' ? 20 : 27}H${size === 'favicon' ? 13 : 19}L${size === 'favicon' ? 10 : 15} ${size === 'favicon' ? 23 : 31}V${size === 'favicon' ? 20 : 27}H${size === 'favicon' ? 8 : 15}C${size === 'favicon' ? 6.9 : 13.3431} ${size === 'favicon' ? 20 : 27} ${size === 'favicon' ? 6 : 12} ${size === 'favicon' ? 19.1 : 25.6569} ${size === 'favicon' ? 6 : 12} ${size === 'favicon' ? 18 : 24}V${size === 'favicon' ? 8 : 12}Z" 
          fill="${config.iconColor}" />
    
    <!-- Sparkles -->
    <g transform="translate(${size === 'favicon' ? 18 : 30}, ${size === 'favicon' ? 18 : 30})">
      <!-- Sparkle shape -->
      <path d="M${sparkleSize/2} 0L${sparkleSize*0.6} ${sparkleSize*0.4}L${sparkleSize} ${sparkleSize/2}L${sparkleSize*0.6} ${sparkleSize*0.6}L${sparkleSize/2} ${sparkleSize}L${sparkleSize*0.4} ${sparkleSize*0.6}L0 ${sparkleSize/2}L${sparkleSize*0.4} ${sparkleSize*0.4}Z" 
            fill="${config.sparkleColor}" />
    </g>`;

  if (includeText && size !== 'favicon') {
    const fontSize = size === 'large' ? 36 : 20;
    const textX = size === 'large' ? 112 : 60;
    const textY = size === 'large' ? 58 : 30;
    
    svg += `
    <!-- Text -->
    <text x="${textX}" y="${textY}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="700" fill="${config.textColor}">Garrio</text>`;
  }

  svg += `
  </g>
</svg>`;

  return svg;
}

// Generate React component
function generateReactComponent(variant, config) {
  return `import React from 'react';

export const GarrioLogo${variant.charAt(0).toUpperCase() + variant.slice(1)} = ({ className = "", size = 24 }) => (
  <svg 
    width={size * 5.8} 
    height={size * 2} 
    viewBox="0 0 140 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gradient-${variant}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="${config.bgGradient[0]}" stopOpacity="${config.bgOpacity || 1}" />
        <stop offset="100%" stopColor="${config.bgGradient[1]}" stopOpacity="${config.bgOpacity || 1}" />
      </linearGradient>
    </defs>
    
    <g>
      <rect x="0" y="0" width="48" height="48" rx="12" fill="${config.bgGradient[0] !== 'transparent' ? `url(#gradient-${variant})` : 'rgba(147, 51, 234, 0.1)'}" ${config.border ? 'stroke="rgba(147, 51, 234, 0.2)" strokeWidth="1"' : ''} />
      
      <path d="M12 12C12 10.3431 13.3431 9 15 9H28C29.6569 9 31 10.3431 31 12V24C31 25.6569 29.6569 27 28 27H19L15 31V27H15C13.3431 27 12 25.6569 12 24V12Z" 
            fill="${config.iconColor}" />
      
      <g transform="translate(30, 30)">
        <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" 
              fill="${config.sparkleColor}" />
      </g>
      
      <text x="60" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill="${config.textColor}">Garrio</text>
    </g>
  </svg>
);

export const GarrioIcon${variant.charAt(0).toUpperCase() + variant.slice(1)} = ({ className = "", size = 24 }) => (
  <svg 
    width={size * 2} 
    height={size * 2} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gradient-icon-${variant}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="${config.bgGradient[0]}" stopOpacity="${config.bgOpacity || 1}" />
        <stop offset="100%" stopColor="${config.bgGradient[1]}" stopOpacity="${config.bgOpacity || 1}" />
      </linearGradient>
    </defs>
    
    <rect width="48" height="48" rx="12" fill="${config.bgGradient[0] !== 'transparent' ? `url(#gradient-icon-${variant})` : 'rgba(147, 51, 234, 0.1)'}" ${config.border ? 'stroke="rgba(147, 51, 234, 0.2)" strokeWidth="1"' : ''} />
    
    <path d="M12 12C12 10.3431 13.3431 9 15 9H28C29.6569 9 31 10.3431 31 12V24C31 25.6569 29.6569 27 28 27H19L15 31V27H15C13.3431 27 12 25.6569 12 24V12Z" 
          fill="${config.iconColor}" />
    
    <g transform="translate(30, 30)">
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" 
            fill="${config.sparkleColor}" />
    </g>
  </svg>
);
`;
}

// Generate all logo variants
console.log('🎨 Generating Garrio logos...\n');

// Generate SVG files
Object.entries(logoConfigs).forEach(([variant, config]) => {
  // Full logo with text
  const fullLogo = generateLogo(variant, config, true, 'normal');
  fs.writeFileSync(path.join(outputDir, `garrio-logo-${variant}.svg`), fullLogo);
  console.log(`✅ Generated: garrio-logo-${variant}.svg`);

  // Icon only
  const icon = generateLogo(variant, config, false, 'normal');
  fs.writeFileSync(path.join(outputDir, `garrio-icon-${variant}.svg`), icon);
  console.log(`✅ Generated: garrio-icon-${variant}.svg`);

  // Large version
  const largeLogo = generateLogo(variant, config, true, 'large');
  fs.writeFileSync(path.join(outputDir, `garrio-logo-${variant}-large.svg`), largeLogo);
  console.log(`✅ Generated: garrio-logo-${variant}-large.svg`);
});

// Generate favicon
const favicon = generateLogo('dark', logoConfigs.dark, false, 'favicon');
fs.writeFileSync(path.join(outputDir, 'favicon.svg'), favicon);
console.log(`✅ Generated: favicon.svg`);

// Generate React components
const reactComponents = Object.entries(logoConfigs)
  .map(([variant, config]) => generateReactComponent(variant, config))
  .join('\n\n');

fs.writeFileSync(
  path.join(outputDir, 'garrio-logo-react.tsx'),
  reactComponents
);
console.log(`✅ Generated: garrio-logo-react.tsx`);

// Generate HTML for favicon
const faviconHTML = `<!-- Garrio Favicon -->
<link rel="icon" type="image/svg+xml" href="/brand/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/brand/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png">`;

fs.writeFileSync(path.join(outputDir, 'favicon-html.txt'), faviconHTML);
console.log(`✅ Generated: favicon-html.txt`);

// Generate README
const readme = `# Garrio Brand Assets

## Logo Files

### Light Theme
- \`garrio-logo-light.svg\` - Full logo with text (light background)
- \`garrio-icon-light.svg\` - Icon only (light background)
- \`garrio-logo-light-large.svg\` - Large version for presentations

### Dark Theme
- \`garrio-logo-dark.svg\` - Full logo with text (dark background)
- \`garrio-icon-dark.svg\` - Icon only (dark background)
- \`garrio-logo-dark-large.svg\` - Large version for presentations

### Transparent
- \`garrio-logo-transparent.svg\` - Transparent background with border
- \`garrio-icon-transparent.svg\` - Icon only with transparent background

### Favicon
- \`favicon.svg\` - SVG favicon (32x32)
- \`favicon-html.txt\` - HTML snippet for favicon implementation

## React Components
- \`garrio-logo-react.tsx\` - React components for all logo variants

## Usage

### In HTML
\`\`\`html
<img src="/brand/garrio-logo-light.svg" alt="Garrio" height="48">
\`\`\`

### In React
\`\`\`tsx
import { GarrioLogoLight, GarrioIconDark } from '@/public/brand/garrio-logo-react';

// Full logo
<GarrioLogoLight size={24} className="my-logo" />

// Icon only
<GarrioIconDark size={32} />
\`\`\`

### Favicon
Add the contents of \`favicon-html.txt\` to your HTML \`<head>\`.

## Color Palette
- Purple: #9333ea
- Indigo: #6366f1
- Yellow: #fbbf24
- Gray: #111827
`;

fs.writeFileSync(path.join(outputDir, 'README.md'), readme);
console.log(`✅ Generated: README.md`);

console.log(`\n✨ Logo export complete! Check the ${outputDir} directory.`);
console.log('\n💡 Tip: To generate PNG versions, you can use a tool like svg2png or ImageMagick:');
console.log('   convert favicon.svg -resize 32x32 favicon-32.png');
console.log('   convert favicon.svg -resize 16x16 favicon-16.png');
console.log('   convert garrio-icon-dark.svg -resize 180x180 apple-touch-icon.png');