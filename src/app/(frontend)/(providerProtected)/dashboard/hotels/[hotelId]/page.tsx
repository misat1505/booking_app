import { HotelContextProvider } from "@/app/contexts/dashboard/hotelContext";
import HotelImagesCarousel from "@/components/dashboard/hotel/HotelImagesCarousel";
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
      <div>
        <HotelImagesCarousel />
        <div className="absolute z-10" style={{ top: "86px" }}>
          <HotelTiles />
        </div>
      </div>
    </HotelContextProvider>
  );
}
