import { app } from "./app";
import { loadPlanetsData } from "./models/planets.model";
const PORT = process.env.PORT || 8000;

const start = async () => {
  await loadPlanetsData();
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
};

start();
