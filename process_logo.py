import sys
try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

input_path = r"C:\Users\soura\.gemini\antigravity\brain\8d6b970c-ac05-4017-b323-2bc0aad43016\.user_uploaded\media_1789585303049.jpg"
output_path = r"C:\Users\soura\OneDrive\Documents\desktop\flowstate-website\public\logo.png"

img = Image.open(input_path).convert("RGBA")
datas = img.getdata()

new_data = []
for item in datas:
    brightness = sum(item[:3]) / 3
    if brightness > 180:
        new_data.append((255, 255, 255, 0))
    else:
        # Smooth alpha
        alpha = int((255 - brightness) * 1.5)
        if alpha > 255: alpha = 255
        new_data.append((244, 242, 247, alpha))

img.putdata(new_data)

bbox = img.getbbox()
if bbox:
    # Add a bit of padding
    padding = 20
    bbox = (max(0, bbox[0]-padding), max(0, bbox[1]-padding), min(img.width, bbox[2]+padding), min(img.height, bbox[3]+padding))
    img = img.crop(bbox)

img.save(output_path, "PNG")
print("Saved logo.png")
