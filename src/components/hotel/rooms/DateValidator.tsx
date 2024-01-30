import { useRoomPageContext } from "@/app/contexts/public/RoomPageContext";
import axios from "axios";

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
      start: (dateInterval as any)[0],
      finish: (dateInterval as any)[1],
      price: price,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/bookings`,
      body
    );

    console.log(response);
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

  return (
    <>
      <div>
        <div className="font-semibold">
          Check-in:{" "}
          <span className="font-normal">
            {(dateInterval as any)[0].toLocaleDateString("en-US", options)}
          </span>
        </div>
        <div className="font-semibold">
          Check-out:{" "}
          <span className="font-normal">
            {(dateInterval as any)[1].toLocaleDateString("en-US", options)}
          </span>
        </div>
        <div className="font-semibold">
          Days:{" "}
          <span className="font-normal">
            {calculateDaysBetween(
              (dateInterval as any)[0],
              (dateInterval as any)[1]
            )}
          </span>
        </div>
        <div className="font-semibold">
          Charge: <span className="font-normal">{charge}$</span>
        </div>
      </div>
      <button
        className="px-3 py-2 w-full bg-blue-500 rounded-md text-white hover:bg-blue-600 hover:cursor-pointer text-sm"
        onClick={handleSubmit}
      >
        Book and pay
      </button>
    </>
  );
}
