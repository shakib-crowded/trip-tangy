// app/hotels/[slug]/book/page.tsx

import { Metadata } from "next";
import { Suspense } from "react";
import BookRoomPage from "./BookRoomPage";

export const metadata: Metadata = {
  title: "Complete Your Booking",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function BookRoomPageRoute() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[60vh] items-center justify-center">
          <div className="text-sm text-primary/60">
            Loading booking...
          </div>
        </div>
      }
    >
      <BookRoomPage />
    </Suspense>
  );
}