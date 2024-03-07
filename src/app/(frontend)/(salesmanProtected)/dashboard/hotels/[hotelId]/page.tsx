import { decodeCredentials } from "@/actions/decodeCredentials";
import { getHotel } from "@/app/api/hotels/utils/functions";
import { getHotelRooms } from "@/app/api/rooms/utils/functions";
import { HotelContextProvider } from "@/app/contexts/dashboard/hotelContext";
import CarouselBackground from "@/components/common/CarouselBackground";
import HotelTiles from "@/components/dashboard/hotel/HotelTiles";
import { notFound, redirect } from "next/navigation";

export default async function HotelPage({
  params,
}: {
  params: { hotelId: string };
}) {
  const { success, credentials } = decodeCredentials();
  if (!success || credentials.role !== "SALESMAN")
    redirect("/login?role=salesman");

  const hotel = await getHotel(params.hotelId);
  if (!hotel) notFound();

  if (hotel.owner.uid !== credentials.uid)
    throw new Error(
      `You are not the owner of ${hotel.name}, thus you can't preview it.`
    );

  const rooms = await getHotelRooms(hotel.uid);

  return (
    <HotelContextProvider initHotel={hotel} initRooms={rooms}>
      <CarouselBackground images={hotel.photoURLs} />
      <div className="absolute z-10 top-0 w-full">
        <HotelTiles />
      </div>
    </HotelContextProvider>
  );
}
