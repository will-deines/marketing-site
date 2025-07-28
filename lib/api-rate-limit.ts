import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// Initialize Redis client - requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Different rate limiters for different use cases
export const rateLimiters = {
  // Strict rate limit for sensitive endpoints like contact forms
  strict: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
    analytics: true,
    prefix: "@garrio/strict",
  }),
  
  // Standard rate limit for general API endpoints
  standard: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"), // 30 requests per minute
    analytics: true,
    prefix: "@garrio/standard",
  }),
  
  // Relaxed rate limit for less sensitive endpoints
  relaxed: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
    analytics: true,
    prefix: "@garrio/relaxed",
  }),
};

export type RateLimitType = keyof typeof rateLimiters;

interface RateLimitOptions {
  type?: RateLimitType;
  identifier?: string;
}

/**
 * Check rate limit for an API request
 * @param request - The incoming request
 * @param options - Rate limiting options
 * @returns Object with success status and optional error response
 */
export async function checkRateLimit(
  request: Request,
  options: RateLimitOptions = {}
): Promise<{ success: boolean; response?: NextResponse }> {
  const { type = "standard", identifier } = options;
  
  // Get identifier - use provided one or extract from request
  const id = identifier || getIdentifier(request);
  
  try {
    const rateLimiter = rateLimiters[type];
    const { success, limit, reset, remaining } = await rateLimiter.limit(id);
    
    // Add rate limit headers to help clients
    const headers = {
      "X-RateLimit-Limit": limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    };
    
    if (!success) {
      return {
        success: false,
        response: NextResponse.json(
          {
            error: "Too many requests",
            message: "You have exceeded the rate limit. Please try again later.",
          },
          { 
            status: 429,
            headers,
          }
        ),
      };
    }
    
    return { success: true };
  } catch (error) {
    // If Redis is down, we'll allow the request but log the error
    console.error("Rate limit check failed:", error);
    return { success: true };
  }
}

/**
 * Extract identifier from request (IP address or user ID)
 */
function getIdentifier(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  
  // Return the first available IP or a default
  return forwarded?.split(",")[0] || realIp || cfConnectingIp || "anonymous";
}

/**
 * Middleware wrapper for rate limiting
 * Use this to easily add rate limiting to any API route
 */
export function withRateLimit(
  handler: (request: Request) => Promise<Response>,
  options: RateLimitOptions = {}
) {
  return async (request: Request): Promise<Response> => {
    const { success, response } = await checkRateLimit(request, options);
    
    if (!success && response) {
      return response;
    }
    
    return handler(request);
  };
}