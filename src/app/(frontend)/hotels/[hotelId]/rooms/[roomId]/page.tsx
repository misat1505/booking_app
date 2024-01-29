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

  const bookings: Booking[] = [
    {
      uid: "1",
      roomId: params.roomId,
      userId: "1",
      start: new Date(2024, 0, 28),
      finish: new Date(2024, 0, 30),
    },
    {
      uid: "2",
      roomId: params.roomId,
      userId: "1",
      start: new Date(2024, 1, 2),
      finish: new Date(2024, 1, 5),
    },
    {
      uid: "3",
      roomId: params.roomId,
      userId: "1",
      start: new Date(2024, 1, 8),
      finish: new Date(2024, 1, 15),
    },
  ];

  return (
    <div>
      <NavbarSpaceFill />
      {JSON.stringify(room)}
      {JSON.stringify(bookings)}
      <DatePicker bookings={bookings} room={room} />
    </div>
  );
}
