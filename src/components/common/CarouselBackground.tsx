"use client";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import styles from "@/components/home/HotelPreview.module.css";

export default function CarouselBackground({ images }: { images: string[] }) {
  return (
    <div
      className="fixed text-center z-0 top-[88px] w-full"
      style={{
        height: "calc(100vh-88px)",
        // width: "calc(100% + 2rem)",
        // marginLeft: "-1rem",
      }}
    >
      <Carousel
        className={`w-full h-full object-cover overflow-x-hidden ${styles.carousel}`}
        plugins={[Autoplay({ delay: 10000 })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {images.map((image, id) => (
            <CarouselItem key={id} className="h-full pl-0">
              <Image
                src={image.replace("\\", "/")}
                width={2000}
                height={1000}
                alt="..."
                className="h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
