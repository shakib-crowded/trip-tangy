// app/page.tsx
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Hero } from "./components/Hero";
import PopularDestinations from "./components/Home/PopularDestinations";
import WhyChooseTT from "./components/Home/WhyChooseTT";

export const metadata: Metadata = {
  title: "Best Travel Website in India | Trip Tangy",
  description:
    "Book flights, hotels, and holiday packages across India with Trip Tangy. Compare prices, get personalized picks from our AI trip planner, and book in minutes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Travel Website in India | Trip Tangy",
    description:
      "Book flights, hotels, and holiday packages across India with Trip Tangy. Compare prices, get personalized picks from our AI trip planner, and book in minutes.",
    url: "https://www.triptangy.com",
    siteName: "Trip Tangy",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1790052130/og_image.png",
        width: 1200,
        height: 630,
        alt: "Trip Tangy - Best Travel Website in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Travel Website in India | Trip Tangy",
    description:
      "Book flights, hotels, and holiday packages across India with Trip Tangy. Compare prices, get personalized picks from our AI trip planner, and book in minutes.",
    images: [
      "https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1790052130/og_image.png",
    ],
    creator: "@triptangy",
    site: "@triptangy",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.triptangy.com",
    },
  ],
};

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      <PopularDestinations />
      <WhyChooseTT />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}