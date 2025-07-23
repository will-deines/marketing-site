#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/brand');

// Exact Lucide MessageSquare path from the source
const messageSquarePath = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z";

// Lucide Sparkles paths (main sparkle + small sparkles)
const sparklesMainPath = "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z";
const sparklesPath = "M12 3l-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z";

function generateExactLogo(variant, size = 48) {
  const configs = {
    light: {
      // Purple gradient background
      bgGradient: ['#9333ea', '#6366f1'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24', // yellow-400
      textColor: '#111827',
      hasShadow: true,
    },
    dark: {
      // White background for dark backgrounds
      bgGradient: ['#ffffff', '#ffffff'],
      iconColor: '#9333ea',
      sparkleColor: '#6366f1',
      textColor: '#ffffff',
      hasShadow: false,
    },
    transparent: {
      // Transparent with subtle purple tint
      bgGradient: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)'],
      iconColor: '#9333ea',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
      border: 'rgba(255,255,255,0.2)',
      backdrop: true,
    }
  };

  const config = configs[variant];
  const scale = size / 48;
  const iconScale = 24 / 48; // Icon is 24px in a 48px container
  const iconSize = size * iconScale;
  const iconOffset = (size - iconSize) / 2;
  
  // Sparkle positioning - bottom right corner overlap
  const sparkleScale = 12 / 48;
  const sparkleSize = size * sparkleScale;
  const sparkleOffset = size * 0.625; // Position at 30/48 of the container

  const gradientId = `grad-${variant}-${size}`;
  const shadowId = `shadow-${variant}-${size}`;
  const roundedCorners = size * 0.25; // Match rounded-xl scaling

  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.bgGradient[0]}" />
      <stop offset="100%" stop-color="${config.bgGradient[1]}" />
    </linearGradient>
    ${config.hasShadow ? `
    <filter id="${shadowId}">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.1"/>
    </filter>` : ''}
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${roundedCorners}" 
        fill="${variant === 'transparent' ? config.bgGradient[0] : `url(#${gradientId})`}"
        ${config.border ? `stroke="${config.border}" stroke-width="${scale}"` : ''}
        ${config.hasShadow ? `style="filter: drop-shadow(0 1px 3px rgba(0,0,0,0.1))"` : ''} />
  
  <!-- Message Square Icon -->
  <g transform="translate(${iconOffset}, ${iconOffset})">
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none">
      <path d="${messageSquarePath}" fill="none" stroke="${config.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </g>
  
  <!-- Sparkles Icon (overlapping bottom-right) -->
  <g transform="translate(${sparkleOffset}, ${sparkleOffset})">
    <svg width="${sparkleSize}" height="${sparkleSize}" viewBox="0 0 24 24" fill="none">
      <path d="${sparklesPath}" fill="${config.sparkleColor}" stroke="none" />
    </svg>
  </g>
</svg>`;

  return svg;
}

function generateFullLogo(variant, width = 140, height = 48) {
  const configs = {
    light: {
      bgGradient: ['#9333ea', '#6366f1'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
      hasShadow: true,
    },
    dark: {
      bgGradient: ['#ffffff', '#ffffff'],
      iconColor: '#9333ea',
      sparkleColor: '#6366f1',
      textColor: '#ffffff',
    },
    transparent: {
      bgGradient: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)'],
      iconColor: '#9333ea',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
      border: 'rgba(255,255,255,0.2)',
    }
  };

  const config = configs[variant];
  const iconSize = height;
  const scale = iconSize / 48;
  const iconScale = 24 / 48;
  const innerIconSize = iconSize * iconScale;
  const iconOffset = (iconSize - innerIconSize) / 2;
  
  const sparkleScale = 12 / 48;
  const sparkleSize = iconSize * sparkleScale;
  const sparkleOffset = iconSize * 0.625;

  const gradientId = `grad-full-${variant}`;
  const roundedCorners = iconSize * 0.25;

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.bgGradient[0]}" />
      <stop offset="100%" stop-color="${config.bgGradient[1]}" />
    </linearGradient>
  </defs>
  
  <!-- Icon Container -->
  <rect width="${iconSize}" height="${iconSize}" rx="${roundedCorners}" 
        fill="${variant === 'transparent' ? config.bgGradient[0] : `url(#${gradientId})`}"
        ${config.border ? `stroke="${config.border}" stroke-width="${scale}"` : ''} />
  
  <!-- Message Square -->
  <g transform="translate(${iconOffset}, ${iconOffset})">
    <svg width="${innerIconSize}" height="${innerIconSize}" viewBox="0 0 24 24" fill="none">
      <path d="${messageSquarePath}" fill="none" stroke="${config.iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </g>
  
  <!-- Sparkles -->
  <g transform="translate(${sparkleOffset}, ${sparkleOffset})">
    <svg width="${sparkleSize}" height="${sparkleSize}" viewBox="0 0 24 24" fill="none">
      <path d="${sparklesPath}" fill="${config.sparkleColor}" stroke="none" />
    </svg>
  </g>
  
  <!-- Text -->
  <text x="${iconSize + 12}" y="${height / 2 + 7}" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="${height * 0.5}" font-weight="700" fill="${config.textColor}">Garrio</text>
</svg>`;

  return svg;
}

// Generate high-res version with better quality
function generateHighResLogo(variant, size) {
  // Just generate at the target size directly for simplicity
  return generateExactLogo(variant, size);
}

console.log('🎨 Generating exact match logos...\n');

// Generate all variants
['light', 'dark', 'transparent'].forEach(variant => {
  // Icons
  const icon48 = generateExactLogo(variant, 48);
  fs.writeFileSync(path.join(outputDir, `garrio-icon-${variant}.svg`), icon48);
  console.log(`✅ Generated: garrio-icon-${variant}.svg`);
  
  // Larger icons
  [64, 128, 256, 512].forEach(size => {
    const icon = generateExactLogo(variant, size);
    fs.writeFileSync(path.join(outputDir, `garrio-icon-${variant}-${size}.svg`), icon);
    console.log(`✅ Generated: garrio-icon-${variant}-${size}.svg`);
  });
  
  // Full logos
  const logo = generateFullLogo(variant);
  fs.writeFileSync(path.join(outputDir, `garrio-logo-${variant}.svg`), logo);
  console.log(`✅ Generated: garrio-logo-${variant}.svg`);
  
  // Large logo
  const largeLogo = generateFullLogo(variant, 280, 96);
  fs.writeFileSync(path.join(outputDir, `garrio-logo-${variant}-large.svg`), largeLogo);
  console.log(`✅ Generated: garrio-logo-${variant}-large.svg`);
});

// Special versions
const favicon = generateExactLogo('light', 32);
fs.writeFileSync(path.join(outputDir, 'favicon.svg'), favicon);
console.log(`✅ Generated: favicon.svg`);

// High-res Shopify icon
const shopifyIcon = generateHighResLogo('light', 1200);
fs.writeFileSync(path.join(outputDir, 'shopify-app-icon-exact.svg'), shopifyIcon);
console.log(`✅ Generated: shopify-app-icon-exact.svg (high-res)`);

console.log('\n✨ Exact logo export complete!');