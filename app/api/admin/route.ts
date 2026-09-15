// app/api/hotels/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Hotel from "@/models/Hotel";

// GET /api/hotels — public search/listing for the Stays page.
// Supports ?city=Goa&search=beach&minPrice=2000&maxPrice=8000&page=1
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const city = searchParams.get("city");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Number(searchParams.get("limit") ?? 20));

  await connectDB();

  const filter: Record<string, unknown> = { isActive: true };
  if (city) filter.city = new RegExp(`^${city}$`, "i");
  if (search) filter.$text = { $search: search };
  if (minPrice || maxPrice) {
    filter["rooms.basePrice"] = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };
  }

  const [hotels, total] = await Promise.all([
    Hotel.find(filter)
      .select("-createdBy")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Hotel.countDocuments(filter),
  ]);

  return NextResponse.json({ hotels, total, page, pages: Math.ceil(total / limit) });
}