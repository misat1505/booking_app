"use client";
import { useRoomPageContext } from "@/app/contexts/public/RoomPageContext";

export default function RoomInfo() {
  const { room, hotel } = useRoomPageContext();

  return (
    <div className="bg-slate-100 rounded-md p-4">
      <h2 className="text-lg font-bold pb-4">
        Book your stay at {hotel.name} now!
      </h2>
      <div className="font-semibold">
        Room: <span className="font-normal">{room.name}</span>
      </div>
      <div className="font-semibold">
        Capacity: <span className="font-normal">{room.capacity}</span>
      </div>
      <div className="font-semibold">
        Daily charge: <span className="font-normal">{room.dailyFee}$</span>
      </div>
    </div>
  );
}
