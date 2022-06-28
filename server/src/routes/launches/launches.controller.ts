import { Request, Response } from "express";
import { AppConstants } from "../../AppConstants";
import { NotFoundError } from "../../errors/not-found-error";
import {
  getAllLaunches,
  addNewLaunch,
  abortsLaunchWithId,
  existsLaunchWithId,
} from "../../models/launches.model";

const httpGetAllLaunches = async (req: Request, res: Response) => {
  return res.status(AppConstants.HTTP_STATUS_OK).json(getAllLaunches());
};

const httpAddNewLaunch = async (req: Request, res: Response) => {
  const newLaunch = req.body;
  return res
    .status(AppConstants.HTTP_STATUS_CREATED)
    .json(addNewLaunch(newLaunch));
};

const httpAbortLaunch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const launchId = Number(id);
  const exists = existsLaunchWithId(launchId);
  if (!exists) {
    throw new NotFoundError();
  }
  return res
    .status(AppConstants.HTTP_STATUS_OK)
    .json(abortsLaunchWithId(launchId));
};

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
