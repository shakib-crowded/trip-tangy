import { useState, useRef, useCallback, useEffect } from "react";
import { AirportField } from "./AirportField";
import { DatePicker } from "./DatePicker";
import { PaxCabinPanel } from "./PaxCabinPanel";
import { S } from "./styles";
import { useRouter } from "next/navigation";

type AirportRecord = import("./AirportField").AirportRecord;

interface PaxState {
  adults: number;
  children: number;
  infants: number;
}

type TripType = "one-way" | "round-trip";
type CabinClass = import("./PaxCabinPanel").CabinClass;

const TODAY_STR = (() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();

const TOMORROW_STR = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();
 

const CABIN_OPTIONS: { value: CabinClass; label: string }[] = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First Class" },
];

// ─── Breakpoint hook ──────────────────────────────────────────────────────────

const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
};

// ─── Airport loading ──────────────────────────────────────────────────────────

let _airportCache: AirportRecord[] | null = null;
let _airportPromise: Promise<AirportRecord[]> | null = null;

const loadAirports = (): Promise<AirportRecord[]> => {
  if (_airportCache) return Promise.resolve(_airportCache);
  if (_airportPromise) return _airportPromise;
  _airportPromise = fetch("/data/airports.json")
    .then((r) => {
      if (!r.ok) throw new Error(`Failed to load airports.json (${r.status})`);
      return r.json() as Promise<AirportRecord[]>;
    })
    .then((data) => {
      _airportCache = data.filter(
        (a) => a.iata_code && a.iata_code.trim().length === 3,
      );
      return _airportCache;
    });
  return _airportPromise;
};

const useAirports = () => {
  const [airports, setAirports] = useState<AirportRecord[]>(
    _airportCache ?? [],
  );
  const [loading, setLoading] = useState(!_airportCache);
  const [error, setError] = useState("");

  useEffect(() => {
    if (_airportCache) return;
    let cancelled = false;
    setLoading(true);
    loadAirports()
      .then((data) => {
        if (cancelled) return;
        _airportCache = data;
        setAirports(data);
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setError(e.message);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { airports, loading, error };
};

// ─── Outside click ────────────────────────────────────────────────────────────

const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
): void => {
  useEffect(() => {
    const listener = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconSearch = () => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IconSwap = ({ vertical = false }: { vertical?: boolean }) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ transform: vertical ? "rotate(90deg)" : undefined }}
  >
    <path d="M8 7h12M16 3l4 4-4 4M16 17H4M8 13l-4 4 4 4" />
  </svg>
);

const IconUser = () => (
  <svg
    width={14}
    height={14}
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
    width={14}
    height={14}
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

const IconPlaneFrom = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="14"
    fill="#f97316"
    viewBox="0 0 20 17"
    aria-hidden="true"
  >
    <path d="M1.376 16.498v-1h17v1h-17zm1.575-5.075L.676 7.498l.85-.2 1.8 1.55 5.4-1.45-4.05-6.85L5.75.223l6.85 6.125 5.225-1.4c.383-.1.73-.03 1.038.212.308.242.462.554.462.938 0 .266-.075.5-.225.7-.15-.2-.35.333-.6.4L2.95 11.423z" />
  </svg>
);

const IconPlaneTo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="#f97316"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M3.5 20.5v-1h17v1h-17zm15.475-5.1L3.5 11.125V6.7l.8.225L5 9.05l5.5 1.55V2.65l1.125.275 2.75 8.75 5.25 1.475c.267.067.48.209.638.425.158.217.237.459.237.725 0 .384-.162.692-.487.925-.325.234-.671.292-1.038.175z" />
  </svg>
);

// ─── Reusable sub-components ──────────────────────────────────────────────────

const SwapButton = ({
  onClick,
  vertical = false,
}: {
  onClick: () => void;
  vertical?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Swap origin and destination"
    title="Swap airports"
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "#f97316",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 8px rgba(249,115,22,0.3)",
      transition: "all 0.2s ease",
      flexShrink: 0,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.07)";
      e.currentTarget.style.background = "#ea6c10";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.background = "#f97316";
    }}
  >
    <IconSwap vertical={vertical} />
  </button>
);

const SearchButton = ({
  label,
  onClick,
  fullWidth = false,
}: {
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: hover ? "#ea6c10" : "#f97316",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        height: 54,
        padding: "0 28px",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        cursor: "pointer",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
        transition: "background 0.2s ease",
        fontFamily: "inherit",
        flexShrink: 0,
        alignSelf: "flex-end",
        width: fullWidth ? "100%" : undefined,
      }}
    >
      <IconSearch />
      {label}
    </button>
  );
};

