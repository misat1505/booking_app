import { Hotel } from "@/models/Hotel";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type HotelsContextProvidedValues = {
  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
  isLoading: boolean;
};

const HotelsContext = createContext({} as HotelsContextProvidedValues);

export const useHotelsContext = () => useContext(HotelsContext);

export const HotelsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        { withCredentials: true }
      );
      const userId = response1.data.user.uid;

      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/hotels/?user=${userId}`
      );

      setHotels(response2.data.hotels);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addHotel = (hotel: Hotel) => {
    setHotels((prev) => [...prev, hotel]);
  };

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        isLoading,
        addHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
};
