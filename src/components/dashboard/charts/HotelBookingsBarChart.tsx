"use client";
import { HotelBookings } from "@/app/api/dashboard/types";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";
import { MdMoneyOff } from "react-icons/md";

export default function HotelBookingsBarChart() {
  const chartHeight = 300;
  const { data, isLoading } = useFetch<{ hotelsBookings: HotelBookings[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard?type=hotels-bookings`
  );

  if (isLoading || !data)
    return <Skeleton style={{ height: `${chartHeight}px` }} />;

  if (data.hotelsBookings.length === 0)
    return (
      <div
        className="flex flex-col justify-center items-center gap-4 bg-slate-100 rounded-md"
        style={{ height: `${chartHeight}px` }}
      >
        <div>
          <MdMoneyOff size={100} className="text-red-500" />
        </div>
        No one has ever booked any of your rooms yet.
      </div>
    );

  return (
    <BarChart
      series={[
        {
          data: data.hotelsBookings.map(
            (hotelBooking) => hotelBooking.bookings
          ),
        },
      ]}
      height={chartHeight}
      xAxis={[
        {
          data: data.hotelsBookings.map((hotelBooking) => hotelBooking.name),
          scaleType: "band",
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
    />
  );
}
