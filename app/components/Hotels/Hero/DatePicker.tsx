// DatePicker.tsx

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const MOBILE_BREAKPOINT = 640;
const TODAY_STR = new Date().toISOString().split("T")[0];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// ─── Utilities ────────────────────────────────────────────────────────────────

const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const fmtLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
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

const IconCalendar = ({ color }: { color: string }) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ─── Nav Button ───────────────────────────────────────────────────────────────

const NavButton = ({
  onClick,
  children,
  "aria-label": ariaLabel,
}: {
  onClick: () => void;
  children: React.ReactNode;
  "aria-label": string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      border: "1px solid #e5e7eb",
      background: "#f9fafb",
      cursor: "pointer",
      fontFamily: "inherit",
      color: "#374151",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: 600,
      transition: "all 0.15s ease",
      flexShrink: 0,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#f3f4f6";
      e.currentTarget.style.borderColor = "#d1d5db";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#f9fafb";
      e.currentTarget.style.borderColor = "#e5e7eb";
    }}
  >
    {children}
  </button>
);

// ─── Props ────────────────────────────────────────────────────────────────────

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  hasError?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DatePicker = ({ label, value, onChange, minDate, hasError }: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [view, setView] = useState<Date>(() =>
    value ? parseLocalDate(value) : new Date()
  );
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useOutsideClick(ref, close);

  useEffect(() => {
    if (!value) return;
    setView(parseLocalDate(value));
  }, [value]);

  const displayValue = value
    ? parseLocalDate(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const firstDay = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
  const effectiveMin = minDate ?? TODAY_STR;

  const prevMonth = () => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  const nextMonth = () => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));

  const triggerBorderColor = hasError
    ? "#ef4444"
    : open
    ? "#f97316"
    : isHovered
    ? "#9ca3af"
    : "#e2e8f0";

  const triggerBoxShadow = open ? "0 0 0 3px rgba(249,115,22,0.15)" : "none";

  const isMobile = typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0, position: "relative" }}>
      {/* Label */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(255,255,255,0.75)",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          userSelect: "none",
        }}
      >
        {label}
      </span>

      {/* Trigger */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`${label}: ${displayValue || "Select date"}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e: React.KeyboardEvent) =>
          (e.key === "Enter" || e.key === " ") && setOpen((o) => !o)
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          background: "#ffffff",
          borderRadius: 12,
          padding: "0 14px",
          fontSize: 14,
          fontWeight: 500,
          color: displayValue ? "#1e293b" : "#9ca3af",
          border: `2px solid ${triggerBorderColor}`,
          boxShadow: triggerBoxShadow,
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
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {displayValue || "Select date"}
        </span>
        <IconCalendar color={displayValue ? "#f97316" : "#9ca3af"} />
      </div>

      {/* Calendar dropdown */}
      {open && (
        <>
          {/* Backdrop for mobile */}
          {isMobile && (
            <div
              onClick={close}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                zIndex: 9998,
              }}
            />
          )}

          {/* Dropdown - use fixed positioning on mobile for centering */}
          <div
            style={{
              position: isMobile ? "fixed" : "absolute",
              // On mobile: center in viewport
              ...(isMobile 
                ? {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }
                : {
                    top: "calc(100% + 8px)",
                    left: 0,
                  }
              ),
              width: isMobile ? "calc(100vw - 32px)" : "auto",
              maxWidth: isMobile ? "calc(100vw - 32px)" : "none",
              minWidth: isMobile ? "unset" : 300,
              maxHeight: isMobile ? "calc(100vh - 64px)" : "none",
              overflowY: isMobile ? "auto" : "visible",
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 20px 60px -12px rgba(0,0,0,0.25)",
              zIndex: 9999,
              border: "1px solid #e2e8f0",
              padding: isMobile ? "16px 16px 20px" : "20px 20px 24px",
              boxSizing: "border-box",
            }}
          >
            {/* Month navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: isMobile ? 16 : 20,
                padding: "0 4px",
                gap: 8,
              }}
            >
              <NavButton onClick={prevMonth} aria-label="Previous month">‹</NavButton>
              <span style={{ 
                fontSize: isMobile ? 14 : 15, 
                fontWeight: 600, 
                color: "#111827", 
                letterSpacing: "0.3px",
                textAlign: "center",
              }}>
                {MONTHS[view.getMonth()]} {view.getFullYear()}
              </span>
              <NavButton onClick={nextMonth} aria-label="Next month">›</NavButton>
            </div>

            {/* Day headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                marginBottom: isMobile ? 4 : 8,
                gap: 2,
              }}
            >
              {DAY_HEADERS.map((d) => (
                <div
                  key={d}
                  style={{
                    textAlign: "center",
                    fontSize: isMobile ? 10 : 12,
                    fontWeight: 600,
                    color: "#9ca3af",
                    padding: isMobile ? "4px 0" : "6px 0",
                    letterSpacing: "0.3px",
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: isMobile ? 2 : 4,
                padding: "2px",
              }}
            >
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`pad-${i}`} style={{ height: isMobile ? 36 : 38 }} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = fmtLocal(new Date(view.getFullYear(), view.getMonth(), day));
                const isSelected = dateStr === value;
                const isToday = dateStr === TODAY_STR;
                const disabled = dateStr < effectiveMin;

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      onChange(dateStr);
                      setOpen(false);
                    }}
                    aria-label={dateStr}
                    aria-pressed={isSelected}
                    style={{
                      height: isMobile ? 36 : 38,
                      width: "100%",
                      borderRadius: "50%",
                      fontSize: isMobile ? 12 : 13,
                      fontWeight: isSelected ? 700 : isToday ? 600 : 400,
                      border: "none",
                      background: isSelected ? "#f97316" : "transparent",
                      color: isSelected
                        ? "#fff"
                        : isToday
                        ? "#f97316"
                        : disabled
                        ? "#d1d5db"
                        : "#374151",
                      cursor: disabled ? "not-allowed" : "pointer",
                      outline: isToday && !isSelected ? "2px solid #f97316" : "none",
                      outlineOffset: "-2px",
                      fontFamily: "inherit",
                      transition: "all 0.15s ease",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (!disabled && !isSelected) {
                        e.currentTarget.style.background = "#fef3c7";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!disabled && !isSelected) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div
              style={{
                marginTop: isMobile ? 12 : 16,
                paddingTop: isMobile ? 10 : 12,
                borderTop: "1px solid #f3f4f6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  const today = TODAY_STR;
                  if (!minDate || today >= minDate) {
                    onChange(today);
                    setOpen(false);
                  }
                }}
                style={{
                  fontSize: isMobile ? 12 : 13,
                  fontWeight: 500,
                  color: "#f97316",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: isMobile ? "4px 10px" : "6px 12px",
                  borderRadius: 6,
                  fontFamily: "inherit",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fef3c7")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Today
              </button>
              <button
                type="button"
                onClick={close}
                style={{
                  fontSize: isMobile ? 12 : 13,
                  fontWeight: 500,
                  color: "#6b7280",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: isMobile ? "4px 10px" : "6px 12px",
                  borderRadius: 6,
                  fontFamily: "inherit",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};