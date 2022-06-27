import express from "express";
import {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} from "./launches.controller";
const router = express.Router();

router.get("/", httpGetAllLaunches);

router.post("/", httpAddNewLaunch);

router.delete("/:id", httpAbortLaunch);

export { router as launchesRouter };
