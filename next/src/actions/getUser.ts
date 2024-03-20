"use server";

import { User } from "@/models/User";
import { decodeCredentials } from "./decodeCredentials";
import { auth } from "@/firebase/firebase-admin";

export async function getUser(): Promise<User> {
  const { success, credentials } = decodeCredentials();

  if (!success) throw new Error();

  const fetchedUser = await auth.getUser(credentials.uid);

  const user: User = {
    uid: credentials.uid,
    email: fetchedUser.email,
    role: credentials.role,
    displayName: fetchedUser.displayName,
    photoURL: fetchedUser.photoURL,
  };

  return user;
}
