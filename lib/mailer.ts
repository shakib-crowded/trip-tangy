import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT || 587),
  secure: process.env.EMAIL_PORT === "465",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
    
export async function sendOtpEmail(to: string, name: string, otp: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Trip Tangy" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your Trip Tangy account",
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width:480px; margin:0 auto; padding:32px 24px;">
        <h2 style="color:#0b3d5c; margin-bottom:4px;">Verify your email</h2>
        <p style="color:#555; font-size:14px;">Hi ${name}, use the code below to verify your Trip Tangy account. It expires in 10 minutes.</p>
        <div style="margin:24px 0; text-align:center;">
          <span style="display:inline-block; font-size:32px; font-weight:700; letter-spacing:8px; color:#0b3d5c; background:#f3f6f8; padding:12px 24px; border-radius:12px;">${otp}</span>
        </div>
        <p style="color:#999; font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}