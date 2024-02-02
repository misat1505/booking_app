import { useNewHotelFormContext } from "@/app/contexts/dashboard/newHotelFormContext";
import { Label, TextInput } from "flowbite-react";

export default function HotelNameInput() {
  const { nameInputRef, handleFormChange } = useNewHotelFormContext();

  return (
    <div>
      <div className="mb-2 block">
        <Label onClick={() => nameInputRef.current?.focus()} value="Name" />
      </div>
      <TextInput
        color="#3e83f8"
        autoComplete="off"
        ref={nameInputRef}
        placeholder="hotel name"
        name="name"
        onChange={handleFormChange}
        required
      />
    </div>
  );
}
