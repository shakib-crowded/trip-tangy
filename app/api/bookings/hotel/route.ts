// app/api/bookings/hotel/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth-server";
import { connectDB } from "@/lib/mongodb";
import HotelBooking from "@/models/HotelBooking";
import Hotel from "@/models/Hotel";
import User from "@/models/User";

const HOLD_MINUTES = 15;

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
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "hotelId",
      "hotelName",
      "hotelCity",
      "hotelSlug",
      "roomId",
      "roomType",
      "basePrice",
      "checkIn",
      "checkOut",
      "nights",
      "adults",
      "totalGuests",
      "total",
      "guests",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Validate guests
    if (!Array.isArray(body.guests) || body.guests.length === 0) {
      return NextResponse.json(
        { error: "At least one guest is required." },
        { status: 400 },
      );
    }

    // Check if primary guest exists
    const primaryGuest = body.guests.find((g: any) => g.isPrimary);
    if (!primaryGuest) {
      return NextResponse.json(
        { error: "Primary guest information is required." },
        { status: 400 },
      );
    }

    // Validate hotel exists
    const hotel = await Hotel.findById(body.hotelId);
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found." }, { status: 404 });
    }

    // Check if room exists
    const room = hotel.rooms.id(body.roomId);
    if (!room) {
      return NextResponse.json({ error: "Room not found." }, { status: 404 });
    }

    // Check room availability for the dates
    const checkInDate = new Date(body.checkIn);
    const checkOutDate = new Date(body.checkOut);
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
      hotelId: body.hotelId,
      hotelName: body.hotelName,
      hotelCity: body.hotelCity,
      hotelImage: body.hotelImage || "",
      hotelSlug: body.hotelSlug,
      roomId: body.roomId,
      roomType: body.roomType,
      basePrice: body.basePrice,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: body.nights,
      adults: body.adults,
      children: body.children || 0,
      infants: body.infants || 0,
      totalGuests: body.totalGuests,
      totalAmount: body.total,
      guests: body.guests,
      specialRequests: body.specialRequests || "",
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
        title: `${body.hotelName} - ${body.roomType}`,
        destination: body.hotelCity,
        startDate: checkInDate,
        endDate: checkOutDate,
        status: "upcoming",
        amount: body.total,
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
  } catch (error: any) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create booking. Please try again." },
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
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    const query: any = { userId: user._id };
    if (
      status &&
      ["pending", "confirmed", "cancelled", "completed"].includes(status)
    ) {
      query.status = status;
    }

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
