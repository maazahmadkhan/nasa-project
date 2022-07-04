import express, { Request, Response } from "express";
import { planets } from "../../../models/planets.model";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json(planets);
});

export { router as getAllPlanetsRouter };
