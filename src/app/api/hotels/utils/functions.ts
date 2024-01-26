import { connectToDatabase } from "@/db/mongodb";
import { auth } from "@/firebase/firebase-admin";
import { Hotel } from "@/models/Hotel";
import { User } from "@/models/User";
import { ObjectId } from "mongodb";

export async function insertNewHotel(
  hotel: Omit<Hotel, "owner" | "uid">,
  ownerId: string
): Promise<string> {
  const db = await connectToDatabase();
  const hotelsCollection = db.collection("hotels");
  const insertedHotel = { ...hotel, ownerId };

  const newHotelId = (
    await hotelsCollection.insertOne(insertedHotel)
  ).insertedId.toString();
  return newHotelId;
}

export async function getUserHotels(userId: string): Promise<Hotel[]> {
  const db = await connectToDatabase();
  const hotelsCollection = db.collection("hotels");

  const hotels = await hotelsCollection.find({ ownerId: userId }).toArray();

  const { uid, email, displayName, photoURL } = await auth.getUser(userId);
  const userData: Omit<User, "role"> = {
    uid,
    email: email!,
    displayName: displayName!,
    photoURL: photoURL!,
  };

  const hotelsWithOwner = hotels.map(({ _id, ownerId, ...rest }) => ({
    ...rest,
    uid: _id,
    owner: userData,
  }));

  return hotelsWithOwner as any;
}

export async function getHotel(hotelId: string): Promise<Hotel> {
  const db = await connectToDatabase();
  const hotelsCollection = db.collection("hotels");

  const hotelFetched = (
    await hotelsCollection
      .find({
        _id: new ObjectId(hotelId),
      })
      .toArray()
  )[0];
  const ownerId = (hotelFetched as any).ownerId;

  const user = await auth.getUser(ownerId);
  const { uid, displayName, photoURL, email } = user;

  const userData: Omit<User, "role"> = {
    uid,
    email: email!,
    displayName: displayName!,
    photoURL: photoURL!,
  };

  const { _id, ownerId: owner, ...rest } = hotelFetched as any;

  const hotel: Hotel = {
    ...rest,
    uid: _id,
    owner: userData,
  };

  return hotel;
}