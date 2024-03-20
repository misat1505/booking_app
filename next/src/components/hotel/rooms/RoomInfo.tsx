"use client";
import { useRoomPageContext } from "@/app/contexts/public/RoomPageContext";

export default function RoomInfo() {
  const { room, hotel } = useRoomPageContext();

  const displayedData = [
    {
      title: "Room: ",
      value: room.name,
    },
    {
      title: "Capacity: ",
      value: room.capacity,
    },
    {
      title: "Daily charge: ",
      value: `${room.dailyFee}$`,
    },
  ];

  return (
    <div className="bg-slate-100 rounded-md p-4">
      <h2 className="text-lg font-bold pb-4">
        Book your stay at {hotel.name} now!
      </h2>
      {displayedData.map(({ title, value }, id) => (
        <div key={id} className="font-semibold">
          {title}
          <span className="font-normal">{value}</span>
        </div>
      ))}
    </div>
  );
}
