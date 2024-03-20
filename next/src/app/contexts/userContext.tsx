"use client";
import { getUser } from "@/actions/getUser";
import { User } from "@/models/User";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextProvidedValues = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const UserContext = createContext({} as UserContextProvidedValues);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const retreiveUserSession = async () => {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
      } catch (e) {
        setUser(null);
      }
    };

    retreiveUserSession();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
