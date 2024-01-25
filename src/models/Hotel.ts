import { User } from "./User";

export type Hotel = {
  uid: string;
  name: string;
  description: string;
  photoURLs: string[];
  owner: Omit<User, "role">;
};
