import { decodeCredentials } from "@/actions/decodeCredentials";
import { getUserHotels } from "@/app/api/hotels/utils/functions";
import DashboardInner from "@/components/dashboard/DashboardInner";
import { redirect } from "next/navigation";

export default async function DashboardHotelsPage() {
  const { success, credentials } = decodeCredentials();
  if (!success || credentials.role !== "SALESMAN")
    redirect("/login?role=salesman");

  const hotels = await getUserHotels(credentials.uid);

  return <DashboardInner hotels={hotels} />;
}
