"use client";
import { HotelIncome } from "@/app/api/dashboard/types";
import React from "react";
import { MdMoneyOff } from "react-icons/md";
import { PieChart } from "@mui/x-charts/PieChart";

export default function HotelIncomePieChart({
  hotelsIncome,
}: {
  hotelsIncome: HotelIncome[];
}) {
  const chartHeight = 300;

  if (hotelsIncome.length === 0)
    return (
      <div
        className="flex flex-col justify-center items-center gap-4 bg-slate-100 rounded-md"
        style={{ height: `${chartHeight}px` }}
      >
        <div>
          <MdMoneyOff size={100} className="text-red-500" />
        </div>
        Your hotels haven&apos;t generated any income yet.
      </div>
    );

  return (
    <PieChart
      series={[
        {
          data: hotelsIncome.map((hotelIncome) => ({
            value: hotelIncome.income,
            label: hotelIncome.name,
          })),
        },
      ]}
      height={chartHeight}
    />
  );
}
