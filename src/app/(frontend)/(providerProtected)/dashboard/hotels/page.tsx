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
      <div style={{ height: "88px" }} />
      <NewHotelForm />
      <div className="w-full m-auto mb-4 grid grid-cols-1 lg:w-3/4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
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
