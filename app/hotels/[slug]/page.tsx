import { notFound } from "next/navigation";
import { MapPin, Star, Clock, ShieldCheck } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Hotel from "@/models/Hotel";
import BookingWidget from "@/app/components/Hotels/BookingWidget";
import Image from "next/image";

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function HotelDetailPage({ params }: Params) {
  const { slug } = await params;

  await connectDB();

  const hotel = await Hotel.findOne({
    slug,
    isActive: true,
  })
    .select("-createdBy")
    .lean();

  if (!hotel) notFound();


  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Gallery */}
        <div className="grid h-70 grid-cols-4 gap-2 overflow-hidden rounded-xl md:h-100">
          {/* Main image */}
          <div className="relative col-span-4 bg-gray-100 sm:col-span-2">
            {hotel.images[0] ? (
              <Image
                src={hotel.images[0]}
                alt={hotel.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* Secondary images */}
          {hotel.images.slice(1, 5).map((src: string, index: number) => (
            <div
              key={`${src}-${index}`}
              className="relative hidden bg-gray-100 sm:block"
            >
              <Image
                src={src}
                alt={`${hotel.name} - Image ${index + 2}`}
                fill
                sizes="(max-width: 640px) 0px, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* LEFT */}
          <div>
            {/* Hotel heading */}
            <div className="border-b border-gray-100 pb-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                      {hotel.name}
                    </h1>

                    <div className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-800">
                        {hotel.starRating}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {hotel.address}, {hotel.city}
                  </p>
                </div>
              </div>

              {hotel.description && (
                <p className="mt-5 max-w-3xl text-sm leading-6 text-gray-600">
                  {hotel.description}
                </p>
              )}
            </div>

            {/* Amenities */}
            {hotel.amenities.length > 0 && (
              <section className="border-b border-gray-100 py-7">
                <h2 className="text-lg font-semibold text-gray-900">
                  Amenities
                </h2>

                <div className="mt-4 grid grid-cols-2 gap-y-3 sm:grid-cols-3">
                  {hotel.amenities.map((amenity: string) => (
                    <div key={amenity} className="text-sm text-gray-600">
                      {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Policies */}
            <section className="py-7">
              <h2 className="text-lg font-semibold text-gray-900">
                Hotel policies
              </h2>

              <div className="mt-5 divide-y divide-gray-100 border-y border-gray-100">
                <div className="flex items-center gap-4 py-4">
                  <Clock className="h-5 w-5 shrink-0 text-gray-400" />

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Check-in & check-out
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Check-in from {hotel.policies.checkIn} · Check-out by{" "}
                      {hotel.policies.checkOut}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Cancellation policy
                    </p>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {hotel.policies.cancellation}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT - BOOKING */}
          <aside>
            <BookingWidget
              hotelId={hotel._id.toString()}
              hotelSlug={hotel.slug}
              rooms={hotel.rooms.map((room: any) => ({
                _id: room._id.toString(),
                roomType: room.roomType,
                description: room.description,
                maxOccupancy: room.maxOccupancy,
                maxAdults: room.maxAdults, 
                maxChildren: room.maxChildren,
                basePrice: room.basePrice,
                totalRooms: room.totalRooms,
                amenities: room.amenities,
              }))}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
