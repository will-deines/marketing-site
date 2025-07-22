#!/bin/bash

# Complete Image Pipeline: Generate + Optimize
# Generates images with Imagen 3 and optimizes them for web deployment

set -e

# Configuration
DEFAULT_CONFIG="imagen_config.conf"
DEFAULT_OUTPUT_DIR="../../public/images"

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

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Complete pipeline: Generate images with Imagen 3 + Web optimization"
    echo ""
    echo "Options:"
    echo "  -c, --config FILE    Configuration file (default: imagen_config.conf)"
    echo "  -n, --name NAME      Base name for all generated files"
    echo "  -o, --output DIR     Output directory (default: ../public/images)"
    echo "  --no-webp           Skip WebP generation"
    echo "  --no-avif           Skip AVIF generation"
    echo "  --no-responsive     Skip responsive breakpoints"
    echo "  -h, --help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -n product-showcase"
    echo "  $0 -n homepage-hero -c custom-config.conf"
    echo "  $0 -n indie-unboxing --no-avif"
    echo ""
    echo "This script will:"
    echo "  1. Generate high-quality image with Imagen 3"
    echo "  2. Optimize for web with multiple formats and sizes"
    echo "  3. Create responsive HTML implementation"
}

# Parse command line arguments
CONFIG_FILE="$DEFAULT_CONFIG"
OUTPUT_DIR="$DEFAULT_OUTPUT_DIR"
IMAGE_NAME=""
OPTIMIZE_ARGS=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--config)
            CONFIG_FILE="$2"
            shift 2
            ;;
        -n|--name)
            IMAGE_NAME="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        --no-webp)
            OPTIMIZE_ARGS+=" --no-webp"
            shift
            ;;
        --no-avif)
            OPTIMIZE_ARGS+=" --no-avif"
            shift
            ;;
        --no-responsive)
            OPTIMIZE_ARGS+=" --no-responsive"
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
            print_error "Unexpected argument: $1"
            show_usage
            exit 1
            ;;
    esac
done

print_header "COMPLETE IMAGE GENERATION PIPELINE"

# Validate required parameters
if [ -z "$IMAGE_NAME" ]; then
    print_error "Image name is required (-n option)"
    show_usage
    exit 1
fi

# Check if scripts exist
if [ ! -f "./generate_imagen_image.sh" ]; then
    print_error "generate_imagen_image.sh not found in current directory"
    exit 1
fi

if [ ! -f "./optimize_web_image.sh" ]; then
    print_error "optimize_web_image.sh not found in current directory"
    exit 1
fi

print_status "Pipeline configuration:"
print_status "  Config file: $CONFIG_FILE"
print_status "  Image name: $IMAGE_NAME"
print_status "  Output directory: $OUTPUT_DIR"
print_status "  Optimization options: $OPTIMIZE_ARGS"
echo ""

# Step 1: Generate image with Imagen 3
print_header "STEP 1: GENERATING IMAGE WITH IMAGEN 3"
print_status "Starting image generation..."

if ./generate_imagen_image.sh -c "$CONFIG_FILE" -n "$IMAGE_NAME"; then
    print_success "Image generation completed successfully"
else
    print_error "Image generation failed"
    exit 1
fi

echo ""

# Check if generated image exists
GENERATED_IMAGE="${IMAGE_NAME}.jpg"
if [ ! -f "$GENERATED_IMAGE" ]; then
    # Try PNG extension
    GENERATED_IMAGE="${IMAGE_NAME}.png"
    if [ ! -f "$GENERATED_IMAGE" ]; then
        print_error "Generated image not found: ${IMAGE_NAME}.jpg or ${IMAGE_NAME}.png"
        exit 1
    fi
fi

# Step 2: Optimize for web deployment
print_header "STEP 2: OPTIMIZING FOR WEB DEPLOYMENT"
print_status "Starting web optimization..."

if ./optimize_web_image.sh "$GENERATED_IMAGE" -n "$IMAGE_NAME" -o "$OUTPUT_DIR" $OPTIMIZE_ARGS; then
    print_success "Web optimization completed successfully"
else
    print_error "Web optimization failed"
    exit 1
fi

echo ""

# Step 3: Clean up temporary files
print_status "Cleaning up temporary files..."
rm -f "$GENERATED_IMAGE" "${IMAGE_NAME}-info.txt"

# Final summary
print_header "PIPELINE COMPLETED SUCCESSFULLY"
print_success "Image generation and optimization pipeline finished!"
print_status "Generated assets are ready for deployment:"
echo ""
print_status "Generated files in $OUTPUT_DIR:"
ls -lh "$OUTPUT_DIR"/${IMAGE_NAME}* 2>/dev/null | grep -v implementation || print_warning "No files generated"

echo ""
print_status "Implementation files:"
if [ -f "$OUTPUT_DIR/${IMAGE_NAME}-implementation.html" ]; then
    print_success "HTML snippet: $OUTPUT_DIR/${IMAGE_NAME}-implementation.html"
else
    print_warning "HTML implementation file not found"
fi

echo ""
print_status "Next steps:"
echo "  1. Review generated images in $OUTPUT_DIR"
echo "  2. Use the HTML snippet for responsive implementation"
echo "  3. Update your React components to use the new image assets"
echo "  4. Deploy to production"