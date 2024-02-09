"use server";

import { getHotels } from "@/app/api/hotels/utils/functions";
import { connectToDatabase } from "@/db/mongodb";
import { Hotel } from "@/models/Hotel";

export type HotelWithPrice = {
  hotel: Hotel;
  price: number | "N/A";
};

const getPrices = async (hotels: Hotel[]): Promise<HotelWithPrice[]> => {
  const db = await connectToDatabase();
  const roomsCollection = db.collection("rooms");

  const promises = hotels.map(
    (hotel) =>
      new Promise(async (resolve) => {
        const rooms = await roomsCollection
          .find({ hotelId: hotel.uid })
          .toArray();

        const smallestPrice = Math.pow(10, 10);
        const lowestPrice = rooms.reduce(
          (smallest, current: any) =>
            parseInt(current.dailyFee) < smallest
              ? parseInt(current.dailyFee)
              : smallest,
          smallestPrice
        );

        if (lowestPrice === smallestPrice) resolve({ hotel, price: "N/A" });
        resolve({ hotel, price: lowestPrice });
      })
  );

  const hotelsWithPrices = await Promise.all(promises);
  return hotelsWithPrices as any;
};

export async function fetchHomePreviews(
  start: number,
  count: number
): Promise<HotelWithPrice[]> {
  const hotels = await getHotels(start, count);
  const hotelsWithPrices = await getPrices(hotels);
  return hotelsWithPrices;
}
