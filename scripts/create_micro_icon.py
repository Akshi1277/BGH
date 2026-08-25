import os
from PIL import Image, ImageFilter, ImageOps, ImageDraw

def process_monogram():
    # Load source image
    src_path = "public/blacklogo.png"
    img = Image.open(src_path).convert("RGBA")
    
    # The true shape is in the alpha channel!
    _, _, _, alpha = img.split()
    
    # Binary mask of the monogram lines
    mask = alpha.point(lambda p: 255 if p > 50 else 0)
    
    # Get bounding box of the monogram
    bbox = mask.getbbox()
    print("Bounding box:", bbox)
    
    # Crop mask and alpha to bounding box
    cropped_alpha = alpha.crop(bbox)
    
    def create_tile(bg_color, fg_color, dilation_size=5, shape="squircle", canvas_size=512, target_height=360, outline_color=None):
        # Calculate aspect ratio
        aspect = cropped_alpha.width / cropped_alpha.height
        target_width = int(target_height * aspect)
        
        # High quality resize of mask
        resized_mask = cropped_alpha.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        # Dilate mask to make strokes solid and legible at 16x16
        if dilation_size > 0:
            # MaxFilter dilates white regions (strokes)
            dilated = resized_mask.filter(ImageFilter.MaxFilter(dilation_size))
            # Smooth the edges slightly
            dilated = dilated.filter(ImageFilter.GaussianBlur(0.8))
            dilated = dilated.point(lambda p: min(255, int(p * 1.5)))
        else:
            dilated = resized_mask
            
        # Create base canvas
        canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(canvas)
        
        # Draw background shape
        if shape == "circle":
            draw.ellipse([8, 8, canvas_size - 8, canvas_size - 8], fill=bg_color, outline=outline_color, width=2 if outline_color else 0)
        elif shape == "squircle":
            # Luxury rounded rectangle (Apple-style squircle)
            draw.rounded_rectangle([0, 0, canvas_size, canvas_size], radius=110, fill=bg_color, outline=outline_color, width=2 if outline_color else 0)
        elif shape == "square":
            draw.rectangle([0, 0, canvas_size, canvas_size], fill=bg_color)
            
        # Center monogram on canvas
        offset_x = (canvas_size - target_width) // 2
        offset_y = (canvas_size - target_height) // 2
        
        # Create foreground color layer
        fg_layer = Image.new("RGBA", (target_width, target_height), fg_color)
        canvas.paste(fg_layer, (offset_x, offset_y), dilated)
        
        return canvas

    # Candidate 1: Sleek Obsidian Squircle (#0B0B0E) with Crisp White Monogram (Dilation 5)
    v1 = create_tile(bg_color=(11, 11, 14, 255), fg_color=(255, 255, 255, 255), dilation_size=5, shape="squircle", target_height=360)
    v1.save("public/test_v1_obsidian_white_d5.png")

    # Candidate 2: Sleek Obsidian Squircle (#0B0B0E) with Extra Bold White Monogram (Dilation 7)
    v2 = create_tile(bg_color=(11, 11, 14, 255), fg_color=(255, 255, 255, 255), dilation_size=7, shape="squircle", target_height=360)
    v2.save("public/test_v2_obsidian_white_d7.png")

    # Candidate 3: Deep Emerald/BGH Charcoal (#0E1512) with Crisp White Monogram (Dilation 5)
    v3 = create_tile(bg_color=(14, 21, 18, 255), fg_color=(255, 255, 255, 255), dilation_size=5, shape="squircle", target_height=360)
    v3.save("public/test_v3_dark_emerald_white_d5.png")

    # Candidate 4: Obsidian Squircle with Warm Champagne Gold Monogram (#F3E8D2, Dilation 7)
    v4 = create_tile(bg_color=(11, 11, 14, 255), fg_color=(243, 232, 210, 255), dilation_size=7, shape="squircle", target_height=360)
    v4.save("public/test_v4_obsidian_champagne_d7.png")

    # Candidate 5: Full Bleed Square (fills the entire favicon canvas for ultra-sharp boundary)
    v5 = create_tile(bg_color=(10, 10, 12, 255), fg_color=(255, 255, 255, 255), dilation_size=7, shape="square", target_height=380)
    v5.save("public/test_v5_square_white_d7.png")

    # Simulate realistic Google Search desktop and mobile badge (white circle)
    def simulate_search_result(icon_img, output_path):
        # 160x160 preview canvas
        canvas = Image.new("RGBA", (240, 80), (248, 249, 250, 255))
        draw = ImageDraw.Draw(canvas)
        
        # Draw Google's 32x32 white circle badge with subtle border
        draw.ellipse([24, 24, 56, 56], fill=(255, 255, 255, 255), outline=(222, 226, 230, 255), width=1)
        
        # Scale icon to 24x24 px (typical inner icon display size)
        small_icon = icon_img.resize((24, 24), Image.Resampling.LANCZOS)
        canvas.paste(small_icon, (28, 28), small_icon)
        
        # Add mock search result text
        # (simulated text bars)
        draw.rounded_rectangle([72, 26, 210, 36], radius=2, fill=(32, 33, 36, 255))
        draw.rounded_rectangle([72, 42, 170, 50], radius=2, fill=(95, 99, 104, 255))
        
        canvas.save(output_path)

    simulate_search_result(v1, "public/test_search_preview_v1.png")
    simulate_search_result(v2, "public/test_search_preview_v2.png")
    simulate_search_result(v3, "public/test_search_preview_v3.png")
    simulate_search_result(v4, "public/test_search_preview_v4.png")
    simulate_search_result(v5, "public/test_search_preview_v5.png")

    old_icon = Image.open("src/app/icon.png").convert("RGBA")
    simulate_search_result(old_icon, "public/test_search_preview_old.png")

    print("Successfully generated all variants and realistic Google Search previews!")

if __name__ == "__main__":
    process_monogram()
