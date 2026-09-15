import Link from "next/link";
import Image from "next/image";
import { HolidayPackage, formatPrice } from "@/lib/holidays";

export function PackageGrid({
  destinationSlug,
  packages,
  currency,
}: {
  destinationSlug: string;
  packages: HolidayPackage[];
  currency: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {packages.map((p) => (
        <Link
          key={p.slug}
          href={`/holidays/${destinationSlug}/${p.slug}`}
          className="group block rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-44 w-full overflow-hidden bg-gray-100">
            <Image
              src={p.images[0]}
              alt={p.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute top-3 left-3 bg-white/90 text-primary text-[11px] font-semibold px-2.5 py-1 rounded-full">
              {p.duration.nights}N / {p.duration.days}D
            </span>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
            <p className="text-xs text-gray-400 mb-3">
              {p.hotelCategory} stay • {p.groupType.join(", ")}
            </p>

            <div className="flex items-end justify-between">
              <div>
                {p.originalPrice && p.originalPrice > p.price && (
                  <p className="text-xs text-gray-400 line-through">
                    {formatPrice(p.originalPrice, currency)}
                  </p>
                )}
                <p className="text-primary font-bold text-lg">
                  {formatPrice(p.price, currency)}
                  <span className="text-xs text-gray-400 font-normal"> /person</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}