import express from "express";
import { getAllPlanets } from "./planets.controller";
const router = express.Router();

router.get("/planets", getAllPlanets);

export { router as planetsRouter };
