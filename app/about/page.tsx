import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us ",
  description:
    "Trip Tangy was founded by Shakib Ansari to make hotel booking and holiday planning simple, transparent, and personal — not generic.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Trip Tangy",
    description:
      "Trip Tangy was founded by Shakib Ansari to make hotel booking and holiday planning simple, transparent, and personal.",
    url: "/about",
    siteName: "Trip Tangy",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1789371344/about_us_page.jpg",
        width: 1200,
        height: 630,
        alt: "Trip Tangy",
      },
    ],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Trip Tangy",
  url: "https://www.triptangy.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Trip Tangy",
    url: "https://www.triptangy.com",
    founder: {
      "@type": "Person",
      name: "Shakib Ansari",
    },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-(--color-surface,#faf9f7) min-h-screen text-primary">
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

          <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/40 to-(--color-surface,#faf9f7)" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative z-10 container mx-auto px-5 sm:px-6 max-w-6xl">
          <div className="min-h-155 sm:min-h-175 flex flex-col justify-center items-center text-center">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary mb-5">
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
                className="rounded-full bg-secondary hover:opacity-90 text-white font-semibold px-7 py-3.5 text-sm transition-all duration-300 hover:scale-[1.02]"
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary mb-4">
              Why Trip Tangy
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.035em] leading-tight">
              Travel should feel
              <br />
              <span className="font-light italic">effortless.</span>
            </h2>
          </div>

          <div className="space-y-5">
            <p className="text-lg sm:text-xl text-primary/90 leading-relaxed">
              Trip Tangy brings together everything you need to travel better —
              from finding the right hotel to creating a holiday that actually
              feels like yours.
            </p>

            <p className="text-sm sm:text-base text-primary/60 leading-7">
              We believe travel booking should be simple, transparent and
              personal. No endless searching. No generic itineraries. No
              packages designed for someone else.
            </p>

            <p className="text-sm sm:text-base text-primary/60 leading-7">
              Whether you are booking a weekend stay or planning a complete
              holiday, our goal is the same: make the journey from inspiration
              to booking beautifully simple.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── Services ───────────────── */}
      <section className="bg-white border-y border-primary/10">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl py-20 sm:py-28">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary mb-4">
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
              className="group relative overflow-hidden rounded-3xl bg-(--color-ocean,#f4f1ec) p-8 sm:p-10 min-h-97.5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div>
                <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] mb-5">
                  Stay somewhere
                  <br />
                  <span className="font-light italic">worth remembering.</span>
                </h3>

                <p className="text-sm text-primary/60 leading-6 max-w-md">
                  Search and book hotels with ease. Discover stays that match
                  your destination, dates and travel style — all through one
                  simple booking experience.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-primary mt-8">
                Search Hotels
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>

            {/* Holiday Packages */}
            <Link
              href="/holidays"
              className="group relative overflow-hidden rounded-3xl bg-primary text-white p-8 sm:p-10 min-h-97.5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-secondary/20 blur-3xl" />

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
      <section className="container mx-auto max-w-6xl px-5 sm:px-6">
        <div className="py-16 sm:py-24 lg:py-28">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary">
              A personal beginning
            </p>

            {/* Quote */}
            <figure className="mb-10 sm:mb-12">
              <blockquote
                cite="https://www.triptangy.com/about"
                className="border-l-2 border-secondary pl-5 text-2xl font-light italic leading-[1.2] tracking-[-0.02em] text-primary sm:pl-7 sm:text-3xl lg:text-4xl"
              >
                “Travel is personal. The way you book it should be too.”
              </blockquote>

              <figcaption className="sr-only">
                — Shakib Ansari, Founder of Trip Tangy
              </figcaption>
            </figure>

            {/* Content */}
            <div className="max-w-2xl">
              <p className="mb-5 text-sm leading-7 text-primary/60 sm:text-base">
                Trip Tangy was founded by Shakib Ansari with a simple idea:
                travel should not feel like choosing from a catalogue of
                identical experiences.
              </p>

              <p className="mb-8 text-sm leading-7 text-primary/60 sm:text-base">
                We are building a travel platform where technology makes booking
                easier, while thoughtful service makes the experience better.
                From finding your hotel to planning your holiday, every detail
                should have a reason to be there.
              </p>

              {/* Founder */}
              <div className="border-t border-primary/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Shakib Ansari
                </p>

                <p className="mt-1 text-xs tracking-[0.12em] text-primary/40">
                  Founder, Trip Tangy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ───────────────── CTA ───────────────── */}
      <section className="bg-primary">
        <div className="container mx-auto px-5 sm:px-6 max-w-6xl py-20 sm:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary mb-4">
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
                Find a beautiful place to stay or let us help you turn your next
                destination into a complete holiday.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/hotels"
                className="bg-secondary hover:opacity-90 text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
    </div>
  );
}
