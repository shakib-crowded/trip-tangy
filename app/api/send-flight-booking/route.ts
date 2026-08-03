// app/api/send-flight-booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Nodemailer transporter with better configuration ───────────────────
const createTransporter = () => {

  // Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Missing email credentials in environment variables");
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT ?? 587),
    secure: false, // false for port 587, true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Only for development
    },
  });
};

// Rest of your interfaces remain the same...
interface FlightDetails {
  tripType: string;
  from: { iata_code: string; name: string; city?: string } | null;
  to: { iata_code: string; name: string; city?: string } | null;
  depart: string;
  returnD?: string;
  pax: { adults: number; children: number; infants: number };
  cabin: string;
}

interface BookingRequestBody {
  name: string;
  phone: string;
  email: string;
  specialRequest?: string;
  flightDetails: FlightDetails;
}

// Your helper functions remain the same...
function paxSummary(pax: FlightDetails["pax"]): string {
  const parts: string[] = [`${pax.adults} Adult${pax.adults !== 1 ? "s" : ""}`];
  if (pax.children > 0) parts.push(`${pax.children} Child${pax.children !== 1 ? "ren" : ""}`);
  if (pax.infants > 0) parts.push(`${pax.infants} Infant${pax.infants !== 1 ? "s" : ""}`);
  return parts.join(", ");
}

function buildEmailHtml(body: BookingRequestBody): string {
  // Your existing HTML template...
  const { name, phone, email, specialRequest, flightDetails: fd } = body;
  const route = `${fd.from?.iata_code ?? "?"} → ${fd.to?.iata_code ?? "?"}`;
  const dates =
    fd.tripType === "round-trip" && fd.returnD
      ? `${fd.depart} → ${fd.returnD}`
      : fd.depart;

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Flight Booking Request</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr><td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:28px 32px;">
            <h1 style="margin:0;font-size:24px;color:#fff;">${route}</h1>
            <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.88);">${dates} | ${fd.cabin} | ${paxSummary(fd.pax)}</p>
           </td></tr>
          <tr><td style="padding:28px 32px;">
            <h3>Passenger Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h3>Flight Details</h3>
            <p><strong>Trip Type:</strong> ${fd.tripType === "round-trip" ? "Round Trip" : "One Way"}</p>
            <p><strong>From:</strong> ${fd.from?.city} (${fd.from?.iata_code})</p>
            <p><strong>To:</strong> ${fd.to?.city} (${fd.to?.iata_code})</p>
            <p><strong>Departure:</strong> ${fd.depart}</p>
            ${fd.returnD ? `<p><strong>Return:</strong> ${fd.returnD}</p>` : ""}
            ${specialRequest ? `<h3>Special Requests</h3><p>${specialRequest}</p>` : ""}
           </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(body: BookingRequestBody): string {
  const { name, phone, email, specialRequest, flightDetails: fd } = body;
  const lines = [
    "FLIGHT BOOKING REQUEST",
    "======================",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Trip: ${fd.tripType}`,
    `From: ${fd.from?.name} (${fd.from?.iata_code})`,
    `To: ${fd.to?.name} (${fd.to?.iata_code})`,
    `Departure: ${fd.depart}`,
    ...(fd.returnD ? [`Return: ${fd.returnD}`] : []),
    `Passengers: ${paxSummary(fd.pax)}`,
    `Cabin: ${fd.cabin}`,
    ...(specialRequest ? ["", "SPECIAL REQUESTS", specialRequest] : []),
  ];
  return lines.join("\n");
}

// ─── Updated Route Handler ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: BookingRequestBody = await req.json();

    // Basic server-side validation
    const { name, phone, email, flightDetails } = body;
    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!flightDetails?.from || !flightDetails?.to) {
      return NextResponse.json(
        { error: "Flight details are incomplete." },
        { status: 400 }
      );
    }

    const route = `${flightDetails.from.iata_code} → ${flightDetails.to.iata_code}`;
    
    const transporter = createTransporter();
    
    await transporter.verify();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `✈️ New Booking Request: ${route} — ${name}`,
      text: buildEmailText(body),
      html: buildEmailHtml(body),
    });

    return NextResponse.json({
      success: true,
      message: "Booking submitted and confirmation sent.",
    });
  } catch (err) {
    const error = err as {
      message?: string;
      code?: string;
      command?: string;
    };

    console.error("[send-flight-booking] Detailed Error:", error);
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);

    // Provide more specific error messages
    if (error.code === "EAUTH") {
      return NextResponse.json(
        {
          error:
            "Email authentication failed. Please check your email credentials and app password.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to send booking email. Please try again." },
      { status: 500 }
    );
  }
}
