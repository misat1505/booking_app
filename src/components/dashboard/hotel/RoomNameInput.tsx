import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNewRoomFormContext } from "@/app/contexts/dashboard/newRoomFormContext";

export default function RoomNameInput() {
  const { nameInputRef, handleChange } = useNewRoomFormContext();

  return (
    <div>
      <div className="mb-2 block">
        <Label onClick={() => nameInputRef.current?.focus()}>Name</Label>
      </div>
      <Input
        ref={nameInputRef}
        placeholder="room name"
        required
        name="name"
        onChange={handleChange}
      />
    </div>
  );
}
