"use client";
import axios from "axios";
import { Label, Modal, TextInput, Textarea } from "flowbite-react";
import { ChangeEvent, useRef, useState } from "react";
import HotelImages from "./HotelImages";
import { uploadMultipleFiles } from "@/utils/uploadFiles";

export default function NewHotelForm() {
  const hotelNameInputRef = useRef<HTMLInputElement>(null);
  const hotelDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const hotelFilesInputRef = useRef<HTMLInputElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onCloseModal = () => {
    setOpenModal(false);
    setFiles([]);
  };

  const handleCreateNewHotel = async () => {
    const urls = await uploadMultipleFiles(files);

    if (
      !hotelNameInputRef.current?.value ||
      !hotelDescriptionInputRef.current?.value ||
      !files
    ) {
      window.alert("Can't create hotel!");
      return;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/hotels`,
      {
        name: hotelNameInputRef.current?.value,
        description: hotelDescriptionInputRef.current?.value,
        photoURLs: urls,
      }
    );
    console.log(response);
  };

  const handleFilesInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray: File[] = Array.from(e.target.files);

    setFiles((prev) => [...prev, ...filesArray]);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 px-4 py-3 border-none rounded-md text-white hover:cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        Create new hotel
      </button>
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
                  onClick={() => hotelNameInputRef.current?.focus()}
                  value="Name"
                />
              </div>
              <TextInput
                ref={hotelNameInputRef}
                placeholder="hotel name"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  onClick={() => hotelDescriptionInputRef.current?.focus()}
                  value="Description"
                />
              </div>
              <Textarea ref={hotelDescriptionInputRef} required />
            </div>
            <div>
              <button
                onClick={() => hotelFilesInputRef.current?.click()}
                className="bg-slate-400 px-3 py-2 rounded-md text-white hover:bg-slate-500 hover:cursor-pointer"
              >
                Add new photo
              </button>
              <input
                type="file"
                className="hidden"
                accept=".png, .jpg, .svg"
                ref={hotelFilesInputRef}
                multiple
                onChange={handleFilesInputChange}
              />
              <HotelImages images={files} setImages={setFiles} />
            </div>
            <div className="w-full">
              <button
                className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white"
                onClick={handleCreateNewHotel}
              >
                Create hotel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
