// app/admin/dashboard/page.tsx
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CirclePause,
  PlusCircle,
  Users,
} from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Hotel from "@/models/Hotel";
import User from "@/models/User";

export default async function AdminDashboardPage() {
  await connectDB();
  const [activeHotels, pausedHotels, guests] = await Promise.all([
    Hotel.countDocuments({ isActive: true }),
    Hotel.countDocuments({ isActive: false }),
    User.countDocuments({ isAdmin: false }),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#123c81] to-[#176b78] px-6 py-8 text-white shadow-lg shadow-primary/10 sm:px-9 sm:py-10">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
            Your property workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome to stay management
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
            Keep your hotel listings polished, accurate, and ready for guests
            to discover.
          </p>
          <Link
            href="/admin/dashboard/hotels/new"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-orange-50"
          >
            <PlusCircle className="h-4 w-4" />
            Add a property
          </Link>
        </div>
        <Building2
          aria-hidden="true"
          className="absolute -bottom-12 -right-5 h-56 w-56 text-white/10 sm:right-8 sm:h-64 sm:w-64"
          strokeWidth={1}
        />
      </section>

      <section
        aria-label="Property overview"
        className="mb-8 grid gap-4 sm:grid-cols-3"
      >
        {[
          {
            label: "Live properties",
            value: activeHotels,
            icon: CheckCircle2,
            color: "text-emerald-700 bg-emerald-50",
          },
          {
            label: "Paused listings",
            value: pausedHotels,
            icon: CirclePause,
            color: "text-amber-700 bg-amber-50",
          },
          {
            label: "Registered guests",
            value: guests,
            icon: Users,
            color: "text-primary bg-primary/5",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-primary">
              {value.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </section>

      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-primary">Quick actions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage the details guests see before they book.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/dashboard/hotels/new"
          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-secondary">
            <PlusCircle className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-primary">Add a hotel</p>
            <p className="mt-1 text-sm text-primary/50">
              Create a new hotel listing with rooms, pricing, and photos.
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-secondary" />
        </Link>

        <Link
          href="/admin/dashboard/hotels"
          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
            <Building2 className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-primary">Manage properties</p>
            <p className="mt-1 text-sm text-primary/50">
              Review availability, pricing, and listing details.
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-secondary" />
        </Link>
      </div>
    </div>
  );
}
