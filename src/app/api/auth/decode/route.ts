import { NextRequest } from "next/server";
import { getAccessToken } from "../utils/getAccessToken";
import { createResponse } from "../../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";

export async function POST(req: NextRequest) {
  const { success, data } = getAccessToken(req);

  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  return createResponse({ data }, { status: 200 });
}
