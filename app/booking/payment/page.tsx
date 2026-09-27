// app/booking/payment/page.tsx

import { Metadata } from "next";
import { Suspense } from "react";
import PaymentPage from "./PaymentPage";

export const metadata: Metadata = {
  title: "Payment | Trip Tangy",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PaymentPageRoute() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[60vh] items-center justify-center">
          <div className="text-sm text-primary/60">
            Loading payment...
          </div>
        </div>
      }
    >
      <PaymentPage />
    </Suspense>
  );
}