// app/components/Hotels/HotelList.tsx
"use client";

import { useEffect, useState } from "react";
import { Loader2, SearchX } from "lucide-react";
import HotelCard, { HotelCardData } from "./HotelCard";

export default function HotelList() {
  const [hotels, setHotels] = useState<HotelCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hotels?limit=12")
      .then((res) => res.json())
      .then((data) => setHotels(data.hotels ?? []))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-8">
        <h2 className="font-(family-name:--font-display) text-2xl font-semibold text-primary sm:text-3xl">
          Stays our travellers keep coming back to
        </h2>
        <p className="mt-1 text-primary/50">
          A handful of hotels worth building your trip around.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-primary/30">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : hotels.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-primary/15 py-16 text-center">
          <SearchX className="h-6 w-6 text-primary/30" />
          <p className="text-sm text-primary/50">
            No hotels listed yet — check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
}