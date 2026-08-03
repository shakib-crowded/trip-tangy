"use client";

import Image from "next/image";
import { useState } from "react";

interface FeaturedDestination {
  id: number;
  name: string;
  description: string;
  image: string;
}

export function FeaturedHoliday() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredDestinations: FeaturedDestination[] = [
    {
      id: 1,
      name: "Santorini, Greece",
      description:
        "Whitewashed cliffs, volcanic beaches, and sunsets that stop time. A classic for a reason.",
      image: "/images/featured_destinations/santorini_greece.webp",
    },
    {
      id: 2,
      name: "Bali, Indonesia",
      description:
        "Emerald rice terraces, ancient temples, and vibrant culture. Where paradise meets adventure.",
      image: "/images/featured_destinations/bali_indonesia.webp",
    },
    {
      id: 3,
      name: "Swiss Alps, Switzerland",
      description:
        "Snow-capped peaks, crystal-clear lakes, and charming villages. A winter wonderland awaits.",
      image: "/images/featured_destinations/swiss_alps_switzerland.webp",
    },
    {
      id: 4,
      name: "Maldives",
      description:
        "Overwater bungalows, turquoise lagoons, and underwater wonders. Pure tropical bliss.",
      image: "/images/featured_destinations/maldives.webp",
    },
    {
      id: 5,
      name: "Kyoto, Japan",
      description:
        "Cherry blossoms, ancient temples, and traditional tea ceremonies. Where tradition meets tranquility.",
      image: "/images/featured_destinations/kyoto_japan.webp",
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredDestinations.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredDestinations.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentDestination = featuredDestinations[currentIndex];

  return (
    <section className="mb-16 relative">
      <div className="relative overflow-hidden rounded-3xl h-105 md:h-130">
        {/* Background Image */}
        <Image
          src={currentDestination.image}
          alt={currentDestination.name}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-black/20" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-end">
          <div className="max-w-2xl p-8 md:p-12">
            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              {currentDestination.name}
            </h2>

            {/* Description */}
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {currentDestination.description}
            </p>
          </div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {featuredDestinations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to destination ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-all cursor-pointer"
        aria-label="Previous destination"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 transition-all cursor-pointer"
        aria-label="Next destination"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
}
