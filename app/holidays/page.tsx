"use client";

import { useEffect, useRef, useState } from "react";
import { Hero } from "../components/Hero";
import { HolidayCard } from "@/app/components/Holidays/HolidayCard";
import { FeaturedHoliday } from "@/app/components/Holidays/FeaturedHoliday";
import { BookingModal } from "@/app/components/Holidays/BookingModal";
import { Destination } from "@/app/components/Holidays/types";

const destinations: Destination[] = [
  {
    id: 1,
    name: "Bali Escape",
    country: "Indonesia",
    price: 54999,
    duration: "7 Days, 6 Nights",
    rating: "4.9",
    reviews: "2.4k",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
  {
    id: 2,
    name: "Maldives Retreat",
    country: "Maldives",
    price: 155000,
    duration: "6 Days, 5 Nights",
    rating: "5.0",
    reviews: "1.1k",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
  },
  {
    id: 3,
    name: "Kyoto in Bloom",
    country: "Japan",
    price: 89999,
    duration: "9 Days, 8 Nights",
    rating: "4.8",
    reviews: "980",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
  },
  {
    id: 4,
    name: "Amalfi Coast Drive",
    country: "Italy",
    price: 170000,
    duration: "8 Days, 7 Nights",
    rating: "4.8",
    reviews: "1.8k",
    image:
      "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=800&q=80",
  },
  {
    id: 5,
    name: "Swiss Alps Family",
    country: "Switzerland",
    price: 45000,
    duration: "8 Days, 7 Nights",
    rating: "4.9",
    reviews: "890",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
  },
  {
    id: 6,
    name: "Phuket Shores",
    country: "Thailand",
    price: 42999,
    duration: "6 Days, 5 Nights",
    rating: "4.7",
    reviews: "4.1k",
    image:
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80",
  },
  {
    id: 7,
    name: "Santorini Sunset",
    country: "Greece",
    price: 135000,
    duration: "6 Days, 5 Nights",
    rating: "4.9",
    reviews: "1.5k",
    image:
      "https://images.unsplash.com/photo-1539288541332-0efaa4749f34?w=1548&q=80",
  },
  {
    id: 8,
    name: "Dubai Desert Dreams",
    country: "UAE",
    price: 98000,
    duration: "5 Days, 4 Nights",
    rating: "4.7",
    reviews: "3.2k",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
  },
  {
    id: 9,
    name: "Singapore Cityscape",
    country: "Singapore",
    price: 87000,
    duration: "5 Days, 4 Nights",
    rating: "4.8",
    reviews: "2.1k",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
  },
  {
    id: 10,
    name: "Kerala Backwaters",
    country: "India",
    price: 32999,
    duration: "5 Days, 4 Nights",
    rating: "4.8",
    reviews: "1.9k",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
  },
  {
    id: 11,
    name: "Goa Beach Bliss",
    country: "India",
    price: 24999,
    duration: "4 Days, 3 Nights",
    rating: "4.6",
    reviews: "5.3k",
    image:
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=1740&q=80",
  },
  {
    id: 12,
    name: "Paris Romance",
    country: "France",
    price: 145000,
    duration: "7 Days, 6 Nights",
    rating: "4.8",
    reviews: "2.7k",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  },
  {
    id: 13,
    name: "London Calling",
    country: "United Kingdom",
    price: 132000,
    duration: "6 Days, 5 Nights",
    rating: "4.7",
    reviews: "1.4k",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
  {
    id: 14,
    name: "New York City Lights",
    country: "USA",
    price: 168000,
    duration: "7 Days, 6 Nights",
    rating: "4.8",
    reviews: "2.0k",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
  },
  {
    id: 15,
    name: "Sydney Harbour",
    country: "Australia",
    price: 175000,
    duration: "8 Days, 7 Nights",
    rating: "4.9",
    reviews: "1.2k",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
  },
  {
    id: 16,
    name: "Cape Town Adventure",
    country: "South Africa",
    price: 112000,
    duration: "7 Days, 6 Nights",
    rating: "4.7",
    reviews: "860",
    image:
      "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?w=800&q=80",
  },
  {
    id: 17,
    name: "Rajasthan Royal Trail",
    country: "India",
    price: 58000,
    duration: "8 Days, 7 Nights",
    rating: "4.9",
    reviews: "1.6k",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
  },
  {
    id: 18,
    name: "Vietnam Discovery",
    country: "Vietnam",
    price: 67000,
    duration: "7 Days, 6 Nights",
    rating: "4.7",
    reviews: "1.1k",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
  },
  {
    id: 19,
    name: "Iceland Northern Lights",
    country: "Iceland",
    price: 198000,
    duration: "6 Days, 5 Nights",
    rating: "5.0",
    reviews: "720",
    image:
      "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&q=80",
  },
  {
    id: 20,
    name: "Machu Picchu Trek",
    country: "Peru",
    price: 215000,
    duration: "9 Days, 8 Nights",
    rating: "4.9",
    reviews: "540",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
  },
];

function getColumnsForWidth(width: number): number {
  if (width >= 1280) return 4; // xl
  if (width >= 1024) return 3; // lg
  if (width >= 640) return 2; // sm
  return 1;
}

const BASE_ROWS = 2; // rows visible before any "Explore More" clicks
const ROWS_PER_CLICK = 2; // additional rows revealed per click

export default function HolidaysPage() {
  const [revealedRows, setRevealedRows] = useState(BASE_ROWS);
  const [columns, setColumns] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateColumns() {
      setColumns(getColumnsForWidth(window.innerWidth));
    }
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const rowLimit = revealedRows * columns;
  const visibleDestinations = destinations.slice(0, Math.min(rowLimit, destinations.length));
  const hasMore = rowLimit < destinations.length;
  const isFullyExpanded = !hasMore && revealedRows > BASE_ROWS;

  function handleBookNow(destination: Destination) {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleExploreMore() {
    setRevealedRows((prev) => prev + ROWS_PER_CLICK);
  }

  function handleShowLess() {
    setRevealedRows(BASE_ROWS);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-primary mt-2 mb-3">
            Holidays
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            From sun-soaked islands to mountain kingdoms — every package is
            hand-picked and fully supported by our travel experts.
          </p>
        </div>

        {/* Featured destination */}
        <FeaturedHoliday />

        {/* Card grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {visibleDestinations.map((destination) => (
            <HolidayCard
              key={destination.id}
              destination={destination}
              onBookNow={handleBookNow}
            />
          ))}
        </div>

        {/* Explore more (incremental) / show less */}
        {(hasMore || isFullyExpanded) && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={hasMore ? handleExploreMore : handleShowLess}
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors text-sm"
            >
              {hasMore ? "Explore More Destinations" : "Show Less"}
            </button>
          </div>
        )}
      </div>

      <BookingModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}