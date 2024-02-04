import { useNewHotelFormContext } from "@/app/contexts/dashboard/newHotelFormContext";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function HotelNameInput() {
  const { nameInputRef, handleFormChange } = useNewHotelFormContext();

  return (
    <div>
      <div className="mb-2 block">
        <Label onClick={() => nameInputRef.current?.focus()}>Name</Label>
      </div>
      <Input
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
