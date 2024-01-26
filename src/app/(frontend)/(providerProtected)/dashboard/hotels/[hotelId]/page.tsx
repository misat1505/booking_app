"use client";
import {
  HotelContextProvider,
  useHotelContext,
} from "@/app/contexts/dashboard/hotelContext";
import Loading from "@/components/common/Loading";
import HotelImagesCarousel from "@/components/dashboard/hotel/HotelImagesCarousel";
import HotelTiles from "@/components/dashboard/hotel/HotelTiles";

async function HotelPageInner() {
  const { hotel, isLoading } = useHotelContext();

  if (isLoading) return <Loading />;

  return (
    <div>
      <HotelImagesCarousel />
      <div className="absolute z-10" style={{ top: "86px" }}>
        <HotelTiles />
      </div>
    </div>
  );
}

export default function HotelPage({ params }: { params: { hotelId: string } }) {
  return (
    <HotelContextProvider hotelId={params.hotelId}>
      <HotelPageInner />
    </HotelContextProvider>
  );
}
