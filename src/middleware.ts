import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LRUCache } from 'lru-cache'

const tokenCache = new LRUCache<string, number>({
  max: 500, // Max 500 unique IPs to track
  ttl: 60 * 1000, // 1 minute
})

export function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';

  const tokenCount = tokenCache.get(ip) || 0;
  const limit = 100; // 100 requests per minute

  if (tokenCount >= limit) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  tokenCache.set(ip, tokenCount + 1);

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (static images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
