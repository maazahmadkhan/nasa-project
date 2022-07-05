import express, { Request, Response } from "express";
import { validateRequest } from "../../../middlewares/validate-requests";
import { body } from "express-validator";
import { addNewLaunch } from "../../../models/launches.model";
import { existsPlanetWithId } from "../../../models/planets.model";
import { CustomRequestValidationError } from "../../../errors/custom-request-validation-error";

const desinationErrorMsg = "Destination value is incorrect";
const router = express.Router();

router.post(
  "/",
  [
    body("destination").notEmpty().isNumeric().withMessage(desinationErrorMsg),
    body("launchDate")
      .notEmpty()
      .isISO8601()
      .toDate()
      .withMessage("Please provide a Launch Date in ISO-8601 format."),
    body("mission")
      .notEmpty()
      .isString()
      .withMessage("Please provide a mission name"),
    body("rocket")
      .notEmpty()
      .isString()
      .withMessage("Please provide a rocket name"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const launch = req.body;

    const Planet = await existsPlanetWithId(launch.destination);

    if (!Planet) {
      throw new CustomRequestValidationError([
        {
          field: "destination",
          message: desinationErrorMsg,
        },
      ]);
    }
    const newLaunch = {
      ...launch,
      destination: Planet,
    };

    return res.status(201).json(addNewLaunch(newLaunch));
  }
);

export { router as addNewLaunchRouter };
