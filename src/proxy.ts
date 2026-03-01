import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {auth} from '@/lib/auth';


export const proxy = async (request : NextRequest) => {
  const {pathname} = request.nextUrl

  const session = await auth.api.getSession({
    headers: request.headers
  })

  const isAuthPage = pathname.startsWith('/signin') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password');

  const isVerifyPage = pathname.startsWith('/verify-email');

  const isProtectedPage = pathname.startsWith('/dashboard');

  if(!session && (isProtectedPage || isVerifyPage)){
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  if(session && !session.user.emailVerified && isProtectedPage){
    return NextResponse.redirect(new URL('/verify-email', request.url));
  }
  if(session && session.user.emailVerified && (isAuthPage || isVerifyPage)){
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup', '/verify-email', '/forgot-password', '/reset-password']
}
