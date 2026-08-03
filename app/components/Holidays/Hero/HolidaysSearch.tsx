import { useState, useRef, useCallback, useEffect } from "react";
import { S } from "@/app/components/Flights/Hero/styles"
import destinationsData from "@/public/data/holidays.json";
import { HeroBookingModal } from "@/app/components/Holidays/Hero/HeroBookingModal";

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
interface IconProps {
  size?: number;
  color?: string;
}
const IconSearch = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const SearchButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
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
        gap: 6,
        background: hover ? "#ea6c10" : "#f97316",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        height: 44,
        padding: "0 16px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        cursor: "pointer",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 12px rgba(249,115,22,0.25)",
        transition: "background 0.15s",
        fontFamily: "inherit",
        flexShrink: 0,
        marginTop: "22px",
      }}
    >
      <IconSearch size={14} color="#fff" />
      {label}
    </button>
  );
};

interface CounterProps {
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const Counter = ({
  label,
  description,
  value,
  onChange,
  min = 0,
}: CounterProps) => {
  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "2px solid #f97316",
    background: "transparent",
    color: "#f97316",
    fontSize: 18,
    lineHeight: 1,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.35 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>
            {description}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          style={btnStyle(value <= min)}
        >
          &#8722;
        </button>
        <span
          style={{
            width: 20,
            textAlign: "center",
            fontSize: 14,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(value + 1)}
          style={btnStyle(false)}
        >
          &#43;
        </button>
      </div>
    </div>
  );
};

const SELECT_STYLE: React.CSSProperties = {
  ...S.input,
  appearance: "none",
  WebkitAppearance: "none",
  paddingRight: 32,
};

interface Destination {
  id: number;
  name: string;
  country: string;
  region: string;
  popularity?: number;
  imageUrl?: string;
  searchTags?: string[];
}

export const HolidaysSearch = () => {
  const [destination, setDestination] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [travelers, setTravelers] = useState<number>(2);
  const [showTravelers, setShowTravelers] = useState<boolean>(false);
  const travelersRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    travelersRef,
    useCallback(() => setShowTravelers(false), []),
  );

  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [isCustomDestination, setIsCustomDestination] =
    useState<boolean>(false);

