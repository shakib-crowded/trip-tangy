"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { PaxState, CabinClass } from "../types";

// Define a simpler airport type for the booking modal
type BookingAirport = {
  iata_code: string;
  city: string;
  name?: string; // optional
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  flightDetails: {
    tripType: string;
    from: BookingAirport | null;
    to: BookingAirport | null;
    depart: string;
    returnD?: string;
    pax: PaxState;
    cabin: CabinClass;
  };
}

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  specialRequest: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1.5px solid #e5e7eb",
  fontSize: 14,
  color: "#111827",
  background: "#f9fafb",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
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

// ─── Enhanced Input Component ────────────────────────────────────────────────

const FocusableInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  textarea = false,
  rows = 3,
  icon,
  required = false,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
  rows?: number;
  icon?: React.ReactNode;
  required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const style = {
    ...inputStyle,
    ...(focused ? inputFocusStyle : {}),
    ...(error ? { borderColor: "#ef4444", background: "#fef2f2" } : {}),
    ...(icon ? { paddingLeft: 42 } : {}),
  };

  return (
    <div>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: error ? "#ef4444" : focused ? "#f97316" : "#9ca3af",
              transition: "color 0.15s",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            {icon}
          </div>
        )}
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
      </div>
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconUser = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconPhone = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconEmail = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconMessage = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// ─── Flight Summary Card ──────────────────────────────────────────────────────

