// app/contact/page.tsx
import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { siteConfig } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Trip Tangy for hotel bookings, holiday planning, or general questions. We reply within 4 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Trip Tangy",
    description:
      "Get in touch with Trip Tangy for hotel bookings, holiday planning, or general questions.",
    url: "/contact",
    siteName: "Trip Tangy",
    type: "website",
    locale: "en_IN",
  },
};

export default function ContactPageRoute() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Trip Tangy",
    url: "https://www.triptangy.com/contact",
    mainEntity: {
      "@type": "TravelAgency",
      name: "Trip Tangy",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "18:00",
        },
      ],
    },
  };

  return (
    <>
      <ContactPageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
    </>
  );
}