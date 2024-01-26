import { Hotel } from "@/models/Hotel";
import { Carousel } from "flowbite-react";

export default function HotelImagesCarousel({ hotel }: { hotel: Hotel }) {
  return (
    <div
      className="fixed text-center z-0"
      style={{
        top: "86px",
        height: "calc(100vh - 86px)",
        width: "calc(100% + 2rem)",
        marginLeft: "-1rem",
      }}
    >
      <Carousel
        indicators={false}
        leftControl
        rightControl
        className="w-full h-full object-cover rounded-none first:rounded-none last:rounded-none"
      >
        {hotel.photoURLs.map((image, id) => (
          <img
            src={image}
            key={id}
            alt="..."
            className="h-full object-cover rounded-none"
          />
        ))}
      </Carousel>
    </div>
  );
}
