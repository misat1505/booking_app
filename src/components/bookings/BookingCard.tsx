import { Booking } from "@/models/Booking";
import StyledButton from "../common/StyledButton";

export default function BookingCard({ booking }: { booking: Booking }) {
  const convertDate = (date: Date): string => {
    const options = { year: "numeric", month: "long", day: "numeric" };

    return date.toLocaleDateString("en-US", options as any);
  };

  return (
    <div className="p-4 bg-slate-100 hover:bg-slate-200 hover:cursor-pointer rounded-md text-left">
      <div>
        {convertDate(new Date(booking.start as any))} -{" "}
        {convertDate(new Date(booking.finish as any))}
      </div>
      <div>Price: {booking.price}$</div>
      <StyledButton className="mt-4">Show details</StyledButton>
    </div>
  );
}
