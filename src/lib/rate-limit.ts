import { NextRequest } from "next/server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (in production, use Redis)
const rateLimitMap = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per interval
}

/**
 * Rate limiting utility for API routes
 * Prevents abuse and ensures fair usage
 */
export function rateLimit(config: RateLimitConfig) {
  return {
    check: (request: NextRequest, limit: number, token: string) => {
      const now = Date.now();
      const tokenCount = rateLimitMap.get(token) || {
        count: 0,
        resetTime: now + config.interval,
      };

      if (now > tokenCount.resetTime) {
        tokenCount.count = 1;
        tokenCount.resetTime = now + config.interval;
      } else {
        tokenCount.count += 1;
      }

      rateLimitMap.set(token, tokenCount);

      const remaining = Math.max(0, limit - tokenCount.count);
      const resetTime = tokenCount.resetTime;

      return {
        success: tokenCount.count <= limit,
        limit,
        remaining,
        reset: new Date(resetTime),
      };
    },
  };
}

// Pre-configured rate limiter for API routes
export const apiRateLimit = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per minute
});

/**
 * Get client identifier for rate limiting
 */
export function getClientId(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";
  return ip;
}
