import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface HotelDetails {
  destination: string;
  selectedHotel: {
    hotel_name: string;
    city_name: string;
    country_name: string;
  } | null;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  totalGuests: number;
}

interface HotelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelDetails: HotelDetails;
}

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  specialRequest: string;
}

// ─── Shared sub-components (same as FlightBookingModal) ───────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1.5px solid #e5e7eb",
  fontSize: 14,
  color: "#111827",
  background: "#f9fafb",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const inputFocusStyle: React.CSSProperties = {
  borderColor: "#f97316",
  boxShadow: "0 0 0 3px rgba(249,115,22,0.12)",
  background: "#fff",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#6b7280",
  marginBottom: 6,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const errorStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#ef4444",
  marginTop: 4,
};

const FocusableInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  textarea = false,
  rows = 3,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const style = {
    ...inputStyle,
    ...(focused ? inputFocusStyle : {}),
    ...(error ? { borderColor: "#ef4444" } : {}),
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...style, resize: "vertical", minHeight: 80 }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={style}
        />
      )}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

// ─── Night count helper ────────────────────────────────────────────────────────
function getNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export const BookingModal = ({ isOpen, onClose, hotelDetails }: HotelBookingModalProps) => {
  const [form, setForm] = useState<BookingForm>({ name: "", phone: "", email: "", specialRequest: "" });
  const [errors, setErrors] = useState<Partial<BookingForm>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset on open
  useEffect(() => {
    if (!isOpen) return;

    // Schedule after paint to avoid react-hooks/set-state-in-effect.
    requestAnimationFrame(() => {
      setForm({ name: "", phone: "", email: "", specialRequest: "" });
      setErrors({});
      setStatus("idle");
      setErrorMsg("");
    });
  }, [isOpen]);

  const set = (field: keyof BookingForm) => (val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => { const next = { ...e }; delete next[field]; return next; });
  };

  const validate = (): boolean => {
    const e: Partial<BookingForm> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send-hotel-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, hotelDetails }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit booking.");
    }
  };

  const { destination, selectedHotel, checkIn, checkOut, adults, children, rooms } = hotelDetails;
  const nights = getNights(checkIn, checkOut);
  const guestSummary = [
    `${adults} Adult${adults !== 1 ? "s" : ""}`,
    children > 0 && `${children} Child${children !== 1 ? "ren" : ""}`,
  ].filter(Boolean).join(", ");

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16, animation: "hmFadeIn 0.18s ease",
      }}
    >
      <style>{`
        @keyframes hmFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hmSlideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .hm-close-btn:hover  { background: #fee2e2 !important; color: #ef4444 !important; }
        .hm-submit-btn:hover:not(:disabled) { background: #ea6c0a !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(249,115,22,0.45) !important; }
        .hm-submit-btn:active:not(:disabled) { transform: translateY(0); }
      `}</style>

      <div
        style={{
          background: "#fff", borderRadius: 20, width: "100%", maxWidth: 520,
          maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          animation: "hmSlideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* ── Header ── */}
        <div style={{
          padding: "24px 24px 20px",
          borderBottom: "1px solid #f3f4f6",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
        }}>
          <div style={{ minWidth: 0 }}>
            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: "linear-gradient(135deg,#f97316,#fb923c)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(249,115,22,0.35)",
              }}>
                {/* Hotel building icon */}
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V12h6v9M9 7h.01M12 7h.01M15 7h.01M9 10h.01M15 10h.01" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#111827" }}>Complete Your Booking</h2>
            </div>

            {/* Hotel summary pill */}
            <div style={{
              display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 5,
              background: "#fff7ed", border: "1px solid #fed7aa",
              borderRadius: 8, padding: "6px 10px", fontSize: 13, maxWidth: "100%",
            }}>
              {/* Hotel / destination name */}
              <span style={{ fontWeight: 700, color: "#f97316", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>
                {selectedHotel ? selectedHotel.hotel_name : destination}
              </span>

              {selectedHotel && (
                <>
                  <span style={{ color: "#d1d5db" }}>·</span>
                  <span style={{ color: "#6b7280", whiteSpace: "nowrap" }}>
                    {selectedHotel.city_name}
                  </span>
                </>
              )}

              <span style={{ color: "#d1d5db" }}>·</span>

              {/* Dates */}
              <span style={{ color: "#6b7280", whiteSpace: "nowrap" }}>
                {checkIn} → {checkOut}
              </span>

              <span style={{ color: "#d1d5db" }}>·</span>

              {/* Nights */}
              <span style={{ color: "#f97316", fontWeight: 600, whiteSpace: "nowrap" }}>
                {nights} night{nights !== 1 ? "s" : ""}
              </span>

              <span style={{ color: "#d1d5db" }}>·</span>

              {/* Guests + Rooms */}
              <span style={{ color: "#6b7280", whiteSpace: "nowrap" }}>
                {guestSummary} · {rooms} room{rooms !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            className="hm-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: 32, height: 32, borderRadius: 8, border: "none",
              background: "#f3f4f6", color: "#6b7280", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.15s, color 0.15s",
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: 24 }}>
          {status === "success" ? (
            /* ── Success state ── */
            <div style={{ textAlign: "center", padding: "32px 16px" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg,#f97316,#fb923c)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
              }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#111827" }}>Booking Submitted!</h3>
              <p style={{ margin: "0 0 24px", color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
                We&apos;ve received your request and sent a confirmation to{" "}
                <strong>{form.email}</strong>. Our team will reach out shortly.
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: "10px 28px", borderRadius: 10, border: "none",
                  background: "#f97316", color: "#fff", fontWeight: 600,
                  fontSize: 14, cursor: "pointer",
                }}
              >
                Done
              </button>
            </div>
          ) : (
            /* ── Form state ── */
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <FocusableInput label="Full Name" placeholder="Your Name" value={form.name} onChange={set("name")} error={errors.name} />
              <FocusableInput label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} error={errors.phone} />
              <FocusableInput label="Email Address" type="email" placeholder="yourname@example.com" value={form.email} onChange={set("email")} error={errors.email} />
              <FocusableInput
                label="Special Requests (Optional)"
                placeholder="Early check-in, non-smoking room, extra pillows, anniversary setup…"
                value={form.specialRequest}
                onChange={set("specialRequest")}
                textarea
                rows={3}
              />

              {status === "error" && (
                <div style={{
                  padding: "10px 14px", borderRadius: 10,
                  background: "#fef2f2", border: "1px solid #fecaca",
                  color: "#dc2626", fontSize: 13,
                }}>
                  {errorMsg}
                </div>
              )}

              <button
                className="hm-submit-btn"
                onClick={handleSubmit}
                disabled={status === "loading"}
                style={{
                  width: "100%", padding: "13px", borderRadius: 12, border: "none",
                  background: status === "loading" ? "#fdba74" : "#f97316",
                  color: "#fff", fontWeight: 700, fontSize: 15,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: "all 0.2s", boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                {status === "loading" ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      style={{ animation: "spin 0.8s linear infinite" }}>
                      <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Submitting…
                  </>
                ) : "Confirm Booking Request"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};