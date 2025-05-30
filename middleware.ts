import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = 'launch2025';
const COOKIE_NAME = 'site_access';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Skip protection for API routes and static files
  if (url.pathname.startsWith('/api') || url.pathname.includes('.')) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(COOKIE_NAME);
  const isAllowed = cookie?.value === PASSWORD;

  // If already authenticated, allow through
  if (isAllowed || url.pathname === '/unlock') {
    return NextResponse.next();
  }

  // Otherwise, redirect to unlock page
  const loginUrl = new URL('/unlock', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/', '/((?!_next/static|_next/image|favicon.ico).*)'],
};