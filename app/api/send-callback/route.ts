import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";


interface CallbackPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPhone(raw: string) {
  const digitCount = raw.replace(/[^\d]/g, "").length;
  return digitCount >= 10 && digitCount <= 15;
}

function getValidationError(body: CallbackPayload): string | null {
  if (!body.name || body.name.trim().length < 2) {
    return "Please provide a valid name.";
  }
  if (!body.email || !EMAIL_REGEX.test(body.email.trim())) {
    return "Please provide a valid email address.";
  }
  if (!body.phone || !isValidPhone(body.phone)) {
    return "Please provide a valid phone number.";
  }
  if (body.message && body.message.length > 500) {
    return "Message must be under 500 characters.";
  }
  return null;
}

// Minimal escaping since these values get interpolated into an HTML email body
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Reuse a single transporter across invocations instead of recreating it per request
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT ?? 587),
      secure: process.env.EMAIL_SECURE === "true", // true for port 465, false for 587/25
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

export async function POST(request: NextRequest) {
  let body: CallbackPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = getValidationError(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const phone = body.phone!.trim();
  const message = body.message?.trim() || "—";

  const recipient = process.env.EMAIL_TO;
  if (!recipient || !process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("send-callback: missing one of EMAIL_HOST / EMAIL_USER / EMAIL_PASS / CALLBACK_TO_EMAIL");
    return NextResponse.json(
      { error: "Server is not configured to send this request yet." },
      { status: 500 }
    );
  }

  try {
    await getTransporter().sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipient,
      replyTo: email,
      subject: `New callback request from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, `Message: ${message}`].join("\n"),
      html: `
        <h2>New callback request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("send-callback: failed to send email", err);
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please try again shortly." },
      { status: 500 }
    );
  }
}