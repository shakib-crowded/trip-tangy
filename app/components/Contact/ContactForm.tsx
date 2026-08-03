"use client";

import { useState, useCallback } from "react";

interface FormFields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormFields, string>>;
type TouchedFields = Partial<Record<keyof FormFields, boolean>>;
type Status = "idle" | "submitting" | "success" | "error";

function validateField(field: keyof FormFields, value: string): string {
  switch (field) {
    case "name":
      if (!value.trim()) return "Full name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
      return "";
    case "email":
      if (!value.trim()) return "Email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        return "Please enter a valid email address.";
      return "";
    case "phone":
      if (!value.trim()) return "Phone number is required.";
      if (!/^\+?[\d\s\-().]{7,20}$/.test(value.trim()))
        return "Please enter a valid phone number.";
      return "";
    case "message":
      if (value.trim().length > 2000) return "Message must be under 2000 characters.";
      return "";
    default:
      return "";
  }
}

function validateAll(fields: FormFields): FieldErrors {
  return Object.fromEntries(
    (Object.keys(fields) as (keyof FormFields)[]).map((key) => [
      key,
      validateField(key, fields[key]),
    ])
  ) as FieldErrors;
}

const INITIAL: FormFields = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Validate in real-time only after a field has been touched
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target as { name: keyof FormFields; value: string };
      setFields((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }
    },
    [touched]
  );

  // Mark touched on blur and validate immediately
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target as { name: keyof FormFields; value: string };
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    },
    []
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    // Touch all fields to surface any remaining errors
    setTouched({ name: true, email: true, phone: true, message: true });
    const allErrors = validateAll(fields);
    setErrors(allErrors);
    if (Object.values(allErrors).some(Boolean)) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/send-contact-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          message: fields.message.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");

      setStatus("success");
      setFields(INITIAL);
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  const inputClass = (field: keyof FormFields) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${
      touched[field] && errors[field]
        ? "border-red-400 focus:ring-red-100"
        : touched[field] && !errors[field]
        ? "border-green-400 focus:ring-green-100 focus:border-green-400"
        : "border-gray-200 focus:ring-orange-100 focus:border-orange-400"
    }`;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-8">
        <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-gray-900">Message sent</h3>
        <p className="text-sm text-gray-500 mt-1.5 max-w-xs">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-gray-600 mb-1">
            Full Name <span className="text-orange-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your full name"
            className={inputClass("name")}
          />
          {touched.name && errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone — now required */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-1">
            Phone Number <span className="text-orange-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+91 98765 43210"
            className={inputClass("phone")}
          />
          {touched.phone && errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1">
          Email <span className="text-orange-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          className={inputClass("email")}
        />
        {touched.email && errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Message — now optional */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-gray-600 mb-1">
          Message{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={fields.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell us where you'd like to go, when, and anything else that helps us plan..."
          className={`resize-none ${inputClass("message")}`}
        />
        <div className="flex justify-between mt-1">
          {touched.message && errors.message ? (
            <p className="text-xs text-red-500">{errors.message}</p>
          ) : (
            <span />
          )}
          <p className="text-xs text-gray-400 ml-auto">
            {fields.message.length}/2000
          </p>
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2.5">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-6 py-3 text-sm transition-colors"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}