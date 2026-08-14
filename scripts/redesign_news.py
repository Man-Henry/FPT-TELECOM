import os

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tin_tuc_index = os.path.join(root_dir, 'tin-tuc', 'index.html')
main_index = os.path.join(root_dir, 'index.html')

with open(main_index, 'r', encoding='utf-8') as f:
    main_content = f.read()

# Extract head and header from index.html
header_part = main_content.split('<main')[0]

# Fix some relative links in header for tin-tuc
header_part = header_part.replace('href="assets/', 'href="../assets/')
header_part = header_part.replace('src="assets/', 'src="../assets/')
header_part = header_part.replace('href="css/', 'href="../css/')
header_part = header_part.replace('href="favicon.ico"', 'href="../favicon.ico"')
header_part = header_part.replace('<title>Lắp Mạng FPT', '<title>Tin Tức & Khuyến Mãi FPT')
header_part = header_part.replace('<meta name="description" content="Lắp mạng FPT', '<meta name="description" content="Tin Tức Khuyến Mãi FPT')

# Fix canonical
import re
header_part = re.sub(r'<link rel="canonical" href="[^"]+">', '<link rel="canonical" href="https://fpttelecomvn.click/tin-tuc/">', header_part)

# Also fix the "active" class on the navigation
header_part = header_part.replace('<a href="/FPT-TELECOM/" class="active">Trang chủ</a>', '<a href="/FPT-TELECOM/">Trang chủ</a>')
header_part = header_part.replace('<a href="/FPT-TELECOM/tin-tuc/">Tin tức</a>', '<a href="/FPT-TELECOM/tin-tuc/" class="active">Tin tức</a>')

footer_part = '''
  <footer class="footer" id="footer" style="margin-top: 60px;">
    <div class="footer-bottom" style="text-align: center; color: rgba(255,255,255,0.7); font-size: 13px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
      <p>© 2026 FPT Telecom - Đại lý ủy quyền | Vận hành bởi Trần Văn Mẫn</p>
    </div>
  </footer>
</body>
</html>
'''

