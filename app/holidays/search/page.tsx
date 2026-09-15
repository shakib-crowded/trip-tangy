import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { searchDestinations, formatPrice } from "@/lib/holidays";

export const metadata: Metadata = {
  title: "Search Holidays | Trip Tangy",
  description: "Find the perfect holiday package for your next trip.",
};

export default async function HolidaySearchPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string }>;
}) {
  const { destination: rawQuery } = await searchParams;
  const query = rawQuery?.trim() ?? "";
  const results = searchDestinations(query);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search header */}
      <section className="bg-primary py-14">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
            Holiday search
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            {query ? `Results for “${query}”` : "All destinations"}
          </h1>

          <p className="mt-2 text-sm text-white/70">
            {results.length} destination{results.length !== 1 ? "s" : ""} found
          </p>

          <form action="/holidays/search" method="GET" className="mt-6 max-w-xl">
            <div className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-lg">
              <input
                type="text"
                name="destination"
                defaultValue={query}
                placeholder="Try 'beaches', 'Kashmir', 'honeymoon'..."
                className="w-full rounded-full bg-transparent px-4 py-2.5 text-sm text-primary placeholder:text-primary/40 focus:outline-none"
                aria-label="Search destinations"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary/90"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto max-w-6xl px-4 py-10">
        {results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              No destinations matched “{query}”
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Try a broader search — a country name, or a vibe like
              “beaches”, “mountains”, or “honeymoon”.
            </p>
            <Link
              href="/holidays"
              className="mt-5 inline-flex rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Browse all holidays
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((dest) => (
              <Link
                key={dest.slug}
                href={`/holidays/${dest.slug}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                    <p className="text-xs text-white/80">{dest.country}</p>
                  </div>
                </div>

                <div className="p-4">
                  <p className="line-clamp-2 text-sm text-gray-500">
                    {dest.tagline}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-400">
                        Starting from
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        {formatPrice(dest.startingPrice, dest.currency)}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-secondary">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}