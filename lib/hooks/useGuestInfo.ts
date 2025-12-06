"use client";

import { useSearchParams } from "next/navigation";

export interface GuestInfo {
  name: string | null;
  side: "bride" | "groom" | null;
}

export function useGuestInfo(): GuestInfo {
  const searchParams = useSearchParams();
  
  const name = searchParams.get("name");
  const side = searchParams.get("side") as "bride" | "groom" | null;
  
  // Validate side parameter
  const validSide = side === "bride" || side === "groom" ? side : null;
  
  return {
    name,
    side: validSide,
  };
}