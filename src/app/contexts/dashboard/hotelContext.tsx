"use client";
import { Hotel } from "@/models/Hotel";
import { Room } from "@/models/Room";
import { ReactNode, createContext, useContext, useState } from "react";
import { useUserContext } from "../userContext";

type HotelContextProvidedValues = {
  hotel: Hotel;
  rooms: Room[];
  addRoom: (room: Room) => void;
};

const HotelContext = createContext({} as HotelContextProvidedValues);

export const useHotelContext = () => useContext(HotelContext);

export const HotelContextProvider = ({
  children,
  initHotel,
  initRooms,
}: {
  children: ReactNode;
  initHotel: Hotel;
  initRooms: Room[];
}) => {
  const [rooms, setRooms] = useState<Room[]>(initRooms);
  const { user } = useUserContext();

  if (user?.uid !== initHotel.owner.uid)
    throw new Error(
      `You are not the owner of ${initHotel.name}, thus you can't preview it.`
    );

  const addRoom = (room: Room) => {
    setRooms((prev) => [...prev, room]);
  };

  return (
    <HotelContext.Provider
      value={{
        hotel: initHotel,
        rooms,
        addRoom,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
