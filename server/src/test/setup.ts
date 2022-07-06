import { createDatabase } from "typeorm-extension";
import { AppDataSource } from "../services/data-source";

beforeAll(async () => {
  await createDatabase();
  await AppDataSource.initialize();
  console.log(`Started Datasource Connection in ${process.env.NODE_ENV}`);
});

afterAll(async () => {
  await AppDataSource.destroy();
  console.log(`Closed Datasource Connection in ${process.env.NODE_ENV}`);
});
