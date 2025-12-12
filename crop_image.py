from PIL import Image
import os

source_path = r"C:/Users/King/.gemini/antigravity/brain/2ebf1624-c5c3-4c70-8e86-ca8f563cd978/background_blur_comparison_1765536730505.png"
target_path = r"C:/Users/King/.gemini/antigravity/brain/2ebf1624-c5c3-4c70-8e86-ca8f563cd978/background_blur_cropped.png"

try:
    img = Image.open(source_path)
    width, height = img.size
    
    # Crop the bottom 20% (assuming the footer is roughly that size)
    # The user posted an image that looks like it has a significant footer.
    # Let's try cutting bottom 300 pixels if 1024 height, or ratio.
    # Comparison images are usually square-ish or 4:3. 
    # Let's crop to 80% height.
    new_height = int(height * 0.82) 
    
    cropped_img = img.crop((0, 0, width, new_height))
    cropped_img.save(target_path)
    print(f"Cropped image saved to {target_path}")
    print(f"Original size: {width}x{height}, New size: {width}x{new_height}")
except Exception as e:
    print(f"Error: {e}")
