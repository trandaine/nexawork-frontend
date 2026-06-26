import { auth } from "@/src/shared/config/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Define which routes require authentication
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/home');

  if (isProtectedRoute && !isLoggedIn) {
    // Redirect unauthenticated users to our custom login page
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
