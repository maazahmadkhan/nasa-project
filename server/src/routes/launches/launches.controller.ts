import { Request, Response } from "express";
import { AppConstants } from "../../AppConstants";
import { getAllLaunches } from "../../models/launches.model";

export const httpGetAllLaunches = async (req: Request, res: Response) => {
  return res.status(AppConstants.HTTP_STATUS_OK).json(getAllLaunches());
};
