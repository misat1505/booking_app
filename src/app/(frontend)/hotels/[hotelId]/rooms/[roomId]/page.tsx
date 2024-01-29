import NavbarSpaceFill from "@/components/common/NavbarSpaceFill";
import { Room } from "@/models/Room";
import axios from "axios";

export default async function RoomPage({
  params,
}: {
  params: { hotelId: string; roomId: string };
}) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/?hotel=${params.hotelId}&room=${params.roomId}`
  );

  const room = response.data.room as Room;

  return (
    <div>
      <NavbarSpaceFill />
      {JSON.stringify(room)}
    </div>
  );
}
