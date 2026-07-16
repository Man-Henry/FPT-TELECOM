# 📋 PROJECT PLAN — WEBSITE ĐẠI LÝ FPT TELECOM 2026

> **Vai trò**: Senior Marketing Project Manager & UI/UX Expert chuyên ngành Viễn thông  
> **Ngày tạo**: 16/07/2026  
> **Phiên bản**: v1.0  
> **Trạng thái**: 🟡 Draft — Chờ phê duyệt

---

## 📌 Tổng quan Dự án

| Hạng mục       | Chi tiết                                                                               |
| -------------- | -------------------------------------------------------------------------------------- |
| **Tên dự án**  | Website Đại Lý FPT Telecom — Mobile-first, CRO & SEO Local                             |
| **Mục tiêu**   | Tối ưu tỷ lệ chuyển đổi (CRO), tích hợp Chat (Zalo/Telegram), đạt Core Web Vitals > 90 |
| **Đối tượng**  | Khách hàng cá nhân & doanh nghiệp cần lắp đặt Internet/Camera/TV FPT                   |
| **Tech Stack** | Next.js / Nuxt.js (SSR/SSG), WebP/AVIF, Lazy-load, reCAPTCHA v3                        |
| **Tiêu chuẩn** | Mobile-first, Semantic SEO (H1-H6), Core Web Vitals, HTTPS                             |
| **Tích hợp**   | Telegram Bot API, Zalo OA Chat, Google Maps, Schema Markup                             |

---

## 📑 MỤC LỤC

