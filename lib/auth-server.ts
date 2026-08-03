import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";

export async function getServerUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    return await verifyAccessToken(accessToken);
  } catch {
    return null;
  }
}