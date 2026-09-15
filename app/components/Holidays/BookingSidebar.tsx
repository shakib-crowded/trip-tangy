"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/holidays";
import { BookingModal } from "./BookingModal";
import type { HolidayPackage, Destination } from "@/lib/holidays"; // adjust to your actual types

interface BookingSidebarProps {
  pkg: HolidayPackage;
  destination: Destination;
  discount: number;
}

export function BookingSidebar({
  pkg,
  destination,
  discount,
}: BookingSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <aside className="lg:col-span-1">
        <div className="sticky top-24 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-100 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Package price
            </p>

            <div className="mt-2 flex items-end gap-2">
              <p className="text-3xl font-bold text-gray-900">
                {formatPrice(pkg.price, pkg.currency)}
              </p>

              <span className="pb-1 text-xs text-gray-500">per person</span>
            </div>

            {pkg.originalPrice && pkg.originalPrice > pkg.price && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(pkg.originalPrice, pkg.currency)}
                </span>

                <span className="text-xs font-semibold text-green-600">
                  Save {discount}%
                </span>
              </div>
            )}

            <p className="mt-3 text-xs leading-5 text-gray-500">
              Final pricing may vary depending on travel dates, room selection
              and availability.
            </p>
          </div>

          {/* Package Facts */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-900">
              Package includes
            </h3>

            <div className="mt-4 divide-y divide-gray-100 border-y border-gray-100">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">Duration</span>
                <span className="text-sm font-medium text-gray-900">
                  {pkg.duration.nights}N / {pkg.duration.days}D
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">Hotel</span>
                <span className="text-right text-sm font-medium text-gray-900">
                  {pkg.hotelCategory}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-500">Suitable for</span>
                <span className="text-right text-sm font-medium text-gray-900">
                  {pkg.groupType.join(", ")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full rounded-lg bg-secondary px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Request a Quote
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-gray-500">
              Share your travel dates and requirements. Our travel expert will
              get back to you with the best available option.
            </p>
          </div>

          {/* Trust Information */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
            <div className="grid grid-cols-3 divide-x divide-gray-200 text-center">
              <div className="px-2">
                <p className="text-xs font-semibold text-gray-800">Secure</p>
                <p className="mt-0.5 text-[11px] text-gray-500">Enquiry</p>
              </div>

              <div className="px-2">
                <p className="text-xs font-semibold text-gray-800">Expert</p>
                <p className="mt-0.5 text-[11px] text-gray-500">Assistance</p>
              </div>

              <div className="px-2">
                <p className="text-xs font-semibold text-gray-800">Flexible</p>
                <p className="mt-0.5 text-[11px] text-gray-500">Options</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        destination={destination.name}
        packageTitle={pkg.title}
      />
    </>
  );
}
