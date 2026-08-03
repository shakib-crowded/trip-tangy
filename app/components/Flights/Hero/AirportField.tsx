import {
  useState,
  useRef,
  useEffect,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AirportRecord {
  id: string;
  iata_code: string;
  name: string;
  municipality: string;
  iso_country: string;
}

export interface AirportFieldProps {
  label: string;
  placeholder: string;
  value: AirportRecord | null;
  onChange: (airport: AirportRecord | null) => void;
  exclude?: AirportRecord | null;
  airports: AirportRecord[];
  loading?: boolean;
  icon: React.ReactNode;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

const airportDisplayLabel = (airport: AirportRecord): string =>
  `${airport.municipality} (${airport.iata_code})`;

const matchesAirport = (
  airport: AirportRecord,
  searchTerm: string,
): boolean => {
  const term = searchTerm.toLowerCase().trim();
  return (
    airport.iata_code.toLowerCase().includes(term) ||
    airport.name.toLowerCase().includes(term) ||
    airport.municipality.toLowerCase().includes(term) ||
    airport.iso_country.toLowerCase().includes(term)
  );
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconX = ({ size, color }: { size: number; color: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Option Row ───────────────────────────────────────────────────────────────

const AirportOption = ({
  airport: a,
  onSelect,
}: {
  airport: AirportRecord;
  onSelect: (a: AirportRecord) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onMouseDown={(e: ReactMouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSelect(a);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 14px",
        background: hovered ? "#f3f4f6" : "transparent",
        border: "none",
        borderBottom: "1px solid #e5e7eb",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
        transition: "background 0.15s ease",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: hovered ? "#d1d5db" : "#4b5563",
          background: hovered ? "#000000" : "#e5e7eb",
          borderRadius: 6,
          padding: "2px 6px",
          minWidth: 40,
          textAlign: "center",
          flexShrink: 0,
          marginTop: 1,
          letterSpacing: "0.04em",
          transition: "all 0.15s ease",
        }}
      >
        {a.iata_code}
      </span>
      <span style={{ overflow: "hidden", flex: 1 }}>
        <span
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            color: "#111827",
          }}
        >
          {a.municipality}
        </span>
        <span
          style={{
            display: "block",
            fontSize: 11,
            color: "#6b7280",
            marginTop: 2,
          }}
        >
          {a.name}
        </span>
        <span
          style={{
            display: "block",
            fontSize: 10,
            color: "#9ca3af",
            marginTop: 2,
          }}
        >
          {a.iso_country}
        </span>
      </span>
    </button>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const AirportField = ({
  label,
  placeholder,
  value,
  onChange,
  exclude,
  airports,
  loading = false,
  icon,
}: AirportFieldProps) => {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState(value ? airportDisplayLabel(value) : "");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useOutsideClick(ref, close);

  useEffect(() => {
    setTerm(value ? airportDisplayLabel(value) : "");
  }, [value]);

  const handleFocus = () => {
    setOpen(true);
    if (value) {
      setTerm("");
      onChange(null);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!ref.current?.contains(document.activeElement)) setOpen(false);
    }, 150);
  };

  const filteredAirports =
    term.trim() === ""
      ? airports.slice(0, 12)
      : airports.filter((a) => matchesAirport(a, term)).slice(0, 12);

  const visibleAirports = exclude
    ? filteredAirports.filter((a) => a.iata_code !== exclude.iata_code)
    : filteredAirports;

  const handleSelect = (airport: AirportRecord) => {
    setTerm(airportDisplayLabel(airport));
    onChange(airport);
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setTerm("");
    onChange(null);
    setOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        minWidth: 0,
        position: "relative",
      }}
    >
      {/* Label */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(255,255,255,0.75)",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {icon}
        {label}
      </span>

      {/* Input wrapper */}
      <div style={{ position: "relative" }}>
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          value={term}
          autoComplete="off"
          disabled={loading}
          placeholder={loading ? "Loading airports…" : placeholder}
          style={{
            width: "100%",
            boxSizing: "border-box",
            background: "#ffffff",
            borderRadius: 12,
            padding: "0 14px",
            paddingRight: value ? 38 : 14,
            fontSize: 14,
            fontWeight: 500,
            color: "#1e293b",
            border: "2px solid #e2e8f0",
            outline: "none",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            cursor: "text",
            fontFamily: "inherit",
            height: 54,
            minHeight: 54,
          }}
          onChange={(e) => {
            setTerm(e.target.value);
            if (e.target.value === "") onChange(null);
            setOpen(true);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label={label}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="airport-listbox"
          aria-haspopup="listbox"
        />

        {value && (
          <button
            type="button"
            aria-label="Clear airport"
            onClick={handleClear}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "#e5e7eb",
              border: "none",
              borderRadius: "50%",
              width: 18,
              height: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d1d5db")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#e5e7eb")}
          >
            <IconX size={9} color="#6b7280" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && visibleAirports.length > 0 && (
        <ul
          role="listbox"
          aria-label={`${label} suggestions`}
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
            zIndex: 300,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            maxHeight: 280,
            overflowY: "auto",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {visibleAirports.map((a) => (
            <li
              key={a.id}
              role="option"
              aria-selected={value?.iata_code === a.iata_code}
            >
              <AirportOption airport={a} onSelect={handleSelect} />
            </li>
          ))}
        </ul>
      )}

      {open &&
        !loading &&
        visibleAirports.length === 0 &&
        term.trim().length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
              zIndex: 300,
              border: "1px solid #e2e8f0",
              padding: "14px 16px",
              color: "#6b7280",
              fontSize: 13,
            }}
          >
            No airports found for &ldquo;{term}&rdquo;
          </div>
        )}

      {open && loading && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
            zIndex: 300,
            border: "1px solid #e2e8f0",
            padding: "14px 16px",
            color: "#6b7280",
            fontSize: 13,
            textAlign: "center",
          }}
        >
          Loading airports...
        </div>
      )}
    </div>
  );
};
