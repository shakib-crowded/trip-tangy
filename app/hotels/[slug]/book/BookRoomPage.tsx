// app/hotels/[slug]/book/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Users,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatINR, nightsBetween, formatDateLabel } from "@/lib/format";
import Image from "next/image";

interface HotelSummary {
  _id: string;
  name: string;
  city: string;
  images: string[];
  rooms: {
    _id: string;
    roomType: string;
    basePrice: number;
    maxOccupancy: number;
    maxAdults: number;
    maxChildren: number;
  }[];
}

interface GuestDetails {
  salutation: "Mr." | "Mrs." | "Ms." | "Dr." | "Other";
  firstName: string;
  lastName: string;
  age?: number; // Required for children (1-17), optional for adults
  isChild?: boolean;
}

interface GuestForm {
  primaryGuest: GuestDetails & {
    email: string;
    phone: string;
  };
  adultGuests: GuestDetails[];
  childGuests: GuestDetails[];
}

interface FormErrors {
  primaryGuest?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  adultGuests?: { [key: number]: { firstName?: string; lastName?: string } };
  childGuests?: {
    [key: number]: { firstName?: string; lastName?: string; age?: string };
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10;
}

function isValidName(name: string) {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\s.'-]{2,}$/.test(name.trim());
}

function isValidAge(age: number): boolean {
  return age >= 1 && age <= 17;
}

export default function BookRoomPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const roomId = searchParams.get("roomId") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const adults = Number(searchParams.get("adults") ?? 1);
  const children = Number(searchParams.get("children") ?? 0);
  const infants = Number(searchParams.get("infants") ?? 0);
  const totalGuests = adults + children + infants;

  const [hotel, setHotel] = useState<HotelSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState<GuestForm>({
    primaryGuest: {
      salutation: "Mr.",
      firstName: user?.name?.split(" ")[0] ?? "",
      lastName: user?.name?.split(" ").slice(1).join(" ") ?? "",
      email: user?.email ?? "",
      phone: "",
      isChild: false,
    },
    adultGuests: [],
    childGuests: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Initialize additional guests based on adults and children count
  useEffect(() => {
    setForm((prev) => {
      // Handle adult guests (excluding primary)
      const adultCount = Math.max(0, adults - 1);
      const currentAdultCount = prev.adultGuests.length;

      let newAdultGuests = [...prev.adultGuests];

      if (currentAdultCount < adultCount) {
        // Add adults
        for (let i = currentAdultCount; i < adultCount; i++) {
          newAdultGuests.push({
            salutation: "Mr.",
            firstName: "",
            lastName: "",
            isChild: false,
          });
        }
      } else if (currentAdultCount > adultCount) {
        // Remove adults
        newAdultGuests = newAdultGuests.slice(0, adultCount);
      }

      // Handle children
      const currentChildCount = prev.childGuests.length;
      let newChildGuests = [...prev.childGuests];

      if (currentChildCount < children) {
        // Add children
        for (let i = currentChildCount; i < children; i++) {
          newChildGuests.push({
            salutation: "Mr.",
            firstName: "",
            lastName: "",
            age: undefined,
            isChild: true,
          });
        }
      } else if (currentChildCount > children) {
        // Remove children
        newChildGuests = newChildGuests.slice(0, children);
      }

      return {
        ...prev,
        adultGuests: newAdultGuests,
        childGuests: newChildGuests,
      };
    });
  }, [adults, children]);

  useEffect(() => {
    let cancelled = false;

    async function loadHotel() {
      try {
        setIsLoading(true);
        setLoadError("");

        const response = await fetch(`/api/hotels/${slug}`);

        if (!response.ok) {
          throw new Error("Unable to load hotel");
        }

        const data = await response.json();

        if (!cancelled) {
          setHotel(data.hotel ?? null);
        }
      } catch {
        if (!cancelled) {
          setLoadError(
            "We couldn't load this hotel. Please go back and try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadHotel();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      primaryGuest: {
        ...prev.primaryGuest,
        firstName:
          prev.primaryGuest.firstName || user?.name?.split(" ")[0] || "",
        lastName:
          prev.primaryGuest.lastName ||
          user?.name?.split(" ").slice(1).join(" ") ||
          "",
        email: prev.primaryGuest.email || user?.email || "",
      },
    }));
  }, [user]);

  useEffect(() => {
    // Check if user is authenticated
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.status === 401) {
          // User is not authenticated, redirect to login
          const returnUrl = encodeURIComponent(
            window.location.pathname + window.location.search,
          );
          router.push(`/login?returnUrl=${returnUrl}`);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    }

    checkAuth();
  }, [router]);

  const room = useMemo(() => {
    return hotel?.rooms.find((item) => item._id === roomId);
  }, [hotel, roomId]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return nightsBetween(checkIn, checkOut);
  }, [checkIn, checkOut]);

