import crypto from "crypto";
import bcrypt from "bcryptjs";

export function generateOtp(length = 6) {
  let otp = "";
  for (let i = 0; i < length; i++) otp += crypto.randomInt(0, 10).toString();
  return otp;
}

export const hashOtp = (otp: string) => bcrypt.hash(otp, 10);
export const compareOtp = (otp: string, hash: string) => bcrypt.compare(otp, hash);