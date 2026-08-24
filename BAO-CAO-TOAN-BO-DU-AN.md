# 📑 BÁO CÁO TOÀN DIỆN VÀ CHI TIẾT DỰ ÁN FPT TELECOM

---

## I. TỔNG QUAN HỆ THỐNG & ĐỊNH DANH DỰ ÁN (EXECUTIVE SUMMARY)

* **Tên dự án:** Cổng thông tin FPT Telecom & Trợ lý Chăm sóc Khách hàng Hybrid AI (`fpt-telecom-site`)
* **Tên miền hoạt động chính thức (Production Domain):** [https://fpttelecomvn.click](https://fpttelecomvn.click)
* **Tác giả / Quản trị viên hệ thống:** Trần Văn Mẫn (`ManHenry`)
* **Email liên hệ & Tiếp nhận Lead:** `tvm19624@gmail.com` | `mantv2@fpt.com`
* **Hotline hỗ trợ & Tư vấn 24/7:** `0383 900 321` – `0358 513 269`
* **Địa chỉ văn phòng đại lý:** 107-109 Man Thiện, P. Tăng Nhơn Phú, TP. Thủ Đức, TP. Hồ Chí Minh.
* **Mục tiêu & Sứ mệnh hệ thống:**
  1. Cung cấp cổng thông tin tra cứu bảng giá cước, khuyến mãi lắp đặt Internet cáp quang thế hệ mới (Wi-Fi 6, Wi-Fi 7 SpeedX XGS-PON), Truyền hình FPT Play (độc quyền Ngoại Hạng Anh, Cúp C1), FPT Camera AI thông minh và Smart Home trên toàn quốc.
  2. Triển khai trợ lý ảo **Hybrid AI** thông minh: Kết hợp RAG Vector Search trên cơ sở dữ liệu gói cước thực tế với LLM Meta LLaMA 3.3 70B, tự động hiển thị thẻ giá 3D tương tác và hỗ trợ chuyển ca trực Live Chat tức thì cho chuyên viên qua Telegram.
  3. Thu thập, định vị GPS/IP và phân phối khách hàng tiềm năng (Lead) đa kênh song song: Lưu trữ Cloudflare D1, thông báo Telegram Bot có nút gọi nhanh, gửi Email HTML qua Resend API và lưu trữ vĩnh viễn trên Google Sheets.
  4. Tuân thủ nghiêm ngặt quy định bảo vệ dữ liệu cá nhân theo **Nghị định 13/2023/NĐ-CP** và tiêu chuẩn an toàn thông tin (PII Masking, XSS Escaping, Timing Attack Defense).
  5. Tự động hóa 100% quy trình cập nhật tin tức từ trang chủ `fpt.vn`, tạo trang tĩnh SEO, cập nhật Sitemap và phá Cache theo mã commit Git SHA khi deploy lên GitHub Pages.

---

## II. SƠ ĐỒ KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)

Dự án được xây dựng theo mô hình **Jamstack + Serverless Edge Architecture**, loại bỏ hoàn toàn chi phí thuê máy chủ vật lý (Zero Hosting Cost), tối ưu độ trễ toàn cầu (< 50ms) và đảm bảo tính sẵn sàng 99.99%.

```mermaid
flowchart TB
    subgraph Client ["1. TẦNG CLIENT (Trình duyệt Người dùng)"]
        UI["HTML5 / CSS3 Glassmorphism & 3D Tilt Card"]
        ThreeMap["Three.js 3D Interactive Map (UnrealBloom + GeoJSON)"]
        ChatWidget["Chatbot Widget (AI Response + 3D Pricing Card)"]
        LeadForm["Form Đăng ký / Hỗ trợ CSKH (GPS + IP Tracking)"]
        PWA["PWA Service Worker (Cache-First Assets, Network-First HTML)"]
    end

    subgraph Edge ["2. TẦNG SERVERLESS BACKEND (Cloudflare Workers)"]
        Worker["Cloudflare Worker (src/index.js)"]
        Router{"API Router"}
        Guardrails["Security Layer (PII Masking, XSS, Rate Limit, ND13)"]
        
        subgraph AISuite ["Trí tuệ Nhân tạo & Tìm kiếm Ngữ nghĩa"]
            Embed["Workers AI: @cf/baai/bge-m3"]
            VecDB[("Cloudflare Vectorize: fpt-pricing-index")]
            LLM["Meta LLaMA 3.3 70B Instruct"]
        end
        
        D1[("Cloudflare D1 SQL DB: chat_db (sessions, messages, leads)")]
    end

    subgraph MultiChannel ["3. TẦNG PHÂN PHỐI LEAD & LIVE CHAT ĐA KÊNH"]
        TelegramBot["Telegram Bot API (Live Chat Group + Click-to-Call)"]
        ResendMail["Resend Email API (Gửi Mail HTML tức thì)"]
        GAS["Google Apps Script Engine (google-apps-script.js)"]
        GSheet[("Google Sheets: Khách Hàng Đăng Ký")]
    end

    subgraph Pipeline ["4. CI/CD & AUTOMATION (GitHub Actions)"]
        DeployCI["deploy.yml (Git SHA Cache-Busting -> Pages Deploy)"]
        NewsCrawler["auto_sync_news.yml (Cào tin fpt.vn mỗi 6 tiếng)"]
        LighthouseCI["lighthouse.yml (Audit Core Web Vitals)"]
    end

    UI -->|Giao tiếp Chat / Hỏi giá| Worker
    LeadForm -->|Gửi thông tin đăng ký| Worker
    Worker --> Router
    Router --> Guardrails
    Guardrails --> Embed
    Embed --> VecDB
    VecDB --> LLM
    Router --> D1
    Router -->|Live Chat Mode| TelegramBot
    TelegramBot -->|Nhân viên Reply| Router
    Router -->|ctx.waitUntil()| ResendMail
    Router -->|ctx.waitUntil()| GAS
    GAS --> GSheet
    Pipeline -.->|Build & Deploy| UI
```

---

## III. BÓC TÁCH CHI TIẾT TỪNG TẦNG CÔNG NGHỆ & MÃ NGUỒN

### 1. Backend Serverless & Hybrid AI Router (`src/index.js`)

File [`src/index.js`](./src/index.js) là trung tâm điều phối toàn bộ các dịch vụ Serverless trên Cloudflare Workers:

* **Quản trị cơ sở dữ liệu (`/api/_migrate`)**:
  * Tự động khởi tạo 3 bảng chính: `sessions` (quản lý phiên chat), `messages` (lưu trữ tin nhắn), `leads` (lưu trữ khách hàng đăng ký).
  * Thiết lập các Index hiệu năng cao: `idx_session`, `idx_sessions_status`, `idx_leads_created`, `idx_leads_phone`.
* **Tiếp nhận & Xử lý Lead chuẩn Nghị định 13 (`/api/lead`)**:
  * **Xác thực dữ liệu**: Regex kiểm tra định dạng số điện thoại Việt Nam (`/^(0|\+84)[3-9][0-9]{8}$/`), xác thực bắt buộc chấp thuận điều khoản xử lý dữ liệu cá nhân theo **Nghị định 13/2023/NĐ-CP** (`consent_nd13`).
  * **Chống Spam**: Tích hợp trường ẩn Honeypot (`website`) và bộ nhớ đệm Rate Limiter theo IP (tối đa 12 request/phút/IP).
  * **Phản hồi siêu tốc (< 50ms)**: Ghi trực tiếp vào bảng `leads` trong D1 và trả phản hồi ngay cho người dùng, sau đó sử dụng `ctx.waitUntil()` để chạy ngầm đồng thời 3 tác vụ thông báo:
    1. Gửi tin nhắn Telegram kèm nút bấm gọi nhanh (Click-to-Call).
    2. Gửi email thông báo HTML định dạng chuyên nghiệp qua Resend API đến `tvm19624@gmail.com` và `mantv2@fpt.com`.
    3. Đẩy dữ liệu lưu trữ dự phòng sang Google Sheets qua Google Apps Script.
* **Hệ thống RAG Vector Search & Guardrails AI (`/api/chat` - mode `ai`)**:
  * **Bộ lọc khu vực ngoại tỉnh**: Tự động phát hiện nếu khách hỏi các tỉnh thành ngoài 5 khu vực trọng điểm (Hà Nội, Đà Nẵng, Hải Phòng...) để phản hồi lịch sự kèm gợi ý Hotline.
  * **Trích xuất thực thể vùng miền (Entity Extraction)**: Tự động phân loại câu hỏi thuộc vùng `hcm`, `binh_duong`, `dong_nai`, `vung_tau`, `tien_giang_dong_thap`.
  * **Vector Search**: Sử dụng model embedding đa ngôn ngữ `@cf/baai/bge-m3` (1024 chiều) truy vấn index Cloudflare Vectorize (`fpt-pricing-index`) kết hợp metadata filter theo vùng miền.
  * **Sinh câu trả lời**: Chạy model Meta LLaMA 3.3 70B Instruct (`@cf/meta/llama-3.3-70b-instruct-fp8-fast`) với `temperature: 0.2`, ép buộc trả về cấu trúc JSON chuẩn gồm câu trả lời và mảng `cards` chứa dữ liệu thẻ giá 3D.
  * **Cơ chế phục hồi lỗi (JSON Fallback Parser)**: Tự động bóc tách regex hoặc fallback an toàn nếu LLM trả về text tự do.
* **Hệ thống Chuyển ca trực Human-in-the-loop (`/api/chat` - mode `live`, `/api/poll`, `/telegram`)**:
  * Chuyển đổi trạng thái phiên sang `live`, gửi tin nhắn và 4 dòng lịch sử chat gần nhất vào Telegram của nhân viên trực ca.
  * **Telegram Webhook**: Hỗ trợ Inline Keyboard (`reply:<session_id>`, `copy:<session_id>`) và xử lý tin nhắn phản hồi của nhân viên đẩy về cho khách qua cơ chế Polling.
  * **Tự động đóng phiên (Auto-Timeout)**: Tự động kết thúc phiên sau 5 phút không tương tác (`SESSION_TIMEOUT_MS = 300000`) và thông báo đồng thời cho cả khách lẫn nhân viên.
* **Bảo mật & Quyền riêng tư**:
  * `safeEqual()`: So sánh chuỗi token quản trị dạng Constant-Time, ngăn chặn tấn công dò thời gian (Timing Attack).
  * `maskSensitiveData()`: Tự động làm mờ số điện thoại (ví dụ: `098***321`) và email của khách hàng trước khi lưu vào D1 Database (loại trừ số hotline).
  * `escapeHTML()`: Xử lý toàn bộ chuỗi ký tự chống tấn công XSS / HTML Injection.

---

### 2. Bộ dữ liệu Bảng giá Chuẩn hóa 2026 (`data/fpt_pricing_2026.json`)

Tệp dữ liệu định dạng chuẩn hóa hơn 500 dòng chứa đầy đủ danh mục sản phẩm dịch vụ năm 2026:
* **Gói Internet cá nhân / gia đình**: GIGA (300Mbps - 1Gbps), SKY (1Gbps/300Mbps), META (1Gbps đối xứng).
* **Phân vùng chi tiết**: Nội thành / Ngoại thành TP.HCM, Đồng Nai (DNI1 / DNI234), Vũng Tàu (Phường / Xã), Bình Dương (8 phường trung tâm / Xã), Đồng Tháp - Tiền Giang.
* **Gói cao cấp SpeedX Wi-Fi 7 XGS-PON**: SpeedX1 (385k - 445k), SpeedX2 (999k), SpeedX10 (1.599k).
* **Combo FPT Play & Camera AI**: Combo VIP, Combo V.VIP trọn vẹn Ngoại Hạng Anh, gói Cloud An Tâm lưu trữ 7/15/30 ngày.
* Mỗi gói cước đều chứa trường `text` tối ưu cho Embedding ngữ nghĩa và `metadata` phục vụ lọc chính xác theo khu vực.

---

### 3. Tầng Tiếp nhận Khách hàng & Google Workspace Engine (`google-apps-script.js`)

* **Google Apps Script Web App**: Đóng vai trò REST Endpoint tiếp nhận dữ liệu Lead dự phòng.
* **Đồng bộ Google Sheets**: Tự động tạo trang tính `Khách Hàng Đăng Ký`, căn chỉnh kích thước cột, tô màu tiêu đề thương hiệu `#0056d6`, giữ nguyên số `0` đầu số điện thoại (`'098...`).
* **Email HTML Notification**: Tạo email giao diện chuẩn FPT kèm nút bấm **Click-to-Call** trực tiếp, gửi ngay lập tức tới `tvm19624@gmail.com` và `mantv2@fpt.com`.
* **LockService**: Sử dụng `lock.tryLock(15000)` chống xung đột ghi đè khi nhiều khách bấm đăng ký cùng lúc.

---

### 4. Tầng Giao diện Client, 3D WebGL & Hiệu ứng Chuyển đổi (`js/script.js` & `css/styles.css`)

* **Bản đồ 3D Việt Nam tương tác (`initMap3D`)**:
  * Tải động `Three.js` (v0.160.0), `OrbitControls`, `EffectComposer`, `UnrealBloomPass` qua `importmap`.
  * Khối bản đồ Việt Nam được đùn (Extrude) 3D từ dữ liệu GeoJSON chuẩn, đầy đủ **2 quần đảo Hoàng Sa và Trường Sa**.
  * Hệ thống 2.000 hạt dữ liệu bay (Data Particles), mạng lưới kết nối đường cong Bezier phát sáng neon và vòng sóng lan tỏa (Pulse Wave) tại các trung tâm viễn thông lớn.
* **Hiệu ứng Tương tác Cao cấp (CRO & UI Interactions)**:
  * **3D Tilt Card**: Xoay card theo vị trí chuột trên PC và theo cảm biến con quay hồi chuyển (`deviceorientation`) trên điện thoại.
  * **Spotlight Glow & Cursor Follower**: Quầng sáng di chuyển mượt mà theo con trỏ chuột.
  * **Magnetic Buttons**: Nút bấm có lực hút từ tính theo chuột.
  * **Material Click Ripple**: Hiệu ứng sóng nước khi bấm vào các nút điều hướng.
  * **Trust Stats Count-Up**: Bộ đếm nhảy số sinh động khi cuộn tới phần cam kết chất lượng.
  * **Social Proof Notification**: Hộp thông báo đơn hàng đăng ký ngẫu nhiên tạo độ tin cậy và thúc đẩy chuyển đổi.
  * **End-of-week Countdown Timer**: Đồng hồ đếm ngược ưu đãi kết thúc vào Chủ Nhật hàng tuần.
  * **Dual-mode Form Switcher**: Nút chuyển đổi linh hoạt giữa "Đăng ký lắp đặt mới" và "Yêu cầu hỗ trợ kỹ thuật/CSKH".
* **Chatbot Widget Đa năng**:
  * Render trực tiếp các thẻ **3D Pricing Card** bên trong hội thoại chat với đầy đủ thông số tốc độ, giá cước, khuyến mãi và nút "Đăng ký ngay" kết nối trực tiếp vào Modal đăng ký.
  * Âm thanh thông báo (`thongbao.mp3`) mở hộp chat với cơ chế mở khóa âm thanh an toàn theo chính sách trình duyệt.

---

### 5. Cấu trúc Các Trang Web & Chuẩn mực SEO On-Page

Hệ thống gồm 5 trang chuyên mục chính và 14+ bài viết tin tức tĩnh:

| Đường dẫn tệp | URL Website | Chức năng chính |
| :--- | :--- | :--- |
| [`index.html`](./index.html) | `/` | Trang chủ: Banner hero, bảng so sánh tốc độ, các gói cước hot, bản đồ 3D, đối tác, đánh giá khách hàng, form đăng ký |
| [`pages/bang-gia.html`](./pages/bang-gia.html) | `/pages/bang-gia.html` | Bảng giá chi tiết tất cả các gói cước FPT 2026 theo từng tỉnh thành, gói SpeedX WiFi 7, FPT Play, Camera |
| [`pages/khu-vuc.html`](./pages/khu-vuc.html) | `/pages/khu-vuc.html` | Tra cứu khu vực phủ sóng hạ tầng cáp quang toàn quốc, ưu đãi từng quận/huyện |
| [`pages/chinh-sach.html`](./pages/chinh-sach.html) | `/pages/chinh-sach.html` | Chính sách bán hàng, điều khoản sử dụng, cam kết bảo vệ dữ liệu theo Nghị định 13/2023/NĐ-CP |
| [`pages/lien-he.html`](./pages/lien-he.html) | `/pages/lien-he.html` | Trang liên hệ đại lý, địa chỉ văn phòng giao dịch, form tiếp nhận khiếu nại kỹ thuật |
| [`pages/news.html`](./pages/news.html) | `/pages/news.html` | Cổng tin tức công nghệ & khuyến mãi tổng hợp |
| [`pages/posts/*.html`](./pages/posts) | `/pages/posts/...` | Hơn 14 bài viết tin tức tĩnh chuẩn SEO (Schema Article, Breadcrumb, Open Graph, Canonical) |

---

### 6. Hệ thống Tự động hóa Cào Tin tức & Nén Tài nguyên (`scripts/`)

* **Bộ cào tin tức tự động (`scripts/sync_fpt_news.js`)**:
  * Sử dụng `cheerio` quét bài viết mới từ `https://fpt.vn/tin-tuc`.
  * Tự động tạo slug chuẩn tiếng Việt không dấu, loại bỏ ID thừa.
  * Sinh file HTML tĩnh hoàn chỉnh trong [`pages/posts/`](./pages/posts) với đầy đủ thẻ Meta, Schema.org `NewsArticle`, thay thế toàn bộ hotline chính hãng về hotline đại lý `0383 900 321`.
  * Tự động chèn bài viết vào danh sách của [`pages/news.html`](./pages/news.html) và [`index.html`](./index.html).
  * Tự động tái tạo toàn bộ [`sitemap.xml`](./sitemap.xml) với đúng định dạng `lastmod`, `priority` và `changefreq`.
* **Bộ nén hình ảnh (`scripts/compress_images.js`)**:
  * Dùng thư viện `sharp` quét toàn bộ thư mục `assets/images/`, tự động chuyển đổi và nén ảnh nặng (>300KB) sang định dạng `.webp` chất lượng cao, tối ưu dung lượng tải trang.

---

### 7. Quy trình CI/CD & Cơ chế Tự động Phá Cache (Cache-Busting)

* **Pipeline Deploy (`.github/workflows/deploy.yml`)**:
  1. Kích hoạt tự động khi push code lên nhánh `main`.
  2. Trích xuất mã băm commit 8 ký tự `${GITHUB_SHA::8}` (ví dụ: `a1b2c3d4`).
  3. Dùng script Python tự động thay thế toàn bộ chuỗi `?v=VERSION` trong tất cả file HTML thành `?v=a1b2c3d4`.
  4. Cập nhật tên cache trong [`sw.js`](./sw.js) thành `fpt-telecom-a1b2c3d4`.
  5. Đóng gói và phát hành trực tiếp lên GitHub Pages.
* **Pipeline Cào tin định kỳ (`.github/workflows/auto_sync_news.yml`)**:
  * Cron job chạy mỗi 6 tiếng một lần (`0 */6 * * *`), tự động commit và push nếu có bài viết mới.
* **Audit Core Web Vitals (`.github/workflows/lighthouse.yml`)**:
  * Chạy Lighthouse CI kiểm định chất lượng hiệu năng, khả năng truy cập (Accessibility) và SEO trên từng Pull Request.

---

### 8. PWA, Bảo mật & Cấu hình Edge Network

* **Service Worker (`sw.js`)**:
  * **Chiến lược Network-First**: Áp dụng cho HTML, CSS, JS nhằm luôn nhận bản cập nhật mới nhất từ server, tự động fallback về Cache nếu mất mạng.
  * **Chiến lược Cache-First**: Áp dụng cho hình ảnh, font chữ Google Inter, icon.
  * **Bypass hoàn toàn**: Bỏ qua cache cho các đường dẫn `/api/` và `/telegram` để bảo đảm độ trễ thời gian thực của Chat.
* **HTTP Security Headers (`_headers`)**:
  * Đặt `Cache-Control: max-age=31536000, immutable` cho tài nguyên tĩnh trong `/assets/`, `/css/`, `/js/`.
  * Thiết lập đầy đủ các header bảo mật cấp cao: `Strict-Transport-Security` (HSTS Preload), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
* **Cấu hình Bot AI (`robots.txt`)**:
  * Cho phép các công cụ tìm kiếm và bot AI thế hệ mới (`GPTBot`, `ClaudeBot`, `Google-Extended`) thu thập thông tin để hỗ trợ tra cứu tự động.

---

## IV. CẤU TRÚC LƯU TRỮ TOÀN BỘ DỰ ÁN (PROJECT DIRECTORY STRUCTURE)

```
FPTTELECOM/
├── .github/
│   └── workflows/
│       ├── auto_sync_news.yml      # [CI/CD] Cron job tự động cào tin tức FPT mỗi 6 tiếng
│       ├── deploy.yml              # [CI/CD] Tự động hóa Cache-Busting theo commit và Deploy Pages
│       └── lighthouse.yml         # [CI/CD] CI Audit hiệu năng và Core Web Vitals
├── assets/
│   ├── icons/                     # Bộ biểu tượng ứng dụng PWA (192x192, 512x512, maskable)
│   ├── images/
│   │   ├── features/              # Ảnh minh họa tính năng (WiFi 6, FPT Play, No Lag)
│   │   ├── main/                  # Ảnh logo, thiết bị modem, TV Box, camera, avatar
│   │   └── posts/                 # Ảnh thumbnail các bài viết tin tức
│   ├── music/
│   │   └── thongbao.mp3           # File âm thanh hiệu ứng khi mở chat
│   └── vn-all.geo.json            # Tọa độ GeoJSON bản đồ Việt Nam cho Three.js
├── css/
│   ├── styles.css                 # File nguồn CSS đầy đủ (~6.500 dòng)
│   └── styles.min.css             # File CSS đã nén tối ưu cho môi trường Production
├── data/
│   ├── fpt_pricing_2026.json      # Dữ liệu JSON bảng giá 2026 phục vụ RAG Vector Search
│   └── synced_news.json           # Dữ liệu JSON lưu lịch sử các bài báo đã đồng bộ
├── js/
│   ├── script.js                  # File nguồn JavaScript chính (Three.js, Chat, GSAP, Form)
│   └── script.min.js              # File JavaScript đã nén và làm mờ mã nguồn
├── pages/
│   ├── bang-gia.html              # Bảng giá chi tiết tất cả các gói cước FPT 2026
│   ├── chinh-sach.html            # Chính sách bảo mật, điều khoản sử dụng và quy định NĐ 13
│   ├── khu-vuc.html               # Trang khuyến mãi theo từng tỉnh thành / khu vực
│   ├── lien-he.html               # Trang liên hệ tư vấn, địa chỉ văn phòng và kỹ thuật
│   ├── news.html                  # Danh bạ tin tức & khuyến mãi tổng hợp
│   └── posts/                     # Thư mục chứa 14+ bài viết tin tức tĩnh (Static HTML SEO)
│       ├── bang-gia-internet-fpt-thang-7-2026.html
│       ├── co-nen-bat-wifi-lien-tuc-24-7.html
│       ├── combo-internet-vvip-gia-sap-san-tron-ngoai-hang-anh-va-ca-kho-giai-tri-cho-ca-nha.html
│       ├── cong-ty-cua-musk-bat-dau-ban-internet-ve-tinh-tai-viet-nam.html
│       ├── fpt-camera-ra-mat-goi-an-tam-khi-cam-viet-hieu-nguoi-viet.html
│       ├── iphone-2028-5-thay-doi-dot-pha.html
│       ├── khuyen-mai-fpt-thang-7-2026.html
│       ├── khuyen-mai-lap-mang-fpt-thang-8-nhan-camera-voucher-50k-tv-giam-43.html
│       ├── ky-thuat-vien-fpt-telecom-dung-cam-lao-xuong-song-cuu-song-be-trai-duoi-nuoc-tai-hai-phong.html
│       ├── lich-thi-dau-asean-cup-2026.html
│       ├── ngoai-hang-anh-2026-27-fpt-play.html
│       ├── san-van-dong-vinfast-135000-cho-lon-nhat-the-gioi.html
│       ├── viet-nam-ghi-2-ban-fpt-tang-voucher-200k-cho-khach-hang-lap-internet.html
│       └── viet-nam-thang-thai-lan-2-ban-fpt-tang-voucher-200k-cho-khach-lap-internet.html
├── scripts/
│   ├── compress_images.js         # Script nén ảnh >300KB bằng thư viện Sharp
│   └── sync_fpt_news.js           # Script cào bài viết từ fpt.vn, tạo HTML tĩnh & Sitemap
├── src/
│   └── index.js                   # Mã nguồn Backend Cloudflare Worker (AI + D1 + Telegram)
├── _headers                       # Cấu hình Cache & Security Headers Cloudflare
├── _redirects                     # Chuyển hướng tên miền 301 & URL bài viết
├── 404.html                       # Trang thông báo lỗi 404
├── BAO-CAO-TOAN-BO-DU-AN.md       # Báo cáo tổng thể toàn bộ dự án
├── CNAME                          # Cấu hình Custom Domain (fpttelecomvn.click)
├── favicon.ico                    # Favicon hiển thị trên tab trình duyệt
├── google-apps-script.js          # Mã nguồn triển khai trên Google Apps Script
├── google80fb096eb6b47793.html    # Mã xác thực Google Search Console
├── HD-CAI-DAT-GOOGLE-SHEET-EMAIL.md # Hướng dẫn cài đặt Google Apps Script nhận Lead
├── index.html                     # Trang chủ chính của website
├── manifest.json                  # Cấu hình cài đặt Progressive Web App (PWA)
├── package.json                   # Cấu hình npm scripts và dependencies
├── package-lock.json              # Khóa phiên bản dependencies
├── push_code.bat                  # Script Windows Batch tự động đẩy code lên GitHub
├── README.md                      # Tài liệu tổng quan và hướng dẫn deploy Cloudflare
├── robots.txt                     # Hướng dẫn bot công cụ tìm kiếm và AI crawlers
├── sitemap.xml                    # Bản đồ liên kết website chuẩn SEO Google
├── sw.js                          # Service Worker điều phối Cache & Offline
└── wrangler.toml                  # File cấu hình Cloudflare Worker, D1 DB và Vectorize
```

---

## V. CƠ CHẾ LƯU TRỮ DỮ LIỆU (DATA PERSISTENCE & STORAGE)

| Tầng lưu trữ | Công nghệ / Nơi lưu | Nội dung & Mục đích lưu trữ |
| :--- | :--- | :--- |
| **Edge Database** | Cloudflare D1 (`chat_db`) | Lưu trữ phiên Live Chat (`sessions`), tin nhắn (`messages`) với dữ liệu nhạy cảm được làm mờ (Masked PII) và danh sách Lead (`leads`). |
| **Vector Knowledge Base** | Cloudflare Vectorize (`fpt-pricing-index`) | Lưu trữ vector nhúng 1024 chiều của toàn bộ bảng giá và khuyến mãi để phục vụ tra cứu ngữ nghĩa RAG. |
| **Lead Khách hàng (Backup)** | Google Sheets (`Khách Hàng Đăng Ký`) | Lưu trữ vĩnh viễn danh sách khách đăng ký lắp đặt, số điện thoại, vị trí GPS/IP, gói cước và thời gian liên hệ. |
| **Thông báo khẩn cấp** | Resend API & Telegram Bot | Gửi email HTML và tin nhắn Telegram kèm nút gọi nhanh cho tư vấn viên ngay khi có khách đăng ký. |
| **Bộ nhớ đệm Trình duyệt** | Service Worker Cache API & HTTP Cache | Lưu đệm tài nguyên tĩnh (ảnh, icon, font, css, js) giúp tải trang tức thì (< 0.5s). Tự động dọn cache khi có bản cập nhật mới. |
| **Trạng thái Người dùng** | HTML5 `localStorage` | Lưu trạng thái Cookie Consent, phiên chat hiện tại và số liệu bộ đếm Social Proof. |
| **Lịch sử Tin tức** | File JSON (`data/synced_news.json`) | Theo dõi các bài viết đã đồng bộ từ cổng tin FPT để tránh trùng lặp. |

---

## VI. QUY TRÌNH PHÁT TRIỂN & VẬN HÀNH (OPERATIONS & DEPLOYMENT)

1. **Chỉnh sửa & Build tài nguyên:**
   * Khi thay đổi mã nguồn CSS/JS, chạy lệnh build để nén tối ưu:
     ```bash
     npm run build
     ```
2. **Đẩy code lên GitHub & Tự động Deploy Website:**
   * Nhấp đúp chạy file [`push_code.bat`](./push_code.bat) hoặc thực thi trong terminal:
     ```bash
     .\push_code.bat
     ```
   * GitHub Actions sẽ tự động:
     * Lấy 8 ký tự mã commit (VD: `38ef001`).
     * Tự động thay `?v=VERSION` trong tất cả file HTML và `sw.js` thành `?v=38ef001`.
     * Tự động deploy website lên GitHub Pages với tên miền tùy chỉnh `fpttelecomvn.click`.
3. **Triển khai Backend Cloudflare (Nếu chỉnh sửa `src/index.js` hoặc cấu hình `wrangler.toml`):**
   ```bash
   npx wrangler deploy
   ```
4. **Nạp dữ liệu tri thức vào Vectorize (Khi cập nhật bảng giá mới):**
   ```bash
   curl -X POST https://man-chatbot.tvm19624.workers.dev/api/seed-knowledge \
     -H "Authorization: Bearer fpttelecom2026_admin_secret" \
     -H "Content-Type: application/json" \
     -d @data/fpt_pricing_2026.json
   ```

---

## VII. ĐÁNH GIÁ ĐIỂM MẠNH & ĐỀ XUẤT NÂNG CẤP

### 1. Điểm mạnh vượt trội
1. **Hiệu năng & Chi phí = 0đ**: Chạy hoàn toàn trên Jamstack + Serverless Edge, tốc độ tải trang cực nhanh, tối ưu toàn diện Core Web Vitals, không tốn chi phí thuê máy chủ hàng tháng.
2. **Tỷ lệ Chuyển đổi Khách hàng (CRO) cao**: AI tư vấn báo giá chính xác theo từng vùng miền, hiển thị thẻ giá 3D sinh động ngay trong chat, chuyển tiếp Live Chat Telegram tức thì cho tư vấn viên.
3. **Bảo mật & Tuân thủ Pháp lý chuẩn mực**: Xác thực đầy đủ sự đồng ý theo **Nghị định 13/2023/NĐ-CP**, tự động làm mờ PII trước khi lưu trữ, chống Timing Attack và XSS Injection.
4. **Tự động hóa toàn diện**: Tự động cào tin tức mới từ `fpt.vn`, tự sinh trang SEO tĩnh, tự cập nhật Sitemap và tự động phá Cache theo commit Git.

### 2. Đề xuất nâng cấp tiếp theo
* **Trang Admin Dashboard**: Xây dựng giao diện web quản trị nhẹ để xem và xuất dữ liệu Lead trực tiếp từ Cloudflare D1.
* **Tích hợp Zalo ZNS / SMS Brandname**: Gửi tin nhắn xác nhận tự động cho khách hàng ngay sau khi gửi form đăng ký.
* **Hỗ trợ Đa ngôn ngữ (Song ngữ Anh - Việt)**: Bổ sung tùy chọn tiếng Anh cho người nước ngoài tại các đô thị lớn.
