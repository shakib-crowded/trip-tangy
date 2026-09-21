import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { Hero } from "./components/Hero";
import PopularDestinations from "./components/Home/PopularDestinations";
import WhyChooseTT from "./components/Home/WhyChooseTT";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.triptangy.com"),
  title: "Best Travel Website | Trip Tangy",
  description:
    "Trip Tangy is your go-to destination for the best travel experiences which has a hotel booking option..",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Travel Website | Trip Tangy",
    description:
      "Trip Tangy is your go-to destination for the best travel experiences which has a hotel booking option..",
    url: "https://www.triptangy.com",
    siteName: "Trip Tangy",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1789988475/logo.png",
        width: 666,
        height: 335,
        alt: "Trip Tangy - Best Travel Website",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Travel Website | Trip Tangy",
    description:
      "Trip Tangy is your go-to destination for the best travel experiences which has a hotel booking option..",
    images: [
      "https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1789988475/logo.png",
    ],
    creator: "@triptangy",
    site: "@triptangy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
  classification: "Travel Agency",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Trip Tangy" }],
  publisher: "Trip Tangy",
};

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      <PopularDestinations />
      <WhyChooseTT />
    </>
  );
}
