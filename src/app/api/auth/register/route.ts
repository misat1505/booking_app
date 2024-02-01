import { auth } from "@/firebase/firebase-admin";
import { encode } from "../utils/jwt";
import { User } from "@/models/User";
import { createResponse } from "../../utils/createResponse";
import { ApiError } from "@/models/api/ApiError";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { idToken, role } = (await req.json()) as any;

    const decodedToken = await auth.verifyIdToken(idToken);

    const { uid, email } = decodedToken;

    const payload = { uid, email, role } as Partial<User>;
    const token = encode(payload, { expiresIn: "5m" });
    const response = createResponse<{ token: string }>(
      { token },
      { status: 200 }
    );

    const date = new Date();
    const expDate = new Date(date.setMinutes(date.getMinutes() + 5));

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      expires: expDate,
    });
    return response;
  } catch (error) {
    return createResponse<ApiError>(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }
}
