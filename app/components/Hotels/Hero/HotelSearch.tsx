import { useState, useRef, useCallback, useEffect } from "react";
import { DatePicker } from "@/app/components/Hotels/Hero/DatePicker";
import { BookingModal } from "@/app/components/Hotels/BookingModal";

const TODAY_STR = (() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
})();

const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
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

const IconUser = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconX = ({ size = 12, color = "currentColor" }: IconProps) => (
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
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

// Consistent field styles
const FIELD_STYLES = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
    minWidth: 0,
  },
  label: {
    fontSize: "10px",
    fontWeight: 600,
    color: "#fff",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "2px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box" as const,
    background: "#ffffff",
    borderRadius: 12,
    padding: "16px 10px 16px 10px",
    fontSize: 14,
    fontWeight: 500,
    color: "#1e293b",
    border: "1px solid #e2e8f0",
    outline: "none",
    transition: "all 0.15s ease",
    fontFamily: "inherit",
    // height: "72px",
  },
  trigger: {
    width: "100%",
    boxSizing: "border-box" as const,
    background: "#ffffff",
    borderRadius: 12,
    padding: "16px 10px 16px 10px",
    fontSize: 14,
    fontWeight: 500,
    color: "#1e293b",
    border: "1px solid #e2e8f0",
    outline: "none",
    transition: "all 0.15s ease",
    cursor: "pointer",
    userSelect: "none" as const,
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    fontSize: 11,
    color: "#ef4444",
    marginTop: 4,
    marginLeft: 4,
    fontWeight: 500,
  },
};
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

