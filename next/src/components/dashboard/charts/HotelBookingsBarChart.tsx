"use client";
import { HotelBookings } from "@/app/api/dashboard/types";
import { BarChart } from "@mui/x-charts/BarChart";
import React from "react";
import { MdMoneyOff } from "react-icons/md";

export default function HotelBookingsBarChart({
  hotelsBookings,
}: {
  hotelsBookings: HotelBookings[];
}) {
  const chartHeight = 300;

  if (hotelsBookings.length === 0)
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
          data: hotelsBookings.map((hotelBooking) => hotelBooking.bookings),
        },
      ]}
      height={chartHeight}
      xAxis={[
        {
          data: hotelsBookings.map((hotelBooking) => hotelBooking.name),
          scaleType: "band",
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
    />
  );
}
