// app/api/hotels/route.ts

import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Hotel from "@/models/Hotel";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const limitParam = searchParams.get("limit");
    const limit = Math.min(
      Math.max(Number(limitParam) || 12, 1),
      50
    );

    const hotels = await Hotel.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        hotels,
        count: hotels.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/hotels error:", error);

    return NextResponse.json(
      {
        hotels: [],
        error: "Failed to fetch hotels",
      },
      { status: 500 }
    );
  }
}