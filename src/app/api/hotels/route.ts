import { NextRequest, NextResponse } from "next/server";
import {
  getHotel,
  getHotels,
  getUserHotels,
  insertNewHotel,
} from "./utils/functions";
import { getAccessToken } from "../auth/utils/getAccessToken";
import { createResponse } from "../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";
import { MultipleHotels, SingleHotel } from "./types";
import { auth } from "@/firebase/firebase-admin";
import { Hotel } from "@/models/Hotel";

export async function POST(req: NextRequest) {
  const { success, data } = getAccessToken(req);
  const { name, description, photoURLs } = await req.json();

  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const newId = await insertNewHotel(
    { name, description, photoURLs },
    data.uid
  );

  const user = await auth.getUser(data.uid);

  const newHotel: Hotel = {
    uid: newId,
    name,
    description,
    photoURLs,
    owner: {
      uid: user.uid,
      displayName: user.displayName!,
      photoURL: user.photoURL!,
      email: user.email!,
    },
  };

  return createResponse<SingleHotel>({ hotel: newHotel }, { status: 200 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const userId = req.nextUrl.searchParams.get("user");
    const hotelId = req.nextUrl.searchParams.get("hotel");

    if (userId) {
      const hotels = await getUserHotels(userId);
      return createResponse<MultipleHotels>({ hotels }, { status: 200 });
    }

    if (hotelId) {
      const hotel = await getHotel(hotelId);
      if (!hotel)
        return createResponse<ApiError>(
          { error: `Hotel ${hotelId} not found.` },
          { status: 404 }
        );
      return createResponse<SingleHotel>({ hotel }, { status: 200 });
    }

    const start = req.nextUrl.searchParams.get("start");
    const count = req.nextUrl.searchParams.get("count");

    if (start && count) {
      const hotels = await getHotels(parseInt(start), parseInt(count));
      return createResponse<MultipleHotels>({ hotels }, { status: 200 });
    }

    throw new Error();
  } catch (e) {
    return createResponse<ApiError>({ error: "Bad request." }, { status: 400 });
  }
}
