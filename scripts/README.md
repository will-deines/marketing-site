# Marketing Site Content Generation Pipeline

## 🏗️ Architecture Overview

This folder contains organized pipelines for generating and optimizing content for the marketing site.

```
scripts/
├── video/                    # Video generation pipeline (Veo 3)
│   ├── generate_veo3_video.sh
│   ├── download_veo3_video.sh
│   ├── encode_web_video_optimized.sh
│   ├── extract_poster.sh
│   ├── veo3_config.conf
│   └── documentation/
├── image/                    # Image generation pipeline (Imagen 3)
│   ├── generate_imagen_image.sh
│   ├── optimize_web_image.sh
│   ├── generate_and_optimize.sh
│   └── imagen_config.conf
└── shared/                   # Shared utilities (future)
```

## 🎬 Video Pipeline (Veo 3)

### Purpose
Generate AI videos with Google Veo 3 for homepage hero, about page, and other background videos.

### Key Scripts
- **`generate_veo3_video.sh`** - Generate video with Veo 3 API
- **`download_veo3_video.sh`** - Download and process complete pipeline
- **`encode_web_video_optimized.sh`** - Encode for web (AV1/H.265)
- **`extract_poster.sh`** - Extract responsive poster frames

### Usage
```bash
cd scripts/video

# Complete pipeline (generate, download, and process)
./generate_veo3_video.sh
./download_veo3_video.sh -o about-hero.mp4 -n about-hero --process
```

## 🖼️ Image Pipeline (Imagen 3)

### Purpose
Generate AI images with Google Imagen 3 for homepage sections, product showcases, and other static content.

### Key Scripts
- **`generate_imagen_image.sh`** - Generate image with Imagen 3 API
- **`optimize_web_image.sh`** - Optimize for web (JPEG/WebP/AVIF + responsive)
- **`generate_and_optimize.sh`** - Complete pipeline

### Usage
```bash
cd scripts/image

# Complete pipeline
./generate_and_optimize.sh -n indie-unboxing

# Custom config
./generate_and_optimize.sh -n product-showcase -c custom-config.conf
```

## 🔧 Configuration

### Video Configuration
Edit `video/veo3_config.conf` for video prompts:
```bash
PROMPT="Your video prompt here..."
ASPECT_RATIO="16:9"
PERSON_GENERATION="allow_all"
```

### Image Configuration  
Edit `image/imagen_config.conf` for image prompts:
```bash
PROMPT="Your image prompt here..."
ASPECT_RATIO="16:9" 
PERSON_GENERATION="allow_adult"
SAMPLE_COUNT=1
```

## 🚀 Quick Start

### Prerequisites
```bash
export GEMINI_API_KEY=your_api_key_here
```

### Generate Homepage Section Images
```bash
cd scripts/image

# Indie shop owner unboxing
./generate_and_optimize.sh -n indie-unboxing

# Product showcase
./generate_and_optimize.sh -n product-showcase  

# Customer support scene
./generate_and_optimize.sh -n support-scene
```

### Generate About Page Video
```bash
cd scripts/video
# Update veo3_config.conf with desired prompt
./generate_veo3_video.sh
./download_veo3_video.sh -o about-hero.mp4 -n about-hero --process
```

## 📁 Output Structure

### Generated Assets
```
public/
├── videos/                   # Video pipeline output
│   ├── homepage-hero.av1.webm
│   ├── homepage-hero.h265.mp4  
│   └── about-hero.av1.webm
└── images/                   # Image pipeline output
    ├── indie-unboxing.jpg
    ├── indie-unboxing.webp
    ├── indie-unboxing-tablet.jpg
    ├── indie-unboxing-mobile.jpg
    └── product-showcase.jpg
```

### Implementation Files
Each pipeline generates HTML implementation snippets for easy integration.

## 🎯 Best Practices

### Video Content
- Keep videos ≤8 seconds for optimal looping
- Use static camera positions for smooth backgrounds
- Specify exact camera positioning in prompts
- No fade effects for seamless loops

### Image Content  
- Use 16:9 aspect ratio for homepage sections
- Enable prompt enhancement for better results
- Generate multiple sizes for responsive design
- Use WebP/AVIF for modern browsers

## 🔗 Integration

### React Components
```tsx
// Video background
<HeroVideoBackground 
  videoSrc="/videos/about-hero"
  posterSrc="/images/about-hero.jpg"
/>

// Responsive image
<picture>
  <source media="(min-width: 1024px)" srcset="/images/indie-unboxing.webp" type="image/webp" />
  <source media="(min-width: 1024px)" srcset="/images/indie-unboxing.jpg" type="image/jpeg" />
  <img src="/images/indie-unboxing.jpg" alt="Indie shop owner unboxing" />
</picture>
```

## 🎨 Content Strategy

### Homepage Sections
Each homepage section gets its own AI-generated image:
- **Indie Unboxing**: Shop owner receiving packages
- **Product Showcase**: Modern e-commerce interface  
- **Support Scene**: Customer service interaction
- **Growth Metrics**: Business analytics visualization

### About Page
AI-generated family video showing founders getting their time back.

### Pricing Page  
Product demonstration videos and pricing comparison graphics.

This architecture enables scalable, high-quality content generation for the entire marketing site! 🚀