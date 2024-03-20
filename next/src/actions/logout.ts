"use server";

import { User } from "@/models/User";
import { decodeCredentials } from "./decodeCredentials";
import { encode } from "@/app/api/auth/utils/jwt";
import { cookies } from "next/headers";

export async function logout(): Promise<void> {
  const { success, credentials } = decodeCredentials();
  if (!success) throw new Error();

  const { uid, email, role } = credentials;
  const payload = { uid, email, role } as Partial<User>;
  const newToken = encode(payload, { expiresIn: "0m" });

  cookies().set("token", newToken, {
    httpOnly: true,
    path: "/",
    expires: new Date(),
  });
}
