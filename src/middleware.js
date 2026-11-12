import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const protectedRoutes = ['/home', '/dashboard', '/admin'];

export default async function middleware(request) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Canonical auth path is /signin — keep /auth/signin as a redirect alias
  if (pathname === '/auth/signin' || pathname.startsWith('/auth/signin/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  if (session && pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}
