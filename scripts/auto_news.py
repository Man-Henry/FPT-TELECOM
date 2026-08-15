import os
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tin_tuc_dir = os.path.join(root_dir, 'tin-tuc')
index_file = os.path.join(root_dir, 'index.html')
tin_tuc_index = os.path.join(tin_tuc_dir, 'index.html')
sitemap_file = os.path.join(root_dir, 'news-sitemap.xml')

def fetch_fpt_news():
    url = "https://fpt.vn/tin-tuc"
    print(f"Fetching {url}...")
    requests.packages.urllib3.disable_warnings()
    res = requests.get(url, verify=False, timeout=15)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, 'html.parser')
    
    articles = []
    title_links = soup.find_all('a', class_='title', href=re.compile(r'/tin-tuc/'))
    
    for a in title_links:
        href = a.get('href')
        if not href.startswith('http'):
            href = 'https://fpt.vn' + href
        href = href.split('?')[0]
        title = a.get('title') or a.text.strip()
        
        img_src = ""
        curr = a.parent
        for _ in range(3):
            if curr:
                img = curr.find('img')
                if img:
                    img_src = img.get('data-original') or img.get('src') or img.get('data-src') or ""
                    break
                curr = curr.parent
        
        if not img_src or "logo" in img_src:
            img_src = "../assets/images/fptlogo.png"
            
        if not img_src.startswith('http') and img_src.startswith('/'):
            img_src = 'https://fpt.vn' + img_src
            
        slug = href.split('/')[-1].replace('.html', '')
        
        if title and slug and slug not in [ar['slug'] for ar in articles]:
            articles.append({
                'title': title,
                'link': href,
                'image': img_src,
                'slug': slug
            })
            
        if len(articles) >= 3:
            break
            
    return articles

def create_local_page(article):
    slug_dir = os.path.join(tin_tuc_dir, article['slug'])
    os.makedirs(slug_dir, exist_ok=True)
    file_path = os.path.join(slug_dir, 'index.html')
    
    if os.path.exists(file_path):
        return False
        
    date_str = datetime.now().strftime("%d/%m/%Y")
    
    html = f"""<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>{article['title']} - FPT Telecom</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet">
  <meta name="description" content="{article['title']} - Thông tin mới nhất từ FPT Telecom">
  <link rel="canonical" href="https://fpttelecomvn.click/tin-tuc/{article['slug']}/">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <link rel="stylesheet" href="../../css/styles.min.css?v=26">
  <link rel="icon" type="image/png" sizes="32x32" href="../../assets/images/fptlogo.png">
</head>
<body>
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
      <a href="/FPT-TELECOM/tin-tuc/" class="active">Tin tức</a>
      <a href="/FPT-TELECOM/lien-he/">Liên hệ</a>
    </nav>
    <a class="btn btn-orange header-cta" href="/FPT-TELECOM/lien-he/">Đăng ký ngay <span>→</span></a>
  </header>

  <main style="min-height: 70vh; background: #f8fafc; padding-bottom: 80px;">
    
    <!-- Hero Banner -->
    <section style="background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%); color: white; padding: 60px 24px; text-align: center; margin-bottom: 50px;">
      <div class="countdown-timer">⏰ Ưu đãi kết thúc sau: <span class="countdown-time">Đang tính...</span></div>
      <p class="eyebrow" style="color: #cbd8ef; letter-spacing: 2px;">TIN TỨC & SỰ KIỆN</p>
      <h1 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 20px; max-width: 900px; margin-left: auto; margin-right: auto; line-height: 1.4;">{article['title']}</h1>
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
        <span style="background: rgba(255,255,255,0.2); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">Tin Tức FPT</span>
        <span style="color: #cbd8ef; font-size: 13px;">📅 {date_str}</span>
      </div>
    </section>

    <div style="max-width: 900px; margin: -60px auto 0; padding: 0 20px; position: relative; z-index: 10;">
      
      <!-- Article Card -->
      <article style="background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.08); margin-bottom: 50px;">
        <div style="width: 100%; aspect-ratio: 16/9; overflow: hidden; position: relative;">
          <img src="{article['image']}" alt="{article['title']}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        
        <div style="padding: 40px;">
          <p style="font-size: 1.15rem; color: var(--text); line-height: 1.8; margin-bottom: 30px;">Đây là bài viết được tổng hợp từ chuyên trang tin tức chính thức của FPT Telecom. Để xem đầy đủ hình ảnh, video và các thông tin chi tiết nhất, quý khách vui lòng truy cập trực tiếp vào bài gốc.</p>
          
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 30px; border-radius: 16px; text-align: center; border: 1px solid #e2e8f0;">
              <h3 style="margin-bottom: 15px; color: var(--navy); font-size: 1.3rem;">Tiếp tục đọc trên FPT.vn</h3>
              <p style="color: #64748b; margin-bottom: 24px; font-size: 1rem;">Hệ thống sẽ chuyển hướng bạn đến trang bài viết gốc an toàn.</p>
              <a href="{article['link']}" class="btn" target="_blank" rel="noopener noreferrer" style="background: var(--blue); color: #fff; padding: 14px 36px; border-radius: 8px; font-weight: 600; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(6, 101, 245, 0.3);">
                <span>Đọc bài gốc ngay</span>
                <span>→</span>
              </a>
          </div>
        </div>
      </article>

      <!-- Internal SEO Links -->
      <div style="margin-top: 60px;">
        <h3 style="font-size: 1.3rem; margin-bottom: 15px; color: var(--navy); border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Dịch Vụ Nổi Bật</h3>
        <div class="chips" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 30px;">
          <a href="/FPT-TELECOM/lap-wifi/" style="text-decoration: none;"><span>Lắp WiFi FPT</span></a>
          <a href="/FPT-TELECOM/wifi-fpt/" style="text-decoration: none;"><span>Cáp quang FPT</span></a>
          <a href="/FPT-TELECOM/khuyen-mai/" style="text-decoration: none;"><span>Khuyến Mãi Tháng Này</span></a>
          <a href="/FPT-TELECOM/truyen-hinh/" style="text-decoration: none;"><span>Truyền Hình FPT</span></a>
        </div>
      </div>
      
    </div>
  </main>
  <footer style="background: var(--navy); padding: 40px 20px 20px;">
    <div class="footer-bottom" style="text-align: center; color: rgba(255,255,255,0.7); font-size: 13px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
      <p>© 2026 FPT Telecom - Đại lý ủy quyền | Vận hành bởi Trần Văn Mẫn</p>
    </div>
  </footer>
</body>
</html>"""
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    return True

