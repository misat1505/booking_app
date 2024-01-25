"use client";
import Loading from "@/components/common/Loading";
import { Hotel } from "@/models/Hotel";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/decode`,
        {},
        { withCredentials: true }
      );
      const userId = response1.data.data.uid;

      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/hotels/?user=${userId}`
      );

      setHotels(response2.data.hotels);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  return <div>{JSON.stringify(hotels)}</div>;
}
