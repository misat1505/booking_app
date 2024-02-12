"use client";
import { HotelsContextProvider } from "@/app/contexts/dashboard/hotelsContext";
import { NewHotelFormContextProvider } from "@/app/contexts/dashboard/newHotelFormContext";
import HotelCard from "@/components/dashboard/HotelCard";
import NewHotelForm from "@/components/dashboard/NewHotelForm";
import { Hotel } from "@/models/Hotel";
import Image from "next/image";

export default function DashboardInner({ hotels }: { hotels: Hotel[] }) {
  if (hotels.length === 0)
    return (
      <HotelsContextProvider initHotels={hotels}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Image
            src={"/logo.avif"}
            alt="..."
            width={300}
            height={300}
            className="border-none"
          />
          <p className="my-4 text-sm">You have not created any hotels yet.</p>
          <NewHotelForm />
        </div>
      </HotelsContextProvider>
    );

  return (
    <HotelsContextProvider initHotels={hotels}>
      <div className="w-fit m-auto">
        <NewHotelFormContextProvider>
          <NewHotelForm />
        </NewHotelFormContextProvider>
        <div className="w-fit m-auto mb-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.uid} hotel={hotel} />
          ))}
        </div>
      </div>
    </HotelsContextProvider>
  );
}
