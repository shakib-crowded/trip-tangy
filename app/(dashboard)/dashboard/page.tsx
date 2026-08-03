"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Plane, Hotel, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Booking {
  _id: string;
  type: "flight" | "hotel" | "holiday";
  title: string;
  destination: string;
  startDate: string;
  status: "upcoming" | "completed" | "cancelled";
  amount: number;
}

const TYPE_ICON = { flight: Plane, hotel: Hotel, holiday: Briefcase };

export default function DashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings || []))
      .finally(() => setIsLoading(false));
  }, []);

  const upcoming = bookings.filter((b) => b.status === "upcoming");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Welcome back, {user?.name.split(" ")[0]}</h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening with your trips.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-3xl font-bold text-primary mt-1">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Upcoming Trips</p>
          <p className="text-3xl font-bold text-primary mt-1">{upcoming.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500">Completed Trips</p>
          <p className="text-3xl font-bold text-primary mt-1">
            {bookings.filter((b) => b.status === "completed").length}
          </p>
        </div>
      </div>

      {/* Upcoming trips */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-primary">Upcoming Trips</h2>
          <Link href="/bookings" className="text-sm text-secondary font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : upcoming.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-sm mb-3">No upcoming trips yet.</p>
            <Link
              href="/holidays"
              className="inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-secondary transition"
            >
              Explore Packages
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {upcoming.slice(0, 3).map((booking) => {
              const Icon = TYPE_ICON[booking.type];
              return (
                <li key={booking._id} className="flex items-center gap-4 py-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 truncate">{booking.title}</p>
                    <p className="text-xs text-gray-500">{booking.destination}</p>
                  </div>
                  <p className="text-sm text-gray-500 shrink-0">
                    {new Date(booking.startDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}