1. [PHẦN 1: CẤU TRÚC SITEMAP & WIREFRAME TRANG CHỦ](#phần-1-cấu-trúc-sitemap--wireframe-trang-chủ)
2. [PHẦN 2: HƯỚNG DẪN KỸ THUẬT TÍCH HỢP FORM VỚI TELEGRAM BOT](#phần-2-hướng-dẫn-kỹ-thuật-tích-hợp-form-với-telegram-bot)
3. [PHẦN 3: CHIẾN LƯỢC TỪ KHÓA SEO NGÀNH VIỄN THÔNG 2026](#phần-3-chiến-lược-từ-khóa-seo-ngành-viễn-thông-2026)
4. [PHẦN 4: LỘ TRÌNH TRIỂN KHAI (TIMELINE)](#phần-4-lộ-trình-triển-khai)

---

# PHẦN 1: CẤU TRÚC SITEMAP & WIREFRAME TRANG CHỦ

## 1.1. Sitemap (Cấu trúc phân trang chuẩn SEO)

> [!IMPORTANT]
> Sitemap được thiết kế theo **phễu nhu cầu** để Google Bot dễ dàng crawl và người dùng không bị lạc lối.

```
🏠 / (Trang chủ — Hub điều phối traffic, CTA chính)
│
├── 📦 NHÓM DỊCH VỤ (Category Pages)
│   ├── /internet-cap-quang/
│   │   ├── /internet-cap-quang/ca-nhan/
│   │   ├── /internet-cap-quang/doanh-nghiep/
│   │   └── /internet-cap-quang/sky-max/
│   │
│   ├── /truyen-hinh-fpt-play/
│   │   ├── /truyen-hinh-fpt-play/goi-max/
│   │   ├── /truyen-hinh-fpt-play/goi-vip/
│   │   └── /truyen-hinh-fpt-play/goi-sport/
│   │
│   ├── /camera-fpt/
│   │   ├── /camera-fpt/trong-nha/
│   │   ├── /camera-fpt/ngoai-troi/
│   │   └── /camera-fpt/cloud-storage/
│   │
│   └── /goi-combo/
│       └── (Internet + TV + Camera)
│
├── 📰 NHÓM HỖ TRỢ & TIN TỨC (Blog — Kéo Traffic)
│   ├── /ho-tro-ky-thuat/
│   │   ├── Hướng dẫn đổi mật khẩu Wifi
│   │   ├── Xử lý lỗi mạng
│   │   └── ...
│   └── /khuyen-mai/
│       └── Cập nhật chính sách FPT từng tháng
│
├── 🎯 TRANG CHUYỂN ĐỔI (Conversion Pages)
│   ├── /dang-ky-lap-dat/       ← Form thu thập Lead
│   └── /kiem-tra-ha-tang/      ← Tool kiểm tra kéo cáp theo địa chỉ
│
└── ⚖️ PHÁP LÝ
    ├── /chinh-sach-bao-mat/
    └── /dieu-khoan-su-dung/
```

### Chi tiết mục đích từng nhóm trang

| Nhóm trang           | Mục đích chính                       | KPI đo lường                  |
| -------------------- | ------------------------------------ | ----------------------------- |
| **Category Pages**   | Trình bày dịch vụ, dẫn dắt tới Form  | Tỷ lệ click CTA, Bounce Rate  |
| **Blog / Hỗ trợ**    | Kéo traffic SEO Informational        | Organic Traffic, Time on Page |
| **Conversion Pages** | Thu Lead (SĐT, nhu cầu)              | Form Submission Rate, CPL     |
| **Pháp lý**          | Tuân thủ quy định, tăng Trust Signal | —                             |

---

## 1.2. Wireframe Trang Chủ (Luồng trải nghiệm CRO)

> [!TIP]
> **Mục tiêu**: Giữ chân khách hàng trong < 5 giây đầu tiên và điều hướng họ điền Form hoặc tham gia cộng đồng Zalo/Telegram.

| #   | Section                    | Chi tiết UI/UX & Yếu tố CRO                                                                                                                                                                         |
| --- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Header (Sticky)**        | Logo FPT (nhánh đại lý) · Hotline **(Click-to-call)** · Menu hamburger (mobile) · Nút CTA nổi bật: **"Đăng ký & Kiểm tra hạ tầng"**                                                                 |
| 2   | **Hero Section**           | **H1**: `Lắp Mạng FPT [Khu Vực] - Tặng Modem Wifi 6 & Ưu Đãi [Tháng/Năm]` · Sub-text: Thủ tục Online 100% - Lắp đặt 24h - Hỗ trợ 1:1 qua Zalo · CTA: **"Nhận báo giá ngay"** (anchor scroll → Form) |
| 3   | **Trust Bar**              | Logo đối tác (FPT, Qualcomm, TP-Link...) · Số lượng KH đã phục vụ · Badge chứng nhận đại lý ủy quyền                                                                                                |
| 4   | **Product Grid**           | 4 Card dịch vụ: Internet / FPT Play / Camera / Combo · Hiển thị **"Giá chỉ từ"** (H2), băng thông, icon tính năng · Nút **"Xem chi tiết"**                                                          |
| 5   | **Best Seller Table**      | Bảng so sánh **3 gói cước Hot nhất** (Super 80 / Super 150 / Super 200) · Cột **"Phù hợp cho"** (1-2 thiết bị, Gia đình 4 người...) · Highlight gói đề xuất                                         |
| 6   | **Community Hub**          | Khối nền màu tương phản · Copy: _"Tham gia nhóm Zalo/Telegram [Khu vực] để nhận mã giảm giá & hỗ trợ kỹ thuật 24/7"_ · Nút Join Zalo + Join Telegram                                                |
| 7   | **Smart Lead Form**        | Form thu hẹp: **chỉ hỏi SĐT & Nhu cầu** · **H2**: `Để lại SĐT - Nhận ngay Voucher [Quà tặng]` · reCAPTCHA v3 (invisible) · Loading state + Thank-you redirect                                       |
| 8   | **Footer**                 | Thông tin liên hệ · Bản đồ Google Maps nhúng · Liên kết MXH · Giấy phép ĐKKD · Sitemap links                                                                                                        |
| FAB | **Floating Action Button** | Góc phải dưới: **Zalo** (Chat OA) + **Telegram** (Bot tư vấn tự động) · Pulse animation để thu hút                                                                                                  |

### Wireframe Visual Flow

```
┌──────────────────────────────────────────────────────┐
│  [Logo]   [Menu]   [Hotline ☎]   [🔴 ĐĂNG KÝ CTA]  │  ← Sticky Header
├──────────────────────────────────────────────────────┤
│                                                      │
│   🌟 LẮP MẠNG FPT [KHU VỰC] 🌟                     │
│   Tặng Modem Wifi 6 & Ưu Đãi Tháng 7/2026          │
│   Thủ tục Online 100% · Lắp 24h · Zalo 1:1         │
│                                                      │
│          [ 🟢 NHẬN BÁO GIÁ NGAY ]                   │  ← Hero Section
│                                                      │
├──────────────────────────────────────────────────────┤
│  [FPT✓] [Qualcomm] [TP-Link] · 50,000+ KH tin dùng │  ← Trust Bar
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │Internet │ │FPT Play │ │ Camera  │ │  Combo  │   │
│  │Từ 165K  │ │Từ 80K   │ │Từ 44K   │ │Từ 200K  │   │
│  │[Chi tiết]│ │[Chi tiết]│ │[Chi tiết]│ │[Chi tiết]│   │  ← Product Grid
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│                                                      │
├──────────────────────────────────────────────────────┤
│  📊 SO SÁNH GÓI CƯỚC HOT NHẤT                       │
│  ┌──────────┬──────────┬──────────┐                  │
│  │ Super 80 │Super 150 │Super 200 │                  │
│  │ 165K/th  │ 195K/th  │ 245K/th  │                  │  ← Best Seller
│  │ 1-2 TB   │ GĐ 4ng  │ Streaming│                  │
│  │ [Chọn]   │ [⭐Chọn] │ [Chọn]   │                  │
│  └──────────┴──────────┴──────────┘                  │
├──────────────────────────────────────────────────────┤
│  🎉 THAM GIA CỘNG ĐỒNG ZALO/TELEGRAM               │
│  Nhận mã giảm giá & hỗ trợ kỹ thuật 24/7           │
│  [Join Zalo]  [Join Telegram]                        │  ← Community Hub
├──────────────────────────────────────────────────────┤
│                                                      │
│  📞 ĐỂ LẠI SĐT - NHẬN NGAY VOUCHER 200K           │
│  ┌──────────────────────────────────────┐            │
│  │ Số điện thoại: [_______________]     │            │
│  │ Nhu cầu:       [Internet ▾     ]     │            │
│  │ Khu vực:       [Tự động detect ▾]    │            │  ← Smart Lead Form
│  │                                      │            │
│  │      [ 🟢 GỬI ĐĂNG KÝ NGAY ]       │            │
│  └──────────────────────────────────────┘            │
│  🔒 Bảo mật bởi reCAPTCHA · Cam kết không spam      │
│                                                      │
├──────────────────────────────────────────────────────┤
│  [Liên hệ] [Bản đồ] [MXH] [ĐKKD] [Sitemap]        │  ← Footer
└──────────────────────────────────────────────────────┘
                                          ┌─────┐
                                          │ 💬  │ ← FAB (Zalo + Telegram)
                                          └─────┘
```

---

# PHẦN 2: HƯỚNG DẪN KỸ THUẬT TÍCH HỢP FORM VỚI TELEGRAM BOT

> [!CAUTION]
> **Tuyệt đối không** gọi API Telegram trực tiếp từ Frontend (HTML/JS) vì sẽ bị lộ Token. Phải dùng Backend (PHP/Node.js) làm trung gian.

## 2.1. Bước 1 — Chuẩn bị trên Telegram

| Bước | Hành động                  | Chi tiết                                                                                                                  |
| ---- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1.1  | **Tạo Bot**                | Mở Telegram → tìm `@BotFather` → `/newbot` → Đặt tên & Username → Lưu **HTTP API Token**                                  |
| 1.2  | **Tạo Kênh/Nhóm nhận tin** | Tạo Group Chat hoặc Channel riêng cho team Sale                                                                           |
| 1.3  | **Cấp quyền cho Bot**      | Thêm Bot vào Group/Channel → Gán quyền **Admin** (để Bot gửi được tin nhắn)                                               |
| 1.4  | **Lấy Chat ID**            | Gửi 1 tin nhắn vào Group → Truy cập `https://api.telegram.org/bot<TOKEN>/getUpdates` → Tìm `"chat":{"id":-100xxxxxxxxxx}` |

## 2.2. Bước 2 — Xử lý phía Server (Backend)

### Kiến trúc luồng dữ liệu

```
┌──────────────┐     POST /api/lead     ┌──────────────┐     sendMessage     ┌──────────────┐
│   Frontend   │ ──────────────────────→ │   Backend    │ ──────────────────→ │ Telegram Bot │
│  (Form HTML) │                         │ (PHP/Node.js)│                     │  (Group Chat)│
│              │ ←────────────────────── │              │                     │              │
│              │     JSON Response       │  • Validate  │                     │  Sale Team   │
│              │     (success/error)     │  • Sanitize  │                     │  nhận Lead   │
│              │                         │  • reCAPTCHA │                     │  real-time   │
└──────────────┘                         └──────────────┘                     └──────────────┘
```

### Ví dụ xử lý Backend (PHP/cURL)

```php
<?php
// File: api/submit-lead.php
// ============================================================
// BACKEND HANDLER — Nhận Lead từ Form & gửi về Telegram Bot
// ============================================================

// --- Cấu hình (Nên lưu trong .env, KHÔNG hardcode) ---
define('TELEGRAM_BOT_TOKEN', getenv('TELEGRAM_BOT_TOKEN'));
define('TELEGRAM_CHAT_ID', getenv('TELEGRAM_CHAT_ID'));
define('RECAPTCHA_SECRET', getenv('RECAPTCHA_SECRET'));

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://your-domain.com');
header('Access-Control-Allow-Methods: POST');

// --- Chỉ chấp nhận POST ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// --- Nhận & Sanitize dữ liệu ---
$phone    = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$need     = filter_input(INPUT_POST, 'need', FILTER_SANITIZE_STRING);
$area     = filter_input(INPUT_POST, 'area', FILTER_SANITIZE_STRING);
$recaptcha = $_POST['g-recaptcha-response'] ?? '';

// --- Validate reCAPTCHA v3 ---
$recaptchaVerify = file_get_contents(
    'https://www.google.com/recaptcha/api/siteverify?secret='
    . RECAPTCHA_SECRET . '&response=' . $recaptcha
);
$recaptchaData = json_decode($recaptchaVerify, true);

if (!$recaptchaData['success'] || $recaptchaData['score'] < 0.5) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Xác thực thất bại']);
    exit;
}

// --- Validate dữ liệu ---
if (empty($phone) || !preg_match('/^(0[3|5|7|8|9])+([0-9]{8})$/', $phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Số điện thoại không hợp lệ']);
    exit;
}

// --- Format tin nhắn Telegram ---
$timestamp = date('d/m/Y H:i:s');
$message = "🔔 *LEAD MỚI TỪ WEBSITE* 🔔\n\n"
         . "📞 *SĐT*: `{$phone}`\n"
         . "📋 *Nhu cầu*: {$need}\n"
         . "📍 *Khu vực*: {$area}\n"
         . "🕐 *Thời gian*: {$timestamp}\n\n"
         . "⚡ _Hãy liên hệ khách trong 5 phút!_";

// --- Gửi về Telegram với Inline Buttons ---
$keyboard = json_encode([
    'inline_keyboard' => [
        [
            ['text' => '📞 Gọi ngay', 'url' => 'tel:' . $phone],
            ['text' => '💬 Nhắn Zalo', 'url' => 'https://zalo.me/' . $phone],
        ],
        [
            ['text' => '✅ Đã xử lý', 'callback_data' => 'handled_' . $phone],
        ]
    ]
]);

$telegramUrl = "https://api.telegram.org/bot" . TELEGRAM_BOT_TOKEN . "/sendMessage";

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => $telegramUrl,
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS     => [
        'chat_id'      => TELEGRAM_CHAT_ID,
        'text'         => $message,
        'parse_mode'   => 'Markdown',
        'reply_markup' => $keyboard,
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// --- Phản hồi Frontend ---
if ($httpCode === 200) {
    // TODO: Lưu Lead vào Database (MySQL/PostgreSQL) để backup
    echo json_encode([
        'success' => true,
        'message' => 'Đăng ký thành công! Chúng tôi sẽ liên hệ bạn trong 5 phút.'
    ]);
} else {
    http_response_code(500);
    error_log("Telegram API Error: " . $response);
    echo json_encode([
        'success' => false,
        'message' => 'Có lỗi xảy ra, vui lòng gọi Hotline.'
    ]);
}
```

### Ví dụ xử lý Backend (Node.js/Express)

```javascript
// File: api/submit-lead.js
// ============================================================
// BACKEND HANDLER (Node.js) — Nhận Lead từ Form & gửi Telegram
// ============================================================

const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// --- Rate Limiting (Chống spam) ---
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Tối đa 5 request / IP / 15 phút
  message: { success: false, message: 'Quá nhiều yêu cầu, vui lòng thử lại sau.' },
});

// --- POST /api/submit-lead ---
router.post(
  '/submit-lead',
  leadLimiter,
  [
    body('phone')
      .matches(/^(0[35789])\d{8}$/)
      .withMessage('SĐT không hợp lệ'),
    body('need').notEmpty().trim().escape(),
    body('area').optional().trim().escape(),
  ],
  async (req, res) => {
    // Validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { phone, need, area } = req.body;
    const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    // Format Telegram message
    const message =
      `🔔 *LEAD MỚI TỪ WEBSITE* 🔔\n\n` +
      `📞 *SĐT*: \`${phone}\`\n` +
      `📋 *Nhu cầu*: ${need}\n` +
      `📍 *Khu vực*: ${area || 'Chưa xác định'}\n` +
      `🕐 *Thời gian*: ${timestamp}\n\n` +
      `⚡ _Hãy liên hệ khách trong 5 phút!_`;

    const keyboard = {
      inline_keyboard: [
        [
          { text: '📞 Gọi ngay', url: `tel:${phone}` },
          { text: '💬 Nhắn Zalo', url: `https://zalo.me/${phone}` },
        ],
        [{ text: '✅ Đã xử lý', callback_data: `handled_${phone}` }],
      ],
    };

    try {
      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
          reply_markup: keyboard,
        },
      );

      // TODO: Lưu vào Database

      res.json({
        success: true,
        message: 'Đăng ký thành công! Chúng tôi sẽ liên hệ bạn trong 5 phút.',
      });
    } catch (error) {
      console.error('Telegram API Error:', error.response?.data || error.message);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra, vui lòng gọi Hotline.',
      });
    }
  },
);

