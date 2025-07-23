#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const brandDir = path.join(__dirname, '../public/brand');
const publicDir = path.join(__dirname, '../public');
const tempDir = path.join(__dirname, '../temp-press-kit');

console.log('📦 Creating press kit...\n');

// Create temp directory
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// Create directory structure
const dirs = ['logos', 'icons', 'social-media', 'app-icons', 'guidelines'];
dirs.forEach(dir => {
  fs.mkdirSync(path.join(tempDir, dir), { recursive: true });
});

// Copy logo files
const logoFiles = [
  'garrio-logo-light.svg',
  'garrio-logo-dark.svg',
  'garrio-logo-transparent.svg',
  'garrio-logo-light-192h.png',
  'garrio-logo-dark-192h.png',
  'garrio-logo-transparent-192h.png',
];

logoFiles.forEach(file => {
  const src = path.join(brandDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(tempDir, 'logos', file));
    console.log(`✅ Copied: logos/${file}`);
  }
});

// Copy icon files
const iconFiles = [
  'garrio-icon-light.svg',
  'garrio-icon-dark.svg',
  'garrio-icon-transparent.svg',
  'garrio-icon-light-512.png',
  'garrio-icon-dark-512.png',
  'garrio-icon-transparent-512.png',
];

iconFiles.forEach(file => {
  const src = path.join(brandDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(tempDir, 'icons', file));
    console.log(`✅ Copied: icons/${file}`);
  }
});

// Copy social media files
const socialFiles = [
  'garrio-social-square-1024.png',
  'garrio-social-og-1200x630.png',
  'garrio-social-twitter-1200x675.png',
];

socialFiles.forEach(file => {
  const src = path.join(brandDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(tempDir, 'social-media', file));
    console.log(`✅ Copied: social-media/${file}`);
  }
});

// Copy app icon files
const appFiles = [
  'shopify-app-icon-1200.png',
  'google-app-icon-120.png',
  'google-app-icon-120.jpg',
];

appFiles.forEach(file => {
  const src = path.join(brandDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(tempDir, 'app-icons', file));
    console.log(`✅ Copied: app-icons/${file}`);
  }
});

// Copy guidelines
const guidelineFiles = ['README.md'];
guidelineFiles.forEach(file => {
  const src = path.join(brandDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(tempDir, 'guidelines', 'brand-guidelines.md'));
    console.log(`✅ Copied: guidelines/brand-guidelines.md`);
  }
});

// Create press kit info file
const pressKitInfo = `# Garrio Press Kit

Thank you for your interest in Garrio! This press kit contains all the assets you need to write about or feature our brand.

## Contents

### Logos
- Full logos in SVG and PNG formats
- Light, dark, and transparent variants
- Various sizes for different use cases

### Icons
- Square icon versions of our logo
- Perfect for app stores, social media profiles, and favicons
- Available in multiple sizes and formats

### Social Media
- Pre-sized images for major social platforms
- Open Graph images for link previews
- Twitter card images

### App Icons
- Shopify App Store icon (1200x1200)
- Google OAuth consent screen icon (120x120)

### Brand Guidelines
- Complete brand guidelines document
- Color palette information
- Logo usage guidelines

## Company Information

**Company Name:** Garrio
**Website:** https://garrio.ai
**Description:** AI-powered customer service platform for Shopify stores
**Founded:** 2024

## Press Contact

For press inquiries, please contact: press@garrio.ai

## Usage Rights

All assets in this press kit are provided for editorial use. Please refer to the brand guidelines for proper usage.

---

© 2024 Garrio. All rights reserved.
`;

fs.writeFileSync(path.join(tempDir, 'README.txt'), pressKitInfo);
console.log('✅ Created: README.txt');

// Create the zip file
console.log('\n📦 Creating ZIP file...');
try {
  execSync(`cd "${tempDir}" && zip -r "${path.join(publicDir, 'press-kit.zip')}" .`);
  console.log('✅ Created: press-kit.zip');
} catch (error) {
  console.error('❌ Failed to create ZIP file. Make sure zip is installed.');
  console.error('   Ubuntu/Debian: sudo apt-get install zip');
  console.error('   macOS: zip should be pre-installed');
}

// Clean up temp directory
fs.rmSync(tempDir, { recursive: true });
console.log('\n✨ Press kit creation complete!');
console.log(`📍 Location: ${path.join(publicDir, 'press-kit.zip')}`);