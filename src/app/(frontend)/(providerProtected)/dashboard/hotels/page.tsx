"use client";
import {
  HotelsContextProvider,
  useHotelsContext,
} from "@/app/contexts/dashboard/hotelsContext";
import Loading from "@/components/common/Loading";
import HotelCard from "@/components/dashboard/HotelCard";
import NewHotelForm from "@/components/dashboard/NewHotelForm";

function DashboardInner() {
  const { isLoading, hotels } = useHotelsContext();

  if (isLoading) return <Loading />;

  return (
    <>
      <NewHotelForm />
      <div className="flex flex-wrap">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.uid} hotel={hotel} />
        ))}
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <HotelsContextProvider>
      <DashboardInner />
    </HotelsContextProvider>
  );
}
