import { Booking } from "@/models/Booking";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import useFetch from "@/hooks/useFetch";
import Loading from "../common/Loading";

export default function BookingModalContent({ booking }: { booking: Booking }) {
  const { data, isLoading } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms?room=${booking.roomId}`
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{booking.uid}</DialogTitle>
      </DialogHeader>
      <div className="flex justify-center items-center space-x-4">
        {JSON.stringify(data)}
      </div>
    </>
  );
}
