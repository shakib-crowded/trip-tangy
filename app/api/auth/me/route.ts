// /api/auth/me
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, verifyRefreshToken, signAccessToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Try access token first
  if (accessToken) {
    try {
      const payload = await verifyAccessToken(accessToken);
      return NextResponse.json({ user: payload });
    } catch {
      // fall through to refresh
    }
  }

  // Access token expired/missing — try silent refresh
  if (refreshToken) {
    try {
      const payload = await verifyRefreshToken(refreshToken);
      const newAccessToken = await signAccessToken({
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
        isAdmin: payload.isAdmin,
      });

      const res = NextResponse.json({ user: payload });
      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 60,
      });
      return res;
    } catch {
      return NextResponse.json({ user: null }, { status: 401 });
    }
  }

  return NextResponse.json({ user: null }, { status: 401 });
}