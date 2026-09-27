// app/hotels/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Star, Clock, ShieldCheck } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Hotel from "@/models/Hotel";
import BookingWidget from "@/app/components/Hotels/BookingWidget";
import Image from "next/image";

type Params = {
  params: Promise<{ slug: string }>;
};

async function getHotel(slug: string) {
  await connectDB();
  return Hotel.findOne({ slug, isActive: true }).select("-createdBy").lean();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const hotel = await getHotel(slug);

  if (!hotel) {
    return { title: "Hotel Not Found", robots: { index: false, follow: false } };
  }

  const h = hotel as any;
  const title = `${h.name}, ${h.city} | Book Now`;
  const description = h.description
    ? h.description.slice(0, 155)
    : `Book ${h.name} in ${h.city} on Trip Tangy. ${h.starRating}-star hotel with instant confirmation and the best available rates.`;
  const canonicalPath = `/hotels/${h.slug}`;
  const ogImage = h.images?.[0];

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: "Trip Tangy",
      type: "website",
      locale: "en_IN",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: h.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const hotel = await getHotel(slug);

  if (!hotel) notFound();

  const h = hotel as any;

  const prices = (h.rooms || []).map((r: any) => r.basePrice).filter(Boolean);
  const minPrice = prices.length ? Math.min(...prices) : undefined;
  const maxPrice = prices.length ? Math.max(...prices) : undefined;

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: h.name,
    description: h.description,
    image: h.images,
    address: {
      "@type": "PostalAddress",
      streetAddress: h.address,
      addressLocality: h.city,
      addressCountry: "IN",
    },
    starRating: {
      "@type": "Rating",
      ratingValue: h.starRating,
    },
    ...(minPrice && {
      priceRange: minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} - ₹${maxPrice}`,
    }),
    amenityFeature: (h.amenities || []).map((a: string) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
    })),
    checkinTime: h.policies?.checkIn,
    checkoutTime: h.policies?.checkOut,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.triptangy.com" },
      { "@type": "ListItem", position: 2, name: "Hotels", item: "https://www.triptangy.com/hotels" },
      {
        "@type": "ListItem",
        position: 3,
        name: h.city,
        item: `https://www.triptangy.com/hotel/results?destination=${encodeURIComponent(h.city)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: h.name,
        item: `https://www.triptangy.com/hotels/${h.slug}`,
      },
    ],
  };

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Gallery */}
        <div className="grid h-70 grid-cols-4 gap-2 overflow-hidden rounded-xl md:h-100">
          {/* Main image */}
          <div className="relative col-span-4 bg-gray-100 sm:col-span-2">
            {h.images[0] ? (
              <Image
                src={h.images[0]}
                alt={`${h.name} in ${h.city}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* Secondary images */}
          {h.images.slice(1, 5).map((src: string, index: number) => (
            <div key={`${src}-${index}`} className="relative hidden bg-gray-100 sm:block">
              <Image
                src={src}
                alt={`${h.name} - view ${index + 2}`}
                fill
                sizes="(max-width: 640px) 0px, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* LEFT */}
          <div>
            {/* Hotel heading */}
            <div className="border-b border-gray-100 pb-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                      {h.name}
                    </h1>

                    <div className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-800">
                        {h.starRating}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {h.address}, {h.city}
                  </p>
                </div>
              </div>

              {h.description && (
                <p className="mt-5 max-w-3xl text-sm leading-6 text-gray-600">
                  {h.description}
                </p>
              )}
            </div>

            {/* Amenities */}
            {h.amenities.length > 0 && (
              <section className="border-b border-gray-100 py-7">
                <h2 className="text-lg font-semibold text-gray-900">Amenities</h2>

                <div className="mt-4 grid grid-cols-2 gap-y-3 sm:grid-cols-3">
                  {h.amenities.map((amenity: string) => (
                    <div key={amenity} className="text-sm text-gray-600">
                      {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Policies */}
            <section className="py-7">
              <h2 className="text-lg font-semibold text-gray-900">Hotel policies</h2>

              <div className="mt-5 divide-y divide-gray-100 border-y border-gray-100">
                <div className="flex items-center gap-4 py-4">
                  <Clock className="h-5 w-5 shrink-0 text-gray-400" />

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Check-in & check-out
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Check-in from {h.policies.checkIn} · Check-out by{" "}
                      {h.policies.checkOut}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Cancellation policy
                    </p>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {h.policies.cancellation}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT - BOOKING */}
          <aside>
            <BookingWidget
              hotelId={h._id.toString()}
              hotelSlug={h.slug}
              rooms={h.rooms.map((room: any) => ({
                _id: room._id.toString(),
                roomType: room.roomType,
                description: room.description,
                maxOccupancy: room.maxOccupancy,
                maxAdults: room.maxAdults,
                maxChildren: room.maxChildren,
                basePrice: room.basePrice,
                totalRooms: room.totalRooms,
                amenities: room.amenities,
              }))}
            />
          </aside>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}