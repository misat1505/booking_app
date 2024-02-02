"use client";
import axios from "axios";
import { Modal } from "flowbite-react";
import HotelImages from "./HotelImages";
import { uploadMultipleFiles } from "@/utils/uploadFiles";
import { useHotelsContext } from "@/app/contexts/dashboard/hotelsContext";
import StyledButton from "../common/StyledButton";
import cn from "classnames";
import { useNewHotelFormContext } from "@/app/contexts/dashboard/newHotelFormContext";
import HotelNameInput from "./HotelNameInput";
import HotelDescriptionInput from "./HotelDescriptionInput";
import HotelImagesInput from "./HotelImagesInput";

export default function NewHotelForm() {
  const { addHotel } = useHotelsContext();
  const { form, openModal, onOpenModal, onCloseModal, isFormValid } =
    useNewHotelFormContext();

  const handleCreateNewHotel = async () => {
    if (!isFormValid()) {
      window.alert("Can't create hotel!");
      return;
    }

    const urls = await uploadMultipleFiles(form.images);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/hotels`,
      {
        name: form.name,
        description: form.description,
        photoURLs: urls,
      }
    );

    const newHotel = response.data.hotel;
    addHotel(newHotel);
    onCloseModal();
  };

  return (
    <>
      <StyledButton onClick={onOpenModal}>Create new hotel</StyledButton>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create new hotel
            </h3>
            <HotelNameInput />
            <HotelDescriptionInput />
            <HotelImagesInput />
            <HotelImages />
            <StyledButton
              onClick={handleCreateNewHotel}
              className={cn("mx-auto block", {
                "!cursor-not-allowed hover:!bg-blue-400": !isFormValid(),
              })}
              disabled={!isFormValid()}
            >
              Create hotel
            </StyledButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
