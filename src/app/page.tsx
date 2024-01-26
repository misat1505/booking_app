import HotelPreview from "@/components/home/HotelPreview";
import { Hotel } from "@/models/Hotel";
import axios from "axios";

export default async function Home() {
  const start = 0;
  const count = 10;

  const hotels = (
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/hotels/?start=${start}&count=${count}`
    )
  ).data.hotels as Hotel[];

  return (
    <main>
      <div className="w-4/5 mt-12 m-auto grid grid-cols-6 gap-6">
        {hotels.map((hotel) => (
          <HotelPreview key={hotel.uid} hotel={hotel} />
        ))}
      </div>
    </main>
  );
}
