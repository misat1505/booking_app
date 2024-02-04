"use client";
import { Hotel } from "@/models/Hotel";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";
import styles from "./HotelPreview.module.css";

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
        className={`w-full h-52 object-cover rounded-tr-xl rounded-tl-xl overflow-x-hidden ${styles.carousel}`}
      >
        <CarouselContent className="h-full">
          <CarouselItem className="h-full pl-0">
            <Image
              src={hotel.photoURLs[0].replace("\\", "/")}
              fill
              alt="..."
              className="h-full object-cover"
            />
          </CarouselItem>
        </CarouselContent>
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
