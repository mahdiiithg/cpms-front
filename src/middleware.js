import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const protectedRoutes = ['/home', '/dashboard'];

export default async function middleware(request) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (session && pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}
