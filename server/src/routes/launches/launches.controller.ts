import { NextFunction, Request, Response } from "express";
import { AppConstants } from "../../AppConstants";
import { NotFoundError } from "../../errors/not-found-error";
import {
  getAllLaunches,
  addNewLaunch,
  abortsLaunchWithId,
  existsLaunchWithId,
} from "../../models/launches.model";

export const httpGetAllLaunches = async (req: Request, res: Response) => {
  return res.status(AppConstants.HTTP_STATUS_OK).json(getAllLaunches());
};

export const httpAddNewLaunch = async (req: Request, res: Response) => {
  const launch = req.body;

  return res
    .status(AppConstants.HTTP_STATUS_CREATED)
    .json(addNewLaunch(launch));
};

export const httpAbortLaunch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const launchId = Number(id);
  if (existsLaunchWithId(launchId)) {
    return res
      .status(AppConstants.HTTP_STATUS_OK)
      .json(abortsLaunchWithId(launchId));
  } else {
    throw new NotFoundError();
  }
};
