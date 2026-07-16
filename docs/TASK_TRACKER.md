# 📋 TASK TRACKER — Website FPT Telecom

> **Trạng thái tổng**: 🟡 Đang triển khai  
> **Cập nhật lần cuối**: 16/07/2026  
> **Sprint hiện tại**: Sprint 0 — Setup & Planning  
> **Phiên bản**: v1.0

---

## 🔧 TECH STACK (Đã chốt)

| Layer             | Công nghệ                                | Ghi chú                                     |
| ----------------- | ---------------------------------------- | ------------------------------------------- |
| **Framework**     | Next.js 15 (App Router)                  | SSR/SSG, React Server Components            |
| **UI Library**    | React 19                                 | Concurrent features                         |
| **Language**      | TypeScript (Strict Mode)                 | `strict: true` trong tsconfig               |
| **Styling**       | Tailwind CSS v4                          | JIT, CSS-first config                       |
| **Components**    | shadcn/ui                                | Radix primitives, customizable              |
| **Form**          | React Hook Form + Zod                    | Validation schema-first                     |
| **Data Fetching** | TanStack Query v5                        | Cache, retry, optimistic updates            |
| **State**         | Zustand                                  | Lightweight, no boilerplate                 |
| **CMS**           | MDX (bài viết) + Payload CMS (nếu scale) | Giai đoạn 1: MDX, giai đoạn 2: Headless CMS |
| **Database**      | PostgreSQL (Neon / Supabase)             | Lưu Lead, Analytics, Backup                 |
| **Hosting**       | Vercel                                   | Edge network, Preview Deploys, Auto SSL     |
| **Analytics**     | GA4 + Clarity + Meta Pixel               | Tracking đa kênh                            |
| **Monitoring**    | Sentry + Better Stack                    | Error tracking + Uptime                     |
| **Testing**       | Vitest + Playwright                      | Unit + E2E                                  |
| **CI/CD**         | GitHub Actions                           | Lint → Build → Preview → Production         |

---

## PHASE 0: PLANNING & SETUP

> ⚠️ **Phase quan trọng nhất** — Quyết định toàn bộ kiến trúc dự án.

### Tài liệu & Scope

- [x] Lập Project Scope & Sitemap
- [x] Thiết kế Wireframe trang chủ (CRO)
- [x] Viết tài liệu kỹ thuật tích hợp Form + Telegram Bot
- [x] Hoạch định chiến lược từ khóa SEO Local/Informational

### Environment

- [x] Thiết lập `.env.example` (template biến môi trường)
- [x] Quy ước ENV Development / Staging / Production
- [ ] Secret Management (Vercel Environment Variables)
- [x] `.env.local` cho development, `.env.production` cho production

### Architecture (Next.js 15)

- [x] App Router (`/app` directory)
- [x] TypeScript Strict Mode (`"strict": true`)
- [x] Tailwind CSS v4 (CSS-first config)
- [x] shadcn/ui (component library)
- [x] React Hook Form + Zod Validation (form schema)
- [x] TanStack Query v5 (server state management)
- [x] Zustand (client state management)
- [x] MDX cho Blog (giai đoạn 1)

### Coding Standards

- [x] ESLint (Next.js preset + custom rules)
- [x] Prettier (format on save)
- [x] Husky + lint-staged (pre-commit hooks)
- [x] Commit Convention — Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- [x] `.editorconfig` (thống nhất IDE settings)

### Repository & CI/CD

- [x] Setup Git Repository (local init)
- [x] Branch strategy: `main` → `staging` → `feature/*`
- [x] GitHub Actions pipeline:
  - [x] `PR → Lint (ESLint + Prettier check)`
  - [x] `PR → Type Check (tsc --noEmit)`
  - [x] `PR → Unit Test (Vitest)`
  - [x] `PR → Build`
  - [ ] `PR → Deploy Preview (Vercel)`
  - [ ] `main → Deploy Production (Vercel)`
- [x] Branch protection rules (require PR review, passing CI)
- [x] Dependabot (auto dependency updates)

