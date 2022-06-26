interface Launch {
  readonly flightNumber: number;
  readonly mission: string;
  readonly rocket: string;
  readonly launchDate: Date;
  readonly destination: string;
  readonly customer: Array<string>;
  upcoming: boolean;
  success: boolean;
}

interface Launches {
  [x: string]: Launch;
}

const launch: Launch = {
  flightNumber: 100,
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

export { launches };
