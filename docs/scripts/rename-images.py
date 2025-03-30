import os
import glob
import re

# Directory containing the image files
image_dir = "content/images/grow-logs"

# Patterns to match
patterns = [
    os.path.join(image_dir, "pomegranate*.jpg"),
    os.path.join(image_dir, "pomegranate*.png")
]

# Count for tracking
renamed_count = 0

# Process each pattern
for pattern in patterns:
    # Find all matching files
    for old_path in glob.glob(pattern):
        # Create the new filename by replacing pomegranate with p-granatum
        filename = os.path.basename(old_path)
        new_filename = filename.replace("pomegranate", "p-granatum")
        new_path = os.path.join(os.path.dirname(old_path), new_filename)
        
        # Rename the file
        os.rename(old_path, new_path)
        renamed_count += 1
        print(f"Renamed: {filename} → {new_filename}")

print(f"\nCompleted! {renamed_count} files renamed.")