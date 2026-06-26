import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // OpenIddict redirects here after successfully destroying its session.
  // We simply bounce the user back to the home page or login.
  const url = new URL("/", request.url);
  return NextResponse.redirect(url);
}
