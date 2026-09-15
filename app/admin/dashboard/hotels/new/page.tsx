// app/dashboard/hotels/new/page.tsx
import { PlusCircle } from "lucide-react";
import HotelForm from "@/app/components/Admin/HotelForm";

export default function NewHotelPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
          <PlusCircle className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-primary">Add a hotel</h1>
          <p className="text-sm text-primary/50">
            Create a new listing with rooms, pricing, and photos.
          </p>
        </div>
      </div>

      <HotelForm mode="create" />
    </div>
  );
}