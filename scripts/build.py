import os
import json

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(root_dir, 'data')

def load_json(filename):
    with open(os.path.join(data_dir, filename), 'r', encoding='utf-8') as f:
        return json.load(f)

locations = load_json('locations.json')
services = load_json('services.json')

location_template = """<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large">
  <link rel="canonical" href="https://fpttelecomvn.click/khu-vuc/{slug}/">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../css/styles.min.css?v=24">
  <link rel="icon" type="image/png" sizes="32x32" href="../../assets/images/fptlogo.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../../assets/images/fptlogo.png">

  <!-- SEO Schema -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "{title}",
    "url": "https://fpttelecomvn.click/khu-vuc/{slug}/",
    "description": "{description}"
  }}
  </script>
</head>
<body>
  <div class="topbar">
    <span>⚡ Ưu đãi tháng này tại {name}: Tặng Voucher giảm giá &amp; miễn phí lắp đặt khi trả trước 6T/12T</span>
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
      <a href="/FPT-TELECOM/khu-vuc/" class="active">Khu vực</a>
      <a href="/FPT-TELECOM/tin-tuc/">Tin tức</a>
      <a href="/FPT-TELECOM/lien-he/">Liên hệ</a>
    </nav>
    <a class="btn btn-orange header-cta" href="/FPT-TELECOM/lien-he/">Đăng ký ngay <span>→</span></a>
  </header>

  <main style="padding: 100px 24px 60px; max-width: 1200px; margin: 0 auto; min-height: 60vh;">
    <nav class="breadcrumb" style="margin-bottom: 24px; font-size: 14px;">
      <a href="/FPT-TELECOM/">Trang chủ</a> &rsaquo; <a href="/FPT-TELECOM/khu-vuc/">Khu vực</a> &rsaquo; <span>{name}</span>
    </nav>

    <h1 style="color: var(--primary); font-size: 2.5rem; margin-bottom: 16px;">Lắp Mạng FPT tại {name}</h1>
    <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text); margin-bottom: 40px;">{description}</p>
    
    <div style="margin-top: 60px; text-align: center;">
      <a href="/FPT-TELECOM/lien-he/" class="btn btn-primary" style="font-size: 1.2rem; padding: 16px 32px;">Đăng Ký Tư Vấn Miễn Phí</a>
    </div>
  </main>

  <footer style="margin-top: 60px;">
    <div class="footer-main">
      <div class="footer-brand">
        <p>Giải pháp viễn thông và công nghệ hàng đầu Việt Nam.</p>
            </div>
      <div class="footer-links" style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start; min-width: 150px; margin-right: 40px;">
        <p style="font-size: 14px; font-weight: 700; color: #fff; margin: 0;">Dịch Vụ FPT</p>
        <a href="/FPT-TELECOM/lap-wifi/">Lắp WiFi FPT</a>
        <a href="/FPT-TELECOM/truyen-hinh/">Truyền hình FPT</a>
        <a href="/FPT-TELECOM/camera/">FPT Camera</a>
        <a href="/FPT-TELECOM/khuyen-mai/">Khuyến mãi</a>
      </div>
      <div class="footer-links">
        <a href="tel:0358513269">☎ 0358 513 269</a>
        <a href="tel:0383900321">☎ 0383 900 321</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 FPT Telecom - Đại lý ủy quyền | Vận hành bởi Trần Văn Mẫn</p>
    </div>
  </footer>
</body>
</html>"""

