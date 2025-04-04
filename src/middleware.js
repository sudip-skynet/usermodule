import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/signup' || path === '/signin';
    const token = request.cookies.get('token')?.value || '';

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL(path, request.url));
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }
  //return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signin','/signup','/profile']
}