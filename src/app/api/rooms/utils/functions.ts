import { connectToDatabase } from "@/db/mongodb";
import { Room } from "@/models/Room";

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
