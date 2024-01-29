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

  const fetchedUser = await auth.getUser(data!.uid);

  const user: User = {
    uid: data!.uid,
    email: fetchedUser.email!,
    role: data!.role,
    displayName: fetchedUser.displayName!,
    photoURL: fetchedUser.photoURL!,
  };

  return createResponse({ user }, { status: 200 });
}
