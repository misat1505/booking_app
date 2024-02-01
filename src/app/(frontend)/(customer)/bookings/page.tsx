"use client";
import Loading from "@/components/common/Loading";
import useFetch from "@/hooks/useFetch";
import { Booking } from "@/models/Booking";

export default function Bookings() {
  const { data, isLoading, error } = useFetch<{ bookings: Booking[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/bookings?self=true`,
    { withCredentials: true }
  );

  if (isLoading) return <Loading />;

  if (error) return <div>Have to be logged in as customer.</div>;

  const bookings = data?.bookings;

  return <div>{JSON.stringify(bookings)}</div>;
}