const Counter = ({ label, description, value, onChange, min = 0, max = 9 }: CounterProps) => {
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{label}</div>
        {description && <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>{description}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          style={btnStyle(value <= min)}
        >
          &#8722;
        </button>
        <span style={{ width: 20, textAlign: "center", fontSize: 14, fontWeight: 700, color: "#111827" }}>{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          style={btnStyle(value >= max)}
        >
          &#43;
        </button>
      </div>
    </div>
  );
};

interface Hotel {
  hotel_name: string;
  city_name: string;
  country_name: string;
}

interface HotelSuggestion {
  hotel: Hotel;
  displayText: string;
  matchType: "hotel" | "city" | "country";
}

interface ValidationErrors {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}

export const HotelSearch = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [suggestions, setSuggestions] = useState<HotelSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuests, setShowGuests] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showBookingModal, setShowBookingModal] = useState(false);

  const destinationRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  useOutsideClick(destinationRef, () => setShowSuggestions(false));
  useOutsideClick(guestsRef, () => setShowGuests(false));

  const totalGuests = adults + children;
  const maxGuests = 20;
  const maxRooms = 10;

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      try {
        const response = await fetch("/data/hotels.json");
        if (!response.ok) throw new Error("Failed to load hotels");
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error loading hotels:", error);
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, []);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const checkInStr = today.toISOString().split("T")[0];
    const checkOutStr = tomorrow.toISOString().split("T")[0];
    setCheckIn(checkInStr);
    setCheckOut(checkOutStr);
  }, []);

  const getInitialSuggestions = useCallback((): HotelSuggestion[] => {
    if (!hotels.length) return [];
    const initialSuggestions: HotelSuggestion[] = [];
    const seen = new Set<string>();
    for (const hotel of hotels) {
      if (!seen.has(hotel.hotel_name) && initialSuggestions.length < 7) {
        seen.add(hotel.hotel_name);
        initialSuggestions.push({ hotel, displayText: hotel.hotel_name, matchType: "hotel" });
      }
    }
    return initialSuggestions;
  }, [hotels]);

  const validateDestination = (value: string): string => {
    if (!value.trim()) return "Destination is required";
    if (value.trim().length < 2) return "Destination must be at least 2 characters";
    return "";
  };

  const validateCheckIn = (value: string): string => {
    if (!value) return "Check-in date is required";
    if (value < TODAY_STR) return "Check-in date cannot be in the past";
    return "";
  };

  const validateCheckOut = (value: string): string => {
    if (!value) return "Check-out date is required";
    if (checkIn && value <= checkIn) return "Check-out must be after check-in";
    return "";
  };

  const validateGuests = (adultsCount: number, childrenCount: number, roomsCount: number): string => {
    if (adultsCount < 1) return "At least 1 adult is required";
    if (adultsCount + childrenCount > maxGuests) return `Maximum ${maxGuests} guests allowed per booking`;
    if (roomsCount < 1) return "At least 1 room is required";
    if (roomsCount > maxRooms) return `Maximum ${maxRooms} rooms allowed`;
    if (roomsCount > adultsCount + childrenCount) return "Number of rooms cannot exceed number of guests";
    return "";
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors = {
      destination: validateDestination(destination),
      checkIn: validateCheckIn(checkIn),
      checkOut: validateCheckOut(checkOut),
      guests: validateGuests(adults, children, rooms),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const normalizeText = (text: string): string =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  const searchHotels = useCallback((searchTerm: string): HotelSuggestion[] => {
    if (!searchTerm.trim() || !hotels.length) return [];
    const normalizedSearch = normalizeText(searchTerm);
    const results: HotelSuggestion[] = [];
    const seen = new Set<string>();

    hotels.forEach((hotel) => {
      if (normalizeText(hotel.hotel_name).includes(normalizedSearch) && !seen.has(hotel.hotel_name)) {
        seen.add(hotel.hotel_name);
        results.push({ hotel, displayText: hotel.hotel_name, matchType: "hotel" });
      }
    });
    hotels.forEach((hotel) => {
      if (normalizeText(hotel.city_name).includes(normalizedSearch) && !seen.has(hotel.city_name)) {
        seen.add(hotel.city_name);
        results.push({ hotel, displayText: hotel.city_name, matchType: "city" });
      }
    });
    hotels.forEach((hotel) => {
      if (normalizeText(hotel.country_name).includes(normalizedSearch) && !seen.has(hotel.country_name)) {
        seen.add(hotel.country_name);
        results.push({ hotel, displayText: hotel.country_name, matchType: "country" });
      }
    });

    return results.slice(0, 10);
  }, [hotels]);

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);
    setSelectedHotel(null);
    if (value.trim()) {
      setSuggestions(searchHotels(value));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion: HotelSuggestion) => {
    if (suggestion.matchType === "hotel") {
      setDestination(suggestion.hotel.hotel_name);
      setSelectedHotel(suggestion.hotel);
    } else if (suggestion.matchType === "city") {
      setDestination(suggestion.hotel.city_name);
      setSelectedHotel(null);
    } else {
      setDestination(suggestion.hotel.country_name);
      setSelectedHotel(null);
    }
    setShowSuggestions(false);
  };

  const handleClearDestination = () => {
    setDestination("");
    setSelectedHotel(null);
    setSuggestions([]);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    if (!destination.trim() && !suggestions.length && hotels.length) {
      setSuggestions(getInitialSuggestions());
      setShowSuggestions(true);
    } else if (destination.trim() && suggestions.length) {
      setShowSuggestions(true);
    } else if (destination.trim() && !suggestions.length) {
      setSuggestions(searchHotels(destination));
      setShowSuggestions(true);
    }
  };

  const handleSearch = () => {
    if (validateAll()) {
      setShowBookingModal(true);
    }
  };

  // Dropdown styles
  const dropdownStyle = {
    position: "absolute" as const,
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.2)",
    zIndex: 300,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    maxHeight: 320,
    overflowY: "auto" as const,
  };

  return (
    <>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* Destination field */}
        <div ref={destinationRef} style={{ ...FIELD_STYLES.container, flex: "2 1 240px", position: "relative" }}>
          <span style={FIELD_STYLES.label}>Destination</span>
          <div style={{ position: "relative" }}>
              <input
              type="text"
              placeholder="Search by hotel name, city, or country"
              value={destination}
              onChange={handleDestinationChange}
              onFocus={handleInputFocus}
              style={{
                ...FIELD_STYLES.input,
                paddingRight: destination ? 36 : 14,
                cursor: loading ? "wait" : "text",
                borderColor: errors.destination ? "#ef4444" : "#e2e8f0",
              }}
              disabled={loading}
            />
            {destination && (
              <button
                type="button"
                onClick={handleClearDestination}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#e5e7eb",
                  border: "none",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                <IconX size={10} color="#6b7280" />
              </button>
            )}
          </div>

          {errors.destination && (
            <div style={FIELD_STYLES.errorText}>{errors.destination}</div>
          )}

          {loading && (
            <div style={{ ...dropdownStyle, padding: "14px 16px", color: "#6b7280", fontSize: 13 }}>
              Loading hotels...
            </div>
          )}

          {showSuggestions && !loading && suggestions.length > 0 && (
            <ul style={dropdownStyle}>
              {suggestions.map((suggestion, index) => (
                <li key={`${suggestion.hotel.hotel_name}-${suggestion.matchType}-${index}`} role="option">
                  <button
                    type="button"
                    onMouseDown={() => handleSelectSuggestion(suggestion)}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid #E5E7EB",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F4F6"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>
                      {suggestion.displayText}
                    </div>
                    {suggestion.matchType === "hotel" && (
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                        {suggestion.hotel.city_name}, {suggestion.hotel.country_name}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {showSuggestions && !loading && destination.trim() && suggestions.length === 0 && (
            <div style={{ ...dropdownStyle, padding: "14px 16px", color: "#6b7280", fontSize: 13 }}>
              No hotels found for &quot;{destination}&quot;
            </div>
          )}
        </div>

        {/* Check-in DatePicker */}
        <div style={{ flex: "1 1 160px" }}>
          <DatePicker 
            label="Check-in" 
            value={checkIn} 
            onChange={setCheckIn} 
            minDate={TODAY_STR}
            hasError={!!errors.checkIn}
          />
          {errors.checkIn && (
            <div style={FIELD_STYLES.errorText}>{errors.checkIn}</div>
          )}
        </div>

        {/* Check-out DatePicker */}
        <div style={{ flex: "1 1 160px" }}>
          <DatePicker 
            label="Check-out" 
            value={checkOut} 
            onChange={setCheckOut} 
            minDate={checkIn || TODAY_STR}
            hasError={!!errors.checkOut}
          />
          {errors.checkOut && (
            <div style={FIELD_STYLES.errorText}>{errors.checkOut}</div>
          )}
        </div>

        {/* Guests & Rooms */}
        <div ref={guestsRef} style={{ ...FIELD_STYLES.container, flex: "1 1 180px", position: "relative" }}>
          <span style={FIELD_STYLES.label}>Guests &amp; Rooms</span>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setShowGuests(!showGuests)}
            onKeyDown={(e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && setShowGuests(!showGuests)}
            style={{
              ...FIELD_STYLES.trigger,
              borderColor: errors.guests ? "#ef4444" : "#e2e8f0",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 500, color: "#1e293b" }}>
              {totalGuests} Guest{totalGuests !== 1 ? "s" : ""}, {rooms} Room{rooms !== 1 ? "s" : ""}
            </span>
            <IconUser size={16} color="#9ca3af" />
          </div>

          {errors.guests && (
            <div style={FIELD_STYLES.errorText}>{errors.guests}</div>
          )}

          {showGuests && (
            <div style={{
              ...dropdownStyle,
              width: 320,
              left: "auto",
              right: 0,
              padding: 20,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Counter label="Adults" description="Age 12+" value={adults} min={1} max={maxGuests} onChange={setAdults} />
                <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: 0 }} />
                <Counter label="Children" description="Age 2-11" value={children} min={0} max={maxGuests - adults} onChange={setChildren} />
                <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: 0 }} />
                <Counter label="Rooms" value={rooms} min={1} max={maxRooms} onChange={setRooms} />
              </div>
              <button 
                type="button" 
                onClick={() => setShowGuests(false)} 
                style={{
                  width: "100%",
                  marginTop: 16,
                  background: "#f97316",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.15s ease",
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>

        <SearchButton label="Search Hotels" onClick={handleSearch} />
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        hotelDetails={{ destination, selectedHotel, checkIn, checkOut, adults, children, rooms, totalGuests }}
      />
    </>
  );
};