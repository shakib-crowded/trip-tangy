"use client";

import { useState, useEffect } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  packageTitle?: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  duration: string;
  budget: string;
  travelers: number;
  specialRequest: string;
}

const DURATION_OPTIONS = [
  { value: "3", label: "Weekend (3 days)" },
  { value: "5", label: "Short (5 days)" },
  { value: "7", label: "One week" },
  { value: "10", label: "10 days" },
  { value: "14", label: "Two weeks" },
  { value: "21", label: "3 weeks+" },
];

const BUDGET_OPTIONS = [
  { value: "budget", label: "Budget (under ₹30k)" },
  { value: "mid", label: "Mid-range (₹30k–₹80k)" },
  { value: "premium", label: "Premium (₹80k–₹1.5L)" },
  { value: "luxury", label: "Luxury (₹1.5L+)" },
];

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  duration: "",
  budget: "",
  travelers: 2,
  specialRequest: "",
};

export function BookingModal({
  isOpen,
  onClose,
  destination,
  packageTitle,
}: BookingModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reset form state whenever the modal is reopened
  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
      setStatus("idle");
      setErrorMsg(null);
    }
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof FormState,
    value: string | number
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setErrorMsg("Please fill in your name, phone, and email.");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/send-holiday-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          specialRequest: form.specialRequest.trim() || undefined,
          holidayDetails: {
            destination: packageTitle
              ? `${destination} — ${packageTitle}`
              : destination,
            duration: form.duration,
            budget: form.budget,
            travelers: form.travelers,
            isCustom: false,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to submit. Please try again."
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-1.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
        >
          <X className="h-4 w-4" />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center px-8 py-14 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-xl font-bold text-gray-900">
              Request sent!
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Our travel expert will get back to you shortly with the best
              available option for {destination}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-lg bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-gray-100 px-6 pb-5 pt-6 md:px-8">
              <p
                id="booking-modal-title"
                className="text-xs font-semibold uppercase tracking-wider text-secondary"
              >
                Request a quote
              </p>
              <h3 className="mt-1 text-xl font-bold text-gray-900">
                {packageTitle || destination}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Share your details and our travel expert will reach out with
                the best available option.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6 md:px-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-secondary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-secondary"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-secondary"
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Duration
                  </label>
                  <select
                    value={form.duration}
                    onChange={(e) => handleChange("duration", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-secondary"
                  >
                    <option value="">Any length</option>
                    {DURATION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    Budget
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-secondary"
                  >
                    <option value="">Any budget</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Number of travelers
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={form.travelers}
                  onChange={(e) =>
                    handleChange("travelers", Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-secondary"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Special requests{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.specialRequest}
                  onChange={(e) =>
                    handleChange("specialRequest", e.target.value)
                  }
                  className="w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-secondary"
                  placeholder="Anything specific we should know?"
                />
              </div>

              {errorMsg && (
                <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit request"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}