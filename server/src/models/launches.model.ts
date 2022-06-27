interface PrimaryLaunchDetails {
  readonly mission: string;
  readonly rocket: string;
  readonly launchDate: Date;
  readonly destination: string;
}
interface SecondaryLaunchDetails {
  flightNumber: number;
  readonly customer: Array<string>;
  upcoming: boolean;
  success: boolean;
}

type Launch = PrimaryLaunchDetails & SecondaryLaunchDetails;

interface Launches {
  [x: string]: Launch;
}

let latestFlightNumber = 100;

const launch: Launch = {
  flightNumber: latestFlightNumber,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("Decemeber 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

const launches: Launches = {};
launches[launch.flightNumber] = launch;

const getAllLaunches = () => Object.values(launches);

const addNewLaunch = (newLaunch: PrimaryLaunchDetails) => {
  latestFlightNumber += 1;
  const launch: Launch = {
    flightNumber: latestFlightNumber,
    mission: newLaunch.mission,
    rocket: newLaunch.rocket,
    launchDate: new Date(newLaunch.launchDate),
    destination: newLaunch.destination,
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  };
  launches[latestFlightNumber] = launch;
  return launches[latestFlightNumber];
};

const existsLaunchWithId = (id: number) => {
  return !!launches[id];
};

const abortsLaunchWithId = (id: number) => {
  const aborted = launches[id];
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
};
export {
  launches,
  getAllLaunches,
  addNewLaunch,
  abortsLaunchWithId,
  existsLaunchWithId,
};
