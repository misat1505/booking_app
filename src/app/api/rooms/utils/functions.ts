import { connectToDatabase } from "@/db/mongodb";
import { Room } from "@/models/Room";
import { ObjectId } from "mongodb";

export async function insertNewRoom(newRoom: Omit<Room, "uid">): Promise<Room> {
  const db = await connectToDatabase();
  const roomsCollection = db.collection("rooms");

  const insertedRoomId = (
    await roomsCollection.insertOne(newRoom)
  ).insertedId.toString();

  const room = { uid: insertedRoomId, ...newRoom };

  const { _id, ...rest } = room as any;

  return { ...rest };
}

export async function getHotelRooms(hotelId: string): Promise<Room[]> {
  const db = await connectToDatabase();
  const roomsCollection = db.collection("rooms");

  const fetchedRooms = await roomsCollection.find({ hotelId }).toArray();

  const rooms: any[] = fetchedRooms.map(({ _id, ...rest }) => ({
    uid: _id.toString(),
    ...rest,
  }));

  return rooms;
}
