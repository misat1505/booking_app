import { decodeCredentials } from "@/actions/decodeCredentials";
import { getUserHotels } from "@/app/api/hotels/utils/functions";
import Hotels from "@/components/dashboard/Hotels";
import { redirect } from "next/navigation";

export default async function DashboardHotelsPage() {
  const { success, credentials } = decodeCredentials();
  if (!success || credentials.role !== "SALESMAN")
    redirect("/login?role=salesman");

  const hotels = await getUserHotels(credentials.uid);

  return <Hotels hotels={hotels} />;
}
