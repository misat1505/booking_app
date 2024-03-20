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
import { createRoom } from "@/actions/createRoom";
import { z } from "zod";

const lengthMessage = "Room name has to be between 5 and 30 characters long.";

const newRoomSchema = z.object({
  name: z
    .string()
    .min(5, { message: lengthMessage })
    .max(30, { message: lengthMessage }),
  capacity: z
    .number({ invalid_type_error: "Room capacity has to be a number." })
    .min(1, { message: "Room has to have capacity of at least 1." }),
  dailyFee: z
    .number({ invalid_type_error: `Daily charge has to be a number.` })
    .max(Math.pow(2, 32), {
      message: `Daily charge cannot exceed ${Math.pow(2, 32)}.`,
    }),
  hotelId: z.string().length(24, { message: "Hotel ID has to have 24 chars." }),
});

export default function RoomAdder() {
  const { hotel, addRoom } = useHotelContext();
  const { form, isFormValid } = useNewRoomFormContext();

  const handleCreateRoom = async (e: any) => {
    e.preventDefault();

    const { name, capacity, charge } = form;

    const body = { name, capacity, dailyFee: charge, hotelId: hotel.uid };

    try {
      newRoomSchema.parse(body);
    } catch (e) {
      if (e instanceof z.ZodError) {
        e.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
      return;
    }

    const promise = createRoom(body as any);

    toast.promise(promise, {
      pending: "Please wait...",
      error: "An error occured when creating new room.",
      success: "Room created successfully.",
    });

    const room = await promise;

    addRoom(room);
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
