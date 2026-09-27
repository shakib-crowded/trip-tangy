// app/register/page.tsx

import { Metadata } from "next";
import { Suspense } from "react";
import RegisterPage from "./RegisterPage";

export const metadata: Metadata = {
  title: "Create an Account",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

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