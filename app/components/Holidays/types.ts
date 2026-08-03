// app/components/holidays/types.ts

export interface Destination {
  id: number;
  name: string;
  country: string;
  price: number;
  duration: string; // e.g. "7 Days, 6 Nights"
  rating: string;
  reviews: string;
  image: string;
}