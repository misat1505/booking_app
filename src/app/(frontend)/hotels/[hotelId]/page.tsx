import { getHotel } from "@/app/api/hotels/utils/functions";
import CarouselBackground from "@/components/common/CarouselBackground";
import HotelInner from "@/components/hotel/HotelInner";
import { notFound } from "next/navigation";

export default async function HotelPreviewPage({
  params,
}: {
  params: { hotelId: string };
}) {
  const hotel = await getHotel(params.hotelId);
  if (!hotel) notFound();

  return (
    <div>
      <CarouselBackground images={hotel.photoURLs} />
      <div className="absolute z-10 top-0">
        <HotelInner hotel={hotel} />
      </div>
    </div>
  );
}
