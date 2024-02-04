"use client";
import {
  ChangeEvent,
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type NewRoomForm = {
  name: string;
  capacity: number | null;
  charge: number | null;
};

type NewRoomFormContextValues = {
  nameInputRef: RefObject<HTMLInputElement>;
  capacityInputRef: RefObject<HTMLInputElement>;
  chargeInputRef: RefObject<HTMLInputElement>;
  form: NewRoomForm;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isFormValid: () => boolean;
};

const NewRoomFormContext = createContext({} as NewRoomFormContextValues);

export const useNewRoomFormContext = () => useContext(NewRoomFormContext);

export const NewRoomFormContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const formInitialValues: NewRoomForm = {
    name: "",
    capacity: null,
    charge: null,
  };
  const [form, setForm] = useState<NewRoomForm>({ ...formInitialValues });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const capacityInputRef = useRef<HTMLInputElement>(null);
  const chargeInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const name = e.target.name;
    const stringValue = e.target.value;

    const newValue =
      e.target.type === "number" ? parseInt(stringValue) : stringValue;

    setForm((prev) => ({
      ...prev,
      [name]: Number.isNaN(newValue) ? null : newValue,
    }));
  };

  const isFormValid = (): boolean => {
    return form.name !== "" && form.capacity !== null && form.charge !== null;
  };

  return (
    <NewRoomFormContext.Provider
      value={{
        nameInputRef,
        capacityInputRef,
        chargeInputRef,
        form,
        handleChange,
        isFormValid,
      }}
    >
      {children}
    </NewRoomFormContext.Provider>
  );
};
