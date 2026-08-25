import numpy as np
from PIL import Image
from scipy import ndimage

def generate_variants():
    img = Image.open('public/slim&shine.jpeg').convert('RGB')
    arr = np.array(img, dtype=np.float32)
    h, w, _ = arr.shape

    r = arr[:, :, 0]
    g = arr[:, :, 1]
    b = arr[:, :, 2]
    max_c = arr.max(axis=-1)
    color_diff = max_c - arr.min(axis=-1)
    
    # Restrict to logo vertical band
    band_mask = np.zeros((h, w), dtype=bool)
    band_mask[590:990, :] = True

    # 1. Identify Gold vs White/Text elements
    # Gold elements have strong color difference (R > B + 18) and warmth
    gold_seed = band_mask & ((color_diff > 18) | ((r > 60) & (b < 45)))
    
    # White / Light elements have low color difference but brightness > 55
    white_seed = band_mask & (~gold_seed) & (max_c > 55)
    
    # Dilate seeds for anti-aliasing
    kernel = np.ones((5, 5), dtype=bool)
    gold_zone = ndimage.binary_dilation(gold_seed, structure=kernel, iterations=2) & band_mask
    white_zone = ndimage.binary_dilation(white_seed, structure=kernel, iterations=2) & band_mask
    
    # Alpha for gold:
    alpha_gold = np.clip((max_c - 30.0) / 45.0, 0.0, 1.0)
    alpha_gold = alpha_gold * alpha_gold * (3.0 - 2.0 * alpha_gold)
    # Extra boost for vibrant gold
    alpha_gold = np.maximum(alpha_gold, np.clip(color_diff / 25.0, 0.0, 1.0))
    alpha_gold[~gold_zone] = 0.0
    
    # Alpha for white/ink elements:
    alpha_white = np.clip((max_c - 36.0) / 45.0, 0.0, 1.0)
    alpha_white = alpha_white * alpha_white * (3.0 - 2.0 * alpha_white)
    alpha_white[~white_zone] = 0.0
    
    # Combined alpha
    combined_alpha = np.maximum(alpha_gold, alpha_white)
    
    # Crop bounds
    crop_mask = combined_alpha > 0.05
    y_idx, x_idx = np.where(crop_mask)
    margin = 35
    y_min = max(0, y_idx.min() - margin)
    y_max = min(h, y_idx.max() + margin)
    x_min = max(0, x_idx.min() - margin)
    x_max = min(w, x_idx.max() + margin)

    # Variant A: Dark text + Gold SHINE (Optimized for light UI cards / website)
    # White parts become sleek dark ink [24, 24, 27]
    dark_rgb = np.zeros((h, w, 3), dtype=np.float32)
    # Base dark ink for text elements
    dark_ink = np.array([24, 24, 27], dtype=np.float32)
    for c in range(3):
        dark_rgb[:, :, c] = dark_ink[c]
    
    # Gold parts retain rich restored gold gradient
    restored_gold = arr.copy()
    for c in range(3):
        restored_gold[:, :, c] = np.clip(arr[:, :, c] / np.maximum(alpha_gold ** 0.85, 0.25), 0, 255)
        dark_rgb[:, :, c] = np.where(gold_zone, restored_gold[:, :, c], dark_rgb[:, :, c])

    rgba_dark = np.dstack([dark_rgb.astype(np.uint8), (combined_alpha * 255).astype(np.uint8)])
    img_dark = Image.fromarray(rgba_dark, mode='RGBA').crop((x_min, y_min, x_max, y_max))
    img_dark.save('public/slim-shine.png', 'PNG')
    img_dark.save('public/slim&shine.png', 'PNG')
    print("Saved public/slim-shine.png (dark text + gold)")

    # Variant B: White text + Gold SHINE (for dark mode backgrounds)
    white_rgb = np.full((h, w, 3), 255, dtype=np.float32)
    for c in range(3):
        white_rgb[:, :, c] = np.where(gold_zone, restored_gold[:, :, c], 255)
        
    rgba_white = np.dstack([white_rgb.astype(np.uint8), (combined_alpha * 255).astype(np.uint8)])
    img_white = Image.fromarray(rgba_white, mode='RGBA').crop((x_min, y_min, x_max, y_max))
    img_white.save('public/slim-shine-white.png', 'PNG')
    print("Saved public/slim-shine-white.png (white text + gold)")

if __name__ == '__main__':
    generate_variants()
