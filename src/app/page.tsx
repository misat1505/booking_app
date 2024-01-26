import axios from "axios";

export default async function Home() {
  const start = 0;
  const count = 10;

  const hotels = (
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/hotels/?start=${start}&count=${count}`
    )
  ).data.hotels;

  return <div>{JSON.stringify(hotels)}</div>;
}
