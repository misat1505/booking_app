"use client";
import { Booking } from "@/models/Booking";
import { Room } from "@/models/Room";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useState } from "react";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DatePicker({
  bookings,
  room,
}: {
  bookings: Booking[];
  room: Room;
}) {
  const [value, onChange] = useState<Value>([new Date(), new Date()]);

  const [isConflict, setIsConflict] = useState<boolean>(false);

  const checkForConflict = (start: Date, finish: Date): boolean => {
    for (const booking of bookings) {
      if (
        (start >= booking.start && start <= booking.finish) ||
        (finish >= booking.start && finish <= booking.finish) ||
        (start <= booking.start && finish >= booking.finish)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleDateChange = (newValue: Value) => {
    if (Array.isArray(newValue)) {
      const [start, finish] = newValue;
      const conflict = checkForConflict(start!, finish!);
      setIsConflict(conflict);
    }
    onChange(newValue);
  };

  const isTileDisabled = (date: Date): boolean => {
    for (const booking of bookings) {
      if (date >= booking.start && date <= booking.finish) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <DateRangePicker
        onChange={handleDateChange}
        value={value}
        tileDisabled={({ date }) => isTileDisabled(date)}
      />
      {isConflict && (
        <p style={{ color: "red" }}>
          Wybrany przedział koliduje z istniejącą rezerwacją!
        </p>
      )}
      {!isConflict && value && (
        <p>
          Charge:{" "}
          {Math.round(
            (((value as any)[1].getTime() - (value as any)[0].getTime()) /
              (1000 * 60 * 60 * 24)) *
              room.dailyFee
          )}
          $
        </p>
      )}
    </div>
  );
}
