// app/components/Hotels/HotelList.tsx
"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader2, RefreshCw, SearchX } from "lucide-react";
import HotelCard, { HotelCardData } from "./HotelCard";

export default function HotelList() {
  const [hotels, setHotels] = useState<HotelCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadHotels() {
      try {
        const response = await fetch("/api/hotels?limit=12");
        const data = (await response.json()) as {
          hotels?: HotelCardData[];
          message?: string;
        };
        if (!response.ok) {
          throw new Error(data.message || "Unable to load hotels.");
        }
        if (active) {
          setHotels((data.hotels ?? []).filter((hotel) => hotel.isActive === true));
          setError("");
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load hotels. Please try again.",
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadHotels();
    return () => {
      active = false;
    };
  }, [reloadCount]);

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
      ) : error ? (
        <div
          role="alert"
          className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-12 text-center"
        >
          <AlertCircle className="h-6 w-6 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setReloadCount((count) => count + 1);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      ) : hotels.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-primary/15 py-16 text-center">
          <SearchX className="h-6 w-6 text-primary/30" />
          <p className="text-sm text-primary/50">
            No hotels listed yet — check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
}
