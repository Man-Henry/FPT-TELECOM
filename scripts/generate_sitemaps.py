import os
import json
from datetime import datetime

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(root_dir, 'data')

def load_json(filename):
    with open(os.path.join(data_dir, filename), 'r', encoding='utf-8') as f:
        return json.load(f)

locations = [loc for loc in load_json('locations.json') if loc.get('published')]
services = load_json('services.json')
articles = load_json('articles.json')

domain = "https://fpttelecomvn.click"
today = datetime.now().strftime("%Y-%m-%d")

# 1. Generate sitemap-pages.xml
pages_urls = [
    {'url': '/', 'priority': '1.0', 'changefreq': 'weekly'},
    {'url': '/tin-tuc/', 'priority': '0.9', 'changefreq': 'weekly'},
    {'url': '/bang-gia/', 'priority': '0.8', 'changefreq': 'monthly'},
    {'url': '/khu-vuc/', 'priority': '0.8', 'changefreq': 'monthly'},
    {'url': '/lien-he/', 'priority': '0.8', 'changefreq': 'monthly'},
]

for srv in services:
    pages_urls.append({'url': f"/{srv['slug']}/", 'priority': '0.9', 'changefreq': 'monthly'})

pages_xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for p in pages_urls:
    pages_xml += f"  <url>\n    <loc>{domain}{p['url']}</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>{p['changefreq']}</changefreq>\n    <priority>{p['priority']}</priority>\n  </url>\n"
pages_xml += '</urlset>'

with open(os.path.join(root_dir, 'sitemap-pages.xml'), 'w', encoding='utf-8') as f:
    f.write(pages_xml)

# 2. Generate sitemap-locations.xml
loc_xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for loc in locations:
    loc_xml += f"  <url>\n    <loc>{domain}/khu-vuc/{loc['slug']}/</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n"
loc_xml += '</urlset>'

with open(os.path.join(root_dir, 'sitemap-locations.xml'), 'w', encoding='utf-8') as f:
    f.write(loc_xml)

# 3. Generate sitemap-posts.xml
posts_xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for art in articles:
    if art.get('category') != 'off-topic':
        # Articles have been moved to /tin-tuc/
        posts_xml += f"  <url>\n    <loc>{domain}/tin-tuc/{art['slug']}/</loc>\n    <lastmod>{art.get('date', today)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n"
posts_xml += '</urlset>'

with open(os.path.join(root_dir, 'sitemap-posts.xml'), 'w', encoding='utf-8') as f:
    f.write(posts_xml)

# 4. Generate news-sitemap.xml (Google News format)
news_xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n'
for art in articles:
    if art.get('category') != 'off-topic' and '2026' in art.get('date', ''):
        news_xml += f"""  <url>
    <loc>{domain}/tin-tuc/{art['slug']}/</loc>
    <news:news>
      <news:publication>
        <news:name>FPT Telecom</news:name>
        <news:language>vi</news:language>
      </news:publication>
      <news:publication_date>{art.get('date', today)}</news:publication_date>
      <news:title>{art['title']}</news:title>
    </news:news>
  </url>\n"""
news_xml += '</urlset>'

with open(os.path.join(root_dir, 'news-sitemap.xml'), 'w', encoding='utf-8') as f:
    f.write(news_xml)

# 5. Generate sitemap-index.xml
index_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>{domain}/sitemap-pages.xml</loc>
    <lastmod>{today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{domain}/sitemap-locations.xml</loc>
    <lastmod>{today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{domain}/sitemap-posts.xml</loc>
    <lastmod>{today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{domain}/news-sitemap.xml</loc>
    <lastmod>{today}</lastmod>
  </sitemap>
</sitemapindex>"""

with open(os.path.join(root_dir, 'sitemap-index.xml'), 'w', encoding='utf-8') as f:
    f.write(index_xml)

# 6. Update robots.txt
robots_path = os.path.join(root_dir, 'robots.txt')
with open(robots_path, 'r', encoding='utf-8') as f:
    robots_content = f.read()

import re
robots_content = re.sub(r'Sitemap: https://fpttelecomvn\.click/sitemap\.xml', 'Sitemap: https://fpttelecomvn.click/sitemap-index.xml', robots_content)

if 'sitemap-index.xml' not in robots_content:
    robots_content += '\nSitemap: https://fpttelecomvn.click/sitemap-index.xml\n'

with open(robots_path, 'w', encoding='utf-8') as f:
    f.write(robots_content)

print("Sitemaps generated and robots.txt updated successfully.")
