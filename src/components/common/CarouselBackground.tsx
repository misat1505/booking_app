import { Carousel } from "flowbite-react";

export default function CarouselBackground({ images }: { images: string[] }) {
  return (
    <div
      className="fixed text-center z-0 top-0"
      style={{
        height: "100vh",
        width: "calc(100% + 2rem)",
        marginLeft: "-1rem",
      }}
    >
      <Carousel
        indicators={false}
        draggable={false}
        leftControl
        rightControl
        className="w-full h-full object-cover rounded-none first:rounded-none last:rounded-none"
      >
        {images.map((image, id) => (
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
