import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const auth = request.cookies.get('auth');

    if (pathname === '/' && auth) {
        return NextResponse.redirect(new URL('/inicio', request.url));
    }

    if (pathname !== '/login' && !auth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next()
}

export const config = {
  matcher: ['/', '/inicio', '/conta', '/configuracoes', '/compradores', '/registrar'],
};