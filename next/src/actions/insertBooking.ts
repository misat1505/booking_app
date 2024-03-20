"use server";

import { insertNewBooking } from "@/app/api/rooms/bookings/functions";
import { decodeCredentials } from "./decodeCredentials";
import { Booking } from "@/models/Booking";

type NewBookingType = {
  roomId: string;
  start: Date;
  finish: Date;
  price: number;
};

export async function insertBooking(data: NewBookingType): Promise<Booking> {
  const { success, credentials } = decodeCredentials();
  if (!success) throw new Error();

  const booking = await insertNewBooking({ ...data, userId: credentials.uid });
  return booking;
}
