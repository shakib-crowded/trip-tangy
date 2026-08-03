"use client";

import { Hero } from "../components/Hero";
import HotelsWithTT from "../components/Hotels/HotelsWithTT";
import VideoContent from "../components/Hotels/VideoContent";

export default function HotelsPage() {
  return (
    <>
      <Hero />
      <VideoContent/>
      <HotelsWithTT />
    </>
  );
}
