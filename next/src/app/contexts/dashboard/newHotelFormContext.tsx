"use client";
import {
  ChangeEvent,
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type FormValues = {
  name: string;
  description: string;
  images: File[];
};

type NewHotelFormContextProvidedValues = {
  form: FormValues;
  nameInputRef: RefObject<HTMLInputElement>;
  descriptionInputRef: RefObject<HTMLTextAreaElement>;
  imagesInputRef: RefObject<HTMLInputElement>;
  handleFormChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isFormValid: () => boolean;
  deleteImage: (id: number) => void;
};

const NewHotelFormContext = createContext(
  {} as NewHotelFormContextProvidedValues
);

export const useNewHotelFormContext = () => useContext(NewHotelFormContext);

export const NewHotelFormContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialForm: FormValues = {
    name: "",
    description: "",
    images: [],
  };
  const [form, setForm] = useState<FormValues>({ ...initialForm });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const isFormValid = (): boolean => {
    return (
      nameInputRef.current !== null &&
      nameInputRef.current.value !== "" &&
      descriptionInputRef.current !== null &&
      descriptionInputRef.current.value !== "" &&
      form.images.length > 0
    );
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    e.preventDefault();

    const element = e.target;
    const name = element.name;

    if (element.type === "file") {
      // @ts-ignore
      const newImages: File[] = Array.from(element.files);
      const allImages = [...form.images, ...newImages];
      setForm((prev) => ({ ...prev, [name]: allImages }));
    } else {
      const newValue = element.value;
      setForm((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const deleteImage = (removeId: number): void => {
    const filteredImages = form.images.filter((_, id) => id !== removeId);
    setForm((prev) => ({ ...prev, images: filteredImages }));
  };

  return (
    <NewHotelFormContext.Provider
      value={{
        form,
        nameInputRef,
        descriptionInputRef,
        imagesInputRef,
        handleFormChange,
        isFormValid,
        deleteImage,
      }}
    >
      {children}
    </NewHotelFormContext.Provider>
  );
};
