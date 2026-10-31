// app/admin/dashboard/hotels/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import { Types, isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Hotel, { type IRoom } from "@/models/Hotel";
import HotelForm from "@/app/components/Admin/HotelForm";

type Params = { params: Promise<{ id: string }> };

export default async function EditHotelPage({ params }: Params) {
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  await connectDB();
  const hotel = await Hotel.findById(id).lean();
  if (!hotel) notFound();

  const initialValues = {
    name: hotel.name,
    description: hotel.description,
    city: hotel.city,
    state: hotel.state ?? "",
    address: hotel.address,
    starRating: hotel.starRating,
    amenities: hotel.amenities ?? [],
    images: hotel.images ?? [],
    policies: hotel.policies,
    rooms: (hotel.rooms ?? []).map((room: IRoom & { _id?: Types.ObjectId }) => ({
      id: room._id?.toString() ?? crypto.randomUUID(),
      roomType: room.roomType,
      description: room.description ?? "",
      maxOccupancy: room.maxOccupancy,
      maxAdults: room.maxAdults ?? 1,
      maxChildren: room.maxChildren ?? 0,
      basePrice: room.basePrice,
      totalRooms: room.totalRooms,
      amenities: room.amenities ?? [],
      images: room.images ?? [],
    })),
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
          <Pencil className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-primary">Edit hotel</h1>
          <p className="text-sm text-primary/50">{hotel.name}</p>
        </div>
      </div>

      <HotelForm mode="edit" hotelId={id} initialValues={initialValues} />
    </div>
  );
}