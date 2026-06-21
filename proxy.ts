import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Define which routes require authentication
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/home');

  if (isProtectedRoute && !isLoggedIn) {
    // Redirect directly to the OpenIddict provider to skip the NextAuth default login screen
    // const signInUrl = new URL('/api/auth/signin/openiddict', req.url);
    const signInUrl = new URL('/api/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
