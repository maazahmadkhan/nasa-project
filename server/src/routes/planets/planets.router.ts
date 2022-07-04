import express from "express";
import { getAllPlanetsRouter } from "./index/index";
const router = express.Router();

router.use(getAllPlanetsRouter);

export { router as planetsRouter };
