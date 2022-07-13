import { Planet } from "../entity/Planet";
import { AppDataSource } from "../services/data-source";

const getPlanetRepository = () => {
  return AppDataSource.getRepository(Planet);
};

const getAllPlanets = async () => {
  return await getPlanetRepository().find();
};

const existsPlanetWithId = async (id: number) => {
  return await getPlanetRepository().findOne({
    where: {
      id: Math.abs(id),
    },
  });
};

export const loadPlanets = async () => {
  const planetNames = [
    "Kepler-1652 b",
    "Kepler-1410 b",
    "Kepler-296 A f",
    "Kepler-442 b",
    "Kepler-296 A e",
    "Kepler-1649 b",
    "Kepler-62 f",
    "Kepler-452 b",
  ];

  const planets = planetNames.map((planetName) => {
    const planet = new Planet();
    planet.keplerName = planetName;
    return planet;
  });
  return await getPlanetRepository().save(planets);
};

export { getAllPlanets, existsPlanetWithId };
