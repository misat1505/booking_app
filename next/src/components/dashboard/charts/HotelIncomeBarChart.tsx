"use client";
import { HotelIncome } from "@/app/api/dashboard/types";
import { BarChart } from "@mui/x-charts/BarChart";
import { MdMoneyOff } from "react-icons/md";

export default function HotelIncomeBarChart({
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
    <BarChart
      series={[
        {
          data: hotelsIncome.map((hotelIncome) => hotelIncome.income),
        },
      ]}
      height={chartHeight}
      xAxis={[
        {
          data: hotelsIncome.map((hotelIcome) => hotelIcome.name),
          scaleType: "band",
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
    />
  );
}
