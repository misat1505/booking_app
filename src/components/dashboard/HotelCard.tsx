"use client";
import { Hotel } from "@/models/Hotel";
import { Carousel } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const router = useRouter();

  const shuffleArray = (array: string[]) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  // const photos = [
  //   "https://i.szalas.hu/hotels/462275/original/38731390.jpg",
  //   "https://www.prestizowehotele.pl/wp-content/uploads/2017/06/luksusowe-hotele-spa-2.jpg",
  //   "https://cf.bstatic.com/xdata/images/hotel/max1024x768/247476485.jpg?k=e4516af0c9afab08e1b9eb6a492076b17fa5578925d46dcef27c2eccb1ec9777&o=&hp=1",
  // ];

  // shuffleArray(photos);
  // hotel.photoURLs = photos;

  if (hotel.description.length > 500)
    hotel.description = hotel.description.slice(0, 500) + "...";

  return (
    <div className="mt-3 ml-3 w-1/5 border-solid border border-slate-400 rounded-xl flex flex-col">
      <Carousel
        indicators={false}
        leftControl
        rightControl
        className="w-full h-52 object-cover rounded-tr-xl rounded-tl-xl"
      >
        {hotel.photoURLs.map((photo, id) => (
          <img key={id} src={photo} alt="..." className="object-cover" />
        ))}
      </Carousel>
      <h4 className="p-2 m-0 text-xl font-bold">{hotel.name}</h4>
      <p className="border-solid border-l-0 border-r-0 border-t-0 border-b border-b-slate-400 px-2 m-0 py-2 text-sm flex-grow">
        {hotel.description}
      </p>
      <button
        className="my-3 bg-blue-500 hover:bg-blue-600 border-none px-3 py-2 rounded-md text-white hover:cursor-pointer w-fit m-auto"
        onClick={() => router.push(`/dashboard/hotels/${hotel.uid}`)}
      >
        Show details
      </button>
    </div>
  );
}
