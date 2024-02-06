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
        $match: {
          "hotel.ownerId": userId,
        },
      },
      {
        $group: {
          _id: "$hotel._id",
          name: { $first: "$hotel.name" },
          income: { $sum: "$price" },
        },
      },
      {
        $sort: {
          income: -1,
        },
      },
      {
        $project: {
          uid: "$_id",
          name: 1,
          income: 1,
          _id: 0,
        },
      },
    ])
    .toArray()) as HotelIncome[];

  return data || [];
}
