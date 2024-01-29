import { Hotel } from "@/models/Hotel";
import axios from "axios";
import { Accordion, AccordionTitle } from "flowbite-react";
import AccordionInner from "./AccordionInner";

export default async function RoomsDisplayer({ hotel }: { hotel: Hotel }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/?hotel=${hotel.uid}`
  );
  const rooms = response.data.rooms;

  return (
    <div className="bg-slate-100 w-full p-4 rounded-md mb-4 border border-solid boder-slate-300">
      <h2 className="text-left font-bold text-lg mb-4">Rooms</h2>
      <Accordion collapseAll>
        <Accordion.Panel>
          <AccordionTitle>Show rooms</AccordionTitle>
          <Accordion.Content>
            <AccordionInner rooms={rooms} />
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}
