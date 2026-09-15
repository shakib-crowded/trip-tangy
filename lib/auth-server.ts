// lib/auth-server.ts
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";

export async function getServerUser() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    
    if (!accessToken) return null;

    try {
      const payload = await verifyAccessToken(accessToken);
      return payload;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  } catch (error) {
    console.error("Error getting server user:", error);
    return null;
  }
}