import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANADA_CODE = 'CA';
const COUNTRY_COOKIE = 'ff_country';
const COOKIE_MAX_AGE = 86400 * 30; // 30 days

/**
 * Get country code from platform-provided geo headers (zero-cost, no DB).
 * Vercel, Cloudflare, AWS CloudFront, and Netlify all inject these headers.
 */
function getCountryFromPlatformHeaders(request: NextRequest): string | null {
  return (
    request.headers.get('x-vercel-ip-country') ||   // Vercel
    request.headers.get('cf-ipcountry') ||           // Cloudflare
    request.headers.get('cloudfront-viewer-country') || // AWS CloudFront
    null
  );
}

/**
 * Fallback: detect country from Accept-Language header.
 */
function detectCountryFallback(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';
  if (acceptLanguage.includes('fr-CA')) {
    return 'CA';
  }
  return 'US';
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Add noindex header for Next.js image optimization routes
  if (pathname.startsWith('/_next/image')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Skip middleware for API routes, static files, and other _next routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // If already on /en-ca path, allow it
  if (pathname.startsWith('/en-ca')) {
    return NextResponse.next();
  }

  // Only check for geo-redirect on root path
  if (pathname === '/') {
    // 1. Check cookie first (user already classified - skip all detection)
    const countryCookie = request.cookies.get(COUNTRY_COOKIE)?.value;
    if (countryCookie) {
      if (countryCookie === CANADA_CODE) {
        const url = request.nextUrl.clone();
        url.pathname = '/en-ca';
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // 2. Platform geo headers (zero-cost, injected by Vercel/Cloudflare/etc.)
    let countryCode = getCountryFromPlatformHeaders(request);

    // 3. Fallback to Accept-Language detection
    if (!countryCode) {
      countryCode = detectCountryFallback(request);
    }

    // Set cookie so future requests skip detection entirely
    if (countryCode === CANADA_CODE) {
      const url = request.nextUrl.clone();
      url.pathname = '/en-ca';
      const response = NextResponse.redirect(url);
      response.cookies.set(COUNTRY_COOKIE, countryCode, {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
      });
      return response;
    }

    // Not Canada - set cookie and pass through
    const response = NextResponse.next();
    response.cookies.set(COUNTRY_COOKIE, countryCode, {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * Note: _next/image is included to add noindex headers
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
