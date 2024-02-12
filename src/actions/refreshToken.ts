"use server";

import { cookies } from "next/headers";
import { decodeCredentials } from "./decodeCredentials";
import { User } from "@/models/User";
import { encode } from "@/app/api/auth/utils/jwt";

export async function refreshToken(): Promise<void> {
  const { success, credentials } = decodeCredentials();
  if (!success) throw new Error();

  const { uid, email, role } = credentials;
  const payload = { uid, email, role } as Partial<User>;
  const newToken = encode(payload, { expiresIn: "5h" });

  const date = new Date();
  const expDate = new Date(date.setHours(date.getHours() + 5));

  cookies().set("token", newToken, {
    httpOnly: true,
    path: "/",
    expires: expDate,
  });
}
