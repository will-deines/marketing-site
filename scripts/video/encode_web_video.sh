#!/bin/bash

# Video Encoding Script for Web Deployment
# Encodes raw Veo 3 output into web-optimized formats and sizes
# Requires: ffmpeg with AV1 and H.265 support

set -e

# Configuration
INPUT_VIDEO=""
OUTPUT_DIR="./encoded"
QUALITY_CRF=28 # Constant Rate Factor (lower = higher quality, larger file)
DESKTOP_WIDTH=1920
DESKTOP_HEIGHT=1080
MOBILE_WIDTH=720
MOBILE_HEIGHT=480

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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
    return 1
  fi
}

# Function to get video info
get_video_info() {
  local file="$1"
  print_status "Analyzing input video: $file"

  # Get duration, resolution, and format info
  ffprobe -v quiet -print_format json -show_format -show_streams "$file" >/tmp/video_info.json

  local duration=$(cat /tmp/video_info.json | grep -o '"duration":"[^"]*' | cut -d'"' -f4)
  local width=$(cat /tmp/video_info.json | grep -o '"width":[0-9]*' | cut -d':' -f2)
  local height=$(cat /tmp/video_info.json | grep -o '"height":[0-9]*' | cut -d':' -f2)

  print_status "Duration: ${duration}s, Resolution: ${width}x${height}"
}

# Function to encode video with size target
encode_with_size_target() {
  local input="$1"
  local output="$2"
  local target_size_mb="$3"
  local width="$4"
  local height="$5"
  local codec="$6"

  print_status "Encoding $output (target: ${target_size_mb}MB, ${width}x${height}, codec: $codec)"

  # Calculate target bitrate based on duration and target size
  local duration=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$input")
  local target_bitrate=$(echo "$duration $target_size_mb" | awk '{printf "%.0fk", ($2 * 8192) / $1}')

  case $codec in
  "av1")
    ffmpeg -i "$input" -c:v libaom-av1 -crf $QUALITY_CRF -b:v "$target_bitrate" \
      -vf "scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}" \
      -c:a libopus -b:a 64k -ac 1 \
      -movflags +faststart -y "$output"
    ;;
  "h265")
    ffmpeg -i "$input" -c:v libx265 -crf $QUALITY_CRF -b:v "$target_bitrate" \
      -vf "scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}" \
      -c:a aac -b:a 64k -ac 1 \
      -movflags +faststart -y "$output"
    ;;
  "h264")
    ffmpeg -i "$input" -c:v libx264 -crf $QUALITY_CRF -b:v "$target_bitrate" \
      -vf "scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}" \
      -c:a aac -b:a 64k -ac 1 \
      -movflags +faststart -y "$output"
    ;;
  esac

  # Check if file meets size target
  local actual_size=$(du -m "$output" | cut -f1)
  if [ "$actual_size" -gt "$target_size_mb" ]; then
    print_warning "File size ${actual_size}MB exceeds target ${target_size_mb}MB"
  else
    print_success "File size ${actual_size}MB meets target ${target_size_mb}MB"
  fi
}

# Function to show usage
show_usage() {
  echo "Usage: $0 [OPTIONS] input_video.mp4"
  echo ""
  echo "Options:"
  echo "  -o, --output DIR     Output directory (default: ./encoded)"
  echo "  -q, --quality NUM    CRF quality setting 18-32 (default: 28)"
  echo "  -h, --help          Show this help message"
  echo ""
  echo "Example:"
  echo "  $0 -o ./web-videos -q 26 veo3_output.mp4"
  echo ""
  echo "This script will create:"
  echo "  - hero.av1.webm (desktop, ~2MB)"
  echo "  - hero.h265.mp4 (desktop, ~2MB)"
  echo "  - hero-mobile.av1.webm (mobile, ~800KB)"
  echo "  - hero-mobile.h265.mp4 (mobile, ~800KB)"
  echo "  - hero.h264.mp4 (fallback)"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
  -o | --output)
    OUTPUT_DIR="$2"
    shift 2
    ;;
  -q | --quality)
    QUALITY_CRF="$2"
    shift 2
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
    shift
    ;;
  esac
done

# Validate input
if [ -z "$INPUT_VIDEO" ]; then
  print_error "Input video file is required"
  show_usage
  exit 1
fi

if [ ! -f "$INPUT_VIDEO" ]; then
  print_error "Input file does not exist: $INPUT_VIDEO"
  exit 1
