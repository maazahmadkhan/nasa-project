import express, { Request, Response } from "express";
import { launchesRouter } from "../launches.router";
import { getAllLaunches } from "../../../models/launches.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json(getAllLaunches());
});

export { router as showAllLaunchesRouter };
