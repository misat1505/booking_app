import { decodeCredentials } from "@/actions/decodeCredentials";
import HotelBookingsBarChart from "@/components/dashboard/charts/HotelBookingsBarChart";
import HotelIncomeBarChart from "@/components/dashboard/charts/HotelIncomeBarChart";
import HotelIncomePieChart from "@/components/dashboard/charts/HotelIncomePieChart";
import TopCustomers from "@/components/dashboard/charts/TopCustomers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaHotel } from "react-icons/fa6";
import { fetchChartsData } from "./service";

export default async function Dashboard() {
  console.log(process.env.NEXT_PUBLIC_IMAGE_SERVER_URL);
  console.log(process.env.MONGODB_URI);
  console.log(process.env.JWT_SECRET);

  const { success, credentials } = decodeCredentials();
  if (!success || credentials.role !== "SALESMAN")
    redirect("/login?role=salesman");

  const { hotelsIncome, topCustomers, hotelsBookings } = await fetchChartsData(
    credentials.uid
  );

  return (
    <div className="grid grid-cols-2 mt-12 gap-4 w-full lg:max-w-[1200px] p-4 mx-auto">
      <Link
        className="flex items-center bg-slate-50 p-4 border border-1 border-slate-300 rounded-md col-span-2 hover:bg-slate-100 mb-6 font-semibold text-lg gap-4"
        href={"/dashboard/hotels"}
      >
        <FaHotel className="text-blue-600" />
        BROWSE YOUR HOTELS
      </Link>
      <div className="col-span-2 lg:col-span-1">
        <HotelIncomeBarChart hotelsIncome={hotelsIncome} />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <HotelIncomePieChart hotelsIncome={hotelsIncome} />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <TopCustomers topCustomers={topCustomers} />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <HotelBookingsBarChart hotelsBookings={hotelsBookings} />
      </div>
    </div>
  );
}
