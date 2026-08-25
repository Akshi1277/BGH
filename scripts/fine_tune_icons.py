import os
from PIL import Image, ImageFilter, ImageOps, ImageDraw

def fine_tune_icons():
    src_path = "public/blacklogo.png"
    img = Image.open(src_path).convert("RGBA")
    _, _, _, alpha = img.split()
    mask = alpha.point(lambda p: 255 if p > 50 else 0)
    bbox = mask.getbbox()
    cropped_alpha = alpha.crop(bbox)
    
    def generate_icon(canvas_size=512, target_height=410, dilation_size=9, shape="squircle", bg_color=(10, 10, 12, 255), fg_color=(255, 255, 255, 255), radius=96):
        aspect = cropped_alpha.width / cropped_alpha.height
        target_width = int(target_height * aspect)
        
        resized_mask = cropped_alpha.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        if dilation_size > 0:
            dilated = resized_mask.filter(ImageFilter.MaxFilter(dilation_size))
            dilated = dilated.filter(ImageFilter.GaussianBlur(0.6))
            dilated = dilated.point(lambda p: min(255, int(p * 1.6)))
        else:
            dilated = resized_mask
            
        canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(canvas)
        
        if shape == "squircle":
            draw.rounded_rectangle([0, 0, canvas_size, canvas_size], radius=radius, fill=bg_color)
        elif shape == "circle":
            draw.ellipse([4, 4, canvas_size - 4, canvas_size - 4], fill=bg_color)
        elif shape == "square":
            draw.rectangle([0, 0, canvas_size, canvas_size], fill=bg_color)
            
        offset_x = (canvas_size - target_width) // 2
        offset_y = (canvas_size - target_height) // 2
        
        fg_layer = Image.new("RGBA", (target_width, target_height), fg_color)
        canvas.paste(fg_layer, (offset_x, offset_y), dilated)
        return canvas

    # Opt A: Squircle with dilation 9, target_height 410 (Strong, clear, balanced)
    optA = generate_icon(target_height=410, dilation_size=9, shape="squircle", radius=100)
    optA.save("public/optA_squircle_d9.png")

    # Opt B: Squircle with dilation 11, target_height 420 (Ultra bold)
    optB = generate_icon(target_height=420, dilation_size=11, shape="squircle", radius=100)
    optB.save("public/optB_squircle_d11.png")

    # Opt C: Full Square with dilation 9, target_height 420 (Maximum area fill)
    optC = generate_icon(target_height=420, dilation_size=9, shape="square")
    optC.save("public/optC_square_d9.png")

    # Opt D: Full Square with dilation 11, target_height 430 (Maximum punchiness)
    optD = generate_icon(target_height=430, dilation_size=11, shape="square")
    optD.save("public/optD_square_d11.png")

    def simulate_search_result(icon_img, output_path):
        canvas = Image.new("RGBA", (280, 80), (248, 249, 250, 255))
        draw = ImageDraw.Draw(canvas)
        
        # Google's 32x32 white circle badge
        draw.ellipse([20, 20, 60, 60], fill=(255, 255, 255, 255), outline=(218, 220, 224, 255), width=1)
        
        # Scale icon to 28x28
        small_icon = icon_img.resize((28, 28), Image.Resampling.LANCZOS)
        canvas.paste(small_icon, (26, 26), small_icon)
        
        # Text simulation
        draw.rounded_rectangle([72, 28, 240, 38], radius=2, fill=(32, 33, 36, 255))
        draw.rounded_rectangle([72, 44, 190, 52], radius=2, fill=(95, 99, 104, 255))
        
        canvas.save(output_path)

    simulate_search_result(optA, "public/test_search_optA.png")
    simulate_search_result(optB, "public/test_search_optB.png")
    simulate_search_result(optC, "public/test_search_optC.png")
    simulate_search_result(optD, "public/test_search_optD.png")

    print("Generated fine-tuned options!")

if __name__ == "__main__":
    fine_tune_icons()
