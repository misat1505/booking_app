import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNewRoomFormContext } from "@/app/contexts/dashboard/newRoomFormContext";

export default function ChargeInput() {
  const { chargeInputRef, handleChange } = useNewRoomFormContext();

  return (
    <div>
      <div className="mb-2 block">
        <Label onClick={() => chargeInputRef.current?.focus()}>
          Daily charge ($)
        </Label>
      </div>
      <Input
        ref={chargeInputRef}
        placeholder="daily charge ($)"
        required
        type="number"
        name="charge"
        onChange={handleChange}
      />
    </div>
  );
}
