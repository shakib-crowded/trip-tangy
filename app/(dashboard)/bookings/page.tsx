"use client";

import { useEffect, useState } from "react";
import { Plane, Hotel, Briefcase, MapPin } from "lucide-react";

interface Booking {
  _id: string;
  type: "flight" | "hotel" | "holiday";
  title: string;
  destination: string;
  startDate: string;
  endDate?: string;
  status: "upcoming" | "completed" | "cancelled";
  amount: number;
  bookingRef: string;
}

const TYPE_ICON = { flight: Plane, hotel: Hotel, holiday: Briefcase };
const STATUS_STYLE = {
  upcoming: "bg-blue-50 text-blue-600",
  completed: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-600",
};

type Filter = "all" | "upcoming" | "completed" | "cancelled";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings || []))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-primary">My Bookings</h1>
        <div className="flex gap-1.5 bg-white rounded-full border border-gray-200 p-1">
          {(["all", "upcoming", "completed", "cancelled"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition cursor-pointer ${
                filter === f ? "bg-primary text-white" : "text-gray-500 hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading bookings...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray-500 text-sm">No bookings found for this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => {
            const Icon = TYPE_ICON[booking.type];
            return (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <Icon className="h-6 w-6" />
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-800">{booking.title}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_STYLE[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5" /> {booking.destination}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Ref: {booking.bookingRef}</p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <p className="text-sm text-gray-500">
                    {new Date(booking.startDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="font-semibold text-primary mt-0.5">₹{booking.amount.toLocaleString("en-IN")}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}