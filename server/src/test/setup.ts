import {
  startDataSourceConnection,
  closeDataSourceConnection,
} from "../services/data-source";

beforeAll(async () => {
  await startDataSourceConnection();
});

afterAll(async () => {
  await closeDataSourceConnection();
});
