import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "#/app";
import { createAndAuthenticateUser } from "#/utils/test/create-and-authenticate-user";

describe("[Gyms] - Near By Controller", () => {
  beforeEach(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to get a near by gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Test",
        phone: "11999999",
        title: "Testing Gym",
        latitude: -28.2332516,
        longitude: -48.6593139,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Test",
        phone: "11999999",
        title: "JavaScript Gym",
        latitude: -27.9246618,
        longitude: -50.0961301,
      });

    const sut = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -27.9246618,
        longitude: -50.0961301,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(sut.statusCode).toEqual(200);
    expect(sut.body.gyms).toHaveLength(1);
    expect(sut.body.gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: "JavaScript Gym",
      }),
    ]);
  });
});
