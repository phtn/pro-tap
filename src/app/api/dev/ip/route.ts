import { getServerIp } from "@/devtools/utils";

export async function GET(request: Request) {
  const ip = getServerIp();

  // Get port from request URL
  const url = new URL(request.url);
  const port = url.port || (url.protocol === 'https:' ? '443' : '80');

  console.log("[IP]:", ip, "[PORT]:", port);
  return new Response(JSON.stringify({ ip, port }), { status: 200 });
}
