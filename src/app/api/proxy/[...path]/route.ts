import { auth } from "@/src/shared/config/auth"
import { NextRequest, NextResponse } from "next/server"

async function handleProxy(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const session = await auth();
  const params = await context.params;

  // @ts-expect-error - accessToken and error are dynamically attached in auth.ts
  const accessToken = session?.accessToken;
  // @ts-expect-error
  const error = session?.error;

  if (!accessToken || error === "RefreshAccessTokenError") {
    return NextResponse.json({ error: "Unauthorized or token refresh failed" }, { status: 401 });
  }

  // Construct destination URL
  const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7172/api";
  const pathSegment = params.path.join("/");
  const searchParams = req.nextUrl.searchParams.toString();
  const targetUrl = `${backendBaseUrl}/${pathSegment}${searchParams ? `?${searchParams}` : ""}`;

  // Prepare forwarded headers
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${accessToken}`);

  // Forward infrastructural headers
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const contentLength = req.headers.get("content-length");
  if (contentLength) headers.set("content-length", contentLength);

  const accept = req.headers.get("accept");
  if (accept) headers.set("accept", accept);

  const acceptLanguage = req.headers.get("accept-language");
  if (acceptLanguage) headers.set("accept-language", acceptLanguage);

  // X-Forwarded headers
  const forwardedFor = req.headers.get("x-forwarded-for") || "127.0.0.1";
  headers.set("x-forwarded-for", forwardedFor);

  const forwardedProto = req.headers.get("x-forwarded-proto") || "http";
  headers.set("x-forwarded-proto", forwardedProto);

  // Extract body for methods that support it
  let body: any = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = req.body;
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      // @ts-expect-error - duplex is needed for streaming request bodies in Node 18+ fetch
      duplex: body ? "half" : undefined,
    });

    // Pass the raw response body back to the client directly via NextResponse
    const responseHeaders = new Headers(response.headers);
    // Remove content-encoding so Next.js doesn't double-compress or have header mismatch
    responseHeaders.delete("content-encoding");

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (err: any) {
    console.error("BFF Proxy Forwarding Error:", err);
    return NextResponse.json({ error: "BFF Proxy Forwarding Error", details: err.message }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
