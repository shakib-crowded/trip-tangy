import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { generateOtp, hashOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mailer";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { setAuthCookies } from "@/lib/cookies";

const OTP_TTL_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 60;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    if (!user.isVerified) {
      // Re-send an OTP so they can finish verifying right from the login screen
      const existing = await Otp.findOne({ email: normalizedEmail, purpose: "register" });
      const elapsed = existing ? (Date.now() - existing.lastSentAt.getTime()) / 1000 : Infinity;

      if (elapsed >= RESEND_COOLDOWN_SECONDS) {
        const otp = generateOtp();
        const codeHash = await hashOtp(otp);
        await Otp.findOneAndUpdate(
          { email: normalizedEmail, purpose: "register" },
          { codeHash, attempts: 0, expiresAt: new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000), lastSentAt: new Date() },
          { upsert: true }
        );
        await sendOtpEmail(normalizedEmail, user.name, otp);
      }

      return NextResponse.json(
        {
          message: "Please verify your email to continue",
          requiresOtp: true,
          email: normalizedEmail,
        },
        { status: 403 }
      );
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    const res = NextResponse.json({
      message: "Login successful",
      user: payload,
    });
    setAuthCookies(res, accessToken, refreshToken);
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}