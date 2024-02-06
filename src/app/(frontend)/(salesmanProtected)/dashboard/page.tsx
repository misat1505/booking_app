"use client";
import { HotelIncome } from "@/app/api/dashboard/types";
import Loading from "@/components/common/Loading";
import StyledLink from "@/components/common/StyledLink";
import useFetch from "@/hooks/useFetch";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Dashboard() {
  const { data, isLoading } = useFetch<{ hotelsIncome: HotelIncome[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
  );

  if (isLoading || !data) return <Loading />;

  return (
    <>
      <StyledLink href={"/dashboard/hotels"}>Show my hotels</StyledLink>
      <div className="grid grid-cols-2 mt-12 w-full lg:max-w-[1200px] mx-auto">
        <div className="col-span-2 lg:col-span-1">
          <BarChart
            series={[
              {
                data: data.hotelsIncome.map(
                  (hotelIncome) => hotelIncome.income
                ),
              },
            ]}
            height={300}
            xAxis={[
              {
                data: data.hotelsIncome.map((hotelIcome) => hotelIcome.name),
                scaleType: "band",
              },
            ]}
            margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
          />
        </div>
      </div>
    </>
  );
}
