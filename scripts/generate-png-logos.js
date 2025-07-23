#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const brandDir = path.join(__dirname, '../public/brand');

// PNG generation configurations
const pngConfigs = [
  // Favicon sizes
  { input: 'favicon.svg', output: 'favicon-16.png', size: '16x16' },
  { input: 'favicon.svg', output: 'favicon-32.png', size: '32x32' },
  { input: 'favicon.svg', output: 'favicon-192.png', size: '192x192' },
  { input: 'favicon.svg', output: 'favicon-512.png', size: '512x512' },
  { input: 'garrio-icon-dark.svg', output: 'apple-touch-icon.png', size: '180x180' },
  
  // Icon sizes for each variant
  ...['light', 'dark', 'transparent'].flatMap(variant => [
    { input: `garrio-icon-${variant}.svg`, output: `garrio-icon-${variant}-64.png`, size: '64x64' },
    { input: `garrio-icon-${variant}.svg`, output: `garrio-icon-${variant}-128.png`, size: '128x128' },
    { input: `garrio-icon-${variant}.svg`, output: `garrio-icon-${variant}-256.png`, size: '256x256' },
    { input: `garrio-icon-${variant}.svg`, output: `garrio-icon-${variant}-512.png`, size: '512x512' },
  ]),
  
  // Full logo sizes (with text) - maintaining aspect ratio
  ...['light', 'dark', 'transparent'].flatMap(variant => [
    { input: `garrio-logo-${variant}.svg`, output: `garrio-logo-${variant}-96h.png`, height: 96 },
    { input: `garrio-logo-${variant}.svg`, output: `garrio-logo-${variant}-192h.png`, height: 192 },
    { input: `garrio-logo-${variant}.svg`, output: `garrio-logo-${variant}-384h.png`, height: 384 },
  ]),
  
  // Social media sizes
  { input: 'garrio-icon-dark.svg', output: 'garrio-social-square-1024.png', size: '1024x1024', background: '#2b2d3e' },
  { input: 'garrio-icon-dark.svg', output: 'garrio-social-og-1200x630.png', size: '1200x630', background: '#2b2d3e', gravity: 'center' },
  { input: 'garrio-icon-dark.svg', output: 'garrio-social-twitter-1200x675.png', size: '1200x675', background: '#2b2d3e', gravity: 'center' },
  
  // App store icons
  { input: 'garrio-icon-light.svg', output: 'shopify-app-icon-1200.png', size: '1200x1200', padding: true }, // Shopify app icon with padding
  { input: 'garrio-icon-light.svg', output: 'google-app-icon-120.png', size: '120x120' }, // Google app icon
];

console.log('🎨 Generating PNG versions of logos...\n');

// Check if ImageMagick is installed
try {
  execSync('convert -version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ ImageMagick is not installed. Please install it first:');
  console.error('   Ubuntu/Debian: sudo apt-get install imagemagick');
  console.error('   macOS: brew install imagemagick');
  console.error('   Windows: Download from https://imagemagick.org/script/download.php');
  process.exit(1);
}

