import express, { Request, Response } from "express";
import { launchesRouter } from "../launches.router";
import { validateRequest } from "../../../middlewares/validate-requests";
import { body } from "express-validator";
import { addNewLaunch } from "../../../models/launches.model";
import { planets } from "../../../models/planets.model";

const router = express.Router();

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
  async (req: Request, res: Response) => {
    const newLaunch = req.body;
    return res.status(201).json(addNewLaunch(newLaunch));
  }
);

export { router as addNewLaunchRouter };
