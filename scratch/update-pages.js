const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const cookieBanner = `
  <!-- Cookie Consent Banner -->
  <div id="cookie-banner" style="position: fixed; bottom: 0; left: 0; right: 0; background: #0f172a; color: white; padding: 15px 24px; display: flex; justify-content: space-between; align-items: center; z-index: 9999; font-size: 14px; box-shadow: 0 -4px 10px rgba(0,0,0,0.1);">
    <div style="flex: 1; margin-right: 20px;">
      Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn trên trang web này. Bằng cách tiếp tục duyệt web, bạn đồng ý với <a href="privacy.html" style="color: #0665f5; text-decoration: underline;">Chính sách bảo mật</a> của chúng tôi.
    </div>
    <div>
      <button onclick="document.getElementById('cookie-banner').style.display='none';" style="background: #0665f5; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">Đồng ý</button>
    </div>
  </div>
</body>`;

for (const file of files) {
  if (file === 'privacy.html' || file === 'terms.html') continue;
  
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Update Footer (with or without onclick)
  content = content.replace(
    /<a href="chinh-sach\.html".*?>Chính sách bảo mật<\/a>/g,
    '<a href="https://www.facebook.com/FptTelecom/" target="_blank" rel="noopener noreferrer">Facebook</a>\n        <a href="privacy.html">Chính sách bảo mật</a>'
  );
  
  content = content.replace(
    /<a href="chinh-sach\.html".*?>Điều khoản sử dụng<\/a>/g,
    '<a href="terms.html">Điều khoản sử dụng</a>'
  );

  // Update form aria-label
  content = content.replace(
    /<textarea id="chat-input" placeholder="Nhập câu hỏi của bạn..." rows="1" autocomplete="off"><\/textarea>/g,
    '<textarea id="chat-input" aria-label="Nhập câu hỏi chat" placeholder="Nhập câu hỏi của bạn..." rows="1" autocomplete="off"></textarea>'
  );

  // Add cookie banner
  if (!content.includes('id="cookie-banner"')) {
    content = content.replace(/<\/body>/, cookieBanner);
  }

  // Articles specific updates
  if (['news.html', 'khuyen-mai-fpt-thang-7-2026.html', 'ngoai-hang-anh-2026-27-fpt-play.html', 'lich-thi-dau-asean-cup-2026.html'].includes(file)) {
    // Add author name if missing
    if (!content.includes('Tác giả: FPT Telecom') && !content.includes('By: FPT Telecom')) {
      // Find a place to insert author, like after <h1>
      content = content.replace(/(<h1[^>]*>.*?<\/h1>)/i, '$1\n      <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Tác giả: FPT Telecom | Cập nhật: Tháng 7/2026</p>');
    }
    
    // Add schema updates: author, datePublished, dateModified
    content = content.replace(/"@type": "Article",/g, '"@type": "Article",\n        "author": {"@type": "Organization", "name": "FPT Telecom"},\n        "datePublished": "2026-07-01T08:00:00+07:00",\n        "dateModified": "2026-07-29T08:00:00+07:00",');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
}
