#!/bin/bash

# Complete Veo 3 Video Processing Workflow
# Handles the entire pipeline from raw Veo 3 output to web-ready assets
# Combines generation, encoding, and poster extraction

set -e

# Configuration
INPUT_VIDEO=""
OUTPUT_DIR="./web-assets"
PROJECT_NAME="hero"
SKIP_GENERATION=false
SKIP_ENCODING=false
SKIP_POSTER=false
CREATE_WEBP=true

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_header() {
  echo -e "${PURPLE}========================================${NC}"
  echo -e "${PURPLE}$1${NC}"
  echo -e "${PURPLE}========================================${NC}"
}

print_status() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
check_dependency() {
  if ! command -v "$1" &>/dev/null; then
    print_error "$1 is required but not installed."
    echo "Installation instructions:"
    case "$1" in
    "ffmpeg")
      echo "  macOS: brew install ffmpeg"
      echo "  Ubuntu: sudo apt update && sudo apt install ffmpeg"
      echo "  Windows: Download from https://ffmpeg.org/"
      ;;
    "cwebp")
      echo "  macOS: brew install webp"
      echo "  Ubuntu: sudo apt install webp"
      echo "  Windows: Download from https://developers.google.com/speed/webp/download"
      ;;
    esac
    return 1
  fi
}

# Function to validate video file
validate_video() {
  local file="$1"

  if [ ! -f "$file" ]; then
    print_error "Video file not found: $file"
    return 1
  fi

  # Check if it's a valid video file
  if ! ffprobe -v quiet "$file" 2>/dev/null; then
    print_error "Invalid video file: $file"
    return 1
  fi

  # Get video info
  local duration=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$file")
  local width=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=width -of csv=p=0 "$file")
  local height=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=height -of csv=p=0 "$file")

  print_status "Video validated: ${width}x${height}, ${duration}s duration"

  # Check duration for web optimization
  if (($(echo "$duration > 10" | bc -l))); then
    print_warning "Video is longer than 10s - consider trimming for web use"
  fi
}

# Function to show usage
show_usage() {
  echo "Usage: $0 [OPTIONS] [input_video.mp4]"
  echo ""
  echo "Complete workflow for processing Veo 3 videos for web deployment"
  echo ""
  echo "Options:"
  echo "  -o, --output DIR     Output directory (default: ./web-assets)"
  echo "  -n, --name NAME      Project name for files (default: hero)"
  echo "  --skip-generation    Skip Veo 3 generation step"
  echo "  --skip-encoding      Skip video encoding step"
  echo "  --skip-poster        Skip poster extraction step"
  echo "  --no-webp           Don't create WebP poster versions"
  echo "  -h, --help          Show this help message"
  echo ""
  echo "Workflow modes:"
  echo "  1. Full workflow:    $0 (generates video from config)"
  echo "  2. Process existing: $0 --skip-generation my_video.mp4"
  echo "  3. Just encoding:    $0 --skip-generation --skip-poster my_video.mp4"
  echo ""
  echo "Output structure:"
  echo "  web-assets/"
  echo "  ├── videos/"
  echo "  │   ├── hero.av1.webm"
  echo "  │   ├── hero.h265.mp4"
  echo "  │   ├── hero-mobile.av1.webm"
  echo "  │   └── hero-mobile.h265.mp4"
  echo "  ├── images/"
  echo "  │   ├── hero.jpg"
  echo "  │   ├── hero.webp"
  echo "  │   └── hero-mobile.jpg"
  echo "  └── implementation.html"
}

# Function to generate video with Veo 3
generate_veo3_video() {
  print_header "STEP 1: GENERATING VIDEO WITH VEO 3"

  if [ -z "$GEMINI_API_KEY" ]; then
    print_error "GEMINI_API_KEY environment variable is required for video generation"
    echo "Set it with: export GEMINI_API_KEY=your_api_key"
    return 1
  fi

  if [ ! -f "./generate_veo3_video.sh" ]; then
    print_error "generate_veo3_video.sh script not found in current directory"
    return 1
  fi

  print_status "Starting Veo 3 video generation..."
  ./generate_veo3_video.sh

  # Wait for user to download the generated video
  print_warning "Please download your generated video and place it in the current directory"
  read -p "Enter the path to your downloaded Veo 3 video: " generated_video

  if [ ! -f "$generated_video" ]; then
    print_error "Video file not found: $generated_video"
    return 1
  fi

  INPUT_VIDEO="$generated_video"
  print_success "Video generation complete: $INPUT_VIDEO"
}

