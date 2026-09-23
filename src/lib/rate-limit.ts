import { headers } from "next/headers";

type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

export async function getClientIdentifier(fallback = "unknown"): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const real = h.get("x-real-ip");
  return (forwarded?.split(",")[0]?.trim() || real || fallback).slice(0, 128);
}

export function consumeRateLimit(
  key: string,
  options: { limit?: number; windowMs?: number } = {},
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const limit = options.limit ?? 10;
  const windowMs = options.windowMs ?? 10 * 60 * 1000;
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  current.count += 1;
  const remaining = Math.max(0, limit - current.count);
  const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000));

  if (current.count > limit) {
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }
  return { allowed: true, remaining, retryAfterSeconds };
}

export function rateLimitHeaders(result: ReturnType<typeof consumeRateLimit>): HeadersInit {
  return {
    "X-RateLimit-Remaining": String(result.remaining),
    ...(result.allowed ? {} : { "Retry-After": String(result.retryAfterSeconds) }),
  };
}
