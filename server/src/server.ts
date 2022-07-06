import { app } from "./app";
import {
  startDataSourceConnection,
  closeDataSourceConnection,
} from "./services/data-source";

const PORT = process.env.PORT || 8000;

process.on("SIGINT", closeDataSourceConnection);
process.on("SIGTERM", closeDataSourceConnection);

const start = async () => {
  try {
    await startDataSourceConnection();
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

start();
