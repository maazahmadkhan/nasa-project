import { loadPlanetsData } from "../models/planets.model";
beforeAll(async () => {
  await loadPlanetsData();
  console.log("starting tests....");
});