  const total = room && nights > 0 ? room.basePrice * nights : 0;

  const bookingIsValid =
    Boolean(hotel) &&
    Boolean(room) &&
    Boolean(checkIn) &&
    Boolean(checkOut) &&
    nights > 0 &&
    totalGuests > 0 &&
    totalGuests <= (room?.maxOccupancy || 0) &&
    adults <= (room?.maxAdults || 0) &&
    children <= (room?.maxChildren || 0);

  const updatePrimaryGuest = <K extends keyof GuestForm["primaryGuest"]>(
    field: K,
    value: GuestForm["primaryGuest"][K],
  ) => {
    setForm((prev) => ({
      ...prev,
      primaryGuest: {
        ...prev.primaryGuest,
        [field]: value,
      },
    }));

    // Clear error for this field
    if (errors.primaryGuest) {
      setErrors((prev) => ({
        ...prev,
        primaryGuest: {
          ...prev.primaryGuest,
          [field]: undefined,
        },
      }));
    }
  };

  const updateAdultGuest = (
    index: number,
    field: keyof GuestDetails,
    value: string,
  ) => {
    setForm((prev) => {
      const newGuests = [...prev.adultGuests];
      newGuests[index] = {
        ...newGuests[index],
        [field]: value,
      };
      return { ...prev, adultGuests: newGuests };
    });

    // Clear error for this field
    if (errors.adultGuests && errors.adultGuests[index]) {
      setErrors((prev) => ({
        ...prev,
        adultGuests: {
          ...prev.adultGuests,
          [index]: {
            ...prev.adultGuests?.[index],
            [field]: undefined,
          },
        },
      }));
    }
  };

