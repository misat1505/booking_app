import { useHotelsContext } from "@/app/contexts/dashboard/hotelsContext";
import NavbarSpaceFill from "@/components/common/NavbarSpaceFill";
import HotelCard from "@/components/dashboard/HotelCard";
import NewHotelForm from "@/components/dashboard/NewHotelForm";

export default function DashboardInner() {
  const { hotels } = useHotelsContext();

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
      <div className="w-full m-auto mb-4 grid grid-cols-1 lg:w-3/4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.uid} hotel={hotel} />
        ))}
      </div>
    </>
  );
}
