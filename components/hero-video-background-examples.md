# HeroVideoBackground Component Usage Examples

## Overview

The `HeroVideoBackground` component provides a reusable, flexible solution for hero sections with video backgrounds across all your marketing pages. It handles all the complexity while allowing each page to have unique content and styling.

## Component Features

### ✅ **Web Performance Optimized**

- **Multiple video formats**: Automatically serves AV1/WebM, H.265/MP4, and MP4 fallbacks
- **Poster frames**: Shows images while video loads
- **Battery optimization**: Pauses video when out of viewport
- **Reduced motion support**: Falls back to static images for accessibility

### ✅ **Flexible Visual Effects**

- **Blur**: `none`, `sm`, `md`, `lg`
- **Scale**: `none`, `110`, `120`, `150`
- **Brightness**: `none`, `50`, `75`, `90`
- **Overlays**: `black`, `purple-gradient`, `purple-solid`, `none`

### ✅ **Advanced Features**

- **Auto-restart**: Restart video every N seconds (like features page)
- **Intersection observer**: Battery optimization
- **Custom heights**: `screen`, `auto`, or custom CSS values

## Usage Examples by Page

### 1. Home Page (`/`)

```tsx
<HeroVideoBackground
  videoSrc="/background-video.mp4"
  blur="md"
  scale="110"
  overlay="black"
  overlayOpacity="40"
  height="screen"
  posterSrc="/background-video-poster.jpg"
  reducedMotionFallback="/background-video-poster.jpg"
>
  <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center space-y-8 text-center">
    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
      The only full stack Sales and Customer Experience platform for Shopify
      stores
    </h1>
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <Button
        variant="outline"
        size="lg"
        className="bg-white/10 text-white border-white hover:bg-white/20"
      >
        Learn More
      </Button>
      <Button size="lg" className="bg-white text-black hover:bg-white/90">
        Start Now
      </Button>
    </div>
  </div>
</HeroVideoBackground>
```

### 2. Pricing Page (`/pricing`)

```tsx
<HeroVideoBackground
  videoSrc="/background-video.mp4"
  blur="md"
  scale="150"
  overlay="black"
  overlayOpacity="50"
  height="screen"
  posterSrc="/background-video-poster.jpg"
>
  <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-8">
    {/* Glassmorphism card */}
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-white mb-4">Plans & Pricing</h1>
      <p className="text-white/90 text-xl">
        Start free and scale when you're ready. Garrio Chat offers flexible
        pricing plans for Shopify stores of all sizes.
      </p>
    </div>
  </div>
</HeroVideoBackground>
```

### 3. About Page (`/about`)

```tsx
<HeroVideoBackground
  videoSrc="/founder-closing-laptop.mp4"
  overlay="purple-gradient"
  height="screen"
  posterSrc="/founder-closing-laptop-poster.jpg"
>
  <div className="container mx-auto px-4 flex items-center justify-center h-full">
    <div className="text-center space-y-6 max-w-4xl">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
        About Garrio
      </h1>
      <p className="text-xl text-white/90 mb-8 leading-relaxed">
        Support That Works While You Grow
      </p>
      <Button size="lg" className="bg-white text-black hover:bg-white/90">
        Learn Our Story
      </Button>
    </div>
  </div>
</HeroVideoBackground>
```

### 4. Features Page (`/features`) - With Auto-Restart

```tsx
<HeroVideoBackground
  videoSrc="/features-demo.mp4"
  overlay="black"
  overlayOpacity="60"
  height="screen"
  restartInterval={8} // Restart every 8 seconds like current implementation
  posterSrc="/features-demo-poster.jpg"
>
  <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-8">
    <h1 className="text-5xl font-bold text-white mb-4">
      Features That Convert
    </h1>
    <p className="text-xl text-white/90 max-w-2xl">
      The only Shopify support app that handles customer service for you — from
      AI to human.
    </p>
  </div>
</HeroVideoBackground>
```

### 5. Alternative Pages (`/alternatives/[slug]`)

```tsx
<HeroVideoBackground
  videoSrc="/background-video.mp4"
  blur="sm"
  scale="120"
  overlay="purple-solid"
  overlayOpacity="60"
  height="screen"
>
  <div className="container mx-auto px-4 text-center space-y-6">
    <h1 className="text-4xl font-bold text-white">
      Better Than {competitorName}
    </h1>
    <p className="text-white/90 text-lg max-w-2xl mx-auto">
      See why Shopify stores are switching to Garrio for superior customer
      experience.
    </p>
  </div>
</HeroVideoBackground>
```

## Implementation Steps

### 1. **Generate Your Videos**

Use the optimized encoding script for each page:

```bash
# Generate web-optimized videos from your Veo 3 content
./encode_web_video_optimized.sh your-video.mp4 -o ./public/videos

# Extract poster frames
./extract_poster.sh your-video.mp4 -o ./public/images --webp
```

### 2. **Update Your Pages**

Replace existing video background sections with the component:

1. Import the component: `import HeroVideoBackground from "@/components/hero-video-background"`
2. Replace the entire video background section with the component
3. Move your content inside the component as `children`
4. Configure the visual effects to match your design

### 3. **File Structure**

```
public/
├── videos/
│   ├── background-video.av1.webm
│   ├── background-video.h265.mp4
│   ├── background-video.mp4
│   ├── founder-closing-laptop.av1.webm
│   └── founder-closing-laptop.h265.mp4
└── images/
    ├── background-video-poster.jpg
    ├── background-video-poster.webp
    └── founder-closing-laptop-poster.jpg
```

## Benefits of Using This Component

### ✅ **Consistency**

- All pages use the same optimized video loading patterns
- Consistent accessibility and performance features
- Standardized overlay and effect options

### ✅ **Performance**

- Automatic format selection (AV1 → H.265 → H.264)
- Battery optimization with intersection observer
- Proper poster frames for fast first paint

### ✅ **Maintainability**

- Single component to update for improvements
- Type-safe props prevent configuration errors
- Easy to test and debug video issues

### ✅ **Flexibility**

- Each page can have unique content and styling
- Configurable visual effects per page
- Custom heights and advanced features when needed

## Next Steps

1. **Generate video assets** using your Veo 3 scripts
2. **Update each page** to use the component (start with one page as a test)
3. **Add poster frames** for optimal loading performance
4. **Test across devices** and browsers
5. **Monitor Core Web Vitals** to ensure performance targets are met

This component gives you the best of both worlds: shared infrastructure with page-specific customization!

