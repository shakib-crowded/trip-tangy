// app/api/hotels/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Hotel from "@/models/Hotel";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          hotel: null,
          error: "Hotel slug is required",
        },
        { status: 400 },
      );
    }

    const hotel = await Hotel.findOne({
      slug: slug.toLowerCase(),
      isActive: true,
    }).lean();

    if (!hotel) {
      return NextResponse.json(
        {
          hotel: null,
          error: "Hotel not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        hotel,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/hotels/[slug] error:", error);

    return NextResponse.json(
      {
        hotel: null,
        error: "Failed to fetch hotel",
      },
      { status: 500 },
    );
  }
}
