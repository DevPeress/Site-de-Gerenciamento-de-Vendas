import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    
    const auth = true

    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/dashboard') && !auth) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if ((pathname === '/' || pathname === '/login') && auth) {
        return NextResponse.redirect(new URL('/inicio', request.url));
    }
    
    if (!auth && !['/', '/login'].includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next()
}