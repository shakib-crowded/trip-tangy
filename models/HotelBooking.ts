// models/HotelBooking.ts
import { Schema, models, model, Types } from "mongoose";

export interface IHotelBooking {
  _id: string;
  userId: Types.ObjectId;
  hotelId: Types.ObjectId;
  hotelName: string;
  hotelCity: string;
  hotelImage: string;
  hotelSlug: string;
  roomId: Types.ObjectId;
  roomType: string;
  basePrice: number;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  adults: number;
  children: number;
  infants: number;
  totalGuests: number;
  totalAmount: number;
  guests: {
    salutation: string;
    firstName: string;
    lastName: string;
    fullName: string;
    age?: number;
    isChild: boolean;
    isPrimary: boolean;
    email?: string;
    phone?: string;
  }[];
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "failed";
  paymentId?: string;
  bookingRef: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GuestSchema = new Schema({
  salutation: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String, required: true },
  age: { type: Number },
  isChild: { type: Boolean, default: false },
  isPrimary: { type: Boolean, default: false },
  email: { type: String },
  phone: { type: String },
});

const HotelBookingSchema = new Schema<IHotelBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    hotelName: { type: String, required: true },
    hotelCity: { type: String, required: true },
    hotelImage: { type: String },
    hotelSlug: { type: String, required: true },
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    roomType: { type: String, required: true },
    basePrice: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    nights: { type: Number, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, default: 0 },
    infants: { type: Number, default: 0 },
    totalGuests: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    guests: [GuestSchema],
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentId: { type: String },
    bookingRef: { type: String, required: true, unique: true },
    // Payment hold window. Unset once a booking is confirmed so the TTL
    // index never deletes a paid booking.
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes for faster queries
HotelBookingSchema.index({ userId: 1, status: 1 });
HotelBookingSchema.index({ hotelId: 1, checkIn: 1, checkOut: 1 });
HotelBookingSchema.index({ bookingRef: 1 });
// Auto-delete abandoned pending holds once expiresAt passes. Confirmed
// bookings have expiresAt unset, so they're never touched by this.
HotelBookingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default models.HotelBooking || model<IHotelBooking>("HotelBooking", HotelBookingSchema);