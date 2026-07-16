// ============================================================
// Site Configuration — FPT Telecom
// ============================================================
// Tập trung tất cả config tĩnh của website tại đây.
// Sử dụng: import { siteConfig } from '@/config/site';
// ============================================================

export const siteConfig = {
  name: 'FPT Telecom',
  description: 'Lắp mạng FPT - Internet cáp quang, Truyền hình FPT Play, Camera FPT',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://fpt-telecom.vn',
  ogImage: '/images/og-default.jpg',
  hotline: '0888.888.888',
  zaloOA: 'https://zalo.me/YOUR_ZALO_OA_ID',
  telegram: 'https://t.me/YOUR_BOT_USERNAME',
  address: 'Số XX, Đường YY, Quận ZZ, TP.HCM',
  workingHours: '08:00 - 21:00 (T2 - CN)',
  social: {
    facebook: 'https://facebook.com/fpttelecom',
    youtube: 'https://youtube.com/@fpttelecom',
    tiktok: 'https://tiktok.com/@fpttelecom',
    zalo: 'https://zalo.me/YOUR_ZALO_OA_ID',
  },
} as const;

export type SiteConfig = typeof siteConfig;
