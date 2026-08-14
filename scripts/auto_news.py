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
        parent = a.find_parent('div')
        if parent:
            img = parent.find('img')
            if img:
                img_src = img.get('src') or img.get('data-src') or ""
        
        if not img_src:
            img_src = "https://fpt.vn/assets/images/logo.webp"
            
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
  <meta name="description" content="{article['title']} - Thông tin mới nhất từ FPT Telecom">
  <link rel="canonical" href="https://fpttelecomvn.click/tin-tuc/{article['slug']}/">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../css/styles.min.css?v=24">
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

  <main style="max-width: 800px; margin: 60px auto; padding: 0 24px; min-height: 60vh;">
    <p style="color: var(--muted); font-size: 13px;">Đăng ngày: {date_str}</p>
    <h1 style="color: var(--navy); margin-bottom: 24px;">{article['title']}</h1>
    <img src="{article['image']}" alt="{article['title']}" style="width: 100%; border-radius: 12px; margin-bottom: 30px;">
    
    <div style="background: #f8fafc; padding: 30px; border-radius: 12px; text-align: center; border: 1px solid var(--line);">
        <h3 style="margin-bottom: 15px;">Đọc toàn bộ bài viết này trên trang chính thức của FPT</h3>
        <p style="color: var(--muted); margin-bottom: 24px;">Bạn sẽ được chuyển hướng đến trang tin tức của FPT để đọc nội dung chi tiết nhất.</p>
        <a href="{article['link']}" class="btn btn-blue" target="_blank" rel="noopener noreferrer" style="width: auto; padding: 14px 30px;">Đọc ngay trên FPT.vn</a>
    </div>
  </main>

  <footer style="margin-top: 60px;">
    <div class="footer-bottom" style="text-align: center; padding: 24px; font-size: 13px;">
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
        parts = content.split('<div class="articles-grid">')
        if len(parts) > 1:
            content = parts[0] + '<div class="articles-grid">\n' + new_card + parts[1]
            with open(tin_tuc_index, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated tin-tuc/index.html with {article['slug']}")

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
