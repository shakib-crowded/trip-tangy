// app/components/Admin/HotelForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2, ImagePlus, BedDouble, Trash2 } from "lucide-react";
import Image from "next/image";

interface RoomInput {
  id: string; // client-side key only
  roomType: string;
  description: string;
  maxOccupancy: number;
  maxAdults: number;
  maxChildren: number;
  basePrice: number;
  totalRooms: number;
  amenities: string[];
  images: string[];
}

export interface HotelFormValues {
  name: string;
  description: string;
  city: string;
  state: string;
  address: string;
  starRating: number;
  amenities: string[];
  images: string[];
  policies: { checkIn: string; checkOut: string; cancellation: string };
  rooms: RoomInput[];
}

const emptyRoom = (): RoomInput => ({
  id: crypto.randomUUID(),
  roomType: "",
  description: "",
  maxOccupancy: 2,
  maxAdults: 2,
  maxChildren: 0,
  basePrice: 0,
  totalRooms: 1,
  amenities: [],
  images: [],
});

const defaultValues: HotelFormValues = {
  name: "",
  description: "",
  city: "",
  state: "",
  address: "",
  starRating: 3,
  amenities: [],
  images: [],
  policies: {
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    cancellation: "Free cancellation up to 24 hours before check-in",
  },
  rooms: [emptyRoom()],
};

// Chip-style input: type a value, hit Enter to add it as a tag.
function TagField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
}) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft("");
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-primary/15 bg-white p-2">
        {values.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1 rounded-full bg-primary/5 py-1 pl-3 pr-1.5 text-xs font-medium text-primary/80"
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="rounded-full p-0.5 text-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag();
            }
          }}
          onBlur={addTag}
          placeholder={values.length ? "" : placeholder}
          className="min-w-30 flex-1 border-none px-1 py-1 text-sm text-primary outline-none placeholder:text-primary/30"
        />
      </div>
    </div>
  );
}

function TextInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-primary">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-primary/15 bg-white px-3.5 py-2.5 text-sm text-primary outline-none transition focus:border-secondary/50 focus:ring-2 focus:ring-secondary/10"
      />
    </div>
  );
}

