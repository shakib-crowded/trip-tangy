// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/bookings"];
const ADMIN_ROUTES = ["/admin"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  const isProtected =
    isAdminRoute ||
    PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (!isProtected) return NextResponse.next();

  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const payload = await verifyAccessToken(accessToken);

    if (isAdminRoute && !payload.isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/bookings/:path*",
    "/admin/:path*",
  ],
};
