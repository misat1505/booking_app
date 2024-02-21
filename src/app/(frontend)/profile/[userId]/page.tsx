import { getUserHotels } from "@/app/api/hotels/utils/functions";
import { getUserBookings } from "@/app/api/rooms/bookings/functions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/firebase/firebase-admin";
import { FaUser } from "react-icons/fa6";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const [user, hotels, bookings] = await Promise.all([
    auth.getUser(params.userId),
    getUserHotels(params.userId),
    getUserBookings(params.userId),
  ]);

  return (
    <div className="m-auto relative w-96 h-96 bg-slate-100 mt-40 rounded-2xl transition-all hover:shadow-lg max-w-full">
      <Avatar className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
        <AvatarImage src={user.photoURL} />
        <AvatarFallback className="bg-slate-200">
          <FaUser className="h-full pt-4 flex-grow text-slate-600" />
        </AvatarFallback>
      </Avatar>
      <div className="pt-24 flex flex-col items-center text-center justify-between h-full pb-8">
        <div>
          <h2 className="font-semibold text-lg">{user.displayName}</h2>
          <div>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
        </div>
        <div>User ID: {user.uid}</div>
        <div>
          <div>Hotels: {hotels.length}</div>
          <div>Bookings: {bookings.length}</div>
        </div>
      </div>
    </div>
  );
}
