import { Accordion } from "flowbite-react";
import RoomAdder from "./RoomAdder";
import { useHotelContext } from "@/app/contexts/dashboard/hotelContext";

export default function RoomsInspector() {
  const { hotel, rooms } = useHotelContext();

  function RoomsInfo() {
    if (rooms.length === 0)
      return <div className="text-sm">{hotel.name} has no rooms.</div>;

    return (
      <Accordion collapseAll>
        {rooms.map((room, id) => (
          <Accordion.Panel key={id}>
            <Accordion.Title className="p-3">{room.name}</Accordion.Title>
            <Accordion.Content className="p-4">
              <div className="text-sm">
                <span className="font-semibold">Capacity: </span>
                {room.capacity}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Daily charge: </span>
                {room.dailyFee}$
              </div>
              <button
                onClick={() => {}}
                className="mt-4 px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer text-sm"
              >
                Show details
              </button>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    );
  }

  return (
    <div className="w-full bg-slate-100 p-4 mb-4 rounded-md text-left text-lg border-solid border border-slate-300">
      <h2 className="mb-4 font-bold">Rooms</h2>
      <RoomsInfo />
      <RoomAdder />
    </div>
  );
}
