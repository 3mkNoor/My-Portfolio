import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const userAgent = request.headers.get("user-agent") || "unknown";
  const referrer = request.headers.get("referer") || "direct";

  console.log({
    time: new Date().toISOString(),
    ip,
    country: request.headers.get("x-vercel-ip-country") || "unknown",
    userAgent,
    referrer,
    path: request.nextUrl.pathname,
  });

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * شغّل الـ middleware على صفحات الموقع،
     * واستبعد الملفات الثابتة وطلبات Next الداخلية.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};