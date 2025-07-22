#!/bin/bash

# Poster Frame Extraction Script
# Extracts optimized poster frames from video for web use
# Supports multiple sizes and formats for responsive design

set -e

# Configuration
INPUT_VIDEO=""
OUTPUT_DIR="./encoded"
BASE_NAME="hero"
FRAME_TIME="50%" # Extract frame at 50% of video duration
QUALITY=85       # JPEG quality (1-100)

# Sizes for responsive poster images
DESKTOP_WIDTH=1920
DESKTOP_HEIGHT=1080
TABLET_WIDTH=1024
TABLET_HEIGHT=576
MOBILE_WIDTH=720
MOBILE_HEIGHT=405

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

# Function to extract poster frame
extract_poster() {
  local input="$1"
  local output="$2"
  local width="$3"
  local height="$4"
  local time="$5"

  print_status "Extracting ${width}x${height} poster: $output"

  ffmpeg -i "$input" -ss "$time" -vframes 1 \
    -vf "scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}" \
    -q:v 2 -y "$output" 2>/dev/null

  # Check file size
  local file_size=$(du -h "$output" | cut -f1)
  print_success "Created poster: $output (${file_size})"
}

# Function to create WebP versions using ImageMagick (consistent with image pipeline)
create_webp() {
  local jpeg_file="$1"
  local webp_file="${jpeg_file%.jpg}.webp"

  if command -v convert &>/dev/null; then
    print_status "Creating WebP version: $webp_file"
    convert "$jpeg_file" -strip -quality $QUALITY "$webp_file" 2>/dev/null

    local jpeg_size=$(stat -f%z "$jpeg_file" 2>/dev/null || stat -c%s "$jpeg_file" 2>/dev/null)
    local webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null)
    local savings=$(echo "$jpeg_size $webp_size" | awk '{printf "%.1f", (($1-$2)/$1)*100}')

    print_success "WebP created with ${savings}% size reduction"
  else
    print_warning "ImageMagick convert not found, skipping WebP generation"
  fi
}

# Function to create AVIF versions using ImageMagick (consistent with image pipeline)
create_avif() {
  local jpeg_file="$1"
  local avif_file="${jpeg_file%.jpg}.avif"

  if command -v convert &>/dev/null; then
    print_status "Creating AVIF version: $avif_file"
    convert "$jpeg_file" -strip -quality $QUALITY "$avif_file" 2>/dev/null

    local jpeg_size=$(stat -f%z "$jpeg_file" 2>/dev/null || stat -c%s "$jpeg_file" 2>/dev/null)
    local avif_size=$(stat -f%z "$avif_file" 2>/dev/null || stat -c%s "$avif_file" 2>/dev/null)
    local savings=$(echo "$jpeg_size $avif_size" | awk '{printf "%.1f", (($1-$2)/$1)*100}')

    print_success "AVIF created with ${savings}% size reduction"
  else
    print_warning "ImageMagick convert not found, skipping AVIF generation"
  fi
}

# Function to analyze video for best frame time
analyze_best_frame() {
  local input="$1"

  print_status "Analyzing video for optimal poster frame..." >&2

  # Get video duration
  local duration=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$input")

  # Calculate middle frame time
  local middle_time=$(echo "$duration" | awk '{printf "%.2f", $1/2}')

  print_status "Video duration: ${duration}s, using frame at: ${middle_time}s" >&2
  echo "$middle_time"
}

# Function to show usage
show_usage() {
  echo "Usage: $0 [OPTIONS] input_video.mp4"
  echo ""
  echo "Options:"
  echo "  -o, --output DIR     Output directory (default: ./encoded)"
  echo "  -n, --name NAME      Base name for output files (default: hero)"
  echo "  -t, --time TIME      Frame extraction time (default: 50%)"
  echo "                       Examples: 50%, 2.5s, 00:00:02.500"
  echo "  -q, --quality NUM    JPEG quality 1-100 (default: 85)"
  echo "  --webp              Also create WebP versions"
  echo "  --avif              Also create AVIF versions (requires ImageMagick)"
  echo "  --modern            Create both WebP and AVIF versions"
  echo "  -h, --help          Show this help message"
  echo ""
  echo "Examples:"
  echo "  $0 video.mp4 -n homepage-hero -o ./images"
  echo "  $0 video.mp4 -n pricing-demo -o ./images -t 3s --webp"
  echo ""
  echo "This script will create:"
  echo "  - {name}.jpg (1920x1080)"
  echo "  - {name}-tablet.jpg (1024x576)"
  echo "  - {name}-mobile.jpg (720x405)"
  echo "  - WebP versions (if --webp specified)"
}

