"use client";
import { Hotel } from "@/models/Hotel";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

type HotelPreviewProps = {
  hotel: Hotel;
  price: number | "N/A";
};

export default function HotelPreview({ hotel, price }: HotelPreviewProps) {
  return (
    <Link
      href={`/hotels/${hotel.uid}`}
      className="w-full text-left rounded-md flex flex-col hover:bg-slate-100 hover:cursor-pointer"
      title="show details"
    >
      <Carousel
        indicators={false}
        leftControl
        rightControl
        className="w-full h-52 object-cover rounded-tr-xl rounded-tl-xl overflow-x-hidden"
      >
        <Image
          src={hotel.photoURLs[
            Math.floor(Math.random() * hotel.photoURLs.length)
          ].replace("\\", "/")}
          width={1000}
          height={1000}
          alt="..."
          className="object-cover z-0 h-full overflow-x-hidden"
        />
      </Carousel>
      <div className="mt-4 px-2">
        <h2 className="font-semibold text-md">{hotel.name}</h2>
      </div>
      <div className="mt-2 px-2">
        <h2 className="font-semibold text-md mb-2">
          {price}$<span className="font-normal"> a night</span>
        </h2>
      </div>
    </Link>
  );
}
