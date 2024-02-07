import { Booking } from "@/models/Booking";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import BookingCard from "./BookingCard";
import BookingModalContent from "./BookingModalContent";

export default function BookingItem({ booking }: { booking: Booking }) {
  return (
    <Dialog>
      <DialogTrigger>
        <BookingCard booking={booking} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <BookingModalContent booking={booking} />
      </DialogContent>
    </Dialog>
  );
}
