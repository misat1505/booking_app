import { HotelContextProvider } from "@/app/contexts/dashboard/hotelContext";
import CarouselBackground from "@/components/common/CarouselBackground";
import HotelTiles from "@/components/dashboard/hotel/HotelTiles";
import axios from "axios";

export default async function HotelPage({
  params,
}: {
  params: { hotelId: string };
}) {
  const response1 = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hotels/?hotel=${params.hotelId}`
  );
  const hotel = response1.data.hotel;

  const response2 = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/?hotel=${hotel.uid}`
  );
  const rooms = response2.data.rooms;

  return (
    <HotelContextProvider initHotel={hotel} initRooms={rooms}>
      <CarouselBackground images={hotel.photoURLs} />
      <div className="absolute z-10 top-0">
        <HotelTiles />
      </div>
    </HotelContextProvider>
  );
}
