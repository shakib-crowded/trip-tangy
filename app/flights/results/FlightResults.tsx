"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  AirportField,
  AirportRecord,
} from "@/app/components/Flights/Hero/AirportField";
import { DatePicker } from "@/app/components/Flights/Hero/DatePicker";
import { PaxCabinPanel } from "@/app/components/Flights/Hero/PaxCabinPanel";
import { useAirports } from "@/app/components/Flights/hooks/useAirports";
import { useIsMobile } from "@/app/components/Flights/hooks/useIsMobile";
import { useOutsideClick } from "@/app/components/Flights/hooks/useOutsideClick";
import { S } from "@/app/components/Flights/Hero/styles";
import { useSearchParams, useRouter } from "next/navigation";
import { CabinClass } from "@/app/components/types";
import { BookingModal } from "@/app/components/Flights/BookingModel";

const LOADING_DURATION_MS = 2600;

type TripType = "one-way" | "round-trip";
interface PaxState {
  adults: number;
  children: number;
  infants: number;
}

const CABIN_OPTIONS: { value: CabinClass; label: string }[] = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First Class" },
];

const TODAY_STR = (() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();

// ─── Demo Flight Data ──────────────────────────────────────────────────────

interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopInfo?: string;
  price: number;
  currency: string;
  cabin: CabinClass;
  availableSeats: number;
  date: string;
  departureDate: string;
  returnDate?: string;
}

const DEMO_FLIGHTS: Flight[] = [
  {
    id: "FL001",
    airline: "Delta Air Lines",
    airlineLogo: "DL",
    flightNumber: "DL452",
    origin: "New York",
    originCode: "JFK",
    destination: "Los Angeles",
    destinationCode: "LAX",
    departureTime: "08:30",
    arrivalTime: "11:45",
    duration: "6h 15m",
    stops: 0,
    price: 449,
    currency: "USD",
    cabin: "economy",
    availableSeats: 12,
    date: "2026-07-28",
    departureDate: "2026-07-28",
  },
  {
    id: "FL002",
    airline: "American Airlines",
    airlineLogo: "AA",
    flightNumber: "AA789",
    origin: "New York",
    originCode: "JFK",
    destination: "Los Angeles",
    destinationCode: "LAX",
    departureTime: "10:15",
    arrivalTime: "13:30",
    duration: "6h 15m",
    stops: 0,
    price: 398,
    currency: "USD",
    cabin: "economy",
    availableSeats: 8,
    date: "2026-07-20",
    departureDate: "2026-07-20",
  },
  {
    id: "FL003",
    airline: "United Airlines",
    airlineLogo: "UA",
    flightNumber: "UA123",
    origin: "New York",
    originCode: "EWR",
    destination: "Los Angeles",
    destinationCode: "LAX",
    departureTime: "14:20",
    arrivalTime: "17:35",
    duration: "6h 15m",
    stops: 1,
    stopInfo: "1 stop in Chicago",
    price: 279,
    currency: "USD",
    cabin: "economy",
    availableSeats: 24,
    date: "2026-07-20",
    departureDate: "2026-07-20",
  },
  {
    id: "FL004",
    airline: "Alaska Airlines",
    airlineLogo: "AS",
    flightNumber: "AS567",
    origin: "New York",
    originCode: "JFK",
    destination: "San Francisco",
    destinationCode: "SFO",
    departureTime: "09:00",
    arrivalTime: "12:45",
    duration: "6h 45m",
    stops: 0,
    price: 524,
    currency: "USD",
    cabin: "economy",
    availableSeats: 6,
    date: "2026-07-21",
    departureDate: "2026-07-21",
  },
  {
    id: "FL005",
    airline: "JetBlue Airways",
    airlineLogo: "B6",
    flightNumber: "B6224",
    origin: "New York",
    originCode: "JFK",
    destination: "Los Angeles",
    destinationCode: "LAX",
    departureTime: "07:45",
    arrivalTime: "10:55",
    duration: "6h 10m",
    stops: 0,
    price: 359,
    currency: "USD",
    cabin: "economy",
    availableSeats: 15,
    date: "2026-07-21",
    departureDate: "2026-07-21",
  },
  {
    id: "FL006",
    airline: "Delta Air Lines",
    airlineLogo: "DL",
    flightNumber: "DL789",
    origin: "New York",
    originCode: "JFK",
    destination: "Los Angeles",
    destinationCode: "LAX",
    departureTime: "16:30",
    arrivalTime: "19:45",
    duration: "6h 15m",
    stops: 0,
    price: 699,
    currency: "USD",
    cabin: "business",
    availableSeats: 4,
    date: "2026-07-20",
    departureDate: "2026-07-20",
  },
  {
    id: "FL007",
    airline: "American Airlines",
    airlineLogo: "AA",
    flightNumber: "AA234",
    origin: "New York",
    originCode: "EWR",
    destination: "San Francisco",
    destinationCode: "SFO",
    departureTime: "11:30",
    arrivalTime: "15:20",
    duration: "6h 50m",
    stops: 1,
    stopInfo: "1 stop in Denver",
    price: 312,
    currency: "USD",
    cabin: "economy",
    availableSeats: 19,
    date: "2026-07-22",
    departureDate: "2026-07-22",
  },
  {
    id: "FL008",
    airline: "United Airlines",
    airlineLogo: "UA",
    flightNumber: "UA456",
    origin: "New York",
    originCode: "JFK",
    destination: "Los Angeles",
    destinationCode: "LAX",
    departureTime: "13:15",
    arrivalTime: "16:30",
    duration: "6h 15m",
    stops: 0,
    price: 479,
    currency: "USD",
    cabin: "premium_economy",
    availableSeats: 7,
    date: "2026-07-21",
    departureDate: "2026-07-21",
  },
  {
    id: "FL009",
    airline: "Alaska Airlines",
    airlineLogo: "AS",
    flightNumber: "AS890",
    origin: "New York",
    originCode: "JFK",
    destination: "Los Angeles",
    destinationCode: "LAX",
    departureTime: "19:00",
    arrivalTime: "22:15",
    duration: "6h 15m",
    stops: 0,
    price: 524,
    currency: "USD",
    cabin: "economy",
    availableSeats: 3,
    date: "2026-07-20",
    departureDate: "2026-07-20",
  },
];

