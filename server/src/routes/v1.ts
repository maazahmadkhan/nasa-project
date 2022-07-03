import express from "express";
import { planetsRouter } from "./planets/planets.router";
import { launchesRouter } from "./launches/launches.router";
const v1 = express.Router();

v1.use("/planets", planetsRouter);
v1.use("/launches", launchesRouter);

export { v1 };
