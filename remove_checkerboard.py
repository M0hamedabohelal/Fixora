import sys
import subprocess

try:
    from PIL import Image, ImageDraw
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw

def remove_checkerboard():
    img_path = r"e:\D\VS-Code\Fixora\src\assets\Gemini_Generated_Image_iqgtariqgtariqgt (1).png"
    out_path = r"e:\D\VS-Code\Fixora\public\logo.png"

    try:
        img = Image.open(img_path).convert("RGBA")
        width, height = img.size
        
        # Sample the top-left 20x20 area to find the two checkerboard colors
        colors = {}
        for x in range(20):
            for y in range(20):
                c = img.getpixel((x, y))
                if c not in colors:
                    colors[c] = 0
                colors[c] += 1
                
        # Sort colors by frequency
        sorted_colors = sorted(colors.items(), key=lambda item: item[1], reverse=True)
        
        # The checkerboard has 2 main colors
        bg_colors = [sorted_colors[0][0]]
        if len(sorted_colors) > 1:
            bg_colors.append(sorted_colors[1][0])
            
        print(f"Detected background colors: {bg_colors}")
        
        tolerance = 20
        
        datas = img.getdata()
        new_data = []
        for item in datas:
            is_bg = False
            for bg in bg_colors:
                if (abs(item[0] - bg[0]) <= tolerance and
                    abs(item[1] - bg[1]) <= tolerance and
                    abs(item[2] - bg[2]) <= tolerance):
                    is_bg = True
                    break
            
            if is_bg:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        
        # Crop tight
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            
        img.save(out_path, "PNG")
        print("Checkerboard removed successfully!")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    remove_checkerboard()
