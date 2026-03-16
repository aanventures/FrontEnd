import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Extract the token from cookies
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  // 2. Protect Admin Routes
  if (pathname.startsWith('/admin')) {
    // If there is no token, redirect them to the login page
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      // Optional: Add a 'redirect' search param so they can return after login
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 3. Define which paths this middleware should run on
export const config = {
  matcher: ['/admin/:path*'], 
};