import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../utils/getAccessToken";
import { createResponse } from "../../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";
import { encode } from "../utils/jwt";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { success, data } = getAccessToken(req);

  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const { uid, email, role } = data;
  const payload = { uid, email, role };
  const newToken = encode(payload, { expiresIn: "0m" });

  const response = createResponse({ token: newToken }, { status: 200 });
  response.cookies.set("token", newToken, {
    httpOnly: true,
    path: "/",
    expires: new Date(),
  });
  return response;
}
