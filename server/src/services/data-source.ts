import { DataSource } from "typeorm";
import { Planet } from "../entity/Planet";
import { Launch } from "../entity/Launch";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: true,
  entities: [Planet, Launch],
  migrations: [],
  subscribers: [],
});
