import { MongoClient } from "mongodb";

let client: MongoClient | undefined;

export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);

    await client.connect();
  }

  return client.db();
};
