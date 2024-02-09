import { cookies } from "next/headers";
import { decode } from "@/app/api/auth/utils/jwt";
import { User } from "@/models/User";

type SuccessfulDecode = {
  success: true;
  credentials: {
    uid: User["uid"];
    email: User["email"];
    role: User["role"];
  };
};

type FailDecode = {
  success: false;
  credentials: null;
};

type TokenData = SuccessfulDecode | FailDecode;

export const decodeCredentials = (): TokenData => {
  const token = cookies().get("token")?.value;

  if (!token) return { success: false, credentials: null };

  try {
    const decoded = decode(token) as SuccessfulDecode["credentials"];
    return { success: true, credentials: decoded };
  } catch (e) {
    return { success: false, credentials: null };
  }
};
