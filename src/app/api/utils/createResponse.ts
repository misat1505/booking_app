import { NextResponse } from "next/server";

export function createResponse<T>(body: T, init?: ResponseInit): NextResponse {
  return new NextResponse<T>(JSON.stringify(body), init);
}
