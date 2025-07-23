#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/brand');

// Lucide paths
const messageSquarePath = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z";
const sparklesPath = "M12 3l-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z";

function generateLogo(variant, size = 48) {
  const configs = {
    light: {
      // For light backgrounds - purple gradient with white outline
      background: 'gradient',
      bgGradient: ['#9333ea', '#6366f1'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
    },
    dark: {
      // For dark backgrounds - transparent with white elements
      background: 'transparent',
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
      textColor: '#ffffff',
    },
    transparent: {
      // Alternative transparent version with purple elements
      background: 'transparent-bordered',
      iconColor: '#9333ea',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
      border: 'rgba(147, 51, 234, 0.2)',
    }
  };

  const config = configs[variant];
  const scale = size / 48;
  const iconScale = 24 / 48;
  const iconSize = size * iconScale;
  const iconOffset = (size - iconSize) / 2;
  
  const sparkleScale = 12 / 48;
  const sparkleSize = size * sparkleScale;
  const sparkleOffset = size * 0.625;

  const gradientId = `grad-${variant}-${size}`;
  const roundedCorners = size * 0.25;

  let backgroundElement = '';
  
  if (config.background === 'gradient') {
    backgroundElement = `
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.bgGradient[0]}" />
      <stop offset="100%" stop-color="${config.bgGradient[1]}" />
    </linearGradient>
  </defs>
  
  <rect width="${size}" height="${size}" rx="${roundedCorners}" fill="url(#${gradientId})" />`;
  } else if (config.background === 'transparent-bordered') {
    backgroundElement = `
  <rect width="${size}" height="${size}" rx="${roundedCorners}" 
        fill="rgba(147, 51, 234, 0.05)" 
        stroke="${config.border}" 
        stroke-width="${scale}" />`;
  }
  // For 'transparent', no background element

  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  ${backgroundElement}
  
  <!-- Message Square Icon -->
  <g transform="translate(${iconOffset}, ${iconOffset})">
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none">
      <path d="${messageSquarePath}" 
            fill="none" 
            stroke="${config.iconColor}" 
            stroke-width="2" 
            stroke-linejoin="round" 
            stroke-linecap="round" />
    </svg>
  </g>
  
  <!-- Sparkles Icon -->
  <g transform="translate(${sparkleOffset}, ${sparkleOffset})">
    <svg width="${sparkleSize}" height="${sparkleSize}" viewBox="0 0 24 24" fill="none">
      <path d="${sparklesPath}" fill="${config.sparkleColor}" />
    </svg>
  </g>
</svg>`;

  return svg;
}

// Generate full logo with text
function generateFullLogo(variant, width = 140, height = 48) {
  const configs = {
    light: {
      background: 'gradient',
      bgGradient: ['#9333ea', '#6366f1'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
    },
    dark: {
      background: 'transparent',
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
      textColor: '#ffffff',
    },
    transparent: {
      background: 'transparent-bordered',
      iconColor: '#9333ea',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
      border: 'rgba(147, 51, 234, 0.2)',
    }
  };

  const config = configs[variant];
  const iconSize = height;
  const iconScale = 24 / 48;
  const innerIconSize = iconSize * iconScale;
  const iconOffset = (iconSize - innerIconSize) / 2;
  
  const sparkleScale = 12 / 48;
  const sparkleSize = iconSize * sparkleScale;
  const sparkleOffset = iconSize * 0.625;

  const gradientId = `grad-full-${variant}`;
  const roundedCorners = iconSize * 0.25;

  let iconBackground = '';
  
  if (config.background === 'gradient') {
    iconBackground = `
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.bgGradient[0]}" />
      <stop offset="100%" stop-color="${config.bgGradient[1]}" />
    </linearGradient>
  </defs>
  
  <rect width="${iconSize}" height="${iconSize}" rx="${roundedCorners}" fill="url(#${gradientId})" />`;
  } else if (config.background === 'transparent-bordered') {
    iconBackground = `
  <rect width="${iconSize}" height="${iconSize}" rx="${roundedCorners}" 
        fill="rgba(147, 51, 234, 0.05)" 
        stroke="${config.border}" 
        stroke-width="1" />`;
  }

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${iconBackground}
  
  <!-- Message Square -->
  <g transform="translate(${iconOffset}, ${iconOffset})">
    <svg width="${innerIconSize}" height="${innerIconSize}" viewBox="0 0 24 24" fill="none">
      <path d="${messageSquarePath}" 
            fill="none" 
            stroke="${config.iconColor}" 
            stroke-width="2" 
            stroke-linejoin="round" 
            stroke-linecap="round" />
    </svg>
  </g>
  
  <!-- Sparkles -->
  <g transform="translate(${sparkleOffset}, ${sparkleOffset})">
    <svg width="${sparkleSize}" height="${sparkleSize}" viewBox="0 0 24 24" fill="none">
      <path d="${sparklesPath}" fill="${config.sparkleColor}" />
    </svg>
  </g>
  
  <!-- Text -->
  <text x="${iconSize + 12}" y="${height / 2 + 7}" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="${height * 0.5}" font-weight="700" fill="${config.textColor}">Garrio</text>
</svg>`;

  return svg;
}

console.log('🎨 Generating final logos...\n');

// Generate all variants
['light', 'dark', 'transparent'].forEach(variant => {
  // Icons
  const icon48 = generateLogo(variant, 48);
  fs.writeFileSync(path.join(outputDir, `garrio-icon-${variant}.svg`), icon48);
  console.log(`✅ Generated: garrio-icon-${variant}.svg`);
  
  [64, 128, 256, 512].forEach(size => {
    const icon = generateLogo(variant, size);
    fs.writeFileSync(path.join(outputDir, `garrio-icon-${variant}-${size}.svg`), icon);
    console.log(`✅ Generated: garrio-icon-${variant}-${size}.svg`);
  });
  
  // Full logos
  const logo = generateFullLogo(variant);
  fs.writeFileSync(path.join(outputDir, `garrio-logo-${variant}.svg`), logo);
  console.log(`✅ Generated: garrio-logo-${variant}.svg`);
  
  // Large version
  const largeLogo = generateFullLogo(variant, 280, 96);
  fs.writeFileSync(path.join(outputDir, `garrio-logo-${variant}-large.svg`), largeLogo);
  console.log(`✅ Generated: garrio-logo-${variant}-large.svg`);
});

// Special versions
const favicon = generateLogo('light', 32);
fs.writeFileSync(path.join(outputDir, 'favicon.svg'), favicon);
console.log(`✅ Generated: favicon.svg`);

const shopifyIcon = generateLogo('light', 1200);
fs.writeFileSync(path.join(outputDir, 'shopify-app-icon-exact.svg'), shopifyIcon);
console.log(`✅ Generated: shopify-app-icon-exact.svg`);

console.log('\n✨ Logo generation complete!');