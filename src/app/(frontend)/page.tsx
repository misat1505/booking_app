"use client";
import { HotelWithPrice, fetchHomePreviews } from "@/actions/fetchHomePreviews";
import HotelPreview from "@/components/home/HotelPreview";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { inView, ref } = useInView({ rootMargin: "500px", threshold: 0 });
  const HOTELS_CHUNK_SIZE = 30;
  const [hotelsWithPrices, setHotelsWithPrices] = useState<HotelWithPrice[]>(
    []
  );

  useEffect(() => {
    if (!inView) return;

    const fetchData = async () => {
      const newHotels = await fetchHomePreviews(
        hotelsWithPrices.length,
        HOTELS_CHUNK_SIZE
      );
      setHotelsWithPrices((prev) => [...prev, ...newHotels]);
    };

    fetchData();
  }, [inView]);

  return (
    <main>
      <div className="w-4/5 mt-4 m-auto grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-6">
        {hotelsWithPrices.map(({ hotel, price }) => (
          <HotelPreview key={hotel.uid} hotel={hotel} price={price} />
        ))}
      </div>
      <div aria-label="false" ref={ref} className="h-1" />
    </main>
  );
}
