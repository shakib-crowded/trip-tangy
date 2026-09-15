"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination, formatPrice } from "@/lib/holidays";

// ─── Constants ────────────────────────────────────────────────────────────────
const CARD_WIDTH = 290; // px
const GAP = 16; // px - gap-4
const STEP = CARD_WIDTH + GAP;
const SCROLL_AMOUNT = STEP * 2; // move 2 cards per arrow click

// ─── Icons ────────────────────────────────────────────────────────────────────
function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function ArrowRightSmall() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/holidays/${destination.slug}`}
      className="shrink-0 w-65 md:w-72.5 rounded-2xl overflow-hidden
             shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]
             transition-all duration-300 bg-white group block
             hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Image */}
      <div className="relative h-50 md:h-55 w-full overflow-hidden bg-gray-100">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 260px, 290px"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent" />
      </div>

      {/* Card Body */}
      <div className="px-4 pt-3.5 pb-4 flex flex-col gap-2.5">
        <h3
          className="text-[1.05rem] font-bold text-gray-900 tracking-tight leading-snug
                   group-hover:text-primary transition-colors duration-200 line-clamp-1"
        >
          {destination.name}
        </h3>

        {destination.tagline && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
            {destination.tagline}
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Price + Explore */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium block">
              From
            </span>
            <span className="text-gray-900 font-extrabold text-lg leading-tight">
              {formatPrice(destination.startingPrice, destination.currency)}
            </span>
          </div>
          <span
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                   text-xs font-bold text-primary border border-primary/30
                   bg-primary/5 group-hover:bg-primary group-hover:text-white
                   group-hover:border-primary transition-all duration-200"
          >
            Explore
            <ArrowRightSmall />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Destinations({
  destinations,
}: {
  destinations: Destination[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const isResetting = useRef(false);

  // Create tripled array for infinite scroll
  const tripled = useMemo(() => {
    if (destinations.length === 0) return [];
    return [...destinations, ...destinations, ...destinations];
  }, [destinations]);

  

  const setWidth = useMemo(() => {
    return destinations.length * STEP;
  }, [destinations]);

  // Initialize scroll position to the middle set
  useEffect(() => {
    const el = trackRef.current;
    if (!el || setWidth === 0) return;

    isResetting.current = true;
    el.scrollLeft = setWidth;
    requestAnimationFrame(() => {
      isResetting.current = false;
    });
  }, [setWidth]);

  // Seamless infinite-loop correction
  const handleScroll = useCallback(() => {
    if (isResetting.current) return;
    const el = trackRef.current;
    if (!el) return;

    if (el.scrollLeft < setWidth * 0.5) {
      el.scrollLeft += setWidth;
    } else if (el.scrollLeft >= setWidth * 2) {
      el.scrollLeft -= setWidth;
    }
  }, [setWidth]);

  // ── Scroll functions ──
  function scrollLeft() {
    trackRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  }

  function scrollRight() {
    trackRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  }

  // ── Mouse drag (desktop) ──
  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    dragStartX.current = e.pageX - trackRef.current!.offsetLeft;
    dragScrollLeft.current = trackRef.current!.scrollLeft;
    trackRef.current!.style.cursor = "grabbing";
  }

  function onMouseLeave() {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }

  function onMouseUp() {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current!.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    trackRef.current!.scrollLeft = dragScrollLeft.current - walk;
  }

  // ── Touch drag (mobile) ──
  function onTouchStart(e: React.TouchEvent) {
    isDragging.current = true;
    dragStartX.current = e.touches[0].pageX - trackRef.current!.offsetLeft;
    dragScrollLeft.current = trackRef.current!.scrollLeft;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - trackRef.current!.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    trackRef.current!.scrollLeft = dragScrollLeft.current - walk;
  }

  function onTouchEnd() {
    isDragging.current = false;
  }

  if (destinations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No destinations available
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* ── Carousel Wrapper ── */}
      <div className="relative">
        {/* Gradient overlays */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-3 w-14
                          bg-linear-to-r from-white to-transparent z-10"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-3 w-14
                          bg-linear-to-l from-white to-transparent z-10"
        />

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="absolute -left-4 md:-left-5 top-[calc(50%-6px)] -translate-y-1/2 z-20
                       w-9 h-9 flex items-center justify-center rounded-full
                       bg-white border border-gray-200 shadow-md cursor-pointer
                       hover:shadow-lg hover:border-primary hover:text-primary text-gray-500
                       transition-all duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft />
        </button>

        {/* Infinite Scrollable Track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="flex gap-4 overflow-x-auto pb-3 select-none
                       [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
          style={{ cursor: "grab" }}
        >
          {tripled.map((dest, idx) => (
            <PackageCard key={`${dest.slug}-${idx}`} destination={dest} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute -right-4 md:-right-5 top-[calc(50%-6px)] -translate-y-1/2 z-20
                       w-9 h-9 flex items-center justify-center rounded-full
                       bg-white border border-gray-200 shadow-md cursor-pointer
                       hover:shadow-lg hover:border-primary hover:text-primary text-gray-500
                       transition-all duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
