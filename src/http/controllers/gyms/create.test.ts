import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "#/app";
import { createAndAuthenticateUser } from "#/utils/test/create-and-authenticate-user";

describe("[Gyms] - Create Controller", () => {
  beforeEach(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const sut = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Test",
        id: "gym-01",
        phone: "11999999",
        title: "Testing Gym",
        latitude: -28.2332516,
        longitude: -48.6593139,
      });

    expect(sut.statusCode).toEqual(201);
  });
});
