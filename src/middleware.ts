import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const auth = request.cookies.get('auth');

  const isAuthPage = pathname === '/login' || pathname === '/cadastro';
  const isPublicPage = pathname === '/' || isAuthPage;
  const isProtectedPage = !isPublicPage;

  if (isPublicPage && auth) {
    return NextResponse.redirect(new URL('/inicio', request.url));
  }

  if (isProtectedPage && !auth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/inicio',
    '/conta',
    '/configuracoes',
    '/compradores',
    '/registrar',
    '/cadastro',
    '/login'
  ],
};