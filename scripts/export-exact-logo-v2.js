#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/brand');

// Lucide paths
const messageSquarePath = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z";
const sparklesPath = "M12 3l-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z";

function generateExactLogo(variant, size = 48) {
  const configs = {
    light: {
      bgGradient: ['#9333ea', '#6366f1'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
    },
    dark: {
      bgGradient: ['transparent', 'transparent'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24', // Keep yellow for contrast
      textColor: '#ffffff',
      isTransparent: true,
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
  const scale = size / 48;
  const iconScale = 24 / 48;
  const iconSize = size * iconScale;
  const iconOffset = (size - iconSize) / 2;
  
  const sparkleScale = 12 / 48;
  const sparkleSize = size * sparkleScale;
  const sparkleOffset = size * 0.625;

  const gradientId = `grad-${variant}-${size}`;
  const maskId = `mask-${variant}-${size}`;
  const roundedCorners = size * 0.25;
  const strokeWidth = Math.max(1.5, 2 * scale);

  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.bgGradient[0]}" />
      <stop offset="100%" stop-color="${config.bgGradient[1]}" />
    </linearGradient>
    
    <!-- Mask to create outline effect -->
    <mask id="${maskId}">
      <rect width="${size}" height="${size}" fill="white" />
      <!-- Cut out the message square interior -->
      <g transform="translate(${iconOffset}, ${iconOffset})">
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24">
          <path d="${messageSquarePath}" fill="black" stroke="black" stroke-width="${-strokeWidth}" />
        </svg>
      </g>
    </mask>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${roundedCorners}" 
        fill="${variant === 'transparent' ? config.bgGradient[0] : `url(#${gradientId})`}"
        ${config.border ? `stroke="${config.border}" stroke-width="${scale}"` : ''} />
  
  <!-- Message Square with outline effect -->
  <rect width="${size}" height="${size}" rx="${roundedCorners}" 
        fill="${config.iconColor}" 
        mask="url(#${maskId})" />
  
  <!-- Sparkles Icon -->
  <g transform="translate(${sparkleOffset}, ${sparkleOffset})">
    <svg width="${sparkleSize}" height="${sparkleSize}" viewBox="0 0 24 24" fill="none">
      <path d="${sparklesPath}" fill="${config.sparkleColor}" />
    </svg>
  </g>
</svg>`;

  return svg;
}

// Alternative approach - use stroke and fill together
function generateExactLogoAlt(variant, size = 48) {
  const configs = {
    light: {
      bgGradient: ['#9333ea', '#6366f1'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24',
      textColor: '#111827',
    },
    dark: {
      bgGradient: ['transparent', 'transparent'],
      iconColor: '#ffffff',
      sparkleColor: '#fbbf24', // Keep yellow for contrast
      textColor: '#ffffff',
      isTransparent: true,
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
  const scale = size / 48;
  const iconScale = 24 / 48;
  const iconSize = size * iconScale;
  const iconOffset = (size - iconSize) / 2;
  
  const sparkleScale = 12 / 48;
  const sparkleSize = size * sparkleScale;
  const sparkleOffset = size * 0.625;

  const gradientId = `grad-${variant}-${size}`;
  const roundedCorners = size * 0.25;

  // All variants should have transparent fill with colored stroke
  const messageFill = 'none';
  const messageStroke = config.iconColor;

  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.bgGradient[0]}" />
      <stop offset="100%" stop-color="${config.bgGradient[1]}" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${roundedCorners}" 
        fill="${variant === 'transparent' ? config.bgGradient[0] : `url(#${gradientId})`}"
        ${config.border ? `stroke="${config.border}" stroke-width="${scale}"` : ''} />
  
  <!-- Message Square Icon -->
  <g transform="translate(${iconOffset}, ${iconOffset})">
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none">
      <path d="${messageSquarePath}" 
            fill="${messageFill}" 
            stroke="${messageStroke}" 
            stroke-width="2" 
            stroke-linejoin="round" />
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

console.log('🎨 Generating exact match logos V2...\n');

// Generate with the alternative approach (simpler)
['light', 'dark', 'transparent'].forEach(variant => {
  const icon48 = generateExactLogoAlt(variant, 48);
  fs.writeFileSync(path.join(outputDir, `garrio-icon-${variant}.svg`), icon48);
  console.log(`✅ Generated: garrio-icon-${variant}.svg`);
  
  [64, 128, 256, 512].forEach(size => {
    const icon = generateExactLogoAlt(variant, size);
    fs.writeFileSync(path.join(outputDir, `garrio-icon-${variant}-${size}.svg`), icon);
    console.log(`✅ Generated: garrio-icon-${variant}-${size}.svg`);
  });
});

// Special - Shopify with high res
const shopifyIcon = generateExactLogoAlt('light', 1200);
fs.writeFileSync(path.join(outputDir, 'shopify-app-icon-exact.svg'), shopifyIcon);
console.log(`✅ Generated: shopify-app-icon-exact.svg`);

console.log('\n✨ Logo export complete!');