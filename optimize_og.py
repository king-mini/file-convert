from PIL import Image

source_path = r"C:/Users/King/.gemini/antigravity/brain/2ebf1624-c5c3-4c70-8e86-ca8f563cd978/background_blur_cropped.png"
target_path = r"C:/Users/King/.gemini/antigravity/brain/2ebf1624-c5c3-4c70-8e86-ca8f563cd978/og_optimized.png"

try:
    img = Image.open(source_path)
    # Target dimensions
    TARGET_WIDTH = 1200
    TARGET_HEIGHT = 630
    
    # Resize width to 1200, maintaining aspect ratio
    width_ratio = TARGET_WIDTH / img.width
    new_height = int(img.height * width_ratio)
    resized_img = img.resize((TARGET_WIDTH, new_height), Image.Resampling.LANCZOS)
    
    print(f"Resized to {TARGET_WIDTH}x{new_height}")

    # Crop to 630 height.
    # Since it's a portrait, we want to keep the face (top).
    # But we don't want to be right at the absolute top edge if there's no headroom.
    # Let's crop from the center-top bias.
    # Center crop would be: top = (new_height - TARGET_HEIGHT) // 2
    # Top bias (keep top 10% then crop): 
    # Let's try to center the crop vertically but shift it up slightly to catch faces.
    
    # Calculate crop box
    if new_height > TARGET_HEIGHT:
        # Amount to remove
        diff = new_height - TARGET_HEIGHT
        # Remove 20% from top, 80% from bottom (preserve upper body)
        # Actually, faces are usually in the top 1/3. 
        # Let's start y=0 to keep full headroom?
        # The previous image was already cropped at the bottom, so the face might be relatively lower now?
        # No, I cropped the footer, so the face is proportionally higher.
        # Let's try cropping the middle-upper part.
        
        top = int(diff * 0.3) # Cut 30% of the excess from the top
        bottom = top + TARGET_HEIGHT
        
        # Ensure bounds
        if top < 0: top = 0
        if bottom > new_height: bottom = new_height
            
        final_img = resized_img.crop((0, top, TARGET_WIDTH, bottom))
    else:
        # Image is shorter than target (unlikely given previous steps), pad it?
        # Previous was ~839h * 1.17w = ~980h. So it is taller.
        final_img = resized_img

    final_img.save(target_path)
    print(f"Optimized image saved to {target_path}")
    
except Exception as e:
    print(f"Error: {e}")
