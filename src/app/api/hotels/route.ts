import { NextRequest } from "next/server";
import { getUserHotels, insertNewHotel } from "./utils/functions";
import { getAccessToken } from "../auth/utils/getAccessToken";
import { createResponse } from "../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";
import { NewId } from "@/models/api/NewId";
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
    data!.uid
  );

  const user = await auth.getUser(data!.uid);

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

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("user");

  if (userId) {
    const hotels = await getUserHotels(userId);
    return createResponse<MultipleHotels>({ hotels }, { status: 200 });
  }

  return createResponse("nothing");
}
