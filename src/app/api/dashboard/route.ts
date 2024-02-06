import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../auth/utils/getAccessToken";
import { createResponse } from "../utils/createResponse";
import { getUserHotelsIncome } from "./functions";
import { ApiError } from "@/models/api/ApiError";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { success, data } = getAccessToken(req);

  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const hotelsIncome = await getUserHotelsIncome(data.uid);
  return createResponse({ hotelsIncome }, { status: 200 });
}
