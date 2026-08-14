import os
import re

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# -----------------
# REDESIGN BANG-GIA
# -----------------
bang_gia_path = os.path.join(root_dir, 'bang-gia', 'index.html')
with open(bang_gia_path, 'r', encoding='utf-8') as f:
    bg_content = f.read()

# Add Hero Banner
hero_bg = '''
    <!-- Hero Banner for Pricing -->
    <section style="background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%); color: white; padding: 60px 24px; text-align: center; margin-bottom: -30px; position: relative; z-index: 1;">
      <p class="eyebrow" style="color: #cbd8ef; letter-spacing: 2px;">GÓI CƯỚC LINH HOẠT</p>
      <h1 style="font-size: 2.8rem; font-weight: 800; margin-bottom: 20px;">Bảng Giá Cước Internet FPT 2026</h1>
      <p style="max-width: 600px; margin: 0 auto; color: #e2e8f0; font-size: 1.1rem; line-height: 1.6;">Chọn tốc độ phù hợp với bạn. Tất cả gói cước đều đi kèm modem WiFi 6 hiện đại và hỗ trợ kỹ thuật 24/7.</p>
    </section>
'''

# Remove old section-head
bg_content = re.sub(
    r'<div class="section-head scroll-animate">.*?</div>',
    '',
    bg_content,
    flags=re.DOTALL
)

# Inject hero right after main
bg_content = bg_content.replace('<main id="main-content">', '<main id="main-content" style="background: #f8fafc;">\n' + hero_bg)

# Add custom styling for pricing tabs and table
custom_css = '''
  <style>
    /* Custom Styling for Premium Feel */
    .tabs {
        display: flex; justify-content: center; gap: 15px; margin: 60px auto 40px; padding: 6px; 
        background: white; border-radius: 50px; width: fit-content; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .tab {
        padding: 12px 30px; border-radius: 50px; border: none; background: transparent; 
        color: #64748b; font-weight: 600; font-size: 15px; cursor: pointer; transition: all 0.3s ease;
    }
    .tab.active {
        background: var(--blue); color: white; box-shadow: 0 4px 12px rgba(6, 101, 245, 0.3);
    }
    .package-grid {
        padding-top: 20px;
    }
    .package {
        border-radius: 20px; border: none; box-shadow: 0 10px 30px rgba(0,0,0,0.06); transition: transform 0.3s ease, box-shadow 0.3s ease; background: white;
    }
    .package:hover {
        transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    }
    .package.recommended {
        border: 2px solid var(--blue); transform: scale(1.05); box-shadow: 0 15px 40px rgba(6,101,245,0.15);
    }
    .package.recommended:hover {
        transform: scale(1.05) translateY(-8px);
    }
    .ribbon {
        background: linear-gradient(135deg, #f97316, #ef4444); padding: 6px 20px; font-weight: bold; border-radius: 0 0 10px 10px;
    }
    .triple {
        background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;
    }
  </style>
'''
bg_content = bg_content.replace('</head>', custom_css + '\n</head>')

with open(bang_gia_path, 'w', encoding='utf-8') as f:
    f.write(bg_content)


# -----------------
# REDESIGN KHU-VUC
# -----------------
khu_vuc_path = os.path.join(root_dir, 'khu-vuc', 'index.html')
with open(khu_vuc_path, 'r', encoding='utf-8') as f:
    kv_content = f.read()

hero_kv = '''
    <!-- Hero Banner for Khu Vuc -->
    <section style="background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%); color: white; padding: 60px 24px; text-align: center; margin-bottom: 40px;">
      <p class="eyebrow" style="color: #cbd8ef; letter-spacing: 2px;">VÙNG PHỦ SÓNG</p>
      <h1 style="font-size: 2.8rem; font-weight: 800; margin-bottom: 20px;">Khám Phá Hạ Tầng FPT</h1>
      <p style="max-width: 600px; margin: 0 auto; color: #e2e8f0; font-size: 1.1rem; line-height: 1.6;">Hệ thống trạm Core và trạm BTS siêu tốc phủ khắp 63 tỉnh thành phố.</p>
    </section>
'''

kv_content = re.sub(
    r'<div class="section-head scroll-animate">.*?</div>',
    '',
    kv_content,
    flags=re.DOTALL
)

kv_content = kv_content.replace('<main id="main-content">', '<main id="main-content" style="background: #f8fafc; padding-bottom: 60px;">\n' + hero_kv)

custom_css_kv = '''
  <style>
    /* Glassmorphism Map Wrapper */
    .map3d-wrapper {
        background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 24px; padding: 20px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.08); margin: 0 auto 40px; max-width: 900px;
    }
    .map3d-wrap { border-radius: 16px; overflow: hidden; }
    
    /* Elegant Region Chips */
    .chips { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 30px; }
    .chips a {
        background: white; border-radius: 12px; padding: 16px 12px; text-align: center; font-weight: 600; color: var(--navy);
        box-shadow: 0 4px 12px rgba(0,0,0,0.04); border: 1px solid #e2e8f0; transition: all 0.3s ease; text-decoration: none;
        display: flex; flex-direction: column; align-items: center; gap: 8px;
    }
    .chips a::before { content: "📍"; font-size: 1.5rem; opacity: 0.8; }
    .chips a:hover {
        transform: translateY(-4px); box-shadow: 0 10px 20px rgba(6, 101, 245, 0.15); border-color: var(--blue); color: var(--blue);
    }
  </style>
'''
kv_content = kv_content.replace('</head>', custom_css_kv + '\n</head>')

# Wrap the map3d-wrap inside map3d-wrapper
kv_content = kv_content.replace('<div class="map3d-wrap" id="map3d-container"', '<div class="map3d-wrapper"><div class="map3d-wrap" id="map3d-container"')
# Close the wrapper before the next element
kv_content = kv_content.replace('      </div>\n      <div class="map3d-legend" style="margin-top:20px">', '      </div>\n      </div>\n      <div class="map3d-legend" style="margin-top:20px">')


with open(khu_vuc_path, 'w', encoding='utf-8') as f:
    f.write(kv_content)

print("Redesigned bang-gia and khu-vuc")