fi

# Check dependencies
print_status "Checking dependencies..."
check_dependency "ffmpeg" || exit 1
check_dependency "ffprobe" || exit 1

# Check for codec support
if ! ffmpeg -codecs 2>/dev/null | grep -q "libaom-av1"; then
  print_warning "AV1 codec not available, skipping AV1 encoding"
  SKIP_AV1=1
fi

if ! ffmpeg -codecs 2>/dev/null | grep -q "libx265"; then
  print_warning "H.265 codec not available, skipping H.265 encoding"
  SKIP_H265=1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"
print_success "Created output directory: $OUTPUT_DIR"

# Get video information
get_video_info "$INPUT_VIDEO"

# Define output files
BASENAME="hero"
DESKTOP_AV1="$OUTPUT_DIR/${BASENAME}.av1.webm"
DESKTOP_H265="$OUTPUT_DIR/${BASENAME}.h265.mp4"
MOBILE_AV1="$OUTPUT_DIR/${BASENAME}-mobile.av1.webm"
MOBILE_H265="$OUTPUT_DIR/${BASENAME}-mobile.h265.mp4"
FALLBACK_H264="$OUTPUT_DIR/${BASENAME}.h264.mp4"

print_status "Starting video encoding process..."
echo ""

# Desktop versions (target ~2MB)
if [ -z "$SKIP_AV1" ]; then
  encode_with_size_target "$INPUT_VIDEO" "$DESKTOP_AV1" 2 $DESKTOP_WIDTH $DESKTOP_HEIGHT "av1"
fi

if [ -z "$SKIP_H265" ]; then
  encode_with_size_target "$INPUT_VIDEO" "$DESKTOP_H265" 2 $DESKTOP_WIDTH $DESKTOP_HEIGHT "h265"
fi

# Mobile versions (target ~800KB)
if [ -z "$SKIP_AV1" ]; then
  encode_with_size_target "$INPUT_VIDEO" "$MOBILE_AV1" 1 $MOBILE_WIDTH $MOBILE_HEIGHT "av1"
fi

if [ -z "$SKIP_H265" ]; then
  encode_with_size_target "$INPUT_VIDEO" "$MOBILE_H265" 1 $MOBILE_WIDTH $MOBILE_HEIGHT "h265"
fi

# Fallback H.264 version
encode_with_size_target "$INPUT_VIDEO" "$FALLBACK_H264" 2 $DESKTOP_WIDTH $DESKTOP_HEIGHT "h264"

echo ""
print_success "Video encoding complete!"
print_status "Output files:"
ls -lh "$OUTPUT_DIR"

# Generate sample HTML
HTML_FILE="$OUTPUT_DIR/video-implementation.html"
cat >"$HTML_FILE" <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hero Video Implementation</title>
    <style>
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
            background: rgba(0, 0, 0, 0.3);
            z-index: 1;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: white;
            text-align: center;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .hero-video {
                display: none;
            }
        }
        
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
        <video class="hero-video" autoplay muted loop playsinline preload="none" poster="hero.jpg">
            <!-- Desktop versions -->
            <source src="hero.av1.webm" type="video/webm; codecs=av01.0.05M.08" data-size="desktop">
            <source src="hero.h265.mp4" type="video/mp4; codecs=hvc1.1.6.L93.90" data-size="desktop">
            
            <!-- Mobile versions -->
            <source src="hero-mobile.av1.webm" type="video/webm; codecs=av01.0.05M.08" data-size="mobile">
            <source src="hero-mobile.h265.mp4" type="video/mp4; codecs=hvc1.1.6.L93.90" data-size="mobile">
            
            <!-- Fallback -->
            <source src="hero.h264.mp4" type="video/mp4; codecs=avc1.42E01E">
        </video>
        
        <div class="hero-overlay"></div>
        
        <div class="hero-content">
            <h1>Your Hero Content Here</h1>
        </div>
    </div>

    <script>
        // Pause video when out of view for battery optimization
        const video = document.querySelector('.hero-video');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        });
        observer.observe(video);
    </script>
</body>
</html>
EOF

print_success "Generated sample HTML: $HTML_FILE"

echo ""
print_status "Next steps:"
echo "1. Extract poster frame: ./extract_poster.sh $INPUT_VIDEO"
echo "2. Test loop seamlessness in browser"
echo "3. Deploy to CDN with proper cache headers"
echo "4. Test on various devices and connection speeds"

