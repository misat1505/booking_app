"use server";

import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export async function uploadFile(formdata: FormData): Promise<string> {
  const file = formdata.get("file") as File;

  const staticDir = path.join(process.cwd(), "public", "static");
  const filename = `${uuidv4()}-${file.name}`;
  const filePath = path.join(staticDir, filename);

  const fileContent = Buffer.from(await file.arrayBuffer());
  fs.mkdirSync(staticDir, { recursive: true });
  fs.writeFile(filePath, fileContent, () => {});

  return path.join("/", "static", filename);
}
