// app/booking/payment/page.tsx

import { Suspense } from "react";
import PaymentPage from "./PaymentPage";

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