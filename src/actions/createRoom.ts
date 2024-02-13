"use server";

import { Room } from "@/models/Room";
import { decodeCredentials } from "./decodeCredentials";
import { getHotel } from "@/app/api/hotels/utils/functions";
import { insertNewRoom } from "@/app/api/rooms/utils/functions";

export async function createRoom(roomData: Omit<Room, "uid">): Promise<Room> {
  const { success, credentials } = decodeCredentials();
  if (!success || credentials.role.toUpperCase() !== "SALESMAN")
    throw new Error();

  const hotel = await getHotel(roomData.hotelId);

  if (!hotel) throw new Error(`Hotel of id ${roomData.hotelId} doesn't exist.`);

  if (hotel.owner.uid !== credentials.uid)
    throw new Error("Can't create room for not your hotel.");

  const newRoom = await insertNewRoom(roomData);

  return newRoom;
}
