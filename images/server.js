import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
const UPLOADS_DIRECTORY = "uploads";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(UPLOADS_DIRECTORY, { recursive: true });
    cb(null, UPLOADS_DIRECTORY);
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: storage });

app.use(express.static(UPLOADS_DIRECTORY));

app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    res.status(200).send({ path: path.join("/", req.file.filename) });
  } else {
    res.status(400).send("No file uploaded");
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Images server running on port ${PORT}.`);
});
