import { NextRequest } from "next/server";
import { decode } from "./jwt";
import { User } from "@/models/User";

type TokenData = {
  success: boolean;
  data?: {
    uid: User["uid"];
    email: User["email"];
    role: User["role"];
  };
};

export const getAccessToken = (req: NextRequest): TokenData => {
  const token = req.cookies.get("token")?.value;
  console.log(token);
  try {
    const decoded = decode(token) as TokenData["data"];
    return { success: true, data: decoded };
  } catch (e) {
    return { success: false };
  }
};
