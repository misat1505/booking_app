import { getHotel } from "@/app/api/hotels/utils/functions";
import { getHotelRooms } from "@/app/api/rooms/utils/functions";
import { HotelContextProvider } from "@/app/contexts/dashboard/hotelContext";
import CarouselBackground from "@/components/common/CarouselBackground";
import HotelTiles from "@/components/dashboard/hotel/HotelTiles";
import { notFound } from "next/navigation";

export default async function HotelPage({
  params,
}: {
  params: { hotelId: string };
}) {
  const hotel = await getHotel(params.hotelId);
  if (!hotel) notFound();

  const rooms = await getHotelRooms(hotel.uid);

  return (
    <HotelContextProvider initHotel={hotel} initRooms={rooms}>
      <CarouselBackground images={hotel.photoURLs} />
      <div className="absolute z-10 top-0">
        <HotelTiles />
      </div>
    </HotelContextProvider>
  );
}
