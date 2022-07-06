import { DataSource } from "typeorm";
import { Planet } from "../entity/Planet";
import { Launch } from "../entity/Launch";
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: JSON.parse(process.env.DBSYNC!),
  logging: true,
  entities: [Planet, Launch],
  migrations: [],
  subscribers: [],
});

const startDataSourceConnection = async () => {
  await AppDataSource.initialize();
  console.log("Started Datasource Connection...");
};
const closeDataSourceConnection = () => {
  // AppDataSource.destroy();
  console.log("Closed Datasource Connection...");
};

export { AppDataSource, startDataSourceConnection, closeDataSourceConnection };
