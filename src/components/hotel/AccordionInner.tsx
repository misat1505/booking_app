"use client";
import { Room } from "@/models/Room";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent, useRef, useState } from "react";
import StyledLink from "../common/StyledLink";
import StyledButton from "../common/StyledButton";

export default function AccordionInner({ rooms }: { rooms: Room[] }) {
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
      <form
        className="grid grid-cols-4 lg:gap-12 my-4 text-left lg:mx-8"
        onSubmit={handleApplyFilter}
      >
        <div>
          <Label onClick={() => capacityInputRef.current?.focus()}>
            Capacity
          </Label>
          <Input className="mt-2" type="number" ref={capacityInputRef} />
        </div>
        <div>
          <Label onClick={() => minChargeInputRef.current?.focus()}>
            Minimum charge ($)
          </Label>
          <Input className="mt-2" type="number" ref={minChargeInputRef} />
        </div>
        <div>
          <Label onClick={() => maxChargeInputRef.current?.focus()}>
            Maximum charge ($)
          </Label>
          <Input className="mt-2" type="number" ref={maxChargeInputRef} />
        </div>
        <StyledButton className="h-12 mt-auto mb-auto">
          Apply filter
        </StyledButton>
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
            <StyledLink href={`/hotels/${room.hotelId}/rooms/${room.uid}`}>
              Book now
            </StyledLink>
          </div>
        ))}
      </div>
    </div>
  );
}
