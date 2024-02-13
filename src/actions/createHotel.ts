"use server";

import { Hotel } from "@/models/Hotel";
import { decodeCredentials } from "./decodeCredentials";
import { insertNewHotel } from "@/app/api/hotels/utils/functions";
import { auth } from "@/firebase/firebase-admin";

export async function createHotel(
  hotelData: Omit<Hotel, "owner" | "uid">
): Promise<Hotel> {
  const { success, credentials } = decodeCredentials();
  if (!success || credentials.role.toUpperCase() !== "SALESMAN")
    throw new Error();

  const newId = await insertNewHotel(hotelData, credentials.uid);

  const user = await auth.getUser(credentials.uid);

  const newHotel: Hotel = {
    uid: newId,
    ...hotelData,
    owner: {
      uid: user.uid,
      displayName: user.displayName!,
      photoURL: user.photoURL!,
      email: user.email!,
    },
  };

  return newHotel;
}
