"use server";

import { User } from "@/models/User";
import { auth } from "@/firebase/firebase-admin";
import { encode } from "@/app/api/auth/utils/jwt";
import { cookies } from "next/headers";

export async function login(
  accessToken: string,
  role: User["role"]
): Promise<User> {
  const decodedToken = await auth.verifyIdToken(accessToken);

  const { uid, email } = decodedToken;

  const payload = { uid, email, role } as Partial<User>;
  const token = encode(payload, { expiresIn: "5h" });

  const date = new Date();
  const expDate = new Date(date.setHours(date.getHours() + 5));

  cookies().set("token", token, {
    httpOnly: true,
    path: "/",
    expires: expDate,
  });

  const fetchedUser = await auth.getUser(uid);

  const user: User = {
    uid: uid,
    email: fetchedUser.email,
    role: role,
    displayName: fetchedUser.displayName,
    photoURL: fetchedUser.photoURL,
  };

  return user;
}
