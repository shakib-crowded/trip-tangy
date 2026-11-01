// app/layout.tsx
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import { AuthProvider } from "@/context/AuthContext";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://www.triptangy.com"),
  title: {
    default: "Trip Tangy | Flights, Hotels & Holiday Packages in India",
    template: "%s | Trip Tangy",
  },
  description:
    "Trip Tangy helps you book flights, hotels, and holiday packages across India, with an AI trip planner to build your itinerary in minutes.",
  openGraph: {
    siteName: "Trip Tangy",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1790052130/og_image.png",
        width: 1200,
        height: 630,
        alt: "Trip Tangy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
  // verification: { google: "your-search-console-verification-code" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trip Tangy",
  url: "https://www.triptangy.com",
  logo: "https://res.cloudinary.com/qbhq0l88/image/upload/q_auto/f_auto/v1789988475/logo.png",
  sameAs: [
    "https://facebook.com/triptangy",
    "https://instagram.com/triptangy",
    "https://twitter.com/triptangy",
    "https://youtube.com/@triptangy",
    "https://linkedin.com/company/triptangy",
    "https://x.com/triptangy",
    "https://pinterest.com/triptangy",
    "https://threads.com/@triptangy",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Trip Tangy",
  url: "https://www.triptangy.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="h-full antialiased">
      <body className={`${rubik.className} min-h-full flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H4CZCZLKR2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H4CZCZLKR2');
          `}
        </Script>
      </body>
    </html>
  );
}