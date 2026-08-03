import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { getServerUser } from "@/lib/auth-server";

export async function GET() {
  const authUser = await getServerUser();
  if (!authUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }


  await connectDB();
  console.log(await Booking.find())
  console.log(authUser.userId)
  const bookings = await Booking.find({ userId: authUser.userId }).sort({ startDate: -1 });
  console.log("These are bookings: ", bookings)

  return NextResponse.json({ bookings });
}