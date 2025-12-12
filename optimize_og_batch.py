from PIL import Image
import os

images = [
    {
        "source": r"C:/Users/King/.gemini/antigravity/brain/2ebf1624-c5c3-4c70-8e86-ca8f563cd978/og_home_main_v2_1765537905402.png",
        "target": r"C:/Users/King/.gemini/antigravity/brain/2ebf1624-c5c3-4c70-8e86-ca8f563cd978/og_home_v2.png"
    },
    {
        "source": r"C:/Users/King/.gemini/antigravity/brain/2ebf1624-c5c3-4c70-8e86-ca8f563cd978/og_pdf_tools_v2_1765537922361.png",
        "target": r"C:/Users/King/.gemini/antigravity/brain/2ebf1624-c5c3-4c70-8e86-ca8f563cd978/og_pdf_v2.png"
    }
]

TARGET_WIDTH = 1200
TARGET_HEIGHT = 630

for item in images:
    try:
        img = Image.open(item["source"])
        
        # Resize width to 1200
        width_ratio = TARGET_WIDTH / img.width
        new_height = int(img.height * width_ratio)
        resized_img = img.resize((TARGET_WIDTH, new_height), Image.Resampling.LANCZOS)
        
        # Center Crop to 630 height
        if new_height > TARGET_HEIGHT:
            top = (new_height - TARGET_HEIGHT) // 2
            bottom = top + TARGET_HEIGHT
            final_img = resized_img.crop((0, top, TARGET_WIDTH, bottom))
        else:
            final_img = resized_img

        final_img.save(item["target"])
        print(f"Saved optimized image to {item['target']}")
        
    except Exception as e:
        print(f"Error processing {item['source']}: {e}")