  const filterDestinations = (value: string): Destination[] => {
    if (value.length < 2) return [];
    const lower = value.toLowerCase();
    return (destinationsData.destinations as Destination[])
      .filter(
        (dest) =>
          dest.name.toLowerCase().includes(lower) ||
          dest.country.toLowerCase().includes(lower) ||
          dest.searchTags?.some((tag) => tag.toLowerCase().includes(lower)),
      )
      .slice(0, 8);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);
    setIsCustomDestination(false);
    const filtered = filterDestinations(value);
    setSuggestions(filtered);
    setShowSuggestions(value.length >= 2);
  };

  const handleDestinationFocus = () => {
    setIsFocused(true);
    if (destination.length >= 2) {
      const filtered = filterDestinations(destination);
      setSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleDestinationBlur = () => {
    setIsFocused(false);
  };

  const handleSuggestionMouseDown = (
    e: React.MouseEvent,
    dest: Destination,
  ) => {
    e.preventDefault();
    selectDestination(dest);
  };

  const selectDestination = (dest: Destination) => {
    setDestination(`${dest.name}, ${dest.country}`);
    setSuggestions([]);
    setShowSuggestions(false);
    setIsCustomDestination(false);
  };

  const selectCustomDestination = () => {
    setIsCustomDestination(true);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const clearDestination = () => {
    setDestination("");
    setSuggestions([]);
    setShowSuggestions(false);
    setIsCustomDestination(false);
  };

  const handleSearch = () => {
    setShowBookingModal(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Destination */}
        <div
          style={{ ...S.fieldBase, flex: "2 1 200px", position: "relative" }}
        >
          <span style={S.label}>Where to?</span>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Destination or 'Anywhere'"
              value={destination}
              aria-label="Destination"
              aria-autocomplete="list"
              aria-expanded={undefined}
              autoComplete="off"
              onChange={handleDestinationChange}
              onFocus={handleDestinationFocus}
              onBlur={handleDestinationBlur}
              style={{
                ...S.input,
                borderColor: isFocused ? "#f97316" : undefined,
                paddingRight: destination ? 32 : undefined,
              }}
            />
            {/* Clear button — only shown when there's a value */}
            {destination && (
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  clearDestination();
                }}
                aria-label="Clear destination"
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  fontSize: 16,
                  lineHeight: 1,
                  padding: "0 2px",
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div
              role="listbox"
              aria-label="Destination suggestions"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                maxHeight: 300,
                overflowY: "auto",
                zIndex: 1000,
                marginTop: 4,
              }}
            >
              {suggestions.length > 0 ? (
                <>
                  {suggestions.map((dest) => (
                    <div
                      key={dest.id}
                      role="option"
                      aria-selected={
                        destination === `${dest.name}, ${dest.country}`
                      }
                      onMouseDown={(e) => handleSuggestionMouseDown(e, dest)}
                      style={{
                        padding: "12px 16px",
                        cursor: "pointer",
                        borderBottom: "1px solid #f3f4f6",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "#fff7ed")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "white")
                      }
                    >
                      <div style={{ fontWeight: 500, color: "#111827" }}>
                        {dest.name}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          marginTop: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span>
                          {dest.country} · {dest.region}
                        </span>
                        {dest.popularity != null && (
                          <span style={{ color: "#f97316" }}>
                            ★ {dest.popularity}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Add "Custom" option at the bottom */}
                  <div
                    role="option"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectCustomDestination();
                    }}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      borderTop: "1px solid #e5e7eb",
                      background: "#f9fafb",
                      transition: "background 0.15s",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "#fff7ed")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "#f9fafb")
                    }
                  >
                    <div>
                      <div style={{ fontWeight: 500, color: "#111827" }}>
                        {destination}
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>
                        Enter this as a custom destination
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Empty state with custom option
                <div>
                  <div
                    style={{
                      padding: "16px",
                      color: "#6b7280",
                      fontSize: 13,
                      textAlign: "center",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    No destinations found for &quot;{destination}&quot;
                  </div>
                  <div
                    role="option"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectCustomDestination();
                    }}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      background: "#f9fafb",
                      transition: "background 0.15s",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "#fff7ed")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "#f9fafb")
                    }
                  >
                    <div>
                      <div style={{ fontWeight: 500, color: "#111827" }}>
                        {destination}
                      </div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>
                        Enter this as a custom destination
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Duration */}
        <div style={{ ...S.fieldBase, flex: "1 1 140px" }}>
          <span style={S.label}>Duration</span>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={SELECT_STYLE}
            aria-label="Trip duration"
            onFocus={(e) => (e.currentTarget.style.borderColor = "#f97316")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
          >
            <option value="">Any length</option>
            <option value="3">Weekend (3 days)</option>
            <option value="5">Short (5 days)</option>
            <option value="7">One week</option>
            <option value="10">10 days</option>
            <option value="14">Two weeks</option>
            <option value="21">3 weeks+</option>
          </select>
        </div>

        {/* Budget */}
        <div style={{ ...S.fieldBase, flex: "1 1 160px" }}>
          <span style={S.label}>Budget (per person)</span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={SELECT_STYLE}
            aria-label="Budget per person"
            onFocus={(e) => (e.currentTarget.style.borderColor = "#f97316")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "transparent")}
          >
            <option value="">Any budget</option>
            <option value="budget">Budget (under ₹30k)</option>
            <option value="mid">Mid-range (₹30k–₹80k)</option>
            <option value="premium">Premium (₹80k–₹1.5L)</option>
            <option value="luxury">Luxury (₹1.5L+)</option>
          </select>
        </div>

        {/* Travelers */}
        <div ref={travelersRef} style={{ ...S.fieldBase, flex: "1 1 140px" }}>
          <span style={S.label}>Travelers</span>
          <div
            role="button"
            tabIndex={0}
            aria-label="Select number of travelers"
            aria-expanded={showTravelers}
            onClick={() => setShowTravelers((p) => !p)}
            onKeyDown={(e: React.KeyboardEvent) =>
              (e.key === "Enter" || e.key === " ") &&
              setShowTravelers((p) => !p)
            }
            onMouseEnter={(e: React.MouseEvent) => {
              if (!showTravelers)
                (e.currentTarget as HTMLElement).style.borderColor = "#f97316";
            }}
            onMouseLeave={(e: React.MouseEvent) => {
              if (!showTravelers)
                (e.currentTarget as HTMLElement).style.borderColor =
                  "transparent";
            }}
            style={S.trigger}
          >
            <span style={{ fontSize: 13, color: "#111827" }}>
              {travelers} Traveler{travelers !== 1 ? "s" : ""}
            </span>
          </div>

          {showTravelers && (
            <div
              style={{
                ...S.dropdown,
                width: 260,
                maxWidth: "calc(100vw - 32px)",
                padding: 20,
                right: 0,
                left: "auto",
              }}
            >
              <Counter
                label="Travelers"
                value={travelers}
                min={1}
                onChange={setTravelers}
              />
              <button
                type="button"
                onClick={() => setShowTravelers(false)}
                style={S.doneBtn}
              >
                Done
              </button>
            </div>
          )}
        </div>

        <SearchButton label="Find Holidays" onClick={handleSearch} />
      </div>

      {/* Booking Modal */}
      <HeroBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        holidayDetails={{
          destination,
          duration,
          budget,
          travelers,
          isCustom: isCustomDestination,
        }}
      />
    </>
  );
};
