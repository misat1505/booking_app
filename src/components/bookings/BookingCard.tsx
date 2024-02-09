import { Booking } from "@/models/Booking";
import { convertDate } from "./utils/convertDate";

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="p-4 bg-slate-100 hover:bg-slate-200 hover:cursor-pointer rounded-md text-left">
      <div>
        {convertDate(new Date(booking.start as any))} -{" "}
        {convertDate(new Date(booking.finish as any))}
      </div>
      <div>Price: {booking.price}$</div>
      <div className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 border-none hover:cursor-pointer text-sm w-fit">
        Show details
      </div>
    </div>
  );
}
