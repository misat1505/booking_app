"use client";
import { Hotel } from "@/models/Hotel";
import { Carousel } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function HotelPreview({ hotel }: { hotel: Hotel }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/hotels/${hotel.uid}`)}
      className="w-full text-left rounded-md flex flex-col hover:bg-slate-100 hover:cursor-pointer"
      title="show details"
    >
      <Carousel
        indicators={false}
        leftControl
        rightControl
        className="w-full h-52 object-cover rounded-tr-xl rounded-tl-xl overflow-x-hidden"
      >
        <img
          src={
            hotel.photoURLs[Math.floor(Math.random() * hotel.photoURLs.length)]
          }
          alt="..."
          className="object-cover z-0 h-full overflow-x-hidden"
        />
      </Carousel>
      <div className="mt-4 px-2">
        <h2 className="font-semibold text-md">{hotel.name}</h2>
      </div>
    </div>
  );
}
