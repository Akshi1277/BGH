import numpy as np
from PIL import Image

def process_image():
    img = Image.open('public/uniueagro.jpeg').convert('RGB')
    arr = np.array(img, dtype=np.float32)

    # Calculate brightness / max channel
    # Max channel is ideal because purple/magenta/pink has high R or B, while black has low in all 3.
    max_c = arr.max(axis=-1)
    
    # Let's inspect the noise in the pure background (e.g. top corners)
    corner_noise = arr[:100, :100].max()
    print(f"Max noise in corner: {corner_noise}")
    
    # Thresholds for smooth alpha transition:
    # Everything below low_th is completely transparent (alpha = 0)
    # Between low_th and high_th, alpha ramps smoothly
    # Above high_th, alpha is estimated or full opacity
    low_th = 6.0
    high_th = 18.0
    
    alpha = np.zeros_like(max_c)
    mask_ramp = (max_c >= low_th) & (max_c < high_th)
    mask_high = max_c >= high_th
    
    alpha[mask_ramp] = (max_c[mask_ramp] - low_th) / (high_th - low_th)
    alpha[mask_high] = 1.0
    
    # Smooth step for alpha ramp
    alpha[mask_ramp] = alpha[mask_ramp] * alpha[mask_ramp] * (3.0 - 2.0 * alpha[mask_ramp])
    
    # Un-premultiply RGB where alpha is in (0, 1] to restore original vibrant edge colors
    # without blowing up noise
    rgb = arr.copy()
    safe_alpha = np.clip(alpha, 0.2, 1.0)[:, :, np.newaxis]
    rgb = np.clip(rgb / safe_alpha, 0, 255)
    
    rgba = np.dstack([rgb.astype(np.uint8), (alpha * 255).astype(np.uint8)])
    
    out_img = Image.fromarray(rgba, mode='RGBA')
    out_img.save('public/uniueagro.png', 'PNG')
    out_img.save('public/uniueagro-transparent.png', 'PNG')
    print("Saved public/uniueagro.png and public/uniueagro-transparent.png")

if __name__ == '__main__':
    process_image()
