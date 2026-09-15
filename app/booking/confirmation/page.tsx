// app/booking/confirmation/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  MapPin,
  CalendarDays,
  Users,
  Receipt,
  XCircle,
} from "lucide-react";
import { getServerUser } from "@/lib/auth-server";
import { connectDB } from "@/lib/mongodb";
import HotelBooking from "@/models/HotelBooking";
import PrintButton from "./PrintButton";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  const userPayload = await getServerUser();
  if (!userPayload || !userPayload.userId) {
    const returnUrl = encodeURIComponent(
      `/booking/confirmation${ref ? `?ref=${ref}` : ""}`,
    );
    redirect(`/login?returnUrl=${returnUrl}`);
  }

  if (!ref) {
    return (
      <NoticeCard
        icon={<XCircle className="h-10 w-10 text-accent" />}
        title="Missing booking reference"
        message="We couldn't find a booking reference in the link. Check your email confirmation or view your bookings."
      />
    );
  }

  await connectDB();

  const booking = await HotelBooking.findOne({
    bookingRef: ref,
    userId: userPayload.userId,
  }).lean();

  if (!booking) {
    return (
      <NoticeCard
        icon={<XCircle className="h-10 w-10 text-accent" />}
        title="Booking not found"
        message={`We couldn't find a booking with reference ${ref} on your account.`}
      />
    );
  }

  // Payment never completed for this hold — send them back to pay, unless
  // the hold has already lapsed (no expiresAt + still pending shouldn't
  // normally happen, but treat it as expired rather than looping forever).
  if (booking.status === "pending") {
    // eslint-disable-next-line react-hooks/purity
    if (booking.expiresAt && new Date(booking.expiresAt).getTime() > Date.now()) {
      redirect(
        `/booking/payment?bookingId=${booking._id}&ref=${booking.bookingRef}`,
      );
    }
    return (
      <NoticeCard
        icon={<XCircle className="h-10 w-10 text-accent" />}
        title="Payment not completed"
        message="This booking's payment hold has expired, so the room wasn't confirmed. Please search again to rebook."
        actionHref="/hotels"
        actionLabel="Back to search"
      />
    );
  }

  if (booking.status === "cancelled") {
    return (
      <NoticeCard
        icon={<XCircle className="h-10 w-10 text-accent" />}
        title="Booking cancelled"
        message={`Booking ${booking.bookingRef} was cancelled${
          booking.paymentStatus === "failed" ? " after a failed payment" : ""
        }. No room has been reserved.`}
        actionHref="/hotels"
        actionLabel="Back to search"
      />
    );
  }

  // status is "confirmed" or "completed" here
  const primaryGuest = booking.guests.find((g: { isPrimary: any; }) => g.isPrimary) ?? booking.guests[0];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-primary/10 print:shadow-none">
        <div className="flex flex-col items-center gap-3 border-b border-primary/10 px-7 py-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-secondary" />
          <h1 className="text-2xl font-bold text-primary">Booking confirmed</h1>
          <p className="text-sm text-primary/50">
            A confirmation has been recorded for your account. Reference below.
          </p>
          <div className="mt-1 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-semibold tracking-wide text-primary">
            {booking.bookingRef}
          </div>
        </div>

        <div className="space-y-6 px-7 py-7">
          <div>
            <h2 className="text-lg font-bold text-primary">{booking.hotelName}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-primary/60">
              <MapPin className="h-4 w-4" />
              {booking.hotelCity}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 rounded-2xl bg-primary/3 p-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-4 w-4 text-primary/40" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-primary/40">
                  Check-in
                </p>
                <p className="text-sm font-semibold text-primary">
                  {formatDate(booking.checkIn)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-4 w-4 text-primary/40" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-primary/40">
                  Check-out
                </p>
                <p className="text-sm font-semibold text-primary">
                  {formatDate(booking.checkOut)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 h-4 w-4 text-primary/40" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-primary/40">
                  Guests
                </p>
                <p className="text-sm font-semibold text-primary">
                  {booking.totalGuests} guest{booking.totalGuests > 1 ? "s" : ""} ·{" "}
                  {booking.nights} night{booking.nights > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Receipt className="mt-0.5 h-4 w-4 text-primary/40" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-primary/40">
                  Room
                </p>
                <p className="text-sm font-semibold text-primary">
                  {booking.roomType}
                </p>
              </div>
            </div>
          </div>

          {primaryGuest && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary/40">
                Primary guest
              </p>
              <p className="mt-1 text-sm text-primary/80">
                {primaryGuest.salutation} {primaryGuest.fullName}
                {primaryGuest.email ? ` · ${primaryGuest.email}` : ""}
                {primaryGuest.phone ? ` · ${primaryGuest.phone}` : ""}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-primary/10 pt-5">
            <span className="text-sm font-medium text-primary/60">
              Amount paid
            </span>
            <span className="text-xl font-bold text-primary">
              ₹{booking.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row print:hidden">
            <Link
              href="/bookings"
              className="flex-1 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-secondary"
            >
              View my bookings
            </Link>
            <PrintButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function NoticeCard({
  icon,
  title,
  message,
  actionHref,
  actionLabel,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      {icon}
      <h1 className="text-xl font-bold text-primary">{title}</h1>
      <p className="text-sm text-primary/60">{message}</p>
      <Link
        href={actionHref ?? "/bookings"}
        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
      >
        {actionLabel ?? "View my bookings"}
      </Link>
    </div>
  );
}