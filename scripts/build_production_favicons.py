import os
from PIL import Image, ImageFilter, ImageOps, ImageDraw

def build_production_assets():
    src_path = "public/blacklogo.png"
    if not os.path.exists(src_path):
        src_path = "public/logo.png"
        
    img = Image.open(src_path).convert("RGBA")
    _, _, _, alpha = img.split()
    mask = alpha.point(lambda p: 255 if p > 50 else 0)
    bbox = mask.getbbox()
    cropped_alpha = alpha.crop(bbox)
    
    # 512x512 Master Canvas
    canvas_size = 512
    target_height = 410
    dilation_size = 9
    radius = 96
    bg_color = (10, 10, 13, 255) # Deep luxury obsidian
    fg_color = (255, 255, 255, 255) # Pure crisp white
    
    # Calculate aspect ratio
    aspect = cropped_alpha.width / cropped_alpha.height
    target_width = int(target_height * aspect)
    
    resized_mask = cropped_alpha.resize((target_width, target_height), Image.Resampling.LANCZOS)
    dilated = resized_mask.filter(ImageFilter.MaxFilter(dilation_size))
    dilated = dilated.filter(ImageFilter.GaussianBlur(0.6))
    dilated = dilated.point(lambda p: min(255, int(p * 1.6)))
    
    # Master 512x512 Icon
    master = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(master)
    draw.rounded_rectangle([0, 0, canvas_size, canvas_size], radius=radius, fill=bg_color)
    
    offset_x = (canvas_size - target_width) // 2
    offset_y = (canvas_size - target_height) // 2
    
    fg_layer = Image.new("RGBA", (target_width, target_height), fg_color)
    master.paste(fg_layer, (offset_x, offset_y), dilated)
    
    # Apple Touch Icon: 180x180 (iOS fills background if transparent, so make background solid square/full bleed)
    apple_canvas = Image.new("RGBA", (canvas_size, canvas_size), bg_color)
    apple_canvas.paste(fg_layer, (offset_x, offset_y), dilated)
    apple_touch_icon = apple_canvas.resize((180, 180), Image.Resampling.LANCZOS)
    
    # Generate all required production formats and sizes
    targets = {
        # App Router dynamic/static convention files
        "src/app/icon.png": master,
        "src/app/apple-icon.png": apple_touch_icon,
        
        # Public directory static files
        "public/icon-512x512.png": master,
        "public/icon-192x192.png": master.resize((192, 192), Image.Resampling.LANCZOS),
        "public/favicon-96x96.png": master.resize((96, 96), Image.Resampling.LANCZOS),
        "public/favicon-48x48.png": master.resize((48, 48), Image.Resampling.LANCZOS),
        "public/apple-touch-icon.png": apple_touch_icon,
    }
    
    for path, image in targets.items():
        image.save(path, "PNG")
        print(f"Saved: {path}")
        
    # Generate multi-size ICO files
    master.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    master.save("src/app/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Saved: public/favicon.ico and src/app/favicon.ico")

    # Generate a side-by-side comparison image for the user
    comp = Image.new("RGBA", (640, 240), (248, 249, 250, 255))
    cdraw = ImageDraw.Draw(comp)
    
    # Left side: Old Icon in Search Result
    cdraw.text((40, 20), "BEFORE: Previous Wireframe Icon", fill=(100, 105, 115, 255))
    cdraw.ellipse([40, 50, 104, 114], fill=(255, 255, 255, 255), outline=(218, 220, 224, 255), width=2)
    # Old icon small
    old_icon = Image.open("public/test_preview_old.png")
    # paste old simulation
    comp.paste(old_icon.crop((10, 10, 70, 70)), (42, 52))
    
    cdraw.rounded_rectangle([120, 60, 280, 74], radius=3, fill=(32, 33, 36, 255))
    cdraw.rounded_rectangle([120, 84, 230, 94], radius=3, fill=(95, 99, 104, 255))
    cdraw.text((40, 130), "• Faint, washed-out hairline lines\n• Dissolves against Google's white circle", fill=(190, 50, 50, 255))
    
    # Right side: New Icon in Search Result
    cdraw.text((360, 20), "AFTER: High-Contrast Luxury Tile", fill=(100, 105, 115, 255))
    cdraw.ellipse([360, 50, 424, 114], fill=(255, 255, 255, 255), outline=(218, 220, 224, 255), width=2)
    new_small = master.resize((46, 46), Image.Resampling.LANCZOS)
    comp.paste(new_small, (369, 59), new_small)
    
    cdraw.rounded_rectangle([440, 60, 600, 74], radius=3, fill=(32, 33, 36, 255))
    cdraw.rounded_rectangle([440, 84, 550, 94], radius=3, fill=(95, 99, 104, 255))
    cdraw.text((360, 130), "• Crisp, bold high-contrast strokes\n• Distinct obsidian tile standout (like LinkedIn)", fill=(30, 130, 60, 255))
    
    comp.save("public/favicon_comparison.png")
    print("Saved comparison image: public/favicon_comparison.png")

if __name__ == "__main__":
    build_production_assets()