# Function to encode videos
encode_videos() {
  print_header "STEP 2: ENCODING VIDEOS FOR WEB"

  local video_output="$OUTPUT_DIR/videos"
  mkdir -p "$video_output"

  if [ ! -f "./encode_web_video.sh" ]; then
    print_error "encode_web_video.sh script not found in current directory"
    return 1
  fi

  print_status "Encoding videos for web deployment..."
  ./encode_web_video.sh -o "$video_output" "$INPUT_VIDEO"

  # Rename files to use project name
  if [ "$PROJECT_NAME" != "hero" ]; then
    cd "$video_output"
    for file in hero.*; do
      if [ -f "$file" ]; then
        mv "$file" "${file/hero/$PROJECT_NAME}"
      fi
    done
    cd - >/dev/null
  fi

  print_success "Video encoding complete"
}

# Function to extract poster frames
extract_posters() {
  print_header "STEP 3: EXTRACTING POSTER FRAMES"

  local image_output="$OUTPUT_DIR/images"
  mkdir -p "$image_output"

  if [ ! -f "./extract_poster.sh" ]; then
    print_error "extract_poster.sh script not found in current directory"
    return 1
  fi

  print_status "Extracting poster frames..."

  local webp_flag=""
  if [ "$CREATE_WEBP" = true ]; then
    webp_flag="--webp"
  fi

  ./extract_poster.sh -o "$image_output" $webp_flag "$INPUT_VIDEO"

  # Rename files to use project name
  if [ "$PROJECT_NAME" != "hero" ]; then
    cd "$image_output"
    for file in hero.*; do
      if [ -f "$file" ]; then
        mv "$file" "${file/hero/$PROJECT_NAME}"
      fi
    done
    cd - >/dev/null
  fi

  print_success "Poster extraction complete"
}

# Function to generate final implementation files
generate_implementation() {
  print_header "STEP 4: GENERATING IMPLEMENTATION FILES"

  local impl_file="$OUTPUT_DIR/implementation.html"
  local readme_file="$OUTPUT_DIR/README.md"

  # Generate complete HTML implementation
  cat >"$impl_file" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veo 3 Hero Video Implementation</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .hero-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
        
        .hero-video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
        }
        
        .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1));
            z-index: 1;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: white;
            text-align: center;
            padding: 2rem;
        }
        
        .hero-title {
            font-size: clamp(2rem, 5vw, 4rem);
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .hero-subtitle {
            font-size: clamp(1rem, 2.5vw, 1.5rem);
            margin-bottom: 2rem;
            opacity: 0.9;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        
        .hero-cta {
            padding: 1rem 2rem;
            background: rgba(255,255,255,0.9);
            color: #333;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .hero-cta:hover {
            background: rgba(255,255,255,1);
            transform: translateY(-2px);
        }
        
        /* Accessibility: Respect motion preferences */
        @media (prefers-reduced-motion: reduce) {
            .hero-video {
                display: none;
            }
            .hero-container {
                background-image: url('images/${PROJECT_NAME}.jpg');
                background-size: cover;
                background-position: center;
            }
        }
        
        /* Responsive video sources */
        @media (max-width: 768px) {
            .hero-video source[data-size="desktop"] {
                display: none;
            }
        }
        
        @media (min-width: 769px) {
            .hero-video source[data-size="mobile"] {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="hero-container">
        <video class="hero-video" autoplay muted loop playsinline preload="none" 
               poster="images/${PROJECT_NAME}.jpg">
            <!-- Desktop versions (shown on larger screens) -->
            <source src="videos/${PROJECT_NAME}.av1.webm" 
                    type="video/webm; codecs=av01.0.05M.08" 
                    data-size="desktop">
            <source src="videos/${PROJECT_NAME}.h265.mp4" 
                    type="video/mp4; codecs=hvc1.1.6.L93.90" 
                    data-size="desktop">
            
            <!-- Mobile versions (shown on smaller screens) -->
            <source src="videos/${PROJECT_NAME}-mobile.av1.webm" 
                    type="video/webm; codecs=av01.0.05M.08" 
                    data-size="mobile">
            <source src="videos/${PROJECT_NAME}-mobile.h265.mp4" 
                    type="video/mp4; codecs=hvc1.1.6.L93.90" 
                    data-size="mobile">
            
            <!-- H.264 fallback for older browsers -->
            <source src="videos/${PROJECT_NAME}.h264.mp4" 
                    type="video/mp4; codecs=avc1.42E01E">
        </video>
        
        <div class="hero-overlay"></div>
        
        <div class="hero-content">
            <h1 class="hero-title">Your Hero Title</h1>
            <p class="hero-subtitle">Your compelling subtitle goes here</p>
            <a href="#" class="hero-cta">Get Started</a>
        </div>
    </div>

    <script>
        // Intersection Observer for battery optimization
        const video = document.querySelector('.hero-video');
        
        if (video) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(e => console.log('Video play failed:', e));
                    } else {
                        video.pause();
                    }
                });
            });
            
            observer.observe(video);
            
            // Handle video loading errors gracefully
            video.addEventListener('error', (e) => {
                console.log('Video error:', e);
                video.style.display = 'none';
            });
        }
    </script>
