import express, { Request, Response } from "express";
import { getAllLaunches } from "../../../models/launches.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const launches = await getAllLaunches();
  return res.status(200).json(launches);
});

export { router as showAllLaunchesRouter };
