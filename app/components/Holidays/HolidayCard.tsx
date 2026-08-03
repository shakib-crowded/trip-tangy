"use client";

import { Destination } from "./types";

interface HolidayCardProps {
  destination: Destination;
  onBookNow: (destination: Destination) => void;
}

export function HolidayCard({ destination, onBookNow }: HolidayCardProps) {
  const { name, country, price, duration, rating, reviews, image } = destination;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold text-gray-800 shadow">
          <span className="text-amber-500">★</span>
          {rating}
          <span className="text-gray-400 font-normal">({reviews})</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-900 leading-tight">{name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{country}</p>

        <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {duration}
        </div>

        <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-100">
          <div>
            <p className="text-[11px] text-gray-400 leading-none">Starting from</p>
            <p className="text-lg font-extrabold text-gray-900 leading-tight">
              ₹{price.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onBookNow(destination)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}