#!/bin/bash

# Veo 3 Video Download Script
# Automatically polls operation status and downloads completed video
# Integrates with the complete processing workflow

set -e

# Configuration
BASE_URL="https://generativelanguage.googleapis.com/v1beta"
OPERATION_FILE="veo3_operation.txt"
OUTPUT_FILENAME="veo3-generated-video.mp4"
POLL_INTERVAL=30  # Check every 30 seconds
MAX_WAIT_TIME=600 # Maximum wait time in seconds (10 minutes)

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

print_progress() {
    echo -e "${YELLOW}[PROGRESS]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Automatically download completed Veo 3 video generation"
    echo ""
    echo "Options:"
    echo "  -o, --output FILE    Output filename (default: veo3-generated-video.mp4)"
    echo "  -n, --name NAME      Base name for processed files (default: hero)"
    echo "  -i, --interval SEC   Poll interval in seconds (default: 30)"
    echo "  -t, --timeout SEC    Maximum wait time in seconds (default: 600)"
    echo "  --operation-id ID    Use specific operation ID instead of saved file"
    echo "  --process            Automatically process with encoding pipeline"
    echo "  -h, --help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                                            # Download with defaults"
    echo "  $0 -o homepage-hero.mp4 -n homepage-hero --process  # Download and process with custom name"
    echo "  $0 --operation-id abc123                     # Download specific operation"
    echo "  $0 -n pricing-demo --process                 # Use saved operation, custom processing name"
}

# Function to check operation status
check_status() {
    local operation_name="$1"
    
    print_status "Checking operation status: $operation_name"
    print_status "DEBUG: Full API URL: $BASE_URL/$operation_name"
    
    local response=$(curl -s -H "x-goog-api-key: $GEMINI_API_KEY" "$BASE_URL/$operation_name")
    
    print_status "DEBUG: Raw API response:"
    echo "============== API RESPONSE START =============="
    echo "$response"
    echo "============== API RESPONSE END =============="
    
    # Check for API errors
    if echo "$response" | grep -q "error"; then
        print_error "API error occurred:"
        echo "$response" | jq '.' 2>/dev/null || echo "$response"
        return 1
    fi
    
    echo "$response"
}

# Function to extract download URL from response
extract_download_url() {
    local response="$1"
    
    # Check if generation is complete
    local is_done=$(echo "$response" | jq -r '.done // false' 2>/dev/null)
    
    if [ "$is_done" = "true" ]; then
        # Try new API response structure first
        local video_uri=$(echo "$response" | jq -r '.response.generateVideoResponse.generatedSamples[0].video.uri // ""' 2>/dev/null)
        
        # Fall back to old structure if new one doesn't exist
        if [ -z "$video_uri" ] || [ "$video_uri" = "null" ]; then
            video_uri=$(echo "$response" | jq -r '.response.generatedVideo.uri // ""' 2>/dev/null)
        fi
        
        if [ -n "$video_uri" ] && [ "$video_uri" != "null" ]; then
            # Check for content policy warnings
            local filtered_reasons=$(echo "$response" | jq -r '.response.generateVideoResponse.raiMediaFilteredReasons[]? // ""' 2>/dev/null)
            if [ -n "$filtered_reasons" ] && [ "$filtered_reasons" != "" ]; then
                print_warning "Content policy notice:" >&2
                echo "$filtered_reasons" | while IFS= read -r reason; do
                    if [ -n "$reason" ]; then
                        print_warning "  - $reason" >&2
                    fi
                done
                echo "" >&2
            fi
            
            # Return only the URI to stdout
            echo "$video_uri"
            return 0
        else
            return 1
        fi
    else
        return 2  # Not done yet
    fi
}

# Function to download video file
download_video() {
    local video_uri="$1"
    local output_file="$2"
    
    print_status "Downloading video from: $video_uri"
    print_status "Output file: $output_file"
    
    # Download with progress bar and redirect following
    echo "CURL COMMAND: curl -L -H \"x-goog-api-key: $GEMINI_API_KEY\" --progress-bar --output \"$output_file\" \"$video_uri\""
    if curl -L -H "x-goog-api-key: $GEMINI_API_KEY" \
            --progress-bar \
            --output "$output_file" \
            "$video_uri"; then
        
        # Verify file was downloaded and has content
        if [ -f "$output_file" ] && [ -s "$output_file" ]; then
            local file_size=$(du -h "$output_file" | cut -f1)
            print_success "Video downloaded successfully: $output_file ($file_size)"
            
            # Verify it's a valid video file
            if command -v ffprobe &> /dev/null; then
                if ffprobe -v quiet "$output_file" 2>/dev/null; then
                    local duration=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$output_file" 2>/dev/null)
                    print_success "Video verified: ${duration}s duration"
                else
                    print_warning "Downloaded file may not be a valid video"
                fi
            fi
            
            return 0
        else
            print_error "Downloaded file is empty or missing"
            return 1
        fi
    else
        print_error "Failed to download video"
        return 1
    fi
}

