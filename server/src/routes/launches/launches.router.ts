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
      .exists()
      .withMessage("Please provide a Launch Date")
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

/*
One popular rule of thumb is:

use "parameters as a part of a path" for mandatory parameters
/launches/101

use "parameters as a query string" for optional parameters.
?launches=101
*/
router.delete(
  "/:id",
  [param("id").isNumeric().withMessage("Id must be a number")],
  validateRequest,
  httpAbortLaunch
);

export { router as launchesRouter };