module.exports = router;
```

## 2.3. Bước 3 — Frontend Form (HTML/JS)

```html
<!-- File: components/LeadForm.html -->
<!-- Smart Lead Form — Frictionless, chỉ 2-3 trường -->

<section id="lead-form" class="lead-form-section">
  <h2>📞 Để lại SĐT — Nhận ngay Voucher 200K</h2>
  <p class="form-subtitle">Cam kết liên hệ trong 5 phút · Tư vấn miễn phí</p>

  <form id="fptLeadForm" novalidate>
    <div class="form-group">
      <label for="phone">Số điện thoại <span class="required">*</span></label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Nhập số điện thoại (VD: 0901234567)"
        pattern="^(0[35789])\d{8}$"
        required
        autocomplete="tel"
      />
      <span class="error-msg" id="phone-error"></span>
    </div>

    <div class="form-group">
      <label for="need">Nhu cầu</label>
      <select id="need" name="need">
        <option value="Internet cáp quang">🌐 Internet cáp quang</option>
        <option value="Truyền hình FPT Play">📺 Truyền hình FPT Play</option>
        <option value="Camera FPT">📷 Camera FPT</option>
        <option value="Gói Combo">📦 Gói Combo (Internet + TV + Camera)</option>
        <option value="Khác">❓ Khác</option>
      </select>
    </div>

    <div class="form-group">
      <label for="area">Khu vực</label>
      <input
        type="text"
        id="area"
        name="area"
        placeholder="VD: Quận 7, TP.HCM"
        autocomplete="address-level2"
      />
    </div>

    <input type="hidden" id="recaptcha-token" name="g-recaptcha-response" />

    <button type="submit" id="submit-btn" class="cta-button">
      <span class="btn-text">🚀 Gửi đăng ký ngay</span>
      <span class="btn-loading" style="display:none;">⏳ Đang gửi...</span>
    </button>

    <p class="form-disclaimer">
      🔒 Thông tin được bảo mật bởi reCAPTCHA ·
      <a href="/chinh-sach-bao-mat/">Chính sách bảo mật</a>
    </p>
  </form>