  const updateChildGuest = (
    index: number,
    field: keyof GuestDetails,
    value: string | number | undefined,
  ) => {
    setForm((prev) => {
      const newGuests = [...prev.childGuests];
      newGuests[index] = {
        ...newGuests[index],
        [field]: value,
      };
      return { ...prev, childGuests: newGuests };
    });

    // Clear error for this field
    if (errors.childGuests && errors.childGuests[index]) {
      setErrors((prev) => ({
        ...prev,
        childGuests: {
          ...prev.childGuests,
          [index]: {
            ...prev.childGuests?.[index],
            [field]: undefined,
          },
        },
      }));
    }
  };

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};
    const { primaryGuest, adultGuests, childGuests } = form;

    // Validate primary guest
    const primaryErrors: any = {};
    if (!primaryGuest.firstName.trim()) {
      primaryErrors.firstName = "Please enter first name.";
    } else if (!isValidName(primaryGuest.firstName)) {
      primaryErrors.firstName = "Please enter a valid first name.";
    }

    if (!primaryGuest.lastName.trim()) {
      primaryErrors.lastName = "Please enter last name.";
    } else if (!isValidName(primaryGuest.lastName)) {
      primaryErrors.lastName = "Please enter a valid last name.";
    }

    if (!primaryGuest.email.trim()) {
      primaryErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(primaryGuest.email)) {
      primaryErrors.email = "Please enter a valid email address.";
    }

    if (!primaryGuest.phone.trim()) {
      primaryErrors.phone = "Please enter your phone number.";
    } else if (!isValidPhone(primaryGuest.phone)) {
      primaryErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (Object.keys(primaryErrors).length > 0) {
      nextErrors.primaryGuest = primaryErrors;
    }

    // Validate adult guests
    const adultErrors: { [key: number]: any } = {};
    adultGuests.forEach((guest, index) => {
      const errors: any = {};
      if (!guest.firstName.trim()) {
        errors.firstName = "Please enter first name.";
      } else if (!isValidName(guest.firstName)) {
        errors.firstName = "Please enter a valid first name.";
      }

      if (!guest.lastName.trim()) {
        errors.lastName = "Please enter last name.";
      } else if (!isValidName(guest.lastName)) {
        errors.lastName = "Please enter a valid last name.";
      }

      if (Object.keys(errors).length > 0) {
        adultErrors[index] = errors;
      }
    });

    if (Object.keys(adultErrors).length > 0) {
      nextErrors.adultGuests = adultErrors;
    }

    // Validate child guests
    const childErrors: { [key: number]: any } = {};
    childGuests.forEach((guest, index) => {
      const errors: any = {};
      if (!guest.firstName.trim()) {
        errors.firstName = "Please enter first name.";
      } else if (!isValidName(guest.firstName)) {
        errors.firstName = "Please enter a valid first name.";
      }

      if (!guest.lastName.trim()) {
        errors.lastName = "Please enter last name.";
      } else if (!isValidName(guest.lastName)) {
        errors.lastName = "Please enter a valid last name.";
      }

      if (guest.age === undefined || guest.age === null) {
        errors.age = "Please enter age.";
      } else if (!isValidAge(guest.age)) {
        errors.age = "Age must be between 1 and 17.";
      }

      if (Object.keys(errors).length > 0) {
        childErrors[index] = errors;
      }
    });

    if (Object.keys(childErrors).length > 0) {
      nextErrors.childGuests = childErrors;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // First check if user is authenticated via API
    try {
      const authResponse = await fetch("/api/auth/me");
      if (authResponse.status === 401) {
        // Redirect to login
        const returnUrl = encodeURIComponent(
          window.location.pathname + window.location.search,
        );
        router.push(`/login?returnUrl=${returnUrl}`);
        return;
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setLoadError("Please login to continue with your booking.");
      return;
    }

    if (!bookingIsValid) {
      setLoadError(
        "Your booking details are incomplete or invalid. Please go back and select the room again.",
      );
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setLoadError("");

    try {
      // Combine all guests
      const allGuests = [
        { ...form.primaryGuest, isPrimary: true, isChild: false },
        ...form.adultGuests.map((g) => ({
          ...g,
          isPrimary: false,
          isChild: false,
        })),
        ...form.childGuests.map((g) => ({
          ...g,
          isPrimary: false,
          isChild: true,
        })),
      ];

      const payload = {
        hotelId: hotel!._id,
        hotelName: hotel!.name,
        hotelCity: hotel!.city,
        hotelImage: hotel!.images[0] ?? "",
        hotelSlug: slug,
        roomId: room!._id,
        roomType: room!.roomType,
        basePrice: room!.basePrice,
        checkIn,
        checkOut,
        nights,
        adults,
        children,
        infants,
        totalGuests,
        total,
        guests: allGuests.map((g) => ({
          salutation: g.salutation,
          firstName: g.firstName,
          lastName: g.lastName,
          fullName: `${g.firstName} ${g.lastName}`.trim(),
          age: g.age,
          isChild: g.isChild || false,
          isPrimary: g.isPrimary || false,
          email: g.isPrimary ? form.primaryGuest.email : undefined,
          phone: g.isPrimary ? form.primaryGuest.phone : undefined,
        })),
      };

      const response = await fetch("/api/bookings/hotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          // Redirect to login
          const returnUrl = encodeURIComponent(
            window.location.pathname + window.location.search,
          );
          router.push(`/login?returnUrl=${returnUrl}`);
          return;
        }
        throw new Error(data.error || "Failed to create booking.");
      }

      // Store booking data in session for payment
      sessionStorage.setItem(
        "tt_booking_draft",
        JSON.stringify({
          ...payload,
          bookingId: data.booking.id,
          bookingRef: data.booking.bookingRef,
          expiresAt: data.booking.expiresAt,
        }),
      );

      // Redirect to payment page
      router.push(
        `/booking/payment?bookingId=${data.booking.id}&ref=${data.booking.bookingRef}`,
      );
    } catch (error: any) {
      console.error("Booking error:", error);
      setLoadError(
        error.message || "Failed to create booking. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-[60vh] bg-gray-50">
        <div className="flex items-center justify-center py-32">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading booking details...
          </div>
        </div>
      </main>
    );
  }

  if (loadError || !hotel || !room || !bookingIsValid) {
    return (
      <main className="min-h-[60vh] bg-gray-50">
        <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <AlertCircle className="h-6 w-6 text-gray-500" />
          </div>
          <h1 className="mt-5 text-xl font-semibold text-gray-900">
            Booking details unavailable
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            {loadError ||
              "We couldn't find the room or stay details you selected."}
          </p>
          <button
            type="button"
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-7">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to hotel
          </button>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Complete your booking
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Enter guest details to continue to secure payment.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT */}
          <div className="space-y-5">
            {/* Selected stay */}
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-24 sm:w-24">
                  {hotel.images[0] ? (
                    <Image
                      src={hotel.images[0]}
                      alt={hotel.name}
                      fill
                      sizes="(max-width: 640px) 80px, 96px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                    {hotel.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{hotel.city}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span>{room.roomType}</span>
                    <span>
                      {formatDateLabel(checkIn)} – {formatDateLabel(checkOut)}
                    </span>
                    <span>
                      {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
                      {adults > 0 &&
                        ` (${adults} adult${adults !== 1 ? "s" : ""}`}
                      {children > 0 &&
                        `, ${children} child${children !== 1 ? "ren" : ""}`}
                      {infants > 0 &&
                        `, ${infants} infant${infants !== 1 ? "s" : ""}`}
                      {totalGuests > 0 && ")"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Guest details */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Guest details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Please provide details for all guests staying in this room.
                </p>
                {children > 0 && (
                  <p className="mt-2 text-xs text-blue-600">
                    <Users className="inline h-3 w-3 mr-1" />
                    {children} child{children !== 1 ? "ren" : ""} require age
                    (1-17 years)
                  </p>
                )}
              </div>

              <form onSubmit={handleContinue} noValidate>
                <div className="space-y-6">
                  {/* Primary Guest */}
                  <div className="border-b border-gray-100 pb-5">
                    <h3 className="mb-4 text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Primary Guest (Adult)
                    </h3>

                    {/* Salutation */}
                    <div className="mb-4">
                      <label className="mb-1.5 block text-sm font-medium text-gray-800">
                        Salutation
                      </label>
                      <select
                        value={form.primaryGuest.salutation}
                        onChange={(e) =>
                          updatePrimaryGuest(
                            "salutation",
                            e.target.value as any,
                          )
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-secondary"
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* First & Last Name */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-800">
                          First name
                        </label>
                        <input
                          type="text"
                          value={form.primaryGuest.firstName}
                          onChange={(e) =>
                            updatePrimaryGuest("firstName", e.target.value)
                          }
                          placeholder="John"
                          className={`w-full rounded-lg border bg-white px-3 py-3 text-sm text-gray-900 outline-none transition ${
                            errors.primaryGuest?.firstName
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-secondary"
                          }`}
                        />
                        {errors.primaryGuest?.firstName && (
                          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.primaryGuest.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-800">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={form.primaryGuest.lastName}
                          onChange={(e) =>
                            updatePrimaryGuest("lastName", e.target.value)
                          }
                          placeholder="Doe"
                          className={`w-full rounded-lg border bg-white px-3 py-3 text-sm text-gray-900 outline-none transition ${
                            errors.primaryGuest?.lastName
                              ? "border-red-300 focus:border-red-500"
                              : "border-gray-200 focus:border-secondary"
                          }`}
                        />
                        {errors.primaryGuest?.lastName && (
                          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.primaryGuest.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-800">
                          Email address
                        </label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            value={form.primaryGuest.email}
                            onChange={(e) =>
                              updatePrimaryGuest("email", e.target.value)
                            }
                            placeholder="you@example.com"
                            className={`w-full rounded-lg border bg-white py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition ${
                              errors.primaryGuest?.email
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 focus:border-secondary"
                            }`}
                          />
                        </div>
                        {errors.primaryGuest?.email && (
                          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.primaryGuest.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-800">
                          Phone number
                        </label>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            inputMode="numeric"
                            value={form.primaryGuest.phone}
                            onChange={(e) =>
                              updatePrimaryGuest(
                                "phone",
                                e.target.value
                                  .replace(/[^\d+\s-]/g, "")
                                  .slice(0, 16),
                              )
                            }
                            placeholder="+91 98765 43210"
                            className={`w-full rounded-lg border bg-white py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition ${
                              errors.primaryGuest?.phone
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 focus:border-secondary"
                            }`}
                          />
                        </div>
                        {errors.primaryGuest?.phone && (
                          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {errors.primaryGuest.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Adults */}
                  {form.adultGuests.length > 0 && (
                    <div className="border-b border-gray-100 pb-5">
                      <h3 className="mb-4 text-sm font-semibold text-gray-800 flex items-center gap-2">
                        <UserPlus className="h-4 w-4 text-primary" />
                        Additional Adults
                      </h3>

                      <div className="space-y-4">
                        {form.adultGuests.map((guest, index) => (
                          <div
                            key={index}
                            className="rounded-lg border border-gray-100 p-4 bg-gray-50"
                          >
                            <p className="text-xs font-medium text-gray-500 mb-3">
                              Adult {index + 2}
                            </p>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                  First name
                                </label>
                                <input
                                  type="text"
                                  value={guest.firstName}
                                  onChange={(e) =>
                                    updateAdultGuest(
                                      index,
                                      "firstName",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="First name"
                                  className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none transition ${
                                    errors.adultGuests?.[index]?.firstName
                                      ? "border-red-300 focus:border-red-500"
                                      : "border-gray-200 focus:border-secondary"
                                  }`}
                                />
                                {errors.adultGuests?.[index]?.firstName && (
                                  <p className="mt-1 text-xs text-red-600">
                                    {errors.adultGuests[index].firstName}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  value={guest.lastName}
                                  onChange={(e) =>
                                    updateAdultGuest(
                                      index,
                                      "lastName",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Last name"
                                  className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none transition ${
                                    errors.adultGuests?.[index]?.lastName
                                      ? "border-red-300 focus:border-red-500"
                                      : "border-gray-200 focus:border-secondary"
                                  }`}
                                />
                                {errors.adultGuests?.[index]?.lastName && (
                                  <p className="mt-1 text-xs text-red-600">
                                    {errors.adultGuests[index].lastName}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Children */}
                  {form.childGuests.length > 0 && (
                    <div className="border-b border-gray-100 pb-5">
                      <h3 className="mb-4 text-sm font-semibold text-gray-800 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Children Details
                      </h3>

                      <div className="space-y-4">
                        {form.childGuests.map((guest, index) => (
                          <div
                            key={index}
                            className="rounded-lg border border-gray-100 p-4 bg-blue-50/30"
                          >
                            <p className="text-xs font-medium text-gray-500 mb-3">
                              Child {index + 1}
                            </p>

                            <div className="grid gap-3 sm:grid-cols-3">
                              <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                  First name
                                </label>
                                <input
                                  type="text"
                                  value={guest.firstName}
                                  onChange={(e) =>
                                    updateChildGuest(
                                      index,
                                      "firstName",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="First name"
                                  className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none transition ${
                                    errors.childGuests?.[index]?.firstName
                                      ? "border-red-300 focus:border-red-500"
                                      : "border-gray-200 focus:border-secondary"
                                  }`}
                                />
                                {errors.childGuests?.[index]?.firstName && (
                                  <p className="mt-1 text-xs text-red-600">
                                    {errors.childGuests[index].firstName}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  value={guest.lastName}
                                  onChange={(e) =>
                                    updateChildGuest(
                                      index,
                                      "lastName",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Last name"
                                  className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none transition ${
                                    errors.childGuests?.[index]?.lastName
                                      ? "border-red-300 focus:border-red-500"
                                      : "border-gray-200 focus:border-secondary"
                                  }`}
                                />
                                {errors.childGuests?.[index]?.lastName && (
                                  <p className="mt-1 text-xs text-red-600">
                                    {errors.childGuests[index].lastName}
                                  </p>
                                )}
                              </div>
                              <div>
                                <label className="mb-1 block text-xs font-medium text-gray-600">
                                  Age (1-17)
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  max="17"
                                  value={guest.age || ""}
                                  onChange={(e) =>
                                    updateChildGuest(
                                      index,
                                      "age",
                                      e.target.value
                                        ? parseInt(e.target.value)
                                        : undefined,
                                    )
                                  }
                                  placeholder="Age"
                                  className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none transition ${
                                    errors.childGuests?.[index]?.age
                                      ? "border-red-300 focus:border-red-500"
                                      : "border-gray-200 focus:border-secondary"
                                  }`}
                                />
                                {errors.childGuests?.[index]?.age && (
                                  <p className="mt-1 text-xs text-red-600">
                                    {errors.childGuests[index].age}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Continue */}
                <div className="mt-7 border-t border-gray-100 pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Continuing...
                      </>
                    ) : (
                      "Continue to payment"
                    )}
                  </button>

                  <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Your information is used only to process this booking.
                  </p>
                </div>
              </form>
            </section>
          </div>

          {/* RIGHT - SUMMARY */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 px-5 py-4">
                <h2 className="font-semibold text-gray-900">Booking summary</h2>
              </div>

              <div className="p-5">
                {/* Hotel */}
                <div className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {hotel.images[0] ? (
                      <Image
                        src={hotel.images[0]}
                        alt={hotel.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">
                      {hotel.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">{hotel.city}</p>
                  </div>
                </div>

                {/* Stay */}
                <div className="mt-5 space-y-3 border-y border-gray-100 py-4">
                  <div>
                    <p className="text-xs text-gray-400">Room</p>
                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                      {room.roomType}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400">Check-in</p>
                      <p className="mt-0.5 text-sm font-medium text-gray-900">
                        {formatDateLabel(checkIn)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Check-out</p>
                      <p className="mt-0.5 text-sm font-medium text-gray-900">
                        {formatDateLabel(checkOut)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Adults</span>
                      <span className="font-medium text-gray-900">
                        {adults}
                      </span>
                    </div>
                    {children > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Children</span>
                        <span className="font-medium text-gray-900">
                          {children}
                        </span>
                      </div>
                    )}
                    {infants > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Infants</span>
                        <span className="font-medium text-gray-900">
                          {infants}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm border-t border-gray-100 pt-2 mt-2">
                      <span className="font-medium text-gray-700">
                        Total guests
                      </span>
                      <span className="font-semibold text-gray-900">
                        {totalGuests}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-3 py-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      {formatINR(room.basePrice)} × {nights} night
                      {nights !== 1 ? "s" : ""}
                    </span>
                    <span className="font-medium text-gray-800">
                      {formatINR(total)}
                    </span>
                  </div>

                  <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Total
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        For {nights} night{nights !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {formatINR(total)}
                    </p>
                  </div>
                </div>

                {/* Trust */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-800">
                        Secure booking
                      </p>
                      <p className="mt-0.5 text-[11px] leading-4 text-gray-400">
                        Review your details before completing payment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
