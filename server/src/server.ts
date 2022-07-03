import { app } from "./app";
import { loadPlanetsData } from "./models/planets.model";
import { client } from "./services/postgres";
const PORT = process.env.PORT || 8000;

const start = async () => {
  await client.connect();
  await loadPlanetsData();
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

start();
