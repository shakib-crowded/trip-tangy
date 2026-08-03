// app/api/send-hotel-booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface HotelDetails {
  destination: string;
  selectedHotel: {
    hotel_name: string;
    city_name: string;
    country_name: string;
  } | null;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  totalGuests: number;
}

interface HotelBookingBody {
  name: string;
  phone: string;
  email: string;
  specialRequest?: string;
  hotelDetails: HotelDetails;
}

// ─── Nodemailer transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT ?? 587),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

function guestSummary(hd: HotelDetails): string {
  const parts = [`${hd.adults} Adult${hd.adults !== 1 ? "s" : ""}`];
  if (hd.children > 0) parts.push(`${hd.children} Child${hd.children !== 1 ? "ren" : ""}`);
  return parts.join(", ");
}

// ─── Admin email HTML ─────────────────────────────────────────────────────────
function buildAdminHtml(body: HotelBookingBody): string {
  const { name, phone, email, specialRequest, hotelDetails: hd } = body;
  const nights = getNights(hd.checkIn, hd.checkOut);
  const hotelLabel = hd.selectedHotel ? hd.selectedHotel.hotel_name : hd.destination;
  const locationLabel = hd.selectedHotel
    ? `${hd.selectedHotel.city_name}, ${hd.selectedHotel.country_name}`
    : hd.destination;

  const rows = (pairs: [string, string][]) =>
    pairs
      .map(
        ([l, v]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:40%;font-size:13px;color:#9ca3af;">${l}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;font-weight:600;">${v}</td>
      </tr>`
      )
      .join("");

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:28px 32px;">
            <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.75);letter-spacing:0.08em;text-transform:uppercase;font-weight:600;">New Hotel Booking Request</p>
            <h1 style="margin:0;font-size:24px;color:#fff;font-weight:800;">${hotelLabel}</h1>
            <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.88);">
              ${locationLabel} &nbsp;·&nbsp; ${nights} night${nights !== 1 ? "s" : ""} &nbsp;·&nbsp; ${hd.rooms} room${hd.rooms !== 1 ? "s" : ""}
            </p>
          </td>
        </tr>

        <!-- Guest info -->
        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#6b7280;letter-spacing:0.06em;text-transform:uppercase;">Guest Information</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              ${rows([["Full Name", name], ["Phone", phone], ["Email", email]])}
            </table>
          </td>
        </tr>

        <!-- Booking details -->
        <tr>
          <td style="padding:24px 32px 0;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#6b7280;letter-spacing:0.06em;text-transform:uppercase;">Booking Details</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              ${rows([
                ["Hotel / Destination", hotelLabel],
                ...(hd.selectedHotel ? [["Location", locationLabel] as [string, string]] : []),
                ["Check-in", hd.checkIn],
                ["Check-out", hd.checkOut],
                ["Duration", `${nights} night${nights !== 1 ? "s" : ""}`],
                ["Guests", guestSummary(hd)],
                ["Rooms", `${hd.rooms} room${hd.rooms !== 1 ? "s" : ""}`],
              ])}
            </table>
          </td>
        </tr>

        <!-- Special requests -->
        ${
          specialRequest
            ? `
        <tr>
          <td style="padding:24px 32px 0;">
            <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#6b7280;letter-spacing:0.06em;text-transform:uppercase;">Special Requests</p>
            <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:14px 16px;">
              <p style="margin:0;font-size:14px;color:#92400e;line-height:1.6;">${specialRequest.replace(/\n/g, "<br>")}</p>
            </div>
          </td>
        </tr>`
            : ""
        }

        <!-- Footer -->
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
              Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" })} IST
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Confirmation email HTML ──────────────────────────────────────────────────
// NOTE: kept for future use; currently unused.
function buildConfirmationHtml(body: HotelBookingBody): string {
  return "";
}


// ─── Plain-text fallbacks ─────────────────────────────────────────────────────
function buildAdminText(body: HotelBookingBody): string {
  const { name, phone, email, specialRequest, hotelDetails: hd } = body;
  const hotelLabel = hd.selectedHotel ? hd.selectedHotel.hotel_name : hd.destination;
  const nights = getNights(hd.checkIn, hd.checkOut);
  return [
    "HOTEL BOOKING REQUEST",
    "=====================",
    "",
    "GUEST",
    `Name:    ${name}`,
    `Phone:   ${phone}`,
    `Email:   ${email}`,
    "",
    "BOOKING",
    `Hotel:   ${hotelLabel}`,
    `Check-in:  ${hd.checkIn}`,
    `Check-out: ${hd.checkOut}`,
    `Nights:    ${nights}`,
    `Guests:    ${guestSummary(hd)}`,
    `Rooms:     ${hd.rooms}`,
    ...(specialRequest ? ["", "SPECIAL REQUESTS", specialRequest] : []),
  ].join("\n");
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: HotelBookingBody = await req.json();
    const { name, phone, email, hotelDetails } = body;

    // Server-side validation
    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name, phone, and email are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!hotelDetails?.destination && !hotelDetails?.selectedHotel) {
      return NextResponse.json({ error: "Hotel destination is required." }, { status: 400 });
    }
    if (!hotelDetails?.checkIn || !hotelDetails?.checkOut) {
      return NextResponse.json({ error: "Check-in and check-out dates are required." }, { status: 400 });
    }

    const hotelLabel = hotelDetails.selectedHotel
      ? hotelDetails.selectedHotel.hotel_name
      : hotelDetails.destination;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM ?? process.env.EMAIL_USER,
      to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
      subject: `🏨 New Hotel Booking: ${hotelLabel} — ${name}`,
      text: buildAdminText(body),
      html: buildAdminHtml(body),
    });


    return NextResponse.json({ success: true, message: "Booking submitted and confirmation sent." });
  } catch (err) {
    const error = err as { message?: string };
    console.error("[send-hotel-booking] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send booking email. Please try again." },
      { status: 500 }
    );
  }
}