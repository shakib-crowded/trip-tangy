"use client";

import Image from "next/image";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SearchType = "hotels" | "holidays";

export function Hero() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<SearchType>("hotels");
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    const basePath =
      searchType === "hotels"
        ? "/hotels/results"
        : "/holidays/search";

    const query = destination.trim()
      ? `?destination=${encodeURIComponent(destination.trim())}`
      : "";

    router.push(`${basePath}${query}`);
  };

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/home_hero.jpg"
          alt="Beautiful holiday destination"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-primary/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            Your journey starts here
          </p>

          {/* Heading */}
          <h1 className="font-(family-name:--font-display) text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.8rem]">
            Stay somewhere
            <br />
            <span className="text-secondary">worth staying for.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Discover comfortable stays and thoughtfully planned holidays
            across India and beyond.
          </p>
        </div>

        {/* Search Engine */}
        <div className="mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                type="button"
                onClick={() => setSearchType("hotels")}
                className={`relative px-7 py-4 text-sm font-semibold transition ${
                  searchType === "hotels"
                    ? "text-primary"
                    : "text-gray-400 hover:text-primary"
                }`}
              >
                Hotels

                {searchType === "hotels" && (
                  <span className="absolute inset-x-7 bottom-0 h-0.5 bg-secondary" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setSearchType("holidays")}
                className={`relative px-7 py-4 text-sm font-semibold transition ${
                  searchType === "holidays"
                    ? "text-primary"
                    : "text-gray-400 hover:text-primary"
                }`}
              >
                Holiday Packages

                {searchType === "holidays" && (
                  <span className="absolute inset-x-7 bottom-0 h-0.5 bg-secondary" />
                )}
              </button>
            </div>

            {/* Search */}
            <div className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Destination */}
                <div className="flex min-h-14 flex-1 items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-primary">
                  <MapPin className="h-5 w-5 shrink-0 text-primary/60" />

                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="destination"
                      className="block text-[11px] font-medium uppercase tracking-wide text-gray-400"
                    >
                      {searchType === "hotels"
                        ? "Where do you want to stay?"
                        : "Where do you want to go?"}
                    </label>

                    <input
                      id="destination"
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      placeholder={
                        searchType === "hotels"
                          ? "City, hotel or destination"
                          : "Destination"
                      }
                      className="mt-0.5 w-full bg-transparent text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-secondary px-8 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Current search type */}
          <p className="mt-4 text-sm text-white/65">
            Search for{" "}
            <span className="font-medium text-white">
              {searchType === "hotels" ? "hotels" : "holiday packages"}
            </span>{" "}
            in your preferred destination.
          </p>
        </div>
      </div>
    </section>
  );
}