// ─── Skeleton Components ───────────────────────────────────────────────────

const SkeletonBar = ({
  w,
  h = 14,
  rounded = 6,
}: {
  w: number | string;
  h?: number;
  rounded?: number;
}) => (
  <div
    className="ft-skel-shimmer"
    style={{
      width: w,
      height: h,
      borderRadius: rounded,
      background: "#e2e8f0",
    }}
  />
);

const FlightCardSkeleton = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#fff",
      borderRadius: 14,
      border: "1px solid #e2e8f0",
      padding: "18px 20px",
      marginBottom: 12,
      gap: 20,
      flexWrap: "wrap",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        className="ft-skel-shimmer"
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: "#e2e8f0",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <SkeletonBar w={140} h={13} />
        <SkeletonBar w={90} h={11} />
      </div>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <SkeletonBar w={70} h={13} />
      <SkeletonBar w={110} h={10} />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      <SkeletonBar w={80} h={16} />
      <SkeletonBar w={60} h={11} />
    </div>
  </div>
);

const FilterSkeleton = () => (
  <div
    style={{
      background: "#fff",
      borderRadius: 14,
      border: "1px solid #e2e8f0",
      padding: "16px 20px",
      marginBottom: 20,
      display: "flex",
      gap: 20,
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    <SkeletonBar w={120} h={12} />
    <SkeletonBar w={100} h={12} />
    <SkeletonBar w={80} h={12} />
    <SkeletonBar w={140} h={12} />
  </div>
);

const DateSelectorSkeleton = () => (
  <div
    style={{
      display: "flex",
      gap: 10,
      overflowX: "auto",
      paddingBottom: 16,
      marginBottom: 16,
    }}
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="ft-skel-shimmer"
        style={{
          minWidth: 80,
          height: 70,
          borderRadius: 12,
          background: "#e2e8f0",
          flexShrink: 0,
        }}
      />
    ))}
  </div>
);

// ─── Icons ──────────────────────────────────────────────────────────────────

const IconSwap = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 7h12M16 3l4 4-4 4M16 17H4M8 13l-4 4 4 4" />
  </svg>
);

