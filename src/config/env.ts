// ============================================================
// Environment Variables — Type-safe access
// ============================================================
// Sử dụng: import { env } from '@/config/env';
// Server-only variables chỉ dùng trong Server Components / API Routes.
// ============================================================

import { z } from 'zod';

// --- Server-only environment variables ---
const serverSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  RECAPTCHA_SECRET_KEY: z.string().optional(),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  NOTIFICATION_EMAIL: z.string().email().optional(),
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

// --- Client-safe environment variables (NEXT_PUBLIC_*) ---
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('FPT Telecom'),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1, 'RECAPTCHA_SITE_KEY is required'),
  // Site Config
  NEXT_PUBLIC_HOTLINE: z.string().default('0383900321'),
  NEXT_PUBLIC_ADDRESS: z.string().optional(),
  NEXT_PUBLIC_ZALO_OA_URL: z.string().url().optional(),
  NEXT_PUBLIC_ZALO_GROUP_URL: z.string().url().optional(),
  NEXT_PUBLIC_TELEGRAM_URL: z.string().url().optional(),
  NEXT_PUBLIC_FACEBOOK_URL: z.string().url().optional(),
  NEXT_PUBLIC_YOUTUBE_URL: z.string().url().optional(),
  NEXT_PUBLIC_TIKTOK_URL: z.string().url().optional(),
  // Analytics
  NEXT_PUBLIC_GA4_ID: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_TIKTOK_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),
});

// --- Parse & validate ---
// Chỉ validate server env khi ở server-side
const isServer = typeof window === 'undefined';

const clientEnv = clientSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  NEXT_PUBLIC_HOTLINE: process.env.NEXT_PUBLIC_HOTLINE,
  NEXT_PUBLIC_ADDRESS: process.env.NEXT_PUBLIC_ADDRESS,
  NEXT_PUBLIC_ZALO_OA_URL: process.env.NEXT_PUBLIC_ZALO_OA_URL,
  NEXT_PUBLIC_ZALO_GROUP_URL: process.env.NEXT_PUBLIC_ZALO_GROUP_URL,
  NEXT_PUBLIC_TELEGRAM_URL: process.env.NEXT_PUBLIC_TELEGRAM_URL,
  NEXT_PUBLIC_FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  NEXT_PUBLIC_YOUTUBE_URL: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  NEXT_PUBLIC_TIKTOK_URL: process.env.NEXT_PUBLIC_TIKTOK_URL,
  NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
  NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
  NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  NEXT_PUBLIC_TIKTOK_PIXEL_ID: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
});

export const env = {
  ...(clientEnv.success ? clientEnv.data : ({} as z.infer<typeof clientSchema>)),
  // Server env sẽ chỉ available trong server context
  ...(isServer
    ? (() => {
      const result = serverSchema.safeParse(process.env);
      if (!result.success && process.env.NODE_ENV === 'production') {
        console.error('❌ Missing server environment variables:', result.error.flatten());
      }
      return result.success ? result.data : ({} as z.infer<typeof serverSchema>);
    })()
    : {}),
} as z.infer<typeof serverSchema> & z.infer<typeof clientSchema>;
