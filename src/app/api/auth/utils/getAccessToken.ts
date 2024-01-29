import { NextRequest } from "next/server";
import { decode } from "./jwt";
import { User } from "@/models/User";

type SuccessfulDecode = {
  success: true;
  data: {
    uid: User["uid"];
    email: User["email"];
    role: User["role"];
  };
};

type FailDecode = {
  success: false;
  data: null;
};

type TokenData = SuccessfulDecode | FailDecode;

export const getAccessToken = (req: NextRequest): TokenData => {
  const token = req.cookies.get("token")?.value;
  try {
    const decoded = decode(token) as SuccessfulDecode["data"];
    return { success: true, data: decoded };
  } catch (e) {
    return { success: false, data: null };
  }
};
