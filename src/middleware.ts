import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    
    const auth = true

    const { pathname } = request.nextUrl;

    if ((pathname === '/' || pathname === '/login') && auth) {
        return NextResponse.redirect(new URL('/inicio', request.url));
    }

    return NextResponse.next()
}