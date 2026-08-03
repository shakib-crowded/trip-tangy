// app/api/send-contact-message/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)
    throw new Error("Missing email credentials in environment variables");

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT ?? 587),
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    tls: { rejectUnauthorized: false },
  });
};

interface ContactRequestBody {
  name: string;
  email: string;
  phone: string;      
  message?: string;    
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(body: ContactRequestBody): string {
  const { name, email, phone, message } = body;
  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#f97316,#fb923c);padding:28px 32px;">
          <h1 style="margin:0;font-size:24px;color:#fff;">✉️ New Contact Message</h1>
          <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.88);">From ${escapeHtml(name)}</p>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <h3 style="margin-top:0;color:#1f2937;">Contact Information</h3>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          ${message?.trim() ? `
          <h3 style="margin-top:24px;color:#1f2937;">Message</h3>
          <p style="background:#f9fafb;padding:12px;border-radius:8px;white-space:pre-wrap;">${escapeHtml(message)}</p>
          ` : ""}
          <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
          <p style="color:#6b7280;font-size:14px;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildEmailText(body: ContactRequestBody): string {
  const { name, email, phone, message } = body;
  const lines = [
    "NEW CONTACT MESSAGE",
    "====================",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
  ];
  if (message?.trim()) lines.push("", "MESSAGE", "-------", message);
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactRequestBody = await req.json();
    const { name, email, phone, message } = body;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!/^\+?[\d\s\-().]{7,20}$/.test(phone.trim())) {
      return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
    }

    if (message && message.trim().length > 2000) {
      return NextResponse.json(
        { error: "Message must be under 2000 characters." },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    await transporter.verify();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email.trim(),
      subject: `✉️ New Contact Message from ${name}`,
      text: buildEmailText(body),
      html: buildEmailHtml(body),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully. We'll get back to you soon!",
    });
  } catch (err) {
    const error = err as { message?: string; code?: string; command?: string };
    console.error("[send-contact-message] Error:", error);

    if (error.code === "EAUTH")
      return NextResponse.json(
        { error: "Email authentication failed. Please check your credentials." },
        { status: 500 }
      );

    if (error.code === "ECONNECTION")
      return NextResponse.json(
        { error: "Could not connect to email server." },
        { status: 500 }
      );

    return NextResponse.json(
      { error: error.message || "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}