new_main = '''<main style="padding-top: 80px; min-height: 70vh; background: #f8fafc;">
    <!-- Hero Banner for News -->
    <section style="background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%); color: white; padding: 60px 24px; text-align: center; margin-bottom: 50px;">
      <p class="eyebrow" style="color: #cbd8ef; letter-spacing: 2px;">TRUNG TÂM TIN TỨC</p>
      <h1 style="font-size: 2.8rem; font-weight: 800; margin-bottom: 20px;">Tin Tức & Khuyến Mãi FPT</h1>
      <p style="max-width: 600px; margin: 0 auto; color: #e2e8f0; font-size: 1.1rem; line-height: 1.6;">Khám phá các chương trình ưu đãi lắp mạng mới nhất, tin tức công nghệ và hướng dẫn sử dụng dịch vụ FPT Telecom.</p>
    </section>

    <div class="news-hub" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
      
      <!-- LATEST NEWS (Automated) -->
      <section class="category-section" id="latest-news" style="margin-bottom: 70px;">
        <div class="category-header" style="border-bottom: 3px solid #ff6500; margin-bottom: 30px; padding-bottom: 10px;">
          <h2 style="font-size: 1.8rem; display: flex; align-items: center; gap: 10px;">
            <span style="display: inline-block; width: 12px; height: 12px; background: #ff6500; border-radius: 50%; animation: pulse 2s infinite;"></span>
            Tin Mới Cập Nhật
          </h2>
        </div>
        
        <div id="latest-news-grid" class="articles-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px;">
          <!-- AUTO_NEWS_MARKER -->
        </div>
      </section>

      <!-- FEATURED STATIC ARTICLES -->
      <section class="category-section" id="featured-news" style="margin-bottom: 70px;">
        <div class="category-header" style="border-bottom: 3px solid var(--blue); margin-bottom: 30px; padding-bottom: 10px;">
          <h2 style="font-size: 1.5rem;"><span class="category-icon">⭐</span>Tiêu Điểm FPT</h2>
        </div>
        
        <article class="featured-article" data-category="internet" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
          <div class="featured-img" style="overflow: hidden; min-height: 320px;">
            <a href="/FPT-TELECOM/tin-tuc/lich-thi-dau-asean-cup-2026/">
              <img src="../assets/images/asiancup.webp" alt="Lịch Thi Đấu ASEAN Cup 2026 trên FPT Play" width="700" height="400" loading="eager" style="width: 100%; height: 100%; object-fit: cover;">
            </a>
          </div>
          <div class="featured-body" style="padding: 40px 32px; display: flex; flex-direction: column; justify-content: center;">
            <span class="featured-badge" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ef4444); color: white; font-size: 12px; font-weight: 700; padding: 5px 14px; border-radius: 20px; text-transform: uppercase; margin-bottom: 16px; width: fit-content;">🔥 Nổi bật</span>
            <h2 style="font-size: 1.6rem; font-weight: 800; line-height: 1.3; margin-bottom: 14px; color: var(--heading);"><a href="/FPT-TELECOM/tin-tuc/lich-thi-dau-asean-cup-2026/" style="color: inherit; text-decoration: none;">Lịch Thi Đấu ASEAN Cup 2026 – Xem Trực Tiếp Trên FPT Play</a></h2>
            <p style="color: #64748b; line-height: 1.7; margin-bottom: 20px;">Cập nhật lịch thi đấu lượt 2 ASEAN Hyundai Cup 2026 mới nhất: thời gian, các cặp đấu, bảng xếp hạng và cách xem trực tiếp qua FPT Play.</p>
            <span class="featured-meta" style="font-size: 13px; color: #94a3b8;">📅 01/08/2026 · FPT Telecom</span>
          </div>
        </article>
      </section>

      <!-- GUIDES & PRICING -->
      <section class="category-section" data-category="internet" style="margin-bottom: 70px;">
        <div class="category-header" style="border-bottom: 3px solid var(--blue); margin-bottom: 30px; padding-bottom: 10px;">
          <h2 style="font-size: 1.5rem;"><span class="category-icon">📖</span>Hướng Dẫn & Dịch Vụ</h2>
        </div>
        <div class="articles-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px;">
          <article class="article-card" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); display: flex; flex-direction: column;">
            <div class="article-card-img" style="position: relative; overflow: hidden; aspect-ratio: 16/10;">
              <a href="/FPT-TELECOM/tin-tuc/ngoai-hang-anh-2026-27-fpt-play/">
                <img src="../assets/images/epl_fpt_play_banner.webp" alt="Ngoại Hạng Anh 2026/27 trên FPT Play" width="400" height="250" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;">
              </a>
              <span class="article-card-tag" style="position: absolute; top: 12px; left: 12px; background: var(--navy); color: white; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">Truyền hình</span>
            </div>
            <div class="article-card-body" style="padding: 20px 22px 24px; flex: 1; display: flex; flex-direction: column;">
              <h3 style="font-size: 1.05rem; font-weight: 700; line-height: 1.4; margin-bottom: 10px;"><a href="/FPT-TELECOM/tin-tuc/ngoai-hang-anh-2026-27-fpt-play/" style="color: inherit; text-decoration: none;">Ngoại Hạng Anh 2026/27 Trên FPT Play – Độc Quyền Đến 2031</a></h3>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; flex: 1;">FPT Play độc quyền Ngoại Hạng Anh 2026/27 đến 2031. Xem 380 trận/mùa, 4K HDR, từ 59K/tháng.</p>
              <div class="article-card-footer" style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 12px; border-top: 1px solid #f1f5f9; font-size: 13px; color: #94a3b8;">
                <span>📅 15/07/2026</span>
                <a href="/FPT-TELECOM/tin-tuc/ngoai-hang-anh-2026-27-fpt-play/" class="read-more" style="color: var(--blue); font-weight: 600; text-decoration: none;">Đọc tiếp →</a>
              </div>
            </div>
          </article>

          <article class="article-card" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); display: flex; flex-direction: column;">
            <div class="article-card-img" style="position: relative; overflow: hidden; aspect-ratio: 16/10;">
              <a href="/FPT-TELECOM/tin-tuc/bang-gia-internet-fpt-thang-7-2026/">
                <img src="../assets/images/wifi6.webp" alt="Bảng giá Internet FPT tháng 7/2026" width="400" height="250" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: contain; padding: 20px; background: #fff;">
              </a>
              <span class="article-card-tag" style="position: absolute; top: 12px; left: 12px; background: var(--navy); color: white; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">Bảng giá</span>
            </div>
            <div class="article-card-body" style="padding: 20px 22px 24px; flex: 1; display: flex; flex-direction: column;">
              <h3 style="font-size: 1.05rem; font-weight: 700; line-height: 1.4; margin-bottom: 10px;"><a href="/FPT-TELECOM/tin-tuc/bang-gia-internet-fpt-thang-7-2026/" style="color: inherit; text-decoration: none;">Bảng Giá Internet FPT Tháng 7/2026 – GIGA 195K, SKY 1Gbps</a></h3>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; flex: 1;">Cập nhật bảng giá internet FPT mới nhất: GIGA 195k, SKY 210k, F-GAME 270k. Trang bị miễn phí Modem WiFi 6.</p>
              <div class="article-card-footer" style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 12px; border-top: 1px solid #f1f5f9; font-size: 13px; color: #94a3b8;">
                <span>📅 01/07/2026</span>
                <a href="/FPT-TELECOM/tin-tuc/bang-gia-internet-fpt-thang-7-2026/" class="read-more" style="color: var(--blue); font-weight: 600; text-decoration: none;">Đọc tiếp →</a>
              </div>
            </div>
          </article>
        </div>
      </section>

    </div>
  </main>
'''

with open(tin_tuc_index, 'w', encoding='utf-8') as f:
    f.write(header_part + new_main + footer_part)

print("Completely rewrote tin-tuc/index.html")
