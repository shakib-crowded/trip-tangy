import Hero from "../components/Holidays/Hero";
import { FeaturedHoliday } from "@/app/components/Holidays/FeaturedHoliday";
import { ExploreDestinations } from "@/app/components/Holidays/ExploreDestinations";
import { getAllDestinations } from "@/lib/holidays";
import { Destinations } from "../components/Holidays/Destinations";

export default function HolidaysPage() {
  const exploreDestinations = getAllDestinations().filter(
    (d) => d.explore === true,
  );
  const domesticDestinations = getAllDestinations().filter(
    (d) => d.country === "India",
  );
  const internationalDestinations = getAllDestinations().filter(
    (d) => d.country !== "India",
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-primary mt-2 mb-3">
            Holidays
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            From sun-soaked islands to mountain kingdoms — every package is
            hand-picked and fully supported by our travel experts.
          </p>
        </div>

        <FeaturedHoliday />

        <div className="mt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Explore Destinations
            </h2>
            <p className="text-xs text-gray-400">
              {exploreDestinations.length} destinations
            </p>
          </div>
          <ExploreDestinations destinations={exploreDestinations} />
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              International Destinations
            </h2>
            <p className="text-xs text-gray-400">
              {internationalDestinations.length} destinations
            </p>
          </div>
          <Destinations destinations={internationalDestinations} />
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Domestic Destinations
            </h2>
            <p className="text-xs text-gray-400">
              {domesticDestinations.length} destinations
            </p>
          </div>
          <Destinations destinations={domesticDestinations} />
        </div>
      </div>
    </div>
  );
}
