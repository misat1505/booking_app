import { Booking } from "@/models/Booking";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Loading from "@/components/common/Loading";
import { Hotel } from "@/models/Hotel";
import { Room } from "@/models/Room";
import { useEffect, useState } from "react";
import axios from "axios";
import { convertDate } from "./utils/convertDate";

export default function BookingModalContent({ booking }: { booking: Booking }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms?room=${booking.roomId}`
      );
      const fetchedRoom = response.data.room as Room;
      setRoom(fetchedRoom);

      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/hotels?hotel=${fetchedRoom.hotelId}`
      );
      const fetchedHotel = response2.data.hotel as Hotel;
      setHotel(fetchedHotel);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading || !hotel || !room) {
    return <Loading />;
  }

  const displayedItems = [
    {
      title: "Check-in: ",
      value: convertDate(new Date(booking.start as any)),
    },
    {
      title: "Check-out: ",
      value: convertDate(new Date(booking.finish as any)),
    },
    {
      title: "Room: ",
      value: room.name,
    },
    {
      title: "Price: ",
      value: `${booking.price}$`,
    },
    {
      title: "Owner: ",
      value: hotel.owner.displayName,
    },
  ];

  return (
    <>
      <DialogHeader>
        <DialogTitle>Booking in {hotel.name}</DialogTitle>
      </DialogHeader>
      <div className="">
        {displayedItems.map(({ title, value }, id) => (
          <div key={id}>
            <span className="font-semibold">{title}</span>
            {value}
          </div>
        ))}
      </div>
    </>
  );
}
