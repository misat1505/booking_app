"use client";
import { Room } from "@/models/Room";
import { Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export default function AccordionInner({ rooms }: { rooms: Room[] }) {
  const router = useRouter();
  const [displayedRooms, setDisplayedRooms] = useState<Room[]>(rooms);
  const capacityInputRef = useRef<HTMLInputElement>(null);
  const minChargeInputRef = useRef<HTMLInputElement>(null);
  const maxChargeInputRef = useRef<HTMLInputElement>(null);

  const handleApplyFilter = (e: FormEvent) => {
    e.preventDefault();

    const capacity = capacityInputRef.current?.value;
    const minCharge = minChargeInputRef.current?.value;
    const maxCharge = maxChargeInputRef.current?.value;

    if (!capacity && !minCharge && !maxCharge) return setDisplayedRooms(rooms);

    const filteredRooms = rooms
      .filter((room) => capacity && room.capacity == parseInt(capacity))
      .filter((room) =>
        Boolean(minCharge) ? room.dailyFee >= parseInt(minCharge!) : true
      )
      .filter((room) =>
        Boolean(maxCharge) ? room.dailyFee <= parseInt(maxCharge!) : true
      );

    setDisplayedRooms(filteredRooms);
  };

  return (
    <div className="text-left">
      <form className="flex justify-between" onSubmit={handleApplyFilter}>
        <div className="flex gap-4">
          <div>
            <Label onClick={() => capacityInputRef.current?.focus()}>
              Capacity
            </Label>
            <TextInput color="#3e83f8" type="number" ref={capacityInputRef} />
          </div>
          <div>
            <Label onClick={() => minChargeInputRef.current?.focus()}>
              Minimum charge ($)
            </Label>
            <TextInput color="#3e83f8" type="number" ref={minChargeInputRef} />
          </div>
          <div>
            <Label onClick={() => maxChargeInputRef.current?.focus()}>
              Maximum charge ($)
            </Label>
            <TextInput color="#3e83f8" type="number" ref={maxChargeInputRef} />
          </div>
        </div>
        <button className="h-12 px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-600 hover:cursor-pointer text-white text-sm mt-4">
          apply filter
        </button>
      </form>
      <div className="mt-12">
        {displayedRooms.map((room) => (
          <div
            key={room.uid}
            className="grid grid-cols-4 gap-2 my-4 text-center"
          >
            <div className="font-semibold">{room.name}</div>
            <div className="font-semibold">{room.capacity} people</div>
            <div className="font-semibold">
              {room.dailyFee}$ <span className="font-normal">a night</span>
            </div>
            <button
              className="px-3 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 hover:cursor-pointer text-sm"
              onClick={() =>
                router.push(`/hotels/${room.hotelId}/rooms/${room.uid}`)
              }
            >
              book now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
