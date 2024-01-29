import { Hotel } from "@/models/Hotel";
import { ReactNode, createContext, useContext, useState } from "react";

type HotelsContextProvidedValues = {
  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
};

const HotelsContext = createContext({} as HotelsContextProvidedValues);

export const useHotelsContext = () => useContext(HotelsContext);

export const HotelsContextProvider = ({
  children,
  initHotels,
}: {
  children: ReactNode;
  initHotels: Hotel[];
}) => {
  const [hotels, setHotels] = useState<Hotel[]>(initHotels);

  const addHotel = (hotel: Hotel) => {
    setHotels((prev) => [...prev, hotel]);
  };

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        addHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
};
