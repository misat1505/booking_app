import { NextRequest } from "next/server";
import { createResponse } from "../utils/createResponse";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return createResponse("No file provided", { status: 400 });
  }

  const staticDir = path.join(process.cwd(), "public", "static");
  const filename = `${uuidv4()}-${file.name}`;
  const filePath = path.join(staticDir, filename);

  const fileContent = Buffer.from(await file.arrayBuffer());
  fs.mkdirSync(staticDir, { recursive: true });
  fs.writeFile(filePath, fileContent, () => {});

  return createResponse(
    { path: path.join("/", "static", filename) },
    { status: 200 }
  );
}
