# Video Generation Pipeline

Complete automation for generating AI videos with Google Veo 3 and deploying them as optimized web assets.

## 🚀 Quick Start

### Prerequisites

```bash
# Required dependencies
sudo apt install -y ffmpeg gpac jq imagemagick

# Verify codec support
ffmpeg -codecs | grep libsvtav1  # For AV1 encoding
ffmpeg -codecs | grep libx265    # For H.265 encoding

# Set API key
export GEMINI_API_KEY=your_api_key_here
```

### Complete Workflow (Recommended)

```bash
# 1. Configure your video prompt
vim veo3_config.conf

# 2. Generate video
./generate_veo3_video.sh

# 3. Download and process automatically
./download_veo3_video.sh -o [page-name].mp4 -n [page-name] --process
```

**Example for homepage:**

```bash
./download_veo3_video.sh -o homepage-hero.mp4 -n homepage-hero --process
```

This single command will:

- ✅ Download the generated video when ready
- ✅ Encode to web-optimized formats (AV1/WebM + H.265/MP4)
- ✅ Extract responsive poster frames (AVIF + WebP + JPEG)
- ✅ Place files in correct directories (`../public/videos/` and `../public/images/`)

---

## 📁 Script Overview

### Core Scripts

| Script                          | Purpose                    | Usage                                                 |
| ------------------------------- | -------------------------- | ----------------------------------------------------- |
| `generate_veo3_video.sh`        | Start AI video generation  | `./generate_veo3_video.sh`                            |
| `download_veo3_video.sh`        | Download and process video | `./download_veo3_video.sh -o [name].mp4 -n [name] --process` |
| `encode_web_video_optimized.sh` | Encode video for web       | `./encode_web_video_optimized.sh video.mp4 -n [name]` |
| `extract_poster.sh`             | Extract poster frames      | `./extract_poster.sh video.mp4 -n [name] --modern`    |

### Configuration Files

| File                 | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `veo3_config.conf`   | Video generation prompts and settings        |
| `veo3_operation.txt` | Stores current operation ID (auto-generated) |

---

## 🎬 Detailed Usage

### 1. Video Generation

```bash
# Edit your prompt in the config file
vim veo3_config.conf

# Generate video (takes 2-5 minutes)
./generate_veo3_video.sh
```

**Config file structure:**

```bash
PROMPT="Your detailed video prompt here..."
ASPECT_RATIO="16:9"
NEGATIVE_PROMPT="low quality, blurry, distorted"
PERSON_GENERATION="allow_all"
```

### 2. Download & Processing

#### Option A: Full Automation (Recommended)

```bash
./download_veo3_video.sh -o [page-name].mp4 -n [page-name] --process
```

#### Option B: Manual Steps

```bash
# Download only
./download_veo3_video.sh -o [page-name].mp4

# Then process manually
./encode_web_video_optimized.sh [page-name].mp4 -n [page-name] -o ../../public/videos
./extract_poster.sh [page-name].mp4 -n [page-name] -o ../../public/images --modern
```

### 3. Advanced Options

#### Video Encoding Options

```bash
# Higher quality (larger files)
./encode_web_video_optimized.sh video.mp4 --av1-crf 34 --h265-crf 23

# Faster encoding (lower quality)
./encode_web_video_optimized.sh video.mp4 --av1-crf 42 --h265-crf 29

# Custom duration limit
./encode_web_video_optimized.sh video.mp4 --max-duration 6
```

#### Poster Extraction Options

```bash
# WebP only
./extract_poster.sh video.mp4 --webp

# AVIF only
./extract_poster.sh video.mp4 --avif

# Both modern formats
./extract_poster.sh video.mp4 --modern

# Custom frame time
./extract_poster.sh video.mp4 -t 3s --modern

# Custom quality
./extract_poster.sh video.mp4 -q 90 --modern
```

---

## 📂 Output Structure

### Generated Files

After running the complete pipeline, you'll have:

