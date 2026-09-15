// lib/apiAuth.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

type AdminAuthResult =
  | { userId: string; error?: undefined }
  | { userId?: undefined; error: NextResponse };

// Reusable across every admin-only API route. Mirrors the pattern used in
// app/admin/dashboard/page.tsx: decode the token for identity, then re-check
// isAdmin against the DB rather than trusting the token claim alone — a
// demoted admin's still-valid token shouldn't be able to mutate data.
export async function requireAdmin(req: NextRequest): Promise<AdminAuthResult> {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }

  try {
    const payload = await verifyAccessToken(accessToken);

    await connectDB();
    const dbUser = await User.findById(payload.userId).select("isAdmin");
    if (!dbUser?.isAdmin) {
      return { error: NextResponse.json({ message: "Forbidden" }, { status: 403 }) };
    }

    return { userId: payload.userId };
  } catch {
    return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }
}