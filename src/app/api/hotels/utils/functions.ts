import { connectToDatabase } from "@/db/mongodb";
import { auth } from "@/firebase/firebase-admin";
import { Hotel, MongoHotel } from "@/models/Hotel";
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

  const hotels = (await hotelsCollection
    .find({ ownerId: userId })
    .toArray()) as MongoHotel[];

  const { uid, email, displayName, photoURL } = await auth.getUser(userId);
  const userData: Omit<User, "role"> = {
    uid,
    email: email!,
    displayName: displayName!,
    photoURL: photoURL!,
  };

  const hotelsWithOwner = hotels.map(
    ({ _id, ownerId, ...rest }) =>
      ({
        ...rest,
        uid: _id.toString(),
        owner: userData,
      } as Hotel)
  );

  return hotelsWithOwner;
}

export async function getHotel(hotelId: string): Promise<Hotel | null> {
  const db = await connectToDatabase();
  const hotelsCollection = db.collection("hotels");

  const hotelFetched = (await hotelsCollection.findOne({
    _id: new ObjectId(hotelId),
  })) as MongoHotel | null;

  if (!hotelFetched) return null;

  const ownerId = hotelFetched.ownerId;

  const user = await auth.getUser(ownerId);
  const { uid, displayName, photoURL, email } = user;

  const userData: Omit<User, "role"> = {
    uid,
    email: email!,
    displayName: displayName!,
    photoURL: photoURL!,
  };

  const { _id, ownerId: owner, ...rest } = hotelFetched;

  const hotel: Hotel = {
    ...rest,
    uid: _id.toString(),
    owner: userData,
  };

  return hotel;
}

export async function getHotels(
  start: number,
  count: number
): Promise<Hotel[]> {
  const db = await connectToDatabase();
  const hotelsCollection = db.collection("hotels");

  const hotels = (
    (await hotelsCollection
      .find()
      .skip(start)
      .limit(count)
      .toArray()) as MongoHotel[]
  ).map(({ _id, ...rest }) => ({ uid: _id.toString(), ...rest }));

  const owners = hotels.map((hotel) => ({ uid: hotel.ownerId }));

  const uniqueOwners = owners.filter(
    (owner, index, self) => index === self.findIndex((o) => o.uid === owner.uid)
  );

  const users = (await auth.getUsers(uniqueOwners)).users;

  const hotelsWithOwners: Hotel[] = hotels
    .map((hotel) => {
      const ownerInfo = users.find((user) => user.uid === hotel.ownerId);

      if (!ownerInfo) return undefined;

      const owner: Omit<User, "role"> = {
        uid: ownerInfo.uid,
        displayName: ownerInfo.displayName,
        email: ownerInfo.email,
        photoURL: ownerInfo.photoURL,
      };

      const { ownerId, ...rest } = hotel;
      return { owner, ...rest } as Hotel;
    })
    .filter((hotel): hotel is Hotel => hotel !== undefined);

  return hotelsWithOwners;
}
