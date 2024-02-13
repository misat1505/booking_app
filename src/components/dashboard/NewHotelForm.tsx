"use client";
import axios from "axios";
import HotelImages from "./HotelImages";
import { uploadMultipleFiles } from "@/utils/uploadFiles";
import { useHotelsContext } from "@/app/contexts/dashboard/hotelsContext";
import StyledButton from "../common/StyledButton";
import cn from "classnames";
import { useNewHotelFormContext } from "@/app/contexts/dashboard/newHotelFormContext";
import HotelNameInput from "./HotelNameInput";
import HotelDescriptionInput from "./HotelDescriptionInput";
import HotelImagesInput from "./HotelImagesInput";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { BsFillHouseAddFill } from "react-icons/bs";
import { createHotel } from "@/actions/createHotel";

export default function NewHotelForm() {
  const { addHotel } = useHotelsContext();
  const { form, isFormValid } = useNewHotelFormContext();

  const handleCreateNewHotel = async () => {
    if (!isFormValid()) {
      window.alert("Can't create hotel!");
      return;
    }

    const urls = await uploadMultipleFiles(form.images);

    const body = {
      name: form.name,
      description: form.description,
      photoURLs: urls,
    };

    const newHotel = await createHotel(body);
    addHotel(newHotel);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center bg-slate-50 p-4 border border-1 border-slate-300 rounded-md col-span-2 hover:bg-slate-100 mb-6 font-semibold text-lg gap-4 w-full mt-12">
          <BsFillHouseAddFill className="text-blue-600" />
          CREATE NEW HOTEL
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new hotel</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <HotelNameInput />
          <HotelDescriptionInput />
          <HotelImagesInput />
          <HotelImages />
        </div>
        <DialogFooter className="sm:justify-start">
          <StyledButton
            onClick={handleCreateNewHotel}
            className={cn("mx-auto block", {
              "!cursor-not-allowed hover:!bg-blue-400": !isFormValid(),
            })}
            disabled={!isFormValid()}
          >
            Create hotel
          </StyledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
