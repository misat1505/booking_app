import RoomAdder from "./RoomAdder";
import { useHotelContext } from "@/app/contexts/dashboard/hotelContext";
import StyledLink from "@/components/common/StyledLink";
import { NewRoomFormContextProvider } from "@/app/contexts/dashboard/newRoomFormContext";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function RoomsInspector() {
  const { hotel, rooms } = useHotelContext();

  function RoomsInfo() {
    if (rooms.length === 0)
      return <div className="text-sm">{hotel.name} has no rooms.</div>;

    return (
      <Accordion type="single" collapsible>
        {rooms.map((room, id) => (
          <AccordionItem key={id} value={room.name}>
            <AccordionTrigger>{room.name}</AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
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
