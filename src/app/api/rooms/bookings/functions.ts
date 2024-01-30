import { connectToDatabase } from "@/db/mongodb";
import { Booking, MongoBooking } from "@/models/Booking";

export async function insertNewBooking(
  bookingData: Omit<Booking, "uid">
): Promise<Booking> {
  const db = await connectToDatabase();
  const bookingsCollection = db.collection("bookings");

  const dataCopy = { ...bookingData };

  const insertedId = (
    await bookingsCollection.insertOne(bookingData)
  ).insertedId.toString();

  const newBooking = { uid: insertedId, ...dataCopy } as Booking;
  return newBooking;
}

export async function getRoomBookings(roomId: string): Promise<Booking[]> {
  const db = await connectToDatabase();
  const bookingsCollection = db.collection("bookings");

  const mongoBookings = (await bookingsCollection
    .find({ roomId })
    .toArray()) as MongoBooking[];

  const bookings = mongoBookings.map(
    ({ _id, ...rest }) => ({ uid: _id.toString(), ...rest } as Booking)
  );

  return bookings;
}
