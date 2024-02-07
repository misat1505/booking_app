import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../auth/utils/getAccessToken";
import { createResponse } from "../utils/createResponse";
import { getUserHotelsIncome } from "./functions";
import { ApiError } from "@/models/api/ApiError";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { success, data } = getAccessToken(req);

  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const type = req.nextUrl.searchParams.get("type");
  if (!type)
    return createResponse<ApiError>({ error: "Have to provide type." });

  if (type === "hotels-income") {
    const hotelsIncome = await getUserHotelsIncome(data.uid);
    return createResponse({ hotelsIncome }, { status: 200 });
  }

  return createResponse<ApiError>(
    { error: `Invalid type '${type}'` },
    { status: 400 }
  );
}
