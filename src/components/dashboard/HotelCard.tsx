"use client";
import { Hotel } from "@/models/Hotel";
import { useRouter } from "next/navigation";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const router = useRouter();
  if (hotel.photoURLs.length === 0)
    hotel.photoURLs.push(
      "https://i.szalas.hu/hotels/462275/original/38731390.jpg"
    );

  hotel.description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, nobis sequi! Incidunt nemo sapiente ab facilis fuga quaerat nam repellat. Cumque quis maiores, nesciunt explicabo officiis harum debitis rem fugit temporibus dolorum quasi optio quae sed ipsum voluptas enim facilis deserunt molestiae magnam voluptatibus esse beatae! Rem placeat cum soluta.";
  if (hotel.description.length > 200)
    hotel.description = hotel.description.slice(0, 200) + "...";

  return (
    <div className="mt-3 ml-3 w-52 border-solid border border-slate-400 rounded-xl">
      <img
        src={hotel.photoURLs[0]}
        alt=""
        className="w-full h-28 object-cover rounded-tr-xl rounded-tl-xl"
      />
      <h4 className="p-2 m-0 text-xl">{hotel.name}</h4>
      <p className="border-solid border-l-0 border-r-0 border-t-0 border-b border-b-slate-400 px-2 m-0 py-2 text-sm">
        {hotel.description}
      </p>
      <button
        className="mx-2 my-3 bg-blue-500 hover:bg-blue-600 border-none px-3 py-2 rounded-md text-white hover:cursor-pointer"
        onClick={() => router.push(`/dashboard/hotels/${hotel.uid}`)}
      >
        show details
      </button>
    </div>
  );
}
