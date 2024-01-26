import { NextRequest } from "next/server";
import { getAccessToken } from "../auth/utils/getAccessToken";
import { createResponse } from "../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";
import { getHotel } from "../hotels/utils/functions";
import { Room } from "@/models/Room";
import { insertNewRoom } from "./utils/functions";
import { NewRoom } from "./types";

export async function POST(req: NextRequest) {
  const { success, data } = getAccessToken(req);
  console.log(success, data);
  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const { uid } = data!;

  const body = (await req.json()) as Omit<Room, "uid">;

  const hotel = await getHotel(body.hotelId);

  if (!hotel || hotel.owner.uid !== uid)
    return createResponse<ApiError>({
      error: "Can't create room for this hotel.",
    });

  const newRoom = await insertNewRoom(body);

  return createResponse<NewRoom>({ room: newRoom }, { status: 201 });
}
