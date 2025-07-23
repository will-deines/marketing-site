#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/brand');

// Lucide MessageSquare path (24x24 viewBox)
const messageSquarePath = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z";

// Lucide Sparkles path (24x24 viewBox)
const sparklesPath = "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z";

// Generate logo with exact Lucide icons
function generateLucideLogo(variant, size = 48) {
  const configs = {
    light: {
      bgGradient: ['#9333ea', '#6366f1'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
    },
    dark: {
      bgGradient: ['#ffffff', '#ffffff'],
      iconColor: '#9333ea',
      sparkleColor: '#6366f1',
      textColor: '#ffffff',
    },
    transparent: {
      bgGradient: ['transparent', 'transparent'],
      iconColor: '#9333ea',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
      bgOpacity: 0.1,
      border: true,
    }
  };

  const config = configs[variant];
  const scale = size / 48;
  const iconSize = 24 * scale;
  const iconPadding = (size - iconSize) / 2;
  
  // Position sparkle at bottom-right of message square
  const sparkleSize = 12 * scale;
  const sparkleX = iconPadding + iconSize - sparkleSize * 0.3;
  const sparkleY = iconPadding + iconSize - sparkleSize * 0.3;

  const hasBg = config.bgGradient[0] !== 'transparent';
  const gradientId = `gradient-${variant}-${size}`;

  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.bgGradient[0]};stop-opacity:${config.bgOpacity || 1}" />
      <stop offset="100%" style="stop-color:${config.bgGradient[1]};stop-opacity:${config.bgOpacity || 1}" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.25}" 
        fill="${hasBg ? `url(#${gradientId})` : (config.bgOpacity ? `rgba(147, 51, 234, ${config.bgOpacity})` : 'none')}" 
        ${config.border ? `stroke="rgba(147, 51, 234, 0.2)" stroke-width="${2 * scale}"` : ''} />
  
  <!-- Message Square Icon -->
  <g transform="translate(${iconPadding}, ${iconPadding})">
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none">
      <path d="${messageSquarePath}" fill="${config.iconColor}" />
    </svg>
  </g>
  
  <!-- Sparkles Icon -->
  <g transform="translate(${sparkleX}, ${sparkleY})">
    <svg width="${sparkleSize}" height="${sparkleSize}" viewBox="0 0 24 24" fill="none">
      <path d="${sparklesPath}" fill="${config.sparkleColor}" />
    </svg>
  </g>
</svg>`;

  return svg;
}

// Generate logo with text
function generateFullLogo(variant, width = 140, height = 48) {
  const configs = {
    light: {
      bgGradient: ['#9333ea', '#6366f1'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
    },
    dark: {
      bgGradient: ['#ffffff', '#ffffff'],
      iconColor: '#9333ea',
      sparkleColor: '#6366f1',
      textColor: '#ffffff',
    },
    transparent: {
      bgGradient: ['transparent', 'transparent'],
      iconColor: '#9333ea',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
      bgOpacity: 0.1,
      border: true,
    }
  };

  const config = configs[variant];
  const iconSize = height;
  const iconScale = iconSize / 48;
  const innerIconSize = 24 * iconScale;
  const iconPadding = (iconSize - innerIconSize) / 2;
  
  const sparkleSize = 12 * iconScale;
  const sparkleX = iconPadding + innerIconSize - sparkleSize * 0.3;
  const sparkleY = iconPadding + innerIconSize - sparkleSize * 0.3;

  const hasBg = config.bgGradient[0] !== 'transparent';
  const gradientId = `gradient-full-${variant}`;

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.bgGradient[0]};stop-opacity:${config.bgOpacity || 1}" />
      <stop offset="100%" style="stop-color:${config.bgGradient[1]};stop-opacity:${config.bgOpacity || 1}" />
    </linearGradient>
  </defs>
  
  <!-- Icon Background -->
  <rect width="${iconSize}" height="${iconSize}" rx="${iconSize * 0.25}" 
        fill="${hasBg ? `url(#${gradientId})` : 'rgba(147, 51, 234, 0.1)'}" 
        ${config.border ? `stroke="rgba(147, 51, 234, 0.2)" stroke-width="${2 * iconScale}"` : ''} />
  
  <!-- Message Square Icon -->
  <g transform="translate(${iconPadding}, ${iconPadding})">
    <svg width="${innerIconSize}" height="${innerIconSize}" viewBox="0 0 24 24" fill="none">
      <path d="${messageSquarePath}" fill="${config.iconColor}" />
    </svg>
  </g>
  
  <!-- Sparkles Icon -->
  <g transform="translate(${sparkleX}, ${sparkleY})">
    <svg width="${sparkleSize}" height="${sparkleSize}" viewBox="0 0 24 24" fill="none">
      <path d="${sparklesPath}" fill="${config.sparkleColor}" />
    </svg>
  </g>
  
  <!-- Text -->
  <text x="${iconSize + 12}" y="${height / 2 + 8}" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="24" font-weight="700" fill="${config.textColor}">Garrio</text>
</svg>`;

  return svg;
}

console.log('🎨 Generating Lucide-based logos...\n');

// Generate icon variants
['light', 'dark', 'transparent'].forEach(variant => {
  // Icon only - multiple sizes
  [48, 64, 128, 256, 512].forEach(size => {
    const svg = generateLucideLogo(variant, size);
    const filename = size === 48 
      ? `garrio-icon-${variant}.svg`
      : `garrio-icon-${variant}-${size}.svg`;
    fs.writeFileSync(path.join(outputDir, filename), svg);
    console.log(`✅ Generated: ${filename}`);
  });
  
  // Full logo with text
  const fullLogo = generateFullLogo(variant);
  fs.writeFileSync(path.join(outputDir, `garrio-logo-${variant}.svg`), fullLogo);
  console.log(`✅ Generated: garrio-logo-${variant}.svg`);
  
  // Large version
  const largeLogo = generateFullLogo(variant, 280, 96);
  fs.writeFileSync(path.join(outputDir, `garrio-logo-${variant}-large.svg`), largeLogo);
  console.log(`✅ Generated: garrio-logo-${variant}-large.svg`);
});

// Generate favicon
const favicon = generateLucideLogo('light', 32);
fs.writeFileSync(path.join(outputDir, 'favicon.svg'), favicon);
console.log(`✅ Generated: favicon.svg`);

// Generate high-res versions for apps
const shopifyIcon = generateLucideLogo('light', 1200);
fs.writeFileSync(path.join(outputDir, 'shopify-app-icon-lucide.svg'), shopifyIcon);
console.log(`✅ Generated: shopify-app-icon-lucide.svg`);

const googleIcon = generateLucideLogo('light', 120);
fs.writeFileSync(path.join(outputDir, 'google-app-icon-lucide.svg'), googleIcon);
console.log(`✅ Generated: google-app-icon-lucide.svg`);

console.log('\n✨ Lucide logo export complete!');