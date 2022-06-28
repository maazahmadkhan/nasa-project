import express from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../middlewares/validate-requests";
import {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} from "./launches.controller";
import { planets } from "../../models/planets.model";
const router = express.Router();

router.get("/", httpGetAllLaunches);

router.post(
  "/",
  [
    body("destination")
      .custom((selectedPlanet: string) =>
        planets.some((planet) => planet.kepler_name === selectedPlanet)
      )
      .withMessage("Destination value is incorrect"),
    body("launchDate")
      .isISO8601()
      .toDate()
      .withMessage("Launch Date format is incorrect"),
    body("mission")
      .isString()
      .notEmpty()
      .withMessage("Please provide a mission name"),
    body("rocket")
      .isString()
      .notEmpty()
      .withMessage("Please provide a rocket name"),
  ],
  validateRequest,
  httpAddNewLaunch
);

router.delete(
  "/:id",
  [param("id").isNumeric().withMessage("Id must be a number")],
  validateRequest,
  httpAbortLaunch
);

export { router as launchesRouter };