### Deployment Environments

- [ ] **Preview**: Mỗi PR tự động deploy preview URL
- [ ] **Staging**: Branch `staging` → staging.your-domain.com
- [ ] **Production**: Branch `main` → your-domain.com
- [ ] Rollback strategy (Vercel Instant Rollback)
- [ ] Environment Variables cho từng environment

### Infrastructure & Accounts

- [ ] Mua Domain + DNS (Cloudflare / Vercel DNS)
- [ ] Tạo tài khoản GA4 + Google Search Console
- [ ] Tạo tài khoản Bing Webmaster Tools
- [ ] Tạo Telegram Bot (@BotFather) & lấy Token + Chat ID
- [ ] Đăng ký reCAPTCHA v3 (Google)
- [ ] Đăng ký Zalo OA (Official Account)
- [ ] Setup Neon / Supabase (PostgreSQL database)
- [ ] Setup Sentry (error monitoring)
- [ ] Setup Better Stack / Uptime Robot (uptime monitoring)

---

## PHASE 1: FRONTEND — Trang Chủ (Sprint 1-2)

### Sprint 1 (W1-W2): Layout cơ bản

- [ ] **Header (Sticky)**
  - [ ] Logo FPT đại lý
  - [ ] Hotline click-to-call (`tel:` link)
  - [ ] Menu responsive (hamburger mobile)
  - [ ] Mega Menu (expandable cho nhiều Category)
  - [ ] Nút CTA nổi bật: "Đăng ký & Kiểm tra hạ tầng"
  - [ ] Sticky CTA đổi màu / thu gọn khi scroll (scroll-aware)
  - [ ] Skip navigation link (Accessibility)
- [ ] **Hero Section**
  - [ ] H1 chứa từ khóa chính + khu vực
  - [ ] Sub-text USP (Lắp 24h, Online 100%, Zalo 1:1)
  - [ ] Nút CTA "Nhận báo giá ngay" (anchor scroll → Form)
  - [ ] Desktop: Video background (autoplay, muted, loop)
  - [ ] Mobile: Image WebP/AVIF (tối ưu LCP, KHÔNG autoplay video)
  - [ ] Blur placeholder cho image loading
- [ ] **Trust Bar**
  - [ ] Logo đối tác (FPT, Qualcomm, TP-Link...)
  - [ ] Google Reviews badge (★★★★★ rating)
  - [ ] Counter animated: "5,000+ khách hàng tin dùng"
  - [ ] Badge: "Lắp đặt trong 24h"
  - [ ] Badge: "100% chính hãng FPT"
  - [ ] Badge chứng nhận đại lý ủy quyền
- [ ] **Footer**
  - [ ] Thông tin liên hệ (NAP: Name, Address, Phone)
  - [ ] Google Maps embed (lazy-load)
  - [ ] Liên kết MXH (Zalo OA, Facebook, YouTube, TikTok)
  - [ ] Giấy phép ĐKKD
  - [ ] Sitemap links
  - [ ] Schema `LocalBusiness` (JSON-LD trong Footer)
  - [ ] Schema `Organization` (JSON-LD)
- [ ] **FAB (Floating Action Button)**
  - [ ] Nút Zalo OA (ưu tiên — khách FPT đa số dùng Zalo)
  - [ ] Nút Hotline (Click-to-call)
  - [ ] Nút Messenger
  - [ ] Nút SMS
  - [ ] Nút Telegram (Bot tư vấn)
  - [ ] Pulse animation
  - [ ] Expand/collapse trên mobile (tránh che nội dung)

### Sprint 2 (W3-W4): Content Sections

- [ ] **Product Grid**
  - [ ] Card Internet cáp quang
  - [ ] Card FPT Play
  - [ ] Card Camera FPT
  - [ ] Card Gói Combo
  - [ ] Hiển thị "Giá chỉ từ" (H2), băng thông, icon tính năng
  - [ ] Nút "Xem chi tiết" → Category page
  - [ ] JSON-LD `Product` Schema cho mỗi card
  - [ ] Hover animation + focus states (A11y)
