// ============================================================
// Rate Limiter — Upstash Redis (Vercel Serverless Compatible)
// ============================================================
// KHÔNG dùng in-memory Map/Set trên serverless (reset mỗi cold start).
// Upstash Redis persistent across all Lambda invocations.
// ============================================================

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// --- Kiểm tra Upstash config ---
// Nếu thiếu env vars, rate limiter sẽ bị bypass (cho phép dev không cần Redis).
const hasUpstashConfig = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

// Khởi tạo Redis client từ env vars (UPSTASH_REDIS_REST_URL + TOKEN)
const redis = hasUpstashConfig ? Redis.fromEnv() : null;

// --- Rate Limiter: 5 requests / 15 phút per identifier ---
// Sliding window: chính xác hơn fixed window, tránh burst ở ranh giới
const rateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true, // Bật analytics dashboard trên Upstash Console
      prefix: 'fpt:ratelimit',
    })
  : null;

// --- Helper: Check rate limit cho 1 identifier (IP hoặc Fingerprint) ---
export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  remaining: number;
  reset: number;
}> {
  // Nếu chưa cấu hình Upstash → bypass (cho phép tất cả)
  if (!rateLimiter) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        '[Rate Limit] UPSTASH_REDIS_REST_URL/TOKEN chưa cấu hình — rate limiting bị bypass!',
      );
    }
    return { success: true, remaining: 999, reset: 0 };
  }

  const result = await rateLimiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}
