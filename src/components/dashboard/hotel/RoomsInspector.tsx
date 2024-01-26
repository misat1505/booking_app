import Loading from "@/components/common/Loading";
import useFetch from "@/hooks/useFetch";
import { Hotel } from "@/models/Hotel";
import { Room } from "@/models/Room";
import { Accordion } from "flowbite-react";
import RoomAdder from "./RoomAdder";

export default function RoomsInspector({ hotel }: { hotel: Hotel }) {
  const { data, isLoading } = useFetch<{ rooms: Room[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/?hotel=${hotel.uid}`
  );

  if (isLoading) return <></>;

  const { rooms } = data!;

  function RoomsInfo() {
    if (rooms.length === 0) return <div>Hotel {hotel.name} has no rooms.</div>;

    return (
      <Accordion collapseAll>
        {rooms.map((room, id) => (
          <Accordion.Panel key={id}>
            <Accordion.Title>{room.name}</Accordion.Title>
            <Accordion.Content>
              <div className="text-sm">
                <span className="font-semibold">Capacity: </span>
                {room.capacity}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Daily charge: </span>
                {room.dailyFee}
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
      <RoomAdder hotel={hotel} />
    </div>
  );
}