const IconSearch = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IconUser = () => (
  <svg
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconChevron = () => (
  <svg
    width={13}
    height={13}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const IconClock = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#64748b"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconLayover = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#64748b"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);

const IconFilter = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#475569"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22 3 2 3 10 13 10 21 14 18 14 13 22 3" />
  </svg>
);

// ─── Compact "modify search" bar ───────────────────────────────────────────

const SearchEditBar = ({
  initial,
  onUpdate,
}: {
  initial: {
    tripType: TripType;
    fromCode: string;
    toCode: string;
    depart: string;
    returnD: string;
    pax: PaxState;
    cabin: CabinClass;
  };
  onUpdate: (params: URLSearchParams) => void;
}) => {
  const { airports, loading } = useAirports();
  const isMobile = useIsMobile(768);

  const [tripType, setTripType] = useState<TripType>(initial.tripType);
  const [from, setFrom] = useState<AirportRecord | null>(null);
  const [to, setTo] = useState<AirportRecord | null>(null);
  const [depart, setDepart] = useState(initial.depart || TODAY_STR);
  const [returnD, setReturnD] = useState(initial.returnD);
  const [pax, setPax] = useState<PaxState>(initial.pax);
  const [cabin, setCabin] = useState<CabinClass>(initial.cabin);
  const [showPax, setShowPax] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paxRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    paxRef,
    useCallback(() => setShowPax(false), []),
  );

  useEffect(() => {
    if (!airports.length) return;
    if (!from)
      setFrom(airports.find((a) => a.iata_code === initial.fromCode) ?? null);
    if (!to)
      setTo(airports.find((a) => a.iata_code === initial.toCode) ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airports]);

  const clearError = (key: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const handleFromChange = (a: AirportRecord | null) => {
    setFrom(a);
    clearError("from");
  };
  const handleToChange = (a: AirportRecord | null) => {
    setTo(a);
    clearError("to");
  };
  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    clearError("from");
    clearError("to");
  };

  const updatePax = (key: keyof PaxState, val: number) => {
    const next = { ...pax, [key]: val };
    if (next.infants > next.adults) {
      setErrors((e) => ({
        ...e,
        pax: "Infants cannot exceed the number of adults.",
      }));
      return;
    }
    if (next.adults + next.children > 9) {
      setErrors((e) => ({ ...e, pax: "Maximum 9 passengers per booking." }));
      return;
    }
    clearError("pax");
    setPax(next);
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!from) e.from = "Please select an origin airport.";
    if (!to) e.to = "Please select a destination airport.";
    if (from && to && from.iata_code === to.iata_code)
      e.to = "Origin and destination cannot be the same.";
    if (!depart) e.depart = "Please select a departure date.";
    if (tripType === "round-trip" && !returnD)
      e.return = "Please select a return date.";
    if (tripType === "round-trip" && returnD && depart && returnD < depart)
      e.return = "Return must be after departure.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSearch = () => {
    if (!validate()) return;
    const params = new URLSearchParams({
      tripType,
      from: from?.iata_code ?? "",
      fromCity: from?.municipality ?? "",
      to: to?.iata_code ?? "",
      toCity: to?.municipality ?? "",
      depart,
      returnD: tripType === "round-trip" ? returnD : "",
      adults: String(pax.adults),
      children: String(pax.children),
      infants: String(pax.infants),
      cabin,
    });
    onUpdate(params);
  };

  const paxSummary = [
    `${pax.adults} Adult${pax.adults !== 1 ? "s" : ""}`,
    pax.children > 0 &&
      `${pax.children} Child${pax.children !== 1 ? "ren" : ""}`,
    pax.infants > 0 && `${pax.infants} Infant${pax.infants !== 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(", ");

  const selectedCabinLabel =
    CABIN_OPTIONS.find((o) => o.value === cabin)?.label ?? "Economy";
  const paxKeyDown = (e: React.KeyboardEvent) =>
    (e.key === "Enter" || e.key === " ") && setShowPax((p) => !p);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0a2a6b 0%, #123a8a 100%)",
        borderRadius: 16,
        padding: isMobile ? 14 : 18,
        marginBottom: 24,
      }}
    >
      {/* Trip type toggle */}
      <div
        style={{ display: "flex", gap: 18, marginBottom: 12, paddingLeft: 2 }}
      >
        {(["one-way", "round-trip"] as TripType[]).map((t) => (
          <label
            key={t}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              type="radio"
              name="editTripType"
              checked={tripType === t}
              style={{ display: "none" }}
              onChange={() => {
                setTripType(t);
                if (t === "one-way") setReturnD("");
                clearError("return");
              }}
            />
            <span
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                flexShrink: 0,
                border: `2px solid ${tripType === t ? "#f97316" : "#8ea3d1"}`,
                background: tripType === t ? "#f97316" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {tripType === t && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#fff",
                  }}
                />
              )}
            </span>
            <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>
              {t === "one-way" ? "One Way" : "Round Trip"}
            </span>
          </label>
        ))}
      </div>

      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <AirportField
            label="From"
            placeholder="Where From?"
            value={from}
            onChange={handleFromChange}
            exclude={to}
            airports={airports}
            loading={loading}
            icon={null}
          />
          {errors.from && <p style={S.errorText}>{errors.from}</p>}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap airports"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#f97316",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconSwap />
            </button>
          </div>

          <AirportField
            label="To"
            placeholder="Where To?"
            value={to}
            onChange={handleToChange}
            exclude={from}
            airports={airports}
            loading={loading}
            icon={null}
          />
          {errors.to && <p style={S.errorText}>{errors.to}</p>}

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <DatePicker
              label="Depart"
              value={depart}
              onChange={(d) => {
                setDepart(d);
                clearError("depart");
              }}
              minDate={TODAY_STR}
              hasError={!!errors.depart}
            />
            <DatePicker
              label="Return"
              value={returnD}
              onChange={(d) => {
                setReturnD(d);
                clearError("return");
              }}
              minDate={depart || TODAY_STR}
              hasError={!!(tripType === "round-trip" && errors.return)}
            />
          </div>

          <div ref={paxRef} style={{ position: "relative" }}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowPax((p) => !p)}
              onKeyDown={paxKeyDown}
              style={{
                background: "#fff",
                borderRadius: 12,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 14px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconUser />
                <span style={{ fontSize: 13, color: "#334155" }}>
                  {paxSummary}
                </span>
                <span style={{ color: "#cbd5e1" }}>•</span>
                <span
                  style={{ fontSize: 13, color: "#f97316", fontWeight: 600 }}
                >
                  {selectedCabinLabel}
                </span>
              </div>
              <IconChevron />
            </div>
            {showPax && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
                  zIndex: 300,
                  border: "1px solid #e2e8f0",
                  padding: 20,
                }}
              >
                <PaxCabinPanel
                  pax={pax}
                  cabin={cabin}
                  onPaxChange={updatePax}
                  onCabinChange={setCabin}
                  error={errors.pax ?? ""}
                  onDone={() => setShowPax(false)}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#f97316",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              height: 48,
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
            }}
          >
            <IconSearch /> Search
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 40px 1.3fr 1fr 1fr 1.1fr auto",
            gap: 8,
            alignItems: "flex-end",
          }}
        >
          <AirportField
            label="From"
            placeholder="Where From?"
            value={from}
            onChange={handleFromChange}
            exclude={to}
            airports={airports}
            loading={loading}
            icon={null}
          />

          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap airports"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#f97316",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 6,
            }}
          >
            <IconSwap />
          </button>

          <AirportField
            label="To"
            placeholder="Where To?"
            value={to}
            onChange={handleToChange}
            exclude={from}
            airports={airports}
            loading={loading}
            icon={null}
          />

          <DatePicker
            label="Depart"
            value={depart}
            onChange={(d) => {
              setDepart(d);
              clearError("depart");
            }}
            minDate={TODAY_STR}
            hasError={!!errors.depart}
          />

          <DatePicker
            label="Return"
            value={returnD}
            onChange={(d) => {
              setReturnD(d);
              clearError("return");
            }}
            minDate={depart || TODAY_STR}
            hasError={!!(tripType === "round-trip" && errors.return)}
          />

          <div ref={paxRef} style={{ position: "relative" }}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowPax((p) => !p)}
              onKeyDown={paxKeyDown}
              style={{
                background: "#fff",
                borderRadius: 12,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 14px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  overflow: "hidden",
                }}
              >
                <IconUser />
                <span
                  style={{
                    fontSize: 13,
                    color: "#334155",
                    whiteSpace: "nowrap",
                  }}
                >
                  {paxSummary}
                </span>
                <span style={{ color: "#cbd5e1" }}>•</span>
                <span
                  style={{
                    fontSize: 13,
                    color: "#f97316",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {selectedCabinLabel}
                </span>
              </div>
              <IconChevron />
            </div>
            {showPax && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
                  zIndex: 300,
                  border: "1px solid #e2e8f0",
                  width: 320,
                  padding: 20,
                }}
              >
                <PaxCabinPanel
                  pax={pax}
                  cabin={cabin}
                  onPaxChange={updatePax}
                  onCabinChange={setCabin}
                  error={errors.pax ?? ""}
                  onDone={() => setShowPax(false)}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#f97316",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              height: 54,
              padding: "0 20px",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <IconSearch /> Search
          </button>
        </div>
      )}
      {(errors.from || errors.to || errors.return) && !isMobile && (
        <p style={{ ...S.errorText, marginTop: 8 }}>
          {errors.from || errors.to || errors.return}
        </p>
      )}
    </div>
  );
};

// ─── Flight Card Component ─────────────────────────────────────────────────

const FlightCard = ({
  flight,
  isRoundTrip,
}: {
  flight: Flight;
  isRoundTrip: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStopsLabel = (stops: number) => {
    if (stops === 0) return "Direct";
    if (stops === 1) return "1 stop";
    return `${stops} stops`;
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${isHovered ? "#f97316" : "#e2e8f0"}`,
        padding: "20px 24px",
        marginBottom: 12,
        gap: 20,
        flexWrap: "wrap",
        transition: "all 0.2s ease",
        boxShadow: isHovered ? "0 8px 30px rgba(0,0,0,0.08)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Airline Info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          minWidth: 140,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            color: "#1e293b",
            flexShrink: 0,
          }}
        >
          {flight.airlineLogo}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
            {flight.airline}
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>
            {flight.flightNumber} • {flight.cabin.replace("_", " ")}
          </div>
        </div>
      </div>

      {/* Flight Times */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          minWidth: 160,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
              {flight.departureTime}
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>
              {flight.originCode}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 2,
                background: "#e2e8f0",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#f97316",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#94a3b8",
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <IconClock />
              {flight.duration}
            </div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
              {getStopsLabel(flight.stops)}
              {flight.stopInfo && ` • ${flight.stopInfo}`}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
              {flight.arrivalTime}
            </div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>
              {flight.destinationCode}
            </div>
          </div>
        </div>
        {isRoundTrip && flight.returnDate && (
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>
            Return: {flight.returnDate}
          </div>
        )}
      </div>

      {/* Price & Booking */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          minWidth: 120,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
          ${flight.price}
        </div>
        <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 4 }}>
          {flight.currency} • {flight.availableSeats} seats left
        </div>
        <button
          style={{
            background: "#f97316",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "6px 18px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            opacity: isHovered ? 1 : 0.85,
          }}
        >
          Select
        </button>
      </div>
    </div>
  );
};