// Shared Travelers & Cabin trigger — used in both mobile and desktop layouts
const TravelersTrigger = ({
  paxSummary,
  selectedCabinLabel,
  showPax,
  onClick,
  onKeyDown,
}: {
  paxSummary: string;
  selectedCabinLabel: string;
  showPax: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) => (
  <div
    role="button"
    tabIndex={0}
    aria-label="Select travelers and cabin class"
    aria-expanded={showPax}
    onClick={onClick}
    onKeyDown={onKeyDown}
    style={{
      width: "100%",
      boxSizing: "border-box",
      background: "#ffffff",
      borderRadius: 12,
      padding: "0 14px",
      fontSize: 14,
      fontWeight: 500,
      color: "#1e293b",
      border: "2px solid #e2e8f0",
      outline: "none",
      cursor: "pointer",
      userSelect: "none",
      fontFamily: "inherit",
      height: 54,
      minHeight: 54,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      transition: "border-color 0.2s ease",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <IconUser />
      <span
        style={{
          fontSize: 13,
          color: "#334155",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {paxSummary}
      </span>
      <span style={{ color: "#cbd5e1", flexShrink: 0 }}>•</span>
      <span
        style={{
          color: "#f97316",
          fontWeight: 600,
          whiteSpace: "nowrap",
          flexShrink: 0,
          fontSize: 13,
        }}
      >
        {selectedCabinLabel}
      </span>
    </div>
    <IconChevron />
  </div>
);

const TravelersLabel = () => (
  <span
    style={{
      display: "block",
      fontSize: 11,
      fontWeight: 600,
      color: "rgba(255,255,255,0.75)",
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      marginBottom: 5,
      userSelect: "none",
    }}
  >
    Travelers &amp; Cabin
  </span>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const FlightSearch = () => {
  const { airports, loading } = useAirports();
  const isMobile = useIsMobile(768);

  const router = useRouter();

  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [from, setFrom] = useState<AirportRecord | null>(null);
  const [to, setTo] = useState<AirportRecord | null>(null);
  const [depart, setDepart] = useState(TODAY_STR);
  const [returnD, setReturnD] = useState(TOMORROW_STR);
  const [pax, setPax] = useState<PaxState>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabin, setCabin] = useState<CabinClass>("economy");
  const [showPax, setShowPax] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paxRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    paxRef,
    useCallback(() => setShowPax(false), []),
  );

  useEffect(() => {
    if (airports.length > 0 && !from && !to) {
      setFrom(airports[0]);
      setTo(airports[1]);
    }
  }, [airports, from, to]);

  const clearError = (key: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const handleFromChange = (airport: AirportRecord | null) => {
    setFrom(airport);
    clearError("from");
    if (airport && to && airport.iata_code === to.iata_code) clearError("to");
  };
  const handleToChange = (airport: AirportRecord | null) => {
    setTo(airport);
    clearError("to");
    if (from && airport && from.iata_code === airport.iata_code)
      clearError("from");
  };
  const handleDepartChange = (date: string) => {
    setDepart(date);
    clearError("depart");
    if (tripType === "round-trip" && returnD && date <= returnD)
      clearError("return");
  };
  const handleReturnDateChange = (date: string) => {
    if (tripType === "one-way" && date) {
      setTripType("round-trip");
      setReturnD(date);
      return;
    }
    setReturnD(date);
    clearError("return");
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
  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    clearError("from");
    clearError("to");
  };
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!from) e.from = "Please select an origin airport.";
    if (!to) e.to = "Please select a destination airport.";
    if (from && to && from.iata_code === to.iata_code)
      e.to = "Origin and destination cannot be the same.";
    if (!depart) e.depart = "Please select a departure date.";
    if (depart && depart < TODAY_STR)
      e.depart = "Departure date cannot be in the past.";
    if (tripType === "round-trip") {
      if (!returnD) e.return = "Please select a return date.";
      if (returnD && depart && returnD < depart)
        e.return = "Return must be after departure.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSearch = () => {
    if (!validate()) return;

    const params = new URLSearchParams({
      tripType,
      from: from?.iata_code ?? "",
      fromCity: (from as any)?.city ?? (from as any)?.name ?? "",
      to: to?.iata_code ?? "",
      toCity: (to as any)?.city ?? (to as any)?.name ?? "",
      depart,
      returnD: tripType === "round-trip" ? returnD : "",
      adults: String(pax.adults),
      children: String(pax.children),
      infants: String(pax.infants),
      cabin,
    });

    router.push(`/flights/results?${params.toString()}`);
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
    <>
      <div style={{ width: "100%", maxWidth: 1200 }}>
        {/* ── Trip type radios ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: isMobile ? 16 : 24,
            marginBottom: isMobile ? 14 : 20,
            paddingLeft: 2,
          }}
        >
          {(["one-way", "round-trip"] as TripType[]).map((t) => (
            <label
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <input
                type="radio"
                name="tripType"
                value={t}
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
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  flexShrink: 0,
                  border: `2px solid ${tripType === t ? "#f97316" : "#cbd5e1"}`,
                  background: tripType === t ? "#f97316" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                }}
              >
                {tripType === t && (
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#fff",
                    }}
                  />
                )}
              </span>
              <span
                style={{
                  fontSize: isMobile ? 13 : 14,
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                {t === "one-way" ? "One Way" : "Round Trip"}
              </span>
            </label>
          ))}
        </div>

        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* From */}
            <div>
              <AirportField
                label="From"
                placeholder="Where From?"
                value={from}
                onChange={handleFromChange}
                exclude={to}
                airports={airports}
                loading={loading}
                icon={<IconPlaneFrom />}
              />
              {errors.from && <p style={S.errorText}>{errors.from}</p>}
            </div>

            {/* Swap — centred, vertical arrow */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <SwapButton onClick={handleSwap} vertical />
            </div>

            {/* To */}
            <div>
              <AirportField
                label="To"
                placeholder="Where To?"
                value={to}
                onChange={handleToChange}
                exclude={from}
                airports={airports}
                loading={loading}
                icon={<IconPlaneTo />}
              />
              {errors.to && <p style={S.errorText}>{errors.to}</p>}
            </div>

            {/* Dates — 2 columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <DatePicker
                  label="Depart"
                  value={depart}
                  onChange={handleDepartChange}
                  minDate={TODAY_STR}
                  hasError={!!errors.depart}
                />
                {errors.depart && <p style={S.errorText}>{errors.depart}</p>}
              </div>
              <div style={{ minWidth: 0 }}>
                <DatePicker
                  label="Return"
                  value={returnD}
                  onChange={handleReturnDateChange}
                  minDate={depart || TODAY_STR}
                  hasError={!!(tripType === "round-trip" && errors.return)}
                />
                {tripType === "round-trip" && errors.return && (
                  <p style={S.errorText}>{errors.return}</p>
                )}
              </div>
            </div>

            {/* Travelers & Cabin — dropdown opens upward so keyboard doesn't obscure it */}
            <div ref={paxRef} style={{ position: "relative" }}>
              <TravelersLabel />
              <TravelersTrigger
                paxSummary={paxSummary}
                selectedCabinLabel={selectedCabinLabel}
                showPax={showPax}
                onClick={() => setShowPax((p) => !p)}
                onKeyDown={paxKeyDown}
              />
              {showPax && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    left: 0,
                    right: 0,
                    background: "#ffffff",
                    borderRadius: 16,
                    boxShadow: "0 -8px 40px -8px rgba(0,0,0,0.2)",
                    zIndex: 300,
                    border: "1px solid #e2e8f0",
                    padding: 20,
                    boxSizing: "border-box",
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
              {errors.pax && <p style={S.errorText}>{errors.pax}</p>}
            </div>

            {/* Search — full width */}
            <SearchButton
              label="Search Flights"
              onClick={handleSearch}
              fullWidth
            />
          </div>
        ) : (
          <>
            {/* Row 1 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 44px 1fr",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <AirportField
                  label="From"
                  placeholder="Where From?"
                  value={from}
                  onChange={handleFromChange}
                  exclude={to}
                  airports={airports}
                  loading={loading}
                  icon={<IconPlaneFrom />}
                />
                {errors.from && <p style={S.errorText}>{errors.from}</p>}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  paddingBottom: 5,
                }}
              >
                <SwapButton onClick={handleSwap} />
              </div>

              <div style={{ minWidth: 0 }}>
                <AirportField
                  label="To"
                  placeholder="Where To?"
                  value={to}
                  onChange={handleToChange}
                  exclude={from}
                  airports={airports}
                  loading={loading}
                  icon={<IconPlaneTo />}
                />
                {errors.to && <p style={S.errorText}>{errors.to}</p>}
              </div>
            </div>

            {/* Row 2 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1.2fr auto",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <DatePicker
                  label="Depart"
                  value={depart}
                  onChange={handleDepartChange}
                  minDate={TODAY_STR}
                  hasError={!!errors.depart}
                />
                {errors.depart && <p style={S.errorText}>{errors.depart}</p>}
              </div>

              <div style={{ minWidth: 0 }}>
                <DatePicker
                  label="Return"
                  value={returnD}
                  onChange={handleReturnDateChange}
                  minDate={depart || TODAY_STR}
                  hasError={!!(tripType === "round-trip" && errors.return)}
                />
                {tripType === "round-trip" && errors.return && (
                  <p style={S.errorText}>{errors.return}</p>
                )}
              </div>

              <div ref={paxRef} style={{ minWidth: 0, position: "relative" }}>
                <TravelersLabel />
                <TravelersTrigger
                  paxSummary={paxSummary}
                  selectedCabinLabel={selectedCabinLabel}
                  showPax={showPax}
                  onClick={() => setShowPax((p) => !p)}
                  onKeyDown={paxKeyDown}
                />
                {showPax && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      left: "auto",
                      background: "#ffffff",
                      borderRadius: 16,
                      boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
                      zIndex: 300,
                      border: "1px solid #e2e8f0",
                      width: 320,
                      maxWidth: "calc(100vw - 32px)",
                      padding: 20,
                      boxSizing: "border-box",
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
                {errors.pax && <p style={S.errorText}>{errors.pax}</p>}
              </div>

              <SearchButton label="Search Flights" onClick={handleSearch} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
