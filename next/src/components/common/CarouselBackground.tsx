"use client";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import styles from "@/components/home/HotelPreview.module.css";

export default function CarouselBackground({ images }: { images: string[] }) {
  return (
    <div
      className="fixed text-center z-0 top-0 w-full"
      style={{
        height: "100vh",
      }}
    >
      <Carousel
        className={`w-full h-full object-cover overflow-x-hidden ${styles.carousel}`}
        plugins={[Autoplay({ delay: 10000 })]}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {images.map((image, id) => (
            <CarouselItem key={id} className="h-full">
              <img
                src={image.replace("\\", "/")}
                alt="..."
                className="h-full object-cover w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
