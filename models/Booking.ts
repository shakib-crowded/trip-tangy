import mongoose, { Schema, models, model } from "mongoose";

export interface IBooking {
  _id: string;
  userId: mongoose.Types.ObjectId;
  type: "flight" | "hotel" | "holiday";
  title: string;
  destination: string;
  startDate: Date;
  endDate?: Date;
  status: "upcoming" | "completed" | "cancelled";
  amount: number;
  bookingRef: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["flight", "hotel", "holiday"],
      required: true,
    },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
    amount: { type: Number, required: true },
    bookingRef: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export default models.Booking || model<IBooking>("Booking", BookingSchema);