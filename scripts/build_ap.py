import json
import os
from datetime import datetime

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_file = os.path.join(root_dir, 'data', 'access_points.json')
bang_gia_file = os.path.join(root_dir, 'bang-gia', 'index.html')
thiet_bi_dir = os.path.join(root_dir, 'thiet-bi', 'access-point')
sitemap_file = os.path.join(root_dir, 'sitemap-pages.xml')

def load_data():
    with open(data_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_grid_html(aps):
    html = '''    <!-- Access Point Section -->
    <section class="ap-section section" id="access-points" style="padding: 60px 24px; background: #fff;">
      <div class="section-head scroll-animate" style="text-align: center; margin-bottom: 40px;">
        <p class="eyebrow">THIẾT BỊ MỞ RỘNG SÓNG</p>
        <h2>Bộ phát WiFi (Access Point)</h2>
        <p style="color: #64748b; margin-top: 10px;">Phủ sóng toàn diện, không góc chết cho không gian rộng lớn.</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto;">
'''
    for ap in aps:
        html += f'''        <!-- AP Card -->
        <article class="scroll-animate" style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; text-align: center; transition: transform 0.3s, box-shadow 0.3s;">
          <div style="height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <img src="{ap['image']}" alt="{ap['name']}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>
          <h3 style="color: var(--primary); font-size: 1.25rem; margin-bottom: 12px;">{ap['name']}</h3>
          <div style="font-size: 1.5rem; font-weight: bold; color: #ff6500; margin-bottom: 20px;">{ap['price']}</div>
          <div style="flex-grow: 1;"></div>
          <a href="#contact" class="btn" style="width: 100%; border: 1px solid var(--primary); color: var(--primary); padding: 10px; border-radius: 8px;">Đăng ký mua</a>
        </article>\n'''

    html += '''      </div>
      <div style="text-align: center; margin-top: 30px;">
        <a href="/FPT-TELECOM/thiet-bi/access-point/" class="btn" style="border: 1px solid var(--primary); color: var(--primary); padding: 10px 24px; border-radius: 8px;">Xem chi tiết thông số</a>
      </div>
    </section>\n'''
    return html

def update_bang_gia(html_content):
    with open(bang_gia_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # If already has AP section, we replace it. Otherwise insert before contact section.
    if '<!-- Access Point Section -->' in content:
        parts = content.split('<!-- Access Point Section -->')
        end_parts = parts[1].split('</section>\n')
        # Reconstruct
        new_content = parts[0] + html_content + '</section>\n'.join(end_parts[1:])
    else:
        target = '    <section class="contact" id="contact">'
        if target in content:
            new_content = content.replace(target, html_content + '\n' + target)
        else:
            print("Could not find contact section in bang-gia/index.html")
            return

    with open(bang_gia_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated bang-gia/index.html")

def create_dedicated_page(aps):
    os.makedirs(thiet_bi_dir, exist_ok=True)
    page_file = os.path.join(thiet_bi_dir, 'index.html')
    
    html = f'''<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>Thiết Bị Access Point FPT - Phủ Sóng WiFi Toàn Diện</title>
  <meta name="description" content="Khám phá danh sách các thiết bị Access Point FPT, bộ phát WiFi 6 mở rộng sóng mạnh mẽ, tốc độ cao, giá rẻ.">
  <link rel="canonical" href="https://fpttelecomvn.click/thiet-bi/access-point/">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../css/styles.min.css?v=24">
  <link rel="icon" type="image/png" sizes="32x32" href="../../assets/images/fptlogo.png">
</head>
<body style="background: #f8fafc;">
  <div class="topbar">
    <span>⚡ Ưu đãi tháng này: Tặng Voucher giảm giá &amp; miễn phí lắp đặt khi trả trước 6T/12T</span>
    <a href="tel:0383900321">Hotline: <b>0383 900 321</b></a>
  </div>
  <header class="header">
    <a class="logo logo-image" href="/FPT-TELECOM/">
      <img src="../../assets/images/logo.webp" alt="FPT Telecom" width="164" height="45">
      <span class="auth-badge">Đại lý ủy quyền FPT</span>
    </a>
    <nav role="navigation">
      <a href="/FPT-TELECOM/">Trang chủ</a>
      <a href="/FPT-TELECOM/bang-gia/">Bảng giá</a>
      <a href="/FPT-TELECOM/khu-vuc/">Khu vực</a>
      <a href="/FPT-TELECOM/tin-tuc/">Tin tức</a>
      <a href="/FPT-TELECOM/lien-he/">Liên hệ</a>
    </nav>
    <a class="btn btn-orange header-cta" href="/FPT-TELECOM/lien-he/">Đăng ký ngay <span>→</span></a>
  </header>

  <main style="max-width: 1200px; margin: 100px auto 60px; padding: 0 24px; min-height: 60vh;">
    <div style="text-align: center; margin-bottom: 50px;">
      <h1 style="color: var(--navy); font-size: 2.5rem; margin-bottom: 16px;">Bộ Phát WiFi (Access Point) FPT</h1>
      <p style="color: var(--muted); font-size: 1.1rem; max-width: 700px; margin: 0 auto;">Giải pháp mở rộng vùng phủ sóng hoàn hảo cho căn hộ nhiều tầng, biệt thự, văn phòng, quán cafe. Tốc độ ổn định, không góc chết với công nghệ Wi-Fi 6 hiện đại.</p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px;">
'''
    for ap in aps:
        html += f'''      <!-- AP Card -->
      <article style="background: #fff; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); display: flex; flex-direction: column; text-align: center; position: relative; overflow: hidden; border-top: 4px solid var(--primary);">
        <div style="height: 220px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <img src="{ap['image']}" alt="{ap['name']}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
        </div>
        <h3 style="color: var(--primary); font-size: 1.4rem; font-weight: 700; margin-bottom: 12px;">{ap['name']}</h3>
        <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 20px;">Thiết bị mở rộng sóng chính hãng FPT</p>
        <div style="font-size: 1.8rem; font-weight: 800; color: #ff6500; margin-bottom: 24px;">{ap['price']}</div>
        <div style="flex-grow: 1;"></div>
        <a href="/FPT-TELECOM/lien-he/" class="btn btn-orange" style="width: 100%; padding: 14px; border-radius: 8px; font-weight: 600; text-transform: uppercase;">Mua ngay <span>→</span></a>
      </article>\n'''

    html += '''    </div>
  </main>

  <footer>
    <div class="footer-bottom" style="text-align: center; padding: 24px; font-size: 13px;">
      <p>© 2026 FPT Telecom - Đại lý ủy quyền | Vận hành bởi Trần Văn Mẫn</p>
    </div>
  </footer>
</body>
</html>'''

    with open(page_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Created thiet-bi/access-point/index.html")

def update_sitemap():
    if not os.path.exists(sitemap_file):
        return
        
    with open(sitemap_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    url_loc = "https://fpttelecomvn.click/thiet-bi/access-point/"
    if url_loc not in content:
        date_str = datetime.now().strftime("%Y-%m-%dT%H:%M:%S+07:00")
        new_url = f'''  <url>
    <loc>{url_loc}</loc>
    <lastmod>{date_str}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n'''
        parts = content.split('<urlset')
        if len(parts) > 1:
            header = parts[0] + '<urlset' + parts[1].split('>')[0] + '>\n'
            rest = content[len(header):]
            content = header + new_url + rest
            with open(sitemap_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {sitemap_file} with access point page")

def main():
    aps = load_data()
    grid_html = generate_grid_html(aps)
    update_bang_gia(grid_html)
    create_dedicated_page(aps)
    update_sitemap()

if __name__ == '__main__':
    main()
