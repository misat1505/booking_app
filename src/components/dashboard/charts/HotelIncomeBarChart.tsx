"use client";
import { HotelIncome } from "@/app/api/dashboard/types";
import useFetch from "@/hooks/useFetch";
import { BarChart } from "@mui/x-charts/BarChart";
import styles from "./loadingEffect.module.css";

export default function HotelIncomeBarChart() {
  const chartHeight = 300;
  const { data, isLoading } = useFetch<{ hotelsIncome: HotelIncome[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
  );

  if (isLoading || !data)
    return (
      <div
        className={styles.loading}
        style={{ height: `${chartHeight}px` }}
        aria-label="false"
      />
    );

  return (
    <BarChart
      series={[
        {
          data: data.hotelsIncome.map((hotelIncome) => hotelIncome.income),
        },
      ]}
      height={chartHeight}
      xAxis={[
        {
          data: data.hotelsIncome.map((hotelIcome) => hotelIcome.name),
          scaleType: "band",
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
    />
  );
}
