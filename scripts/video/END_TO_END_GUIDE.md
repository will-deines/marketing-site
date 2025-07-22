# End-to-End Veo 3 Video Generation Guide

## 🎯 Complete Workflow: From AI Prompt to Live Website

This guide covers the entire process of generating AI videos with Google Veo 3 and deploying them as optimized web assets on your marketing site.

---

## 📋 Prerequisites

### **1. System Requirements**

```bash
# Ubuntu 22.04+ (recommended) or macOS
sudo apt update && sudo apt install -y ffmpeg gpac jq

# Verify SVT-AV1 support (5-10x faster encoding)
ffmpeg -codecs | grep libsvtav1

# Optional: WebP support for poster optimization
sudo apt install -y webp
```

### **2. API Access**

- **Gemini API Key** with Veo 3 access
- **AI Ultra Plan** ($250/month, 12,500 credits)
- Each video generation = 150 credits (~83 videos/month)

### **3. Project Setup**

```bash
cd /your-project/scripts
chmod +x *.sh  # Make all scripts executable
```

---

## 🎬 Step-by-Step Workflow

### **Step 1: Configure Your Video Prompt**

Edit `veo3_config.conf` with your creative vision:

```bash
# Example: Coffee shop owner (homepage hero)
PROMPT="A friendly coffee shop owner, woman in her 30s with warm smile wearing casual apron, camera positioned at eye level 8 feet away (that's where the camera is) in modern coffee shop with clean minimalist aesthetic, owner centered in frame looking directly at camera while helping customer with warm welcoming expression, coffee bags displayed on wooden shelves in background, barista working espresso machine to her left in soft focus, warm natural lighting from large windows with golden hour ambiance, gentle coffee shop sounds with espresso machine steaming and quiet conversation, shallow depth of field with beautifully blurred background. Professional lifestyle cinematography. No text overlay."

ASPECT_RATIO="16:9"
NEGATIVE_PROMPT="low quality, blurry, distorted"
PERSON_GENERATION="allow_all"
```

#### **🎯 Prompt Best Practices**

- **Always specify camera position**: "camera positioned at [position] (that's where the camera is)"
- **Keep ≤8 seconds**: Optimal for web performance and seamless loops
- **Loop-friendly**: End in similar position to start
- **Web-optimized**: Simple composition, even lighting, minimal background complexity
- **No text**: Always end with "No text overlay" for clean implementation

---

### **Step 2: Generate Your Video**

```bash
export GEMINI_API_KEY=your_api_key_here
./generate_veo3_video.sh
```

**What happens:**

- ✅ Validates API key and config
- ✅ Sends generation request to Veo 3
- ✅ Returns Operation ID
- ✅ Saves Operation ID to `veo3_operation.txt`
- ⏱️ Generation takes 2-5 minutes

**Output:**

```
Video generation started successfully!
Operation ID: operations/abc123def456
Typical generation time: 2-5 minutes
```

---

### **Step 3: Download & Process Automatically**

#### **Option A: Full Automation (Recommended)**

```bash
./download_veo3_video.sh --process -n homepage-hero -o homepage-hero.mp4
```

#### **Option B: Manual Control**

```bash
# Download only
./download_veo3_video.sh -o homepage-hero.mp4

# Then process manually
./encode_web_video_optimized.sh homepage-hero.mp4 -o ../public/videos
./extract_poster.sh homepage-hero.mp4 -o ../public/images --webp
```

**What the automation does:**

- 🔄 **Polls status** every 30 seconds (max 10 minutes)
- ⬇️ **Downloads video** when generation completes
- 🎞️ **Encodes web formats**: AV1/WebM + H.265/MP4 + H.264 fallback
- 🖼️ **Extracts posters**: Multiple sizes + AVIF/WebP/JPEG formats
- 📁 **Organizes files** in correct directories

---

### **Step 4: Verify Output Files**

After processing, check your generated assets:

