"use client";
import { Hotel } from "@/models/Hotel";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const router = useRouter();

  if (hotel.description.length > 500)
    hotel.description = hotel.description.slice(0, 500) + "...";

  return (
    <div className="mt-3 mx-2 border-solid border border-slate-400 rounded-xl flex flex-col bg-slate-50 hover:shadow-xl transition-shadow">
      <Carousel
        indicators={false}
        leftControl
        rightControl
        className="w-full h-52 object-cover rounded-tr-xl rounded-tl-xl"
      >
        {hotel.photoURLs.map((photo, id) => (
          <Image
            key={id}
            src={photo.replace("\\", "/")}
            alt="..."
            width={500}
            height={300}
            className="object-cover z-0 h-full"
          />
        ))}
      </Carousel>
      <h4 className="p-2 m-0 text-xl font-bold">{hotel.name}</h4>
      <p className="border-solid border-l-0 border-r-0 border-t-0 border-b border-b-slate-400 px-2 m-0 py-2 text-sm flex-grow">
        {hotel.description}
      </p>
      <Link
        className="my-3 bg-blue-500 hover:bg-blue-600 border-none px-3 py-2 rounded-md text-white hover:cursor-pointer w-fit m-auto text-sm"
        href={`/dashboard/hotels/${hotel.uid}`}
      >
        Show details
      </Link>
    </div>
  );
}