// ─── Filters Component ─────────────────────────────────────────────────────

interface Filters {
  airlines: string[];
  maxStops: number;
  minPrice: number;
  maxPrice: number;
  sortBy: "price" | "duration" | "departure";
  searchFlightNumber: string;
}

const FilterBar = ({
  flights,
  onFilterChange,
}: {
  flights: Flight[];
  onFilterChange: (filters: Filters) => void;
}) => {
  const [filters, setFilters] = useState<Filters>({
    airlines: [],
    maxStops: 2,
    minPrice: 0,
    maxPrice: 2000,
    sortBy: "price",
    searchFlightNumber: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile(768);

  const uniqueAirlines = Array.from(new Set(flights.map((f) => f.airline)));

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleAirline = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    handleFilterChange("airlines", newAirlines);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #e2e8f0",
        padding: "16px 20px",
        marginBottom: 20,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
        }}
      >
        {/* Sort */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>
            Sort by:
          </span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              handleFilterChange("sortBy", e.target.value as any)
            }
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              fontSize: 12,
              background: "#fff",
              color: "#0f172a",
              cursor: "pointer",
            }}
          >
            <option value="price">Price: Low to High</option>
            <option value="duration">Duration</option>
            <option value="departure">Departure Time</option>
          </select>
        </div>

        {/* Flight Number Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="text"
            placeholder="Flight number..."
            value={filters.searchFlightNumber}
            onChange={(e) =>
              handleFilterChange(
                "searchFlightNumber",
                e.target.value.toUpperCase(),
              )
            }
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              fontSize: 12,
              background: "#fff",
              color: "#0f172a",
              width: isMobile ? 100 : 140,
            }}
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: showFilters ? "#f1f5f9" : "#fff",
            fontSize: 12,
            fontWeight: 500,
            color: "#475569",
            cursor: "pointer",
          }}
        >
          <IconFilter />
          Filters
          {(filters.airlines.length > 0 || filters.maxStops < 2) && (
            <span
              style={{
                background: "#f97316",
                color: "#fff",
                borderRadius: 10,
                padding: "1px 8px",
                fontSize: 10,
              }}
            >
              {filters.airlines.length + (filters.maxStops < 2 ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {/* Airlines */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Airlines
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {uniqueAirlines.map((airline) => (
                <label
                  key={airline}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    color: "#475569",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={filters.airlines.includes(airline)}
                    onChange={() => toggleAirline(airline)}
                    style={{ accentColor: "#f97316" }}
                  />
                  {airline}
                </label>
              ))}
            </div>
          </div>

          {/* Stops */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Stops
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2].map((stops) => (
                <label
                  key={stops}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    color: "#475569",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="stops"
                    checked={filters.maxStops === stops}
                    onChange={() => handleFilterChange("maxStops", stops)}
                    style={{ accentColor: "#f97316" }}
                  />
                  {stops === 0
                    ? "Direct"
                    : `${stops}+ stop${stops > 1 ? "s" : ""}`}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              Price Range
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  handleFilterChange("minPrice", Number(e.target.value) || 0)
                }
                style={{
                  width: 60,
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />
              <span style={{ fontSize: 12, color: "#94a3b8" }}>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  handleFilterChange("maxPrice", Number(e.target.value) || 2000)
                }
                style={{
                  width: 60,
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Horizontal Date Selector ─────────────────────────────────────────────

const DateSelector = ({
  flights,
  selectedDate,
  onDateSelect,
}: {
  flights: Flight[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}) => {
  // Get unique dates from flights
  const uniqueDates = Array.from(
    new Set(flights.map((f) => f.departureDate)),
  ).sort();

  if (uniqueDates.length === 0) return null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
  };

  const getFlightCountForDate = (date: string) => {
    return flights.filter((f) => f.departureDate === date).length;
  };

  return (
    <div style={{ marginBottom: 20, overflowX: "auto" }}>
      <div
        style={{
          display: "flex",
          gap: 10,
          minWidth: "max-content",
          paddingBottom: 8,
        }}
      >
        {uniqueDates.map((date) => {
          const isSelected = date === selectedDate;
          const count = getFlightCountForDate(date);
          return (
            <button
              key={date}
              onClick={() => onDateSelect(date)}
              style={{
                minWidth: 90,
                padding: "10px 14px",
                borderRadius: 12,
                border: isSelected ? "2px solid #f97316" : "1px solid #e2e8f0",
                background: isSelected ? "#fff7ed" : "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: isSelected ? "#f97316" : "#0f172a",
                }}
              >
                {formatDate(date)}
              </div>
              <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
                {count} flight{count > 1 ? "s" : ""}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

export const FlightResults = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fromCode = searchParams.get("from") ?? "";
  const toCode = searchParams.get("to") ?? "";
  const fromCity = searchParams.get("fromCity") || fromCode;
  const toCity = searchParams.get("toCity") || toCode;
  const depart = searchParams.get("depart") ?? "";
  const returnD = searchParams.get("returnD") ?? "";
  const tripType = (searchParams.get("tripType") as TripType) ?? "round-trip";
  const cabin = (searchParams.get("cabin") ?? "economy") as CabinClass;

  const flightDetails = {
    tripType,
    from: { iata_code: fromCode, city: fromCity },
    to: { iata_code: toCode, city: toCity },
    depart,
    returnD,
    pax: {
      adults: Number(searchParams.get("adults") ?? 1),
      children: Number(searchParams.get("children") ?? 0),
      infants: Number(searchParams.get("infants") ?? 0),
    },
    cabin,
  };

  // Simulate loading and load demo data
  useEffect(() => {
    setPhase("loading");
    const timer = setTimeout(() => {
      // Filter demo flights based on search params
      const filtered = DEMO_FLIGHTS.filter((flight) => {
        const matchesOrigin =
          flight.originCode === fromCode || flight.origin.includes(fromCity);
        const matchesDestination =
          flight.destinationCode === toCode ||
          flight.destination.includes(toCity);
        const matchesCabin = flight.cabin === cabin || cabin === "economy";
        const matchesDate = flight.departureDate === depart;
        return (
          matchesOrigin && matchesDestination && matchesCabin && matchesDate
        );
      });

      setFlights(filtered);
      setFilteredFlights(filtered);
      if (filtered.length > 0) {
        setSelectedDate(filtered[0].departureDate);
      }
      setPhase("ready");
    }, LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [
    searchParams.toString(),
    fromCode,
    toCode,
    fromCity,
    toCity,
    cabin,
    depart,
  ]);

  // Handle filters
  const handleFilterChange = (filters: Filters) => {
    let filtered = [...flights];

    // Filter by airlines
    if (filters.airlines.length > 0) {
      filtered = filtered.filter((f) => filters.airlines.includes(f.airline));
    }

    // Filter by max stops
    filtered = filtered.filter((f) => f.stops <= filters.maxStops);

    // Filter by price range
    filtered = filtered.filter(
      (f) => f.price >= filters.minPrice && f.price <= filters.maxPrice,
    );

    // Filter by flight number
    if (filters.searchFlightNumber) {
      filtered = filtered.filter((f) =>
        f.flightNumber
          .toLowerCase()
          .includes(filters.searchFlightNumber.toLowerCase()),
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "duration":
        filtered.sort((a, b) => {
          const getMinutes = (dur: string) => {
            const [h, m] = dur
              .replace("h", "")
              .replace("m", "")
              .split(" ")
              .map(Number);
            return (h || 0) * 60 + (m || 0);
          };
          return getMinutes(a.duration) - getMinutes(b.duration);
        });
        break;
      case "departure":
        filtered.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
    }

    // Filter by selected date
    if (selectedDate) {
      filtered = filtered.filter((f) => f.departureDate === selectedDate);
    }

    setFilteredFlights(filtered);
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Re-apply filters with new date
    // We'll trigger a filter re-apply by calling handleFilterChange with current filters
    // For simplicity, we'll just filter the flights directly
    const filtered = flights.filter((f) => f.departureDate === date);
    setFilteredFlights(filtered);
  };

  return (
    <div
      style={{ margin: "0 auto", padding: "32px 16px 60px", maxWidth: 1280 }}
    >
      <style>{`
        @keyframes ft-shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .ft-skel-shimmer {
          background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 37%, #e2e8f0 63%);
          background-size: 800px 100%;
          animation: ft-shimmer 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* Modify search bar */}
      <SearchEditBar
        initial={{
          tripType,
          fromCode,
          toCode,
          depart,
          returnD,
          pax: flightDetails.pax,
          cabin,
        }}
        onUpdate={(params) =>
          router.push(`/flights/results?${params.toString()}`)
        }
      />

      {/* Route summary header */}
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}
        >
          {fromCity} → {toCity}
        </h2>
        <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>
          {tripType === "round-trip" ? "Round trip" : "One way"} • {depart}
          {tripType === "round-trip" && returnD && ` → ${returnD}`} •{" "}
          {flightDetails.pax.adults + flightDetails.pax.children} passengers
        </p>
      </div>

      {phase === "loading" ? (
        <>
          <FilterSkeleton />
          <DateSelectorSkeleton />
          <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 14 }}>
            Searching the best fares across airlines…
          </p>
          {Array.from({ length: 4 }).map((_, i) => (
            <FlightCardSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
          {flights.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#f8fafc",
                borderRadius: 16,
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛫</div>
              <h3 style={{ fontSize: 18, color: "#0f172a", margin: 0 }}>
                No flights found
              </h3>
              <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 8 }}>
                We couldn&apos;t find live fares for this route. Send us your
                details and our team will find the best option for you.
              </p>
              <button
                onClick={() => setShowBookingModal(true)}
                style={{
                  marginTop: 20,
                  padding: "10px 24px",
                  borderRadius: 10,
                  border: "none",
                  background: "#f97316",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Request This Flight
              </button>
            </div>
          ) : (
            <>
              <FilterBar
                flights={flights}
                onFilterChange={handleFilterChange}
              />
              <DateSelector
                flights={flights}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>
                  {filteredFlights.length} flight
                  {filteredFlights.length > 1 ? "s" : ""} found
                </p>
                {filteredFlights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    isRoundTrip={tripType === "round-trip"}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        flightDetails={flightDetails}
      />
    </div>
  );
};
