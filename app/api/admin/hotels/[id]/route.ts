// app/api/admin/hotels/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Hotel from "@/models/Hotel";
import { requireAdmin } from "@/lib/apiAuth";

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/hotels/[id] — fetch one hotel regardless of active status (for editing).
export async function GET(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin(req);
  if (auth.error) return auth.error;

  const { id } = await params;
  await connectDB();
  const hotel = await Hotel.findById(id);
  if (!hotel) return NextResponse.json({ message: "Hotel not found" }, { status: 404 });

  return NextResponse.json({ hotel });
}

// PATCH /api/admin/hotels/[id] — update hotel details, rooms, or toggle isActive.
export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin(req);
  if (auth.error) return auth.error;

  const { id } = await params;

  try {
    const body = await req.json();
    // slug and createdBy shouldn't be overwritten via a generic PATCH.
    delete body.slug;
    delete body.createdBy;

    await connectDB();
    const hotel = await Hotel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!hotel) return NextResponse.json({ message: "Hotel not found" }, { status: 404 });

    return NextResponse.json({ hotel });
  } catch (err) {
    console.error("Update hotel error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// DELETE /api/admin/hotels/[id] — soft delete (isActive: false) rather than a
// hard delete, so existing bookings that reference this hotel don't break.
export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin(req);
  if (auth.error) return auth.error;

  const { id } = await params;
  await connectDB();
  const hotel = await Hotel.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!hotel) return NextResponse.json({ message: "Hotel not found" }, { status: 404 });

  return NextResponse.json({ message: "Hotel deactivated", hotel });
}