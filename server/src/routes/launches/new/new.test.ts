import request from "supertest";
import { app } from "../../../app";

describe("Test POST /launches", () => {
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
  test("It should respond with 201 Created", async () => {
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

  test("It should respond with 400 when any field is incorrect", async () => {
    const response = await request(app)
      .post("/api/v1/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      errors: [
        {
          message: "Please provide a Launch Date",
          field: "launchDate",
        },
        {
          message: "Launch Date format is incorrect",
          field: "launchDate",
        },
      ],
    });
  });

  test("It should check incorrect date format", async () => {
    const response = await request(app)
      .post("/api/v1/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      errors: [
        {
          message: "Launch Date format is incorrect",
          field: "launchDate",
        },
      ],
    });
  });
});
