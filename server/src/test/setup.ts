import { createDatabase } from "typeorm-extension";
import { AppDataSource } from "../services/data-source";

beforeAll(async () => {
  // await createDatabase();
  // await AppDataSource.initialize();
  console.log("starting tests....");
});

afterAll(async () => {
  // await AppDataSource.destroy();
  // await dropPostgresDatabase({ ifExist: true });
});
