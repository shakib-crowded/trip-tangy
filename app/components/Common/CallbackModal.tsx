"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Loader2, PhoneCall, X } from "lucide-react";

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string; // honeypot — must stay empty
}

type FormErrors = Partial<Record<"name" | "email" | "phone", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPhone(raw: string) {
  const digitCount = raw.replace(/[^\d]/g, "").length;
  return digitCount >= 10 && digitCount <= 15;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!isValidPhone(form.phone)) {
    errors.phone = "Enter a valid phone number (10–15 digits).";
  }

  return errors;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Portals need a browser document, so only render after mount
  useEffect(() => setMounted(true), []);

  // Reset to a clean form every time the modal is opened
  useEffect(() => {
    if (!isOpen) return;
    setForm(INITIAL_STATE);
    setErrors({});
    setStatus("idle");
    setServerError("");
    const raf = requestAnimationFrame(() => setVisible(true));
    const focusTimer = setTimeout(() => firstFieldRef.current?.focus(), 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(focusTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setVisible(false);
  }, [isOpen]);

  // Lock background scroll and allow Escape to close while open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const handleChange =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (field in errors && errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot: real users never fill this hidden field, bots usually do
    if (form.company) {
      setStatus("success");
      return;
    }

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/send-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
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

  const fieldClass = (hasError?: string) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-secondary/40 ${
      hasError ? "border-red-400" : "border-gray-300 focus:border-secondary"
    }`;

  return createPortal(
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-modal-title"
        className={`w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all duration-200 sm:p-8 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {status === "success" ? (
          <div className="flex flex-col items-center py-4 text-center">
            <CheckCircle2 className="mb-3 text-secondary" size={48} />
            <h2 className="text-lg font-semibold text-primary">Request received</h2>
            <p className="mt-2 text-sm text-gray-600">
              Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}! Our team will call you back shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="callback-modal-title"
                  className="flex items-center gap-2 text-lg font-semibold text-primary"
                >
                  <PhoneCall size={20} />
                  Get a Callback
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Share your details and our travel expert will call you back.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {status === "error" && (
              <div
                role="alert"
                className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700"
              >
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Honeypot field, hidden from real users via CSS, left open for bots */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange("company")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="cb-name" className="mb-1 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  ref={firstFieldRef}
                  id="cb-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  disabled={status === "submitting"}
                  className={fieldClass(errors.name)}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "cb-name-error" : undefined}
                />
                {errors.name && (
                  <p id="cb-name-error" className="mt-1 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cb-email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="cb-email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  disabled={status === "submitting"}
                  className={fieldClass(errors.email)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "cb-email-error" : undefined}
                />
                {errors.email && (
                  <p id="cb-email-error" className="mt-1 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cb-phone" className="mb-1 block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  id="cb-phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  disabled={status === "submitting"}
                  className={fieldClass(errors.phone)}
                  placeholder="+91 98765 43210"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "cb-phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="cb-phone-error" className="mt-1 text-xs text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cb-message" className="mb-1 block text-sm font-medium text-gray-700">
                  Message <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  id="cb-message"
                  value={form.message}
                  onChange={handleChange("message")}
                  disabled={status === "submitting"}
                  rows={3}
                  maxLength={500}
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/40"
                  placeholder="Tell us what you're planning..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Request Callback"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}