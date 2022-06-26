import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { planetsRouter } from "./routes/planets/planets.router";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(planetsRouter);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

//for async
// app.all("*", async (req, res, next) => {
//   next(new NotFoundError());
// });

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
