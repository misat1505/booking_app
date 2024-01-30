"use client";
import {
  Value,
  useRoomPageContext,
} from "@/app/contexts/public/RoomPageContext";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import DateValidator from "./DateValidator";

export default function DatePicker() {
  const { bookings, dateInterval, setDateInterval, setIsConflict } =
    useRoomPageContext();

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
    setDateInterval(newValue);
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
    <div className="w-full bg-slate-100 rounded-md p-4 row-span-2 flex flex-col justify-between">
      <DateRangePicker
        className="w-fit max-w-full"
        onChange={handleDateChange}
        value={dateInterval}
        tileDisabled={({ date }) => isTileDisabled(date)}
      />
      <DateValidator />
    </div>
  );
}
