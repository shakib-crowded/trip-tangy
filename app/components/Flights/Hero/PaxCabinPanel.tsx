import { S } from "./styles";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaxState {
  adults: number;
  children: number;
  infants: number;
}

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

// ─── Constants ────────────────────────────────────────────────────────────────

const CABIN_OPTIONS: { value: CabinClass; label: string }[] = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

// ─── Counter ──────────────────────────────────────────────────────────────────

interface CounterProps {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const Counter = ({ label, description, value, min, max, onChange }: CounterProps) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{label}</div>
      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{description}</div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button
        type="button"
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid #e5e7eb",
          background: value <= min ? "#f3f4f6" : "#ffffff",
          cursor: value <= min ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 600,
          color: value <= min ? "#d1d5db" : "#374151",
          transition: "all 0.15s ease",
          fontFamily: "inherit",
        }}
      >
        −
      </button>
      <span
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#111827",
          minWidth: 24,
          textAlign: "center",
        }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid #e5e7eb",
          background: value >= max ? "#f3f4f6" : "#ffffff",
          cursor: value >= max ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 600,
          color: value >= max ? "#d1d5db" : "#374151",
          transition: "all 0.15s ease",
          fontFamily: "inherit",
        }}
      >
        +
      </button>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

interface PaxCabinPanelProps {
  pax: PaxState;
  cabin: CabinClass;
  onPaxChange: (key: keyof PaxState, val: number) => void;
  onCabinChange: (cabin: CabinClass) => void;
  error: string;
  onDone: () => void;
}

export const PaxCabinPanel = ({
  pax,
  cabin,
  onPaxChange,
  onCabinChange,
  error,
  onDone,
}: PaxCabinPanelProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
    {/* Cabin class */}
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "rgba(10,42,107,0.55)",
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          marginBottom: 8,
        }}
      >
        Cabin Class
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {CABIN_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onCabinChange(opt.value)}
            style={{
              padding: "6px 8px",
              borderRadius: 8,
              border: "2px solid",
              borderColor: cabin === opt.value ? "#f97316" : "#e5e7eb",
              background: cabin === opt.value ? "#fff7ed" : "#f9fafb",
              color: cabin === opt.value ? "#f97316" : "#374151",
              fontSize: 11,
              fontWeight: cabin === opt.value ? 700 : 500,
              cursor: "pointer",
              textAlign: "center",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>

    <hr style={S.divider} />

    {/* Passenger counters */}
    <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 14 }}>
      <Counter
        label="Adults"
        description="Age 12+"
        value={pax.adults}
        min={1}
        max={9}
        onChange={(v) => onPaxChange("adults", v)}
      />
      <hr style={S.divider} />
      <Counter
        label="Children"
        description="Age 2–11"
        value={pax.children}
        min={0}
        max={8}
        onChange={(v) => onPaxChange("children", v)}
      />
      <hr style={S.divider} />
      <Counter
        label="Infants"
        description="Under 2 · on lap"
        value={pax.infants}
        min={0}
        max={pax.adults}
        onChange={(v) => onPaxChange("infants", v)}
      />
    </div>

    {error && (
      <p style={{ fontSize: 11, color: "#ef4444", marginTop: 10, marginBottom: 0 }}>
        {error}
      </p>
    )}

    <button type="button" onClick={onDone} style={S.doneBtn}>
      Done
    </button>
  </div>
);