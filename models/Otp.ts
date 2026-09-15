import { Schema, models, model } from "mongoose";

export interface IOtp {
  email: string;
  codeHash: string;
  purpose: "register" | "login" | "reset-password";
  attempts: number;
  expiresAt: Date;
  lastSentAt: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    email: { type: String, required: true, lowercase: true, index: true },
    codeHash: { type: String, required: true },
    purpose: { type: String, required: true, default: "register" },
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
    lastSentAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

// Mongo TTL index — auto-deletes expired OTP docs
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default models.Otp || model<IOtp>("Otp", OtpSchema);