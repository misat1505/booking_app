import StyledLink from "@/components/common/StyledLink";
import HotelIncomeBarChart from "@/components/dashboard/charts/HotelIncomeBarChart";

export default function Dashboard() {
  return (
    <>
      <StyledLink href={"/dashboard/hotels"}>Show my hotels</StyledLink>
      <div className="grid grid-cols-2 mt-12 w-full lg:max-w-[1200px] p-4 mx-auto">
        <div className="col-span-2 lg:col-span-1">
          <HotelIncomeBarChart />
        </div>
      </div>
    </>
  );
}
