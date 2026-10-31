import { ArrowRight, MapPinned } from "lucide-react";
import Link from "next/link";

export default function ContactCta() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 lg:py-18">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-primary px-6 py-9 text-white sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14 lg:py-12">
        <div className="flex items-start gap-4">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 sm:flex">
            <MapPinned className="h-6 w-6 text-secondary" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Let&apos;s get you going
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Your next story starts somewhere.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
              Explore the collection or tell us what kind of trip you have in
              mind.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/holidays"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-secondary px-5 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Explore holidays{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
