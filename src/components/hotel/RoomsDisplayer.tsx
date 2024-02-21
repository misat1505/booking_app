"use client";
import { Hotel } from "@/models/Hotel";
import AccordionInner from "./AccordionInner";
import { Room } from "@/models/Room";
import Loading from "../common/Loading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { fetchHotelRooms } from "@/actions/fetchHotelRooms";

export default function RoomsDisplayer({ hotel }: { hotel: Hotel }) {
  const [data, setData] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await fetchHotelRooms(hotel.uid);
      setData(rooms);
      setIsLoading(false);
    };

    fetchRooms();
  }, []);

  return (
    <div className="bg-slate-100 col-span-4 p-4 rounded-md mb-4 border border-solid border-slate-300">
      <h2 className="text-left font-bold text-lg mb-4">Rooms</h2>
      {isLoading && !data ? (
        <div className="relative bg-slate-100 h-12">
          <Loading />
        </div>
      ) : (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Show rooms</AccordionTrigger>
            <AccordionContent>
              <AccordionInner rooms={data} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
