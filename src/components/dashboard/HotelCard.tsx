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

  return (
    <div className="mt-3 mx-2 border-solid border border-slate-400 rounded-xl flex flex-col bg-slate-50 hover:shadow-xl transition-shadow min-w-64 max-w-[350px]">
      <Carousel
        className={`w-full h-52 object-cover rounded-tr-xl rounded-tl-xl overflow-x-hidden ${styles.carousel}`}
        plugins={[Autoplay({ delay: 5000 })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {hotel.photoURLs.map((photo, id) => (
            <CarouselItem key={id} className="h-full pl-0">
              <Image
                src={photo.replace("\\", "/")}
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
      <p className="border-solid border-l-0 border-r-0 border-t-0 border-b border-b-slate-400 px-2 m-0 py-2 text-sm flex-grow">
        {hotel.description}
      </p>
      <StyledLink
        href={`/dashboard/hotels/${hotel.uid}`}
        className="my-3 w-fit mx-auto"
      >
        Show details
      </StyledLink>
    </div>
  );
}
