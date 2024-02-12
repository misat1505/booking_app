import { decodeCredentials } from "@/actions/decodeCredentials";
import { getUserBookings } from "@/app/api/rooms/bookings/functions";
import BookingItem from "@/components/bookings/BookingItem";
import { redirect } from "next/navigation";

export default async function Bookings() {
  const { success, credentials } = decodeCredentials();
  if (!success || credentials.role !== "CUSTOMER")
    redirect("/login?role=customer");

  const bookings = await getUserBookings(credentials.uid);

  return (
    <div className="grid grid-cols-4 gap-4 m-auto my-4 max-w-[1500px]">
      {bookings.map((booking, id) => (
        <BookingItem key={id} booking={booking} />
      ))}
    </div>
  );
}
