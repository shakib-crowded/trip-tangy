// app/dashboard/admin/hotels/page.tsx
"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  Hotel as HotelIcon,
  PlusCircle,
  Pencil,
  EyeOff,
  RotateCcw,
  Loader2,
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
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

interface HotelListResponse {
  hotels: HotelListItem[];
  total: number;
  page: number;
  pages: number;
  message?: string;
}

export default function ManageHotelsPage() {
  const [hotels, setHotels] = useState<HotelListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchDraft, setSearchDraft] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [reloadCount, setReloadCount] = useState(0);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadHotels() {
      try {
        const params = new URLSearchParams({ limit: "20", page: String(page) });
        if (search) params.set("search", search);
        const res = await fetch(`/api/admin/hotels?${params}`);
        const data = (await res.json()) as HotelListResponse;
        if (!res.ok) throw new Error(data.message || "Unable to load hotels.");
        if (!active) return;
        setHotels(data.hotels);
        setTotal(data.total);
        setPages(data.pages);
        setError("");
      } catch (requestError) {
        if (!active) return;
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load hotels. Please try again.",
        );
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadHotels();
    return () => {
      active = false;
    };
  }, [page, reloadCount, search]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setPage(1);
    setSearch(searchDraft.trim());
    setReloadCount((count) => count + 1);
  };

  const toggleActive = async (hotel: HotelListItem) => {
    setBusyId(hotel._id);
    setError("");
    try {
      const res = await fetch(`/api/admin/hotels/${hotel._id}`, {
        method: hotel.isActive ? "DELETE" : "PATCH",
        ...(hotel.isActive
          ? {}
          : {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isActive: true }),
            }),
      });
      const data = (await res.json()) as { message?: string };
      if (!res.ok) throw new Error(data.message || "Unable to update hotel.");
      setHotels((prev) =>
        prev.map((h) =>
          h._id === hotel._id ? { ...h, isActive: !h.isActive } : h,
        ),
      );
      setReloadCount((count) => count + 1);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to update hotel. Please try again.",
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-secondary">
            Your portfolio
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Hotel listings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {total.toLocaleString("en-IN")} {total === 1 ? "property" : "properties"} in your portfolio
          </p>
        </div>
        <Link
          href="/admin/dashboard/hotels/new"
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary"
        >
          <PlusCircle className="h-4 w-4" />
          Add property
        </Link>
      </div>

      <form
        onSubmit={submitSearch}
        className="mb-5 flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
      >
        <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="sr-only">Search hotels by name or city</span>
          <input
            value={searchDraft}
            onChange={(event) => setSearchDraft(event.target.value)}
            placeholder="Search by hotel name or destination"
            className="w-full border-none bg-transparent py-2 text-sm text-primary outline-none placeholder:text-slate-400"
          />
        </label>
        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Search
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="flex-1">{error}</p>
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setReloadCount((count) => count + 1);
            }}
            className="font-semibold underline underline-offset-2"
          >
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-primary/40">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : hotels.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
            <HotelIcon className="h-6 w-6" />
          </span>
          <p className="mt-4 font-semibold text-primary">
            {search ? "No properties match your search" : "No properties yet"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {search
              ? "Try another hotel name or destination."
              : "Add your first property to start welcoming guests."}
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                  <th className="px-5 py-4">Property</th>
                  <th className="px-5 py-4">Destination</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Starting at</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hotels.map((hotel) => {
                  const lowestPrice = hotel.rooms.length
                    ? Math.min(...hotel.rooms.map((room) => room.basePrice))
                    : null;
                  return (
                    <tr key={hotel._id} className="transition hover:bg-slate-50/80">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            {hotel.images[0] && (
                              <Image
                                src={hotel.images[0]}
                                alt=""
                                fill
                                unoptimized
                                sizes="64px"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <span className="font-semibold text-primary">{hotel.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{hotel.city}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          {hotel.starRating}-star
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-primary">
                        {lowestPrice !== null
                          ? `₹${lowestPrice.toLocaleString("en-IN")}`
                          : "—"}
                        <span className="ml-1 text-xs font-normal text-slate-400">/ night</span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge isActive={hotel.isActive} />
                      </td>
                      <td className="px-5 py-4">
                        <HotelActions hotel={hotel} busy={busyId === hotel._id} onToggle={toggleActive} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:hidden">
            {hotels.map((hotel) => {
              const lowestPrice = hotel.rooms.length
                ? Math.min(...hotel.rooms.map((room) => room.basePrice))
                : null;
              return (
                <article
                  key={hotel._id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {hotel.images[0] && (
                        <Image
                          src={hotel.images[0]}
                          alt=""
                          fill
                          unoptimized
                          sizes="96px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate font-semibold text-primary">{hotel.name}</h2>
                      <p className="mt-1 text-sm text-slate-500">{hotel.city}</p>
                      <p className="mt-2 text-sm font-semibold text-primary">
                        {lowestPrice !== null
                          ? `₹${lowestPrice.toLocaleString("en-IN")}`
                          : "Price not set"}
                        {lowestPrice !== null && (
                          <span className="font-normal text-slate-400"> / night</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <StatusBadge isActive={hotel.isActive} />
                    <HotelActions hotel={hotel} busy={busyId === hotel._id} onToggle={toggleActive} />
                  </div>
                </article>
              );
            })}
          </div>

          {pages > 1 && (
            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-sm text-slate-500">
                Page <span className="font-semibold text-primary">{page}</span> of{" "}
                <span className="font-semibold text-primary">{pages}</span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => {
                    setIsLoading(true);
                    setPage((current) => current - 1);
                  }}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-primary transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= pages}
                  onClick={() => {
                    setIsLoading(true);
                    setPage((current) => current + 1);
                  }}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-primary transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      {isActive ? "Live" : "Paused"}
    </span>
  );
}

function HotelActions({
  hotel,
  busy,
  onToggle,
}: {
  hotel: HotelListItem;
  busy: boolean;
  onToggle: (hotel: HotelListItem) => void;
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/admin/dashboard/hotels/${hotel._id}/edit`}
        className="rounded-xl p-2 text-slate-500 transition hover:bg-primary/5 hover:text-primary"
        aria-label={`Edit ${hotel.name}`}
        title="Edit property"
      >
        <Pencil className="h-4 w-4" />
      </Link>
      <button
        type="button"
        onClick={() => onToggle(hotel)}
        disabled={busy}
        className="rounded-xl p-2 text-slate-500 transition hover:bg-primary/5 hover:text-primary disabled:opacity-40"
        aria-label={hotel.isActive ? `Pause ${hotel.name}` : `Publish ${hotel.name}`}
        title={hotel.isActive ? "Pause listing" : "Publish listing"}
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : hotel.isActive ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <RotateCcw className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
