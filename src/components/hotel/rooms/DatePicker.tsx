"use client";
import {
  Value,
  useRoomPageContext,
} from "@/app/contexts/public/RoomPageContext";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import DateValidator from "./DateValidator";
import { useUserContext } from "@/app/contexts/userContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import StyledLink from "@/components/common/StyledLink";

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
        <StyledLink
          href={`/login?role=customer&redirect=${selfPath}`}
          className="w-full"
        >
          Log in as customer to book.
        </StyledLink>
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
