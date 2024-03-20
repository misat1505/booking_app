"use client";
import { HotelsContextProvider } from "@/app/contexts/dashboard/hotelsContext";
import { Hotel } from "@/models/Hotel";
import DashboardInner from "./DashboardInner";

export default function Hotels({ hotels }: { hotels: Hotel[] }) {
  return (
    <HotelsContextProvider initHotels={hotels}>
      <DashboardInner />
    </HotelsContextProvider>
  );
}