// Generate each PNG
pngConfigs.forEach(config => {
  const inputPath = path.join(brandDir, config.input);
  const outputPath = path.join(brandDir, config.output);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${config.input}`);
    return;
  }
  
  let command;
  
  if (config.height) {
    // Resize by height, maintaining aspect ratio
    command = `convert -density 300 "${inputPath}" -quality 100 -resize x${config.height} "${outputPath}"`;
  } else if (config.padding) {
    // For Shopify - use high quality settings and proper SVG rendering
    const targetSize = parseInt(config.size.split('x')[0]);
    const iconSize = Math.floor(targetSize * 0.8);
    command = `convert -density 300 "${inputPath}" -resize ${iconSize}x${iconSize} -quality 100 -background transparent -gravity center -extent ${config.size} "${outputPath}"`;
  } else if (config.background && config.gravity) {
    // For social media images - add padding and center
    command = `convert -density 300 -background "${config.background}" -gravity ${config.gravity} "${inputPath}" -quality 100 -resize ${config.size}! -gravity center -extent ${config.size} "${outputPath}"`;
  } else if (config.background) {
    // With background color
    command = `convert -density 300 -background "${config.background}" "${inputPath}" -quality 100 -resize ${config.size} "${outputPath}"`;
  } else {
    // Simple resize
    command = `convert -density 300 "${inputPath}" -quality 100 -resize ${config.size} "${outputPath}"`;
  }
  
  try {
    execSync(command);
    console.log(`✅ Generated: ${config.output}`);
  } catch (error) {
    console.error(`❌ Failed to generate ${config.output}: ${error.message}`);
  }
});

// Update manifest.json with generated favicon paths
const manifestPath = path.join(brandDir, 'manifest.json');
const manifest = {
  "name": "Garrio",
  "short_name": "Garrio",
  "description": "AI-powered customer service platform for Shopify stores",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#9333ea",
  "icons": [
    {
      "src": "/brand/favicon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/brand/favicon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✅ Updated: manifest.json');

// Update favicon HTML snippet
const faviconHTML = `<!-- Garrio Favicon -->
<link rel="icon" type="image/svg+xml" href="/brand/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/brand/favicon-16.png">
<link rel="icon" type="image/png" sizes="192x192" href="/brand/favicon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/brand/favicon-512.png">
<link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png">

<!-- For Android Chrome -->
<link rel="manifest" href="/brand/manifest.json">
<meta name="theme-color" content="#9333ea">`;

fs.writeFileSync(path.join(brandDir, 'favicon-html.txt'), faviconHTML);
console.log('✅ Updated: favicon-html.txt');

// Update README with PNG information
const readmeContent = fs.readFileSync(path.join(brandDir, 'README.md'), 'utf8');
const updatedReadme = readmeContent.replace(
  '## Color Palette',
  `### PNG Files (Raster - Fixed Size)

#### Icons (Square Format)
- \`garrio-icon-{variant}-64.png\` - 64x64 pixels
- \`garrio-icon-{variant}-128.png\` - 128x128 pixels
- \`garrio-icon-{variant}-256.png\` - 256x256 pixels
- \`garrio-icon-{variant}-512.png\` - 512x512 pixels

Where \`{variant}\` is \`light\`, \`dark\`, or \`transparent\`

#### Full Logos (With Text)
- \`garrio-logo-{variant}-96h.png\` - 96px height
- \`garrio-logo-{variant}-192h.png\` - 192px height
- \`garrio-logo-{variant}-384h.png\` - 384px height

#### Social Media
- \`garrio-social-square-1024.png\` - 1024x1024 (Instagram, Twitter profile)
- \`garrio-social-og-1200x630.png\` - 1200x630 (Facebook, LinkedIn)
- \`garrio-social-twitter-1200x675.png\` - 1200x675 (Twitter posts)

#### App Store Icons
- \`shopify-app-icon-1200.png\` - 1200x1200 (Shopify App Store - with padding)
- \`google-app-icon-120.png\` - 120x120 (Google OAuth consent screen)

### Favicon Files
- \`favicon.svg\` - SVG favicon (scalable)
- \`favicon-16.png\` - 16x16 pixels
- \`favicon-32.png\` - 32x32 pixels
- \`favicon-192.png\` - 192x192 pixels (Android)
- \`favicon-512.png\` - 512x512 pixels (Android)
- \`apple-touch-icon.png\` - 180x180 pixels (iOS)
- \`manifest.json\` - Web app manifest for Android
- \`favicon-html.txt\` - HTML snippet for favicon implementation

## React Components
- \`garrio-logo-react.tsx\` - React components for all logo variants

## Usage

### In HTML
\`\`\`html
<!-- SVG (Recommended - Scalable) -->
<img src="/brand/garrio-logo-light.svg" alt="Garrio" height="48">

<!-- PNG (Fixed Size) -->
<img src="/brand/garrio-logo-light-192h.png" alt="Garrio">
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

### Social Media
Use the pre-sized social media images for:
- Open Graph meta tags
- Twitter cards
- Social media profile pictures

### App Store Icons
- **Shopify**: Use \`shopify-app-icon-1200.png\` for your Shopify app listing (1200x1200 with padding)
- **Google**: Use \`google-app-icon-120.png\` or \`google-app-icon-120.jpg\` for OAuth consent screen

## Color Palette`
);

// Add file format guide
const fileFormatGuide = `

## File Formats

### When to use SVG
- Websites and applications
- Any size where scalability is important
- When file size needs to be minimal
- When you need to change colors via CSS

### When to use PNG
- Social media profiles and posts
- Email signatures
- Documents and presentations
- Legacy systems that don't support SVG`;

fs.writeFileSync(path.join(brandDir, 'README.md'), updatedReadme + fileFormatGuide);
console.log('✅ Updated: README.md');

console.log('\n✨ PNG generation complete!');
console.log(`📁 All files saved to: ${brandDir}`);