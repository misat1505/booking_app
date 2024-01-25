"use client";
import axios from "axios";
import { Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useRef, useState } from "react";

export default function NewHotelForm() {
  const hotelNameInputRef = useRef<HTMLInputElement>(null);
  const hotelDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const onCloseModal = () => {
    setOpenModal(false);
    setEmail("");
  };

  const handleCreateNewHotel = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/hotels`,
      {
        name: hotelNameInputRef.current?.value,
        description: hotelDescriptionInputRef.current?.value,
        photoURLs: [],
      }
    );
    console.log(response);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 px-4 py-3 border-none rounded-md text-white hover:cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        create new hotel
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