- [ ] **Best Seller Table**
  - [ ] Bảng so sánh 3 gói: Super 80 / Super 150 / Super 200
  - [ ] Cột chi tiết:
    - [ ] Upload speed
    - [ ] Download speed
    - [ ] Số thiết bị kết nối
    - [ ] Mesh Wifi (Có/Không)
    - [ ] Phù hợp cho (1-2 TB, GĐ 4 người, Streaming 4K)
    - [ ] Khuyến mãi đi kèm
  - [ ] Highlight gói đề xuất (recommend badge)
  - [ ] Nút CTA từng gói → anchor Form
  - [ ] Responsive: scroll horizontal trên mobile
  - [ ] JSON-LD `Offer` Schema
- [ ] **Community Hub**
  - [ ] Khối nền màu tương phản
  - [ ] Copywriting kêu gọi tham gia cộng đồng
  - [ ] Thứ tự ưu tiên kênh:
    - [ ] 1️⃣ Zalo OA (chính)
    - [ ] 2️⃣ Facebook Group/Page
    - [ ] 3️⃣ Telegram Group (phụ)
  - [ ] Social proof: "X người đã tham gia"

---

## PHASE 2: BACKEND — Form & Lead Pipeline (Sprint 3)

### Sprint 3 (W5-W6): Lead Pipeline

- [ ] **Smart Lead Form (Frontend — React Hook Form + Zod)**
  - [ ] Input Họ Tên
  - [ ] Input SĐT — Zod schema: `z.string().regex(/^(0)(3|5|7|8|9)\d{8}$/)`
  - [ ] Select Nhu cầu (Internet / TV / Camera / Combo / Khác)
  - [ ] Input Địa chỉ (autocomplete / select Quận-Huyện)
  - [ ] Select Gói cước quan tâm (optional)
  - [ ] Textarea Ghi chú (optional)
  - [ ] Checkbox Consent: "Tôi đồng ý với [Chính sách bảo mật] và cho phép liên hệ tư vấn" (bắt buộc — PDPA / Nghị định 13)
  - [ ] reCAPTCHA v3 invisible integration
  - [ ] Honeypot field (hidden anti-spam)
  - [ ] Loading state UI (skeleton / spinner)
  - [ ] Error handling UI (inline field errors)
  - [ ] Success: Thank-you redirect / popup với mã voucher
- [ ] **Backend API (`/api/submit-lead`) — Next.js Route Handler**
  - [ ] Zod server-side validation & sanitization
  - [ ] reCAPTCHA v3 server-side verification (score ≥ 0.5)
  - [ ] Rate limiting (5 req / IP / 15 phút)
  - [ ] Rate limiting theo User-Agent (chặn bot)
  - [ ] CORS whitelist (chỉ domain chính)
  - [ ] Honeypot validation
  - [ ] Browser Fingerprint check (optional, FingerprintJS)
  - [ ] Lưu Lead vào PostgreSQL (Neon/Supabase) — primary storage
  - [ ] **Notification Pipeline**:
    - [ ] Telegram Bot API (sendMessage + Inline Buttons)
    - [ ] Zalo OA notification (nếu có API)
    - [ ] Email notification backup (Resend / Nodemailer)
  - [ ] Inline Buttons Telegram: "📞 Gọi ngay" / "💬 Nhắn Zalo" / "✅ Đã xử lý"
  - [ ] Queue / Retry mechanism (nếu Telegram/Email lỗi)
  - [ ] Webhook logging (ghi log mọi request/response)
  - [ ] Error logging (Sentry integration)
- [ ] **Security Headers & Bảo mật**
  - [ ] Token lưu trong `.env` (KHÔNG hardcode)
  - [ ] HTTPS enforce (redirect HTTP → HTTPS)
  - [ ] Helmet Headers:
    - [ ] `Content-Security-Policy`
    - [ ] `X-Frame-Options: DENY`
    - [ ] `X-Content-Type-Options: nosniff`
    - [ ] `Strict-Transport-Security` (HSTS)
    - [ ] `Referrer-Policy`
    - [ ] `Permissions-Policy`
  - [ ] Input escape (XSS prevention)
  - [ ] CSRF protection (Next.js built-in / custom token)

