"use server";

import { getHotelRooms } from "@/app/api/rooms/utils/functions";
import { Room } from "@/models/Room";

export async function fetchHotelRooms(hotelId: string): Promise<Room[]> {
  return await getHotelRooms(hotelId);
}
