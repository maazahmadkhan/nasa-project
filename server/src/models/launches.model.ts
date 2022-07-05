import { Launch } from "../entity/Launch";
import { Planet } from "../entity/Planet";
import { AppDataSource } from "../services/data-source";

interface PrimaryLaunchDetails {
  readonly mission: string;
  readonly rocket: string;
  readonly launchDate: Date;
  readonly destination: Planet;
}

const getLaunchRepository = () => {
  return AppDataSource.getRepository(Launch);
};

const addNewLaunch = async (primaryLaunchDetails: PrimaryLaunchDetails) => {
  const launch = new Launch();
  launch.destination = primaryLaunchDetails.destination;
  launch.mission = primaryLaunchDetails.mission;
  launch.rocket = primaryLaunchDetails.rocket;
  launch.launchDate = primaryLaunchDetails.launchDate;
  launch.success = true;
  launch.upcoming = true;
  return await AppDataSource.manager.save(launch);
};

const getAllLaunches = async () => {
  return await getLaunchRepository().find();
};

const existsLaunchWithId = async (id: number) => {
  return await getLaunchRepository().findOne({
    where: {
      flightNumber: Math.abs(id),
    },
  });
};

const abortsLaunchWithId = async (launch: Launch) => {
  launch.upcoming = false;
  launch.success = false;
  return await AppDataSource.manager.save(launch);
};

export { addNewLaunch, getAllLaunches, existsLaunchWithId, abortsLaunchWithId };
