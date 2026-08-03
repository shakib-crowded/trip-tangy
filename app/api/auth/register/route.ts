import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { setAuthCookies } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
    });

    const payload = { userId: user._id.toString(), email: user.email, name: user.name };
    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    const res = NextResponse.json({
      message: "Account created",
      user: { id: user._id, name: user.name, email: user.email },
    });
    setAuthCookies(res, accessToken, refreshToken);
    return res;
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}