export default function HotelForm({
  mode,
  hotelId,
  initialValues,
}: {
  mode: "create" | "edit";
  hotelId?: string;
  initialValues?: Partial<HotelFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<HotelFormValues>({
    ...defaultValues,
    ...initialValues,
    rooms:
      initialValues?.rooms && initialValues.rooms.length > 0
        ? initialValues.rooms
        : [emptyRoom()],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateRoom = (id: string, patch: Partial<RoomInput>) => {
    setValues((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  };

  const addImageUrl = (url: string) => {
    const v = url.trim();
    if (v) setValues((prev) => ({ ...prev, images: [...prev.images, v] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !values.name ||
      !values.description ||
      !values.city ||
      !values.address
    ) {
      setError("Name, description, city and address are required.");
      return;
    }
    if (values.rooms.some((r) => !r.roomType)) {
      setError("Every room needs a room type.");
      return;
    }

    // Validate room occupancy logic
    for (const room of values.rooms) {
      if (room.maxAdults > room.maxOccupancy) {
        setError(
          `Room "${room.roomType || "Unnamed"}": Max adults (${room.maxAdults}) cannot exceed max occupancy (${room.maxOccupancy}).`,
        );
        return;
      }
      if (room.maxChildren > room.maxOccupancy) {
        setError(
          `Room "${room.roomType || "Unnamed"}": Max children (${room.maxChildren}) cannot exceed max occupancy (${room.maxOccupancy}).`,
        );
        return;
      }
      if (room.maxAdults + room.maxChildren > room.maxOccupancy) {
        setError(
          `Room "${room.roomType || "Unnamed"}": Combined max adults (${room.maxAdults}) and children (${room.maxChildren}) cannot exceed max occupancy (${room.maxOccupancy}).`,
        );
        return;
      }
      if (room.maxAdults < 1) {
        setError(
          `Room "${room.roomType || "Unnamed"}": Must have at least 1 adult.`,
        );
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        rooms: values.rooms.map(({ id, ...rest }) => rest),
      };
      const res = await fetch(
        mode === "create"
          ? "/api/admin/hotels"
          : `/api/admin/hotels/${hotelId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }
      router.push("/admin/dashboard/hotels");
      router.refresh();
    } catch {
      setError("Something went wrong. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-accent">
          {error}
        </div>
      )}

      {/* Basics */}
      <section className="rounded-2xl border border-primary/10 bg-white p-6">
        <h2 className="mb-4 text-base font-bold text-primary">Basics</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextInput
              label="Hotel name"
              value={values.name}
              onChange={(e) =>
                setValues((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Ocean Pearl Resort"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-primary">
              Description
            </label>
            <textarea
              value={values.description}
              onChange={(e) =>
                setValues((p) => ({ ...p, description: e.target.value }))
              }
              rows={4}
              placeholder="What makes this stay worth booking?"
              className="w-full resize-none rounded-xl border border-primary/15 bg-white px-3.5 py-2.5 text-sm text-primary outline-none transition focus:border-secondary/50 focus:ring-2 focus:ring-secondary/10"
            />
          </div>
          <TextInput
            label="City"
            value={values.city}
            onChange={(e) => setValues((p) => ({ ...p, city: e.target.value }))}
            placeholder="Goa"
          />
          <TextInput
            label="State"
            value={values.state}
            onChange={(e) =>
              setValues((p) => ({ ...p, state: e.target.value }))
            }
            placeholder="Goa"
          />
          <div className="sm:col-span-2">
            <TextInput
              label="Address"
              value={values.address}
              onChange={(e) =>
                setValues((p) => ({ ...p, address: e.target.value }))
              }
              placeholder="Candolim Beach Road, Bardez"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">
              Star rating
            </label>
            <select
              value={values.starRating}
              onChange={(e) =>
                setValues((p) => ({ ...p, starRating: Number(e.target.value) }))
              }
              className="w-full rounded-xl border border-primary/15 bg-white px-3.5 py-2.5 text-sm text-primary outline-none focus:border-secondary/50"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Amenities & images */}
      <section className="rounded-2xl border border-primary/10 bg-white p-6">
        <h2 className="mb-4 text-base font-bold text-primary">
          Amenities &amp; photos
        </h2>
        <div className="space-y-4">
          <TagField
            label="Hotel amenities"
            values={values.amenities}
            onChange={(next) => setValues((p) => ({ ...p, amenities: next }))}
            placeholder="Pool, Free Wi-Fi, Spa — press Enter to add"
          />

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">
              Photos
            </label>
            <ImageUrlList
              images={values.images}
              onAdd={addImageUrl}
              onRemove={(url) =>
                setValues((p) => ({
                  ...p,
                  images: p.images.filter((i) => i !== url),
                }))
              }
            />
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="rounded-2xl border border-primary/10 bg-white p-6">
        <h2 className="mb-4 text-base font-bold text-primary">Policies</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <TextInput
            label="Check-in"
            value={values.policies.checkIn}
            onChange={(e) =>
              setValues((p) => ({
                ...p,
                policies: { ...p.policies, checkIn: e.target.value },
              }))
            }
          />
          <TextInput
            label="Check-out"
            value={values.policies.checkOut}
            onChange={(e) =>
              setValues((p) => ({
                ...p,
                policies: { ...p.policies, checkOut: e.target.value },
              }))
            }
          />
          <div className="sm:col-span-3">
            <TextInput
              label="Cancellation policy"
              value={values.policies.cancellation}
              onChange={(e) =>
                setValues((p) => ({
                  ...p,
                  policies: { ...p.policies, cancellation: e.target.value },
                }))
              }
            />
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="rounded-2xl border border-primary/10 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-primary">Room types</h2>
          <button
            type="button"
            onClick={() =>
              setValues((p) => ({ ...p, rooms: [...p.rooms, emptyRoom()] }))
            }
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/5 px-3.5 py-1.5 text-sm font-semibold text-secondary transition hover:bg-secondary/10"
          >
            <Plus className="h-4 w-4" />
            Add room type
          </button>
        </div>

        <div className="space-y-5">
          {values.rooms.map((room, i) => (
            <div
              key={room.id}
              className="rounded-xl border border-primary/10 bg-primary/2 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-primary/70">
                  <BedDouble className="h-4 w-4" />
                  Room {i + 1}
                </p>
                {values.rooms.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setValues((p) => ({
                        ...p,
                        rooms: p.rooms.filter((r) => r.id !== room.id),
                      }))
                    }
                    className="cursor-pointer rounded-full p-1.5 text-accent/70 transition hover:bg-accent/5 hover:text-accent"
                    aria-label="Remove room"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <TextInput
                  label="Room type"
                  value={room.roomType}
                  onChange={(e) =>
                    updateRoom(room.id, { roomType: e.target.value })
                  }
                  placeholder="Deluxe Sea View"
                />
                <TextInput
                  label="Max occupancy"
                  type="number"
                  min={1}
                  value={room.maxOccupancy}
                  onChange={(e) =>
                    updateRoom(room.id, {
                      maxOccupancy: Number(e.target.value),
                    })
                  }
                />
                <TextInput
                  label="Max adults"
                  type="number"
                  min={1}
                  value={room.maxAdults}
                  onChange={(e) =>
                    updateRoom(room.id, { maxAdults: Number(e.target.value) })
                  }
                />
                <TextInput
                  label="Max children"
                  type="number"
                  min={0}
                  value={room.maxChildren}
                  onChange={(e) =>
                    updateRoom(room.id, { maxChildren: Number(e.target.value) })
                  }
                />
                <TextInput
                  label="Base price per night (₹)"
                  type="number"
                  min={0}
                  value={room.basePrice}
                  onChange={(e) =>
                    updateRoom(room.id, { basePrice: Number(e.target.value) })
                  }
                />
                <TextInput
                  label="Total rooms available"
                  type="number"
                  min={0}
                  value={room.totalRooms}
                  onChange={(e) =>
                    updateRoom(room.id, { totalRooms: Number(e.target.value) })
                  }
                />
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-primary">
                    Room description
                  </label>
                  <textarea
                    value={room.description}
                    onChange={(e) =>
                      updateRoom(room.id, { description: e.target.value })
                    }
                    rows={2}
                    className="w-full resize-none rounded-xl border border-primary/15 bg-white px-3.5 py-2.5 text-sm text-primary outline-none focus:border-secondary/50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <TagField
                    label="Room amenities"
                    values={room.amenities}
                    onChange={(next) =>
                      updateRoom(room.id, { amenities: next })
                    }
                    placeholder="AC, Balcony, Mini bar"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard/hotels")}
          className="cursor-pointer rounded-full border border-primary/15 px-5 py-2.5 text-sm font-semibold text-primary/70 transition hover:bg-primary/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {mode === "create" ? "Creating..." : "Saving..."}
            </>
          ) : mode === "create" ? (
            "Create hotel"
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </form>
  );
}

function ImageUrlList({
  images,
  onAdd,
  onRemove,
}: {
  images: string[];
  onAdd: (url: string) => void;
  onRemove: (url: string) => void;
}) {
  const [draft, setDraft] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="https://images.example.com/hotel-lobby.jpg"
          className="flex-1 rounded-xl border border-primary/15 bg-white px-3.5 py-2.5 text-sm text-primary outline-none focus:border-secondary/50"
        />
        <button
          type="button"
          onClick={() => {
            if (draft.trim()) {
              onAdd(draft.trim());
              setDraft("");
            }
          }}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-primary/15 px-4 text-sm font-semibold text-primary transition hover:bg-primary/5"
        >
          <ImagePlus className="h-4 w-4" />
          Add
        </button>
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((url) => (
            <div
              key={url}
              className="group relative aspect-video overflow-hidden rounded-lg border border-primary/10 bg-primary/5"
            >
              <Image
                src={url}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.opacity = "0.2";
                }}
              />

              <button
                type="button"
                onClick={() => onRemove(url)}
                className="absolute right-1 top-1 cursor-pointer rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
