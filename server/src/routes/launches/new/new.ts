import express, { Request, Response } from "express";
import { validateRequest } from "../../../middlewares/validate-requests";
import { body } from "express-validator";
import { addNewLaunch } from "../../../models/launches.model";
import { existsPlanetWithId } from "../../../models/planets.model";
import { CustomRequestValidationError } from "../../../errors/custom-request-validation-error";

export const errorMsgs = {
  destination: {
    field: "destination",
    message: "Destination value is incorrect",
  },
  launchDate: {
    field: "launchDate",
    message: "Please provide a Launch Date in ISO-8601 format.",
  },
  mission: {
    field: "mission",
    message: "Please provide a mission name",
  },
  rocket: {
    field: "rocket",
    message: "Please provide a rocket name",
  },
};

const router = express.Router();

router.post(
  "/",
  [
    body(errorMsgs.destination.field)
      .notEmpty()
      .isNumeric()
      .withMessage(errorMsgs.destination.message),
    body(errorMsgs.launchDate.field)
      .notEmpty()
      .isISO8601()
      .toDate()
      .withMessage(errorMsgs.launchDate.message),
    body(errorMsgs.mission.field)
      .notEmpty()
      .isString()
      .withMessage(errorMsgs.mission.message),
    body(errorMsgs.rocket.field)
      .notEmpty()
      .isString()
      .withMessage(errorMsgs.rocket.message),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const launch = req.body;

    const Planet = await existsPlanetWithId(launch.destination);

    if (!Planet) {
      throw new CustomRequestValidationError([errorMsgs.destination]);
    }
    const newLaunch = {
      ...launch,
      destination: Planet,
    };

    return res.status(201).json(addNewLaunch(newLaunch));
  }
);

export { router as addNewLaunchRouter };
