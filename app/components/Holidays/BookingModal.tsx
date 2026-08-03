
"use client";

import { useEffect, useState } from "react";
import { Destination } from "./types";

interface BookingModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

export function BookingModal({ destination, isOpen, onClose }: BookingModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  // Reset the form whenever the modal opens for a (new) destination
  useEffect(() => {
    if (isOpen) {
      setFullName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setErrors({});
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen, destination?.id]);

  // Mount animation
  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Auto-close shortly after a successful submission
  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => onClose(), 2500);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  if (!isOpen || !destination) return null;

  function validate(): boolean {
    const next: FormErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      next.fullName = "Please enter your full name.";
    }

    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (digits.length < 10 || digits.length > 13) {
      next.phone = "Enter a valid phone number.";
    }

    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!destination || status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/send-holiday-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          specialRequest: message.trim() || undefined,
          holidayDetails: {
            destination: `${destination.name}, ${destination.country}`,
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
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${destination.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 transition-all duration-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full w-9 h-9 flex items-center justify-center shadow transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left: destination photo */}
        <div className="relative h-56 md:h-full min-h-[220px]">
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <p className="text-xs uppercase tracking-wide text-white/80">{destination.country}</p>
            <h2 className="text-2xl font-extrabold leading-tight">{destination.name}</h2>
            <div className="flex items-center gap-3 mt-2 text-sm text-white/90">
              <span>{destination.duration}</span>
              <span>·</span>
              <span>₹{destination.price.toLocaleString("en-IN")} onwards</span>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="p-6 sm:p-7">
          {status === "success" ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Request sent!</h3>
              <p className="text-sm text-gray-500 mt-1.5 max-w-xs">
                Thanks, {fullName.split(" ")[0]}. Our travel team will reach out shortly to confirm your {destination.name} trip.
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold text-gray-900">Book Your Holiday</h3>
              <p className="text-sm text-gray-500 mt-1 mb-5">
                Fill in your details and we&apos;ll get back to you with a tailored itinerary.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Pre-selected destination */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={`${destination.name}, ${destination.country}`}
                    disabled
                    readOnly
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 cursor-not-allowed"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-gray-600 mb-1">
                    Full Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.fullName
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:ring-orange-100 focus:border-orange-400"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-1">
                    Phone Number <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.phone
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:ring-orange-100 focus:border-orange-400"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1">
                    Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.email
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:ring-orange-100 focus:border-orange-400"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Special message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-600 mb-1">
                    Special Message <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Anything specific you'd like us to know?"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2.5">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 text-sm transition-colors"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending request...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}