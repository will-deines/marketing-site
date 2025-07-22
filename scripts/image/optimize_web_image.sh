#!/bin/bash

# Web Image Optimization Script
# Optimizes images for web deployment with multiple formats and sizes
# Supports responsive breakpoints and modern formats

set -e

# Configuration
OUTPUT_DIR="../../public/images"
BASE_NAME="optimized"
QUALITY_JPEG=85
QUALITY_WEBP=80
QUALITY_AVIF=50

# Responsive breakpoints
DESKTOP_WIDTH=1920
TABLET_WIDTH=1024
MOBILE_WIDTH=720

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

# Function to check dependencies
check_dependency() {
    if ! command -v "$1" &> /dev/null; then
        print_error "$1 is required but not installed"
        return 1
    fi
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS] input_image"
    echo ""
    echo "Optimize images for web deployment with responsive breakpoints"
    echo ""
    echo "Options:"
    echo "  -o, --output DIR     Output directory (default: ../public/images)"
    echo "  -n, --name NAME      Base name for output files (default: optimized)"
    echo "  -q, --quality NUM    JPEG quality 1-100 (default: 85)"
    echo "  --webp-quality NUM   WebP quality 1-100 (default: 80)"
    echo "  --avif-quality NUM   AVIF quality 1-100 (default: 50)"
    echo "  --no-webp           Skip WebP generation"
    echo "  --no-avif           Skip AVIF generation"
    echo "  --no-responsive     Skip responsive breakpoints"
    echo "  -h, --help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 product-image.jpg -n product-showcase -o ../public/images"
    echo "  $0 hero-bg.png -n homepage-hero --no-avif"
    echo ""
    echo "Generated files:"
    echo "  - {name}.jpg (desktop 1920px)"
    echo "  - {name}-tablet.jpg (tablet 1024px)" 
    echo "  - {name}-mobile.jpg (mobile 720px)"
    echo "  - WebP and AVIF versions (if enabled)"
}

# Function to optimize single image
optimize_image() {
    local input="$1"
    local output="$2"
    local width="$3"
    local quality="$4"
    local format="$5"
    
    case "$format" in
        "jpeg")
            convert "$input" \
                -resize "${width}x" \
                -strip \
                -quality "$quality" \
                "$output"
            ;;
        "webp")
            convert "$input" \
                -resize "${width}x" \
                -strip \
                -quality "$quality" \
                "$output"
            ;;
        "avif")
            convert "$input" \
                -resize "${width}x" \
                -strip \
                -quality "$quality" \
                "$output"
            ;;
    esac
    
    local file_size=$(du -h "$output" | cut -f1)
    print_success "Generated: $(basename "$output") ($file_size)"
}

# Parse command line arguments
INPUT_IMAGE=""
CREATE_WEBP=true
CREATE_AVIF=true
CREATE_RESPONSIVE=true

while [[ $# -gt 0 ]]; do
    case $1 in
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -n|--name)
            BASE_NAME="$2"
            shift 2
            ;;
        -q|--quality)
            QUALITY_JPEG="$2"
            shift 2
            ;;
        --webp-quality)
            QUALITY_WEBP="$2"
            shift 2
            ;;
        --avif-quality)
            QUALITY_AVIF="$2"
            shift 2
            ;;
        --no-webp)
            CREATE_WEBP=false
            shift
            ;;
        --no-avif)
            CREATE_AVIF=false
            shift
            ;;
        --no-responsive)
            CREATE_RESPONSIVE=false
            shift
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        -*)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
        *)
            if [ -z "$INPUT_IMAGE" ]; then
                INPUT_IMAGE="$1"
            else
                print_error "Multiple input files not supported"
                exit 1
            fi
            shift
            ;;
    esac
done

print_header "WEB IMAGE OPTIMIZATION"

# Validate input
if [ -z "$INPUT_IMAGE" ]; then
    print_error "Input image is required"
    show_usage
    exit 1
fi

if [ ! -f "$INPUT_IMAGE" ]; then
    print_error "Input image not found: $INPUT_IMAGE"
    exit 1
fi

# Check dependencies
print_status "Checking dependencies..."
check_dependency "ffmpeg" || exit 1

# Create output directory
mkdir -p "$OUTPUT_DIR"
print_success "Using output directory: $OUTPUT_DIR"

print_status "Starting image optimization..."
print_status "Input: $INPUT_IMAGE"
print_status "Base name: $BASE_NAME"
echo ""

# Generate desktop version (original size)
print_status "Generating desktop version (${DESKTOP_WIDTH}px)..."
optimize_image "$INPUT_IMAGE" "$OUTPUT_DIR/${BASE_NAME}.jpg" "$DESKTOP_WIDTH" "$QUALITY_JPEG" "jpeg"

