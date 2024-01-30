import NavbarSpaceFill from "@/components/common/NavbarSpaceFill";
import { Booking } from "@/models/Booking";
import { Room } from "@/models/Room";
import axios from "axios";
import DatePicker from "@/components/hotel/rooms/DatePicker";

export default async function RoomPage({
  params,
}: {
  params: { hotelId: string; roomId: string };
}) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/?hotel=${params.hotelId}&room=${params.roomId}`
  );

  const room = response.data.room as Room;

  const bookingsResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/bookings/?room=${params.roomId}`
  );

  bookingsResponse.data.bookings.forEach((booking: any) => {
    booking.start = new Date(booking.start);
    booking.finish = new Date(booking.finish);
  });

  const bookings = bookingsResponse.data.bookings as Booking[];

  return (
    <div>
      <NavbarSpaceFill />
      {JSON.stringify(room)}
      {JSON.stringify(bookings)}
      <DatePicker bookings={bookings} room={room} />
    </div>
  );
}
