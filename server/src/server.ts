import { app } from "./app";
import { AppDataSource } from "./services/data-source";

const PORT = process.env.PORT || 8000;

const start = async () => {
  await AppDataSource.initialize();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

start();
