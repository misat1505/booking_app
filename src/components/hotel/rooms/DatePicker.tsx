"use client";
import {
  Value,
  useRoomPageContext,
} from "@/app/contexts/public/RoomPageContext";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import DateValidator from "./DateValidator";
import { useUserContext } from "@/app/contexts/userContext";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";

export default function DatePicker() {
  const { user } = useUserContext();
  const [selfPath, setSelfPath] = useState<string | null>(null);
  const { bookings, dateInterval, setDateInterval, setIsConflict } =
    useRoomPageContext();

  useEffect(() => {
    setSelfPath(window.location.pathname);
  }, []);

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

  const handleDateChange = (newValue: Value): void => {
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

  if (!selfPath)
    return (
      <div className="relative w-full bg-slate-100 rounded-md p-4 row-span-2 flex flex-col justify-between items-center">
        <Loading />
      </div>
    );

  if (!user || user.role !== "CUSTOMER")
    return (
      <div className="w-full bg-slate-100 rounded-md p-4 row-span-2 flex flex-col justify-between items-center">
        <Image
          src={"/logo.avif"}
          alt="..."
          width={300}
          height={300}
          className="rounded-lg"
        />
        <Link
          href={`/login?role=customer&redirect=${selfPath}`}
          className="px-3 py-2 w-full bg-blue-500 rounded-md text-white hover:bg-blue-600 hover:cursor-pointer text-sm text-center"
        >
          Log in as customer to book.
        </Link>
      </div>
    );

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
