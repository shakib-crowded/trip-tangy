import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Otp from "@/models/Otp";
import { generateOtp, hashOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mailer";

const OTP_TTL_MINUTES = 10;

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser?.isVerified) {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Reuse the pending unverified doc if they retry registering with the same email
    const user = existingUser
      ? await User.findOneAndUpdate(
          { email: normalizedEmail },
          { name, phone, password: hashedPassword },
          { new: true }
        )
      : await User.create({
          name,
          email: normalizedEmail,
          phone,
          password: hashedPassword,
          isVerified: false,
        });

    const otp = generateOtp();
    const codeHash = await hashOtp(otp);

    await Otp.findOneAndUpdate(
      { email: normalizedEmail, purpose: "register" },
      { codeHash, attempts: 0, expiresAt: new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000), lastSentAt: new Date() },
      { upsert: true }
    );

    await sendOtpEmail(normalizedEmail, name, otp);

    return NextResponse.json({
      message: "Verification code sent",
      requiresOtp: true,
      email: normalizedEmail,
    });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}