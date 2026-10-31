// app/api/bookings/hotel/route.ts
import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { getServerUser } from "@/lib/auth-server";
import { connectDB } from "@/lib/mongodb";
import HotelBooking, { type IHotelBooking } from "@/models/HotelBooking";
import Hotel from "@/models/Hotel";
import User from "@/models/User";

const HOLD_MINUTES = 15;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBookingGuest(
  value: unknown,
): value is IHotelBooking["guests"][number] {
  if (!isRecord(value)) return false;
  return (
    typeof value.salutation === "string" &&
    typeof value.firstName === "string" &&
    typeof value.lastName === "string" &&
    typeof value.fullName === "string" &&
    typeof value.isChild === "boolean" &&
    typeof value.isPrimary === "boolean" &&
    (value.age === undefined || typeof value.age === "number") &&
    (value.email === undefined || typeof value.email === "string") &&
    (value.phone === undefined || typeof value.phone === "string")
  );
}

// Generate a unique booking reference
function generateBookingRef(): string {
  const prefix = "HTL";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    // Get user from JWT token
    const userPayload = await getServerUser();

    if (!userPayload || !userPayload.userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to book." },
        { status: 401 },
      );
    }

    await connectDB();

    // Get user from database
    const user = await User.findById(userPayload.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please register first." },
        { status: 404 },
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid booking request." }, { status: 400 });
    }
    if (!isRecord(body)) {
      return NextResponse.json({ error: "Invalid booking request." }, { status: 400 });
    }

    const { hotelId, roomId, checkIn, checkOut, guests } = body;
    if (
      typeof hotelId !== "string" ||
      !isValidObjectId(hotelId) ||
      typeof roomId !== "string" ||
      !isValidObjectId(roomId)
    ) {
      return NextResponse.json({ error: "Hotel or room not found." }, { status: 404 });
    }
    if (typeof checkIn !== "string" || typeof checkOut !== "string") {
      return NextResponse.json({ error: "Choose valid check-in and check-out dates." }, { status: 400 });
    }
    const isoDate = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDate.test(checkIn) || !isoDate.test(checkOut)) {
      return NextResponse.json({ error: "Choose valid check-in and check-out dates." }, { status: 400 });
    }

    const checkInDate = new Date(`${checkIn}T00:00:00.000Z`);
    const checkOutDate = new Date(`${checkOut}T00:00:00.000Z`);
    const nights = Math.round(
      (checkOutDate.getTime() - checkInDate.getTime()) / (24 * 60 * 60 * 1000),
    );
    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime()) ||
      nights < 1
    ) {
      return NextResponse.json(
        { error: "Check-out must be after check-in." },
        { status: 400 },
      );
    }

    const adults = body.adults;
    const children = body.children ?? 0;
    const infants = body.infants ?? 0;
    if (
      typeof adults !== "number" ||
      !Number.isInteger(adults) ||
      adults < 1 ||
      typeof children !== "number" ||
      !Number.isInteger(children) ||
      children < 0 ||
      typeof infants !== "number" ||
      !Number.isInteger(infants) ||
      infants < 0
    ) {
      return NextResponse.json({ error: "Enter valid guest counts." }, { status: 400 });
    }
    const totalGuests = adults + children + infants;

    // Validate guests
    if (!Array.isArray(guests) || guests.length === 0) {
      return NextResponse.json(
        { error: "At least one guest is required." },
        { status: 400 },
      );
    }
    const bookingGuests = guests.filter(isBookingGuest);
    if (bookingGuests.length !== guests.length) {
      return NextResponse.json(
        { error: "Enter valid information for every guest." },
        { status: 400 },
      );
    }
    if (
      bookingGuests.filter((guest) => guest.isChild).length !== children ||
      bookingGuests.filter((guest) => !guest.isChild).length !== adults
    ) {
      return NextResponse.json(
        { error: "Guest details must match the selected guest counts." },
        { status: 400 },
      );
    }

    // Check if primary guest exists
    if (!bookingGuests.some((guest) => guest.isPrimary)) {
      return NextResponse.json(
        { error: "Primary guest information is required." },
        { status: 400 },
      );
    }

    // Validate hotel exists
    const hotel = await Hotel.findOne({ _id: hotelId, isActive: true });
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found." }, { status: 404 });
    }

    // Check if room exists
    const room = hotel.rooms.id(roomId);
    if (!room) {
      return NextResponse.json({ error: "Room not found." }, { status: 404 });
    }
    if (
      adults > room.maxAdults ||
      children > room.maxChildren ||
      totalGuests > room.maxOccupancy
    ) {
      return NextResponse.json(
        { error: "This room cannot accommodate the selected guests." },
        { status: 400 },
      );
    }

    // Check room availability for the dates
    const now = new Date();

    // Check for existing bookings that overlap with these dates
    const existingBookings = await HotelBooking.find({
      hotelId: body.hotelId,
      roomId: body.roomId,
      $or: [
        { status: "confirmed" },
        { status: "pending", expiresAt: { $gt: now } },
      ],
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate },
    });

    const totalBooked = existingBookings.length;
    const availableRooms = room.totalRooms - totalBooked;

    if (availableRooms <= 0) {
      return NextResponse.json(
        { error: "No rooms available for the selected dates." },
        { status: 400 },
      );
    }

    const bookingRef = generateBookingRef();
    const expiresAt = new Date(now.getTime() + HOLD_MINUTES * 60 * 1000);

    const booking = await HotelBooking.create({
      userId: user._id,
      hotelId: hotel._id,
      hotelName: hotel.name,
      hotelCity: hotel.city,
      hotelImage: hotel.images[0] ?? "",
      hotelSlug: hotel.slug,
      roomId: room._id,
      roomType: room.roomType,
      basePrice: room.basePrice,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      adults,
      children,
      infants,
      totalGuests,
      totalAmount: room.basePrice * nights,
      guests: bookingGuests,
      specialRequests:
        typeof body.specialRequests === "string"
          ? body.specialRequests.trim()
          : "",
      bookingRef,
      status: "pending",
      paymentStatus: "pending",
      expiresAt,
    });

    // Also create a general booking record for the dashboard
    try {
      const Booking = (await import("@/models/Booking")).default;
      await Booking.create({
        userId: user._id,
        type: "hotel",
        title: `${hotel.name} - ${room.roomType}`,
        destination: hotel.city,
        startDate: checkInDate,
        endDate: checkOutDate,
        status: "upcoming",
        amount: booking.totalAmount,
        bookingRef: bookingRef,
      });
    } catch (err) {
      console.error("Error creating general booking:", err);
      // Don't fail the main booking if this fails
    }

    // Return success response with booking details
    return NextResponse.json(
      {
        success: true,
        message: "Booking hold created. Complete payment to confirm.",
        booking: {
          id: booking._id,
          bookingRef: booking.bookingRef,
          status: booking.status,
          totalAmount: booking.totalAmount,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          expiresAt: booking.expiresAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create booking. Please try again.",
      },
      { status: 500 },
    );
  }
}

// GET endpoint to fetch user's hotel bookings
export async function GET(request: NextRequest) {
  try {
    const userPayload = await getServerUser();

    if (!userPayload || !userPayload.userId) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(userPayload.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const requestedLimit = Number(searchParams.get("limit") ?? 10);
    const requestedPage = Number(searchParams.get("page") ?? 1);
    const limit =
      Number.isInteger(requestedLimit) && requestedLimit > 0
        ? Math.min(requestedLimit, 50)
        : 10;
    const page =
      Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const query: {
      userId: typeof user._id;
      status?: IHotelBooking["status"];
    } = { userId: user._id };
    const allowedStatuses: IHotelBooking["status"][] = [
      "pending",
      "confirmed",
      "cancelled",
      "completed",
    ];
    const validStatus = allowedStatuses.find(
      (candidate) => candidate === status,
    );
    if (validStatus) query.status = validStatus;

    const skip = (page - 1) * limit;

    const bookings = await HotelBooking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await HotelBooking.countDocuments(query);

    return NextResponse.json({
      bookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings." },
      { status: 500 },
    );
  }
}
