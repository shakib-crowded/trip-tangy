// app/hotels/results/page.tsx
import { Metadata } from "next";
import { connectDB } from "@/lib/mongodb";
import Hotel from "@/models/Hotel";
import HotelCard, { HotelCardData } from "@/app/components/Hotels/HotelCard";
import ResultsSortBar from "@/app/components/Hotels/ResultsSortBar";
import { SearchX } from "lucide-react";

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function titleCase(s: string) {
  return s.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase());
}

type SearchParams = Promise<{ destination?: string; sort?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { destination = "" } = await searchParams;
  const clean = destination.trim().slice(0, 60); // guard against garbage/oversized query strings

  const canonicalPath = clean
    ? `/hotels/results?destination=${encodeURIComponent(clean)}`
    : `/hotels/results`;

  const title = clean
    ? `Hotels in ${titleCase(clean)}`
    : `Hotel Search Results`;

  const description = clean
    ? `Compare and book hotels in ${titleCase(clean)} with Trip Tangy. Filter by price and rating, and get instant confirmation.`
    : `Browse hotel deals across India with Trip Tangy.`;

  const shouldIndex = Boolean(clean);

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    robots: {
      index: shouldIndex,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: "Trip Tangy",
      type: "website",
      locale: "en_IN",
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { destination = "", sort = "relevance" } = await searchParams;

  await connectDB();

  const filter: Record<string, unknown> = { isActive: true };
  if (destination.trim()) {
    const safe = escapeRegex(destination.trim());
    filter.$or = [
      { name: new RegExp(safe, "i") },
      { city: new RegExp(safe, "i") },
    ];
  }

  const hotels = (await Hotel.find(filter)
    .select("-createdBy")
    .limit(50)
    .lean()) as unknown as HotelCardData[];

  const sorted = [...hotels].sort((a, b) => {
    const priceA = Math.min(...(a.rooms.map((r) => r.basePrice) || [0]));
    const priceB = Math.min(...(b.rooms.map((r) => r.basePrice) || [0]));
    if (sort === "price_asc") return priceA - priceB;
    if (sort === "price_desc") return priceB - priceA;
    if (sort === "rating") return b.starRating - a.starRating;
    return 0;
  });
  
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sorted.slice(0, 20).map((hotel, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Hotel",
        name: hotel.name,
        address: hotel.city,
        starRating: { "@type": "Rating", ratingValue: hotel.starRating },
      },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-(family-name:--font-display) text-2xl font-semibold text-primary">
            {destination ? `Stays for "${destination}"` : "All stays"}
          </h1>
          <p className="mt-1 text-sm text-primary/50">
            {sorted.length} hotel{sorted.length === 1 ? "" : "s"} found
          </p>
        </div>
        <ResultsSortBar />
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-primary/15 py-20 text-center">
          <SearchX className="h-6 w-6 text-primary/30" />
          <p className="text-sm text-primary/50">
            No stays matched that search. Try a nearby city or a different name.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
        </div>
      )}
    </div>
  );
}