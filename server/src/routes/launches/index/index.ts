import express, { Request, Response } from "express";
import { getAllLaunchesWithDestination } from "../../../models/launches.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const launches = await getAllLaunchesWithDestination();
  return res.status(200).json(launches);
});

export { router as showAllLaunchesRouter };
