import express, { Request, Response } from "express";
import { getAllPlanets } from "../../../models/planets.model";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const planets = await getAllPlanets();
  return res.status(200).json(planets);
});

export { router as getAllPlanetsRouter };
