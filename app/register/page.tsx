// app/register/RegisterPage.tsx

import { Suspense } from "react";
import RegisterPage from "./RegisterPage";

export default function RegisterPageRoute() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[60vh] items-center justify-center">
          <div className="text-sm text-primary/60">
            Loading registration...
          </div>
        </div>
      }
    >
      <RegisterPage />
    </Suspense>
  );
}