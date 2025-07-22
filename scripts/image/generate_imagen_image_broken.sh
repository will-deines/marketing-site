#!/bin/bash

# Imagen 3 Image Generation Script
# Generates high-quality images using Google's Imagen 3 model via Gemini API
# Updated for 2025 API specifications

set -e

# Configuration
CONFIG_FILE="imagen_config.conf"
OPERATION_FILE="imagen_operation.txt"

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
    echo "Generate images using Google Imagen 3 via Gemini API"
    echo ""
    echo "Options:"
    echo "  -c, --config FILE    Configuration file (default: imagen_config.conf)"
    echo "  -o, --output FILE    Output filename base (default: generated-image)"
    echo "  -n, --name NAME      Specific image name for organized output"
    echo "  -h, --help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                                    # Generate with defaults"
    echo "  $0 -n product-showcase               # Generate product showcase image"
    echo "  $0 -c custom-config.conf -n hero    # Use custom config"
    echo ""
    echo "Prerequisites:"
    echo "  - GEMINI_API_KEY environment variable must be set"
    echo "  - Valid Imagen 3 configuration file"
}

# Parse command line arguments
OUTPUT_BASE="generated-image"
IMAGE_NAME=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--config)
            CONFIG_FILE="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_BASE="$2"
            shift 2
            ;;
        -n|--name)
            IMAGE_NAME="$2"
            shift 2
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

print_header "IMAGEN 3 IMAGE GENERATION"

# Check if API key is provided
if [ -z "$GEMINI_API_KEY" ]; then
    print_error "GEMINI_API_KEY environment variable is required"
    echo "Set it with: export GEMINI_API_KEY=your_api_key"
    exit 1
fi

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    print_error "Configuration file not found: $CONFIG_FILE"
    echo "Create a configuration file or specify one with -c option"
    exit 1
fi

# Source configuration
source "$CONFIG_FILE"

# Validate required configuration
if [ -z "$PROMPT" ]; then
    print_error "PROMPT must be defined in configuration file"
    exit 1
fi

# Use image name if provided for organized output
if [ -n "$IMAGE_NAME" ]; then
    OUTPUT_BASE="$IMAGE_NAME"
fi

print_status "Configuration loaded from: $CONFIG_FILE"
print_status "Generating image with Imagen 3..."
print_status "Output base name: $OUTPUT_BASE"
echo ""

# Build the JSON payload using only officially supported parameters
JSON_PAYLOAD="{"
JSON_PAYLOAD+="\"prompt\":\"$PROMPT\","
JSON_PAYLOAD+="\"sampleCount\":${SAMPLE_COUNT:-1},"
JSON_PAYLOAD+="\"aspectRatio\":\"${ASPECT_RATIO:-1:1}\","
JSON_PAYLOAD+="\"personGeneration\":\"${PERSON_GENERATION:-allow_adult}\"
JSON_PAYLOAD+="}"

print_status "Sending request to Imagen 3 API..."
print_status "Model: ${MODEL_NAME:-imagen-3.0-generate-002}"
print_status "Endpoint: $API_URL"

# Make the API request to correct endpoint
API_URL="https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME:-imagen-3.0-generate-001}:generateImage"

response=$(curl -s -X POST \
  "$API_URL" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD")

# Check if request was successful
if echo "$response" | grep -q '"error"'; then
    print_error "API request failed:"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
    exit 1
fi

# Extract and save images
print_success "Image generation completed!"

# Process generated images from correct response format
print_status "Processing generated images..."

# Check if we have the generatedImages array
image_count=$(echo "$response" | jq '.generatedImages | length' 2>/dev/null || echo "0")

if [ "$image_count" -eq 0 ]; then
    print_error "No images were generated"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
    exit 1
fi

print_status "Generated $image_count images"

for i in $(seq 0 $((image_count - 1))); do
    # Extract base64 image data from correct field
    image_data=$(echo "$response" | jq -r ".generatedImages[$i].bytesBase64Encoded" 2>/dev/null)
    
    if [ "$image_data" = "null" ] || [ -z "$image_data" ]; then
        print_warning "No image data found for image $(($i + 1))"
        continue
    fi
    
    # Determine file extension
    if [ "${OUTPUT_MIME_TYPE:-image/jpeg}" = "image/png" ]; then
        extension="png"
    else
        extension="jpg"
    fi
    
    # Create output filename
    if [ "$image_count" -eq 1 ]; then
        output_file="${OUTPUT_BASE}.${extension}"
    else
        output_file="${OUTPUT_BASE}-$(($i + 1)).${extension}"
    fi
    
    # Decode and save image
    echo "$image_data" | base64 -d > "$output_file"
    
    if [ -f "$output_file" ] && [ -s "$output_file" ]; then
        file_size=$(du -h "$output_file" | cut -f1)
        print_success "Image saved: $output_file - $file_size"
    else
        print_error "Failed to save image: $output_file"
    fi
done

echo ""
print_success "Image generation pipeline completed!"
print_status "Generated files ready for web deployment"

# Save generation info for reference
echo "Generated at: $(date)" > "${OUTPUT_BASE}-info.txt"
echo "Prompt: $PROMPT" >> "${OUTPUT_BASE}-info.txt"
echo "Model: ${MODEL_NAME:-imagen-3.0-generate-002}" >> "${OUTPUT_BASE}-info.txt"
echo "Aspect Ratio: ${ASPECT_RATIO:-1:1}" >> "${OUTPUT_BASE}-info.txt"

print_status "Generation info saved: ${OUTPUT_BASE}-info.txt"
