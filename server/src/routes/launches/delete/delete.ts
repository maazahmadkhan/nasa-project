import express, { Request, Response } from "express";
import { NotFoundError } from "../../../errors/not-found-error";
import { validateRequest } from "../../../middlewares/validate-requests";
import { param } from "express-validator";
import {
  existsLaunchWithId,
  abortsLaunchWithId,
} from "../../../models/launches.model";

const router = express.Router();

router.delete(
  "/:id",
  [param("id").isNumeric().withMessage("Id must be a number")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const launchId = Number(id);
    const Launch = await existsLaunchWithId(launchId);
    if (!Launch) {
      throw new NotFoundError();
    }
    const abortedLaunch = await abortsLaunchWithId(Launch);
    return res.status(200).json(abortedLaunch);
  }
);

export { router as deleteLaunchRouter };
