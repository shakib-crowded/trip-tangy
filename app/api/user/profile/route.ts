import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerUser } from "@/lib/auth-server";

export async function GET() {
  const authUser = await getServerUser();
  if (!authUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(authUser.userId).select("-password");
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PUT(req: NextRequest) {
  const authUser = await getServerUser();
  if (!authUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, phone } = await req.json();

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ message: "Name and phone are required" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findByIdAndUpdate(
    authUser.userId,
    { name: name.trim(), phone: phone.trim() },
    { new: true }
  ).select("-password");

  return NextResponse.json({ message: "Profile updated", user });
}