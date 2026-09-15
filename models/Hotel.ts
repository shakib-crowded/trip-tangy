// models/Hotel.ts - ensure maxAdults and maxChildren have defaults
import { Schema, models, model, Types } from "mongoose";

export interface IRoom {
  roomType: string;
  description?: string;
  maxOccupancy: number;
  maxAdults: number; 
  maxChildren: number; 
  basePrice: number;
  totalRooms: number;
  images: string[];
  amenities: string[];
}

export interface IHotel {
  _id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  state: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  starRating: number;
  amenities: string[];
  images: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
  };
  rooms: IRoom[];
  isActive: boolean;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema = new Schema<IRoom>(
  {
    roomType: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    maxOccupancy: { type: Number, required: true, min: 1 },
    maxAdults: { type: Number, required: true, min: 1, default: 1 }, 
    maxChildren: { type: Number, default: 0, min: 0 },
    basePrice: { type: Number, required: true, min: 0 },
    totalRooms: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    amenities: [{ type: String }],
  },
  { _id: true },
);

const HotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0],
      },
    },
    starRating: { type: Number, min: 1, max: 5, default: 3 },
    amenities: [{ type: String }],
    images: [{ type: String }],
    policies: {
      checkIn: { type: String, default: "2:00 PM" },
      checkOut: { type: String, default: "11:00 AM" },
      cancellation: { type: String, default: "Free cancellation up to 24 hours before check-in" },
    },
    rooms: [RoomSchema],
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

// City + active is the main storefront query — list hotels in a city.
HotelSchema.index({ city: 1, isActive: 1 });
// Free-text search across name/city/description for the search bar.
HotelSchema.index({ name: "text", city: "text", description: "text" });
// Geospatial — "hotels near me" / map radius queries.
HotelSchema.index({ location: "2dsphere" });

export default models.Hotel || model<IHotel>("Hotel", HotelSchema);