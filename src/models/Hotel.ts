import { ObjectId } from "mongodb";
import { User } from "./User";

export type Hotel = {
  uid: string;
  name: string;
  description: string;
  photoURLs: string[];
  owner: Omit<User, "role">;
};

export type MongoHotel = Omit<Hotel, "uid" | "owner"> & {
  _id: ObjectId;
  ownerId: string;
};
