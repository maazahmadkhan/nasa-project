import { Request, Response } from "express";
import { AppConstants } from "../../AppConstants";
import { launches } from "../../models/launches.model";

export const getAllLaunches = async (req: Request, res: Response) => {
  return res.status(AppConstants.HTTP_STATUS_OK).json(Object.values(launches));
};
