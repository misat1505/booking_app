"use client";
import axios from "axios";
import { Label, Modal, TextInput, Textarea } from "flowbite-react";
import HotelImages from "./HotelImages";
import { uploadMultipleFiles } from "@/utils/uploadFiles";
import { useHotelsContext } from "@/app/contexts/dashboard/hotelsContext";
import StyledButton from "../common/StyledButton";
import cn from "classnames";
import { useNewHotelFormContext } from "@/app/contexts/dashboard/newHotelFormContext";

export default function NewHotelForm() {
  const { addHotel } = useHotelsContext();
  const {
    form,
    nameInputRef,
    descriptionInputRef,
    imagesInputRef,
    openModal,
    onOpenModal,
    onCloseModal,
    handleFormChange,
    isFormValid,
  } = useNewHotelFormContext();

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
            <div>
              <div className="mb-2 block">
                <Label
                  onClick={() => nameInputRef.current?.focus()}
                  value="Name"
                />
              </div>
              <TextInput
                ref={nameInputRef}
                placeholder="hotel name"
                name="name"
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  onClick={() => descriptionInputRef.current?.focus()}
                  value="Description"
                />
              </div>
              <Textarea
                ref={descriptionInputRef}
                required
                name="description"
                onChange={handleFormChange}
              />
            </div>
            <div>
              <StyledButton
                onClick={() => imagesInputRef.current?.click()}
                className="bg-slate-400 hover:bg-slate-500"
              >
                Add new photo
              </StyledButton>
              <input
                type="file"
                className="hidden"
                name="images"
                accept=".png, .jpg, .svg, .webp"
                ref={imagesInputRef}
                multiple
                onChange={handleFormChange}
              />
              <HotelImages />
            </div>
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