</body>
</html>
EOF

  # Generate README with implementation instructions
  cat >"$readme_file" <<EOF
# Veo 3 Video Implementation

Generated on: $(date)
Project: $PROJECT_NAME

## Files Generated

### Videos
- \`videos/${PROJECT_NAME}.av1.webm\` - Desktop AV1 (modern browsers)
- \`videos/${PROJECT_NAME}.h265.mp4\` - Desktop H.265 (Safari, mobile)
- \`videos/${PROJECT_NAME}-mobile.av1.webm\` - Mobile AV1 optimized
- \`videos/${PROJECT_NAME}-mobile.h265.mp4\` - Mobile H.265 optimized
- \`videos/${PROJECT_NAME}.h264.mp4\` - H.264 fallback

### Images
- \`images/${PROJECT_NAME}.jpg\` - Desktop poster frame
- \`images/${PROJECT_NAME}-tablet.jpg\` - Tablet poster frame
- \`images/${PROJECT_NAME}-mobile.jpg\` - Mobile poster frame
$(if [ "$CREATE_WEBP" = true ]; then echo "- \`images/${PROJECT_NAME}.webp\` - WebP versions for modern browsers"; fi)

### Implementation
- \`implementation.html\` - Complete working example
- \`README.md\` - This file

## Deployment Checklist

### 1. File Size Verification
- [ ] Desktop videos under 2MB
- [ ] Mobile videos under 800KB
- [ ] Poster images optimized

### 2. Performance Testing
- [ ] Lazy loading working
- [ ] Video pauses when off-screen
- [ ] Preload attributes set correctly

### 3. Accessibility
- [ ] \`prefers-reduced-motion\` respected
- [ ] Poster images load for motion-sensitive users
- [ ] Contrast meets WCAG AA standards

### 4. Browser Testing
- [ ] Autoplay works (muted + playsinline)
- [ ] Loop seamless across browsers
- [ ] Fallback H.264 works in older browsers

### 5. CDN Deployment
- [ ] Files uploaded to CDN
- [ ] Cache headers set: \`cache-control: public, max-age=31536000\`
- [ ] CORS headers configured if needed

## Usage in Your Project

### Basic HTML
\`\`\`html
<video autoplay muted loop playsinline preload="none" poster="images/${PROJECT_NAME}.jpg">
    <source src="videos/${PROJECT_NAME}.av1.webm" type="video/webm">
    <source src="videos/${PROJECT_NAME}.h265.mp4" type="video/mp4">
</video>
\`\`\`

### React/Next.js Component
\`\`\`jsx
export function HeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/images/${PROJECT_NAME}.jpg"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/videos/${PROJECT_NAME}.av1.webm" type="video/webm" />
      <source src="/videos/${PROJECT_NAME}.h265.mp4" type="video/mp4" />
    </video>
  );
}
\`\`\`

### CSS for Full-Screen Hero
\`\`\`css
.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

@media (prefers-reduced-motion: reduce) {
  .hero-video { display: none; }
}
\`\`\`

## Performance Tips

1. **Serve from CDN** with proper cache headers
2. **Use \`loading="lazy"\`** for below-fold videos
3. **Test on 3G** to ensure acceptable load times
4. **Monitor LCP** - should be under 2.5s
5. **Consider lazy loading** with Intersection Observer

## Troubleshooting

### Video Not Playing
- Check \`muted\` attribute is present
- Verify \`playsinline\` for iOS
- Test file accessibility and CORS

### Large File Sizes
- Re-encode with higher CRF value (28-32)
- Reduce resolution if quality allows
- Consider shorter duration (5-8s optimal)

### Poor Loop Quality
- Ensure first and last frames match
- Check for motion blur at loop point
- Consider adding fade transition

Generated by Veo 3 processing workflow
EOF

  print_success "Implementation files generated:"
  print_status "- HTML demo: $impl_file"
  print_status "- Documentation: $readme_file"
}

# Main execution starts here
print_header "VEO 3 VIDEO PROCESSING WORKFLOW"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
  -o | --output)
    OUTPUT_DIR="$2"
    shift 2
    ;;
  -n | --name)
    PROJECT_NAME="$2"
    shift 2
    ;;
  --skip-generation)
    SKIP_GENERATION=true
    shift
    ;;
  --skip-encoding)
    SKIP_ENCODING=true
    shift
    ;;
  --skip-poster)
    SKIP_POSTER=true
    shift
    ;;
  --no-webp)
    CREATE_WEBP=false
    shift
    ;;
  -h | --help)
    show_usage
    exit 0
    ;;
  -*)
    print_error "Unknown option: $1"
    show_usage
    exit 1
    ;;
  *)
    INPUT_VIDEO="$1"
    SKIP_GENERATION=true
    shift
    ;;
  esac
done

# Check dependencies
print_status "Checking system dependencies..."
DEPS_OK=true

check_dependency "ffmpeg" || DEPS_OK=false
check_dependency "ffprobe" || DEPS_OK=false

if [ "$CREATE_WEBP" = true ]; then
  check_dependency "cwebp" || print_warning "WebP creation will be skipped"
fi

if [ "$DEPS_OK" = false ]; then
  print_error "Missing required dependencies. Please install them and try again."
  exit 1
fi

# Create main output directory
mkdir -p "$OUTPUT_DIR"
print_success "Using output directory: $OUTPUT_DIR"

# Execute workflow steps
if [ "$SKIP_GENERATION" = false ]; then
  generate_veo3_video || exit 1
fi

# Validate input video
if [ -n "$INPUT_VIDEO" ]; then
  validate_video "$INPUT_VIDEO" || exit 1
fi

if [ "$SKIP_ENCODING" = false ]; then
  encode_videos || exit 1
fi

if [ "$SKIP_POSTER" = false ]; then
  extract_posters || exit 1
fi

generate_implementation

# Final summary
print_header "WORKFLOW COMPLETE!"
print_success "All assets generated successfully in: $OUTPUT_DIR"
print_status "Next steps:"
echo "1. Review files in $OUTPUT_DIR"
echo "2. Test implementation.html in browser"
echo "3. Deploy to your CDN/hosting platform"
echo "4. Update your application with the new video assets"
echo ""
print_status "File structure:"
tree "$OUTPUT_DIR" 2>/dev/null || find "$OUTPUT_DIR" -type f | sort

