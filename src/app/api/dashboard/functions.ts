import { connectToDatabase } from "@/db/mongodb";
import { HotelIncome } from "./types";

export async function getUserHotelsIncome(
  userId: string
): Promise<HotelIncome[]> {
  const db = await connectToDatabase();

  const data = (await db
    .collection("bookings")
    .aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $addFields: {
          roomIdObjectId: { $toObjectId: "$roomId" },
        },
      },
      {
        $lookup: {
          from: "rooms",
          localField: "roomIdObjectId",
          foreignField: "_id",
          as: "room",
        },
      },
      {
        $unwind: "$room",
      },
      {
        $addFields: {
          hotelIdObjectId: { $toObjectId: "$room.hotelId" },
        },
      },
      {
        $lookup: {
          from: "hotels",
          localField: "hotelIdObjectId",
          foreignField: "_id",
          as: "hotel",
        },
      },
      {
        $unwind: "$hotel",
      },
      {
        $group: {
          _id: "$hotel._id",
          hotelName: { $first: "$hotel.name" },
          totalPrice: { $sum: "$price" },
        },
      },
      {
        $project: {
          hotelId: "$_id",
          hotelName: 1,
          totalPrice: 1,
          _id: 0,
        },
      },
    ])
    .toArray()) as HotelIncome[];

  return data;
}
