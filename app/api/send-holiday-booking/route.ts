// app/api/send-holiday-booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Nodemailer transporter with better configuration ───────────────────
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Missing email credentials in environment variables");
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

interface HolidayDetails {
  destination: string;
  duration: string;
  budget: string;
  travelers: number;
  isCustom?: boolean;
}

interface BookingRequestBody {
  name: string;
  phone: string;
  email: string;
  specialRequest?: string;
  holidayDetails: HolidayDetails;
}

// Helper function to format budget display
const formatBudget = (budget: string): string => {
  const budgets: Record<string, string> = {
    budget: "Budget (under ₹30k)",
    mid: "Mid-range (₹30k–₹80k)",
    premium: "Premium (₹80k–₹1.5L)",
    luxury: "Luxury (₹1.5L+)",
  };
  return budgets[budget] || budget || "Any budget";
};

// Helper function to format duration display
const formatDuration = (duration: string): string => {
  const durations: Record<string, string> = {
    "3": "Weekend (3 days)",
    "5": "Short (5 days)",
    "7": "One week",
    "10": "10 days",
    "14": "Two weeks",
    "21": "3 weeks+",
  };
  return durations[duration] || duration || "Any length";
};

function buildEmailHtml(body: BookingRequestBody): string {
  const { name, phone, email, specialRequest, holidayDetails: hd } = body;
  
  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Holiday Booking Request</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr><td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:28px 32px;">
            <h1 style="margin:0;font-size:24px;color:#fff;">🏖️ Holiday Booking Request</h1>
            <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.88);">${escapeHtml(hd.destination)}</p>
          </td></tr>
          <tr><td style="padding:28px 32px;">
            <h3 style="margin-top:0;color:#1f2937;">Traveler Information</h3>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            
            <h3 style="margin-top:24px;color:#1f2937;">Holiday Details</h3>
            <p><strong>Destination:</strong> ${escapeHtml(hd.destination)}${hd.isCustom ? ' ✏️ (Custom)' : ''}</p>
            <p><strong>Duration:</strong> ${formatDuration(hd.duration)}</p>
            <p><strong>Budget Range:</strong> ${formatBudget(hd.budget)}</p>
            <p><strong>Number of Travelers:</strong> ${hd.travelers}</p>
            
            ${specialRequest ? `
              <h3 style="margin-top:24px;color:#1f2937;">Special Requests</h3>
              <p style="background:#f9fafb;padding:12px;border-radius:8px;">${escapeHtml(specialRequest)}</p>
            ` : ""}
            
            <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
            <p style="color:#6b7280;font-size:14px;">This booking request was submitted from the holiday booking form.</p>
          </td>
        </table>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function buildEmailText(body: BookingRequestBody): string {
  const { name, phone, email, specialRequest, holidayDetails: hd } = body;
  const lines = [
    "HOLIDAY BOOKING REQUEST",
    "=======================",
    "",
    "TRAVELER INFORMATION",
    "--------------------",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    "",
    "HOLIDAY DETAILS",
    "---------------",
    `Destination: ${hd.destination}${hd.isCustom ? ' ✏️ (Custom)' : ''}`,
    `Duration: ${formatDuration(hd.duration)}`,
    `Budget Range: ${formatBudget(hd.budget)}`,
    `Number of Travelers: ${hd.travelers}`,
  ];
  
  if (specialRequest) {
    lines.push("", "SPECIAL REQUESTS", "---------------", specialRequest);
  }
  
  return lines.join("\n");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ─── Route Handler for Holiday Booking ─────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: BookingRequestBody = await req.json();

    // Basic server-side validation
    const { name, phone, email, holidayDetails } = body;
    
    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    
    // Updated validation - only destination and travelers are required
    if (!holidayDetails?.destination) {
      return NextResponse.json(
        { error: "Destination is required." },
        { status: 400 }
      );
    }
    
    if (!holidayDetails.travelers || holidayDetails.travelers < 1 || holidayDetails.travelers > 20) {
      return NextResponse.json(
        { error: "Number of travelers must be between 1 and 20." },
        { status: 400 }
      );
    }

    // Duration and budget are optional - provide defaults if not set
    const duration = holidayDetails.duration || "any";
    const budget = holidayDetails.budget || "any";
    
    // Validate duration if provided
    if (holidayDetails.duration && !["3", "5", "7", "10", "14", "21"].includes(holidayDetails.duration)) {
      return NextResponse.json(
        { error: "Invalid duration selected." },
        { status: 400 }
      );
    }
    
    // Validate budget if provided
    if (holidayDetails.budget && !["budget", "mid", "premium", "luxury"].includes(holidayDetails.budget)) {
      return NextResponse.json(
        { error: "Invalid budget selected." },
        { status: 400 }
      );
    }

    const destination = holidayDetails.destination;
    
    const transporter = createTransporter();
    
    // Verify connection configuration
    await transporter.verify();

    // Send email to admin/agency
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `🏖️ New Holiday Booking: ${destination} — ${name}`,
      text: buildEmailText(body),
      html: buildEmailHtml(body),
    });

    return NextResponse.json({
      success: true,
      message: "Holiday booking submitted successfully. We'll contact you shortly!",
    });
  } catch (err) {
    const error = err as {
      message?: string;
      code?: string;
      command?: string;
    };

    console.error("[send-holiday-booking] Detailed Error:", error);
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);

    if (error.code === "EAUTH") {
      return NextResponse.json(
        {
          error:
            "Email authentication failed. Please check your email credentials and app password.",
        },
        { status: 500 }
      );
    }

    if (error.code === "ECONNECTION") {
      return NextResponse.json(
        {
          error:
            "Could not connect to email server. Please check your email configuration.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to send holiday booking. Please try again." },
      { status: 500 }
    );
  }
}