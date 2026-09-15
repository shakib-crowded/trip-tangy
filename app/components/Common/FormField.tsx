"use client";

import type { ComponentType, InputHTMLAttributes, ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  trailing?: ReactNode;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Field({
  id,
  label,
  icon: Icon,
  trailing,
  error,
  ...inputProps
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-primary/70"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/35" />
        <input
          id={id}
          {...inputProps}
          className={`w-full rounded-xl border py-2.5 pl-10 text-sm text-primary placeholder:text-primary/35 transition focus:outline-none focus:ring-2 ${
            trailing ? "pr-10" : "pr-3"
          } ${
            error
              ? "border-accent/50 focus:border-accent focus:ring-accent/10"
              : "border-primary/15 focus:border-primary/40 focus:ring-primary/10"
          } ${inputProps.disabled ? "cursor-not-allowed opacity-50" : ""}`}
        />
        {trailing && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {trailing}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs font-medium text-accent">{error}</p>}
    </div>
  );
}