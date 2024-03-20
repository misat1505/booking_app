import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../../auth/utils/getAccessToken";
import { createResponse } from "../../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";
import { Booking } from "@/models/Booking";
import {
  getRoomBookings,
  getUserBookings,
  insertNewBooking,
} from "./functions";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { success, data } = getAccessToken(req);

  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as Omit<Booking, "uid" | "userId">;
  const userId = data.uid;

  const booking = await insertNewBooking({ ...body, userId });

  return createResponse<{ booking: Booking }>({ booking }, { status: 201 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const roomId = req.nextUrl.searchParams.get("room");
  const isSelf = req.nextUrl.searchParams.get("self");

  if (roomId) {
    const bookings = await getRoomBookings(roomId);
    return createResponse<{ bookings: Booking[] }>(
      { bookings },
      { status: 200 }
    );
  }

  if (isSelf === "true") {
    const { success, data } = getAccessToken(req);
    if (!success || data.role.toUpperCase() !== "CUSTOMER")
      return createResponse<ApiError>(
        { error: "Unauthorized" },
        { status: 401 }
      );
    const bookings = await getUserBookings(data.uid);
    return createResponse<{ bookings: Booking[] }>(
      { bookings },
      { status: 200 }
    );
  }

  return createResponse<ApiError>({ error: "Bad request." }, { status: 400 });
}
