import { NextRequest, NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth-server";
import { connectDB } from "@/lib/mongodb";
import HotelBooking from "@/models/HotelBooking";

function generatePaymentId(): string {
  return `PAY-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const userPayload = await getServerUser();
    if (!userPayload || !userPayload.userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please login to continue." },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { bookingId, outcome } = body as {
      bookingId?: string;
      outcome?: "success" | "failure";
    };

    if (!bookingId) {
      return NextResponse.json(
        { error: "bookingId is required." },
        { status: 400 }
      );
    }

    const booking = await HotelBooking.findOne({
      _id: bookingId,
      userId: userPayload.userId,
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found." },
        { status: 404 }
      );
    }

    if (booking.status !== "pending") {
      return NextResponse.json(
        { error: `This booking is already ${booking.status}.` },
        { status: 409 }
      );
    }

    const now = new Date();
    if (booking.expiresAt && booking.expiresAt.getTime() < now.getTime()) {
      await HotelBooking.updateOne(
        { _id: booking._id, status: "pending" },
        { $set: { status: "cancelled", paymentStatus: "failed" } }
      );
      return NextResponse.json(
        {
          error:
            "This booking hold has expired. Please start your booking again.",
        },
        { status: 410 }
      );
    }

    // --- Mock gateway ---
    // Stands in for a real PSP call. Respects an explicit test outcome
    // (used by a "simulate failure" control on the payment page); otherwise
    // succeeds most of the time so the happy path is easy to demo.
    const didSucceed =
      outcome === "failure" ? false : outcome === "success" ? true : Math.random() > 0.1;

    if (didSucceed) {
      const paymentId = generatePaymentId();

      // Guard on status: "pending" so a duplicate/concurrent request can't
      // confirm the same booking twice.
      const updated = await HotelBooking.findOneAndUpdate(
        { _id: booking._id, status: "pending" },
        {
          $set: { status: "confirmed", paymentStatus: "paid", paymentId },
          $unset: { expiresAt: "" },
        },
        { new: true }
      );

      if (!updated) {
        return NextResponse.json(
          { error: "This booking was already processed." },
          { status: 409 }
        );
      }

      try {
        const Booking = (await import("@/models/Booking")).default;
        await Booking.findOneAndUpdate(
          { bookingRef: booking.bookingRef },
          { status: "upcoming" }
        );
      } catch (err) {
        console.error("Error syncing general booking record:", err);
      }

      return NextResponse.json({
        success: true,
        status: "confirmed",
        paymentId,
        booking: {
          id: updated._id,
          bookingRef: updated.bookingRef,
          totalAmount: updated.totalAmount,
        },
      });
    }

    // Payment declined: release the hold so the room is available again.
    const updated = await HotelBooking.findOneAndUpdate(
      { _id: booking._id, status: "pending" },
      { $set: { status: "cancelled", paymentStatus: "failed" } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "This booking was already processed." },
        { status: 409 }
      );
    }

    try {
      const Booking = (await import("@/models/Booking")).default;
      await Booking.findOneAndUpdate(
        { bookingRef: booking.bookingRef },
        { status: "cancelled" }
      );
    } catch (err) {
      console.error("Error syncing general booking record:", err);
    }

    return NextResponse.json(
      {
        success: false,
        status: "cancelled",
        error: "Payment was declined. Your room hold has been released.",
      },
      { status: 402 }
    );
  } catch (error: any) {
    console.error("Mock payment error:", error);
    return NextResponse.json(
      { error: error.message || "Payment processing failed. Please try again." },
      { status: 500 }
    );
  }
}