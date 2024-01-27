import HotelInner from "@/components/hotel/HotelInner";
import PreviewImageCarousel from "@/components/hotel/PreviewImageCarousel";
import { Hotel } from "@/models/Hotel";
import axios from "axios";

export default async function HotelPreviewPage({
  params,
}: {
  params: { hotelId: string };
}) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hotels/?hotel=${params.hotelId}`
  );
  const hotel = response.data.hotel as Hotel;

  return (
    <div>
      <PreviewImageCarousel hotel={hotel} />
      <div className="absolute z-10">
        <HotelInner hotel={hotel} />
      </div>
    </div>
  );
}
