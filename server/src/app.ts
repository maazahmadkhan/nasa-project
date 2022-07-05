import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import "express-async-errors";
import "reflect-metadata";
import { v1 } from "./routes/v1";
import { errorHandler } from "./middlewares/error-handler";
import morgan from "morgan";
import { config } from "dotenv";

config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/v1", v1);

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(errorHandler);

export { app };
