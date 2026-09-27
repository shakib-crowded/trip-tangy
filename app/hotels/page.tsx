// app/hotels/page.tsx
import { Metadata } from "next";
import Hero from "../components/Hotels/Hero";
import HotelList from "../components/Hotels/HotelList";
import HotelsWithTT from "../components/Hotels/HotelsWithTT";

export const metadata: Metadata = {
  title: "Hotel Booking in India",
  description:
    "Search and book hotels across India with Trip Tangy — compare prices, filter by location and amenities, and get instant confirmation.",
  alternates: {
    canonical: "/hotels",
  },
  openGraph: {
    title: "Hotel Booking in India | Trip Tangy",
    description:
      "Search and book hotels across India with Trip Tangy — compare prices, filter by location and amenities, and get instant confirmation.",
    url: "https://www.triptangy.com/hotels",
    siteName: "Trip Tangy",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1790052130/og_image.png",
        width: 1200,
        height: 630,
        alt: "Trip Tangy Hotels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Booking in India | Trip Tangy",
    description:
      "Search and book hotels across India with Trip Tangy — compare prices, filter by location and amenities, and get instant confirmation.",
    images: [
      "https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1790052130/og_image.png",
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.triptangy.com" },
    { "@type": "ListItem", position: 2, name: "Hotels", item: "https://www.triptangy.com/hotels" },
  ],
};

export default function Page() {
  return (
    <>
      <Hero />
      <HotelList />
      <HotelsWithTT />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}