import NavbarSpaceFill from "@/components/common/NavbarSpaceFill";
import { Booking } from "@/models/Booking";
import { Room } from "@/models/Room";
import axios from "axios";
import DatePicker from "@/components/hotel/rooms/DatePicker";
import { Hotel } from "@/models/Hotel";
import CarouselBackground from "@/components/common/CarouselBackground";
import {
  RoomPageContextProvider,
  RoomsPageData,
} from "@/app/contexts/public/RoomPageContext";
import RoomInfo from "@/components/hotel/rooms/RoomInfo";
import OwnerInfo from "@/components/hotel/rooms/OwnerInfo";

const fetchData = async (
  hotelId: string,
  roomId: string
): Promise<RoomsPageData> => {
  const [hotelsResponse, roomsResponse, bookingsResponse] = await Promise.all([
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hotels/?hotel=${hotelId}`),
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/?hotel=${hotelId}&room=${roomId}`
    ),
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/bookings/?room=${roomId}`
    ),
  ]);

  const hotel = hotelsResponse.data.hotel as Hotel;
  const room = roomsResponse.data.room as Room;

  bookingsResponse.data.bookings.forEach((booking: any) => {
    booking.start = new Date(booking.start);
    booking.finish = new Date(booking.finish);
  });

  const bookings = bookingsResponse.data.bookings as Booking[];

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
  const { hotel, room, bookings } = await fetchData(
    params.hotelId,
    params.roomId
  );

  return (
    <RoomPageContextProvider hotel={hotel} room={room} bookings={bookings}>
      <NavbarSpaceFill />
      <CarouselBackground images={hotel.photoURLs} />

      <div className="absolute z-10 grid grid-cols-2 m-auto left-1/2 -translate-x-1/2 mt-8 gap-6">
        <RoomInfo />
        <DatePicker />
        <OwnerInfo />
      </div>
    </RoomPageContextProvider>
  );
}
