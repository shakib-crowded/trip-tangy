// app/dashboard/admin/hotels/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Hotel as HotelIcon,
  PlusCircle,
  Pencil,
  EyeOff,
  RotateCcw,
  Loader2,
  Search,
} from "lucide-react";
import Image from "next/image";

interface HotelListItem {
  _id: string;
  name: string;
  city: string;
  starRating: number;
  isActive: boolean;
  rooms: { basePrice: number }[];
  images: string[];
}

export default function ManageHotelsPage() {
  const [hotels, setHotels] = useState<HotelListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchHotels = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/hotels?limit=50");
      const data = await res.json();
      if (res.ok) setHotels(data.hotels);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const toggleActive = async (hotel: HotelListItem) => {
    setBusyId(hotel._id);
    try {
      if (hotel.isActive) {
        // Soft delete via the DELETE route.
        await fetch(`/api/admin/hotels/${hotel._id}`, { method: "DELETE" });
      } else {
        await fetch(`/api/admin/hotels/${hotel._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: true }),
        });
      }
      setHotels((prev) =>
        prev.map((h) =>
          h._id === hotel._id ? { ...h, isActive: !h.isActive } : h,
        ),
      );
    } finally {
      setBusyId(null);
    }
  };

  const filtered = hotels.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HotelIcon className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-primary">Manage hotels</h1>
            <p className="text-sm text-primary/50">
              {hotels.length} listing{hotels.length === 1 ? "" : "s"} total
            </p>
          </div>
        </div>
        <Link
          href="/admin/dashboard/hotels/new"
          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
        >
          <PlusCircle className="h-4 w-4" />
          Add hotel
        </Link>
      </div>

      <div className="mb-5 flex items-center gap-2 rounded-xl border border-primary/15 bg-white px-3.5 py-2.5">
        <Search className="h-4 w-4 text-primary/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or city..."
          className="w-full border-none text-sm text-primary outline-none placeholder:text-primary/35"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-primary/40">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary/15 bg-white py-16 text-center">
          <p className="text-sm text-primary/50">
            {hotels.length === 0
              ? "No hotels yet — add your first listing."
              : "No hotels match your search."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-primary/10 bg-primary/2 text-xs font-semibold uppercase tracking-wide text-primary/40">
              <tr>
                <th className="px-5 py-3">Hotel</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">From</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filtered.map((hotel) => {
                const lowestPrice = hotel.rooms.length
                  ? Math.min(...hotel.rooms.map((r) => r.basePrice))
                  : null;
                return (
                  <tr
                    key={hotel._id}
                    className="transition hover:bg-primary/1.5"
                  >
                    <td className="flex items-center gap-3 px-5 py-3.5">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-primary/5">
                        {hotel.images[0] && (
                          <Image
                            src={hotel.images[0]}
                            alt={hotel.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        )}
                      </div>

                      <span className="font-semibold text-primary">
                        {hotel.name}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-primary/70">
                      {hotel.city}
                    </td>
                    <td className="px-5 py-3.5 text-primary/70">
                      {hotel.starRating}★
                    </td>
                    <td className="px-5 py-3.5 text-primary/70">
                      {lowestPrice !== null
                        ? `₹${lowestPrice.toLocaleString("en-IN")}`
                        : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          hotel.isActive
                            ? "bg-island/10 text-island"
                            : "bg-primary/10 text-primary/50"
                        }`}
                      >
                        {hotel.isActive ? "Live" : "Deactivated"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/dashboard/hotels/${hotel._id}/edit`}
                          className="cursor-pointer rounded-full p-2 text-primary/50 transition hover:bg-primary/5 hover:text-primary"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => toggleActive(hotel)}
                          disabled={busyId === hotel._id}
                          className="cursor-pointer rounded-full p-2 text-primary/50 transition hover:bg-primary/5 hover:text-primary disabled:opacity-40"
                          aria-label={
                            hotel.isActive ? "Deactivate" : "Reactivate"
                          }
                        >
                          {busyId === hotel._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : hotel.isActive ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <RotateCcw className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
