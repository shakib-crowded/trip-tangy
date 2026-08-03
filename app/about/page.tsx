"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
            fill
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/50 to-gray-50" />
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-28 sm:pt-24 sm:pb-32 text-center max-w-3xl">
          <p className=" text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300 mb-4">
            About Trip Tangy
          </p>
          <h1 className=" text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Travel planning,
            <br className="hidden sm:block" /> made personal
          </h1>
          <p className="text-white/80 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8">
            We&apos;re brand new and intentionally small — built around giving
            every traveler our full attention, not a call centre queue.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* ── Founder ── */}
        <section className="grid md:grid-cols-[160px,1fr] gap-8 md:gap-14 items-start py-16 md:py-20">
          {/* Monogram stamp */}
          {/* <div className="flex flex-col items-center md:items-start gap-3">
            <div className="relative w-20 h-20 overflow-hidden rounded-sm ring-1 ring-gray-700">
              <Image
                src="/images/founder.png"
                alt="Shakib Ansari"
                fill
                className="object-cover"
                priority
                sizes="80px"
              />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-900 text-center md:text-left">
                Shakib Ansari
              </p>
              <p className="text-[10px] tracking-[0.14em] text-gray-400 text-center md:text-left">
                Founder
              </p>
            </div>
          </div> */}

          {/* Founder placeholder */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center justify-center w-20 h-20 rounded-sm ring-1 ring-gray-700 bg-gray-100 text-gray-400">
              <span className="text-xs uppercase tracking-wider">SA</span>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-900 text-center md:text-left">
                Shakib Ansari
              </p>
              <p className="text-[10px] tracking-[0.14em] text-gray-400 text-center md:text-left">
                Founder
              </p>
            </div>
          </div>

          {/* Editorial text */}
          <div>
            <blockquote className=" text-xl sm:text-2xl italic text-gray-900 leading-snug mb-6 border-l-2 border-orange-400 pl-5">
              &ldquo;I wanted to build something smaller and more honest — where
              the person planning your trip actually answers your
              messages.&rdquo;
            </blockquote>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              I started Trip Tangy after one too many trips planned around
              recycled itineraries and packages built for an average traveler
              who doesn&apos;t exist.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              We&apos;re just getting started, and we&apos;re not pretending
              otherwise. What that means for you: no call centre, no scripted
              replies, and a lot more attention on your trip than a bigger
              agency could ever give it. You&apos;re not customer #40,000 here —
              you&apos;re one of our first, and we plan to make that count.
            </p>
          </div>
        </section>
      </div>

      {/* ── CTA ── */}
      <section className="bg-gray-900">
        <div className="container mx-auto px-4 max-w-5xl py-16 sm:py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-400 mb-3">
              Next step
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to start planning?
            </h2>
            <p className="text-sm text-white/50 max-w-sm">
              Tell us where you&apos;d like to go and we&apos;ll take it from
              there.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/holidays"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Browse Destinations
            </Link>
            <Link
              href="/contact"
              className="border border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
