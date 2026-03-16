import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // DEBUG LOG - Check this in Netlify Dashboard -> Logs
  console.log(`Middleware Path: ${pathname} | Token Present: ${!!token}`);

  if (pathname.startsWith('/admin') && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}