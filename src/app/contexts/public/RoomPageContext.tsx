"use client";
import { Booking } from "@/models/Booking";
import { Hotel } from "@/models/Hotel";
import { Room } from "@/models/Room";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type RoomsPageData = {
  hotel: Hotel;
  room: Room;
  bookings: Booking[];
};

export type RoomsPageProvidedvalues = RoomsPageData & {
  dateInterval: Value;
  setDateInterval: Dispatch<SetStateAction<Value>>;
  isConflict: boolean;
  setIsConflict: Dispatch<SetStateAction<boolean>>;
};

const RoomPageContext = createContext({} as RoomsPageProvidedvalues);

export const useRoomPageContext = () => useContext(RoomPageContext);

export const RoomPageContextProvider = ({
  children,
  hotel,
  room,
  bookings,
}: RoomsPageData & { children: ReactNode }) => {
  const [isConflict, setIsConflict] = useState<boolean>(false);
  const [dateInterval, setDateInterval] = useState<Value>([
    new Date(),
    new Date(),
  ]);

  return (
    <RoomPageContext.Provider
      value={{
        hotel,
        room,
        bookings,
        dateInterval,
        setDateInterval,
        isConflict,
        setIsConflict,
      }}
    >
      {children}
    </RoomPageContext.Provider>
  );
};
