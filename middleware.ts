import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let response: NextResponse;
  response = NextResponse.next({ request });
  // const cookieStore = await cookies();

  const pathname = request.nextUrl.pathname;
  // if (pathname.startsWith("/verify/") && pathname !== "/verify") {
  //   const segments = pathname.split("/");
  //   if (segments.length === 3 && segments[1] === "verify") {
  //     const code = segments[2];
  //     response = NextResponse.rewrite(new URL("/verify", request.url));
  //     cookieStore.set("protap_code", code, {
  //       httpOnly: true,
  //       secure: true,
  //       maxAge: 60 * 60 * 24 * 7,
  //     });
  //     return response;
  //   }
  // }

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

  if (process.env.NEXT_PUBLIC_ENV !== "staging") {
    return NextResponse.next();
  }

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

  // Create a response

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