const FlightSummaryCard = ({
  details,
}: {
  details: BookingModalProps["flightDetails"];
}) => {
  const { from, to, depart, returnD, tripType, cabin, pax } = details;

  const paxSummary = [
    `${pax.adults} Adult${pax.adults !== 1 ? "s" : ""}`,
    pax.children > 0 &&
      `${pax.children} Child${pax.children !== 1 ? "ren" : ""}`,
    pax.infants > 0 && `${pax.infants} Infant${pax.infants !== 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
        borderRadius: 12,
        padding: "14px 16px",
        border: "1px solid #fed7aa",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Route */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              background: "#f97316",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {from?.iata_code ?? "—"}
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
          <div
            style={{
              background: "#f97316",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {to?.iata_code ?? "—"}
          </div>
        </div>

        {/* Dates */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          <span> {depart}</span>
          {tripType === "round-trip" && returnD && (
            <>
              <span style={{ color: "#d1d5db" }}>→</span>
              <span>{returnD}</span>
            </>
          )}
        </div>
      </div>

      {/* Bottom row: Pax + Cabin */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 8,
          paddingTop: 8,
          borderTop: "1px solid #fed7aa",
          fontSize: 12,
          color: "#6b7280",
          flexWrap: "wrap",
        }}
      >
        <span>{paxSummary}</span>
        <span style={{ color: "#d1d5db" }}>|</span>
        <span
          style={{
            color: "#f97316",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {cabin.replace("_", " ")}
        </span>
        <span style={{ color: "#d1d5db" }}>|</span>
        <span style={{ textTransform: "capitalize" }}>{tripType}</span>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const BookingModal = ({
  isOpen,
  onClose,
  flightDetails,
}: BookingModalProps) => {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    phone: "",
    email: "",
    specialRequest: "",
  });
  const [errors, setErrors] = useState<Partial<BookingForm>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset on open
  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => {
      setForm({ name: "", phone: "", email: "", specialRequest: "" });
      setErrors({});
      setStatus("idle");
      setErrorMsg("");
    });
  }, [isOpen]);

  const set = (field: keyof BookingForm) => (val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => {
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  const validate = (): boolean => {
    const e: Partial<BookingForm> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send-flight-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, flightDetails }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to submit booking.",
      );
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? 12 : 16,
        animation: "fadeIn 0.18s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .bm-close-btn:hover { background: #fee2e2 !important; color: #ef4444 !important; }
        .bm-submit-btn:hover:not(:disabled) { background: #ea6c0a !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(249,115,22,0.45) !important; }
        .bm-submit-btn:active:not(:disabled) { transform: translateY(0); }
        .bm-input:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.12); }
      `}</style>

      <div
        ref={modalRef}
        style={{
          background: "#fff",
          borderRadius: isMobile ? 16 : 20,
          width: "100%",
          maxWidth: isMobile ? "100%" : 520,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
          animation: "slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)",
          margin: isMobile ? 0 : "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: isMobile ? "16px 16px 14px" : "24px 24px 20px",
            borderBottom: "1px solid #f3f4f6",
            display: "flex",
            alignItems: isMobile ? "flex-start" : "flex-start",
            justifyContent: "space-between",
            gap: 12,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: isMobile ? 32 : 36,
                  height: isMobile ? 32 : 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#f97316,#fb923c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(249,115,22,0.35)",
                  flexShrink: 0,
                }}
              >
                <svg
                  width={isMobile ? 16 : 18}
                  height={isMobile ? 16 : 18}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: isMobile ? 16 : 18,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Complete Your Booking
              </h2>
            </div>

            {/* Flight summary */}
            <FlightSummaryCard details={flightDetails} />
          </div>

          <button
            className="bm-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: isMobile ? 28 : 32,
              height: isMobile ? 28 : 32,
              borderRadius: 8,
              border: "none",
              background: "#f3f4f6",
              color: "#6b7280",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.15s, color 0.15s",
              alignSelf: isMobile ? "flex-end" : "flex-start",
              marginTop: isMobile ? 0 : 0,
            }}
          >
            <svg
              width={isMobile ? 14 : 16}
              height={isMobile ? 14 : 16}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 6 6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: isMobile ? 16 : 24 }}>
          {status === "success" ? (
            <div
              style={{
                textAlign: "center",
                padding: isMobile ? "24px 8px" : "32px 16px",
              }}
            >
              <div
                style={{
                  width: isMobile ? 56 : 64,
                  height: isMobile ? 56 : 64,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#f97316,#fb923c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
                }}
              >
                <svg
                  width={isMobile ? 24 : 28}
                  height={isMobile ? 24 : 28}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20 6 9 17l-5-5"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: isMobile ? 18 : 20,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Booking Submitted! 🎉
              </h3>
              <p
                style={{
                  margin: "0 0 24px",
                  color: "#6b7280",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                We&apos;ve received your request and sent a confirmation to{" "}
                <strong>{form.email}</strong>. Our team will reach out shortly.
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: "10px 28px",
                  borderRadius: 10,
                  border: "none",
                  background: "#f97316",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ea6c0a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#f97316")
                }
              >
                Done
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <FocusableInput
                label="Full Name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={set("name")}
                error={errors.name}
                icon={<IconUser />}
                required
              />

              <FocusableInput
                label="Phone Number"
                type="tel"
                placeholder={
                  isMobile ? "+91 98765 43210" : "Enter your phone number"
                }
                value={form.phone}
                onChange={set("phone")}
                error={errors.phone}
                icon={<IconPhone />}
                required
              />

              <FocusableInput
                label="Email Address"
                type="email"
                placeholder={
                  isMobile ? "your@email.com" : "Enter your email address"
                }
                value={form.email}
                onChange={set("email")}
                error={errors.email}
                icon={<IconEmail />}
                required
              />

              <FocusableInput
                label="Special Requests (Optional)"
                placeholder="Wheelchair assistance, vegetarian meal, window seat…"
                value={form.specialRequest}
                onChange={set("specialRequest")}
                textarea
                rows={isMobile ? 2 : 3}
                icon={<IconMessage />}
              />

              {status === "error" && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#dc2626",
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>⚠️</span>
                  {errorMsg}
                </div>
              )}

              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 11,
                  color: "#15803d",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>🔒</span> Your information is secure and will only be used
                for booking purposes.
              </div>

              <button
                className="bm-submit-btn"
                onClick={handleSubmit}
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  padding: isMobile ? "14px" : "13px",
                  borderRadius: 12,
                  border: "none",
                  background: status === "loading" ? "#fdba74" : "#f97316",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: isMobile ? 15 : 15,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 4,
                }}
              >
                {status === "loading" ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ animation: "spin 0.8s linear infinite" }}
                    >
                      <style>
                        {
                          "@keyframes spin { to { transform: rotate(360deg); } }"
                        }
                      </style>
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="3"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                    Confirm Booking Request
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
