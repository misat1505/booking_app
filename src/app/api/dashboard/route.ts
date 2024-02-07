import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../auth/utils/getAccessToken";
import { createResponse } from "../utils/createResponse";
import {
  getUserHotelsBookings,
  getUserHotelsIncome,
  getUserTopCustomers,
} from "./functions";
import { ApiError } from "@/models/api/ApiError";
import { HotelBookings, HotelIncome, TopCustomer } from "./types";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { success, data } = getAccessToken(req);

  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const type = req.nextUrl.searchParams.get("type");
  if (!type)
    return createResponse<ApiError>({ error: "Have to provide type." });

  if (type === "hotels-income") {
    const hotelsIncome = await getUserHotelsIncome(data.uid);
    return createResponse<{ hotelsIncome: HotelIncome[] }>(
      { hotelsIncome },
      { status: 200 }
    );
  }

  if (type === "hotels-bookings") {
    const hotelsBookings = await getUserHotelsBookings(data.uid);
    return createResponse<{ hotelsBookings: HotelBookings[] }>(
      { hotelsBookings },
      { status: 200 }
    );
  }

  if (type === "top-customers") {
    const topCustomers = await getUserTopCustomers(data.uid);
    return createResponse<{ topCustomers: TopCustomer[] }>(
      { topCustomers },
      { status: 200 }
    );
  }

  return createResponse<ApiError>(
    { error: `Invalid type '${type}'` },
    { status: 400 }
  );
}
