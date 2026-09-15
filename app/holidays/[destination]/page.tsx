// /holidays/[destination]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import {
  getDestinationBySlug,
  getAllDestinationSlugs,
  formatPrice,
} from "@/lib/holidays";
import { Breadcrumb } from "@/app/components/Holidays/Breadcrumb";

export function generateStaticParams() {
  return getAllDestinationSlugs().map((destination) => ({ destination }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string }>;
}): Promise<Metadata> {
  const { destination: destinationSlug } = await params;

  const destination = getDestinationBySlug(destinationSlug);

  if (!destination) return {};

  return {
    title: `${destination.name} Holiday Packages | Trip Tangy`,
    description: destination.description,
  };
}

function getPackageType(groupType: string[]) {
  if (groupType.includes("Honeymoon")) return "Honeymoon";
  if (groupType.includes("Family")) return "Family";
  if (groupType.includes("Friends")) return "Friends";
  if (groupType.includes("Couple")) return "Couple";
  if (groupType.includes("Adventure")) return "Adventure";

  return groupType[0] || "Holiday";
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination: destinationSlug } = await params;

  const destination = getDestinationBySlug(destinationSlug);

  if (!destination) {
    notFound();
  }

  const priceRange = destination.packages.reduce(
    (acc, pkg) => ({
      min: Math.min(acc.min, pkg.price),
      max: Math.max(acc.max, pkg.price),
    }),
    { min: Infinity, max: 0 }
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[580px] w-full overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={`${destination.name} holiday destination`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container mx-auto max-w-6xl px-4 pb-12 md:pb-16">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-white/80">
                Holiday Packages
              </p>

              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                {destination.name}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl">
                {destination.tagline}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900">
                  From{" "}
                  {formatPrice(
                    destination.startingPrice,
                    destination.currency
                  )}
                </span>

                <span className="rounded-md border border-white/30 bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-sm">
                  {destination.country}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12">
        <Breadcrumb
          items={[
            { label: "Holidays", href: "/holidays" },
            { label: destination.name },
          ]}
        />

        {/* Overview Stats */}
        <section className="mb-12 grid grid-cols-2 divide-x divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white md:grid-cols-4 md:divide-y-0">
          <div className="p-5 text-center md:p-6">
            <p className="text-2xl font-bold text-gray-900">
              {destination.packages.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">Holiday Packages</p>
          </div>

          <div className="p-5 text-center md:p-6">
            <p className="text-2xl font-bold text-gray-900">
              {destination.highlights.length}
            </p>
            <p className="mt-1 text-sm text-gray-500">Top Highlights</p>
          </div>

          <div className="p-5 text-center md:p-6">
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(priceRange.min, destination.currency)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Starting From</p>
          </div>

          <div className="p-5 text-center md:p-6">
            <p className="text-2xl font-bold text-gray-900">
              {destination.bestTimeToVisit}
            </p>
            <p className="mt-1 text-sm text-gray-500">Best Time to Visit</p>
          </div>
        </section>

        {/* Destination Information */}
        <section className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-secondary">
              Discover the destination
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              About {destination.name}
            </h2>

            <div className="mt-5 space-y-5 text-base leading-7 text-gray-600">
              <p>{destination.description}</p>

              <p>
                Whether you are travelling with family, friends or your
                partner, {destination.name} offers a range of experiences to
                suit different travel styles and budgets.
              </p>
            </div>

            <div className="mt-7 border-l-4 border-secondary bg-white px-5 py-4">
              <p className="text-sm leading-6 text-gray-600">
                Popular experiences include{" "}
                <span className="font-medium text-gray-900">
                  {destination.highlights.slice(0, 4).join(", ")}
                </span>
                {destination.highlights.length > 4 ? ", and more." : "."}
              </p>
            </div>
          </div>

          {/* Destination Details */}
          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Destination Details
            </h3>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Best Time to Visit
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {destination.bestTimeToVisit}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Popular Experiences
                </p>

                <div className="mt-3 space-y-2">
                  {destination.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <Link
                  href="#packages"
                  className="flex w-full items-center justify-center rounded-lg bg-secondary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Explore Packages
                </Link>
              </div>
            </div>
          </aside>
        </section>

        {/* Packages */}
        <section id="packages" className="scroll-mt-24">
          <div className="mb-7 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-secondary">
                Plan your trip
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                {destination.name} Holiday Packages
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Choose from {destination.packages.length} carefully selected
                packages.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Starting from{" "}
              <span className="font-semibold text-gray-900">
                {formatPrice(
                  destination.startingPrice,
                  destination.currency
                )}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {destination.packages.map((pkg) => (
              <Link
                key={pkg.slug}
                href={`/holidays/${destination.slug}/${pkg.slug}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={pkg.images[0]}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4">
                    <span className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                      {getPackageType(pkg.groupType)}
                    </span>
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-secondary">
                    {pkg.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500">
                    <span>
                      {pkg.duration.nights} Nights / {pkg.duration.days} Days
                    </span>

                    <span className="text-gray-300">|</span>

                    <span>{pkg.hotelCategory}</span>

                    <span className="text-gray-300">|</span>

                    <span>{pkg.groupType.join(", ")}</span>
                  </div>

                  <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">
                    <div>
                      {pkg.originalPrice &&
                        pkg.originalPrice > pkg.price && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPrice(
                              pkg.originalPrice,
                              pkg.currency
                            )}
                          </p>
                        )}

                      <p className="mt-0.5 text-xl font-bold text-gray-900">
                        {formatPrice(pkg.price, pkg.currency)}

                        <span className="ml-1 text-xs font-normal text-gray-500">
                          per person
                        </span>
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-secondary transition-transform group-hover:translate-x-1">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}