"use client";
import { HotelsContextProvider } from "@/app/contexts/dashboard/hotelsContext";
import { useUserContext } from "@/app/contexts/userContext";
import DashboardInner from "@/components/dashboard/DasboardInner";

import { Hotel } from "@/models/Hotel";
import axios from "axios";

export default async function Dashboard() {
  const { user } = useUserContext();

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hotels/?user=${user?.uid}`
  );

  const hotels = response.data.hotels as Hotel[];

  return (
    <HotelsContextProvider initHotels={hotels}>
      <DashboardInner />
    </HotelsContextProvider>
  );
}
