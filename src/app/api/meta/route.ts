export const POST = async (request: Request) => {
  const metadata = {
    ip:
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip"),
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
    origin: request.headers.get("origin"),
    host: request.headers.get("host"),
    path: request.url,
    method: request.method,
    body: await request.text(),
    headers: Object.fromEntries(request.headers.entries()),
  };

  return new Response(JSON.stringify({ metadata }), { status: 200 });
};
