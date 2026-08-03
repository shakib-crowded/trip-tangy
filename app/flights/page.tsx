// app/flights/page.tsx
"use client";

import FlightsWithTT from "../components/Flights/FlightsWithTT";
import VideoContent from "../components/Flights/VideoContent";
import { Hero } from "../components/Hero";

export default function FlightsPage() {
  return (
    <>
      <Hero />
      <VideoContent/>
      <FlightsWithTT />
    </>
  );
}
