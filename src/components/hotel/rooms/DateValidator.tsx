import { insertBooking } from "@/actions/insertBooking";
import { useRoomPageContext } from "@/app/contexts/public/RoomPageContext";
import StyledButton from "@/components/common/StyledButton";
import { errorConfig, loadingConfig, successConfig } from "@/utils/showToasts";
import axios from "axios";
import { toast } from "react-toastify";

export default function DateValidator() {
  const { dateInterval, isConflict, room } = useRoomPageContext();

  const calculatePrice = (): number => {
    return Math.round(
      (((dateInterval as any)[1].getTime() -
        (dateInterval as any)[0].getTime()) /
        (1000 * 60 * 60 * 24)) *
        room.dailyFee
    );
  };

  const handleSubmit = async (): Promise<void> => {
    const price = calculatePrice();

    const body = {
      roomId: room.uid,
      start: (dateInterval as any)[0] as Date,
      finish: (dateInterval as any)[1] as Date,
      price: price,
    };

    const toastID = toast.loading("Please wait...", loadingConfig());

    try {
      // await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/rooms/bookings`,
      //   body
      // );
      await insertBooking(body);
      toast.update(toastID, successConfig("Successfully booked."));
    } catch (e) {
      toast.update(toastID, errorConfig("An error occured during booking."));
    }
  };

  if (isConflict)
    return (
      <p className="text-red-500">
        Chosen interval collides with existing booking!
      </p>
    );

  const charge = calculatePrice();

  if (charge === 0)
    return <div>Choose check-in and check-out dates to proceed.</div>;

  const options = { year: "numeric", month: "long", day: "numeric" };

  const calculateDaysBetween = (date1: Date, date2: Date): number => {
    const time1 = date1.getTime();
    const time2 = date2.getTime();

    const milliseconds = Math.abs(time2 - time1);
    const days = Math.round(milliseconds / (1000 * 60 * 60 * 24));

    return days;
  };

  const bookingDetails = [
    {
      title: "Check-in: ",
      value: (dateInterval as any)[0].toLocaleDateString("en-US", options),
    },
    {
      title: "Check-out: ",
      value: (dateInterval as any)[1].toLocaleDateString("en-US", options),
    },
    {
      title: "Days: ",
      value: calculateDaysBetween(
        (dateInterval as any)[0],
        (dateInterval as any)[1]
      ),
    },
    {
      title: "Charge: ",
      value: `${charge}$`,
    },
  ];

  return (
    <>
      <div>
        {bookingDetails.map(({ title, value }, id) => (
          <div className="font-semibold" key={id}>
            {title}
            <span className="font-normal">{value}</span>
          </div>
        ))}
      </div>
      <StyledButton onClick={handleSubmit}>Book & pay</StyledButton>
    </>
  );
}
