#!/bin/bash

# Optimized Web Video Encoding Script
# Based on research-proven Ubuntu/FFmpeg workflow for hero background videos
# Focuses on AV1/WebM + H.265/MP4 with optimal settings

set -e

# Configuration based on research
INPUT_VIDEO=""
OUTPUT_DIR="./encoded"
BASE_NAME="hero"
MAX_DURATION=8   # Keep videos ≤ 8 seconds
AV1_CRF=38       # Optimal for ~1.5-2MB at 1080p
H265_CRF=26      # Optimal for H.265 quality/size
TARGET_SIZE_MB=2 # Desktop target

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to check codec availability
check_codec_support() {
  print_status "Checking codec support..."

  if ! ffmpeg -codecs 2>/dev/null | grep -q "libsvtav1"; then
    print_error "SVT-AV1 codec not available"
    echo "Install with: sudo apt update && sudo apt install -y ffmpeg"
    echo "Ubuntu 22.04+ should include libsvtav1 by default"
    return 1
  fi

  if ! ffmpeg -codecs 2>/dev/null | grep -q "libx265"; then
    print_error "x265 codec not available"
    echo "Install with: sudo apt install -y libx265-dev"
    return 1
  fi

  print_success "All required codecs available"
}

# Function to analyze and trim video
prepare_video() {
  local input="$1"
  local output="$2"

  print_status "Preparing video for web deployment..."

  # Get duration
  local duration=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$input")
  local duration_int=$(echo "$duration" | cut -d'.' -f1)

  if [ "$duration_int" -gt "$MAX_DURATION" ]; then
    print_warning "Video is ${duration}s, trimming to ${MAX_DURATION}s"
    local trim_duration=$MAX_DURATION
  else
    local trim_duration=$(echo "$duration" | awk '{printf "%.1f", $1}')
  fi

  print_status "Preparing video for seamless loop (no fades - preserving natural motion)"

  # Trim only - no fades for smooth background video loop
  ffmpeg -i "$input" \
    -ss 0 -t "$trim_duration" \
    -an \
    -y "$output" 2>/dev/null

  print_success "Video prepared: ${trim_duration}s duration with seamless loop"
}

# Function to encode AV1/WebM (research-optimized)
encode_av1() {
  local input="$1"
  local output="$2"

  print_status "Encoding AV1/WebM with SVT-AV1 (preset 6, CRF $AV1_CRF)..."

  ffmpeg -i "$input" \
    -c:v libsvtav1 \
    -preset 6 \
    -crf "$AV1_CRF" \
    -g 192 \
    -b:v 0 \
    -y "$output" 2>/dev/null

  local file_size=$(du -h "$output" | cut -f1)
  local file_size_mb=$(du -m "$output" | cut -f1)

  if [ "$file_size_mb" -le "$TARGET_SIZE_MB" ]; then
    print_success "AV1 encoded successfully: $file_size (meets ${TARGET_SIZE_MB}MB target)"
  else
    print_warning "AV1 file size ${file_size} exceeds ${TARGET_SIZE_MB}MB target"
  fi
}

# Function to encode H.265/MP4 (research-optimized for Safari)
encode_h265() {
  local input="$1"
  local output="$2"

  print_status "Encoding H.265/MP4 with Safari compatibility (preset medium, CRF $H265_CRF)..."

  ffmpeg -i "$input" \
    -c:v libx265 \
    -preset medium \
    -crf "$H265_CRF" \
    -tag:v hvc1 \
    -movflags +faststart \
    -y "$output" 2>/dev/null

  local file_size=$(du -h "$output" | cut -f1)
  local file_size_mb=$(du -m "$output" | cut -f1)

  if [ "$file_size_mb" -le "$TARGET_SIZE_MB" ]; then
    print_success "H.265 encoded successfully: $file_size (meets ${TARGET_SIZE_MB}MB target)"
  else
    print_warning "H.265 file size ${file_size} exceeds ${TARGET_SIZE_MB}MB target"
  fi
}

# Function to extract high-quality poster frame
extract_poster() {
  local input="$1"
  local output="$2"

  print_status "Extracting high-quality poster frame..."

  # Use first frame for consistency
  ffmpeg -i "$input" \
    -vf "select=eq(n\,0)" \
    -q:v 2 \
    -y "$output" 2>/dev/null

  local file_size=$(du -h "$output" | cut -f1)
  print_success "Poster extracted: $output ($file_size)"
}

# Function to check final results
analyze_results() {
  local av1_file="$1"
  local h265_file="$2"

  print_status "Analyzing encoded results..."

  if [ -f "$av1_file" ]; then
    local av1_bitrate=$(ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of csv=p=0 "$av1_file")
    local av1_duration=$(ffprobe -v error -select_streams v:0 -show_entries stream=duration -of csv=p=0 "$av1_file")
    local av1_size=$(du -m "$av1_file" | cut -f1)

    print_status "AV1: ${av1_size}MB, ${av1_bitrate} bps, ${av1_duration}s"

    if [ "$av1_bitrate" -le 1500000 ]; then
      print_success "AV1 bitrate ≤ 1.5Mbps (3G friendly)"
    fi
  fi

  if [ -f "$h265_file" ]; then
    local h265_bitrate=$(ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of csv=p=0 "$h265_file")
    local h265_duration=$(ffprobe -v error -select_streams v:0 -show_entries stream=duration -of csv=p=0 "$h265_file")
    local h265_size=$(du -m "$h265_file" | cut -f1)

    print_status "H.265: ${h265_size}MB, ${h265_bitrate} bps, ${h265_duration}s"

    if [ "$h265_bitrate" -le 1500000 ]; then
      print_success "H.265 bitrate ≤ 1.5Mbps (3G friendly)"
    fi
  fi
}

