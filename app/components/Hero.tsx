"use client";

import { useEffect, useState } from "react";
import { TabKey, Tab } from "./types";
import { FlightSearch } from "./Flights/Hero/FlightSearch";
import { HotelSearch } from "./Hotels/Hero/HotelSearch";
import { HolidaysSearch } from "./Holidays/Hero/HolidaysSearch";

import { usePathname, useRouter } from "next/navigation";

const TABS: Tab[] = [
  { key: "flight", label: "Flights" },
  { key: "hotel", label: "Hotels" },
  { key: "holidays", label: "Holidays" },
];

export const Hero = () => {

  const pathname = usePathname(); 
  const router = useRouter(); 
  
  const handleTabChange = (tab: TabKey)=>{
    setActiveTab(tab);

    switch (tab) {
      case "hotel":
        router.push("/hotels");
        break;
      case "holidays": 
        router.push("/holidays");
        break;  
    
      default:
        router.push("/");
    }
  }

  const [activeTab, setActiveTab] = useState<TabKey>("flight");

  useEffect(() => {
    if (pathname === "/hotels") {
      setActiveTab("hotel");
    } else if (pathname === "/holidays") {
      setActiveTab("holidays");
    } else {
      setActiveTab("flight");
    }
  }, [pathname]);


  return (
    <section style={{
      position: "relative", minHeight: "100vh", overflowX: "hidden", color: "#fff",
    }}>
      <video autoPlay loop muted playsInline poster="/images/hero-poster.jpg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.28) 40%, rgba(10,42,107,0.82) 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto",
        padding: "120px clamp(16px,4vw,40px) 60px", minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "start", boxSizing: "border-box",
      }}>
        <div style={{
          background: "#0A2A6B", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
          padding: "clamp(16px,3vw,28px) clamp(14px,3vw,28px)", boxSizing: "border-box",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}>
          {/* Tab bar */}
          <div role="tablist" aria-label="Search type"
            style={{
              display: "flex", gap: 4, marginBottom: 20, background: "rgba(0,0,0,0.22)",
              borderRadius: 12, padding: 4, width: "fit-content", maxWidth: "100%",
            }}>
            {TABS.map((t) => (
              <button key={t.key} type="button" role="tab"
                aria-selected={activeTab === t.key} aria-controls={`panel-${t.key}`}
                onClick={() => handleTabChange(t.key)}
                style={{
                  padding: "8px 18px", borderRadius: 9, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, transition: "all 0.18s",
                  background: activeTab === t.key ? "#fff" : "transparent",
                  color: activeTab === t.key ? "#0a2a6b" : "rgba(255,255,255,0.65)",
                  boxShadow: activeTab === t.key ? "0 2px 8px rgba(0,0,0,0.18)" : "none",
                  whiteSpace: "nowrap", fontFamily: "inherit",
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <div id="panel-flight" role="tabpanel" hidden={activeTab !== "flight"}>
            {activeTab === "flight" && <FlightSearch />}
          </div>
          <div id="panel-hotel" role="tabpanel" hidden={activeTab !== "hotel"}>
            {activeTab === "hotel" && <HotelSearch />}
          </div>
          <div id="panel-holidays" role="tabpanel" hidden={activeTab !== "holidays"}>
            {activeTab === "holidays" && <HolidaysSearch />}
          </div>
        </div>
      </div>
    </section>
  );
};