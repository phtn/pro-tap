import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Auth gate for /account/**
  if (pathname.startsWith("/account")) {
    const isAuthed = request.cookies.get("protap_auth")?.value === "1";
    if (!isAuthed) {
      return NextResponse.redirect(new URL("/sign", request.url));
    }
  }

  // Only apply CSP headers in staging
  if (process.env.NEXT_PUBLIC_ENV !== "staging") {
    return NextResponse.next();
  }

  const response = NextResponse.next({ request });

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = `
    default-src 'self';
    style-src 'self' 'nonce-${nonce}';
    font-src 'self' https://fonts.google.com;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    `
    .replace(/\s{2,}/g, " ")
    .trim();

  const csph =
    process.env.NEXT_PUBLIC_ENV === "staging"
      ? "Content-Security-Policy-Report-Only"
      : "Content-Security-Policy";

  // Get the protocol from X-Forwarded-Proto header or request protocol
  const protocol =
    request.headers.get("x-forwarded-proto") || request.nextUrl.protocol;

  // Get the host from X-Forwarded-Host header or request host
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";

  // Construct the base URL - ensure protocol has :// format
  const baseUrl = `${protocol}${protocol.endsWith(":") ? "//" : "://"}${host}`;

  // CSP
  request.headers.set("x-nonce", nonce);
  response.headers.set(csph, csp);
  // Add request information to response headers
  response.headers.set("x-url", request.url);
  response.headers.set("x-host", host);
  response.headers.set("x-protocol", protocol);
  response.headers.set("x-base-url", baseUrl);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
