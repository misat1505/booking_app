import HotelImagesCarousel from "@/components/dashboard/hotel/HotelImagesCarousel";
import HotelTiles from "@/components/dashboard/hotel/HotelTiles";
import { Hotel } from "@/models/Hotel";
import axios from "axios";

export default async function HotelPage({
  params,
}: {
  params: { hotelId: string };
}) {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hotels/?hotel=${params.hotelId}`
  );

  const hotel = data.data.hotel as Hotel;

  return (
    <div>
      <HotelImagesCarousel hotel={hotel} />
      <div className="absolute z-10" style={{ top: "86px" }}>
        <HotelTiles hotel={hotel} />
      </div>
    </div>
  );
}
