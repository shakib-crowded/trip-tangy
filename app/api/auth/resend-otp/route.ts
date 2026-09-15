import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { generateOtp, hashOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mailer";

const OTP_TTL_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 60;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    await connectDB();
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || user.isVerified) {
      return NextResponse.json({ message: "No pending verification found" }, { status: 400 });
    }

    const existing = await Otp.findOne({ email: normalizedEmail, purpose: "register" });
    if (existing) {
      const elapsed = (Date.now() - existing.lastSentAt.getTime()) / 1000;
      if (elapsed < RESEND_COOLDOWN_SECONDS) {
        return NextResponse.json(
          { message: `Please wait ${Math.ceil(RESEND_COOLDOWN_SECONDS - elapsed)}s before requesting another code` },
          { status: 429 }
        );
      }
    }

    const otp = generateOtp();
    const codeHash = await hashOtp(otp);
    await Otp.findOneAndUpdate(
      { email: normalizedEmail, purpose: "register" },
      { codeHash, attempts: 0, expiresAt: new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000), lastSentAt: new Date() },
      { upsert: true }
    );

    await sendOtpEmail(normalizedEmail, user.name, otp);
    return NextResponse.json({ message: "A new code has been sent" });
  } catch (err) {
    console.error("Resend OTP error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}