"use client";
import {
  HotelsContextProvider,
  useHotelsContext,
} from "@/app/contexts/dashboard/hotelsContext";
import { useUserContext } from "@/app/contexts/userContext";
import NavbarSpaceFill from "@/components/common/NavbarSpaceFill";
import HotelCard from "@/components/dashboard/HotelCard";
import NewHotelForm from "@/components/dashboard/NewHotelForm";
import { Hotel } from "@/models/Hotel";
import axios from "axios";

function DashboardInner() {
  const { hotels } = useHotelsContext();

  if (hotels.length === 0)
    return (
      <>
        <NavbarSpaceFill />
        <NewHotelForm />
        <div>You have not created any hotels yet.</div>
      </>
    );

  return (
    <>
      <NavbarSpaceFill />
      <NewHotelForm />
      <div className="w-full m-auto mb-4 grid grid-cols-1 lg:w-3/4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.uid} hotel={hotel} />
        ))}
      </div>
    </>
  );
}

export default async function Dashboard() {
  const { user } = useUserContext();

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hotels/?user=${user?.uid}`
  );

  const hotels = response.data.hotels as Hotel[];

  return (
    <HotelsContextProvider initHotels={hotels}>
      <DashboardInner />
    </HotelsContextProvider>
  );
}
