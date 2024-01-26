import { Hotel } from "@/models/Hotel";
import { useRef, useState } from "react";
import { Modal, Label, TextInput } from "flowbite-react";
import axios from "axios";

export default function RoomAdder({ hotel }: { hotel: Hotel }) {
  const [openModal, setOpenModal] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const capacityInputRef = useRef<HTMLInputElement>(null);
  const chargeInputRef = useRef<HTMLInputElement>(null);

  const handleCreateRoom = async () => {
    const name = nameInputRef.current?.value;
    const capacity = capacityInputRef.current?.value;
    const dailyFee = chargeInputRef.current?.value;

    if (!name || !capacity || !dailyFee) return;

    const body = { name, capacity, dailyFee, hotelId: hotel.uid };

    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms`,
      body
    );

    const newRoom = data.data.room;

    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="mt-4 px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer text-sm"
      >
        Add room
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create new room for {hotel.name}
            </h3>
            <div>
              <div className="mb-2 block">
                <Label
                  onClick={() => nameInputRef.current?.focus()}
                  value="Name"
                />
              </div>
              <TextInput ref={nameInputRef} placeholder="room name" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  onClick={() => capacityInputRef.current?.focus()}
                  value="Capacity"
                />
              </div>
              <TextInput
                ref={capacityInputRef}
                placeholder="people in room"
                required
                type="number"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  onClick={() => chargeInputRef.current?.focus()}
                  value="Daily charge"
                />
              </div>
              <TextInput
                ref={chargeInputRef}
                placeholder="daily charge"
                required
                type="number"
              />
            </div>
          </div>
          <button
            className="mt-4 px-3 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 hover:cursor-pointer"
            onClick={handleCreateRoom}
          >
            Create room
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
