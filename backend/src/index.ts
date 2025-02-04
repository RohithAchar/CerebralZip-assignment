import express, { Request, Response, NextFunction } from "express";
import basicAuth from "basic-auth";
import cors from "cors";
import dotenv from "dotenv";

import { getDataFromDB } from "./db/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  const credentials = basicAuth(req);
  if (
    !credentials ||
    credentials.name !== "trial" ||
    credentials.pass !== "assignment123"
  ) {
    res.status(401).json({ message: "Access denied" });
    return;
  }
  next();
};

app.get("/api/data", checkAuth, async (req: Request, res: Response) => {
  try {
    const data = await getDataFromDB();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
