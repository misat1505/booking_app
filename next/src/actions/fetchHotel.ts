"use server";

import { getHotel } from "@/app/api/hotels/utils/functions";
import { Hotel } from "@/models/Hotel";

export async function fetchHotel(hotelId: string): Promise<Hotel | null> {
  return getHotel(hotelId);
}
