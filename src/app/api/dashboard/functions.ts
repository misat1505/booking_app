import { connectToDatabase } from "@/db/mongodb";
import { HotelBookings, HotelIncome, TopCustomer } from "./types";
import { auth } from "@/firebase/firebase-admin";
import { User } from "@/models/User";

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
          uid: { $toString: "$_id" },
          name: 1,
          income: 1,
          _id: 0,
        },
      },
    ])
    .toArray()) as HotelIncome[];

  return data || [];
}

export async function getUserHotelsBookings(
  userId: string
): Promise<HotelBookings[]> {
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
          bookings: { $sum: 1 },
        },
      },
      {
        $sort: {
          bookings: -1,
        },
      },
      {
        $project: {
          uid: { $toString: "$_id" },
          name: 1,
          bookings: 1,
          _id: 0,
        },
      },
    ])
    .toArray()) as HotelBookings[];

  return data || [];
}

export async function getUserTopCustomers(
  userId: string
): Promise<TopCustomer[]> {
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
          _id: "$userId",
          bookings: { $sum: 1 },
        },
      },
      {
        $sort: {
          bookings: -1,
        },
      },
      {
        $project: {
          uid: { $toString: "$_id" },
          bookings: 1,
          _id: 0,
        },
      },
    ])
    .toArray()) as { bookings: number; uid: string }[];

  const userIds = data.map((single) => ({ uid: single.uid }));
  const users = await auth.getUsers(userIds);

  const merged = data
    .map((single) => {
      const foundUser = users.users.find((user) => user.uid === single.uid);
      if (!foundUser) return null;

      const user: Omit<User, "role"> = {
        uid: foundUser.uid,
        displayName: foundUser.displayName,
        email: foundUser.email,
        photoURL: foundUser.photoURL,
      };

      return { totalBookings: single.bookings, user } as TopCustomer;
    })
    .filter((single): single is TopCustomer => single !== null);

  return merged || [];
}
