import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { locales } from './lib/i18n';

const PUBLIC_FILE = /\.(.*)$/;
const LOCALES = ['en', 'ar'];
const DEFAULT_LOCALE = 'ar';

// Protected routes that require authentication
const PROTECTED_ROUTES = ['/cms'];

// Auth routes that should redirect if already authenticated
const AUTH_ROUTES = ['/login', '/signup', '/reset-password'];

// Public routes that should be accessible without authentication
const PUBLIC_ROUTES = ['/not-authorized'];

// Create Supabase client for middleware
function createSupabaseReqResClient(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  return { supabase, response };
}

// function getLocale(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const pathnameSegments = pathname.split('/').filter(Boolean);
//   return pathnameSegments[0] || DEFAULT_LOCALE;
// }


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameSegments = pathname.split('/').filter(Boolean);

  // Ignore static files and system routes
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/auth/callback')
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const hasLocale = LOCALES.includes(pathnameSegments[0]);
  const locale = hasLocale ? pathnameSegments[0] : DEFAULT_LOCALE;
  const pathWithoutLocale = hasLocale 
    ? `/${pathnameSegments.slice(1).join('/')}`
    : pathname;

  // Initialize Supabase client for auth checking
  const { supabase, response } = createSupabaseReqResClient(request);

  try {
    // Get current user session
    const { data: { session } } = await supabase.auth.getSession();
    const isAuthenticated = !!session?.user;

    // Check if current route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some(route => 
      pathWithoutLocale.startsWith(route)
    );

    // Check if current route is an auth route
    const isAuthRoute = AUTH_ROUTES.some(route => 
      pathWithoutLocale.startsWith(route)
    );

    // Check if current route is a public route
    const isPublicRoute = PUBLIC_ROUTES.some(route => 
      pathWithoutLocale.startsWith(route)
    );

    // Skip auth checks for public routes
    if (isPublicRoute) {
      // Allow access to public routes without authentication
    } else {
      // Redirect authenticated users away from auth pages
      if (isAuthenticated && isAuthRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = `/${locale}/cms`;
        return NextResponse.redirect(redirectUrl);
      }

      // Redirect unauthenticated users from protected routes
      if (!isAuthenticated && isProtectedRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = `/${locale}/login`;
        redirectUrl.searchParams.set('redirect', pathWithoutLocale);
        return NextResponse.redirect(redirectUrl);
      }

      // If authenticated and accessing CMS, check user role
      if (isAuthenticated && pathWithoutLocale.startsWith('/cms')) {
        try {
          const { data: user } = await supabase
            .from('users')
            .select('role, is_active')
            .eq('id', session.user.id)
            .single();

          // If user doesn't have valid role or is inactive, redirect to not-authorized
          // Allow: super_admin, admin, content_manager, viewer, author
          // Block: default or any other role
          if (!user?.role || user.role === 'default' || !user.is_active) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = `/${locale}/not-authorized`;
            return NextResponse.redirect(redirectUrl);
          }
        } catch (error) {
          // If there's an error checking the profile, redirect to login
          const redirectUrl = request.nextUrl.clone();
          redirectUrl.pathname = `/${locale}/login`;
          return NextResponse.redirect(redirectUrl);
        }
      }
    }
  } catch (error) {
    console.error('Middleware auth check error:', error);
    // Continue without auth check if there's an error
  }

  // Handle locale redirects
  if (!pathnameHasLocale) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${DEFAULT_LOCALE}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Redirect `/en/cms` → `/en/cms/dashboard`
  if (
    hasLocale &&
    pathnameSegments.length === 2 &&
    pathnameSegments[1] === 'cms'
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${pathnameSegments[0]}/cms/dashboard`;
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
};
