import { NextRequest } from "next/server";
import { getAccessToken } from "../auth/utils/getAccessToken";
import { createResponse } from "../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";
import { auth } from "@/firebase/firebase-admin";
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
  const { success, data } = getAccessToken(req);

  if (!success)
    return createResponse<ApiError>({ error: "Unauthorized" }, { status: 401 });

  const user = (await auth.getUser(data!.uid)) as Omit<User, "role">;

  return createResponse({ user }, { status: 200 });
}