# Function to test loop quality
test_loop() {
  local file="$1"

  print_status "To test loop quality, run:"
  echo "  ffplay -loop 0 \"$file\""
  echo "Watch for any flash/jump at the loop point"
}

# Function to show usage
show_usage() {
  echo "Usage: $0 [OPTIONS] input_video.mp4"
  echo ""
  echo "Research-optimized encoding for hero background videos"
  echo "Based on Ubuntu FFmpeg + SVT-AV1 + x265 workflow"
  echo ""
  echo "Options:"
  echo "  -o, --output DIR     Output directory (default: ./encoded)"
  echo "  -n, --name NAME      Base output name (default: hero)"
  echo "  --av1-crf NUM       AV1 CRF value 34-40 (default: 38)"
  echo "  --h265-crf NUM      H.265 CRF value 23-28 (default: 26)"
  echo "  --max-duration SEC   Maximum duration in seconds (default: 8)"
  echo "  -h, --help          Show this help message"
  echo ""
  echo "Output files:"
  echo "  - {name}.av1.webm     (AV1/WebM for modern browsers)"
  echo "  - {name}.h265.mp4     (H.265/MP4 for Safari + fallback)"
  echo "  - {name}.mp4          (H.264 fallback)"
  echo "  - {name}.jpg          (High-quality poster frame)"
  echo ""
  echo "Examples:"
  echo "  $0 video.mp4 -n homepage-hero -o ../public/videos"
  echo "  $0 video.mp4 -n pricing-demo -o ../public/videos"
  echo ""
  echo "HTML implementation:"
  echo "  <video autoplay muted loop playsinline preload=\"none\" poster=\"{name}.jpg\">"
  echo "    <source src=\"{name}.av1.webm\" type=\"video/webm\">"
  echo "    <source src=\"{name}.h265.mp4\" type=\"video/mp4\">"
  echo "    <source src=\"{name}.mp4\" type=\"video/mp4\">"
  echo "  </video>"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
  -o | --output)
    OUTPUT_DIR="$2"
    shift 2
    ;;
  -n | --name)
    BASE_NAME="$2"
    shift 2
    ;;
  --av1-crf)
    AV1_CRF="$2"
    shift 2
    ;;
  --h265-crf)
    H265_CRF="$2"
    shift 2
    ;;
  --max-duration)
    MAX_DURATION="$2"
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
print_status "Checking system requirements..."
if ! command -v ffmpeg &>/dev/null; then
  print_error "ffmpeg is required but not installed"
  echo "Install with: sudo apt update && sudo apt install -y ffmpeg"
  exit 1
fi

if ! command -v ffprobe &>/dev/null; then
  print_error "ffprobe is required but not installed"
  echo "Install with: sudo apt update && sudo apt install -y ffmpeg"
  exit 1
fi

check_codec_support || exit 1

# Create output directory
mkdir -p "$OUTPUT_DIR"
print_success "Using output directory: $OUTPUT_DIR"

# Define output files
PREPARED_VIDEO="$OUTPUT_DIR/clip.mov"
AV1_OUTPUT="$OUTPUT_DIR/${BASE_NAME}.av1.webm"
H265_OUTPUT="$OUTPUT_DIR/${BASE_NAME}.h265.mp4"
MP4_OUTPUT="$OUTPUT_DIR/${BASE_NAME}.mp4"
POSTER_OUTPUT="$OUTPUT_DIR/${BASE_NAME}.jpg"

print_status "Starting optimized encoding workflow..."
echo ""

# Step 1: Prepare video (trim + loop fades)
prepare_video "$INPUT_VIDEO" "$PREPARED_VIDEO"

# Step 2: Encode AV1/WebM
encode_av1 "$PREPARED_VIDEO" "$AV1_OUTPUT"

# Step 3: Encode H.265/MP4
encode_h265 "$PREPARED_VIDEO" "$H265_OUTPUT"

# Step 4: Extract poster frame
extract_poster "$PREPARED_VIDEO" "$POSTER_OUTPUT"

# Step 5: Analyze results
echo ""
analyze_results "$AV1_OUTPUT" "$H265_OUTPUT"

# Step 6: Generate implementation HTML
HTML_FILE="$OUTPUT_DIR/implementation.html"
cat >"$HTML_FILE" <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Optimized Hero Video</title>
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
        
        .hero-content {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: white;
            text-align: center;
            background: rgba(0,0,0,0.3);
        }
        
        @media (prefers-reduced-motion: reduce) {
            .hero-video { display: none; }
            .hero-container { background-image: url('hero.jpg'); background-size: cover; }
        }
    </style>
</head>
<body>
    <div class="hero-container">
        <video class="hero-video" autoplay muted loop playsinline preload="none" poster="hero.jpg">
            <source src="hero.av1.webm" type="video/webm">
            <source src="hero.h265.mp4" type="video/mp4">
        </video>
        <div class="hero-content">
            <h1>Your Hero Content</h1>
        </div>
    </div>

    <script>
        // Battery optimization
        const video = document.querySelector('.hero-video');
        const observer = new IntersectionObserver(entries => {
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

# Clean up temporary files
rm -f "$PREPARED_VIDEO"

echo ""
print_success "Optimized encoding complete!"
print_status "Generated files:"
ls -lh "$OUTPUT_DIR"

echo ""
print_status "Quality testing:"
test_loop "$AV1_OUTPUT"

echo ""
print_status "Next steps:"
echo "1. Test loop quality with ffplay"
echo "2. Verify file sizes meet targets (≤ 2MB)"
echo "3. Test in browsers for autoplay compatibility"
echo "4. Deploy with CDN and cache headers"
echo "5. Monitor Core Web Vitals impact"

print_success "Implementation ready: $HTML_FILE"

