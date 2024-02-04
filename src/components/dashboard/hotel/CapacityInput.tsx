import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNewRoomFormContext } from "@/app/contexts/dashboard/newRoomFormContext";

export default function CapacityInput() {
  const { capacityInputRef, handleChange } = useNewRoomFormContext();

  return (
    <div>
      <div className="mb-2 block">
        <Label onClick={() => capacityInputRef.current?.focus()}>
          Capacity
        </Label>
      </div>
      <Input
        ref={capacityInputRef}
        placeholder="people in room"
        required
        type="number"
        name="capacity"
        onChange={handleChange}
      />
    </div>
  );
}
