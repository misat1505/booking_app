import { useNewHotelFormContext } from "@/app/contexts/dashboard/newHotelFormContext";
import StyledButton from "../common/StyledButton";

export default function HotelImagesInput() {
  const { imagesInputRef, handleFormChange } = useNewHotelFormContext();

  return (
    <div>
      <StyledButton
        onClick={() => imagesInputRef.current?.click()}
        className="bg-slate-400 hover:bg-slate-500"
      >
        Add new photo
      </StyledButton>
      <input
        type="file"
        className="hidden"
        name="images"
        accept=".png, .jpg, .svg, .webp"
        ref={imagesInputRef}
        multiple
        onChange={handleFormChange}
      />
    </div>
  );
}