if [ "$CREATE_WEBP" = true ]; then
    optimize_image "$INPUT_IMAGE" "$OUTPUT_DIR/${BASE_NAME}.webp" "$DESKTOP_WIDTH" "$QUALITY_WEBP" "webp"
fi

if [ "$CREATE_AVIF" = true ]; then
    optimize_image "$INPUT_IMAGE" "$OUTPUT_DIR/${BASE_NAME}.avif" "$DESKTOP_WIDTH" "$QUALITY_AVIF" "avif"
fi

# Generate responsive versions
if [ "$CREATE_RESPONSIVE" = true ]; then
    echo ""
    print_status "Generating responsive versions..."
    
    # Tablet version
    print_status "Tablet version (${TABLET_WIDTH}px)..."
    optimize_image "$INPUT_IMAGE" "$OUTPUT_DIR/${BASE_NAME}-tablet.jpg" "$TABLET_WIDTH" "$QUALITY_JPEG" "jpeg"
    
    if [ "$CREATE_WEBP" = true ]; then
        optimize_image "$INPUT_IMAGE" "$OUTPUT_DIR/${BASE_NAME}-tablet.webp" "$TABLET_WIDTH" "$QUALITY_WEBP" "webp"
    fi
    
    if [ "$CREATE_AVIF" = true ]; then
        optimize_image "$INPUT_IMAGE" "$OUTPUT_DIR/${BASE_NAME}-tablet.avif" "$TABLET_WIDTH" "$QUALITY_AVIF" "avif"
    fi
    
    # Mobile version
    print_status "Mobile version (${MOBILE_WIDTH}px)..."
    optimize_image "$INPUT_IMAGE" "$OUTPUT_DIR/${BASE_NAME}-mobile.jpg" "$MOBILE_WIDTH" "$QUALITY_JPEG" "jpeg"
    
    if [ "$CREATE_WEBP" = true ]; then
        optimize_image "$INPUT_IMAGE" "$OUTPUT_DIR/${BASE_NAME}-mobile.webp" "$MOBILE_WIDTH" "$QUALITY_WEBP" "webp"
    fi
    
    if [ "$CREATE_AVIF" = true ]; then
        optimize_image "$INPUT_IMAGE" "$OUTPUT_DIR/${BASE_NAME}-mobile.avif" "$MOBILE_WIDTH" "$QUALITY_AVIF" "avif"
    fi
fi

echo ""
print_success "Image optimization completed!"

# Generate responsive HTML snippet
HTML_FILE="$OUTPUT_DIR/${BASE_NAME}-implementation.html"
cat > "$HTML_FILE" <<EOF
<!-- Responsive image implementation for ${BASE_NAME} -->
<picture>
    <!-- Modern formats for supported browsers -->
EOF

if [ "$CREATE_AVIF" = true ]; then
    cat >> "$HTML_FILE" <<EOF
    <source media="(min-width: 1024px)" srcset="${BASE_NAME}.avif" type="image/avif">
    <source media="(min-width: 768px)" srcset="${BASE_NAME}-tablet.avif" type="image/avif">
    <source media="(max-width: 767px)" srcset="${BASE_NAME}-mobile.avif" type="image/avif">
EOF
fi

if [ "$CREATE_WEBP" = true ]; then
    cat >> "$HTML_FILE" <<EOF
    <source media="(min-width: 1024px)" srcset="${BASE_NAME}.webp" type="image/webp">
    <source media="(min-width: 768px)" srcset="${BASE_NAME}-tablet.webp" type="image/webp">
    <source media="(max-width: 767px)" srcset="${BASE_NAME}-mobile.webp" type="image/webp">
EOF
fi

cat >> "$HTML_FILE" <<EOF
    
    <!-- Fallback JPEG versions -->
    <source media="(min-width: 1024px)" srcset="${BASE_NAME}.jpg" type="image/jpeg">
    <source media="(min-width: 768px)" srcset="${BASE_NAME}-tablet.jpg" type="image/jpeg">
    <source media="(max-width: 767px)" srcset="${BASE_NAME}-mobile.jpg" type="image/jpeg">
    
    <!-- Default image -->
    <img src="${BASE_NAME}.jpg" alt="Generated image" class="w-full h-full object-cover" loading="lazy">
</picture>
EOF

print_success "Generated HTML implementation: $(basename "$HTML_FILE")"

# Show results
echo ""
print_status "Generated files:"
ls -lh "$OUTPUT_DIR"/${BASE_NAME}* | grep -v implementation

echo ""
print_status "Optimization complete! Files ready for web deployment."
print_status "Use the generated HTML snippet for responsive implementation."