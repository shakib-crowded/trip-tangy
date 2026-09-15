// app/hotels/[slug]/book/page.tsx

import { Suspense } from "react";
import BookRoomPage from "./BookRoomPage";

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