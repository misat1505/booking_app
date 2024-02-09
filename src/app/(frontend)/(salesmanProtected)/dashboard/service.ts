import {
  getUserHotelsBookings,
  getUserHotelsIncome,
  getUserTopCustomers,
} from "@/app/api/dashboard/functions";
import {
  HotelBookings,
  HotelIncome,
  TopCustomer,
} from "@/app/api/dashboard/types";

type ChartsData = {
  hotelsIncome: HotelIncome[];
  topCustomers: TopCustomer[];
  hotelsBookings: HotelBookings[];
};

export const fetchChartsData = async (userId: string): Promise<ChartsData> => {
  const promises = [
    getUserHotelsIncome(userId),
    getUserTopCustomers(userId),
    getUserHotelsBookings(userId),
  ];

  const [hotelsIncome, topCustomers, hotelsBookings] = await Promise.all(
    promises
  );

  return {
    hotelsIncome,
    topCustomers,
    hotelsBookings,
  } as ChartsData;
};
