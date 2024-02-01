import DatePicker from "@/components/hotel/rooms/DatePicker";
import CarouselBackground from "@/components/common/CarouselBackground";
import {
  RoomPageContextProvider,
  RoomsPageData,
} from "@/app/contexts/public/RoomPageContext";
import RoomInfo from "@/components/hotel/rooms/RoomInfo";
import OwnerInfo from "@/components/hotel/rooms/OwnerInfo";
import { getHotel } from "@/app/api/hotels/utils/functions";
import { getRoom } from "@/app/api/rooms/utils/functions";
import { getRoomBookings } from "@/app/api/rooms/bookings/functions";
import { notFound } from "next/navigation";

const fetchData = async (
  hotelId: string,
  roomId: string
): Promise<RoomsPageData> => {
  const [hotel, room, bookings] = await Promise.all([
    getHotel(hotelId),
    getRoom(hotelId, roomId),
    getRoomBookings(roomId),
  ]);

  if (!hotel || !room) notFound();

  bookings.forEach((booking: any) => {
    booking.start = new Date(booking.start);
    booking.finish = new Date(booking.finish);
  });

  return {
    hotel,
    room,
    bookings,
  };
};

export default async function RoomPage({
  params,
}: {
  params: { hotelId: string; roomId: string };
}) {
  const { hotelId, roomId } = params;
  const { hotel, room, bookings } = await fetchData(hotelId, roomId);

  return (
    <RoomPageContextProvider hotel={hotel} room={room} bookings={bookings}>
      <CarouselBackground images={hotel.photoURLs} />

      <div className="absolute z-10 grid grid-cols-2 m-auto top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 mt-4 gap-6">
        <RoomInfo />
        <DatePicker />
        <OwnerInfo />
      </div>
    </RoomPageContextProvider>
  );
}
