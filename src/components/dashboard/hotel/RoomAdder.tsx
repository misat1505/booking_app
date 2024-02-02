import { useRef, useState } from "react";
import { Modal, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useHotelContext } from "@/app/contexts/dashboard/hotelContext";
import StyledButton from "@/components/common/StyledButton";

export default function RoomAdder() {
  const { hotel, addRoom } = useHotelContext();
  const [openModal, setOpenModal] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const capacityInputRef = useRef<HTMLInputElement>(null);
  const chargeInputRef = useRef<HTMLInputElement>(null);

  const handleCreateRoom = async (e: any) => {
    e.preventDefault();

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

    addRoom(newRoom);
    setOpenModal(false);
  };

  return (
    <>
      <StyledButton className="mt-4" onClick={() => setOpenModal(true)}>
        Add room
      </StyledButton>
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
                placeholder="daily charge ($)"
                required
                type="number"
              />
            </div>
          </div>
          <StyledButton className="mt-4" onClick={handleCreateRoom}>
            Create room
          </StyledButton>
        </Modal.Body>
      </Modal>
    </>
  );
}
