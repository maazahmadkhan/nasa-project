import express from "express";
import { httpGetAllPlanets } from "./planets.controller";
const router = express.Router();

router.get("/planets", httpGetAllPlanets);

export { router as planetsRouter };
