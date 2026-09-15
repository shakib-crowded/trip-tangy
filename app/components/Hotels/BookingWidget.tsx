"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, BedDouble, UserPlus } from "lucide-react";
import { formatINR, nightsBetween } from "@/lib/format";

interface RoomOption {
  _id: string;
  roomType: string;
  description?: string;
  maxOccupancy: number;
  maxAdults: number;
  maxChildren: number;
  basePrice: number;
  totalRooms: number;
  amenities: string[];
}

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function tomorrowISO() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

export default function BookingWidget({
  hotelId,
  hotelSlug,
  rooms,
}: {
  hotelId: string;
  hotelSlug: string;
  rooms: RoomOption[];
}) {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState(todayISO());
  const [checkOut, setCheckOut] = useState(tomorrowISO());
  const [guests, setGuests] = useState<GuestCounts>({
    adults: 2,
    children: 0,
    infants: 0,
  });
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const nights = nightsBetween(checkIn, checkOut);
  const totalGuests = guests.adults + guests.children + guests.infants;

  const handleBook = (room: RoomOption) => {
    const params = new URLSearchParams({
      hotelId,
      roomId: room._id,
      checkIn,
      checkOut,
      adults: String(guests.adults),
      children: String(guests.children),
      infants: String(guests.infants),
      totalGuests: String(totalGuests),
    });

    router.push(`/hotels/${hotelSlug}/book?${params.toString()}`);
  };

  const updateGuestCount = (type: keyof GuestCounts, change: number) => {
    setGuests((prev) => {
      const newValue = Math.max(0, prev[type] + change);
      
      // Find the maximum occupancy for the selected room (if any)
      const maxOccupancy = rooms.length > 0 ? Math.max(...rooms.map(r => r.maxOccupancy)) : 10;
      const maxAdults = rooms.length > 0 ? Math.max(...rooms.map(r => r.maxAdults)) : 4;
      const maxChildren = rooms.length > 0 ? Math.max(...rooms.map(r => r.maxChildren)) : 2;

      const newTotal = prev.adults + prev.children + prev.infants + 
        (type === 'adults' ? change : 0) +
        (type === 'children' ? change : 0) +
        (type === 'infants' ? change : 0);

      // Validation
      if (type === 'adults' && newValue > maxAdults) return prev;
      if (type === 'children' && newValue > maxChildren) return prev;
      if (newTotal > maxOccupancy) return prev;
      if (type === 'adults' && newValue === 0 && prev.children > 0) return prev; // Must have at least 1 adult if children exist
      if (type === 'adults' && newValue === 0 && prev.infants > 0) return prev; // Must have at least 1 adult if infants exist

      return {
        ...prev,
        [type]: newValue,
      };
    });
  };

  return (
    <div className="sticky top-24">
      {/* Search / stay details */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Choose your stay
        </h2>

        {/* Dates */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              min={todayISO()}
              onChange={(e) => {
                const value = e.target.value;
                setCheckIn(value);
                if (value >= checkOut) {
                  const next = new Date(value);
                  next.setDate(next.getDate() + 1);
                  setCheckOut(next.toISOString().slice(0, 10));
                }
              }}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-secondary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-secondary"
            />
          </div>
        </div>

        {/* Guests with Dropdown */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3.5 py-3 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
                {guests.adults > 0 && ` (${guests.adults} adult${guests.adults !== 1 ? "s" : ""}`}
                {guests.children > 0 && `, ${guests.children} child${guests.children !== 1 ? "ren" : ""}`}
                {guests.infants > 0 && `, ${guests.infants} infant${guests.infants !== 1 ? "s" : ""}`}
                {totalGuests > 0 && ")"}
              </span>
            </div>
            <UserPlus className="h-4 w-4 text-gray-400" />
          </button>

          {/* Guest Dropdown */}
          {showGuestDropdown && (
            <div className="mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Adults</p>
                    <p className="text-xs text-gray-500">Ages 18+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateGuestCount('adults', -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-gray-900">
                      {guests.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateGuestCount('adults', 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Children</p>
                    <p className="text-xs text-gray-500">Ages 1-17</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateGuestCount('children', -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-gray-900">
                      {guests.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateGuestCount('children', 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Infants</p>
                    <p className="text-xs text-gray-500">Under 1 year</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateGuestCount('infants', -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-gray-900">
                      {guests.infants}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateGuestCount('infants', 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 text-center text-xs text-gray-400">
          {nights} night{nights !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Rooms */}
      <div className="mt-5">
        <h3 className="mb-3 text-base font-semibold text-gray-900">
          Select a room
        </h3>

        <div className="space-y-3">
          {rooms.map((room) => {
            const isAvailable = room.totalRooms > 0;
            const canAccommodate = totalGuests <= room.maxOccupancy && 
                                   guests.adults <= room.maxAdults && 
                                   guests.children <= room.maxChildren;


            return (
              <div
                key={room._id}
                className={`rounded-xl border border-gray-200 bg-white p-4 transition ${
                  isAvailable && canAccommodate 
                    ? "hover:border-gray-300 hover:shadow-sm" 
                    : "opacity-60"
                }`}
              >
                {/* Room title */}
                <div className="flex items-start gap-3">
                  <BedDouble className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900">
                      {room.roomType}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Up to {room.maxOccupancy} guest{room.maxOccupancy !== 1 ? "s" : ""}
                      {room.maxAdults && ` · ${room.maxAdults} adults max`}
                      {room.maxChildren && ` · ${room.maxChildren} children max`}
                    </p>
                  </div>
                </div>

                {/* Room description */}
                {room.description && (
                  <p className="mt-3 line-clamp-2 text-sm leading-5 text-gray-500">
                    {room.description}
                  </p>
                )}

                {/* Room amenities */}
                {room.amenities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {room.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="text-xs text-gray-500">
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price */}
                <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-xs text-gray-400">From</p>
                    <p className="mt-0.5 text-lg font-bold text-gray-900">
                      {formatINR(room.basePrice)}
                      <span className="ml-1 text-xs font-normal text-gray-400">
                        / night
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {formatINR(room.basePrice * nights)} total
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBook(room)}
                    disabled={!isAvailable || !canAccommodate}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${
                      isAvailable && canAccommodate
                        ? "bg-primary hover:bg-secondary"
                        : "cursor-not-allowed bg-gray-300"
                    }`}
                  >
                    {!isAvailable 
                      ? "Sold out" 
                      : !canAccommodate 
                      ? "Not available for this group" 
                      : "Book now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}