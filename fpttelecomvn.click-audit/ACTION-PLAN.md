# SEO ACTION PLAN
**Domain:** fpttelecomvn.click

## Phase 1: High Priority (Tuần 1)
- [ ] **Kiểm tra Heading 1 (H1)** trên trang chủ `index.html`. Đảm bảo trang chủ chỉ sử dụng duy nhất một thẻ H1 chứa từ khóa quan trọng nhất (VD: "Lắp đặt mạng Internet FPT toàn quốc"). Các tiêu đề phụ phải dùng H2, H3.
- [ ] **Kiểm tra Canonical Redirects**: Đảm bảo không có phiên bản trùng lặp (non-www vs www, http vs https). Nếu hiện tại đang dùng `https://fpttelecomvn.click`, hãy thiết lập server để tự động redirect các biến thể khác về URL chuẩn.

## Phase 2: Medium Priority (Tuần 2)
- [ ] **Tạo cấu trúc SILO Content**: Với các bài viết tin tức và khuyến mãi, hãy nhóm chúng lại theo chủ đề (Category). Ví dụ: `Khuyến mãi lắp mạng`, `Kiến thức wifi`, `Truyền hình FPT`. Liên kết chặt chẽ các bài viết trong cùng 1 nhóm với nhau để tạo Topic Cluster.
- [ ] **Tự động hóa Sitemap**: Viết một script (hoặc dùng thư viện JS/backend nếu có) để mỗi lần thêm một file HTML mới vào thư mục `pages/`, nó sẽ tự động cập nhật vào `sitemap.xml` để tránh việc phải thêm thủ công dễ dẫn đến sai sót.

## Phase 3: Low Priority & Maintenance (Hàng tháng)
- [ ] Tiếp tục duy trì việc tạo bài viết chuẩn SEO tương tự như trang "Khuyến mãi FPT tháng 7/2026". 
- [ ] Bổ sung Schema Markup `Article` hoặc `NewsArticle` cho các trang bài viết chi tiết bên cạnh Schema FAQ để Google ưu tiên hiển thị Rich Snippets trên kết quả tìm kiếm tin tức (Google Discover / Google News).
- [ ] Dùng công cụ Google Search Console để Submit lại URL `sitemap.xml` nhằm báo cho Google bot biết đã có bài viết mới.
