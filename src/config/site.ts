// ============================================================
// Site Configuration — FPT Telecom
// ============================================================
// Tất cả config đọc từ Environment Variables.
// Fallback values chỉ dùng cho development.
// Sử dụng: import { siteConfig } from '@/config/site';
// ============================================================

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'FPT Telecom',
  description:
    'Lắp mạng FPT - Internet cáp quang, Truyền hình FPT Play, Camera FPT',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://fpt-telecom.vn',
  ogImage: '/images/og-default.jpg',

  // Thông tin liên hệ — ĐỌC TỪ ENV, không hardcode
  hotline: process.env.NEXT_PUBLIC_HOTLINE || '0888.888.888',
  zaloOA:
    process.env.NEXT_PUBLIC_ZALO_OA_URL || 'https://zalo.me/YOUR_ZALO_OA_ID',
  telegram:
    process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/YOUR_BOT_USERNAME',
  address:
    process.env.NEXT_PUBLIC_ADDRESS || 'Số XX, Đường YY, Quận ZZ, TP.HCM',
  email: process.env.NEXT_PUBLIC_EMAIL || 'hotro@fpt-telecom.vn',
  workingHours: '08:00 - 21:00 (T2 - CN)',

  social: {
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/fpttelecom',
    youtube:
      process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@fpttelecom',
    tiktok:
      process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@fpttelecom',
    zalo:
      process.env.NEXT_PUBLIC_ZALO_OA_URL || 'https://zalo.me/YOUR_ZALO_OA_ID',
  },
};

export type SiteConfig = typeof siteConfig;