service_template = """<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large">
  <link rel="canonical" href="https://fpttelecomvn.click/{slug}/">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.min.css?v=24">
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/images/fptlogo.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../assets/images/fptlogo.png">

  <!-- SEO Schema -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "{name}",
    "serviceType": "Telecommunication",
    "provider": {{
      "@type": "Organization",
      "name": "FPT Telecom"
    }},
    "areaServed": "Vietnam",
    "description": "{description}",
    "url": "https://fpttelecomvn.click/{slug}/"
  }}
  </script>
</head>
<body>
  <div class="topbar">
    <span>⚡ Ưu đãi tháng này: Tặng Voucher giảm giá &amp; miễn phí lắp đặt khi trả trước 6T/12T</span>
    <a href="tel:0383900321">Hotline: <b>0383 900 321</b></a>
  </div>
  
  <header class="header">
    <a class="logo logo-image" href="/FPT-TELECOM/">
      <img src="../assets/images/logo.webp" alt="FPT Telecom" width="164" height="45">
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

  <main style="padding: 100px 24px 60px; max-width: 1200px; margin: 0 auto; min-height: 70vh;">
    <nav class="breadcrumb" style="margin-bottom: 24px; font-size: 14px;">
      <a href="/FPT-TELECOM/">Trang chủ</a> &rsaquo; <span>{name}</span>
    </nav>

    <h1 style="color: var(--primary); font-size: 2.5rem; margin-bottom: 16px;">{h1}</h1>
    
    <div style="font-size: 1.1rem; line-height: 1.8; color: var(--text); max-width: 900px;">
      <p style="margin-bottom: 20px;">{description}</p>
      {content}
    </div>
    
    <div style="margin-top: 50px;">
      <a href="/FPT-TELECOM/lien-he/" class="btn btn-primary" style="font-size: 1.2rem; padding: 16px 32px;">Đăng Ký Tư Vấn Ngay</a>
      <a href="/FPT-TELECOM/bang-gia/" class="outline-btn" style="font-size: 1.2rem; padding: 16px 32px; display: inline-block; margin-left: 16px; border: 2px solid var(--blue);">Xem Bảng Giá</a>
    </div>
  </main>

  <footer style="margin-top: 60px;">
    <div class="footer-main">
      <div class="footer-brand">
        <p>Giải pháp viễn thông và công nghệ hàng đầu Việt Nam.</p>
            </div>
      <div class="footer-links" style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start; min-width: 150px;">
        <p style="font-size: 14px; font-weight: 700; color: #fff; margin: 0;">Dịch Vụ FPT</p>
        <a href="/FPT-TELECOM/lap-wifi/">Lắp WiFi FPT</a>
        <a href="/FPT-TELECOM/truyen-hinh/">Truyền hình FPT</a>
        <a href="/FPT-TELECOM/camera/">FPT Camera</a>
        <a href="/FPT-TELECOM/khuyen-mai/">Khuyến mãi</a>
      </div>
      <div class="footer-links">
        <a href="tel:0358513269">☎ 0358 513 269</a>
        <a href="tel:0383900321">☎ 0383 900 321</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 FPT Telecom - Đại lý ủy quyền | Vận hành bởi Trần Văn Mẫn</p>
    </div>
  </footer>
</body>
</html>"""

def render_template(template, data):
    result = template
    for key, value in data.items():
        if value is not None:
            result = result.replace(f"{{{key}}}", str(value))
    return result

# Build locations
khuvuc_dir = os.path.join(root_dir, 'khu-vuc')
os.makedirs(khuvuc_dir, exist_ok=True)

for loc in locations:
    if loc.get('published'):
        loc_dir = os.path.join(khuvuc_dir, loc['slug'])
        os.makedirs(loc_dir, exist_ok=True)
        
        # Don't overwrite if exists (to protect the complex pricing tables I generated)
        file_path = os.path.join(loc_dir, 'index.html')
        if not os.path.exists(file_path):
            title = loc.get('title', f"Lắp mạng FPT {loc['name']} - Giá rẻ nhất")
            desc = loc.get('description', f"Lắp mạng cáp quang FPT tại {loc['name']}")
            html = render_template(location_template, {
                **loc,
                'title': title,
                'description': desc
            })
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"Generated location: {loc['slug']}")

# Build services
for srv in services:
    srv_dir = os.path.join(root_dir, srv['slug'])
    os.makedirs(srv_dir, exist_ok=True)
    
    file_path = os.path.join(srv_dir, 'index.html')
    if not os.path.exists(file_path):
        html = render_template(service_template, srv)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Generated service: {srv['slug']}")

print("Build completed successfully!")
