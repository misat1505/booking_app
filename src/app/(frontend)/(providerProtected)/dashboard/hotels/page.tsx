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

  if (hotels.length === 0)
    return (
      <>
        <NewHotelForm />
        <div>You have not created any hotels yet.</div>
      </>
    );

  return (
    <>
      <NewHotelForm />
      <div className="w-3/4 m-auto mb-4 grid grid-cols-4">
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
