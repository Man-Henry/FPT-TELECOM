import os
import glob

cta_html = """      </article>

      <!-- CTA Banner -->
      <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 20px; padding: 40px; text-align: center; margin-bottom: 50px; color: white; box-shadow: 0 15px 30px rgba(234, 88, 12, 0.2);">
        <h2 style="font-size: 1.8rem; margin-bottom: 15px; font-weight: 800;">Lắp Mạng FPT Ngay Hôm Nay!</h2>
        <p style="font-size: 1.1rem; margin-bottom: 25px; color: #ffedd5;">Nhận ngay siêu ưu đãi: Tặng thêm tháng cước, Miễn phí lắp đặt, Trang bị Modem WiFi 6 hiện đại nhất.</p>
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="/FPT-TELECOM/khuyen-mai/" class="btn" style="background: white; color: #ea580c; padding: 14px 32px; border-radius: 30px; font-weight: 700; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">Xem Khuyến Mãi</a>
          <a href="/FPT-TELECOM/lien-he/" class="btn" style="background: transparent; color: white; border: 2px solid white; padding: 12px 32px; border-radius: 30px; font-weight: 700; font-size: 1.1rem;">Đăng Ký Tư Vấn</a>
        </div>
      </div>

      <!-- Internal SEO Links -->"""

if __name__ == "__main__":
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    tin_tuc_dir = os.path.join(root_dir, 'tin-tuc')
    html_files = glob.glob(os.path.join(tin_tuc_dir, '*', 'index.html'))
    
    count = 0
    for f in html_files:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        if "<!-- CTA Banner -->" not in content:
            content = content.replace("      </article>\n\n      <!-- Internal SEO Links -->", cta_html)
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            count += 1
            
    print(f"Added CTA to {count} news articles.")
