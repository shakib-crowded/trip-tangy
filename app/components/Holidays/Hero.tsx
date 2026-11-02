"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import TravelModeSwitch from "../Common/TravelModeSwitch";

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
    <section className="relative isolate overflow-hidden bg-primary font-(family-name:--font-body)">
      <div className="absolute inset-0">
        <Image
          src="/holidays_hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/65 to-primary/25" />
        <div className="absolute inset-0 bg-linear-to-t from-primary/65 via-transparent to-black/10" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-20 sm:min-h-[660px] sm:px-8 lg:px-10 lg:py-24">
        <div className="w-full">
          <div className="flex justify-center">
            <TravelModeSwitch activeMode="holidays" />
          </div>

          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 sm:text-sm">
              Thoughtfully planned getaways
            </p>

            <h1 className="font-(family-name:--font-display) text-[2.7rem] font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
              Find your next
              <br />
              <span className="text-sun">great escape.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8">
              Discover handpicked holiday packages across India and beyond,
              made for the kind of trip you&rsquo;ll remember.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="mt-8 max-w-2xl sm:mt-9"
            >
              <div className="flex flex-col gap-2 rounded-3xl border border-white/60 bg-white p-2 shadow-2xl shadow-black/25 sm:flex-row sm:items-center sm:rounded-full">
                <label className="flex min-h-14 flex-1 items-center gap-3 px-4">
                  <Search
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-primary/45"
                  />

                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Search by destination"
                    aria-label="Search holiday destinations"
                    className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-primary/45 focus-visible:outline-none sm:text-base"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-secondary px-7 text-sm font-semibold text-white shadow-lg shadow-secondary/20 transition hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:min-h-14 sm:rounded-full"
                >
                  <Search aria-hidden="true" className="h-4 w-4" />
                  Search holidays
                  <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/75 sm:gap-x-5 sm:text-sm">
              <span>Domestic holidays</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-sun/80"
              />
              <span>International trips</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-sun/80"
              />
              <span>Curated packages</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}