import { connectToDatabase } from "@/db/mongodb";
import { MongoRoom, Room } from "@/models/Room";
import { ObjectId } from "mongodb";

export async function insertNewRoom(newRoom: Omit<Room, "uid">): Promise<Room> {
  const db = await connectToDatabase();
  const roomsCollection = db.collection("rooms");

  const roomDataCopy = { ...newRoom };

  const insertedRoomId = (
    await roomsCollection.insertOne(newRoom)
  ).insertedId.toString();

  const room = { uid: insertedRoomId, ...roomDataCopy } as Room;

  return room;
}

export async function getHotelRooms(hotelId: string): Promise<Room[]> {
  const db = await connectToDatabase();
  const roomsCollection = db.collection("rooms");

  const fetchedRooms = (await roomsCollection
    .find({ hotelId })
    .toArray()) as MongoRoom[];

  const rooms = fetchedRooms.map(
    ({ _id, ...rest }) =>
      ({
        uid: _id.toString(),
        ...rest,
      } as Room)
  );

  return rooms;
}

export async function getRoom(
  hotelId: string,
  roomId: string
): Promise<Room | null> {
  const db = await connectToDatabase();
  const roomsCollection = db.collection("rooms");

  const room = (await roomsCollection.findOne({
    _id: new ObjectId(roomId),
    hotelId,
  })) as MongoRoom | null;

  if (!room) return null;

  const { _id, ...rest } = room;
  return { uid: _id.toString(), ...rest } as Room;
}
