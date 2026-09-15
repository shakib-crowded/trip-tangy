// app/api/admin/hotels/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Hotel from "@/models/Hotel";
import { requireAdmin } from "@/lib/apiAuth";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// GET /api/admin/hotels — list every hotel (active and inactive) for the admin table.
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth.error) return auth.error;

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Number(searchParams.get("limit") ?? 20));

  await connectDB();
  const [hotels, total] = await Promise.all([
    Hotel.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Hotel.countDocuments({}),
  ]);

  return NextResponse.json({
    hotels,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}

// POST /api/admin/hotels — create a new hotel listing.
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (auth.error) return auth.error;

  try {
    const body = await req.json();
    const { name, description, city, address } = body;

    if (!name || !description || !city || !address) {
      return NextResponse.json(
        { message: "name, description, city and address are required" },
        { status: 400 },
      );
    }

    await connectDB();

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let suffix = 1;
    while (await Hotel.exists({ slug })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    const hotel = await Hotel.create({
      ...body,
      slug,
      createdBy: auth.userId,
    });

    return NextResponse.json({ hotel }, { status: 201 });
  } catch (err) {
    console.error("Create hotel error:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
