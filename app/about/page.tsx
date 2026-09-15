"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[#faf9f7] min-h-screen text-gray-900">
      {/* ───────────────── Hero ───────────────── */}
      <section className="relative min-h-155 sm:min-h-175 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1789371344/about_us_page.jpg"
            alt="Trip Tangy travel experience"
            fill
            priority
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/40 to-[#faf9f7]" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative z-10 container mx-auto px-5 sm:px-6 max-w-6xl">
          <div className="min-h-155 sm:min-h-175 flex flex-col justify-center items-center text-center">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-300 mb-5">
              Trip Tangy
            </p>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[1.05] text-white max-w-4xl">
              Travel, thoughtfully
              <br />
              <span className="font-light italic">made personal.</span>
            </h1>

            <p className="mt-7 text-sm sm:text-base text-white/75 leading-relaxed max-w-xl">
              A better way to discover hotels and plan unforgettable holidays —
              combining the ease of technology with the attention of a travel
              expert.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/holidays"
                className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 text-sm transition-all duration-300 hover:scale-[1.02]"
              >
                Explore Holidays
              </Link>

              <Link
                href="/hotels"
                className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-7 py-3.5 text-sm transition-all duration-300"
              >
                Find a Hotel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Intro ───────────────── */}
      <section className="container mx-auto px-5 sm:px-6 max-w-6xl">
        <div className="py-20 sm:py-28 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 items-start">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-500 mb-4">
              Why Trip Tangy
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.035em] leading-tight">
              Travel should feel
              <br />
              <span className="font-light italic">effortless.</span>
            </h2>
          </div>

          <div className="space-y-5">
            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed">
              Trip Tangy brings together everything you need to travel better —
              from finding the right hotel to creating a holiday that actually
              feels like yours.
            </p>

            <p className="text-sm sm:text-base text-gray-500 leading-7">
              We believe travel booking should be simple, transparent and
              personal. No endless searching. No generic itineraries. No
              packages designed for someone else.
            </p>

            <p className="text-sm sm:text-base text-gray-500 leading-7">
              Whether you are booking a weekend stay or planning a complete
              holiday, our goal is the same: make the journey from inspiration
              to booking beautifully simple.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── Services ───────────────── */}
      <section className="bg-white border-y border-gray-100">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl py-20 sm:py-28">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-500 mb-4">
              What we do
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.035em]">
              Two ways to travel
              <br />
              <span className="font-light italic">better.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Hotel Booking */}
            <Link
              href="/hotels"
              className="group relative overflow-hidden rounded-3xl bg-[#f4f1ec] p-8 sm:p-10 min-h-97.5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div>

                <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] mb-5">
                  Stay somewhere
                  <br />
                  <span className="font-light italic">worth remembering.</span>
                </h3>

                <p className="text-sm text-gray-500 leading-6 max-w-md">
                  Search and book hotels with ease. Discover stays that match
                  your destination, dates and travel style — all through one
                  simple booking experience.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mt-8">
                Search Hotels
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>

            {/* Holiday Packages */}
            <Link
              href="/holidays"
              className="group relative overflow-hidden rounded-3xl bg-gray-950 text-white p-8 sm:p-10 min-h-97.5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative">

                <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] mb-5">
                  Go beyond
                  <br />
                  <span className="font-light italic text-white/80">
                    the itinerary.
                  </span>
                </h3>

                <p className="text-sm text-white/55 leading-6 max-w-md">
                  Explore thoughtfully designed holiday packages built around
                  destinations, experiences and the way you actually want to
                  travel.
                </p>
              </div>

              <div className="relative flex items-center gap-2 text-sm font-semibold text-white mt-8">
                Explore Holidays
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── Founder ───────────────── */}
      <section className="container mx-auto px-5 sm:px-6 max-w-6xl">
        <div className="py-20 sm:py-28 grid md:grid-cols-[180px_1fr] gap-10 md:gap-20 items-start">
          <div className="flex md:block justify-center">
            <div className="w-28 h-28 rounded-2xl bg-gray-100 ring-1 ring-gray-200 flex items-center justify-center">
              <span className="text-sm uppercase tracking-[0.2em] text-gray-400">
                SA
              </span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-500 mb-5">
              A personal beginning
            </p>

            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light italic text-gray-900 leading-tight tracking-[-0.02em] border-l-2 border-orange-400 pl-6 mb-8">
              “Travel is personal. The way you book it should be too.”
            </blockquote>

            <div className="max-w-2xl">
              <p className="text-sm sm:text-base text-gray-500 leading-7 mb-5">
                Trip Tangy was founded by Shakib Ansari with a simple idea:
                travel should not feel like choosing from a catalogue of
                identical experiences.
              </p>

              <p className="text-sm sm:text-base text-gray-500 leading-7 mb-7">
                We are building a travel platform where technology makes
                booking easier, while thoughtful service makes the experience
                better. From finding your hotel to planning your holiday,
                every detail should have a reason to be there.
              </p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-900">
                  Shakib Ansari
                </p>
                <p className="text-xs tracking-[0.12em] text-gray-400 mt-1">
                  Founder, Trip Tangy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ───────────────── CTA ───────────────── */}
      <section className="bg-gray-950">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl py-20 sm:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-400 mb-4">
                Your next journey
              </p>

              <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-white leading-tight">
                Where will you
                <br />
                <span className="font-light italic text-white/70">
                  go next?
                </span>
              </h2>

              <p className="mt-5 text-sm text-white/45 max-w-md leading-6">
                Find a beautiful place to stay or let us help you turn your
                next destination into a complete holiday.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/hotels"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
              >
                Book a Hotel
              </Link>

              <Link
                href="/holidays"
                className="border border-white/15 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
              >
                View Holiday Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}