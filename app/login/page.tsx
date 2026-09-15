// app/booking/login/page.tsx

import { Suspense } from "react";
import LoginPage from "./LoginPage";

export default function LoginPageRoute() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[60vh] items-center justify-center">
          <div className="text-sm text-primary/60">
            Loading Login...
          </div>
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}