def update_tin_tuc_index(article):
    with open(tin_tuc_index, 'r', encoding='utf-8') as f:
        content = f.read()
        
    date_str = datetime.now().strftime("%d/%m/%Y")
    new_card = f'''          <article class="article-card">
            <div class="article-card-img">
              <a href="/FPT-TELECOM/tin-tuc/{article['slug']}/">
                <img src="{article['image']}" alt="{article['title']}" width="400" height="250" loading="lazy" decoding="async">
              </a>
              <span class="article-card-tag">Tin FPT</span>
            </div>
            <div class="article-card-body">
              <h3><a href="/FPT-TELECOM/tin-tuc/{article['slug']}/">{article['title']}</a></h3>
              <p>Đọc bài viết chi tiết được cập nhật từ FPT.vn...</p>
              <div class="article-card-footer">
                <span>📅 {date_str}</span>
                <a href="/FPT-TELECOM/tin-tuc/{article['slug']}/" class="read-more">Đọc tiếp →</a>
              </div>
            </div>
          </article>\n'''
          
    if article['slug'] not in content:
        pattern = '<!-- AUTO_NEWS_MARKER -->'
        
        if pattern in content:
            parts = content.split(pattern)
            grid_content = parts[1].split('</section>')[0]
            
            # Count existing cards
            cards = grid_content.split('</article>')
            cards = [c for c in cards if '<article' in c]
            
            if len(cards) >= 6:
                last_card = cards[-1] + '</article>'
                content = content.replace(last_card, '')
                
            content = content.replace(pattern, pattern + '\n' + new_card)
            with open(tin_tuc_index, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated tin-tuc/index.html with {article['slug']}")
        else:
            print("AUTO_NEWS_MARKER not found in tin-tuc/index.html")

def update_home_index(article):
    with open(index_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    date_str = datetime.now().strftime("%d/%m/%Y")
    new_card = f'''        <article class="news-card" style="background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
          <div class="news-img" style="margin-bottom: 16px;">
            <a href="/FPT-TELECOM/tin-tuc/{article['slug']}/">
              <img src="{article['image']}" alt="{article['title']}" loading="lazy" style="width: 100%; border-radius: 8px; aspect-ratio: 16/9; object-fit: cover;">
            </a>
          </div>
          <div class="news-content" style="flex-grow: 1; display: flex; flex-direction: column;">
            <p class="news-date" style="color: #64748b; font-size: 0.85rem; margin-bottom: 8px;">{date_str}</p>
            <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 12px; flex-grow: 1;"><a href="/FPT-TELECOM/tin-tuc/{article['slug']}/" style="color: inherit; text-decoration: none;">{article['title']}</a></h3>
            <p style="color: #475569; font-size: 0.9rem; margin-bottom: 16px;">Đọc bài viết chi tiết tại trang chính thức của FPT.vn...</p>
            <a href="/FPT-TELECOM/tin-tuc/{article['slug']}/" style="color: #ff6500; font-weight: 600; font-size: 0.9rem; text-decoration: none;">Đọc tiếp →</a>
          </div>
        </article>\n'''
        
    if article['slug'] not in content:
        pattern = '<div class="news-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto;">'
        if pattern in content:
            parts = content.split(pattern)
            grid_content = parts[1].split('</div>\n      <div style="text-align: center; margin-top: 30px;">')[0]
            
            # Count existing cards
            cards = grid_content.split('</article>')
            cards = [c for c in cards if '<article' in c]
            
            if len(cards) >= 3:
                last_card = cards[-1] + '</article>'
                content = content.replace(last_card, '')
                
            content = content.replace(pattern, pattern + '\n' + new_card)
            with open(index_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated index.html with {article['slug']}")
        else:
            print("news-grid pattern not found in index.html")

def update_sitemap(article):
    if not os.path.exists(sitemap_file):
        return
        
    with open(sitemap_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    url_loc = f"https://fpttelecomvn.click/tin-tuc/{article['slug']}/"
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
            print(f"Updated sitemap with {article['slug']}")

def main():
    articles = fetch_fpt_news()
    if not articles:
        print("No articles found.")
        return
        
    for article in articles:
        created = create_local_page(article)
        if created:
            print(f"Created new page for: {article['title']}")
            update_tin_tuc_index(article)
            update_home_index(article)
            update_sitemap(article)
        else:
            # Maybe the page existed but wasn't in index files
            update_tin_tuc_index(article)
            update_home_index(article)
            print(f"Article already exists: {article['title']}")

if __name__ == "__main__":
    main()
