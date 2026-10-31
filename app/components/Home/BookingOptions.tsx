import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BookingOptions() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:py-18">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        <Link
          href="/hotels"
          className="group flex items-center justify-between gap-5 rounded-2xl border border-gray-100 bg-[#fbfaf8] p-6 transition hover:border-primary/20 hover:shadow-lg sm:p-8"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              Find a place to stay
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
              Make yourself at home.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Browse stays for a quick city break, a family holiday, or
              somewhere new to wake up.
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm transition group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </Link>

        <Link
          href="/holidays"
          className="group flex items-center justify-between gap-5 rounded-2xl border border-gray-100 bg-[#fbfaf8] p-6 transition hover:border-primary/20 hover:shadow-lg sm:p-8"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              Explore holiday packages
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
              Go a little further.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Find destination ideas, package details, and itineraries for your
              next escape.
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm transition group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