---

## PHASE 3: CATEGORY PAGES (Sprint 4)

### Sprint 4 (W7-W8): Trang dịch vụ

- [ ] **/internet-cap-quang/**
  - [ ] Sub-page: Gói Cá nhân
  - [ ] Sub-page: Gói Doanh nghiệp
  - [ ] Sub-page: Gói Sky/Max
  - [ ] Bảng giá cước (responsive table)
  - [ ] CTA → Form đăng ký
  - [ ] FAQ section (Câu hỏi thường gặp)
  - [ ] Customer Reviews / Testimonials
  - [ ] Related Articles (bài blog liên quan)
  - [ ] Breadcrumb navigation
- [ ] **/truyen-hinh-fpt-play/**
  - [ ] Sub-page: Gói Max
  - [ ] Sub-page: Gói VIP
  - [ ] Sub-page: Gói Sport
  - [ ] FAQ + Reviews + Breadcrumb
- [ ] **/camera-fpt/**
  - [ ] Sub-page: Camera trong nhà
  - [ ] Sub-page: Camera ngoài trời
  - [ ] Sub-page: Cloud storage
  - [ ] FAQ + Reviews + Breadcrumb
- [ ] **/goi-combo/**
  - [ ] Bảng so sánh combo (Internet + TV + Camera)
  - [ ] FAQ + Reviews + Breadcrumb
- [ ] **SEO On-page** cho tất cả category pages
  - [ ] Meta Title ≤ 60 ký tự
  - [ ] Meta Description ≤ 155 ký tự
  - [ ] Canonical URL
  - [ ] Internal linking giữa các category
  - [ ] CTA button xuyên suốt mỗi trang
  - [ ] Schema Markup:
    - [ ] `Product` Schema
    - [ ] `Offer` Schema
    - [ ] `FAQ` Schema
    - [ ] `BreadcrumbList` Schema
    - [ ] `Review` / `AggregateRating` Schema

---

## PHASE 4: BLOG & LOCAL SEO (Sprint 5)

### Sprint 5 (W9-W10): Content System

- [ ] **Blog/CMS Setup (MDX)**
  - [ ] Template bài viết (MDX components)
  - [ ] Author info (avatar, tên, bio)
  - [ ] Published Date + Updated Date (hiển thị cả 2)
  - [ ] Reading Time estimation
  - [ ] Table of Contents (TOC) tự động generate
  - [ ] Breadcrumb navigation
  - [ ] Sidebar: Bài viết liên quan + Banner CTA
  - [ ] Share buttons (Zalo, Facebook, Copy Link)
  - [ ] Related Posts section (cuối bài)
  - [ ] FAQ section (cuối bài, có Schema)
  - [ ] Schema `Article` / `BlogPosting` (JSON-LD)
- [ ] **10 bài Local SEO đầu tiên**
  - [ ] Lắp mạng FPT Quận 1
  - [ ] Lắp mạng FPT Quận 7
  - [ ] Lắp mạng FPT Thủ Đức
  - [ ] Lắp mạng FPT Bình Thạnh
  - [ ] Lắp mạng FPT Gò Vấp
  - [ ] Lắp mạng FPT Tân Bình
  - [ ] Lắp mạng FPT Phú Nhuận
  - [ ] Lắp mạng FPT Quận 2
  - [ ] Lắp mạng FPT Quận 9
  - [ ] Lắp mạng FPT Bình Dương
- [ ] **5 bài Problem-Solving**
  - [ ] Cách đổi mật khẩu Wifi FPT Modem AX1800
  - [ ] Mạng FPT bị chấm than vàng xử lý thế nào?
  - [ ] FPT Play lỗi 1004 / 1005
  - [ ] Cách kiểm tra tốc độ mạng FPT chính xác
  - [ ] Reset Modem FPT về mặc định

---

## PHASE 5: CONVERSION PAGES & ANALYTICS (Sprint 6)

### Sprint 6 (W11-W12): Conversion Optimization

- [ ] **/dang-ky-lap-dat/** (Landing Page thu Lead)
  - [ ] Full-page Form (Tên, SĐT, Địa chỉ, Gói cước, Ghi chú)
  - [ ] Consent checkbox (PDPA)
  - [ ] Tích hợp multi-channel notification (Telegram + Zalo + Email)
  - [ ] Thank-you page với mã voucher
- [ ] **/kiem-tra-ha-tang/** (Tool kiểm tra)
  - [ ] Input địa chỉ (autocomplete)
  - [ ] API check vùng phủ sóng FPT
  - [ ] Kết quả: Có/Không + CTA đăng ký
- [ ] **Analytics & Tracking**
  - [ ] GA4 Event tracking (form_submit, cta_click, scroll_depth, phone_click)
  - [ ] Google Search Console property setup
  - [ ] Conversion tracking (GA4 Goals)
  - [ ] Microsoft Clarity (heatmap + session recording)
  - [ ] Meta Pixel (Facebook/Instagram ads)
  - [ ] TikTok Pixel (nếu chạy TikTok ads)
  - [ ] Google Ads Conversion tracking (nếu chạy Google Ads)
  - [ ] UTM parameters management
  - [ ] CTR tracking (click-through rate per CTA)
- [ ] **Pháp lý**
  - [ ] /chinh-sach-bao-mat/ (PDPA / Nghị định 13 compliant)
  - [ ] /dieu-khoan-su-dung/

---

## PHASE 6: QA & LAUNCH (Sprint 7)

### Sprint 7 (W13-W14): Go-Live

- [ ] **Performance Audit**
  - [ ] Lighthouse targets:
    - [ ] Performance ≥ 95
    - [ ] SEO = 100
    - [ ] Accessibility ≥ 95
    - [ ] Best Practices = 100
  - [ ] Core Web Vitals:
    - [ ] **LCP < 2.5s** (Largest Contentful Paint)
    - [ ] **INP < 200ms** (Interaction to Next Paint — thay thế FID)
    - [ ] **CLS < 0.1** (Cumulative Layout Shift)
  - [ ] Image optimization audit (WebP/AVIF, lazy-load, srcset, blur placeholder)
  - [ ] Bundle size audit (< 200KB JS initial load)
  - [ ] Font loading strategy (font-display: swap)
- [ ] **Image SEO**
  - [ ] Alt text mô tả + từ khóa cho tất cả ảnh
  - [ ] Title attribute
  - [ ] Lazy loading (`loading="lazy"`)
  - [ ] Format: AVIF > WebP > JPEG fallback
  - [ ] Blur placeholder (next/image)
  - [ ] Responsive srcset
- [ ] **Accessibility (WCAG 2.1 AA)**
  - [ ] ARIA labels cho interactive elements
  - [ ] Keyboard navigation (Tab, Enter, Escape)
  - [ ] Screen reader testing (NVDA / VoiceOver)
  - [ ] Color contrast ratio ≥ 4.5:1 (text) / ≥ 3:1 (large text)
  - [ ] Focus indicators visible
  - [ ] Skip navigation link
  - [ ] Form labels & error announcements
- [ ] **Cross-browser Testing**
  - [ ] Chrome (Desktop + Mobile)
  - [ ] Safari (iOS + macOS)
  - [ ] Firefox
  - [ ] Samsung Internet
  - [ ] Edge
- [ ] **Mobile Responsiveness**
  - [ ] iPhone SE (375px)
  - [ ] iPhone 15 Pro (393px)
  - [ ] Samsung Galaxy S24 (412px)
  - [ ] iPad (768px)
  - [ ] Desktop (1024px, 1440px, 1920px)
- [ ] **Functional Testing**
  - [ ] Form submission → Telegram + Email nhận lead
  - [ ] reCAPTCHA + Honeypot chặn spam
  - [ ] Rate limiting hoạt động
  - [ ] Click-to-call trên mobile
  - [ ] FAB buttons hoạt động (Zalo, Call, Messenger, SMS, Telegram)
  - [ ] Tất cả internal links hoạt động (no broken links)
  - [ ] Consent checkbox bắt buộc
- [ ] **Edge Case Testing**
  - [ ] 404 page (custom, có CTA quay về trang chủ)
  - [ ] 500 error page (custom)
  - [ ] Offline / No Internet state
  - [ ] Slow 3G simulation
  - [ ] Dark Mode (nếu hỗ trợ)
  - [ ] Empty states
- [ ] **SEO Pre-launch Checklist**
  - [ ] `robots.txt` (allow/disallow rules)
  - [ ] `sitemap.xml` (auto-generated, submit lên GSC)
  - [ ] Canonical URLs (tất cả trang)
  - [ ] `hreflang` (nếu multi-language)
  - [ ] Open Graph meta tags
  - [ ] Twitter Cards meta tags
  - [ ] OG Image auto-generation (per page)
  - [ ] RSS Feed (`/feed.xml`)
  - [ ] Schema Markup validation (Google Rich Results Test)
  - [ ] `llms.txt` (AI crawler guidance — 2026 standard)
- [ ] **Go-Live**
  - [ ] DNS pointing (Vercel / Cloudflare)
  - [ ] SSL certificate verify (auto via Vercel)
  - [ ] 301 redirects (nếu migrate từ site cũ)
  - [ ] Submit sitemap.xml → Google Search Console
  - [ ] Submit sitemap.xml → Bing Webmaster Tools
  - [ ] IndexNow ping (instant index notification)
  - [ ] Google Merchant Center (nếu có sản phẩm)
  - [ ] Monitor error logs 48h sau launch (Sentry)

---

## PHASE 7: TESTING (Sprint 8)

### Sprint 8 (W15-W16): Automated Testing

- [ ] **Unit Testing (Vitest)**
  - [ ] Zod validation schemas (form, API)
  - [ ] Utility functions
  - [ ] Component rendering tests
  - [ ] API route handlers
  - [ ] Coverage target ≥ 80%
- [ ] **Integration Testing (Vitest)**
  - [ ] Form submission flow (frontend → API → DB)
  - [ ] Telegram notification delivery
  - [ ] Email notification delivery
  - [ ] reCAPTCHA verification flow
  - [ ] Rate limiting behavior
- [ ] **E2E Testing (Playwright)**
  - [ ] Homepage full user journey (scroll → click CTA → fill form → submit)
  - [ ] Category page navigation
  - [ ] Blog article reading flow
  - [ ] Mobile navigation (hamburger menu)
  - [ ] FAB interaction
  - [ ] Form validation error states
  - [ ] Thank-you page after submission
  - [ ] 404 page redirect
  - [ ] Cross-browser E2E (Chrome, Firefox, Safari)

---

## PHASE 8: MONITORING & OBSERVABILITY (Sprint 9)

### Sprint 9 (W17-W18): Production Monitoring

- [ ] **Error Monitoring (Sentry)**
  - [ ] Next.js integration (client + server)
  - [ ] Source maps upload
  - [ ] Alert rules (Slack / Telegram notification)
  - [ ] Performance monitoring (transactions)
- [ ] **Uptime Monitoring**
  - [ ] Better Stack / Uptime Robot setup
  - [ ] Monitor endpoints: Homepage, API, Form submission
  - [ ] Alert via Telegram/Email khi downtime
  - [ ] Status page (optional)
- [ ] **Log Management**
  - [ ] Better Stack Logtail / Vercel Logs
  - [ ] Structured logging (JSON format)
  - [ ] Webhook request/response logging
  - [ ] API error logging với context
- [ ] **Cron Health Checks**
  - [ ] Sitemap.xml generation check
  - [ ] Database connection health
  - [ ] Telegram Bot connectivity
  - [ ] SSL certificate expiry monitor

---

## PHASE 9: AI SEO & FUTURE-PROOFING (Sprint 10)

> 🤖 **2026 Standard**: AI Search Engines (Google AI Overview, Bing Copilot, Perplexity) đang thay đổi cách crawl và hiển thị kết quả.

- [ ] **AI SEO Optimization**
  - [ ] `llms.txt` file (hướng dẫn AI crawler)
  - [ ] AI Crawl Optimization (clear, structured content)
  - [ ] Structured FAQ trên mỗi trang (AI snippet-friendly)
  - [ ] Semantic HTML chuẩn (H1-H6 hierarchy, `<article>`, `<section>`, `<nav>`)
  - [ ] Entity SEO (xây dựng Entity cho "Đại lý FPT [Khu vực]")
  - [ ] Knowledge Graph optimization
- [ ] **Schema Markup toàn diện**
  - [ ] `Organization` Schema
  - [ ] `LocalBusiness` Schema (mỗi chi nhánh)
  - [ ] `FAQ` Schema (mỗi trang category + blog)
  - [ ] `BreadcrumbList` Schema
  - [ ] `Article` / `BlogPosting` Schema
  - [ ] `Product` + `Offer` Schema
  - [ ] `Review` / `AggregateRating` Schema
  - [ ] `HowTo` Schema (bài hướng dẫn)
- [ ] **Technical SEO nâng cao**
  - [ ] `hreflang` tags (nếu multi-region)
  - [ ] Canonical URLs kiểm tra toàn bộ
  - [ ] OG Image auto-generation (dynamic per page)
  - [ ] RSS Feed cho blog
  - [ ] `robots.txt` fine-tuning
  - [ ] IndexNow integration (tự động ping khi publish bài mới)

---

## POST-LAUNCH: ONGOING (Monthly)

### Content Calendar (hàng tháng)

- [ ] 8-10 bài Local SEO mới (Landing Page theo Quận/Huyện)
- [ ] 4 bài Problem-Solving (hướng dẫn kỹ thuật)
- [ ] 2 bài Commercial (So sánh/Review)
- [ ] 1 bài Trending/Promo (cập nhật khuyến mãi tháng)

### SEO & Marketing Ongoing

- [ ] **Backlink Building** (guest post, PR, directory listing)
- [ ] **Google Business Profile** (GBP) optimization
- [ ] **Google Reviews** — khuyến khích khách đánh giá
- [ ] Keyword ranking tracking (Ahrefs / SEMrush)
- [ ] CTR tracking per page (Search Console)
- [ ] Heatmap & Session Recording review (Clarity)

### Performance Monitoring (hàng tuần)

- [ ] Core Web Vitals check: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Sentry error review & fix
- [ ] Uptime report review
- [ ] Form conversion rate tracking
- [ ] Lead response time audit (target: < 5 phút)

### A/B Testing (hàng quý)

- [ ] CTA copy variations
- [ ] Form fields (3 vs 5 trường)
- [ ] Hero: Video Desktop vs Image-only
- [ ] Giá hiển thị (có/không hiển thị giá trên trang chủ)
- [ ] FAB position & channels

---

## 📊 Bảng tổng hợp thay đổi v1 → v2

| Mục                 | v1 (Cũ)                          | v2 (Mới)                                              | Trạng thái |
| ------------------- | -------------------------------- | ----------------------------------------------------- | ---------- |
| Tech Stack          | Next.js 15 / Nuxt.js (chưa chốt) | ✅ Next.js 15 + React 19 + TypeScript                 | ✅ Đã sửa  |
| Core Web Vitals     | FID < 100ms                      | ✅ INP < 200ms (Google đã bỏ FID)                     | ✅ Đã sửa  |
| Regex SĐT           | `^(0[35789])\d{8}$`              | ✅ `^(0)(3\|5\|7\|8\|9)\d{8}$` + Zod                  | ✅ Đã sửa  |
| Lighthouse          | ≥ 90                             | ✅ Performance ≥95, SEO=100, A11y ≥95, BP=100         | ✅ Đã sửa  |
| Environment         | Thiếu                            | ✅ `.env.example`, ENV quy ước, Secret Management     | ✅ Bổ sung |
| Coding Standards    | Thiếu                            | ✅ ESLint, Prettier, Husky, Conventional Commits      | ✅ Bổ sung |
| Architecture        | Thiếu                            | ✅ App Router, TS Strict, Tailwind v4, shadcn/ui      | ✅ Bổ sung |
| State Management    | Thiếu                            | ✅ Zustand                                            | ✅ Bổ sung |
| CMS                 | Thiếu                            | ✅ MDX (giai đoạn 1), Payload CMS (scale)             | ✅ Bổ sung |
| Database            | "Backup" (chưa rõ)               | ✅ PostgreSQL (Neon / Supabase)                       | ✅ Bổ sung |
| CI/CD               | Thiếu                            | ✅ GitHub Actions pipeline đầy đủ                     | ✅ Bổ sung |
| Deployment          | Thiếu                            | ✅ Preview / Staging / Production / Rollback          | ✅ Bổ sung |
| Testing             | Thiếu                            | ✅ Vitest + Playwright (Unit + Integration + E2E)     | ✅ Bổ sung |
| Monitoring          | Thiếu                            | ✅ Sentry + Better Stack + Logtail + Cron Health      | ✅ Bổ sung |
| Accessibility       | Thiếu                            | ✅ WCAG 2.1 AA, ARIA, Keyboard, Screen Reader         | ✅ Bổ sung |
| Security Headers    | Thiếu                            | ✅ CSP, HSTS, X-Frame-Options, Helmet                 | ✅ Bổ sung |
| AI SEO              | Thiếu                            | ✅ llms.txt, Entity SEO, Structured FAQ               | ✅ Bổ sung |
| Image SEO           | Thiếu                            | ✅ Alt, Title, AVIF, Blur Placeholder                 | ✅ Bổ sung |
| Form Consent        | Thiếu                            | ✅ PDPA / Nghị định 13 checkbox                       | ✅ Bổ sung |
| Spam Detection      | Thiếu                            | ✅ Honeypot + Fingerprint + Rate limit User-Agent     | ✅ Bổ sung |
| Notification Backup | Telegram only                    | ✅ Telegram + Zalo OA + Email (multi-channel)         | ✅ Bổ sung |
| Analytics           | GA4 only                         | ✅ GA4 + Clarity + Meta Pixel + TikTok Pixel          | ✅ Bổ sung |
| FAB Channels        | Zalo + Telegram                  | ✅ Zalo + Hotline + Messenger + SMS + Telegram        | ✅ Bổ sung |
| Community ưu tiên   | Telegram trước                   | ✅ Zalo OA → Facebook → Telegram                      | ✅ Đã sửa  |
| Blog features       | Thiếu nhiều                      | ✅ Author, Date, Reading Time, Share, FAQ, Related    | ✅ Bổ sung |
| Category features   | Thiếu                            | ✅ FAQ, Review, CTA, Related, Breadcrumb, Schema      | ✅ Bổ sung |
| Header              | Basic sticky                     | ✅ Scroll-aware CTA + Mega Menu                       | ✅ Bổ sung |
| Hero                | Video autoplay                   | ✅ Desktop: Video / Mobile: Image WebP (tối ưu LCP)   | ✅ Đã sửa  |
| Schema Markup       | LocalBusiness, Offer             | ✅ + Organization, FAQ, Breadcrumb, Article, Review   | ✅ Bổ sung |
| QA Edge Cases       | Thiếu                            | ✅ 404, 500, Offline, Slow 3G, Dark Mode              | ✅ Bổ sung |
| SEO Launch          | GSC only                         | ✅ + IndexNow, Bing Webmaster, Google Merchant        | ✅ Bổ sung |
| Post-launch         | Basic                            | ✅ Backlink, GBP, Reviews, Heatmap, Session Recording | ✅ Bổ sung |

---

> **📌 Ghi chú**: Đánh dấu `[x]` khi hoàn thành task. Cập nhật file này mỗi cuối Sprint.  
> **Changelog**: v1.0 — 16/07/2026
