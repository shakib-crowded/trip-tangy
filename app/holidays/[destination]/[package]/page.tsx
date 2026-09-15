/// /holidays/[destination]/[package]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import {
  getPackageBySlug,
  getAllPackageParams,
  formatPrice,
} from "@/lib/holidays";
import { Breadcrumb } from "@/app/components/Holidays/Breadcrumb";
import { BookingSidebar } from "@/app/components/Holidays/BookingSidebar";

export function generateStaticParams() {
  return getAllPackageParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string; package: string }>;
}): Promise<Metadata> {
  const { destination, package: packageSlug } = await params;

  const result = getPackageBySlug(destination, packageSlug);

  if (!result) return {};

  return {
    title: `${result.pkg.title} | Trip Tangy`,
    description: `${result.pkg.duration.nights}N/${result.pkg.duration.days}D package in ${result.destination.name}. Starting at ${formatPrice(
      result.pkg.price,
      result.pkg.currency
    )}.`,
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ destination: string; package: string }>;
}) {

  const { destination: destinationSlug, package: packageSlug } =
    await params;

  const result = getPackageBySlug(destinationSlug, packageSlug);

  if (!result) {
    notFound();
  }

  const { destination, pkg } = result;

  const discount =
    pkg.originalPrice && pkg.originalPrice > pkg.price
      ? Math.round(
          ((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100
        )
      : 0;

  const otherPackages = destination.packages
    .filter((p) => p.slug !== pkg.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-120 w-full overflow-hidden md:h-140">
        <Image
          src={pkg.images[0]}
          alt={pkg.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container mx-auto max-w-6xl px-4 pb-10 md:pb-14">
            <Link
              href={`/holidays/${destination.slug}`}
              className="mb-5 inline-flex items-center text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              ← {destination.name} holidays
            </Link>

            <div className="max-w-4xl">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-gray-900">
                  {pkg.duration.nights} Nights / {pkg.duration.days} Days
                </span>

                <span className="rounded-md border border-white/30 bg-black/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  {pkg.hotelCategory}
                </span>

                {discount > 0 && (
                  <span className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white">
                    {discount}% off
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                {pkg.title}
              </h1>

              <p className="mt-4 text-base text-white/80 md:text-lg">
                {destination.name}, {destination.country}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-10">
        <Breadcrumb
          items={[
            {
              label: "Holidays",
              href: "/holidays",
            },
            {
              label: destination.name,
              href: `/holidays/${destination.slug}`,
            },
            {
              label: pkg.title,
            },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Main Content */}
          <div className="min-w-0 space-y-10">
            {/* Package Summary */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-5 md:px-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  Package details
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {pkg.title}
                </h2>
              </div>

              <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 md:grid-cols-4 md:divide-y-0">
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Duration
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {pkg.duration.nights} Nights
                  </p>
                  <p className="text-xs text-gray-500">
                    {pkg.duration.days} Days
                  </p>
                </div>

                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Stay
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {pkg.hotelCategory}
                  </p>
                  <p className="text-xs text-gray-500">Hotel category</p>
                </div>

                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Suitable for
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {pkg.groupType.join(", ")}
                  </p>
                  <p className="text-xs text-gray-500">Travel type</p>
                </div>

                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Starting price
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {formatPrice(pkg.price, pkg.currency)}
                  </p>
                  <p className="text-xs text-gray-500">Per person</p>
                </div>
              </div>
            </section>

            {/* Gallery */}
            {pkg.images.length > 1 && (
              <section>
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    Explore
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-900">
                    Trip gallery
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {pkg.images.slice(1).map((img, index) => (
                    <div
                      key={index}
                      className="group relative h-40 overflow-hidden rounded-xl bg-gray-100 md:h-48"
                    >
                      <Image
                        src={img}
                        alt={`${pkg.title} image ${index + 2}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itinerary */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  Your trip
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  Day-by-day itinerary
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  A clear breakdown of what your holiday looks like each day.
                </p>
              </div>

              <div className="space-y-3">
                {pkg.itinerary.map((day) => (
                  <article
                    key={day.day}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                  >
                    <div className="flex gap-4 p-5 md:p-6">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-white">
                        {day.day}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Day {day.day}
                        </p>

                        <h3 className="mt-1 text-base font-semibold text-gray-900">
                          {day.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Inclusions / Exclusions */}
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    What&apos;s included
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Services covered in this package.
                  </p>
                </div>

                <ul className="mt-5 space-y-3">
                  {pkg.inclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-5 text-gray-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    What&apos;s not included
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Expenses not covered in the package price.
                  </p>
                </div>

                <ul className="mt-5 space-y-3">
                  {pkg.exclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-5 text-gray-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Other Packages */}
            {otherPackages.length > 0 && (
              <section>
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    More options
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-900">
                    More packages in {destination.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {otherPackages.map((otherPackage) => (
                    <Link
                      key={otherPackage.slug}
                      href={`/holidays/${destination.slug}/${otherPackage.slug}`}
                      className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={otherPackage.images[0]}
                          alt={otherPackage.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-secondary">
                          {otherPackage.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {otherPackage.duration.nights} Nights /{" "}
                          {otherPackage.duration.days} Days
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <p className="font-bold text-gray-900">
                            {formatPrice(
                              otherPackage.price,
                              otherPackage.currency
                            )}
                          </p>

                          <span className="text-sm font-medium text-secondary">
                            View package
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Booking / Enquiry Sidebar */}
         <BookingSidebar pkg={pkg} destination={destination} discount={discount}/>
        </div>
      </div>
    </main>
  );
}