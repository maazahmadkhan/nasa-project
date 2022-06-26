import express from "express";
import { httpGetAllLaunches } from "./launches.controller";
const router = express.Router();

router.get("/launches", httpGetAllLaunches);

export { router as launchesRouter };
