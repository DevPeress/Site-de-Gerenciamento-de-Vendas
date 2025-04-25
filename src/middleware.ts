import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    
    const auth = true

    if (request.nextUrl.pathname.startsWith('/dashboard') && !auth) {
        return NextResponse.redirect(new URL('/', request.url))
    }


    return NextResponse.next()
}