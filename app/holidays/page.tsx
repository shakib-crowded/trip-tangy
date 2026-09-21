import Hero from "../components/Holidays/Hero";
import { FeaturedHoliday } from "@/app/components/Holidays/FeaturedHoliday";
import { ExploreDestinations } from "@/app/components/Holidays/ExploreDestinations";
import { Destinations } from "../components/Holidays/Destinations";
import { getAllDestinations } from "@/lib/holidays";

export default function HolidaysPage() {
  const destinations = getAllDestinations();

  const exploreDestinations = destinations.filter(
    (destination) => destination.explore === true,
  );

  const domesticDestinations = destinations.filter(
    (destination) => destination.country === "India",
  );

  const internationalDestinations = destinations.filter(
    (destination) => destination.country !== "India",
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <Hero />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
        {/* Featured Holiday */}
        <section>
          <SectionHeader
            eyebrow="TRIP TANGY PICKS"
            title="Featured Holiday"
            description="A hand-picked experience for your next getaway."
          />

          <FeaturedHoliday />
        </section>

        {/* Explore Destinations */}
        <section className="mt-16 lg:mt-20">
          <SectionHeader
            eyebrow="EXPLORE"
            title="Where do you want to go?"
            description="Discover destinations worth adding to your next trip."
            count={exploreDestinations.length}
            countLabel="destinations"
          />

          <ExploreDestinations destinations={exploreDestinations} />
        </section>

        {/* International */}
        <section className="mt-16 lg:mt-20">
          <SectionHeader
            eyebrow="INTERNATIONAL"
            title="Go beyond borders"
            description="Explore international destinations and discover something new."
            count={internationalDestinations.length}
            countLabel="destinations"
          />

          <Destinations destinations={internationalDestinations} />
        </section>

        {/* Domestic */}
        <section className="mt-16 lg:mt-20">
          <SectionHeader
            eyebrow="INDIA"
            title="Discover India"
            description="From mountains and beaches to culture and adventure."
            count={domesticDestinations.length}
            countLabel="destinations"
          />

          <Destinations destinations={domesticDestinations} />
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Section Header                                                             */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  description,
  count,
  countLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  count?: number;
  countLabel?: string;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
          {eyebrow}
        </p>

        <h2 className="font-(family-name:--font-display) text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
          {description}
        </p>
      </div>

      {typeof count === "number" && (
        <p className="shrink-0 text-xs font-medium text-gray-400">
          {count} {countLabel}
        </p>
      )}
    </div>
  );
}