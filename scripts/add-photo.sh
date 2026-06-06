#!/bin/bash
# Usage: ./scripts/add-photo.sh <input-file> <YYYYMMDD-NNN> [camera] [film]
#
# Example:
#   ./scripts/add-photo.sh ~/Desktop/scan1.jpg 20260606-001 "Yashica A" "Kodak Gold 120"

set -e

INPUT="$1"
SLUG="$2"
CAMERA="${3:-}"
FILM="${4:-}"

if [ -z "$INPUT" ] || [ -z "$SLUG" ]; then
  echo "Usage: $0 <input-file> <YYYYMMDD-NNN> [camera] [film]"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "Error: file not found: $INPUT"
  exit 1
fi

TMPDIR=$(mktemp -d)
WEB_FILE="$TMPDIR/${SLUG}-web.jpg"
ORIG_FILE="$TMPDIR/${SLUG}-orig.jpg"

echo "Creating web version (1400px, 85% quality)..."
sips -Z 1400 -s format jpeg -s formatOptions 85 "$INPUT" --out "$WEB_FILE" > /dev/null

echo "Creating full-size version..."
sips -s format jpeg -s formatOptions best "$INPUT" --out "$ORIG_FILE" > /dev/null

echo "Uploading to S3..."
aws s3 cp "$WEB_FILE" "s3://tylerhext-site-images/film/${SLUG}-web.jpg"
aws s3 cp "$ORIG_FILE" "s3://tylerhext-site-images/film/${SLUG}-orig.jpg"

rm -rf "$TMPDIR"

YEAR="${SLUG:0:4}"
MONTH="${SLUG:4:2}"
DAY="${SLUG:6:2}"

echo ""
echo "Done. Add this to the TOP of src/_data/photos.json:"
echo ""
echo "  {"
echo "    \"filename\": \"${SLUG}\","
echo "    \"date\": \"${YEAR}-${MONTH}-${DAY}\","
echo "    \"camera\": \"${CAMERA}\","
echo "    \"film\": \"${FILM}\","
echo "    \"alt\": \"\""
echo "  },"
