import { parse } from "csv-parse";
import fs from "fs";
import path from "path";

interface HabitablePlanet {
  readonly kepid: number;
  readonly kepoi_name: string;
  readonly kepler_name: string;
  readonly koi_disposition: string;
  readonly koi_pdisposition: string;
  readonly koi_score: string;
  readonly koi_fpflag_nt: string;
  readonly koi_fpflag_ss: string;
  readonly koi_fpflag_co: string;
  readonly koi_fpflag_ec: string;
  readonly koi_period: string;
  readonly koi_period_err1: string;
  readonly koi_period_err2: string;
  readonly koi_time0bk: string;
  readonly koi_time0bk_err1: string;
  readonly koi_time0bk_err2: string;
  readonly koi_impact: string;
  readonly koi_impact_err1: string;
  readonly koi_impact_err2: string;
  readonly koi_duration: string;
  readonly koi_duration_err1: string;
  readonly koi_duration_err2: string;
  readonly koi_depth: string;
  readonly koi_depth_err1: string;
  readonly koi_depth_err2: string;
  readonly koi_prad: number;
  readonly koi_prad_err1: number;
  readonly koi_prad_err2: number;
  readonly koi_teq: string;
  readonly koi_teq_err1: string;
  readonly koi_teq_err2: string;
  readonly koi_insol: number;
  readonly koi_insol_err1: string;
  readonly koi_insol_err2: string;
  readonly koi_model_snr: string;
  readonly koi_tce_plnt_num: string;
  readonly koi_tce_delivname: string;
  readonly koi_steff: string;
  readonly koi_steff_err1: string;
  readonly koi_steff_err2: string;
  readonly koi_slogg: string;
  readonly koi_slogg_err1: string;
  readonly koi_slogg_err2: string;
  readonly koi_srad: string;
  readonly koi_srad_err1: string;
  readonly koi_srad_err2: string;
  readonly ra: string;
  readonly dec: string;
  readonly koi_kepmag: string;
}

const habitablePlanets: Array<HabitablePlanet> = [];

const isHabitablePlanet = (planet: HabitablePlanet) => {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
};

export const loadPlanetsData = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data: HabitablePlanet) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err: Error) => {
        reject(err);
      })
      .on("end", () => {
        resolve("Planets Loaded");
      });
  });
};

export { habitablePlanets as planets };
