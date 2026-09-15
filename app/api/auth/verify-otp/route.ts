import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { compareOtp } from "@/lib/otp";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { setAuthCookies } from "@/lib/cookies";

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 },
      );
    }

    await connectDB();
    const normalizedEmail = email.toLowerCase();

    const record = await Otp.findOne({
      email: normalizedEmail,
      purpose: "register",
    });
    if (!record) {
      return NextResponse.json(
        { message: "No pending verification found. Please register again." },
        { status: 400 },
      );
    }
    if (record.expiresAt.getTime() < Date.now()) {
      await record.deleteOne();
      return NextResponse.json(
        { message: "This code has expired. Please request a new one." },
        { status: 400 },
      );
    }
    if (record.attempts >= MAX_ATTEMPTS) {
      await record.deleteOne();
      return NextResponse.json(
        { message: "Too many incorrect attempts. Please request a new code." },
        { status: 429 },
      );
    }

    const isValid = await compareOtp(otp, record.codeHash);
    if (!isValid) {
      record.attempts += 1;
      await record.save();
      return NextResponse.json(
        { message: "Incorrect code. Please try again." },
        { status: 400 },
      );
    }

    const user = await User.findOneAndUpdate(
      { email: normalizedEmail },
      { isVerified: true },
      { new: true },
    );
    if (!user) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 },
      );
    }
    await record.deleteOne();

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    const res = NextResponse.json({
      message: "Account verified",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
    setAuthCookies(res, accessToken, refreshToken);
    return res;
  } catch (err) {
    console.error("OTP verification error:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
