import { useNewHotelFormContext } from "@/app/contexts/dashboard/newHotelFormContext";
import { ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function HotelDescriptionInput() {
  const { descriptionInputRef, handleFormChange } = useNewHotelFormContext();

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (!descriptionInputRef.current) return;

    descriptionInputRef.current.style.height = "auto";
    descriptionInputRef.current.style.height =
      Math.min(descriptionInputRef.current.scrollHeight + 10, 400) + "px";

    handleFormChange(e);
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label onClick={() => descriptionInputRef.current?.focus()}>
          Description
        </Label>
      </div>
      <Textarea
        ref={descriptionInputRef}
        required
        name="description"
        onChange={handleTextareaChange}
      />
    </div>
  );
}
