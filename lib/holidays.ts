import destinationsData from "@/app/data/destinations.json";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface HolidayPackage {
  slug: string;
  title: string;
  duration: { nights: number; days: number };
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  hotelCategory: string;
  groupType: string[];
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  heroImage: string;
  description: string;
  startingPrice: number;
  currency: string;
  highlights: string[];
  bestTimeToVisit: string;
  explore: boolean;
  packages: HolidayPackage[];
}

const STOPWORDS = new Set([
  "a", "an", "the", "with", "for", "to", "in", "of", "and", "or",
  "trip", "holiday", "holidays", "vacation", "place", "places",
  "near", "i", "want", "my", "me", "somewhere", "some", "looking",
]);

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export function searchDestinations(query: string): Destination[] {
  const trimmed = query.trim();
  const destinations = destinationsData.destinations as Destination[];

  if (!trimmed) return destinations;

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return destinations;

  const scored = destinations.map((dest) => {
    const fields: { text: string; weight: number }[] = [
      { text: dest.name.toLowerCase(), weight: 5 },
      { text: dest.country.toLowerCase(), weight: 3 },
      { text: dest.tagline.toLowerCase(), weight: 2 },
      { text: dest.highlights.join(" ").toLowerCase(), weight: 3 },
      { text: dest.description.toLowerCase(), weight: 1 },
    ];

    let score = 0;
    for (const token of tokens) {
      for (const { text, weight } of fields) {
        if (text.includes(token)) score += weight;
      }
    }

    return { dest, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.dest);
}

interface DestinationsFile {
  destinations: Destination[];
}

const data = destinationsData as DestinationsFile;

export function getAllDestinations(): Destination[] {
  return data.destinations;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return data.destinations.find((d) => d.slug === slug);
}

export function getPackageBySlug(
  destinationSlug: string,
  packageSlug: string,
): { destination: Destination; pkg: HolidayPackage } | undefined {
  const destination = getDestinationBySlug(destinationSlug);
  if (!destination) return undefined;
  const pkg = destination.packages.find((p) => p.slug === packageSlug);
  if (!pkg) return undefined;
  return { destination, pkg };
}

export function getAllDestinationSlugs(): string[] {
  return data.destinations.map((d) => d.slug);
}

export function getAllPackageParams(): {
  destination: string;
  package: string;
}[] {
  return data.destinations.flatMap((d) =>
    d.packages.map((p) => ({ destination: d.slug, package: p.slug })),
  );
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
