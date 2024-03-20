import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../utils/getAccessToken";
import { createResponse } from "../../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";
import { encode } from "../utils/jwt";
import { User } from "@/models/User";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { success, data } = getAccessToken(req);
  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const { uid, email, role } = data;
  const payload = { uid, email, role } as Partial<User>;
  const token = encode(payload, { expiresIn: "5h" });
  const response = createResponse<{ token: string }>(
    { token },
    { status: 200 }
  );

  const date = new Date();
  const expDate = new Date(date.setHours(date.getHours() + 5));

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    expires: expDate,
  });
  return response;
}
