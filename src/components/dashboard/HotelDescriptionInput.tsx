import { useNewHotelFormContext } from "@/app/contexts/dashboard/newHotelFormContext";
import { Label, Textarea } from "flowbite-react";
import { ChangeEvent } from "react";

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
        <Label
          onClick={() => descriptionInputRef.current?.focus()}
          value="Description"
        />
      </div>
      <Textarea
        color="#3e83f8"
        ref={descriptionInputRef}
        required
        name="description"
        onChange={handleTextareaChange}
      />
    </div>
  );
}
