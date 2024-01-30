import { ObjectId } from "mongodb";

export type Booking = {
  uid: string;
  // hotelId: string;
  roomId: string;
  userId: string;
  start: Date;
  finish: Date;
  price: number;
};

export type MongoBooking = Omit<Booking, "uid"> & { _id: ObjectId };
