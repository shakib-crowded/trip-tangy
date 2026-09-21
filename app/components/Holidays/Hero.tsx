"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export default function HolidaysHero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    const value = destination.trim();

    if (value) {
      router.push(
        `/holidays/results?destination=${encodeURIComponent(value)}`
      );
    } else {
      router.push("/holidays/results");
    }
  };

  return (
    <section className="relative overflow-hidden bg-primary font-(family-name:--font-body)">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/holidays_hero.jpg"
          alt="Beautiful holiday destination"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Premium overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-primary/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-140 max-w-7xl items-center px-6 py-20 sm:min-h-150 lg:px-10 lg:py-24">
        <div className="w-full max-w-3xl">
          {/* Eyebrow */}
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-white/75">
            Holiday packages
          </p>

          {/* Heading */}
          <h1 className="font-(family-name:--font-display) text-[2.7rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4rem]">
            Find your next
            <br />
            <span className="text-secondary">great escape.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Explore carefully planned holiday packages across India and
            around the world.
          </p>

          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="mt-9 max-w-2xl"
          >
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-black/25 sm:flex-row sm:items-center sm:rounded-full">
              {/* Destination */}
              <div className="flex min-h-14 flex-1 items-center gap-3 px-4">
                <Search className="h-5 w-5 shrink-0 text-primary/45" />

                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Search by destination"
                  aria-label="Search holiday destinations"
                  className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-primary/40 sm:text-base"
                />
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-secondary px-7 text-sm font-semibold text-white transition hover:bg-secondary/90 sm:rounded-full"
              >
                <Search className="h-4 w-4" />
                Search holidays
              </button>
            </div>
          </form>

          {/* Supporting text */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/65 sm:text-sm">
            <span>Domestic holidays</span>

            <span className="h-1 w-1 rounded-full bg-white/40" />

            <span>International trips</span>

            <span className="h-1 w-1 rounded-full bg-white/40" />

            <span>Curated packages</span>
          </div>
        </div>
      </div>
    </section>
  );
}