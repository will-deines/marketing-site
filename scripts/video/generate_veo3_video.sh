#!/bin/bash

# Veo 3 Video Generation Script
# Requires: Gemini API Key and video description text file

set -e

# Configuration
BASE_URL="https://generativelanguage.googleapis.com/v1beta"
MODEL="veo-3.0-generate-preview"
# DESCRIPTION_FILE="video_description.txt"  # Now using PROMPT from config
CONFIG_FILE="veo3_config.conf"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--config)
            CONFIG_FILE="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [-c CONFIG_FILE]"
            echo "  -c, --config    Configuration file (default: veo3_config.conf)"
            echo "  -h, --help      Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use -h for help"
            exit 1
            ;;
    esac
done

# Check if API key is provided
if [ -z "$GEMINI_API_KEY" ]; then
  echo "Error: GEMINI_API_KEY environment variable is required"
  echo "Usage: GEMINI_API_KEY=your_api_key ./generate_veo3_video.sh"
  exit 1
fi

# Check if description file exists (commented out - now using config)
# if [ ! -f "$DESCRIPTION_FILE" ]; then
#     echo "Error: $DESCRIPTION_FILE not found"
#     echo "Please create a text file with your video description"
#     exit 1
# fi

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
  echo "Error: $CONFIG_FILE not found"
  echo "Please create a config file with parameters"
  exit 1
fi

# Source config file
source "$CONFIG_FILE"

# Validate required parameters
if [ -z "$PROMPT" ]; then
  echo "Error: PROMPT not set in $CONFIG_FILE"
  echo "Please set PROMPT variable in the config file"
  exit 1
fi

echo "Generating video with Veo 3..."
echo "Prompt: $PROMPT"
echo "Config: $CONFIG_FILE"
echo "API Endpoint: $BASE_URL/models/$MODEL:predictLongRunning"
echo ""

# Make API call to Veo 3
RESPONSE=$(curl -s "$BASE_URL/models/$MODEL:predictLongRunning" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -X "POST" \
  -d "{
    \"instances\": [{
        \"prompt\": \"$PROMPT\"
      }
    ],
    \"parameters\": {
      \"aspectRatio\": \"$ASPECT_RATIO\",
      \"negativePrompt\": \"$NEGATIVE_PROMPT\",
      \"personGeneration\": \"$PERSON_GENERATION\"
    }
  }")

# Check if request was successful
if echo "$RESPONSE" | grep -q "error"; then
  echo "Error: API request failed"
  echo "$RESPONSE" | jq '.'
  exit 1
fi

# Extract operation name for polling
OPERATION_NAME=$(echo "$RESPONSE" | jq -r '.name')

if [ "$OPERATION_NAME" = "null" ] || [ -z "$OPERATION_NAME" ]; then
  echo "Error: Could not extract operation name from response"
  echo "$RESPONSE" | jq '.'
  exit 1
fi

echo "Video generation started successfully!"
echo "Operation ID: $OPERATION_NAME"
echo ""
echo "To check the status, run:"
echo "curl -H \"x-goog-api-key: \$GEMINI_API_KEY\" \"$BASE_URL/$OPERATION_NAME\""
echo ""
echo "The video will be available once the operation completes."
echo "Typical generation time: 2-5 minutes"

# Save operation details to file
echo "$OPERATION_NAME" >veo3_operation.txt
echo "Operation ID saved to veo3_operation.txt"

