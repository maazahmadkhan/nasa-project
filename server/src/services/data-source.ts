import { DataSource } from "typeorm";
import { Planet } from "../entity/Planet";
import { Launch } from "../entity/Launch";
import { AppConstants } from "../AppConstants";
import { createDatabase } from "typeorm-extension";
import { loadPlanets } from "../models/planets.model";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: process.env.DBSYNC === "true" ? true : false,
  logging: true,
  entities: [Planet, Launch],
  migrations: [],
  subscribers: [],
});

const startDataSourceConnection = async () => {
  if (process.env.NODE_ENV === AppConstants.test) {
    await createDatabase();
  }
  await AppDataSource.initialize();

  if (process.env.NODE_ENV !== AppConstants.production) {
    await loadPlanets();
  }

  console.log(`Started Datasource Connection in ${process.env.NODE_ENV}`);
};

const closeDataSourceConnection = async () => {
  await AppDataSource.destroy();
  console.log(`Closed Datasource Connection in ${process.env.NODE_ENV}`);
};

export { AppDataSource, startDataSourceConnection, closeDataSourceConnection };

/**
 *  sudo -u postgres psql postgres
 *  \password postgres
 *  Edit Connection - Postgres - Show All databases
 */
