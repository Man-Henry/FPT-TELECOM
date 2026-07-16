// ============================================================
// Environment Variables — Type-safe access
// ============================================================
// Sử dụng: import { env } from '@/config/env';
// Server-only variables chỉ dùng trong Server Components / API Routes.
// ============================================================

import { z } from 'zod';

// --- Server-only environment variables ---
const serverSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN is required'),
  TELEGRAM_CHAT_ID: z.string().min(1, 'TELEGRAM_CHAT_ID is required'),
  RECAPTCHA_SECRET_KEY: z.string().min(1, 'RECAPTCHA_SECRET_KEY is required'),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
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
