import { connectToDatabase } from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams.get("id"));
  const db = await connectToDatabase();
  const hotelsCollection = db.collection("hotels");

  const hotels = await hotelsCollection.find().toArray();
  return new NextResponse(JSON.stringify({ hotels }), { status: 200 });
}
