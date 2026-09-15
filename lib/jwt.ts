// lib/jwt.ts
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export async function signAccessToken(payload: TokenPayload): Promise<string> {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
}

export async function signRefreshToken(payload: TokenPayload): Promise<string> {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
}

export async function verifyAccessToken(token: string): Promise<TokenPayload> {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
}

export async function verifyRefreshToken(token: string): Promise<TokenPayload> {
  return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
}