"use client";
import { Hotel } from "@/models/Hotel";
import { Accordion, AccordionTitle } from "flowbite-react";
import AccordionInner from "./AccordionInner";
import useFetch from "@/hooks/useFetch";
import { Room } from "@/models/Room";
import Loading from "../common/Loading";

export default function RoomsDisplayer({ hotel }: { hotel: Hotel }) {
  const { data, isLoading } = useFetch<{ rooms: Room[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms?hotel=${hotel.uid}`
  );

  return (
    <div className="bg-slate-100 w-full p-4 rounded-md mb-4 border border-solid boder-slate-300">
      <h2 className="text-left font-bold text-lg mb-4">Rooms</h2>
      {isLoading && !data ? (
        <div className="relative bg-slate-100 h-12">
          <Loading />
        </div>
      ) : (
        <Accordion collapseAll>
          <Accordion.Panel>
            <AccordionTitle className="p-3">Show rooms</AccordionTitle>
            <Accordion.Content>
              <AccordionInner rooms={data!.rooms} />
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      )}
    </div>
  );
}
