import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { setAuthCookies } from "@/lib/cookies";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    };
    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    const res = NextResponse.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
    setAuthCookies(res, accessToken, refreshToken);
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
