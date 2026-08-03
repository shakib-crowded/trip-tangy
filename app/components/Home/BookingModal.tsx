"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import type { Destination } from "./PopularDestinations";

interface BookingModalProps {
  destination: Destination | null;
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type ValidatedField = "name" | "phone" | "email";

type FormErrors = Partial<Record<ValidatedField, string>>;

const INITIAL_FORM: FormState = { name: "", phone: "", email: "", message: "" };

// Same email pattern used by the backend, so client + server agree.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Indian mobile numbers, optionally prefixed with +91, spaces/dashes allowed.
const PHONE_REGEX = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;

function validateField(field: ValidatedField, rawValue: string): string | undefined {
  const value = rawValue.trim();

  if (field === "name") {
    if (!value) return "Please enter your name.";
    if (value.length < 2) return "Name looks too short.";
    return undefined;
  }

  if (field === "phone") {
    if (!value) return "Please enter your phone number.";
    const normalized = value.replace(/[\s-]/g, "");
    if (!PHONE_REGEX.test(normalized)) return "Enter a valid 10-digit phone number.";
    return undefined;
  }

  if (!value) return "Please enter your email.";
  if (!EMAIL_REGEX.test(value)) return "Enter a valid email address.";
  return undefined;
}

export default function BookingModal({ destination, onClose }: BookingModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ValidatedField, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);

  const isOpen = !!destination;

  // Reset everything whenever a (new) destination is opened.
  useEffect(() => {
    if (!isOpen) return;
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setServerError("");
  }, [destination?.id, isOpen]);

  // Lock background scroll, close on Escape, focus the first field.
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const focusTimer = setTimeout(() => firstInputRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !destination) return null;

  const handleChange =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));

      if ((field === "name" || field === "phone" || field === "email") && touched[field]) {
        setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
      }
    };

  const handleBlur = (field: ValidatedField) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field]) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: FormErrors = {
      name: validateField("name", form.name),
      phone: validateField("phone", form.phone),
      email: validateField("email", form.email),
    };
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true });

    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/send-holiday-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          specialRequest: form.message.trim() || undefined,
          holidayDetails: {
            destination: destination.name,
            duration: "",
            budget: "",
            travelers: 1,
          },
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0B1F3A]/70 backdrop-blur-sm p-4 py-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative my-auto grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#0B1F3A] shadow-md transition-colors hover:bg-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Left: destination image */}
        <div className="relative h-48 min-h-56 md:h-full">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="mb-1 text-xs uppercase tracking-wide text-white/60">Booking request</p>
            <h3 className="font-playfair text-3xl font-bold leading-tight text-white">{destination.name}</h3>
            <p className="mt-1 text-lg font-semibold text-white">Starting From ₹{destination.price}</p>
          </div>
        </div>

        {/* Right: form (scrolls independently if content overflows) */}
        <div className="flex max-h-[80vh] flex-col">
          <div className="overflow-y-auto px-6 py-7 sm:px-8 sm:py-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent">
            {status === "success" ? (
              <div className="flex min-h-72 flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 id="booking-modal-title" className="font-playfair text-2xl font-bold text-[#0B1F3A]">
                  Request Sent
                </h3>
                <p className="mt-2 max-w-xs text-sm text-gray-600">
                  Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}! Our travel team will reach out to you
                  shortly about {destination.name}.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 cursor-pointer rounded-xl bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e47a00] active:scale-[0.98]"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 id="booking-modal-title" className="font-playfair text-2xl font-bold text-[#0B1F3A]">
                  Book Your Trip
                </h3>
                <p className="mb-6 mt-1 text-sm text-gray-500">
                  Fill in your details and our team will get back to you with a custom itinerary.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Destination — auto-filled, locked */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={destination.name}
                      disabled
                      readOnly
                      className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="booking-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Full Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      id="booking-name"
                      type="text"
                      value={form.name}
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      placeholder="Your Name"
                      aria-invalid={!!errors.name}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F3A] outline-none transition-colors focus:ring-2 focus:ring-secondary/40 ${
                        errors.name ? "border-red-400" : "border-gray-200 focus:border-secondary"
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="booking-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Phone Number <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      placeholder="98765 43210"
                      aria-invalid={!!errors.phone}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F3A] outline-none transition-colors focus:ring-2 focus:ring-secondary/40 ${
                        errors.phone ? "border-red-400" : "border-gray-200 focus:border-secondary"
                      }`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="booking-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Email <span className="text-secondary">*</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#0B1F3A] outline-none transition-colors focus:ring-2 focus:ring-secondary/40 ${
                        errors.email ? "border-red-400" : "border-gray-200 focus:border-secondary"
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Special message — optional */}
                  <div>
                    <label htmlFor="booking-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Special Message <span className="font-normal normal-case text-gray-400">(optional)</span>
                    </label>
                    <textarea
                      id="booking-message"
                      value={form.message}
                      onChange={handleChange("message")}
                      maxLength={500}
                      rows={3}
                      placeholder="Anything we should know — travel dates, preferences, occasions..."
                      className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#0B1F3A] outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/40"
                    />
                    <p className="mt-1 text-right text-[11px] text-gray-400">{form.message.length}/500</p>
                  </div>

                  {status === "error" && (
                    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-[#C9954C]/30 transition-all duration-200 hover:bg-[#e47a00] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" && (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    )}
                    {status === "submitting" ? "Sending Request..." : "Confirm Booking"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}