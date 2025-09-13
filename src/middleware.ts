import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that require authentication
const protectedPaths = ['/dashboard', '/profile', '/settings'];

// Add paths that should redirect authenticated users
// Include the Google OAuth callback route so logged-in users are not sent to it
const authPaths = ['/login', '/register', '/google/callback'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  // Check if the current path is an auth path
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // If user is not authenticated and trying to access protected route
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access auth routes
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
