import { ObjectId } from "mongodb";

export type Room = {
  uid: string;
  name: string;
  dailyFee: number;
  hotelId: string;
  capacity: number;
};

export type MongoRoom = Omit<Room, "uid"> & { _id: ObjectId };