```bash
# Video files (web-optimized)
ls -lh ../public/videos/
# hero.av1.webm      (~1.5-2MB, modern browsers)
# hero.h265.mp4      (~1.5-2MB, Safari + mobile)
# hero.jpg           (poster frame)

# Poster images (multiple sizes and formats)
ls -lh ../public/images/homepage-hero*
# homepage-hero.jpg           (1920x1080, desktop JPEG)
# homepage-hero.webp          (1920x1080, desktop WebP)
# homepage-hero.avif          (1920x1080, desktop AVIF)
# homepage-hero-tablet.jpg    (1024x576, tablet JPEG)
# homepage-hero-tablet.webp   (1024x576, tablet WebP)
# homepage-hero-tablet.avif   (1024x576, tablet AVIF)
# homepage-hero-mobile.jpg    (720x405, mobile JPEG)
# homepage-hero-mobile.webp   (720x405, mobile WebP)
# homepage-hero-mobile.avif   (720x405, mobile AVIF)
```

**Quality checks:**

```bash
# Test loop seamlessness
ffplay -loop 0 ../public/videos/hero.av1.webm

# Verify file sizes (should be ≤2MB)
du -h ../public/videos/hero.*

# Check bitrates (should be ≤1.5Mbps for 3G)
ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate ../public/videos/hero.av1.webm
```

---

### **Step 5: Implement on Your Website**

#### **Using the HeroVideoBackground Component**

```tsx
import HeroVideoBackground from "@/components/hero-video-background";

export default function HomePage() {
  return (
    <HeroVideoBackground
      videoSrc="/videos/hero" // Will auto-load .av1.webm, .h265.mp4, .mp4
      posterSrc="/images/hero.jpg"
      blur="md"
      scale="110"
      overlay="black"
      overlayOpacity="40"
      height="screen"
      reducedMotionFallback="/images/hero.jpg"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-white">
          Your Hero Content Here
        </h1>
        <button className="mt-8 px-6 py-3 bg-white text-black rounded">
          Get Started
        </button>
      </div>
    </HeroVideoBackground>
  );
}
```

#### **Manual HTML Implementation**

```html
<video autoplay muted loop playsinline preload="none" poster="/images/hero.jpg">
  <source src="/videos/hero.av1.webm" type="video/webm" />
  <source src="/videos/hero.h265.mp4" type="video/mp4" />
  <source src="/videos/hero.mp4" type="video/mp4" />
</video>
```

---

## 🚀 Advanced Workflows

### **Batch Video Generation**

```bash
# Generate multiple videos for different pages
./generate_veo3_video.sh  # Homepage
# Update config for pricing page
./generate_veo3_video.sh  # Pricing
# Update config for about page
./generate_veo3_video.sh  # About
```

### **Custom Processing Options**

```bash
# Higher quality (larger files)
./encode_web_video_optimized.sh video.mp4 --av1-crf 34 --h265-crf 23

# Faster encoding (lower quality)
./encode_web_video_optimized.sh video.mp4 --av1-crf 42 --h265-crf 29

# Custom duration limit
./encode_web_video_optimized.sh video.mp4 --max-duration 6
```

### **Different Pages, Different Styles**

```tsx
// Home: Blurred background video
<HeroVideoBackground videoSrc="/videos/hero" blur="md" scale="110" />

// About: Clean video with purple overlay
<HeroVideoBackground videoSrc="/videos/about" overlay="purple-gradient" />

// Features: Auto-restart every 8 seconds
<HeroVideoBackground videoSrc="/videos/features" restartInterval={8} />
```

---

## 🛠️ Troubleshooting

### **Common Issues & Solutions**

#### **Generation Fails**

```bash
# Check API key
echo $GEMINI_API_KEY

# Check credits remaining
curl -H "x-goog-api-key: $GEMINI_API_KEY" \
     "https://generativelanguage.googleapis.com/v1beta/files"

# Simplify prompt if too complex
```

#### **Download Timeout**

```bash
# Check operation manually
OPERATION_ID=$(cat veo3_operation.txt)
curl -H "x-goog-api-key: $GEMINI_API_KEY" \
     "https://generativelanguage.googleapis.com/v1beta/$OPERATION_ID"

# Download with longer timeout
./download_veo3_video.sh --timeout 900  # 15 minutes
```

#### **Encoding Issues**

