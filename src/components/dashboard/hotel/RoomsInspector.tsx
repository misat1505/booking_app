import { Accordion } from "flowbite-react";
import RoomAdder from "./RoomAdder";
import { useHotelContext } from "@/app/contexts/dashboard/hotelContext";
import Link from "next/link";
import StyledLink from "@/components/common/StyledLink";
import { NewRoomFormContextProvider } from "@/app/contexts/dashboard/newRoomFormContext";

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
              <div className="h-3" />
              <StyledLink href={"#"}>Show details</StyledLink>
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
      <NewRoomFormContextProvider>
        <RoomAdder />
      </NewRoomFormContextProvider>
    </div>
  );
}