</section>

<script src="https://www.google.com/recaptcha/api.js?render=YOUR_RECAPTCHA_SITE_KEY"></script>
<script>
  document.getElementById('fptLeadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Client-side validation
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^(0[35789])\d{8}$/;
    if (!phoneRegex.test(phone)) {
      document.getElementById('phone-error').textContent = 'Vui lòng nhập đúng SĐT (10 số)';
      return;
    }
    document.getElementById('phone-error').textContent = '';

    // UI: Loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    try {
      // Get reCAPTCHA token
      const token = await grecaptcha.execute('YOUR_RECAPTCHA_SITE_KEY', { action: 'submit_lead' });
      document.getElementById('recaptcha-token').value = token;

      // Submit to Backend
      const formData = new FormData(form);
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        // Redirect to Thank You page (hoặc hiển thị popup)
        window.location.href = '/cam-on/?ref=form';
      } else {
        alert(result.message || 'Có lỗi xảy ra. Vui lòng gọi Hotline.');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      alert('Lỗi kết nối. Vui lòng thử lại hoặc gọi Hotline.');
    } finally {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });
</script>
```

## 2.4. Bước 4 — Bảo mật & Best Practices

| Hạng mục           | Giải pháp                                                        |
| ------------------ | ---------------------------------------------------------------- |
| **Token bảo mật**  | Lưu trong `.env` file, KHÔNG hardcode trong source code          |
| **CORS**           | Chỉ cho phép domain chính thức (`Access-Control-Allow-Origin`)   |
| **Rate Limiting**  | Tối đa 5 request / IP / 15 phút                                  |
| **Input Sanitize** | Escape HTML, validate SĐT bằng regex cả Frontend + Backend       |
| **reCAPTCHA v3**   | Score threshold ≥ 0.5 để chặn bot                                |
| **HTTPS**          | Bắt buộc SSL certificate cho toàn bộ website                     |
| **Backup Lead**    | Lưu song song vào Database (MySQL/PostgreSQL) phòng Telegram lỗi |
| **Error Logging**  | Ghi log lỗi API vào file/service (Sentry, LogRocket)             |

---

# PHẦN 3: CHIẾN LƯỢC TỪ KHÓA SEO NGÀNH VIỄN THÔNG 2026

> [!NOTE]
> Thay vì chỉ SEO từ khóa ngắn cạnh tranh cao (VD: "lắp mạng fpt"), cần đánh mạnh vào **Local SEO** và **Problem-Solving SEO** để kéo traffic có tỷ lệ chuyển đổi cao nhất.

## 3.1. Ma trận Chiến lược Từ khóa

| #   | Nhóm Intent                               | Chiến thuật & Định dạng bài viết                                                                                   | Ví dụ Từ khóa Mục tiêu                                                                                  |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| 1   | **🎯 Local SEO** (Kéo Lead nóng)          | Tạo Landing Page riêng cho từng Quận/Huyện/Phường. Tối ưu Google Maps (Entity). Schema `LocalBusiness`.            | `Lắp mạng FPT Quận [Tên]` · `Cáp quang FPT Phường [Tên]` · `Số tổng đài FPT [Tỉnh/Thành]`               |
| 2   | **🔧 Problem-Solving** (Traffic khổng lồ) | Viết bài hướng dẫn kỹ thuật, xử lý lỗi. Chèn Banner CTA "Hỗ trợ kỹ thuật miễn phí / Nâng cấp gói cước" ở giữa bài. | `Cách đổi mật khẩu Wifi FPT Modem AX1800` · `Mạng FPT bị chấm than vàng` · `FPT Play lỗi 1004/1005`     |
| 3   | **⚖️ Commercial** (So sánh & Đánh giá)    | Bài Review thực tế, So sánh FPT vs Viettel/VNPT. Dùng Table so sánh tốc độ, giá cước. Schema `Product` + `Review`. | `So sánh Super 150 FPT và Mesh Viettel` · `Có nên lắp Camera FPT không?` · `Đánh giá FPT Play Max 2026` |
| 4   | **🔥 Trending / Promo** (Bắt trend)       | Cập nhật liên tục theo tháng. Schema Markup `Offer` để hiển thị giá trên Google. Structured Data FAQ.              | `Khuyến mãi lắp mạng FPT tháng [Tháng] [Năm]` · `FPT Telecom tặng Modem Wifi 6 ở đâu?`                  |

## 3.2. Kế hoạch Content theo tháng

| Tháng   | Số bài Local | Số bài Problem-Solving | Số bài Commercial | Số bài Trending | Tổng   |
| ------- | ------------ | ---------------------- | ----------------- | --------------- | ------ |
| Tháng 1 | 10           | 4                      | 2                 | 1               | 17     |
| Tháng 2 | 10           | 4                      | 2                 | 1               | 17     |
| Tháng 3 | 8            | 4                      | 2                 | 1               | 15     |
| **Q1**  | **28**       | **12**                 | **6**             | **3**           | **49** |

## 3.3. Schema Markup cần triển khai

```json
// Schema LocalBusiness — Cho trang Local SEO
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Đại lý FPT Telecom [Khu vực]",
  "image": "https://your-domain.com/images/office.webp",
  "telephone": "+84-xxx-xxx-xxx",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Địa chỉ]",
    "addressLocality": "[Quận/Huyện]",
    "addressRegion": "[Tỉnh/Thành]",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "xx.xxxx",
    "longitude": "xxx.xxxx"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "21:00"
  },
  "priceRange": "$$"
}
```

```json
// Schema Offer — Cho trang Khuyến mãi
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "Gói Super 150 FPT",
  "description": "Internet cáp quang 150Mbps, tặng Modem Wifi 6",
  "price": "195000",
  "priceCurrency": "VND",
  "availability": "https://schema.org/InStock",
  "validFrom": "2026-07-01",
  "validThrough": "2026-07-31"
}
```

## 3.4. Checklist On-page SEO cho mỗi trang

- [ ] **H1** duy nhất, chứa từ khóa chính + tên khu vực
- [ ] **Meta Title** ≤ 60 ký tự, chứa từ khóa + CTA
- [ ] **Meta Description** ≤ 155 ký tự, chứa USP + CTA
- [ ] **URL** ngắn gọn, chứa từ khóa (VD: `/internet-cap-quang/quan-7/`)
- [ ] **Heading hierarchy** chuẩn (H1 → H2 → H3, không nhảy cấp)
- [ ] **Alt text** cho tất cả ảnh (mô tả + từ khóa liên quan)
- [ ] **Internal linking** giữa các trang cùng nhóm dịch vụ
- [ ] **Schema Markup** phù hợp (LocalBusiness, Product, Offer, FAQ)
- [ ] **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Ảnh WebP/AVIF**, lazy-load, srcset responsive
- [ ] **Canonical URL** đúng, tránh duplicate content

---

# PHẦN 4: LỘ TRÌNH TRIỂN KHAI (TIMELINE)

## 4.1. Sprint Plan (Agile — 2-week sprints)

| Sprint | Tuần    | Mục tiêu                                              | Deliverable                                  |
| ------ | ------- | ----------------------------------------------------- | -------------------------------------------- |
| 0      | W1      | Kickoff, Setup môi trường, Cấu hình CI/CD             | Repo, Hosting, SSL, Domain                   |
| 1      | W1-W2   | Header + Hero + Trust Bar + Footer + FAB              | Mobile-first responsive layout hoàn chỉnh    |
| 2      | W3-W4   | Product Grid + Best Seller Table + Community Hub      | Service cards, Pricing table, Social links   |
| 3      | W5-W6   | Smart Lead Form + Telegram Bot + reCAPTCHA            | Form → Telegram pipeline hoạt động real-time |
| 4      | W7-W8   | Category Pages (Internet, TV, Camera, Combo)          | 4 category pages + SEO on-page               |
| 5      | W9-W10  | Blog system + 10 bài Local SEO đầu tiên               | CMS/Blog + Content Local SEO                 |
| 6      | W11-W12 | Kiểm tra hạ tầng Tool + /dang-ky-lap-dat/ + Analytics | Conversion tracking, GA4, Search Console     |
| 7      | W13-W14 | QA, Core Web Vitals tuning, Launch                    | Performance audit, Bug fix, Go-live          |

## 4.2. Tech Stack khuyến nghị

| Layer         | Công nghệ                               | Lý do                                         |
| ------------- | --------------------------------------- | --------------------------------------------- |
| **Framework** | Next.js 15 (App Router)                 | SSR/SSG, tối ưu Core Web Vitals, SEO-friendly |
| **Styling**   | Vanilla CSS + CSS Modules               | Nhẹ, không dependency, dễ maintain            |
| **Backend**   | Next.js API Routes hoặc Node.js Express | Xử lý Form, Telegram webhook                  |
| **Database**  | PostgreSQL (Supabase)                   | Lưu Lead backup, Analytics                    |
| **Hosting**   | Vercel / VPS (Nginx)                    | Edge network, auto-scaling, SSL miễn phí      |
| **Image**     | WebP/AVIF + CDN                         | Tối ưu LCP, lazy-load                         |
| **Analytics** | GA4 + Google Search Console             | Tracking conversion, SEO monitoring           |
| **Captcha**   | reCAPTCHA v3                            | Invisible, không làm phiền UX                 |
| **Chat**      | Zalo OA SDK + Telegram Bot API          | Chốt sale real-time                           |

---

## 💡 Lời khuyên của Project Manager

> [!TIP]
> **Tốc độ là vua**: Ngành Telecom khách hàng rất thiếu kiên nhẫn. Sử dụng WebP/AVIF, lazy-load và Next.js SSG để đạt Core Web Vitals > 90.

> [!TIP]
> **Trust Signal**: Chụp ảnh thực tế thi công, văn phòng giao dịch, hợp đồng (che thông tin nhạy cảm). Ảnh thực tế tăng tỷ lệ điền Form lên tới **40%**.

> [!IMPORTANT]
> **Zalo/Telegram Bot**: Đừng chỉ dùng Form tĩnh. Tích hợp nút "Chat Zalo OA" hoặc Telegram Bot ngay phần Giá cước. Khi khách đang phân vân, một cú click chat giúp chốt sale trước khi họ lướt sang web đối thủ.

---

> **Tài liệu này là tài sản nội bộ của dự án. Mọi thay đổi cần được Senior PM phê duyệt.**  
> **Phiên bản**: v1.0 | **Cập nhật**: 16/07/2026 | **Tác giả**: AI Project Manager
