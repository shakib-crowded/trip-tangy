// app/components/Hotels/ResultsSortBar.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ResultsSortBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      defaultValue={searchParams.get("sort") ?? "relevance"}
      onChange={(e) => handleSort(e.target.value)}
      className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-medium text-primary outline-none focus:border-secondary/50"
    >
      <option value="relevance">Sort: Relevance</option>
      <option value="price_asc">Price: Low to high</option>
      <option value="price_desc">Price: High to low</option>
      <option value="rating">Star rating</option>
    </select>
  );
}