```
public/
├── videos/
│   ├── [page-name].av1.webm      # Modern browsers (~1.5MB)
│   ├── [page-name].h265.mp4      # Safari + mobile (~1.5MB)
│   └── [page-name].jpg           # Video poster frame
└── images/
    ├── [page-name].jpg           # Desktop poster (1920x1080)
    ├── [page-name].webp          # Desktop WebP
    ├── [page-name].avif          # Desktop AVIF
    ├── [page-name]-tablet.jpg    # Tablet poster (1024x576)
    ├── [page-name]-tablet.webp   # Tablet WebP
    ├── [page-name]-tablet.avif   # Tablet AVIF
    ├── [page-name]-mobile.jpg    # Mobile poster (720x405)
    ├── [page-name]-mobile.webp   # Mobile WebP
    └── [page-name]-mobile.avif   # Mobile AVIF
```

### File Size Targets

- **Video files**: ≤2MB each for 3G compatibility
- **AVIF posters**: 35-45% smaller than JPEG
- **WebP posters**: 45-51% smaller than JPEG

---

## 🎯 Page-Specific Examples

### Homepage Hero

```bash
# Configure prompt for homepage
PROMPT="Friendly coffee shop owner, professional lifestyle cinematography..."

# Generate and process
./generate_veo3_video.sh
./download_veo3_video.sh -o homepage-hero.mp4 -n homepage-hero --process

# Result: homepage-hero.* files ready for deployment
```

### About Page Hero

```bash
# Configure prompt for about page
PROMPT="Founder in modern office, warm lighting, authentic business environment..."

# Generate and process
./generate_veo3_video.sh
./download_veo3_video.sh -o about-hero.mp4 -n about-hero --process

# Result: about-hero.* files ready for deployment
```

### Features Page Hero

```bash
# Configure prompt for features
PROMPT="Modern office environment with professional working at desk..."

# Generate and process
./generate_veo3_video.sh
./download_veo3_video.sh -o features-hero.mp4 -n features-hero --process

# Result: features-hero.* files ready for deployment
```

---

## 🔧 Component Integration

### Using Generated Videos

The files are automatically named to work with the `HeroVideoBackground` component:

```tsx
import HeroVideoBackground from "@/components/hero-video-background";

export default function Page() {
  return (
    <HeroVideoBackground
      videoSrc="/videos/homepage-hero" // Loads .av1.webm and .h265.mp4
      posterSrc="/images/homepage-hero.jpg" // Loads responsive AVIF/WebP/JPEG
      blur="md"
      scale="110"
      overlay="black"
      overlayOpacity="40"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-white">Your Content Here</h1>
      </div>
    </HeroVideoBackground>
  );
}
```

The component automatically:

- Loads appropriate video format based on browser support
- Uses responsive poster images (AVIF → WebP → JPEG fallback)
- Handles reduced motion preferences
- Provides accessibility features

---

## 🛠️ Troubleshooting

### Common Issues

#### Video Generation Fails

```bash
# Check API key
echo $GEMINI_API_KEY

# Check credits remaining
curl -H "x-goog-api-key: $GEMINI_API_KEY" \
     "https://generativelanguage.googleapis.com/v1beta/files"

# Simplify prompt if too complex
```

#### Download Timeout

```bash
# Check operation status manually
OPERATION_ID=$(cat veo3_operation.txt)
curl -H "x-goog-api-key: $GEMINI_API_KEY" \
     "https://generativelanguage.googleapis.com/v1beta/$OPERATION_ID"

# Download with longer timeout
./download_veo3_video.sh --timeout 900  # 15 minutes
```

#### Encoding Issues

```bash
# Check codec support
ffmpeg -codecs | grep -E "(libsvtav1|libx265)"

# Use fallback encoder if needed
./encode_web_video.sh video.mp4  # Uses older codecs

# Check video file integrity
ffprobe video.mp4
```

#### Large File Sizes

```bash
# Increase CRF values (lower quality, smaller size)
./encode_web_video_optimized.sh video.mp4 --av1-crf 42 --h265-crf 30

# Reduce duration
./encode_web_video_optimized.sh video.mp4 --max-duration 6

# Check if video is already compressed
ffprobe -v error -show_entries format=bit_rate video.mp4
```

### Performance Optimization

#### Core Web Vitals Checklist

- ✅ Video files ≤2MB (LCP ≤2.5s)
- ✅ Poster images load first (fast FCP)
- ✅ `preload="none"` (avoid bandwidth blocking)
- ✅ `prefers-reduced-motion` support
- ✅ Intersection observer (battery saving)