# Parse command line arguments
CREATE_WEBP=false
CREATE_AVIF=false

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
  -t | --time)
    FRAME_TIME="$2"
    shift 2
    ;;
  -q | --quality)
    QUALITY="$2"
    shift 2
    ;;
  --webp)
    CREATE_WEBP=true
    shift
    ;;
  --avif)
    CREATE_AVIF=true
    shift
    ;;
  --modern)
    CREATE_WEBP=true
    CREATE_AVIF=true
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

# Create output directory
mkdir -p "$OUTPUT_DIR"
print_success "Using output directory: $OUTPUT_DIR"

# If frame time is percentage, convert to actual time
if [[ "$FRAME_TIME" == *"%" ]]; then
  ACTUAL_TIME=$(analyze_best_frame "$INPUT_VIDEO")
else
  ACTUAL_TIME="$FRAME_TIME"
fi

# Define output files
DESKTOP_POSTER="$OUTPUT_DIR/${BASE_NAME}.jpg"
TABLET_POSTER="$OUTPUT_DIR/${BASE_NAME}-tablet.jpg"
MOBILE_POSTER="$OUTPUT_DIR/${BASE_NAME}-mobile.jpg"

print_status "Extracting poster frames at time: $ACTUAL_TIME"
echo ""

# Extract poster frames
extract_poster "$INPUT_VIDEO" "$DESKTOP_POSTER" $DESKTOP_WIDTH $DESKTOP_HEIGHT "$ACTUAL_TIME"
extract_poster "$INPUT_VIDEO" "$TABLET_POSTER" $TABLET_WIDTH $TABLET_HEIGHT "$ACTUAL_TIME"
extract_poster "$INPUT_VIDEO" "$MOBILE_POSTER" $MOBILE_WIDTH $MOBILE_HEIGHT "$ACTUAL_TIME"

# Create modern format versions if requested
if [ "$CREATE_WEBP" = true ]; then
  echo ""
  print_status "Creating WebP versions..."
  create_webp "$DESKTOP_POSTER"
  create_webp "$TABLET_POSTER"
  create_webp "$MOBILE_POSTER"
fi

if [ "$CREATE_AVIF" = true ]; then
  echo ""
  print_status "Creating AVIF versions..."
  create_avif "$DESKTOP_POSTER"
  create_avif "$TABLET_POSTER"
  create_avif "$MOBILE_POSTER"
fi

echo ""
print_success "Poster frame extraction complete!"
print_status "Generated files:"
ls -lh "$OUTPUT_DIR"/${BASE_NAME}*.jpg

if [ "$CREATE_WEBP" = true ]; then
  print_status "WebP files:"
  ls -lh "$OUTPUT_DIR"/${BASE_NAME}*.webp 2>/dev/null || echo "No WebP files found"
fi

if [ "$CREATE_AVIF" = true ]; then
  print_status "AVIF files:"
  ls -lh "$OUTPUT_DIR"/${BASE_NAME}*.avif 2>/dev/null || echo "No AVIF files found"
fi

# Generate responsive picture element HTML
HTML_SNIPPET="$OUTPUT_DIR/poster-implementation.html"
cat >"$HTML_SNIPPET" <<EOF
<!-- Responsive poster implementation -->
<picture>
    <!-- AVIF format (best compression) -->
    <source media="(min-width: 1024px)" srcset="${BASE_NAME}.avif" type="image/avif">
    <source media="(min-width: 768px)" srcset="${BASE_NAME}-tablet.avif" type="image/avif">
    <source media="(max-width: 767px)" srcset="${BASE_NAME}-mobile.avif" type="image/avif">
    
    <!-- WebP format (good compression) -->
    <source media="(min-width: 1024px)" srcset="${BASE_NAME}.webp" type="image/webp">
    <source media="(min-width: 768px)" srcset="${BASE_NAME}-tablet.webp" type="image/webp">
    <source media="(max-width: 767px)" srcset="${BASE_NAME}-mobile.webp" type="image/webp">
    
    <!-- JPEG fallback -->
    <source media="(min-width: 1024px)" srcset="${BASE_NAME}.jpg" type="image/jpeg">
    <source media="(min-width: 768px)" srcset="${BASE_NAME}-tablet.jpg" type="image/jpeg">
    <source media="(max-width: 767px)" srcset="${BASE_NAME}-mobile.jpg" type="image/jpeg">
    
    <!-- Default image -->
    <img src="${BASE_NAME}.jpg" alt="Hero background" class="w-full h-full object-cover">
</picture>

<!-- For video poster attribute, use appropriate size -->
<video poster="${BASE_NAME}.jpg" autoplay muted loop playsinline preload="none">
    <!-- video sources here -->
</video>
EOF

print_success "Generated HTML snippet: $HTML_SNIPPET"

echo ""
print_status "Poster frame optimization tips:"
echo "1. Test images on various devices for clarity"
echo "2. Ensure poster matches video's first/middle frame"
echo "3. Consider using WebP for modern browsers"
echo "4. Compress further if needed while maintaining quality"
echo "5. Use appropriate sizes for different breakpoints"

