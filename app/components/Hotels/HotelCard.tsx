// app/components/Hotels/HotelCard.tsx

import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { formatINR, lowestRoomPrice } from "@/lib/format";
import Image from "next/image";

export interface HotelCardData {
  _id: string;
  slug: string;
  name: string;
  city: string;
  description: string;
  starRating: number;
  images: string[];
  amenities: string[];
  rooms: { basePrice: number }[];
}

export default function HotelCard({ hotel }: { hotel: HotelCardData }) {
  const price = lowestRoomPrice(hotel.rooms);

  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
    >
      {/* Hotel Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        {hotel.images[0] ? (
          <Image
            src={hotel.images[0]}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No image available
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/45 to-transparent" />

        {/* Star Rating */}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-white px-2.5 py-1.5 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />

          <span className="text-xs font-bold text-gray-800">
            {hotel.starRating}
          </span>
        </div>

        {/* Hotel Category */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {hotel.starRating}-Star Hotel
          </span>
        </div>
      </div>

      {/* Hotel Information */}
      <div className="flex flex-col p-5">
        {/* Hotel Name */}
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 transition-colors group-hover:text-secondary">
          {hotel.name}
        </h3>

        {/* Location */}
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          <span className="line-clamp-1">{hotel.city}</span>
        </div>

        {/* Description */}
        {hotel.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-5 text-gray-500">
            {hotel.description}
          </p>
        )}

        {/* Amenities */}
        {hotel.amenities.length > 0 && (
          <div className="mt-4 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span key={amenity} className="text-xs text-gray-500">
                {amenity}
                {index < Math.min(hotel.amenities.length, 3) - 1 && (
                  <span className="ml-2 text-gray-300">•</span>
                )}
              </span>
            ))}

            {hotel.amenities.length > 3 && (
              <span className="text-xs font-medium text-secondary">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price / CTA */}
        <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>

            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">
                {price !== null ? formatINR(price) : "Price on request"}
              </span>

              {price !== null && (
                <span className="text-xs text-gray-400">/ night</span>
              )}
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-all group-hover:gap-2.5">
            View hotel
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