```bash
# Check codec support
ffmpeg -codecs | grep -E "(libsvtav1|libx265)"

# Use fallback encoder
./encode_web_video.sh video.mp4  # Uses older codecs

# Check video file integrity
ffprobe video.mp4
```

#### **Large File Sizes**

```bash
# Increase CRF values (lower quality, smaller size)
./encode_web_video_optimized.sh video.mp4 --av1-crf 42 --h265-crf 30

# Reduce duration
./encode_web_video_optimized.sh video.mp4 --max-duration 6

# Check if video is already compressed
ffprobe -v error -show_entries format=bit_rate video.mp4
```

#### **Poor Loop Quality**

- Adjust Veo 3 prompt: Add "smooth continuous motion that loops seamlessly"
- Manual editing: Trim exact frames where loop point jumps
- Fade adjustment: Modify fade times in encoding script

### **Performance Optimization**

#### **Core Web Vitals Checklist**

- ✅ Video files ≤2MB (LCP ≤2.5s)
- ✅ Poster images load first (fast FCP)
- ✅ `preload="none"` (avoid bandwidth blocking)
- ✅ `prefers-reduced-motion` support
- ✅ Intersection observer (battery saving)

#### **CDN Deployment**

```bash
# Upload to CDN with proper headers
aws s3 sync public/videos s3://your-bucket/videos \
  --cache-control "public, max-age=31536000"

aws s3 sync public/images s3://your-bucket/images \
  --cache-control "public, max-age=31536000"
```

---

## 📊 Cost Management

### **Credit Usage Optimization**

- **Plan carefully**: Each generation = 150 credits
- **Use Veo 3 Fast** for testing prompts (lower cost)
- **Batch similar videos**: Generate variations in single session
- **Reuse assets**: One video can work for multiple pages with different overlays

### **Monthly Planning** (AI Ultra: 12,500 credits)

- ~83 video generations possible
- Save credits by perfecting prompts before generation
- Use manual download/processing to avoid re-generation

---

## 🎯 Page-Specific Examples

### **Homepage Hero**

```bash
# Config
PROMPT="Friendly coffee shop owner, professional lifestyle cinematography..."

# Generate & Process
./generate_veo3_video.sh
./download_veo3_video.sh --process -o homepage-hero.mp4

# Implement
<HeroVideoBackground videoSrc="/videos/homepage-hero" blur="md" scale="110" overlay="black" />
```

### **Pricing Page**

```bash
# Config
PROMPT="Modern office environment with professional working at desk, clean aesthetic..."

# Result
<HeroVideoBackground videoSrc="/videos/pricing-hero" blur="lg" scale="150" overlay="black" overlayOpacity="60" />
```

### **About Page**

```bash
# Config
PROMPT="Founder in modern office, warm lighting, authentic business environment..."

# Result
<HeroVideoBackground videoSrc="/videos/about-hero" overlay="purple-gradient" />
```

---

## ✅ Success Checklist

### **Pre-Generation**

- [ ] API key configured and tested
- [ ] Prompt follows Veo 3 best practices
- [ ] Creative vision matches brand/page purpose
- [ ] Duration optimized for web (≤8 seconds)

### **Post-Generation**

- [ ] Video downloaded successfully
- [ ] Web formats encoded (AV1 + H.265 + H.264)
- [ ] Poster frames extracted (multiple sizes)
- [ ] File sizes meet targets (≤2MB desktop)
- [ ] Loop quality tested with `ffplay`

### **Implementation**

- [ ] Files uploaded to correct directories
- [ ] Component implemented with proper props
- [ ] Accessibility features enabled
- [ ] Performance tested across devices
- [ ] Core Web Vitals within targets

### **Deployment**

- [ ] CDN configured with cache headers
- [ ] Browser testing completed
- [ ] Mobile performance verified
- [ ] Analytics/monitoring enabled

---

## 🎬 You're Ready

This complete workflow takes you from creative concept to live website in under 30 minutes:

1. **2 minutes**: Configure prompt
2. **5 minutes**: Generate video
3. **3 minutes**: Download & process
4. **5 minutes**: Implement on site
5. **15 minutes**: Test & deploy

**Your marketing site now has professional, AI-generated hero videos that load fast, loop seamlessly, and convert visitors!** 🚀

