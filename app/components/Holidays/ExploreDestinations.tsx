import Link from "next/link";
import Image from "next/image";
import { Destination, formatPrice } from "@/lib/holidays";

export function ExploreDestinations({ destinations }: { destinations: Destination[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((d) => (
        <Link
          key={d.slug}
          href={`/holidays/${d.slug}`}
          className="group block rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48 w-full overflow-hidden bg-gray-100">
            <Image
              src={d.heroImage}
              alt={d.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4">
              <h3 className="text-white font-bold text-lg drop-shadow-sm">{d.name}</h3>
              <p className="text-white/85 text-xs">{d.tagline}</p>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">
                Starting from
              </p>
              <p className="text-primary font-bold text-lg">
                {formatPrice(d.startingPrice, d.currency)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