# Function to process video automatically
process_video() {
    local video_file="$1"
    
    print_header "PROCESSING VIDEO WITH OPTIMIZED PIPELINE"
    
    if [ ! -f "./encode_web_video_optimized.sh" ]; then
        print_warning "encode_web_video_optimized.sh not found, trying regular encoder"
        if [ ! -f "./encode_web_video.sh" ]; then
            print_error "No encoding scripts found in current directory"
            return 1
        fi
        ENCODER_SCRIPT="./encode_web_video.sh"
    else
        ENCODER_SCRIPT="./encode_web_video_optimized.sh"
    fi
    
    # Create output directories
    mkdir -p ../../public/videos ../../public/images
    
    print_status "Encoding video for web deployment..."
    if $ENCODER_SCRIPT "$video_file" -n "$BASE_NAME" -o ../../public/videos; then
        print_success "Video encoding completed"
    else
        print_error "Video encoding failed"
        return 1
    fi
    
    print_status "Extracting poster frames..."
    if [ -f "./extract_poster.sh" ]; then
        if ./extract_poster.sh "$video_file" -n "$BASE_NAME" -o ../../public/images --modern; then
            print_success "Poster frame extraction completed"
        else
            print_warning "Poster extraction failed, but video encoding succeeded"
        fi
    else
        print_warning "extract_poster.sh not found, skipping poster extraction"
    fi
    
    print_success "Video processing pipeline completed!"
    print_status "Files generated in:"
    echo "  - ../../public/videos/ (web-optimized video files)"
    echo "  - ../../public/images/ (poster frames)"
}

# Parse command line arguments
AUTO_PROCESS=false
OPERATION_ID=""
BASE_NAME="hero"

while [[ $# -gt 0 ]]; do
    case $1 in
        -o|--output)
            OUTPUT_FILENAME="$2"
            shift 2
            ;;
        -n|--name)
            BASE_NAME="$2"
            shift 2
            ;;
        -i|--interval)
            POLL_INTERVAL="$2"
            shift 2
            ;;
        -t|--timeout)
            MAX_WAIT_TIME="$2"
            shift 2
            ;;
        --operation-id)
            OPERATION_ID="$2"
            shift 2
            ;;
        --process)
            AUTO_PROCESS=true
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

# Check if API key is provided
if [ -z "$GEMINI_API_KEY" ]; then
    print_error "GEMINI_API_KEY environment variable is required"
    echo "Set it with: export GEMINI_API_KEY=your_api_key"
    exit 1
fi

# Check dependencies
if ! command -v jq &> /dev/null; then
    print_error "jq is required for JSON parsing"
    echo "Install with: sudo apt install jq (Ubuntu) or brew install jq (macOS)"
    exit 1
fi

print_header "VEO 3 VIDEO DOWNLOAD AUTOMATION"

# Get operation ID
if [ -n "$OPERATION_ID" ]; then
    OPERATION_NAME="$OPERATION_ID"
    print_status "Using provided operation ID: $OPERATION_NAME"
else
    if [ ! -f "$OPERATION_FILE" ]; then
        print_error "$OPERATION_FILE not found"
        echo "Run ./generate_veo3_video.sh first, or provide --operation-id"
        exit 1
    fi
    
    OPERATION_NAME=$(cat "$OPERATION_FILE")
    print_status "Using operation ID from $OPERATION_FILE: $OPERATION_NAME"
fi

# Validate operation name
if [ -z "$OPERATION_NAME" ]; then
    print_error "Operation ID is empty"
    exit 1
fi

# Start polling loop
print_status "Starting download process..."
print_status "Poll interval: ${POLL_INTERVAL}s"
print_status "Maximum wait time: ${MAX_WAIT_TIME}s"
print_status "Output filename: $OUTPUT_FILENAME"
echo ""

start_time=$(date +%s)
attempts=0

while true; do
    current_time=$(date +%s)
    elapsed=$((current_time - start_time))
    
    if [ $elapsed -ge $MAX_WAIT_TIME ]; then
        print_error "Maximum wait time reached (${MAX_WAIT_TIME}s)"
        print_error "Generation may still be in progress. Check manually with:"
        echo "curl -H \"x-goog-api-key: \$GEMINI_API_KEY\" \"$BASE_URL/$OPERATION_NAME\""
        exit 1
    fi
    
    attempts=$((attempts + 1))
    remaining=$((MAX_WAIT_TIME - elapsed))
    
    print_progress "Attempt $attempts (${elapsed}s elapsed, ${remaining}s remaining)"
    
    # Check operation status - ALWAYS show what we get back
    response=$(curl -s -H "x-goog-api-key: $GEMINI_API_KEY" "$BASE_URL/$OPERATION_NAME")
    echo "=== RAW API RESPONSE ==="
    echo "$response"
    echo "======================="
    if [ $? -eq 0 ]; then
        # Try to extract download URL
        if video_url=$(extract_download_url "$response"); then
            print_success "Video generation completed!"
            echo ""
            
            # Download the video
            if download_video "$video_url" "$OUTPUT_FILENAME"; then
                echo ""
                print_success "Download completed successfully!"
                
                # Process video if requested
                if [ "$AUTO_PROCESS" = true ]; then
                    echo ""
                    process_video "$OUTPUT_FILENAME"
                    echo ""
                    print_success "Complete pipeline finished!"
                    print_status "Your video is ready for deployment!"
                else
                    echo ""
                    print_status "Next steps:"
                    echo "1. Process video: ./encode_web_video_optimized.sh $OUTPUT_FILENAME"
                    echo "2. Extract posters: ./extract_poster.sh $OUTPUT_FILENAME --webp"
                    echo "3. Or run with --process flag for automation"
                fi
                
                exit 0
            else
                exit 1
            fi
        else
            # Check if it returned "not done yet" (exit code 2)
            if [ $? -eq 2 ]; then
                print_status "Generation still in progress... waiting ${POLL_INTERVAL}s"
            else
                print_error "Failed to extract download URL"
                exit 1
            fi
        fi
    else
        print_error "Failed to check operation status"
        exit 1
    fi
    
    # Wait before next attempt
    sleep $POLL_INTERVAL
done