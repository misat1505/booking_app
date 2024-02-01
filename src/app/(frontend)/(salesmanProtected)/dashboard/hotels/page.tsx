"use client";
import { HotelsContextProvider } from "@/app/contexts/dashboard/hotelsContext";
import { useUserContext } from "@/app/contexts/userContext";
import Loading from "@/components/common/Loading";
import NavbarSpaceFill from "@/components/common/NavbarSpaceFill";
import DashboardInner from "@/components/dashboard/DasboardInner";
import useFetch from "@/hooks/useFetch";
import { Hotel } from "@/models/Hotel";

export default function Dashboard() {
  const { user } = useUserContext();

  if (!user) return <></>;
  return <DashboardPageInner />;
}

function DashboardPageInner() {
  const { user } = useUserContext();

  const { data, isLoading } = useFetch<{ hotels: Hotel[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/hotels/?user=${user?.uid}`
  );

  if (isLoading || !data) return <Loading />;

  return (
    <HotelsContextProvider initHotels={data.hotels}>
      <DashboardInner />
    </HotelsContextProvider>
  );
}
