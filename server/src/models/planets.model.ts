import { Planet } from "../entity/Planet";
import { AppDataSource } from "../services/data-source";

const getUserRepository = () => {
  return AppDataSource.getRepository(Planet);
};

const getAllPlanets = async () => {
  return await getUserRepository().find();
};

const existsPlanetWithId = async (id: number) => {
  return await getUserRepository().findOne({
    where: {
      id: Math.abs(id),
    },
  });
};

export { getAllPlanets, existsPlanetWithId };
