"use client";
import { Hotel } from "@/models/Hotel";
import { Room } from "@/models/Room";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type HotelContextProvidedValues = {
  hotel: Hotel;
  rooms: Room[];
  addRoom: (room: Room) => void;
  isLoading: boolean;
};

const HotelContext = createContext({} as HotelContextProvidedValues);

export const useHotelContext = () => useContext(HotelContext);

export const HotelContextProvider = ({
  children,
  hotelId,
}: {
  children: ReactNode;
  hotelId: string;
}) => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/hotels/?hotel=${hotelId}`
      );

      const fetchedHotel = response1.data.hotel;
      setHotel(fetchedHotel);

      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/?hotel=${fetchedHotel.uid}`
      );

      setRooms(response2.data.rooms);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addRoom = (room: Room) => {
    setRooms((prev) => [...prev, room]);
  };

  return (
    <HotelContext.Provider
      value={{
        hotel: hotel!,
        rooms,
        isLoading,
        addRoom,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
