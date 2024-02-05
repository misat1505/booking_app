import HotelPreview from "@/components/home/HotelPreview";
import { connectToDatabase } from "@/db/mongodb";
import { Hotel } from "@/models/Hotel";
import axios from "axios";

export const dynamic = "force-dynamic";

type HotelWithPrice = {
  hotel: Hotel;
  price: number | "N/A";
};

const getPrices = async (hotels: Hotel[]): Promise<HotelWithPrice[]> => {
  const db = await connectToDatabase();
  const roomsCollection = db.collection("rooms");

  const promises = hotels.map(
    (hotel) =>
      new Promise(async (resolve) => {
        const rooms = await roomsCollection
          .find({ hotelId: hotel.uid })
          .toArray();

        const smallestPrice = Math.pow(10, 10);
        const lowestPrice = rooms.reduce(
          (smallest, current: any) =>
            parseInt(current.dailyFee) < smallest
              ? parseInt(current.dailyFee)
              : smallest,
          smallestPrice
        );

        if (lowestPrice === smallestPrice) resolve({ hotel, price: "N/A" });
        resolve({ hotel, price: lowestPrice });
      })
  );

  const hotelsWithPrices = await Promise.all(promises);
  return hotelsWithPrices as any;
};

export default async function Home() {
  const start = 0;
  const count = 10;

  const hotels = (
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/hotels/?start=${start}&count=${count}`
    )
  ).data.hotels as Hotel[];

  const result = await getPrices(hotels);

  return (
    <main>
      <div className="w-4/5 mt-4 m-auto grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-6">
        {result.map(({ hotel, price }) => (
          <HotelPreview key={hotel.uid} hotel={hotel} price={price} />
        ))}
      </div>
    </main>
  );
}
