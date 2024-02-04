import axios from "axios";
import { useHotelContext } from "@/app/contexts/dashboard/hotelContext";
import StyledButton from "@/components/common/StyledButton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import RoomNameInput from "./RoomNameInput";
import CapacityInput from "./CapacityInput";
import ChargeInput from "./ChargeInput";
import { useNewRoomFormContext } from "@/app/contexts/dashboard/newRoomFormContext";
import cn from "classnames";
import { toast } from "react-toastify";
import { errorConfig, successConfig } from "@/utils/showToasts";

export default function RoomAdder() {
  const { hotel, addRoom } = useHotelContext();
  const { form, isFormValid } = useNewRoomFormContext();

  const handleCreateRoom = async (e: any) => {
    e.preventDefault();

    const { name, capacity, charge } = form;

    if (!name || !capacity || !charge) return;

    const body = { name, capacity, dailyFee: charge, hotelId: hotel.uid };

    const toastID = toast.loading("Please wait...");

    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms`,
        body
      );

      const newRoom = data.data.room;

      addRoom(newRoom);
      toast.update(toastID, successConfig("Room created successfully."));
    } catch (e) {
      toast.update(
        toastID,
        errorConfig("An error occured when creating a hotel.")
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <StyledButton className="mt-4">Add room</StyledButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new room for {hotel.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <RoomNameInput />
          <CapacityInput />
          <ChargeInput />
        </div>
        <DialogFooter className="sm:justify-start">
          <StyledButton
            onClick={handleCreateRoom}
            disabled={!isFormValid()}
            className={cn("mt-4 mx-auto", {
              "!cursor-not-allowed hover:!bg-blue-400": !isFormValid(),
            })}
          >
            Create room
          </StyledButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
