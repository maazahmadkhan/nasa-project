import request from "supertest";
import { app } from "../../../app";
import { errorMsgs } from "./new";

const newLaunch = {
  destination: "Kepler-1652 b",
  launchDate: "2022-06-28T00:00:00.000Z",
  mission: "sdsdsd",
  rocket: "Explorer IS1",
};

const { launchDate, ...launchDataWithoutDate } = newLaunch;
const launchDataWithInvalidDate = {
  ...launchDataWithoutDate,
  launchDate: "sds",
};

it("Should respond with 201 Created", async () => {
  const response = await request(app)
    .post("/api/v1/launches")
    .send(newLaunch)
    .expect("Content-Type", /json/)
    .expect(201);

  const responseLaunchDate = new Date(response.body.launchDate).valueOf();
  const requestLaunchDate = new Date(launchDate).valueOf();
  expect(response.body).toMatchObject(launchDataWithoutDate);
  expect(responseLaunchDate).toBe(requestLaunchDate);
});

it("Should respond with 400 when any field is incorrect", async () => {
  const response = await request(app)
    .post("/api/v1/launches")
    .send(launchDataWithoutDate)
    .expect("Content-Type", /json/)
    .expect(400);

  expect(response.body).toStrictEqual({
    errors: [errorMsgs.launchDate],
  });
});

it("Should check incorrect date format", async () => {
  const response = await request(app)
    .post("/api/v1/launches")
    .send(launchDataWithInvalidDate)
    .expect("Content-Type", /json/)
    .expect(400);

  expect(response.body).toStrictEqual({
    errors: [errorMsgs.launchDate],
  });
});
