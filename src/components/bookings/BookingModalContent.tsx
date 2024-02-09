import { Booking } from "@/models/Booking";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Loading from "@/components/common/Loading";
import { Hotel } from "@/models/Hotel";
import { Room } from "@/models/Room";
import { useEffect, useState } from "react";
import { convertDate } from "./utils/convertDate";
import { fetchRoom } from "@/actions/fetchRoom";
import { fetchHotel } from "@/actions/fetchHotel";

export default async function BookingModalContent({
  booking,
}: {
  booking: Booking;
}) {
  const [room, setRoom] = useState<Room | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedRoom = await fetchRoom(booking.roomId);
      if (!fetchedRoom) {
        setError(new Error(`Couldn't fetch data for this booking.`));
        return;
      }

      setRoom(fetchedRoom);

      const fetchedHotel = await fetchHotel(fetchedRoom!.hotelId);
      if (!fetchedHotel) {
        setError(new Error(`Couldn't fetch data for this booking.`));
        return;
      }

      setHotel(fetchedHotel);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading || !hotel || !room) {
    return (
      <div className="relative w-full h-full py-6">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
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
