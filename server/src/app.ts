import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import "express-async-errors";
import { planetsRouter } from "./routes/planets/planets.router";
import { launchesRouter } from "./routes/launches/launches.router";
import { errorHandler } from "./middlewares/error-handler";
import morgan from "morgan";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(errorHandler);

export { app };
