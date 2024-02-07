"use client";
import { HotelIncome } from "@/app/api/dashboard/types";
import { Skeleton } from "@/components/ui/skeleton";
import useFetch from "@/hooks/useFetch";
import React from "react";
import { MdMoneyOff } from "react-icons/md";
import { PieChart } from "@mui/x-charts/PieChart";

export default function HotelIncomePieChart() {
  const chartHeight = 300;
  const { data, isLoading } = useFetch<{ hotelsIncome: HotelIncome[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard?type=hotels-income`
  );

  if (isLoading || !data)
    return <Skeleton style={{ height: `${chartHeight}px` }} />;

  if (data.hotelsIncome.length === 0)
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
          data: data.hotelsIncome.map((hotelIncome) => ({
            value: hotelIncome.income,
            label: hotelIncome.name,
          })),
        },
      ]}
      height={chartHeight}
    />
  );
}
