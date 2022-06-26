import express from "express";
import { getAllLaunches } from "./launches.controller";
const router = express.Router();

router.get("/launches", getAllLaunches);

export { router as launchesRouter };
