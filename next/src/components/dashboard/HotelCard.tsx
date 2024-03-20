"use client";
import { Hotel } from "@/models/Hotel";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import StyledLink from "../common/StyledLink";
import Autoplay from "embla-carousel-autoplay";
import styles from "@/components/home/HotelPreview.module.css";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  if (hotel.description.length > 500)
    hotel.description = hotel.description.slice(0, 500) + "...";
  hotel.photoURLs.forEach((photo) => {
    console.log(
      `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}${photo.replace("\\", "/")}`
    );
  });

  return (
    <div className="rounded-xl flex flex-col bg-slate-100 hover:shadow-xl transition-shadow min-w-64 max-w-[350px]">
      <Carousel
        className={`w-full h-52 object-cover rounded-tr-xl rounded-tl-xl overflow-x-hidden ${styles.carousel}`}
        plugins={[Autoplay({ delay: 5000 })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {hotel.photoURLs.map((photo, id) => (
            <CarouselItem key={id} className="h-full pl-0">
              <img
                src={`${
                  process.env.NEXT_PUBLIC_IMAGE_SERVER_URL
                }${photo.replace("\\", "/")}`}
                width={2000}
                height={1000}
                alt="..."
                className="h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <h4 className="p-2 m-0 text-xl font-bold">{hotel.name}</h4>
      <p className="border-solid border-l-0 border-r-0 border-t-0  px-2 m-0 py-2 text-sm flex-grow">
        {hotel.description}
      </p>
      <StyledLink
        href={`/dashboard/hotels/${hotel.uid}`}
        className="my-3 w-3/4 mx-auto"
      >
        Show details
      </StyledLink>
    </div>
  );
}
