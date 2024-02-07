import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../auth/utils/getAccessToken";
import { createResponse } from "../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";
import { getHotel } from "../hotels/utils/functions";
import { Room } from "@/models/Room";
import { getHotelRooms, getRoom, insertNewRoom } from "./utils/functions";
import { MultipleRooms, SingleRoom } from "./types";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { success, data } = getAccessToken(req);
  if (!success || data.role.toUpperCase() !== "SALESMAN")
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const { uid } = data!;

  const body = await req.json();

  const roomData: Omit<Room, "uid"> = {
    name: body.name,
    hotelId: body.hotelId,
    capacity: parseInt(body.capacity),
    dailyFee: parseInt(body.dailyFee),
  };

  const hotel = await getHotel(roomData.hotelId);

  if (!hotel || hotel.owner.uid !== uid)
    return createResponse<ApiError>({
      error: "Can't create room for this hotel.",
    });

  const newRoom = await insertNewRoom(roomData);

  return createResponse<SingleRoom>({ room: newRoom }, { status: 201 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const hotelId = req.nextUrl.searchParams.get("hotel");
    const roomId = req.nextUrl.searchParams.get("room");

    if (hotelId) {
      const rooms = await getHotelRooms(hotelId);
      return createResponse<MultipleRooms>({ rooms }, { status: 200 });
    }

    if (roomId) {
      const room = await getRoom(roomId);

      if (!room)
        return createResponse<ApiError>(
          { error: `Room ${roomId} not found for hotel ${hotelId}.` },
          { status: 404 }
        );

      return createResponse<SingleRoom>({ room }, { status: 200 });
    }

    throw new Error();
  } catch (e) {
    return createResponse<ApiError>({ error: "Bad request." }, { status: 400 });
  }
}