#### Testing Commands

```bash
# Test loop seamlessness
ffplay -loop 0 ../public/videos/homepage-hero.av1.webm

# Verify file sizes
du -h ../public/videos/homepage-hero.*

# Check bitrates (should be ≤1.5Mbps for 3G)
ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate \
        ../public/videos/homepage-hero.av1.webm
```

---

## 💰 Cost Management

### API Usage (AI Ultra Plan: $250/month, 12,500 credits)

- Each video generation = 150 credits
- ~83 video generations possible per month
- Plan prompts carefully to avoid re-generation
- Use manual download/processing to avoid duplicate generation

### Best Practices

1. **Test prompts** with shorter videos first
2. **Batch similar videos** in single sessions
3. **Reuse assets** across pages with different overlays
4. **Perfect prompts** before generation to avoid waste

---

## 📚 Additional Resources

- **Complete Guide**: `END_TO_END_GUIDE.md` - Detailed walkthrough
- **Prompt Guide**: `veo3-prompting-guide.md` - Best practices for prompts
- **Component Docs**: See `components/hero-video-background.tsx`

---

## 🔄 Complete Workflow: Updating Homepage Hero Video

### Step-by-Step Process

**1. Update Video Prompt**
```bash
cd scripts/video
vim veo3_config.conf
```
Edit the `PROMPT` variable with your new video description.

**2. Generate New Video**
```bash
./generate_veo3_video.sh
```
This creates an operation ID and saves it to `veo3_operation.txt`.

**3. Download and Process Complete Pipeline**
```bash
./download_veo3_video.sh -o homepage-hero.mp4 -n homepage-hero --process
```
This command:
- Downloads the generated video when ready
- Encodes to AV1/WebM + H.265/MP4 formats
- Extracts responsive poster frames (AVIF/WebP/JPEG)
- Places files in `../../public/videos/` and `../../public/images/`

**4. Verify Generated Files**
The pipeline creates these files:
```
public/videos/
├── homepage-hero.av1.webm    # Modern browsers
├── homepage-hero.h265.mp4    # Safari/mobile fallback
└── homepage-hero.jpg         # Video poster frame

public/images/
├── homepage-hero.jpg         # Desktop poster (1920x1080)
├── homepage-hero.webp        # Desktop WebP
├── homepage-hero.avif        # Desktop AVIF
├── homepage-hero-tablet.jpg  # Tablet poster (1024x576)
├── homepage-hero-tablet.webp # Tablet WebP
├── homepage-hero-tablet.avif # Tablet AVIF
├── homepage-hero-mobile.jpg  # Mobile poster (720x405)
├── homepage-hero-mobile.webp # Mobile WebP
└── homepage-hero-mobile.avif # Mobile AVIF
```

**5. Test the Update**
```bash
cd ../../
pnpm dev
```
Navigate to `http://localhost:3000` to see your new homepage hero video.

### Troubleshooting

**If generation fails:**
- Check API key: `echo $GEMINI_API_KEY`
- Verify operation status: `curl -H "x-goog-api-key: $GEMINI_API_KEY" "https://generativelanguage.googleapis.com/v1beta/$(cat veo3_operation.txt)"`

**If download times out:**
- Increase timeout: `./download_veo3_video.sh -o homepage-hero.mp4 -n homepage-hero --process --timeout 900`

**If files are too large:**
- Reduce quality: `./encode_web_video_optimized.sh homepage-hero.mp4 --av1-crf 42 --h265-crf 30 -n homepage-hero`

---

## ✅ Quick Reference

### Essential Commands

```bash
# Complete workflow
./generate_veo3_video.sh
./download_veo3_video.sh -o [page-name].mp4 -n [page-name] --process

# Check operation status
curl -H "x-goog-api-key: $GEMINI_API_KEY" \
     "https://generativelanguage.googleapis.com/v1beta/$(cat veo3_operation.txt)"

# Test video quality
ffplay -loop 0 ../public/videos/[page-name].av1.webm
```

### Naming Convention

Always use descriptive page names:

- `homepage-hero`
- `about-hero`
- `features-hero`
- `pricing-hero`
- `contact-hero`

This ensures organized file management and easy component integration.

