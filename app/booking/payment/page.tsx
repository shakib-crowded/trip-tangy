// app/booking/payment/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ShieldCheck, XCircle } from "lucide-react";

type BookingDraft = {
  bookingId: string;
  bookingRef: string;
  hotelName: string;
  total: number;
  nights: number;
  expiresAt?: string;
};

export default function MockPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const ref = searchParams.get("ref");

  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState<"success" | "failure" | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("tt_booking_draft");
    if (raw) {
      try {
        setDraft(JSON.parse(raw));
      } catch {
        // ignore malformed draft
      }
    }
  }, []);

  useEffect(() => {
    if (!draft?.expiresAt) return;
    const expiryTime = new Date(draft.expiresAt).getTime();

    const tick = () => {
      const remaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
      setSecondsLeft(remaining);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [draft?.expiresAt]);

  const isExpired = secondsLeft === 0;

  const timeLabel = useMemo(() => {
    if (secondsLeft === null) return null;
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, [secondsLeft]);

  const submitPayment = async (forcedOutcome?: "success" | "failure") => {
    if (!bookingId) {
      setError("Missing booking reference. Please start your booking again.");
      return;
    }

    setIsProcessing(true);
    setError("");

    // Small artificial delay so the mock gateway feels like a real charge.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      const response = await fetch("/api/payment/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          ...(forcedOutcome ? { outcome: forcedOutcome } : {}),
        }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setOutcome("success");
        sessionStorage.removeItem("tt_booking_draft");
        setTimeout(() => {
          router.push(`/booking/confirmation?ref=${data.booking.bookingRef}`);
        }, 900);
        return;
      }

      setOutcome("failure");
      setError(data.error || "Payment failed. Your room hold has been released.");
    } catch (err) {
      setOutcome("failure");
      setError("Could not reach the payment gateway. Please try again.");
      console.error("Payment submission error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isExpired) return;
    submitPayment();
  };

  if (isExpired && outcome !== "success") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <XCircle className="h-10 w-10 text-accent" />
        <h1 className="text-xl font-bold text-primary">Your hold has expired</h1>
        <p className="text-sm text-primary/60">
          We couldn&rsquo;t confirm the room in time, so it&rsquo;s been released
          back into availability. Please search again to rebook.
        </p>
        <button
          onClick={() => router.push("/hotels")}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-secondary"
        >
          Back to search
        </button>
      </div>
    );
  }

  if (outcome === "failure") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <XCircle className="h-10 w-10 text-accent" />
        <h1 className="text-xl font-bold text-primary">Payment declined</h1>
        <p className="text-sm text-primary/60">{error}</p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setOutcome(null);
              setError("");
            }}
            className="rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
          >
            Try a different card
          </button>
          <button
            onClick={() => router.push("/hotels")}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-secondary"
          >
            Back to search
          </button>
        </div>
      </div>
    );
  }

  if (outcome === "success") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <ShieldCheck className="h-10 w-10 text-secondary" />
        <h1 className="text-xl font-bold text-primary">Payment successful</h1>
        <p className="text-sm text-primary/60">
          Confirming your booking{ref ? ` (${ref})` : ""}...
        </p>
        <Loader2 className="h-5 w-5 animate-spin text-primary/40" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-primary/10">
        <div className="px-7 pb-1 pt-8">
          <h1 className="text-2xl font-bold text-primary">Complete payment</h1>
          {draft ? (
            <p className="mt-1 text-sm text-primary/50">
              {draft.hotelName} · {draft.nights} night{draft.nights > 1 ? "s" : ""} · ₹
              {draft.total?.toLocaleString("en-IN")}
            </p>
          ) : (
            <p className="mt-1 text-sm text-primary/50">Booking ref: {ref}</p>
          )}
          {timeLabel && (
            <p className="mt-2 text-xs font-medium text-accent">
              Complete payment within {timeLabel} to keep this room
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-7 pb-8 pt-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-primary/70">
              Cardholder name
            </label>
            <input
              required
              value={card.name}
              onChange={(e) => setCard((p) => ({ ...p, name: e.target.value }))}
              disabled={isProcessing}
              placeholder="Name on card"
              className="w-full rounded-xl border border-primary/15 px-3 py-2.5 text-sm text-primary placeholder:text-primary/35 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-primary/70">
              Card number
            </label>
            <input
              required
              inputMode="numeric"
              maxLength={19}
              value={card.number}
              onChange={(e) => setCard((p) => ({ ...p, number: e.target.value }))}
              disabled={isProcessing}
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-xl border border-primary/15 px-3 py-2.5 text-sm text-primary placeholder:text-primary/35 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-primary/70">
                Expiry
              </label>
              <input
                required
                value={card.expiry}
                onChange={(e) => setCard((p) => ({ ...p, expiry: e.target.value }))}
                disabled={isProcessing}
                placeholder="MM/YY"
                className="w-full rounded-xl border border-primary/15 px-3 py-2.5 text-sm text-primary placeholder:text-primary/35 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-primary/70">
                CVV
              </label>
              <input
                required
                inputMode="numeric"
                maxLength={4}
                value={card.cvv}
                onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value }))}
                disabled={isProcessing}
                placeholder="123"
                className="w-full rounded-xl border border-primary/15 px-3 py-2.5 text-sm text-primary placeholder:text-primary/35 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          {error && <p className="text-xs font-medium text-accent">{error}</p>}

          <button
            type="submit"
            disabled={isProcessing || isExpired}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${draft ? `₹${draft.total?.toLocaleString("en-IN")}` : "now"}`
            )}
          </button>

          {process.env.NODE_ENV !== "production" && (
            <button
              type="button"
              onClick={() => submitPayment("failure")}
              disabled={isProcessing}
              className="w-full text-center text-xs font-medium text-primary/40 underline hover:text-primary/60"
            >
              Dev: simulate a declined card
            </button>
          )}
        </form>
      </div>
    </div>
  );
}