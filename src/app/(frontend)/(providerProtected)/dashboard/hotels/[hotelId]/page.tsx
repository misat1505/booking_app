import axios from "axios";

export default async function HotelPage({
  params,
}: {
  params: { hotelId: string };
}) {
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hotels/?hotel=${params.hotelId}`
  );

  return <div>{JSON.stringify(data.data.hotel)}</div>;
}
