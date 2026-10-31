// app/page.tsx
import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import PopularDestinations from "./components/Home/PopularDestinations";
import WhyChooseTT from "./components/Home/WhyChooseTT";
import BookingOptions from "./components/Home/BookingOptions";
import PlanningSteps from "./components/Home/PlanningSteps";
import FrequentlyAskedQuestions from "./components/Home/FrequentlyAskedQuestions";
import ContactCta from "./components/Home/ContactCTA";

export const metadata: Metadata = {
  title: "Hotel Booking in India | Trip Tangy",
  description:
    "Discover hotels across India, compare nightly prices and room options, and book your next stay with Trip Tangy.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hotel Booking in India | Trip Tangy",
    description:
      "Discover hotels across India, compare nightly prices and room options, and book your next stay with Trip Tangy.",
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
    title: "Hotel Booking in India | Trip Tangy",
    description:
      "Discover hotels across India, compare nightly prices and room options, and book your next stay with Trip Tangy.",
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
      <Hero />
      <BookingOptions />
      <PopularDestinations />
      <PlanningSteps />
      <WhyChooseTT />
      <FrequentlyAskedQuestions />
      <ContactCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
