import { auth } from "@/firebase/firebase-admin";
import { encode } from "../utils/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { idToken } = (await req.json()) as any;

    const decodedToken = await auth.verifyIdToken(idToken);

    const userId = decodedToken.uid;
    const email = decodedToken.email;

    const payload = { userId, email };
    const token = encode(payload);
    const response = new NextResponse(JSON.stringify(payload), { status: 200 });

    const date = new Date();
    const expDate = new Date(date.setMonth(date.getMonth() + 1));

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      expires: expDate,
    });
    return response;
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
}
