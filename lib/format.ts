// lib/format.ts
export function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function nightsBetween(checkIn: string, checkOut: string) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diff = outDate.getTime() - inDate.getTime();
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export function lowestRoomPrice(rooms: { basePrice: number }[]) {
  if (!rooms?.length) return null;
  return Math.min(...rooms.map((r) => r.basePrice));
}

export function formatDateLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}