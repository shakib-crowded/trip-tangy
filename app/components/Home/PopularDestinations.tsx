"use client";

import { useState } from "react";
import Image from "next/image";
import BookingModal from "./BookingModal";

export interface Destination {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Dubai",
    price: "1,20,00",
    imageUrl:
      "/images/popular_destinations/dubai.webp",
  },
  {
    id: 2,
    name: "Kyoto",
    price: "1,50,000",
    imageUrl:
      "/images/popular_destinations/kyoto.webp",
  },
  {
    id: 3,
    name: "Amalfi Coast",
    price: "1,70,000",
    imageUrl:
      "/images/popular_destinations/amalfi_coast.webp",
  },
  {
    id: 4,
    name: "Bali",
    price: "75,000",
    imageUrl:
      "/images/popular_destinations/bali.webp",
  },
  {
    id: 5, 
    name: "Singapore", 
    price: "80,000",
    imageUrl: "/images/popular_destinations/singapore.webp"
  },
  {
    id: 6, 
    name: "Vietnam", 
    price: "60,000",
    imageUrl: "/images/popular_destinations/vietnam.webp"
  },
  {
    id: 7, 
    name: "Zurich", 
    price: "2,10,000",
    imageUrl: "/images/popular_destinations/zurich.webp"
  }
];

const HeroCard = ({
  dest,
  onBookNow,
}: {
  dest: Destination;
  onBookNow: (dest: Destination) => void;
}) => (
  <div className="relative h-full min-h-130 overflow-hidden rounded-2xl group cursor-pointer">
    {/* Background image */}
    <Image
      src={dest.imageUrl}
      alt={dest.name}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      fill
      sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"

    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/30 to-transparent" />

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-7">
      <h3 className="font-playfair text-4xl font-bold text-white leading-tight mb-1 ">
        {dest.name}
      </h3>

      <div className="mt-4 flex items-end justify-between">
        <div className="text-right">
          <p className="text-white/50 text-xs mb-0.5">Starting From</p>
          <p className="text-white text-2xl font-bold">
            ₹{dest.price}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onBookNow(dest)}
        className="mt-5 w-full rounded-xl bg-secondary py-3 text-sm font-semibold text-white tracking-wide hover:bg-[#e47a00] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#C9954C]/30 cursor-pointer"
      >
        Book Now
      </button>
    </div>
  </div>
);

const SmallCard = ({
  dest,
  onBookNow,
}: {
  dest: Destination;
  onBookNow: (dest: Destination) => void;
}) => (
  <div className="relative overflow-hidden rounded-2xl group cursor-pointer h-57.5">
    {/* Background image */}
    <Image
      src={dest.imageUrl}
      alt={dest.name}
      className="absolute object-cover inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110"
      fill
      sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
    />

    {/* Gradient */}
    <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/20 to-transparent" />

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <h3 className="font-playfair text-xl font-bold text-white leading-tight mb-2">
        {dest.name}
      </h3>


      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white text-base font-bold">
            ₹{dest.price}
          </span>
          <button
            type="button"
            onClick={() => onBookNow(dest)}
            className="rounded-lg bg-secondary px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#e47a00] active:scale-95 transition-all duration-200 shadow-md shadow-[#C9954C]/30 whitespace-nowrap cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function PopularDestinations() {
  const [hero, ...rest] = destinations;
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  return (
    <>
      <section className="bg-[#F7F4EF] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Popular Destinations
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most-loved destinations and discover unforgettable
              travel experiences around the world.
            </p>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 lg:gap-5">
            {/* Hero card — left column, full height */}
            <div className="lg:row-span-2">
              <HeroCard dest={hero} onBookNow={setSelectedDestination} />
            </div>

            {/* 4 small cards — right column, 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {rest.map((dest) => (
                <SmallCard key={dest.id} dest={dest} onBookNow={setSelectedDestination} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookingModal destination={selectedDestination} onClose={() => setSelectedDestination(null)} />
    </>
  );
}