import request from "supertest";
import { app } from "../../../app";

it("Should respond with 200 success", async () => {
  await request(app)
    .get("/api/v1/launches")
    .expect("Content-Type", /json/)
    .expect(200);
});
