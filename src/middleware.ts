import { NextRequest, NextResponse } from 'next/server';
import { locales } from './lib/i18n';

const PUBLIC_FILE = /\.(.*)$/;
const LOCALES = ['en', 'ar'];
const DEFAULT_LOCALE = 'en';

// function getLocale(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const pathnameSegments = pathname.split('/').filter(Boolean);
//   return pathnameSegments[0] || DEFAULT_LOCALE;
// }


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameSegments = pathname.split('/').filter(Boolean);

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Ignore static files and system routes
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.includes(pathnameSegments[0]);

  // ✅ Redirect `/en/cms` → `/en/cms/dashboard`
  if (
    hasLocale &&
    pathnameSegments.length === 2 &&
    pathnameSegments[1] === 'cms'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${pathnameSegments[0]}/cms/dashboard`;
    return NextResponse.redirect(url);
  }

  // ✅ Already has locale, just continue
  if (hasLocale) {
    return NextResponse.next();
  }

  // ✅ Redirect to default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
};
